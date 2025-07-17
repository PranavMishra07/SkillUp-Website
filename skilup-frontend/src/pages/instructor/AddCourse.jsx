import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function AddCourse() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [message, setMessage] = useState("");

const handleCourseSubmit = async (e) => {
  e.preventDefault();

  // Convert YouTube URL to embed format
  let embedUrl = videoUrl;
  if (videoUrl.includes("youtu.be")) {
    const videoId = videoUrl.split("youtu.be/")[1];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("difficulty", level);
  formData.append("video_url", embedUrl);
  if (thumbnail) formData.append("thumbnail", thumbnail);

  try {
    await axios.post("https://skillup-website.onrender.com/api/courses/create/", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setMessage("Course created successfully!");
    setTimeout(() => navigate("/dashboard/instructor"), 1500);
  } catch (err) {
    console.error("Course creation error", err.response?.data || err.message);
    setMessage("Failed to create course. Try again.");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">➕ Add New Course</h2>

        {message && <p className="mb-4 text-center text-green-600">{message}</p>}

        <form onSubmit={handleCourseSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              className="w-full border p-2 rounded"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-medium">Level</label>
            <select
              className="w-full border p-2 rounded"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Video URL (YouTube)</label>
            <input
              type="url"
              className="w-full border p-2 rounded"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 rounded"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Submit Course
          </button>
        </form>
      </div>
    </div>
  );
}
