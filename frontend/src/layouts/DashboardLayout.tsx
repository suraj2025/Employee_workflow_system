import { ReactNode } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({
  children,
}: DashboardLayoutProps) {

  return (

    <div className="flex">

      <Sidebar />

      <div className="ml-64 flex-1 min-h-screen bg-gray-100">

        <Navbar />

        <div className="p-6">

          {children}

        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;