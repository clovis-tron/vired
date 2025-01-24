import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const SignUp = ({ onClose }) => {
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (field === "password") {
      validatePassword(value);
    }

    if (field === "age" && value !== "") {
      if (userType === "student" && parseInt(value) < 12) {
        setAgeError("Students under 12 require a parent to sign up.");
      } else {
        setAgeError("");
      }
    }
  };

  // Validate Password Strength
  const validatePassword = (password) => {
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordCriteria.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
    } else {
      setPasswordError("");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    if (passwordError) {
      setError("Please fix the password error before submitting.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (userType === "student" && (!formData.age || parseInt(formData.age) < 12)) {
      setError("Students under 12 require a parent to sign up.");
      return;
    }

    setError("");

    try {
      const data = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: userType,
      };

      if (userType === "student") {
        data.age = formData.age;
      }

      const response = await axios.post("http://localhost:4999/api/users/register", data);

      setSuccessMessage("User registered successfully!");
      console.log("User registered:", response.data);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(errorMessage);
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-12 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          X
        </button>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">Sign Up</h2>

        {/* User Type Selection */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">
            I am signing up as:
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setUserType("student")}
              className={`px-4 py-2 rounded-full font-medium ${
                userType === "student"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setUserType("parent")}
              className={`px-4 py-2 rounded-full font-medium ${
                userType === "parent"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Parent
            </button>
            <button
              type="button"
              onClick={() => setUserType("teacher")}
              className={`px-4 py-2 rounded-full font-medium ${
                userType === "teacher"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Teacher
            </button>
            <button
              type="button"
              onClick={() => setUserType("corporate")}
              className={`px-4 py-2 rounded-full font-medium ${
                userType === "corporate"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Corporate
            </button>
          </div>
        </div>

        {/* Sign-Up Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-full"
            />
            <AnimatePresence>
              {passwordError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {passwordError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className="w-full mt-2 p-3 border border-gray-300 rounded-full"
            />
          </div>

          {userType === "student" && (
            <div className="mb-4">
              <label className="block font-medium text-gray-700">Age</label>
              <input
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-full"
              />
              <AnimatePresence>
                {ageError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {ageError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-sm mb-4"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {successMessage && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-green-500 text-sm mb-4"
              >
                {successMessage}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-full font-medium mt-4"
          >
            Sign Up
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
