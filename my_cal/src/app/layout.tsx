"use client";
// app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "../contexts/ThemeContext";
import { useEffect, useState } from "react";

// export const metadata = {
//   title: 'My Cal',
//   description: 'A calendar application',
// };

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-[100vh]">
        <ThemeProvider
        attribute={"class"}
        defaultTheme={"system"}
        enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
