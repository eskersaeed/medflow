import type { ReactNode } from "react";
import { useAuthStore } from "../stores/authStore";
import { hasPermission } from "../types/auth";
import type { Permission } from "../types/auth";

interface CanProps {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

function Can({ permission, children, fallback = null }: CanProps) {
  const role = useAuthStore((state) => state.user.role);

  if (!hasPermission(role, permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export { Can };
