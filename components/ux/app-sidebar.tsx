"use client";

import { ChevronDown, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { ChevronsUpDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { filterMenuByRole, menuGroups } from "@/routes/menu-items";
import { UserCircleIcon } from "@phosphor-icons/react";
import { useSidebar } from "@/components/ui/sidebar";
import { logoutService } from "@/services/auth";
import { IUser } from "@/models/user";
import { cn } from "@/lib/utils";

import { UiCollapsible, UiDropdownMenu, UiSidebar } from "../ui";
import ThemeSwitchSimple from "./theme-switcher-simple";
import StatusBadge from "./status-badge";
import { NSALOGO } from "@/public/images";

const user: IUser = {
  role: "super",
  email: "kelvin@mail.com",
  first_name: "Kelvin",
  last_name: "Kumordzi",
  username: "realkelvinworld",
  image: "https://avatars.githubusercontent.com/u/106493108?v=4&size=64",
  last_login: "",
  token: "abcd",
};

export function AppSidebar() {
  /**
   * Hooks
   */
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const filteredMenu = filterMenuByRole(menuGroups, user?.role || "super");

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <UiSidebar.Sidebar
      className=" dark:bg-neutral-900 border-gray-200 dark:border-neutral-800"
      collapsible="icon"
    >
      {/*Header*/}
      <UiSidebar.SidebarHeader className=" dark:bg-neutral-900  border-gray-200 dark:border-neutral-800">
        <UiSidebar.SidebarMenu>
          <UiSidebar.SidebarMenuItem className="p-1 flex justify-between items-center gap-2">
            <div className="rounded-full p-1 shadow">
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 shrink-0">
                <Image
                  src={NSALOGO}
                  alt="User Image"
                  width={100}
                  height={32}
                  quality={100}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {!isCollapsed && <StatusBadge status={user?.role || ""} />}
          </UiSidebar.SidebarMenuItem>
        </UiSidebar.SidebarMenu>
      </UiSidebar.SidebarHeader>

      {/* Content*/}
      <UiSidebar.SidebarContent className="pl-3 pr-2 py-4 bg-brand-sidebar-background dark:bg-neutral-900">
        <UiSidebar.SidebarMenu>
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {filteredMenu.map((group) => (
              <div key={group.label} className="mb-6">
                {/* Group Label */}
                {!isCollapsed && (
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      {group.label}
                    </h3>
                  </div>
                )}

                {/* Group Items */}
                {group.items.map((item) =>
                  item.children ? (
                    <motion.div
                      key={item.title}
                      variants={itemVariants}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <UiCollapsible.Collapsible
                        defaultOpen={!isCollapsed}
                        className="group/collapsible"
                      >
                        <UiSidebar.SidebarMenuItem className="my-2">
                          <UiCollapsible.CollapsibleTrigger
                            asChild
                            className="hover:bg-brand-lime/10 hover:text-brand-primary dark:hover:bg-brand-secondary dark:hover:text-brand-primary"
                          >
                            <UiSidebar.SidebarMenuButton
                              className="w-full hover:!bg-brand-lime dark:hover:bg-brand-secondary/50 dark:hover:text-brand-primary"
                              tooltip={isCollapsed ? item.title : undefined}
                            >
                              <div className="flex w-full items-center justify-between">
                                <div
                                  className={cn(
                                    "flex items-center gap-2 font-medium",
                                    item.children.some(
                                      (child) => child.url === pathname
                                    )
                                      ? "text-brand-primary dark:text-brand-secondary"
                                      : "text-gray-700 dark:text-gray-200"
                                  )}
                                >
                                  {item.icon && (
                                    <item.icon className="h-6 w-6 shrink-0" />
                                  )}

                                  {!isCollapsed && (
                                    <span className="text-gray-300">
                                      {item.title}
                                    </span>
                                  )}
                                </div>
                                {!isCollapsed && (
                                  <ChevronDown className="h-4 w-4 text-white  transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                )}
                              </div>
                            </UiSidebar.SidebarMenuButton>
                          </UiCollapsible.CollapsibleTrigger>
                          {!isCollapsed && (
                            <UiCollapsible.CollapsibleContent>
                              <UiSidebar.SidebarMenuSub>
                                {item.children.map((child) => {
                                  const isActive = pathname === child.url;
                                  return (
                                    <UiSidebar.SidebarMenuSubItem
                                      key={child.title}
                                    >
                                      <UiSidebar.SidebarMenuSubButton
                                        asChild
                                        className="hover:bg-brand-lime dark:hover:bg-brand-secondary"
                                      >
                                        <Link
                                          href={child.url!}
                                          className={cn(
                                            "flex items-center gap-2 font-medium my-1 group/item py-4",
                                            // Hover state for non-active items
                                            "hover:text-white dark:hover:text-white",
                                            isActive
                                              ? "bg-brand-lime text-white dark:bg-brand-secondary dark:text-brand-primary"
                                              : "text-neutral-400 dark:text-gray-200"
                                          )}
                                        >
                                          {child.icon && (
                                            <child.icon
                                              className={cn(
                                                "h-6 w-6 shrink-0",
                                                // Hover state
                                                "group-hover/item:!text-white dark:group-hover/item:text-white",
                                                isActive
                                                  ? "text-white dark:text-brand-primary"
                                                  : "!text-neutral-400 dark:text-gray-200"
                                              )}
                                            />
                                          )}
                                          <span
                                            className={cn(
                                              // Hover state
                                              "group-hover/item:text-white dark:group-hover/item:text-white",
                                              isActive
                                                ? "text-white dark:text-brand-primary"
                                                : "text-neutral-400 dark:text-gray-200"
                                            )}
                                          >
                                            {child.title}
                                          </span>
                                        </Link>
                                      </UiSidebar.SidebarMenuSubButton>
                                    </UiSidebar.SidebarMenuSubItem>
                                  );
                                })}
                              </UiSidebar.SidebarMenuSub>
                            </UiCollapsible.CollapsibleContent>
                          )}
                        </UiSidebar.SidebarMenuItem>
                      </UiCollapsible.Collapsible>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={item.title}
                      variants={itemVariants}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <UiSidebar.SidebarMenuItem>
                        <UiSidebar.SidebarMenuButton
                          asChild
                          className="hover:bg-brand-lime hover:text-white dark:hover:bg-brand-secondary dark:hover:text-brand-primary"
                          tooltip={isCollapsed ? item.title : undefined}
                        >
                          <Link
                            href={item.url!}
                            className={cn(
                              "flex items-center gap-2 font-medium my-2",
                              pathname === item.url
                                ? "text-white bg-brand-lime dark:text-brand-primary dark:bg-brand-secondary"
                                : "text-neutral-400 dark:text-gray-200"
                            )}
                          >
                            {item.icon && (
                              <item.icon className="h-6 w-6 flex-shrink-0" />
                            )}
                            {!isCollapsed && <span>{item.title}</span>}
                          </Link>
                        </UiSidebar.SidebarMenuButton>
                      </UiSidebar.SidebarMenuItem>
                    </motion.div>
                  )
                )}
              </div>
            ))}
          </motion.div>
        </UiSidebar.SidebarMenu>
      </UiSidebar.SidebarContent>

      {/*Footer*/}
      <UiSidebar.SidebarFooter className="bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800">
        <UiSidebar.SidebarMenu>
          <UiSidebar.SidebarMenuItem>
            <UiDropdownMenu.DropdownMenu>
              <UiDropdownMenu.DropdownMenuTrigger asChild>
                <UiSidebar.SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-brand-lime/10 dark:data-[state=open]:bg-brand-secondary/40 hover:bg-brand-lime/10 hover:text-brand-primary dark:hover:bg-brand-secondary/80 dark:hover:text-brand-primary"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded overflow-hidden flex items-center justify-center bg-gray-200 flex-shrink-0">
                      {user?.first_name ? (
                        <div className="shrink-0">
                          <div className="w-8 h-8 rounded bg-brand-primary flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              K
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-full bg-gray-100 dark:bg-gray-950 p-1 flex justify-center items-center">
                          <UserCircleIcon weight="fill" size={20} />
                        </div>
                      )}
                    </div>
                    {!isCollapsed && (
                      <div className="flex flex-col items-start min-w-0 flex-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate w-full">
                          {user?.first_name + " " + user?.last_name ||
                            "Loading..."}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-neutral-100 truncate w-full">
                          {user?.email || ""}
                        </span>
                      </div>
                    )}
                  </div>
                  {!isCollapsed && (
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 dark:text-white" />
                  )}
                </UiSidebar.SidebarMenuButton>
              </UiDropdownMenu.DropdownMenuTrigger>
              <UiDropdownMenu.DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={isCollapsed ? "right" : "bottom"}
                align="end"
                sideOffset={4}
              >
                <UiDropdownMenu.DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="w-8 h-8 rounded overflow-hidden flex items-center justify-center bg-gray-200 shrink-0">
                      {user?.first_name ? (
                        <div className="shrink-0">
                          <div className="w-8 h-8 rounded bg-brand-primary flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              K
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-full bg-gray-100 dark:bg-gray-950 p-1 flex justify-center items-center">
                          <UserCircleIcon weight="fill" size={20} />
                        </div>
                      )}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.first_name + " " + user?.last_name || "---"}
                      </span>
                      <span className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {user?.email || "---"}
                      </span>
                    </div>
                  </div>
                </UiDropdownMenu.DropdownMenuLabel>
                <UiDropdownMenu.DropdownMenuSeparator />
                <UiDropdownMenu.DropdownMenuGroup>
                  <UiDropdownMenu.DropdownMenuItem className="gap-2">
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-sm">Theme</span>
                      <div className="ml-auto">
                        <ThemeSwitchSimple />
                      </div>
                    </div>
                  </UiDropdownMenu.DropdownMenuItem>
                </UiDropdownMenu.DropdownMenuGroup>
                <UiDropdownMenu.DropdownMenuSeparator />
                <UiDropdownMenu.DropdownMenuItem
                  onClick={logoutService}
                  className="gap-2 text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </UiDropdownMenu.DropdownMenuItem>
              </UiDropdownMenu.DropdownMenuContent>
            </UiDropdownMenu.DropdownMenu>
          </UiSidebar.SidebarMenuItem>
        </UiSidebar.SidebarMenu>
      </UiSidebar.SidebarFooter>
    </UiSidebar.Sidebar>
  );
}
