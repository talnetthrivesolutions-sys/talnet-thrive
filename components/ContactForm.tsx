"use client";

import React, { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

interface FormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState<FormValues>({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "Recruitment support",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "Recruitment support",
        message: "",
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  if (status === "success") {
    return (
      <div className="form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '400px' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
        <h3 style={{ color: 'var(--navy)', marginBottom: '10px' }}>Enquiry Sent Successfully</h3>
        <p style={{ color: 'var(--text)' }}>Thank you for reaching out. Our team will get back to you shortly.</p>
        <button 
          className="btn btn-primary" 
          style={{ marginTop: '20px' }}
          onClick={() => setStatus("idle")}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Your name
        <input 
          name="name" 
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name" 
          required 
        />
      </label>
      <label>
        Company name
        <input 
          name="company" 
          value={form.company}
          onChange={handleChange}
          placeholder="Company / organisation" 
        />
      </label>
      <label>
        Email
        <input 
          type="email" 
          name="email" 
          value={form.email}
          onChange={handleChange}
          placeholder="you@company.com" 
          required 
        />
      </label>
      <label>
        Phone
        <input 
          name="phone" 
          value={form.phone}
          onChange={handleChange}
          placeholder="+91" 
        />
      </label>
      <label className="full">
        What support do you need?
        <select 
          name="service" 
          value={form.service}
          onChange={handleChange}
        >
          <option value="Recruitment support">Recruitment support</option>
          <option value="RPO / bulk hiring">RPO / bulk hiring</option>
          <option value="Contract staffing">Contract staffing</option>
          <option value="Payroll processing">Payroll processing</option>
          <option value="PF / ESI / PT / labour query">PF / ESI / PT / labour query</option>
        </select>
      </label>
      <label className="full">
        Message
        <textarea 
          name="message" 
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us briefly about your requirement"
        ></textarea>
      </label>
      
      {status === "error" && (
        <div className="full" style={{ color: '#e53e3e', fontSize: '14px', marginBottom: '10px' }}>
          {errorMsg}
        </div>
      )}

      <div className="full">
        <button 
          className="btn btn-primary" 
          type="submit" 
          disabled={status === "submitting"}
          style={{ width: '100%', opacity: status === "submitting" ? 0.7 : 1 }}
        >
          {status === "submitting" ? "Sending..." : "Send Enquiry"}
        </button>
      </div>
    </form>
  );
}
