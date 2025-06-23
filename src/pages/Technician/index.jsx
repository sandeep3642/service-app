import DataTable from "../../components/Table";
import DeleteCustomerModal from "../../components/DeleteModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";
import EditTechnician from "./EditTechnician";
import { fetchTechniciansList } from "./technician";
import GlobalPagination from "../../components/GlobalPagination";
import Loader from "../../utilty/Loader";
import { useDebounce } from "../../hooks";
const technicianHeaders = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Mobile No." },
  { key: "serviceCategories", label: "Service" },
  { key: "jobCompleted", label: "Total..." },
  { key: "joinedAt", label: "Joined On" },
  { key: "isActive", label: "Status" },
];
const Technician = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const actionMenu = ["View Detail", "Edit", "Delete"];
  const [technicianData, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 500);

  const handleDeleteConfirm = () => {
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleAddNewTechnician = () => {
    navigate("/add-new-technician");
  };

  async function fetchTechnician(page = 1, limit = 10, search) {
    try {
      setLoading(true);
      const response = await fetchTechniciansList(page, limit, search);
      const { details, status } = response;

      if (status.success && Array.isArray(details.technicians)) {
        setTechnicians(details.technicians);

        setTotalItems(details.pagination?.total || 0);
      }
    } catch (error) {
      toast.error("Failed to fetch service requests");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTechnician(currentPage, rowsPerPage, debouncedSearchTerm);
  }, [debouncedSearchTerm, currentPage, rowsPerPage]);

  const handleRowAction = (row, mode) => {
    console.log(mode);
    if (mode === "View Detail") {
      navigate("/technician-view", { state: row._id });
    }
    if (mode === "Delete") {
      setIsModalOpen(true);
    }
    if (mode === "Edit") {
      setIsEditModalOpen(true);
    }
    // Handle your actions here
  };
  if (loading) return <Loader />;
  return (
    <div>
      <div className="py-3 flex items-center justify-end ">
        <button
          onClick={handleAddNewTechnician}
          className="px-4 py-3 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-500 font-medium
        cursor-pointer
        "
        >
          <span className="font-bold"> + </span>
          Add Technician
        </button>
      </div>
      <DataTable
        headers={technicianHeaders}
        data={technicianData}
        searchable={true}
        sortable={true}
        actionColumn={true}
        onRowAction={handleRowAction}
        name="Technician List"
        actionMenu={actionMenu}
        search={search}
        setSearch={setSearch}
      />
      {isModalOpen && (
        <DeleteModal
          isOpen={true}
          onClose={handleModalClose}
          onConfirm={handleDeleteConfirm}
          name="Technician"
        />
      )}
      ;
      {isEditModalOpen && (
        <EditTechnician isOpen={true} onClose={handleModalClose} />
      )}
      ;{/* Pagination */}
      <div className="px-3 md:px-0">
        <GlobalPagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / rowsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(value) => {
            setRowsPerPage(value);
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="px-4 sm:px-6 py-3 flex items-center justify-end mt-6">
        <button className="w-full sm:w-auto px-6 py-4 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-500 font-medium">
          Export
        </button>
      </div>
    </div>
  );
};

export default Technician;
