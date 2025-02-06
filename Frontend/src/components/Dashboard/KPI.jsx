import React from "react";

const KPI = ({ label, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
      <div className="text-primary text-4xl">{icon}</div>
      <div>
        <p className="text-gray-600 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default KPI;
