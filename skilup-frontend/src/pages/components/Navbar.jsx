import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import {FaUserCircle} from "react-icons/fa"
export default function Navbar() {

const {isAuthenticated,role,logoutUser} = useContext(AuthContext);


  const getDashboardPath = () => {
    if (role === "learner") return "/dashboard/learner";
    if (role === "instructor") return "/dashboard/instructor";
    if (role === "admin") return "/dashboard/admin";
    return "/";
  };



  return (
  //   <nav className="bg-white shadow-md sticky top-0 z-50">
  //     <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
  //       {/* Brand */}
  //       <Link to="/" className="text-2xl font-bold text-blue-600">
  //         SkillUp
  //       </Link>

  //       {/* Navigation Links */}
  //       <div className="flex items-center gap-4">
  //         <Link to="/courses" className="text-gray-700 hover:text-blue-600 font-medium">
  //           Courses
  //         </Link>
  //         <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
  //           Login
  //         </Link>
  //         <Link to="/signup" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium">
  //           Signup
  //         </Link>
  //       </div>
  //     </div>
  //   </nav>
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">SkillUp</Link>

      <div className="flex items-center space-x-4">
        <Link to="/courses" className="text-gray-700 hover:text-blue-600">
          Courses
        </Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              to={getDashboardPath()}
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
            >
              <FaUserCircle size={20} />
              <span>Dashboard</span>
            </Link>
            <button
              onClick={logoutUser}
              className="text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  
  );
}
