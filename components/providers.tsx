"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Provider as BalancerProvider } from "react-wrap-balancer";

export function InnerProviders({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <BalancerProvider>{children}</BalancerProvider>
    </NextThemesProvider>
  );
}

export function OuterProviders({ children, ...props }: ThemeProviderProps) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
