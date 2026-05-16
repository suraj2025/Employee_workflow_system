import DashboardLayout from "../layouts/DashboardLayout";

import StatCard from "../components/StatCard";

import {
  FaUsers,
  FaBuilding,
  FaClipboardList,
  FaExclamationCircle,
} from "react-icons/fa";

function Dashboard() {

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Employees"
          value={250}
          icon={<FaUsers />}
        />

        <StatCard
          title="Departments"
          value={12}
          icon={<FaBuilding />}
        />

        <StatCard
          title="Pending Leaves"
          value={18}
          icon={<FaClipboardList />}
        />

        <StatCard
          title="Open Grievances"
          value={7}
          icon={<FaExclamationCircle />}
        />

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;