"use client";

import { WithAutoLogout } from "@/components/WithAutoLogout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  const AutoLogoutChildren = WithAutoLogout(() => children);

  return (
    <div>
        <AutoLogoutChildren/>
    </div>
  );
}
