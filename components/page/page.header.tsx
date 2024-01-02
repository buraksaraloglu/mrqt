import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/breadcrumbs";

import { Typography } from "../ui/typography";

type PageHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  badges?: React.ReactNode;
  withGutter?: boolean;
};

export function PageHeader({
  title,
  subtitle,
  badges,
  actions,
  withGutter,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "grid gap-4 border-b py-2 sm:gap-4 md:py-4",
        withGutter && "px-4 md:px-6",
      )}
    >
      <Breadcrumbs />
      <div className="flex justify-between">
        <div className="grow-0">
          <div className="flex flex-col items-start gap-2 md:gap-4">
            <Typography
              as="h1"
              variant="h2"
              className="flex items-center gap-2"
            >
              {title}
            </Typography>

            {badges && badges}
          </div>

          {subtitle && <Typography variant="muted">{subtitle}</Typography>}
        </div>

        {actions && <div className="grow-0">{actions}</div>}
      </div>
    </div>
  );
}
