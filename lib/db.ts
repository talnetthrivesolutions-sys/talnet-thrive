import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

// Prisma 7 requires a Driver Adapter for direct database connections.
// We use @prisma/adapter-pg backed by a pg.Pool for connection pooling.
// The Pool is reused across hot-reloads in development via the global singleton.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pgPool: Pool | undefined;
};

function createPgPool(): Pool {
  // Enable SSL when the connection string requests it (Neon, RDS, etc.).
  // rejectUnauthorized:false is required for Neon's wildcard certificate;
  // the connection is still fully encrypted.
  const ssl = process.env.DATABASE_URL?.includes("sslmode=require")
    ? { rejectUnauthorized: false }
    : false;

  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: process.env.NODE_ENV === "production" ? 10 : 5,
    idleTimeoutMillis: 30_000,
    // 10 s gives Neon's free tier time to wake from auto-suspend
    connectionTimeoutMillis: 10_000,
    ssl,
  });
}

const pool = globalForPrisma.pgPool ?? createPgPool();
const adapter = new PrismaPg(pool);

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pgPool = pool;
  globalForPrisma.prisma = db;
}
