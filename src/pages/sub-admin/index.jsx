import React, { useState } from "react";
import DataTable from "../../components/Table";
import { data } from "autoprefixer";
import { useDebounce } from "../../hooks";

const headers = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "isActive", label: "Status" },
  { key: "lastLogin", label: "Last Login" },
  { key: "joinedOn", label: "Joined On" },
];

const users = [
  {
    name: "Abhishek Negi",
    email: "abhishek.negi@example.com",
    role: "Admin",
    isActive: true,
    lastLogin: "2025-06-22T10:25:00Z",
    joinedOn: "2023-03-15T14:00:00Z",
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    role: "Technician",
    isActive: true,
    lastLogin: "2025-06-21T17:42:00Z",
    joinedOn: "2024-01-10T09:30:00Z",
  },
  {
    name: "Rohit Verma",
    email: "rohit.verma@example.com",
    role: "Customer",
    isActive: false,
    lastLogin: "2025-05-30T12:10:00Z",
    joinedOn: "2022-08-20T11:00:00Z",
  },
];

const Index = () => {
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  return (
    <div>
      <div className="py-3 flex items-center justify-end ">
        <button
          className="px-4 py-3 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-500 font-medium
         cursor-pointer
        "
        >
          <span className="font-bold"> + </span>
          Add Sub admin
        </button>
      </div>
      <DataTable
        headers={headers}
        data={users}
        name="Sub- Admin List"
        emptyMessage={
          data.length === 0 ? "No Sub Admin found" : "No data available"
        }
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
};

export default Index;
