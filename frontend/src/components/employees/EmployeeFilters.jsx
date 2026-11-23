 
import { Search } from "lucide-react";

export default function EmployeeFilters({
  search,
  onSearch,
  department,
  onDepartment,
  status,
  onStatus,
  departments,
  onClear,
}) {
  const selectClass =
    "h-[39px] w-full sm:w-auto border border-gray-200 rounded-lg px-3 bg-white text-xs text-gray-600 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3.5 flex flex-wrap items-center gap-3 shadow-sm">
      {/* Search */}
      <label className="flex items-center gap-2 flex-1 min-w-[220px] h-[39px] border border-gray-200 rounded-lg px-3 text-gray-400 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400">
        <Search size={17} />

        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search by employee name or email"
          aria-label="Search employees"
          className="w-full min-w-0 text-xs text-gray-700 outline-none bg-transparent placeholder:text-gray-400"
        />
      </label>

      {/* Department */}
      <select
        value={department}
        onChange={(e) => onDepartment(e.target.value)}
        aria-label="Filter by department"
        className={selectClass}
      >
        <option value="">All departments</option>

        {departments.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        value={status}
        onChange={(e) => onStatus(e.target.value)}
        aria-label="Filter by status"
        className={selectClass}
      >
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      {/* Clear */}
      <button
        className="text-xs font-bold text-blue-600 hover:text-blue-800 whitespace-nowrap px-2 py-2"
        type="button"
        onClick={onClear}
      >
        Clear filters
      </button>
    </div>
  );
}
