import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-slate-100">
        <Outlet />
      </main>
    </div>
  );
}

export { MainLayout };
