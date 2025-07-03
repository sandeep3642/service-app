import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalPagination from "../../components/GlobalPagination";
import DataTable from "../../components/Table";
import { useDebounce } from "../../hooks";
import Loader from "../../utilty/Loader";
import AddSubAdmin from "./AddSubAdmin";
import { getAllUserList } from "./subadminService";
import { toast } from "react-toastify";


const headers = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "isActive", label: "Status" },
  { key: "lastLogin", label: "Last Login" },
  { key: "joinedOn", label: "Joined On" },
];

const Index = () => {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const actionMenu = ["View Detail"];

  const handleRowAction = (row, action) => {
    console.log("Action:", action, "Row:", row);

    switch (action) {
      case "View Detail":
        navigate("/subadmin-view", { state: row._id });

      default:
        console.log("Unknown action:", action);
    }
  };

  const fetchUsers = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllUserList(page, limit);

      console.log(response);
      const { details, status } = response;
      if (status.success && Array.isArray(details.users)) {
        const formattedUsers = details.users.map((user) => ({
          ...user,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role?.displayName || user.role?.name || "NA",
          joinedOn: user.createdAt,
          lastLogin: user.updatedAt,
        }));
        setUsers(formattedUsers);
        setTotalItems(details.pagination?.total || 0);
      }
    } catch (error) {
      toast.error("Failed to fetch service requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    fetchUsers();
  };
  if (loading) <Loader />;

  return (
    <div>
      <div className="py-3 flex items-center justify-end ">
        <button
          className="px-4 py-3 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-500 font-medium
         cursor-pointer
        "
          onClick={() => setIsOpen(true)}
        >
          <span className="font-bold"> + </span>
          Add Sub admin
        </button>
      </div>
      <DataTable
        headers={headers}
        data={users}
        name="Sub-Admin List"
        emptyMessage={
          users.length === 0 ? "No Sub Admin found" : "No data available"
        }
        search={search}
        setSearch={setSearch}
        onRowAction={handleRowAction}
      />

      {isOpen && <AddSubAdmin isOpen={isOpen} onClose={handleClose} />}

      {/* Pagination */}
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
    </div>
  );
};

export default Index;
