"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { routes } from "@/routes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  HouseIcon,
  WarningOctagonIcon,
  ArrowClockwiseIcon,
} from "@phosphor-icons/react";
import { User2Icon } from "lucide-react";
import { WalletIcon } from "@phosphor-icons/react/dist/ssr";

type ErrorStateProps = {
  message?: string;
};

export default function ErrorState({ message }: ErrorStateProps) {
  const router = useRouter();

  const quickLinks = [
    {
      title: "Dashboard",
      description: "Return to overview",
      icon: HouseIcon,
      href: routes.dashboard.overview,
      color: "bg-red-600 text-white",
    },
    {
      title: "Users",
      description: "Manage certificates",
      icon: User2Icon,
      href: routes.dashboard.certificate.index,
      color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200",
    },
    {
      title: "Batching",
      description: "View all batches",
      icon: WalletIcon,
      href: routes.dashboard.batching,
      color: "bg-red-500 text-white",
    },
  ];

  const onRefresh = () => {
    try {
      router.refresh();
    } catch {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-[20vh] overflow-auto flex items-center justify-center p-3">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-6">
          <div className="mb-4">
            <div className="text-center">
              <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center shadow-sm">
                <WarningOctagonIcon
                  size={28}
                  className="text-red-600 dark:text-red-300"
                />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-red-700 dark:text-red-300 mb-1.5">
                Something went wrong
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground max-w-xl mx-auto">
                {message ??
                  "An unexpected error occurred. Please try again or use one of the quick links below."}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
              onClick={onRefresh}
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <ArrowClockwiseIcon size={16} className="mr-2" /> Refresh
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-red-600 text-red-700 hover:bg-red-600 hover:text-white"
            >
              <Link href={routes.dashboard.overview}>
                <HouseIcon size={16} className="mr-2" /> Go to Dashboard
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          {quickLinks.map((link, index) => (
            <Card
              key={index}
              className="group hover:shadow-md transition-all duration-200 border-red-200/40 dark:border-red-900/30 hover:border-red-400/60"
            >
              <CardContent className="p-3 h-10">
                <Link href={link.href} className="block">
                  <div className="flex items-center mb-1.5">
                    <div
                      className={`w-8 h-8 rounded-md flex items-center justify-center mr-2 transition-transform duration-200 ${link.color}`}
                    >
                      <link.icon size={16} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-red-700 dark:text-red-300 group-hover:text-red-600 dark:group-hover:text-red-200 transition-colors duration-200">
                        {link.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-red-50/60 border-red-200/60 dark:bg-red-900/20 dark:border-red-900/30">
          <CardContent className="p-4 text-center">
            <h3 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-1.5">
              Need assistance?
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Visit notifications for updates or contact support for help.
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-[11px] text-muted-foreground">
            If the issue persists, please try again later.
          </p>
        </div>
      </div>
    </div>
  );
}
