// app/layout.tsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

interface RootLayoutProps {
  children: React.ReactNode;
}

// meta data
export const metadata = {
  title: "Kalyndr",
  description: "A modern Calendar Application",
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="h-screen text-slate-100 bg-slate-950">
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}