import React, { useState } from "react";
import axios from "axios";

const AdminSignup = ({ onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    secretCode: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:4999/api/admin/signup", formData); // Match backend endpoint
      setSuccessMessage(response.data.message);
      if (onSignupSuccess) onSignupSuccess();
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during signup.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-center text-2xl font-bold mb-4">Admin Signup</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm mb-2">{successMessage}</p>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Secret Code</label>
          <input
            type="text"
            name="secretCode"
            value={formData.secretCode}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default AdminSignup;
