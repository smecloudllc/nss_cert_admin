import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Log-in",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen h-screen w-full overflow-auto lg:overflow-hidden">
      {children}
    </div>
  );
}
