import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "@/styles/template.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

// Editorial serif used only for the upright accent word in headlines.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "SailGP × Partner Pitch Deck",
  description: "Partnership pitch deck template for SailGP Germany.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${instrumentSerif.variable}`}>
      <body>
        <div className="template-sailgp-pitch">{children}</div>
      </body>
    </html>
  );
}