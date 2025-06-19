import DataTable from "../../components/Table"
import DeleteCustomerModal from "../../components/DeleteModal";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import DeleteModal from "../../components/DeleteModal";
import EditTechnician from "./EditTechnician";

const Technician = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const actionMenu = ["View Detail", "Edit", "Delete"]


  const handleDeleteConfirm = () => {
    console.log('Customer deleted!');
    // Add your delete logic here
    setIsModalOpen(false);

  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleAddNewTechnician = () => {
  navigate('/add-new-technician')
  };

  const technicianHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'mobile', label: 'Mobile No.' },
    { key: 'service', label: 'Service' },
    { key: 'total', label: 'Total...' },
    { key: 'lastLogin', label: 'Last Login' },
    { key: 'status', label: 'Status' }
  ];

  const technicianData = [
    {
      id: 'TF001',
      name: 'Technician Name',
      email: 'rohan@gmail.com',
      mobile: '9003737851',
      service: 'AC',
      total: 13,
      lastLogin: 'Jan 15 2021',
      status: 'Active'
    },
    {
      id: 'TF002',
      name: 'Mike T',
      email: 'mike@gmail.com',
      mobile: '9003737851',
      service: 'AC',
      total: 8,
      lastLogin: 'Mar 25 2021',
      status: 'Active'
    },
    {
      id: 'TF003',
      name: 'David R',
      email: 'david@gmail.com',
      mobile: '8097609341',
      service: 'Desktop',
      total: 6,
      lastLogin: 'Aug 25 2021',
      status: 'In Active'
    }
  ];

  const handleRowAction = (row, mode) => {
    console.log(mode)
    if (mode === 'View Detail') {
      navigate('/technician-view', { state: { technician: row } });

    }
    if (mode === 'Delete') {
      setIsModalOpen(true)
    }
    if (mode === 'Edit') {
      setIsEditModalOpen(true)
    }
    // Handle your actions here
  };
  return (
    <div>
      <div className=" px-6 py-3 flex items-center justify-end ">
        <button onClick={handleAddNewTechnician} className="px-6 py-4 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-500 font-medium">
          <span className='font-bold'> + </span>
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
      />
      {isModalOpen && (
        <DeleteModal
          isOpen={true}
          onClose={handleModalClose}
          onConfirm={handleDeleteConfirm}
          name="Technician"
        />

      )};
      {isEditModalOpen && (
        <EditTechnician
          isOpen={true}
          onClose={handleModalClose}
        />

      )};
    </div>
  );
};

export default Technician;