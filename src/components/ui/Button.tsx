const BUTTON_VARIANT = {
  Primary: "primary",
  Secondary: "secondary",
  Danger: "danger",
  Ghost: "ghost",
} as const;

type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];

const BUTTON_SIZE = {
  Small: "small",
  Medium: "medium",
  Large: "large",
} as const;

type ButtonSize = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE];

interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
  secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300 active:bg-slate-400",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100 active:bg-slate-200",
};

const sizeStyles: Record<ButtonSize, string> = {
  small: "text-sm px-3 py-1.5",
  medium: "text-sm px-4 py-2",
  large: "text-base px-6 py-2.5",
};

function Button({
  label,
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {label}
    </button>
  );
}

export { Button, BUTTON_VARIANT, BUTTON_SIZE };
export type { ButtonProps, ButtonVariant, ButtonSize };
