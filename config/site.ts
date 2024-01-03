import { SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "OKBRK",
  description: "Automate your growth channels with OKBRK.",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com/okbrk",
    github: "https://github.com/okbrk/okbrk",
  },
  mailSupport: "support@okbrk.com",
};
