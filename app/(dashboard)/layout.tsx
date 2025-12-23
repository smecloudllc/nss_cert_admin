import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ux/app-sidebar";
// import AuthWrapper from "@/providers/auth-wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NSS - Certificate :: Admin Dashboard",
  description: "NSS - Certificate Admin Dashboard",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 relative h-full no-scrollbar overflow-auto bg-white dark:bg-neutral-900  w-full">
          <SidebarTrigger className="absolute top-1 left-4 z-10 lg:hidden block" />
          <div className="h-full">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
