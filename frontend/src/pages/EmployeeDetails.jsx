
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { employeeService } from "../services/employeeService";
import { getErrorMessage } from "../api/client";
import { formatDate } from "../utils/formatDate";

import StatusBadge from "../components/common/StatusBadge";
import Loading from "../components/common/Loading";
import Alert from "../components/common/Alert";

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    employeeService
      .get(id)
      .then((data) => {
        if (mounted) setEmployee(data);
      })
      .catch((err) => {
        if (mounted) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  async function toggleStatus() {
    const next = !employee.isActive;

    if (!window.confirm(`${next ? "Activate" : "Deactivate"} ${employee.name}?`)) {
      return;
    }

    try {
      const response = await employeeService.updateStatus(id, next);
      setEmployee(response.data);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  async function deleteEmployee() {
    if (
      !window.confirm(
        `Permanently delete ${employee.name}? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      await employeeService.remove(id);

      navigate("/employees", {
        replace: true,
        state: { notice: "Employee deleted successfully." },
      });
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  if (loading) {
    return <Loading label="Loading employee details..." />;
  }

  if (!employee) {
    return (
      <div className="grid gap-5">
        <Alert>{error || "Employee not found."}</Alert>

        <Link
          to="/employees"
          className="text-xs font-semibold text-blue-600 hover:text-blue-800"
        >
          ← Back to employees
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <Link
        className="text-[11px] text-gray-500 hover:text-blue-600"
        to="/employees"
      >
        ← Back to employees
      </Link>

      <Alert>{error}</Alert>

      <section className="max-w-[900px] w-full bg-white border border-gray-200 rounded-xl shadow-sm p-5 sm:p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="w-[58px] h-[58px] rounded-full bg-indigo-50 text-blue-700 text-[22px] font-bold flex items-center justify-center shrink-0">
            {employee.name?.charAt(0)?.toUpperCase()}
          </span>

          <div className="grid gap-1 flex-1 min-w-[150px]">
            <span className="text-[9px] tracking-widest font-bold text-gray-400">
              EMPLOYEE PROFILE
            </span>

            <h2 className="text-[22px] font-extrabold text-slate-800">
              {employee.name}
            </h2>

            <p className="text-xs text-gray-500">
              {employee.jobTitle}
            </p>

            <div>
              <StatusBadge active={employee.isActive} />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Link
              className="px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              to={`/employees/${id}/edit`}
            >
              Edit details
            </Link>

            <button
              type="button"
              className="px-3.5 py-2.5 rounded-lg bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100"
              onClick={deleteEmployee}
            >
              Delete
            </button>
          </div>
        </div>

        {/* Employee Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 mt-6 border-y border-gray-100">
          <div className="grid gap-1.5">
            <small className="text-[10px] text-gray-400">Work email</small>
            <b className="text-xs text-slate-800">{employee.email}</b>
          </div>

          <div className="grid gap-1.5">
            <small className="text-[10px] text-gray-400">Job title</small>
            <b className="text-xs text-slate-800">{employee.jobTitle}</b>
          </div>

          <div className="grid gap-1.5">
            <small className="text-[10px] text-gray-400">Department</small>
            <b className="text-xs text-slate-800">
              {employee.department?.name || "—"}
            </b>
          </div>

          <div className="grid gap-1.5">
            <small className="text-[10px] text-gray-400">Joining date</small>
            <b className="text-xs text-slate-800">
              {formatDate(employee.joiningDate)}
            </b>
          </div>
        </div>

        {/* Employment Status */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-5">
          <div className="grid gap-1">
            <b className="text-xs text-slate-800">
              Employment status
            </b>

            <small className="text-[10px] text-gray-500">
              {employee.isActive
                ? "This employee is currently active."
                : "This employee is currently inactive."}
            </small>
          </div>

          <button
            type="button"
            className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
            onClick={toggleStatus}
          >
            {employee.isActive ? "Deactivate employee" : "Activate employee"}
          </button>
        </div>
      </section>
    </div>
  );
}
