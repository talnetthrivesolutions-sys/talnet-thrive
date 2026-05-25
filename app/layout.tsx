import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  // Fresh build trigger
  title: "Talnet Thrive Solutions Pvt. Ltd. | Recruitment, Payroll & Compliance",
  description: "Talnet Thrive Solutions Pvt. Ltd. is a Bangalore-based HR partner for recruitment, payroll processing, PF, ESI, PT and labour compliance support.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Talnet Thrive",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f2b46",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body style={{ fontFamily: "var(--font-inter), Arial, Helvetica, sans-serif" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .topbar { background: #0f2b46; color: #fff; padding: 8px 0; font-size: 14px; }
          .site-header { background: #0f2b46; color: #fff; padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
          .nav { display: flex; justify-content: space-between; align-items: center; }
          .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; color: inherit; }
          .brand-logo { height: 40px; width: auto; }
          .brand-text { display: flex; flex-direction: column; line-height: 1.2; }
          .brand-text strong { font-size: 18px; letter-spacing: -0.02em; }
          .brand-text span { font-size: 12px; opacity: 0.8; }
          .links { display: flex; gap: 24px; }
          .links a { color: #fff; text-decoration: none; font-weight: 500; opacity: 0.9; transition: opacity 0.2s; }
          .links a:hover { opacity: 1; }
          .nav-actions { display: flex; gap: 12px; align-items: center; }
          .btn { padding: 10px 20px; border-radius: 6px; font-weight: 600; text-decoration: none; transition: all 0.2s; cursor: pointer; border: none; }
          .btn-primary { background: #63b246; color: #fff; }
          .btn-light { background: rgba(255,255,255,0.1); color: #fff; }
          .wrap { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        `}} />
        {children}
      </body>
    </html>
  );
}
