// app/layout.tsx
"use client";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="h-screen bg-gray-900 text-gray-100">
        {children}
      </body>
    </html>
  );
}