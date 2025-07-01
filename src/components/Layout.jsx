import React, { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace("/", "") || "dashboard";

    // Method 1: Explicit mapping (more control)
    const routeMapping = {
      "customer-view": "customer",
      "customer-edit": "customer",
      "technician-view": "technician",
      "technician-edit": "technician",
      "service-detail": "service",
      "spare-part-detail": "service",
      "add-new-technician": "technician",
      "subadmin-view":"sub-admin",
      activityLog: "service",
      // Add more mappings as needed
    };

    // Method 2: Pattern-based mapping (more flexible)
    const getParentRoute = (currentPath) => {
      // Check explicit mappings first
      if (routeMapping[currentPath]) {
        return routeMapping[currentPath];
      }

      // Pattern-based: if path contains a hyphen, take the part before the first hyphen
      if (currentPath.includes("-")) {
        const parts = currentPath.split("-");
        const potentialParent = parts[0];

        // List of valid parent routes (should match your sidebar items)
        const validParents = [
          "sub-admin",
          "customer",
          "technician",
          "dashboard",
          "service",
          "reports",
          "settings",
        ];

        if (validParents.includes(potentialParent)) {
          return potentialParent;
        }
      }

      return currentPath;
    };

    setActiveItem(getParentRoute(path));
  }, [location]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-4 lg:p-6 min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
