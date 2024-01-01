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
      title: "Ad Accounts",
      href: "/app/ad-account/facebook",
      icon: "post",
    },
    {
      title: "Facebook",
      href: "/app/facebook",
      icon: "post",
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
