import { Metadata } from "next";
import React from "react";

import ThemeSwitch from "@/components/ux/theme-switcher";

export const metadata: Metadata = {
  title: "NSS - Certicaticate :: Log-in",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen h-screen w-full overflow-auto lg:overflow-hidden bg-gradient-to-b from-white to-brand-secondary/40 dark:from-neutral-800 dark:to-neutral-900">
      {children}
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <ThemeSwitch />
      </div>
    </div>
  );
}
