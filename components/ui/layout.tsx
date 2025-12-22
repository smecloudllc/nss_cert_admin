"use client";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

// Type
type LayoutProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  withBack?: {
    toggle: boolean;
    url?: string;
    backString?: string;
  };
  header: string | React.ReactNode;
  subHeading?: string;
  actions?: React.ReactNode;
  canAccess?: boolean;
};

export function Layout({
  className,
  header,
  withBack,
  subHeading,
  children,
  actions,
  canAccess = true,
  ...props
}: LayoutProps) {
  const router = useRouter();

  // Handle back navigation
  const handleBack = () => {
    if (withBack?.url) {
      router.push(withBack.url);
    } else {
      router.back();
    }
  };

  return (
    <div className={cn("flex flex-col h-full", className)} {...props}>
      {/* Sticky Header */}
      <div className="sticky top-0  bg-white dark:bg-neutral-900 border-b">
        {withBack?.toggle && withBack.backString && (
          <section className="px-4 mt-10 cursor-pointer">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-brand-primary/80 dark:text-neutral-50 dark:hover:text-neutral-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              {withBack.backString}
            </button>
          </section>
        )}

        <section
          className={cn("px-4 py-2", withBack?.toggle ? "mt-1" : "mt-6")}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col gap-1">
              {typeof header === "string" ? (
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {header}
                </h1>
              ) : (
                header
              )}
              {subHeading && (
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {subHeading}
                </p>
              )}
            </div>

            {actions && (
              <div className="flex items-center gap-3 flex-wrap">{actions}</div>
            )}
          </div>
        </section>
      </div>

      {/* Scrollable Content */}
      {canAccess ? (
        <section className="flex-1 overflow-y-auto p-4">{children}</section>
      ) : (
        <section className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-2">
            <h1 className="text-xl font-semibold text-red-500 dark:text-red-400">
              Access Denied
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
              You do not have permission to access this page.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
