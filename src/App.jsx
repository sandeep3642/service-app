import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Loader from "./utilty/Loader";
import NotFoundPage from "./utilty/NotFoundPage";
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
const Login = lazy(() => import("./pages/Login"));
import "./App.css";
import SparePartDetails from "./pages/Service-Request-Manager/SparePartDetails";
import ActivityLog from "./pages/Service-Request-Manager/ActivityLog";

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        <Routes>
          {/* Login route (no Layout) */}
          <Route path="/" element={<Login />} />

          {/* All other routes wrapped in Layout */}
          <Route element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customer" element={<CustomerManagement />} />
            <Route path="customer-view" element={<CustomerView />} />
            <Route path="technician" element={<Technician />} />
            <Route path="technician-view" element={<TechnicianView />} />
            <Route path="service" element={<ServiceRequestManager />} />
            <Route path="service-detail" element={<ServiceDetails />} />
            <Route path="spare-part-detail" element={<SparePartDetails />} />
            <Route path="add-new-technician" element={<AddTechnicianForm />} />
            <Route path="activityLog" element={<ActivityLog />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
