import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for navigation
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLaptop,
  FaChalkboardTeacher,
  FaPodcast,
  FaUsers,
  FaMobileAlt,
  FaHome,
  FaEnvelope,
  FaMoneyBillAlt,
  FaChartBar,
} from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate(); // Navigation hook

  const productsDropdownRef = useRef(null);
  const resourcesDropdownRef = useRef(null);

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token); // Update login status based on token presence
  }, []);

  const handleLoginClick = () => {
    if (isLoggedIn) {
      // Handle logout
      localStorage.removeItem("userToken");
      setIsLoggedIn(false); // Update login status
      navigate("/"); // Redirect to the home page after logout
    } else {
      // Redirect to login page
      navigate("/login");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        productsDropdownRef.current &&
        !productsDropdownRef.current.contains(event.target)
      ) {
        setProductsDropdownOpen(false);
      }
      if (
        resourcesDropdownRef.current &&
        !resourcesDropdownRef.current.contains(event.target)
      ) {
        setResourcesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="bg-gray-900 shadow-md py-4 rounded-none mx-0 md:mx-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 w-full">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src="/Images/logo.svg" alt="Vired Logo" className="h-10" />
          </Link>
        </div>

        {/* Desktop Menu Items */}
        <ul className="hidden md:flex items-center space-x-12 text-lg font-semibold text-white">
          {/* Products Dropdown */}
          <li className="relative" ref={productsDropdownRef}>
            <button
              className="hover:text-orange-500 transition-colors duration-300 flex items-center"
              onClick={() =>
                setProductsDropdownOpen((prevState) => !prevState)
              }
            >
              Products
              <span className="ml-2 text-sm">
                {productsDropdownOpen ? "▲" : "▼"}
              </span>
            </button>
            <AnimatePresence>
              {productsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg py-4 px-6 text-gray-700 w-[36rem] z-50"
                >
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-bold text-lg underline">
                        Build & Launch
                      </h3>
                      <ul className="space-y-2 mt-2">
                        <li>
                          <a
                            href="/courses"
                            className="flex items-center hover:text-orange-500"
                          >
                            <FaLaptop className="mr-2" />
                            Online Courses
                          </a>
                        </li>
                        <li>
                          <button
                            className="flex items-center hover:text-orange-500"
                            onClick={() => navigate("/coaching")}
                          >
                            <FaChalkboardTeacher className="mr-2" />
                            Coaching
                          </button>
                        </li>
                        <li>
                          <a
                            href="/podcasts"
                            className="flex items-center hover:text-orange-500"
                          >
                            <FaPodcast className="mr-2" />
                            Podcasts
                          </a>
                        </li>
                        <li>
                          <a
                            href="/memberships"
                            className="flex items-center hover:text-orange-500"
                          >
                            <FaUsers className="mr-2" />
                            Memberships
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg underline">Scale</h3>
                      <ul className="space-y-2 mt-2">
                        <li>
                          <a
                            href="/mobile-app"
                            className="flex items-center hover:text-orange-500"
                          >
                            <FaMobileAlt className="mr-2" />
                            Branded Mobile App
                          </a>
                        </li>
                        <li>
                          <a
                            href="/landing-pages"
                            className="flex items-center hover:text-orange-500"
                          >
                            <FaHome className="mr-2" />
                            Landing Pages
                          </a>
                        </li>
                        <li>
                          <a
                            href="/email-marketing"
                            className="flex items-center hover:text-orange-500"
                          >
                            <FaEnvelope className="mr-2" />
                            Email Marketing
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg underline">
                        Earn & Measure
                      </h3>
                      <ul className="space-y-2 mt-2">
                        <li>
                          <a
                            href="/payments"
                            className="flex items-center hover:text-orange-500"
                          >
                            <FaMoneyBillAlt className="mr-2" />
                            Payments
                          </a>
                        </li>
                        <li>
                          <a
                            href="/analytics"
                            className="flex items-center hover:text-orange-500"
                          >
                            <FaChartBar className="mr-2" />
                            Analytics
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Resources Dropdown */}
          <li className="relative" ref={resourcesDropdownRef}>
            <button
              className="hover:text-orange-500 transition-colors duration-300 flex items-center"
              onClick={() =>
                setResourcesDropdownOpen((prevState) => !prevState)
              }
            >
              Resources
              <span className="ml-2 text-sm">
                {resourcesDropdownOpen ? "▲" : "▼"}
              </span>
            </button>
            <AnimatePresence>
              {resourcesDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg py-4 px-6 text-gray-700 w-60 z-50"
                >
                  <ul className="space-y-2">
                    <li>
                      <a href="/blog" className="hover:text-orange-500">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="/guides" className="hover:text-orange-500">
                        Guides
                      </a>
                    </li>
                    <li>
                      <a href="/webinars" className="hover:text-orange-500">
                        Webinars
                      </a>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li>
            <a
              href="/pricing"
              className="hover:text-orange-500 transition-colors duration-300"
            >
              Pricing
            </a>
          </li>

          {/* Login/Logout Button */}
          <li>
            <button
              onClick={handleLoginClick}
              className={`${
                isLoggedIn ? "bg-red-500" : "bg-orange-500"
              } text-white px-6 py-3 rounded-lg hover:${isLoggedIn ? "bg-red-600" : "bg-orange-600"} transition-colors duration-300`}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </li>

          {/* Get Started Button */}
          <li>
            <button
              className="bg-transparent text-white border-2 border-white px-6 py-3 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-300"
              onClick={() => setIsMenuOpen(true)}
            >
              Get Started
            </button>
          </li>
        </ul>

        {/* Hamburger Menu (Mobile Only) */}
        <button
          className="text-3xl md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-gray-900 bg-opacity-80 z-50 flex flex-col items-center space-y-6 text-white text-lg px-6 py-8"
          >
            <button
              className="absolute top-4 right-4 text-3xl"
              onClick={() => setIsMenuOpen(false)}
            >
              ✕
            </button>
            <div className="w-full text-center"> {/* Centered Menu */}
              <button
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                className="w-full text-left hover:text-orange-500"
              >
                Products {productsDropdownOpen ? "▲" : "▼"}
              </button>
              <AnimatePresence>
                {productsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 ml-4"
                  >
                    <h3 className="font-bold text-lg underline">
                      Build & Launch
                    </h3>
                    <ul className="space-y-2 mt-2">
                      <li>
                        <a href="/courses" className="hover:text-orange-500">
                          Online Courses
                        </a>
                      </li>
                      <li>
                        <a href="/coaching" className="hover:text-orange-500">
                          Coaching
                        </a>
                      </li>
                      <li>
                        <a href="/podcasts" className="hover:text-orange-500">
                          Podcasts
                        </a>
                      </li>
                      <li>
                        <a href="/memberships" className="hover:text-orange-500">
                          Memberships
                        </a>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a
              href="/pricing"
              className="hover:text-orange-500 transition-colors duration-300"
            >
              Pricing
            </a>
            <button
              onClick={handleLoginClick}
              className={`${
                isLoggedIn ? "bg-red-500" : "bg-orange-500"
              } text-white px-6 py-3 rounded-lg hover:${isLoggedIn ? "bg-red-600" : "bg-orange-600"} transition-colors duration-300`}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
