import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function InstructorDashboard() {
  const { token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const res = await axios.get("https://skillup-website.onrender.com/api/courses/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching instructor courses", err);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">📘 Instructor Dashboard</h1>
        <Link
          to="/instructor/add-course"
          className="inline-block mb-6 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          ➕ Add New Course
        </Link>

        {courses.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white border p-4 rounded shadow-md hover:shadow-lg"
              >
                <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{course.description.slice(0, 80)}...</p>
                <p className="mt-2 text-yellow-500">⭐ {course.avg_rating || "No rating yet"}</p>
                <p className="text-sm text-gray-500">🗣️ {course.total_reviews || 0} Reviews</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't created any courses yet.</p>
        )}
      </div>
    </div>
  );
}
