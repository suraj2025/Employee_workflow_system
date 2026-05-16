import {
  FaUsers,
  FaClipboardList,
  FaExclamationCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
function Sidebar() {

  return (

    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 p-5">

      <h2 className="text-2xl font-bold mb-10">
        Admin Panel
      </h2>

      <ul className="space-y-6">

        <Link
  to="/employees"
  className="flex items-center gap-3 cursor-pointer hover:text-blue-400"
>
  <FaUsers />
  <span>Employees</span>
</Link>

        <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">

          <FaClipboardList />

          <span>Leave</span>

        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">

          <FaExclamationCircle />

          <span>Grievance</span>

        </li>

      </ul>

    </div>
  );
}

export default Sidebar;