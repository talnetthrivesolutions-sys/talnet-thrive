import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type Payload = {
  name: string;
  company: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string | null;
  ipAddress: string | null;
};

function buildRequestId(seq: number, year: number): string {
  return `TT-${year}-${String(seq).padStart(4, "0")}`;
}

async function insertDemoRequest(payload: Payload) {
  const demo = await db.demoRequest.create({
    data: payload,
    select: { id: true, seq: true, createdAt: true },
  });
  return {
    id: demo.id,
    requestId: buildRequestId(demo.seq, demo.createdAt.getFullYear()),
  };
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, company, email, phone, service, message } =
    body as Record<string, string>;

  if (!name?.trim() || !company?.trim() || !email?.trim()) {
    return NextResponse.json(
      { error: "Name, company, and email are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ??
    req.headers.get("x-real-ip") ??
    null;

  const payload: Payload = {
    name: name.trim(),
    company: company.trim(),
    email: email.toLowerCase().trim(),
    phone: phone?.trim() || null,
    service: service?.trim() || null,
    message: message?.trim() || null,
    ipAddress: ip,
  };

  // One automatic retry on transient DB errors
  let result: { id: string; requestId: string };
  try {
    result = await insertDemoRequest(payload);
  } catch {
    try {
      result = await insertDemoRequest(payload);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Database error";
      return NextResponse.json({ error: errMsg }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true, ...result }, { status: 201 });
}
