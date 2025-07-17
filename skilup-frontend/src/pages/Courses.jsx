import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./components/CourseCard";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCourses();
  }, [search]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        `https://skillup-website.onrender.com/api/courses/?search=${search}`
      );
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">📚 Available Courses</h1>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by course title or instructor"
          className="w-full mb-6 p-3 rounded-lg border border-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Course Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <p className="text-gray-500">No courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
