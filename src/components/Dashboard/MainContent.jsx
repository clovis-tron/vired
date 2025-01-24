import React from "react";
import PieChart from "./PieChart";

const MainContent = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Card */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-2">Total Users</h3>
          <p className="text-gray-700 text-xl">500</p>
        </div>

        {/* Example Card */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-2">Courses Offered</h3>
          <p className="text-gray-700 text-xl">12</p>
        </div>

        {/* Pie Chart */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
