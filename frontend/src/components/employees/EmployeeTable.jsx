 
import { Link } from "react-router-dom";
import { Eye, Pencil } from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import StatusBadge from "../common/StatusBadge";

export default function EmployeeTable({ employees, onToggleStatus }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse whitespace-nowrap">
        <thead>
          <tr className="bg-gray-50">
            {[
              "EMPLOYEE",
              "JOB TITLE",
              "DEPARTMENT",
              "JOINING DATE",
              "STATUS",
              "ACTIONS",
            ].map((heading) => (
              <th
                key={heading}
                className="text-left text-[9px] tracking-[0.7px] text-gray-400 font-bold px-[15px] py-3"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr
              key={employee._id}
              className="border-t border-gray-100 hover:bg-gray-50/70 transition-colors"
            >
              <td className="px-[15px] py-3 min-w-[180px]">
                <b className="block text-xs text-slate-800">
                  {employee.name}
                </b>
                <small className="block text-[10px] text-gray-400 mt-1">
                  {employee.email}
                </small>
              </td>

              <td className="px-[15px] py-3 text-[11px] text-gray-600">
                {employee.jobTitle}
              </td>

              <td className="px-[15px] py-3 text-[11px] text-gray-600">
                {employee.department?.name || "—"}
              </td>

              <td className="px-[15px] py-3 text-[11px] text-gray-600">
                {formatDate(employee.joiningDate)}
              </td>

              <td className="px-[15px] py-3">
                <StatusBadge active={employee.isActive} />
              </td>

              <td className="px-[15px] py-3">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/employees/${employee._id}`}
                    title="View employee"
                    aria-label={`View ${employee.name}`}
                    className="border border-gray-200 bg-white rounded-md p-1.5 text-gray-500 hover:text-blue-600 hover:border-blue-200"
                  >
                    <Eye size={16} />
                  </Link>

                  <Link
                    to={`/employees/${employee._id}/edit`}
                    title="Edit employee"
                    aria-label={`Edit ${employee.name}`}
                    className="border border-gray-200 bg-white rounded-md p-1.5 text-gray-500 hover:text-blue-600 hover:border-blue-200"
                  >
                    <Pencil size={16} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => onToggleStatus(employee)}
                    className="border border-gray-200 bg-white rounded-md px-2 py-1.5 text-[10px] text-gray-600 hover:bg-gray-50"
                  >
                    {employee.isActive ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
