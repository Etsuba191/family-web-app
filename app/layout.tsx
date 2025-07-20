import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/toast";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider } from "@/lib/i18n";
import { UpdateNotification } from "@/components/update-notification";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Family App",
  description: "A comprehensive family management application",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-app-red-DEFAULT`}>
        <ThemeProvider>
          <LanguageProvider>
            <ToastProvider>
              {children}
              <UpdateNotification />
              <Toaster />
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
