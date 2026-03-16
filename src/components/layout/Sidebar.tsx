import { NavLink } from "react-router";

interface NavItem {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Triage Queue", path: "/" },
  { label: "Shift Schedule", path: "/shifts" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Bed Management", path: "/beds" },
];

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 min-h-screen p-4 flex flex-col">
      <div className="mb-8 px-3">
        <h1 className="text-xl font-bold text-white">MedFlow</h1>
        <p className="text-xs text-slate-400 mt-1">Clinical Dashboard</p>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => (
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
        ))}
      </nav>

      <div className="border-t border-slate-700 pt-4 px-3">
        <p className="text-sm text-slate-400">Nurse Saeed</p>
        <p className="text-xs text-slate-500">A&E Department</p>
      </div>
    </aside>
  );
}

export { Sidebar };
