import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Notifications from "./Notifications";
import { FaUsers, FaBook, FaDollarSign, FaChartLine } from "react-icons/fa";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

// Register Chart.js elements
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const AdminDashboard = () => {
  const [videos, setVideos] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const kpis = [
    { label: "Total Users", value: 1200, icon: <FaUsers /> },
    { label: "Courses Enrolled", value: 850, icon: <FaBook /> },
    { label: "Revenue Generated", value: "$45,000", icon: <FaDollarSign /> },
    { label: "Active Sessions", value: 220, icon: <FaChartLine /> },
  ];

  // Fetch videos from the server
  useEffect(() => {
    const fetchVideos = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("Access denied. No token provided.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:4999/api/videos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVideos(response.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to fetch videos.");
      }
    };

    fetchVideos();
  }, []);

  // Handle video file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Access denied. No token provided.");
      return;
    }

    if (!videoFile || !title || !description) {
      setError("Please fill in all fields before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post(
        "http://localhost:4999/api/videos/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVideos((prev) => [...prev, response.data]);
      setVideoFile(null);
      setTitle("");
      setDescription("");
      setSuccessMessage("Video uploaded successfully!");
    } catch (err) {
      console.error("Error uploading video:", err);
      setError("Failed to upload video.");
    }
  };

  // Handle video file change
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // Handle deleting a video
  const handleDeleteVideo = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Access denied. No token provided.");
      return;
    }

    try {
      await axios.delete(`http://localhost:4999/api/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos((prev) => prev.filter((video) => video._id !== id));
      setSuccessMessage("Video deleted successfully!");
    } catch (err) {
      console.error("Error deleting video:", err);
      setError("Failed to delete video.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar userType="admin" />
      <div className="flex-1">
        <Header title="Admin Dashboard" />
        <div className="p-6 space-y-6">
          {/* KPI Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105"
              >
                <div className="flex items-center">
                  {kpi.icon}
                  <div className="ml-4">
                    <p className="text-lg font-bold">{kpi.value}</p>
                    <p className="text-sm text-gray-600">{kpi.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pie Chart Section */}
          <div className="flex space-x-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-1/2">
              <h3 className="text-xl font-bold mb-4">Video Distribution</h3>
              <Pie
                data={{
                  labels: videos.map((video) => video.title),
                  datasets: [
                    {
                      label: "Videos",
                      data: videos.map(() => 1),
                      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                    },
                  ],
                }}
              />
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 w-1/2">
              <h3 className="text-xl font-bold mb-4">KPIs Overview</h3>
              <Bar
                data={{
                  labels: kpis.map((kpi) => kpi.label),
                  datasets: [
                    {
                      label: "KPIs",
                      data: kpis.map((kpi) =>
                        typeof kpi.value === "string"
                          ? parseInt(kpi.value.replace(/\D/g, ""))
                          : kpi.value
                      ),
                      backgroundColor: "rgba(75,192,192,0.4)",
                    },
                  ],
                }}
              />
            </div>
          </div>

          {/* Video Management Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Manage Videos</h3>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}

            <form onSubmit={handleFileUpload} className="mb-4 space-y-4">
              <div>
                <label className="block font-medium mb-1">Video Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Video Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block font-medium mb-1">Upload Video File</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Upload Video
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="relative bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <video
                    width="100%"
                    height="auto"
                    controls
                    className="rounded-t-lg"
                  >
                    <source src={`http://localhost:4999${video.url}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="p-4">
                    <h4 className="font-semibold truncate">{video.title}</h4>
                    <p className="text-sm text-gray-600 truncate">{video.description}</p>
                    <button
                      onClick={() => handleDeleteVideo(video._id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs shadow-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
