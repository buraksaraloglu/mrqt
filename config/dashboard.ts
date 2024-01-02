import { DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Panel",
      href: "/app",
      icon: "post",
    },
    {
      title: "Channels",
      href: "/app/channel/facebook",
      icon: "container",
    },
    {
      title: "Billing",
      href: "/app/billing",
      icon: "billing",
    },
    {
      title: "Me",
      href: "/app/me",
      icon: "user",
    },
    {
      title: "Settings",
      href: "/app/settings",
      icon: "settings",
    },
  ],
};
