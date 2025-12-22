import * as Icon from "@phosphor-icons/react";
import { routes } from ".";
import { UserRole } from "@/interfaces";

type PhosphorIcon = React.FC<Icon.IconProps>;

// Define menu item types
interface MenuItem {
  title: string;
  url?: string;
  icon?: PhosphorIcon;

  children?: MenuItem[];
  roles?: UserRole[];
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
  roles?: UserRole[];
}

// Menu items organized by groups
export const menuGroups: MenuGroup[] = [
  {
    label: "Dashboard",
    items: [
      {
        title: "Overview",
        url: routes.dashboard.overview,
        icon: Icon.CubeIcon,
      },
      {
        title: "Batching",
        url: routes.dashboard.batching,
        icon: Icon.BookIcon,
      },

      {
        title: "Manifest",
        url: routes.dashboard.manifest.index,
        icon: Icon.FileDottedIcon,
      },
    ],
    roles: ["finance", "marketing", "operations", "super"],
  },

  {
    label: "Managemnet",
    items: [
      {
        title: "Certificate",
        url: routes.dashboard.management.certificate.index,
        icon: Icon.CertificateIcon,
        roles: ["marketing", "writer"],
      },
    ],
    roles: ["super", "marketing"],
  },
  {
    label: "System",
    items: [
      {
        title: "Audit Logs",
        url: routes.dashboard.system.auditLogs.index,
        icon: Icon.ClockCounterClockwiseIcon,
        roles: ["marketing"],
      },
    ],
    roles: ["super", "marketing"],
  },

  // {
  //   label: "Management",
  //   items: [
  //     {
  //       title: "Certficate Management",
  //       // icon: Icon.CertificateIcon,
  //       children: [
  //         {
  //           title: "Certificate",
  //           url: routes.dashboard.management.certificate.index,
  //           icon: Icon.CertificateIcon,
  //           roles: ["marketing", "writer"],
  //         },
  //       ],
  //     },
  //   ],
  //   roles: ["super", "marketing", "writer"],
  // },
];

// Keep the old flat structure for backward compatibility if needed
export const menuItems = menuGroups.flatMap((group) => group.items);

// ROle based access
export const filterMenuByRole = (
  menuGroups: MenuGroup[],
  userRole: UserRole
): MenuGroup[] => {
  return menuGroups
    .filter((group) => {
      // If no roles specified, everyone can see it
      if (!group.roles || group.roles.length === 0) return true;
      // Check if user's role is in the allowed roles
      return group.roles.includes(userRole) || userRole === "super";
    })
    .map((group) => ({
      ...group,
      items: group.items.map((item) => ({
        ...item,
        children: item.children?.filter((child) => {
          // role checks to individual items if needed
          if (!child.roles || child.roles.length === 0) return true;
          return child.roles.includes(userRole) || userRole === "super";
        }),
      })),
    }));
};
