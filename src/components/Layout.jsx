import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const location = useLocation();

 
  useEffect(() => {
    const path = location.pathname.replace("/", "") || "dashboard";
    setActiveItem(path);
  }, [location]);

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
