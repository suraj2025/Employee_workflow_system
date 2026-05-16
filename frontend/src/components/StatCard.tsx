import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {

  return (

    <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">

      <div>

        <p className="text-gray-500 text-sm mb-2">
          {title}
        </p>

        <h2 className="text-3xl font-bold">
          {value}
        </h2>

      </div>

      <div className="text-4xl text-blue-600">
        {icon}
      </div>

    </div>
  );
}

export default StatCard;