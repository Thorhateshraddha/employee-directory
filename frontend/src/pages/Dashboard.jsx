
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  UserCheck,
  UserX,
  Building2,
  Plus,
} from "lucide-react";

import { employeeService } from "../services/employeeService";
import { departmentService } from "../services/departmentService";
import { getErrorMessage } from "../api/client";
import { formatDate } from "../utils/formatDate";

import StatCard from "../components/dashboard/StatCard";
import Alert from "../components/common/Alert";
import Loading from "../components/common/Loading";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    departments: 0,
  });

  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      employeeService.list({ page: 1, limit: 100 }),
      departmentService.list(),
    ])
      .then(([result, departments]) => {
        const rows = result.data || [];
        const activeCount = rows.filter((row) => row.isActive).length;

        setStats({
          total: result.pagination?.total ?? rows.length,
          active: activeCount,
          inactive: rows.length - activeCount,
          departments: departments.length,
        });

        setRecent(rows.slice(0, 5));
      })
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading label="Loading dashboard..." />;
  }

  return (
    <div className="grid gap-5">

      {/* Welcome Section */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <span className="text-[10px] font-bold tracking-[1.15px] text-gray-400 uppercase">
            Your Company at a Glance
          </span>

          <h2 className="text-2xl font-extrabold text-slate-800 mt-1.5">
            Welcome to your workspace
          </h2>

          <p className="text-xs text-gray-500 mt-1.5">
            Manage employee information in one place.
          </p>
        </div>

        <Link
          to="/employees/new"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus size={16} />
          Add employee
        </Link>
      </div>

      {/* Error Alert */}
      <Alert>{error}</Alert>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[15px]">
        <StatCard
          label="Total employees"
          value={stats.total}
          icon={Users}
        />

        <StatCard
          label="Active employees"
          value={stats.active}
          icon={UserCheck}
        />

        <StatCard
          label="Inactive employees"
          value={stats.inactive}
          icon={UserX}
        />

        <StatCard
          label="Departments"
          value={stats.departments}
          icon={Building2}
        />
      </div>

      {/* Recent Employees */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">

        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Recently added employees
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Latest employee records.
            </p>
          </div>

          <Link
            to="/employees"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 whitespace-nowrap"
          >
            View all →
          </Link>
        </div>

        {recent.length ? (
          recent.map((employee) => (
            <div
              className="flex items-center gap-3 py-3 border-t border-gray-100 flex-wrap sm:flex-nowrap"
              key={employee._id}
            >
              {/* Employee Initial */}
              <span className="w-[34px] h-[34px] rounded-full bg-indigo-50 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                {employee.name?.charAt(0)?.toUpperCase()}
              </span>

              {/* Employee Information */}
              <div className="flex-1 min-w-[130px] grid gap-[3px]">
                <b className="text-xs text-slate-800">
                  {employee.name}
                </b>

                <small className="text-[10px] text-gray-500">
                  {employee.jobTitle} · {employee.department?.name || "—"}
                </small>
              </div>

              {/* Date */}
              <small className="text-[10px] text-gray-500">
                {formatDate(employee.createdAt || employee.joiningDate)}
              </small>

              {/* Status */}
              <span
                className={`text-[10px] font-bold px-2 py-[5px] rounded-full whitespace-nowrap ${
                  employee.isActive
                    ? "bg-green-50 text-green-700"
                    : "bg-orange-50 text-orange-700"
                }`}
              >
                {employee.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-9 px-4 text-xs text-gray-500">
            No employees added yet. Use “Add employee” to create your first
            record.
          </div>
        )}
      </section>
    </div>
  );
}
