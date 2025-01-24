import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Classroom = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false); // Track subscription status
  const navigate = useNavigate(); // Initialize navigate

  // Fetch subscription status from the backend
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const response = await axios.get('http://localhost:4999/api/check-subscription', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setIsSubscribed(response.data.isActive); // If the user has an active subscription
      } catch (err) {
        setError('Failed to fetch subscription status.');
      }
    };

    checkSubscriptionStatus();
  }, []);

  // Fetch videos from the backend
  useEffect(() => {
    if (!isSubscribed) return; // Don't fetch videos if not subscribed

    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:4999/api/videos', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log("Response from server:", response.data);

        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setVideos(response.data);
        } else {
          setError("No videos available.");
        }
      } catch (err) {
        setError('Failed to fetch videos. ' + (err.response ? err.response.data.error : err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [isSubscribed]);

  // Handle Subscribe Now button click
  const handleSubscribe = () => {
    // Redirect to the SubscriptionPlan page to choose a plan
    navigate("/subscription-plans"); // Redirect to SubscriptionPlans page
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <div className="lg:w-3/5 w-full mb-8 lg:mb-0">
            <div className="relative">
              {loading ? (
                <p>Loading video...</p>
              ) : videos.length > 0 ? (
                <video
                  className="w-full rounded-lg shadow-lg"
                  controls
                  poster="/images/classroom-placeholder.jpg"
                >
                  <source
                    src={`http://localhost:4999${videos[0].url}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <p>{error || "No videos available"}</p>
              )}
            </div>
          </div>

          <div className="lg:w-2/5 w-full lg:pl-10">
            <h2 className="text-3xl font-bold mb-4">
              Explore Your Online Classroom
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Engage in interactive learning through high-quality video content.
              Access in-depth resources, connect with peers, and achieve your
              learning goals in this virtual space.
            </p>

            <div className="flex space-x-8 mb-6">
              <div>
                <h3 className="text-2xl font-bold">15+</h3>
                <p className="text-sm text-gray-400">Video Lessons</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">5+</h3>
                <p className="text-sm text-gray-400">Quizzes</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">10+</h3>
                <p className="text-sm text-gray-400">Assignments</p>
              </div>
            </div>

            {!isSubscribed && (
              <div className="p-4 bg-red-600 text-white rounded-lg">
                <p>You need to subscribe to access the videos.</p>
                <button 
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg"
                  onClick={handleSubscribe} // Call handleSubscribe to navigate
                >
                  Subscribe Now
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Additional Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold mb-2">Resource Title 1</h4>
              <p className="text-gray-400 text-sm">
                Short description about the resource that can help the student.
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold mb-2">Resource Title 2</h4>
              <p className="text-gray-400 text-sm">
                Short description about the resource that can help the student.
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold mb-2">Resource Title 3</h4>
              <p className="text-gray-400 text-sm">
                Short description about the resource that can help the student.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
