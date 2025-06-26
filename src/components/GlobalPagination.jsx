export default function GlobalPagination({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}) {
  const rowsPerPageOptions = [10, 20, 50];

  return (
    <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:justify-between sm:items-center">
      {/* Rows per page - Top on mobile, left on desktop */}
      <div className="flex items-center justify-center gap-2 sm:justify-start">
        <label
          htmlFor="rowsPerPage"
          className="text-sm text-gray-700 whitespace-nowrap"
        >
          Rows per page:
        </label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="border px-2 py-1 text-sm rounded text-black min-w-16"
        >
          {rowsPerPageOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Navigation controls - Bottom on mobile, right on desktop */}
      <div className="flex items-center justify-center gap-2 sm:justify-end">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border rounded disabled:opacity-50 text-black cursor-pointer text-sm min-w-20"
        >
          Previous
        </button>

        <span className="text-sm text-black whitespace-nowrap px-2">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border rounded disabled:opacity-50 text-black cursor-pointer text-sm min-w-16"
        >
          Next
        </button>
      </div>
    </div>
  );
}
