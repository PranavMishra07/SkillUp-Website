import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LearnerDashboard() {
  const { logoutUser, token } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const res = await axios.get("https://skillup-website.onrender.com/api/courses/my-courses/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEnrolledCourses(res.data);
    } catch (err) {
      console.error("Error fetching enrolled courses", err);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">👋 Welcome, Learner!</h1>
        <p className="text-gray-700 mb-6">
          Here are the courses you’ve enrolled in. Explore and continue learning!
        </p>

        <div className="flex flex-wrap gap-4 mb-6">
          <Link
            to="/courses"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            📚 Browse More Courses
          </Link>

          <button
            onClick={logoutUser}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            🔒 Logout
          </button>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">📘 Enrolled Courses</h2>

        {enrolledCourses.length === 0 ? (
          <p className="text-gray-600">You're not enrolled in any course yet.</p>
        ) : (
          <div className="space-y-4">
            {enrolledCourses.map((enroll) => (
              <div
                key={enroll.id}
                className="bg-blue-100 p-4 rounded-lg shadow-sm border"
              >
                <p className="font-semibold text-lg text-blue-800">
                  {enroll.course_title}
                </p>
                <p className="text-sm text-gray-600">
                  Enrolled on: {new Date(enroll.enrolled_at).toLocaleDateString()}
                </p>
                <Link
                  to={`/courses/${enroll.course}`}
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  ➡️ Go to Course
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
