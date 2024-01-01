import "@/styles/globals.css";

import { fontSans, fontUrban } from "@/assets/fonts";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@/components/analytics";
import { ModalProvider } from "@/components/modal-provider";
import { InnerProviders, OuterProviders } from "@/components/providers";
import { TailwindIndicator } from "@/components/tailwind-indicator";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [],
  authors: [
    {
      name: "OKBRK",
    },
  ],
  creator: "OKBRK",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@okbrk",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <OuterProviders>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontUrban.variable,
          )}
        >
          <InnerProviders attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Analytics />
            <Toaster />
            <ModalProvider />
            <TailwindIndicator />
          </InnerProviders>
        </body>
      </html>
    </OuterProviders>
  );
}
