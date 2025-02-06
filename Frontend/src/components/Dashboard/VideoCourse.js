import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoCourse = () => {
  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("/api/videos");
      setVideos(response.data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);
    formDataObj.append("video", videoFile);

    try {
      await axios.post("/api/videos", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchVideos();
    } catch (error) {
      console.error("Failed to upload video:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/videos/${id}`);
      fetchVideos();
    } catch (error) {
      console.error("Failed to delete video:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Video Courses</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Video File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Upload Video
        </button>
      </form>

      <div>
        <h3 className="text-xl font-bold mb-4">Uploaded Videos</h3>
        <ul>
          {videos.map((video) => (
            <li key={video._id} className="mb-4 p-4 border rounded">
              <h4 className="text-lg font-bold">{video.title}</h4>
              <p>{video.description}</p>
              <video controls src={video.videoUrl} className="w-full my-4"></video>
              <button
                onClick={() => handleDelete(video._id)}
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoCourse;
