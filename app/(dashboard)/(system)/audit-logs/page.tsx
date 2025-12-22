"use client";
import { UiLayout } from "@/components/ui";

export default function Page() {
  return (
    <UiLayout.Layout
      header="Audit-Logs"
      canAccess={true}
      subHeading="Text here"
      className="min-h-screen overflow-auto"
    >
      <div>Overview coming soon...</div>
    </UiLayout.Layout>
  );
}
