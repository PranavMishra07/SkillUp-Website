import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={`http://127.0.0.1:8000${course.thumbnail}` }
        alt={course.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{course.title}</h2>
        <p className="text-sm text-gray-600">By {course.instructor_name}</p>

        <div className="mt-2">
          <span className="text-yellow-500 font-medium">
            ⭐ {course.avg_rating || "No rating yet"}
          </span>
        </div>

        <Link
          to={`/courses/${course.id}`}
          className="block mt-4 text-blue-600 font-semibold hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
