 
export default function Pagination({ pagination, onPageChange }) {
  const {
    page = 1,
    totalPages = 0,
    total = 0,
    limit = 10,
  } = pagination;

  if (!total) return null;

  const first = (page - 1) * limit + 1;
  const last = Math.min(page * limit, total);

  const buttonClass =
    "border border-gray-200 bg-white px-3 py-1.5 rounded-md text-[10px] font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className="px-5 py-3.5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[10px] text-gray-500">
      <span>
        Showing {first}–{last} of {total} employees
      </span>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className={buttonClass}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          type="button"
          className={buttonClass}
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
