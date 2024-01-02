"use client";

import React, { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

const Separator = () => (
  <Typography variant="muted" as="span" aria-hidden="true" size="sm">
    /
  </Typography>
);

type BreadcrumbItemProps = {
  path: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
};

export const BreadcrumbItem = ({
  path,
  children,
  isActive,
  className,
}: BreadcrumbItemProps) => {
  return (
    <li className={cn("")}>
      <Link href={path} className={cn(className)}>
        <Typography variant="muted" size="sm">
          {children}
        </Typography>
      </Link>
    </li>
  );
};

export const Breadcrumbs = ({
  className,
  capitalizeLinks,
}: {
  capitalizeLinks?: boolean;
  className?: string;
}) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  if (!pathNames.length) {
    return null;
  }

  return (
    <ol
      className={cn(
        "inline-flex items-center space-x-1 md:space-x-3",
        className,
      )}
    >
      {pathNames.map((link, index) => {
        const href = `/${pathNames.slice(0, index + 1).join("/")}`;

        const itemLink = capitalizeLinks
          ? link[0].toUpperCase() + link.slice(1, link.length)
          : link;
        return (
          <React.Fragment key={index}>
            <li
              className={cn(
                "inline-flex items-center space-x-1 md:space-x-3",
                className,
              )}
            >
              <Link href={href}>
                <Typography
                  variant={paths === href ? "primary" : "muted"}
                  size="sm"
                >
                  {itemLink}
                </Typography>
              </Link>
            </li>
            {pathNames.length !== index + 1 && <Separator />}
          </React.Fragment>
        );
      })}
    </ol>
  );
};
