import { ReactNode } from "react";

type BadgeVariant =
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "success"
  | "open"
  | "in-progress"
  | "resolved";

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  critical: "bg-critical-bg text-critical border-critical/20",
  high: "bg-high-bg text-high border-high/20",
  medium: "bg-medium-bg text-medium border-medium/20",
  low: "bg-low-bg text-low border-low/20",
  success: "bg-success-bg text-success border-success/20",
  open: "bg-medium-bg text-medium border-medium/20",
  "in-progress": "bg-high-bg text-high border-high/20",
  resolved: "bg-success-bg text-success border-success/20",
};

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
