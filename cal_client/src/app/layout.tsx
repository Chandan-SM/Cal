// app/layout.tsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

interface RootLayoutProps {
  children: React.ReactNode;
}

// meta data
export const metadata = {
  title: "Cal",
  description: "A modern Calendar Application",
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="h-screen bg-gray-900 text-gray-100">
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}