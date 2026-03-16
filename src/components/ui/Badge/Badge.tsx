const BADGE_VARIANT = {
  Default: "default",
  Resuscitation: "resuscitation",
  Emergency: "emergency",
  Urgent: "urgent",
  SemiUrgent: "semi-urgent",
  NonUrgent: "non-urgent",
  Success: "success",
  Warning: "warning",
  Danger: "danger",
} as const;

type BadgeVariant = (typeof BADGE_VARIANT)[keyof typeof BADGE_VARIANT];

const BADGE_SIZE = {
  Small: "small",
  Medium: "medium",
  Large: "large",
} as const;

type BadgeSize = (typeof BADGE_SIZE)[keyof typeof BADGE_SIZE];

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-700",
  resuscitation: "bg-red-600 text-white",
  emergency: "bg-orange-500 text-white",
  urgent: "bg-yellow-500 text-black",
  "semi-urgent": "bg-green-500 text-white",
  "non-urgent": "bg-blue-500 text-white",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
};

const sizeStyles: Record<BadgeSize, string> = {
  small: "text-xs px-2 py-0.5",
  medium: "text-sm px-2.5 py-0.5",
  large: "text-sm px-3 py-1",
};

function Badge({ label, variant = "default", size = "medium" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {label}
    </span>
  );
}

export { Badge, BADGE_VARIANT, BADGE_SIZE };
export type { BadgeProps, BadgeVariant, BadgeSize };
