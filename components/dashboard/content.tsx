interface DashboardContentProps {
  children?: React.ReactNode;
}

export function DashboardContent({ children }: DashboardContentProps) {
  return <div className="grid">{children}</div>;
}
