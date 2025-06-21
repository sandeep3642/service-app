export default function GlobalPagination({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}) {
  const rowsPerPageOptions = [10, 20, 50];

  return (
    <div className="flex justify-between items-center px-4 py-4">
      <div className="flex items-center gap-2">
        <label htmlFor="rowsPerPage" className="text-sm text-gray-700">
          Rows per page:
        </label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="border px-2 py-1 text-sm rounded text-black"
        >
          {rowsPerPageOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50 text-black cursor-pointer"
        >
          Previous
        </button>

        <span className="text-sm text-black">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50 text-black cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
