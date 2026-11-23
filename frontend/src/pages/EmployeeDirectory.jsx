
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import useDepartments from "../hooks/useDepartments";
import useEmployees from "../hooks/useEmployees";
import { employeeService } from "../services/employeeService";
import { getErrorMessage } from "../api/client";

import EmployeeFilters from "../components/employees/EmployeeFilters";
import EmployeeTable from "../components/employees/EmployeeTable";
import Pagination from "../components/employees/Pagination";
import Alert from "../components/common/Alert";
import Loading from "../components/common/Loading";

export default function EmployeeDirectory() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState("");
  const [actionError, setActionError] = useState("");

  const { departments } = useDepartments();

  const params = useMemo(
    () => ({ page, limit: 10, search, department, status }),
    [page, search, department, status]
  );

  const { employees, pagination, loading, error, reload } =
    useEmployees(params);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.notice) {
      setNotice(location.state.notice);

      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  }, [location.state, location.pathname, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  function clearFilters() {
    setSearchInput("");
    setSearch("");
    setDepartment("");
    setStatus("");
    setPage(1);
  }

  async function toggleStatus(employee) {
    const nextStatus = !employee.isActive;

    if (
      !window.confirm(
        `${nextStatus ? "Activate" : "Deactivate"} ${employee.name}?`
      )
    ) {
      return;
    }

    try {
      await employeeService.updateStatus(employee._id, nextStatus);

      setNotice(
        `Employee ${nextStatus ? "activated" : "deactivated"} successfully.`
      );

      setActionError("");
      await reload();
    } catch (err) {
      setActionError(getErrorMessage(err));
    }
  }

  return (
    <div className="grid gap-5">
      {/* Page Heading */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <span className="text-[10px] font-bold tracking-[1.15px] text-gray-400 uppercase">
            People Directory
          </span>

          <h2 className="text-[25px] font-extrabold text-slate-800 mt-1.5">
            Employees
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            Search, view and manage employee records.
          </p>
        </div>

        <Link
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
          to="/employees/new"
        >
          <Plus size={16} />
          Add employee
        </Link>
      </div>

      {/* Notifications */}
      <Alert type="success" onClose={() => setNotice("")}>
        {notice}
      </Alert>

      <Alert onClose={() => setActionError("")}>
        {actionError}
      </Alert>

      {/* Filters */}
      <EmployeeFilters
        search={searchInput}
        onSearch={setSearchInput}
        department={department}
        onDepartment={(value) => {
          setDepartment(value);
          setPage(1);
        }}
        status={status}
        onStatus={(value) => {
          setStatus(value);
          setPage(1);
        }}
        departments={departments}
        onClear={clearFilters}
      />

      {/* Employee Table */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-5">
          <h3 className="text-sm font-bold text-slate-800">
            Employee list
          </h3>

          <p className="text-xs text-gray-500 mt-1">
            {pagination.total} employee records found
          </p>
        </div>

        {loading ? (
          <Loading label="Loading employees..." />
        ) : error ? (
          <div className="px-5 pb-5">
            <Alert>{error}</Alert>
          </div>
        ) : employees.length ? (
          <>
            <EmployeeTable
              employees={employees}
              onToggleStatus={toggleStatus}
            />

            <Pagination
              pagination={pagination}
              onPageChange={setPage}
            />
          </>
        ) : (
          <div className="text-center px-5 py-9 border-t border-gray-100">
            <b className="block text-sm text-slate-700">
              No employees found
            </b>

            <p className="text-xs text-gray-500 mt-2">
              Try changing your search or filters.
            </p>

            <button
              className="text-xs font-bold text-blue-600 hover:text-blue-800 mt-3"
              type="button"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
