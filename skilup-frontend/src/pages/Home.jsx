import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800">Welcome to SkillUp 🎓</h1>
      <p className="mt-4 text-lg text-gray-600 max-w-xl">
        Learn from top instructors, master new skills, and share your feedback. Start your learning journey today!
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
          Login
        </Link>
        <Link to="/signup" className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
          Signup
        </Link>
        <Link to="/courses" className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700">
          Browse Courses
        </Link>
      </div>
    </div>
  );
}
