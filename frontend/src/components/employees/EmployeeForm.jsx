
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { employeeService } from "../../services/employeeService";
import useDepartments from "../../hooks/useDepartments";
import { getErrorMessage } from "../../api/client";
import { toDateInput } from "../../utils/formatDate";

import Alert from "../common/Alert";
import Loading from "../common/Loading";

const emptyForm = {
  name: "",
  email: "",
  jobTitle: "",
  department: "",
  joiningDate: "",
  isActive: true,
};

const inputClass =
  "w-full h-10 border border-gray-200 rounded-lg px-3 text-xs text-gray-700 outline-none bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

const labelClass =
  "grid gap-2 text-[11px] text-gray-600 font-semibold";

const errorClass =
  "text-[10px] text-red-600 font-medium";

export default function EmployeeForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();

  const {
    departments,
    departmentsLoading,
    departmentsError,
  } = useDepartments();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Load employee details when editing
  useEffect(() => {
    if (!editing) return;

    let mounted = true;

    employeeService
      .get(id)
      .then((employee) => {
        if (mounted) {
          setForm({
            name: employee.name || "",
            email: employee.email || "",
            jobTitle: employee.jobTitle || "",
            department: employee.department?._id || "",
            joiningDate: toDateInput(employee.joiningDate),
            isActive: Boolean(employee.isActive),
          });
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(getErrorMessage(err));
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [id, editing]);

  // Handle input changes
  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setFieldErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  // Validate form fields
  function validate() {
    const errors = {};

    if (form.name.trim().length < 2) {
      errors.name = "Name must contain at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email.trim())) {
      errors.email = "Enter a valid email address.";
    }

    if (!form.jobTitle.trim()) {
      errors.jobTitle = "Job title is required.";
    }

    if (!form.department) {
      errors.department = "Please select a department.";
    }

    if (
      !form.joiningDate ||
      Number.isNaN(new Date(form.joiningDate).getTime())
    ) {
      errors.joiningDate = "Please select a valid joining date.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  }

  // Submit employee data
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!validate()) return;

    setSaving(true);

    const payload = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      jobTitle: form.jobTitle.trim(),
    };

    try {
      if (editing) {
        await employeeService.update(id, payload);
      } else {
        await employeeService.create(payload);
      }

      navigate("/employees", {
        replace: true,
        state: {
          notice: editing
            ? "Employee details updated successfully."
            : "Employee added successfully.",
        },
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  if (loading || departmentsLoading) {
    return <Loading label="Loading employee form..." />;
  }

  return (
    <div className="grid gap-5">
      {/* Back Link */}
      <Link
        className="text-[11px] text-gray-500 hover:text-blue-600"
        to={editing ? `/employees/${id}` : "/employees"}
      >
        ← Back
      </Link>

      {/* Page Heading */}
      <div>
        <span className="text-[10px] font-bold tracking-[1.15px] text-gray-400 uppercase">
          Employee Record
        </span>

        <h2 className="text-[25px] font-extrabold text-slate-800 mt-1.5">
          {editing ? "Edit employee" : "Add a new employee"}
        </h2>

        <p className="text-xs text-gray-500 mt-1">
          Enter the employee details below. Fields marked * are required.
        </p>
      </div>

      {/* API / Department Errors */}
      <Alert>{error || departmentsError}</Alert>

      {/* Employee Form */}
      <form
        className="w-full max-w-[900px] bg-white border border-gray-200 rounded-xl shadow-sm p-5 sm:p-6"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">

          {/* Employee Name */}
          <label className={labelClass}>
            Full name *

            <input
              className={inputClass}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Aditi Sharma"
              maxLength="80"
            />

            {fieldErrors.name && (
              <small className={errorClass}>
                {fieldErrors.name}
              </small>
            )}
          </label>

          {/* Email */}
          <label className={labelClass}>
            Work email *

            <input
              className={inputClass}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@company.com"
            />

            {fieldErrors.email && (
              <small className={errorClass}>
                {fieldErrors.email}
              </small>
            )}
          </label>

          {/* Job Title */}
          <label className={labelClass}>
            Job title *

            <input
              className={inputClass}
              name="jobTitle"
              value={form.jobTitle}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
              maxLength="80"
            />

            {fieldErrors.jobTitle && (
              <small className={errorClass}>
                {fieldErrors.jobTitle}
              </small>
            )}
          </label>

          {/* Department */}
          <label className={labelClass} htmlFor="department">
            Department *

            <select
              id="department"
              className={`${inputClass} disabled:bg-gray-50 disabled:text-gray-400`}
              name="department"
              value={form.department}
              onChange={handleChange}
              disabled={departments.length === 0}
              required
            >
              <option value="">
                {departmentsError
                  ? "Unable to load departments"
                  : departments.length === 0
                    ? "No departments available"
                    : "-- Select Department --"}
              </option>

              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>

            {fieldErrors.department && (
              <small className={errorClass}>
                {fieldErrors.department}
              </small>
            )}

            {departmentsError && (
              <small className={errorClass}>
                {departmentsError}
              </small>
            )}
          </label>

          {/* Joining Date */}
          <label className={labelClass}>
            Joining date *

            <input
              className={inputClass}
              name="joiningDate"
              type="date"
              value={form.joiningDate}
              onChange={handleChange}
            />

            {fieldErrors.joiningDate && (
              <small className={errorClass}>
                {fieldErrors.joiningDate}
              </small>
            )}
          </label>

          {/* Active Status */}
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer self-center">
            <input
              className="w-4 h-4 accent-blue-600"
              name="isActive"
              type="checkbox"
              checked={form.isActive}
              onChange={handleChange}
            />
            Active employee
          </label>
        </div>

        {/* Form Buttons */}
        <div className="flex justify-end flex-wrap gap-2 border-t border-gray-100 mt-6 pt-5">
          <Link
            className="px-4 py-2.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
            to={editing ? `/employees/${id}` : "/employees"}
          >
            Cancel
          </Link>

          <button
            className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={saving || departments.length === 0}
          >
            {saving
              ? "Saving..."
              : editing
                ? "Save changes"
                : "Add employee"}
          </button>
        </div>
      </form>
    </div>
  );
}
