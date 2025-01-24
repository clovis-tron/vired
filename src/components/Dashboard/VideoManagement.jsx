import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ title: "", description: "", url: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch Videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:4999/api/videos");
        setVideos(response.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  // Add Video
  const handleAddVideo = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:4999/api/videos", newVideo);
      setVideos((prev) => [...prev, response.data]);
      setNewVideo({ title: "", description: "", url: "" });
      setSuccessMessage("Video added successfully!");
    } catch (err) {
      console.error("Error adding video:", err);
      setError(err.response?.data?.error || "An error occurred while adding the video.");
    }
  };

  // Delete Video
  const handleDeleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:4999/api/videos/${id}`);
      setVideos((prev) => prev.filter((video) => video._id !== id));
      setSuccessMessage("Video deleted successfully!");
    } catch (err) {
      console.error("Error deleting video:", err);
      setError("Failed to delete video.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Manage Videos</h3>
      <form onSubmit={handleAddVideo} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newVideo.title}
          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
          required
          className="block w-full p-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={newVideo.description}
          onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
          className="block w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Video URL"
          value={newVideo.url}
          onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
          required
          className="block w-full p-2 mb-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Video
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <ul>
        {videos.map((video) => (
          <li key={video._id} className="border-b p-2">
            <strong>{video.title}</strong> - {video.description}
            <button
              onClick={() => handleDeleteVideo(video._id)}
              className="ml-4 text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoManagement;
