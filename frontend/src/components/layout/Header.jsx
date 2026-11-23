 
import { useLocation } from "react-router-dom";

export default function Header() {
  const path = useLocation().pathname;

  const title =
    path === "/"
      ? "Dashboard"
      : path.endsWith("/new")
        ? "Add Employee"
        : path.endsWith("/edit")
          ? "Edit Employee"
          : path.split("/").length > 2
            ? "Employee Details"
            : "Employees";

  return (
    <header className="w-full min-h-[82px] bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-[38px] py-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <span className="text-[9px] font-bold tracking-[1.15px] text-gray-400 uppercase">
          People Management
        </span>

        <h1 className="text-xl font-bold text-slate-800 mt-1">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
          A
        </div>

        <span className="hidden sm:block text-sm font-semibold text-gray-600">
          Admin Workspace
        </span>
      </div>
    </header>
  );
}
