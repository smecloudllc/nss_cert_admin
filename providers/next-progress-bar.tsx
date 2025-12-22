"use client";

import { ProgressProvider } from "@bprogress/next/app";

export function ProgressBarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProgressProvider
      height="4px"
      color="#2796a3"
      shallowRouting
      delay={100} // wait before showing, avoids flicker
      options={{
        showSpinner: false,
        minimum: 0.1, // start from 10%
        trickleSpeed: 50, // slower increments
        speed: 600, // finish animation speed
      }}
    >
      {children}
    </ProgressProvider>
  );
}
