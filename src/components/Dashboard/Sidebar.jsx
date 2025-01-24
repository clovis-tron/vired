import React, { useState } from "react";
import { FaHome, FaBook, FaUsers, FaChartPie, FaCog, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom"; // Use NavLink for active state highlighting

const Sidebar = ({ userType }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to toggle sidebar visibility

  const menuItems =
    userType === "admin"
      ? [
          { label: "Dashboard", icon: <FaHome />, link: "/dashboard/admin" },
          { label: "Manage Courses", icon: <FaBook />, link: "/dashboard/courses" },
          { label: "Manage Users", icon: <FaUsers />, link: "/dashboard/users" },
          { label: "Analytics", icon: <FaChartPie />, link: "/dashboard/analytics" },
          { label: "Settings", icon: <FaCog />, link: "/dashboard/settings" },
        ]
      : [
          { label: "Dashboard", icon: <FaHome />, link: "/dashboard" },
          { label: "My Courses", icon: <FaBook />, link: "/dashboard/courses" },
          { label: "Messages", icon: <FaUsers />, link: "/dashboard/messages" },
          { label: "Settings", icon: <FaCog />, link: "/dashboard/settings" },
        ];

  return (
    <aside className={`bg-gray-800 text-white ${isCollapsed ? "w-16" : "w-64"} transition-width duration-300`}>
      {/* Toggle Button */}
      <button
        className="text-white p-2 focus:outline-none absolute top-4 right-4 md:hidden"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <FaBars size={20} /> : <FaTimes size={20} />}
      </button>

      {/* Sidebar Content */}
      <div className={`${isCollapsed ? "hidden" : "block"} md:block`}>
        <h2 className="text-xl font-bold p-4">
          {userType === "admin" ? "Admin Panel" : "User Dashboard"}
        </h2>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4">
              <NavLink
                to={item.link}
                className="flex items-center gap-4 p-3 rounded hover:bg-gray-700 transition-colors"
                activeClassName="bg-gray-700"
              >
                <span>{item.icon}</span>
                <span className={`${isCollapsed ? "hidden" : "block"}`}>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
