"use client";
import { UiLayout } from "@/components/ui";

export default function Page() {
  return (
    <UiLayout.Layout
      header="Audit-Logs"
      canAccess={true}
      subHeading="A back-log of all actions performed accross the platform"
      className="min-h-screen overflow-auto"
    >
      <div>Coming soon...</div>
    </UiLayout.Layout>
  );
}
