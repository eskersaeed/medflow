import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  padding?: "none" | "small" | "medium" | "large";
  hover?: boolean;
  onClick?: () => void;
}

const paddingStyles: Record<string, string> = {
  none: "p-0",
  small: "p-3",
  medium: "p-4",
  large: "p-6",
};

function Card({ children, padding = "medium", hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-slate-200 shadow-sm ${paddingStyles[padding]} ${hover ? "hover:shadow-md hover:border-slate-300 transition-shadow cursor-pointer" : ""}`}
    >
      {children}
    </div>
  );
}

export { Card };
export type { CardProps };
