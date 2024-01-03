import Balancer from "react-wrap-balancer";

import { cn } from "@/lib/utils";

import { Typography } from "../ui/typography";

type PageHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: string;
  actions?: React.ReactNode;
  badges?: React.ReactNode;
  withGutter?: boolean;
};

export function PageHeader({
  title,
  subtitle,
  description,
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
      <div className="flex justify-between">
        <div className="grow-0">
          <div className="flex flex-col items-start gap-2 md:gap-4">
            <Typography
              as="h1"
              variant="h1"
              className="flex items-center gap-2"
            >
              {title}
            </Typography>

            {badges && badges}
          </div>

          {subtitle && <Typography variant="muted">{subtitle}</Typography>}
          {description && (
            <div>
              {/* <Balancer> */}
              <Typography variant="muted" className="mt-2" size="sm">
                {description}
              </Typography>
              {/* </Balancer> */}
            </div>
          )}
        </div>

        {actions && <div className="grow-0">{actions}</div>}
      </div>
    </div>
  );
}
