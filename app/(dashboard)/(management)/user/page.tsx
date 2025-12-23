"use client";
import { UiLayout } from "@/components/ui";

export default function Page() {
  return (
    <UiLayout.Layout
      header="User Management"
      canAccess={true}
      subHeading="Manage users  on the system"
      className="min-h-screen overflow-auto"
    >
      <div>Coming soon...</div>
    </UiLayout.Layout>
  );
}
