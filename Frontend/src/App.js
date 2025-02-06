// src/App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import PopularCourses from "./components/PopularCourses";
import ExploreSection from "./components/ExploreSection";
import FAQSection from "./components/FAQSection";
import TrustedBySection from "./components/TrustedBySection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import SignUp from "./components/SignUp";
import CourseCatalog from "./components/CourseCatalog";
import Classroom from "./components/classroom";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import Login from "./components/Login"; // Import the Login Component
import ProtectedRoute from "./components/ProtectedRoute";
import SubscriptionPlans from "./components/SubscriptionPlans"; // Import SubscriptionPlans component

function App() {
  const [showSignUp, setShowSignUp] = useState(false);

  // Handle Admin Login
  const handleAdminLogin = async (credentials) => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token); // Save token to localStorage
        return true;
      } else {
        console.error("Login failed: ", data.error);
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // Handle Admin Logout
  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login"; // Redirect to Admin Login page
  };

  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="relative">
              <Navbar onLoginClick={() => setShowSignUp(true)} />
              <HeroSection />
              <PopularCourses />
              <ExploreSection />
              <FAQSection />
              <TrustedBySection />
              <CTASection />
              <Footer />
              <ScrollToTopButton />
              {showSignUp && (
                <>
                  <div className="absolute inset-0 bg-black opacity-50 z-40"></div>
                  <SignUp onClose={() => setShowSignUp(false)} />
                </>
              )}
            </div>
          }
        />

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={
            localStorage.getItem("adminToken") ? (
              <Navigate to="/dashboard/admin" replace />
            ) : (
              <AdminLogin onLogin={handleAdminLogin} />
            )
          }
        />

        {/* Admin Signup */}
        <Route
          path="/admin/signup"
          element={
            <AdminSignup
              onAdminRegistered={() =>
                alert("Admin account created successfully! Navigate to /admin/login to log in.")
              }
            />
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard onLogout={handleAdminLogout} />
            </ProtectedRoute>
          }
        />

        {/* User Sign-Up */}
        <Route path="/signup" element={<SignUp />} />

        {/* Login for User (Student, Parent, Teacher, Corporate) */}
        <Route path="/login" element={<Login />} />

        {/* Course Catalog */}
        <Route
          path="/courses"
          element={
            <>
              <Navbar onLoginClick={() => setShowSignUp(true)} />
              <CourseCatalog />
              <Footer />
            </>
          }
        />

        {/* Classroom */}
        <Route
          path="/classroom/:courseId"
          element={
            <>
              <Navbar onLoginClick={() => setShowSignUp(true)} />
              <Classroom />
              <Footer />
            </>
          }
        />

        {/* Subscription Plans Page */}
        <Route path="/subscription-plans" element={<SubscriptionPlans />} />
      </Routes>
    </Router>
  );
}

export default App;
