import * as React from "react";

import { cn } from "@/lib/utils";

import { ErrorMessage } from "./error-message";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  description?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, description, error, type, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <ErrorMessage message={error} />}
      </div>
    );
  },
);
Input.displayName = "Input";

const InputWithLabel = React.forwardRef<
  HTMLInputElement,
  InputProps & { label: string; error?: string | null; description?: string }
>(({ label, error, description, ...props }, ref) => {
  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={props.id}>{label}</Label>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <Input
        {...props}
        ref={ref}
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
});
InputWithLabel.displayName = "InputWithLabel";

export { Input, InputWithLabel };
