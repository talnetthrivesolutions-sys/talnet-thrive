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
        {children}
      </body>
    </html>
  );
}
