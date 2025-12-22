"use client";
import { UiLayout } from "@/components/ui";

export default function Page() {
  return (
    <UiLayout.Layout
      header="Overview"
      canAccess={true}
      subHeading="A visusal overview of all statistics and data"
      className="min-h-screen overflow-auto"
    >
      <div>Overview coming soon...</div>
    </UiLayout.Layout>
  );
}
