import React from "react";

const Notifications = () => {
  const notifications = [
    { type: "Enrollment", message: "John Doe enrolled in React Basics", date: "2025-01-08" },
    { type: "Coaching Request", message: "Jane Smith requested a coaching session", date: "2025-01-07" },
    { type: "Pending Task", message: "Review feedback for Python Basics", date: "2025-01-06" },
  ];

  return (
    <div className="space-y-4">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{notification.type}</p>
            <p className="text-gray-600">{notification.message}</p>
          </div>
          <p className="text-sm text-gray-400">{notification.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
