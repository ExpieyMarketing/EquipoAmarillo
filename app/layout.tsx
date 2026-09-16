import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panel de Captación de Leads",
  description: "Medición de objetivos de captación de leads desde Meta Ads y Google Ads",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
