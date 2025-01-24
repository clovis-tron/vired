import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ title }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  const [filter, setFilter] = useState("all");

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Add a new notification
  const addNotification = () => {
    const newNotif = {
      id: Date.now(),
      category: "Coaching",
      message: "New coaching request received!",
      time: "Just now",
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Filter notifications by category
  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((notif) => notif.category === filter);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 focus:outline-none"
        >
          <FaBell className="text-gray-600 dark:text-white text-xl" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              {notifications.length}
            </span>
          )}
        </button>

        {/* Notifications Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden z-10"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  Notifications
                </h2>
                <button
                  onClick={() => setFilter("all")}
                  className={`text-sm px-2 py-1 rounded ${
                    filter === "all" ? "bg-blue-500 text-white" : "text-gray-600"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("Coaching")}
                  className={`text-sm px-2 py-1 rounded ${
                    filter === "Coaching" ? "bg-blue-500 text-white" : "text-gray-600"
                  }`}
                >
                  Coaching
                </button>
              </div>
              <ul className="max-h-64 overflow-y-auto">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notif) => (
                    <li
                      key={notif.id}
                      className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-b last:border-b-0 dark:border-gray-700"
                    >
                      <p className="text-gray-800 dark:text-gray-200">{notif.message}</p>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {notif.time}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="p-4 text-gray-500 text-center">
                    No notifications found.
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Simulate New Notification Button */}
      <button
        onClick={addNotification}
        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        Add Notification
      </button>
    </header>
  );
};

export default Header;
