import { NavLink } from "react-router";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { hasPermission } from "@/features/auth/types/auth";
import type { Permission } from "@/features/auth/types/auth";
import type { StaffRole } from "@/features/auth/types/auth";

interface NavItem {
  label: string;
  path: string;
  permission?: Permission;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Triage Queue", path: "/" },
  { label: "Shift Schedule", path: "/shifts", permission: "manageShifts" },
  { label: "Dashboard", path: "/dashboard", permission: "viewDashboard" },
  { label: "Bed Management", path: "/beds" },
];

const ROLE_OPTIONS: { label: string; value: StaffRole }[] = [
  { label: "Nurse", value: "nurse" },
  { label: "Charge Nurse", value: "charge-nurse" },
  { label: "Admin", value: "admin" },
];

function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const switchRole = useAuthStore((state) => state.switchRole);

  return (
    <aside className="w-64 bg-slate-900 min-h-screen p-4 flex flex-col">
      <div className="mb-8 px-3">
        <h1 className="text-xl font-bold text-white">MedFlow</h1>
        <p className="text-xs text-slate-400 mt-1">Clinical Dashboard</p>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          if (item.permission && !hasPermission(user.role, item.permission)) {
            return null;
          }
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-700 pt-4 px-3 space-y-3">
        <div>
          <p className="text-sm text-white font-medium">{user.name}</p>
          <p className="text-xs text-slate-400 capitalize">{user.role.replace("-", " ")}</p>
          <p className="text-xs text-slate-500">{user.department}</p>
        </div>

        <select
          value={user.role}
          onChange={(e) => switchRole(e.target.value as StaffRole)}
          className="w-full bg-slate-800 text-slate-300 text-xs rounded px-2 py-1.5 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {ROLE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              Switch to: {option.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}

export { Sidebar };
