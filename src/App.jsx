import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import Loader from "./pages/utilty/Loader";
import CustomerView from "./pages/customer-management/customerView";
import ServiceDetails from "./pages/Service-Request-Manager/ServiceDetails";
import AddTechnicianForm from "./pages/Technician/AddTechnician";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CustomerManagement = lazy(() => import("./pages/customer-management"));
const Technician = lazy(() => import("./pages/Technician"));
const TechnicianView = lazy(() => import("./pages/Technician/TechnicianView"));
const ServiceRequestManager = lazy(() =>
  import("./pages/Service-Request-Manager")
);

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer" element={<CustomerManagement />} />
            <Route path="/customer-view" element={<CustomerView />} />
            <Route path="/technician" element={<Technician />} />
            <Route path="/technician-view" element={<TechnicianView />} />
            <Route path="/service" element={<ServiceRequestManager />} />
            <Route path="/service-detail" element={<ServiceDetails />} />
            <Route path="/add-new-technician" element={<AddTechnicianForm/>}/>
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
