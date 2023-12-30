import { SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Mrqt",
  description: "Automate your growht channels with Mrqt.",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com/mrqt",
    github: "https://github.com/mrqt/mrqt",
  },
  mailSupport: "support@mrqt.com",
};
