"use client";
import '@/sass/globals.sass';
import SessionAuthProvider from "@/context/SessionAuthProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { inter } from '@/components/ui/fonts/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased sidebar`}>
        <main>
          <SessionAuthProvider>
            {children}
            <SpeedInsights/>
          </SessionAuthProvider>
        </main>
      </body>
    </html>
  );
}
