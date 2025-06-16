import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import Loader from "./pages/utilty/Loader";
import CustomerView from "./pages/customer-management/customerView";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CustomerManagement = lazy(() => import("./pages/customer-management"));

function App() {
  return (
    <Router>
      <Layout>
        {/* Suspense wraps routes to show fallback during lazy loading */}
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer" element={<CustomerManagement />} />
             <Route path="/customer-view" element={<CustomerView />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;