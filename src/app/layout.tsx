import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "CryptoTracker - Dashboard de Criptomonedas en Tiempo Real",
  description:
    "Monitorea precios, capitalización de mercado y tendencias de las principales criptomonedas. Dashboard profesional con datos actualizados de CoinGecko.",
  keywords:
    "criptomonedas, bitcoin, ethereum, dashboard, precios crypto, capitalización mercado",
  authors: [{ name: "CryptoTracker" }],
  openGraph: {
    title: "CryptoTracker - Dashboard de Criptomonedas",
    description:
      "Dashboard profesional para monitorear criptomonedas en tiempo real",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoTracker - Dashboard de Criptomonedas",
    description: "Monitorea precios y tendencias de criptomonedas",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
