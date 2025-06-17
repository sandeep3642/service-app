import DataTable from "../../components/Table"

const Technician = () => {

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

  const handleRowAction = (action, row) => {
    console.log(`${action} action for:`, row);
    // Handle your actions here
  };
  return (
    <div>
      <DataTable
        headers={technicianHeaders}
        data={technicianData}
        searchable={true}
        sortable={true}
        actionColumn={true}
        onRowAction={handleRowAction}
        name="Technician List"
      />
    </div>
  );
};

export default Technician;