
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ContactRound,
} from "lucide-react";

export default function Sidebar() {
  const navClass = ({ isActive }) =>
    `flex items-center gap-[11px] px-3 py-3 my-[3px] rounded-lg text-[13px] font-semibold transition-colors duration-200 ${
      isActive
        ? "bg-indigo-50 text-blue-700"
        : "text-gray-500 hover:bg-indigo-50 hover:text-blue-700"
    }`;

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-[238px] bg-white border-r border-gray-200 px-[18px] py-[25px] flex flex-col
      max-[650px]:static max-[650px]:w-full max-[650px]:min-h-0 max-[650px]:px-[15px] max-[650px]:py-3">

      {/* Brand */}
      <div className="flex items-center gap-2.5 px-[7px] pb-[34px] max-[650px]:pb-3">
        <span className="w-[37px] h-[37px] rounded-[10px] bg-indigo-50 text-blue-700 flex items-center justify-center shrink-0">
          <ContactRound size={21} />
        </span>

        <span>
          <b className="block text-lg font-extrabold text-slate-800">
            PeopleDesk
          </b>

          <small className="text-[9px] font-bold tracking-[1.15px] text-gray-400">
            PEOPLE MANAGEMENT
          </small>
        </span>
      </div>

      {/* Navigation */}
      <div className="text-[10px] text-gray-400 tracking-widest px-2.5 pb-[9px] max-[650px]:hidden">
        WORKSPACE
      </div>

      <nav className="flex flex-col max-[650px]:flex-row max-[650px]:gap-2">
        <NavLink end to="/" className={navClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/employees" className={navClass}>
          <Users size={18} />
          Employees
        </NavLink>
      </nav>

      {/* Sidebar Note */}
      <div className="mt-auto bg-indigo-50 p-[15px] rounded-[10px] text-xs max-[650px]:hidden">
        <b className="text-slate-800">Employee Directory</b>

        <p className="text-[11px] leading-relaxed text-gray-500 mt-[7px]">
          Keep your team information organised in one place.
        </p>
      </div>
    </aside>
  );
}
