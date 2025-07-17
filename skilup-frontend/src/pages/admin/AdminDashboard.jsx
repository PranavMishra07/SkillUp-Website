// // 


import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function AdminDashboard() {
  const { token, loading, logoutUser } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  const [reviews,setReviews] = useState([]);

  useEffect(() => {
    if (!loading && token) {
      fetchUsers();
      fetchCourses();
      fetchReviews();
    }
  }, [loading, token]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://skillup-website.onrender.com/api/admin/users/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get("https://skillup-website.onrender.com/api/courses/admin/courses/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  };


  const fetchReviews = async () => {
  try {
    const res = await axios.get("https://skillup-website.onrender.com/api/courses/admin/reviews/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setReviews(res.data);
  } catch (err) {
    console.error("Review fetch error", err);
  }
};






  const handleApprove = async (userId) => {
    try {
      await axios.patch(`https://skillup-website.onrender.com/api/admin/approve/${userId}/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Instructor approved successfully.");
      fetchUsers();
    } catch (err) {
      console.error("Approval error", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`https://skillup-website.onrender.com/api/admin/user/${userId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("User deleted successfully.");
      fetchUsers();
    } catch (err) {
      console.error("User deletion error", err);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`https://skillup-website.onrender.com/api/admin/course/${courseId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Course deleted successfully.");
      fetchCourses();
    } catch (err) {
      console.error("Course deletion error", err);
    }
  };


  const handleDeleteReview = async (reviewId) => {
  if (!window.confirm("Delete this review?")) return;
  try {
    await axios.delete(`https://skillup-website.onrender.com/api/courses/admin/review/${reviewId}/delete/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessage("Review deleted.");
    fetchReviews();
  } catch (err) {
    console.error("Delete review error", err);
  }
};






  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">🛡️ Admin Dashboard</h1>

        {message && <p className="text-green-600 mb-4">{message}</p>}

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">👥 Users</h2>
          <button
            onClick={logoutUser}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            🔒 Logout
          </button>
        </div>

        {/* 👥 USERS TABLE */}
        <div className="overflow-x-auto mb-10">
          <table className="w-full table-auto border">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Verified</th>
                <th className="px-4 py-2 border">Approved</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="text-center border-t">
                  <td className="px-4 py-2 border">{u.email}</td>
                  <td className="px-4 py-2 border">{u.role}</td>
                  <td className="px-4 py-2 border">{u.is_verified ? "✅" : "❌"}</td>
                  <td className="px-4 py-2 border">
                    {u.role === "instructor" ? (u.is_approved ? "✅" : "❌") : "-"}
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    {u.role === "instructor" && !u.is_approved && (
                      <button
                        onClick={() => handleApprove(u.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📚 COURSES TABLE */}
        <h2 className="text-xl font-semibold mb-2">📚 Courses</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border">
            <thead className="bg-purple-100">
              <tr>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Instructor</th>
                <th className="px-4 py-2 border">Level</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id} className="text-center border-t">
                  <td className="px-4 py-2 border">{c.title}</td>
                  <td className="px-4 py-2 border">{c.instructor_name || "N/A"}</td>
                  <td className="px-4 py-2 border">{c.difficulty}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDeleteCourse(c.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
{/* 📚 reviews TABLE */}
        <h2 className="text-xl font-semibold mt-8 mb-2">📝 All Reviews</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border">
            <thead className="bg-yellow-100">
              <tr>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Course</th>
                <th className="px-4 py-2 border">Rating</th>
                <th className="px-4 py-2 border">Comment</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id} className="text-center border-t">
                  <td className="px-4 py-2 border">{r.user_email}</td>
                  <td className="px-4 py-2 border">{r.course_title}</td>
                  <td className="px-4 py-2 border">⭐ {r.rating}</td>
                  <td className="px-4 py-2 border">{r.comment}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDeleteReview(r.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



      </div>
    </div>
  );
}






// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";

// export default function AdminDashboard() {
//   const { token, loading, logoutUser } = useContext(AuthContext);

//   const [users, setUsers] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!loading && token) {
//       fetchUsers();
//       fetchCourses();
//       fetchReviews();
//     }
//   }, [loading, token]);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("https://skillup-website.onrender.com/api/admin/users/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching users", err);
//     }
//   };

//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get("https://skillup-website.onrender.com/api/courses/admin/courses/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCourses(res.data);
//     } catch (err) {
//       console.error("Error fetching courses", err);
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get("https://skillup-website.onrender.com/api/courses/admin/reviews/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setReviews(res.data);
//     } catch (err) {
//       console.error("Error fetching reviews", err);
//     }
//   };

//   const handleApprove = async (userId) => {
//     try {
//       await axios.patch(`https://skillup-website.onrender.com/api/admin/approve/${userId}/`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("Instructor approved successfully.");
//       fetchUsers();
//     } catch (err) {
//       console.error("Approval error", err);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await axios.delete(`https://skillup-website.onrender.com/api/admin/user/${userId}/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("User deleted successfully.");
//       fetchUsers();
//     } catch (err) {
//       console.error("User deletion error", err);
//     }
//   };

//   const handleDeleteCourse = async (courseId) => {
//     if (!window.confirm("Are you sure you want to delete this course?")) return;
//     try {
//       await axios.delete(`https://skillup-website.onrender.com/api/admin/course/${courseId}/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("Course deleted successfully.");
//       fetchCourses();
//     } catch (err) {
//       console.error("Course deletion error", err);
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     if (!window.confirm("Are you sure you want to delete this review?")) return;
//     try {
//       await axios.delete(`https://skillup-website.onrender.com/api/admin/courses/admin/review/${reviewId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("Review deleted successfully.");
//       fetchReviews();
//     } catch (err) {
//       console.error("Review deletion error", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-lg">

//         <h1 className="text-3xl font-bold text-blue-700 mb-4">🛡️ Admin Dashboard</h1>

//         {message && <p className="text-green-600 mb-4">{message}</p>}

//         <div className="flex justify-between mb-4">
//           <h2 className="text-xl font-semibold">👥 Users</h2>
//           <button
//             onClick={logoutUser}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           >
//             🔒 Logout
//           </button>
//         </div>

//         {/* 👥 USERS TABLE */}
//         <div className="overflow-x-auto mb-10">
//           <table className="w-full table-auto border">
//             <thead className="bg-blue-100">
//               <tr>
//                 <th className="px-4 py-2 border">Email</th>
//                 <th className="px-4 py-2 border">Role</th>
//                 <th className="px-4 py-2 border">Verified</th>
//                 <th className="px-4 py-2 border">Approved</th>
//                 <th className="px-4 py-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((u) => (
//                 <tr key={u.id} className="text-center border-t">
//                   <td className="px-4 py-2 border">{u.email}</td>
//                   <td className="px-4 py-2 border">{u.role}</td>
//                   <td className="px-4 py-2 border">{u.is_verified ? "✅" : "❌"}</td>
//                   <td className="px-4 py-2 border">
//                     {u.role === "instructor" ? (u.is_approved ? "✅" : "❌") : "-"}
//                   </td>
//                   <td className="px-4 py-2 border space-x-2">
//                     {u.role === "instructor" && !u.is_approved && (
//                       <button
//                         onClick={() => handleApprove(u.id)}
//                         className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
//                       >
//                         Approve
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDeleteUser(u.id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* 📚 COURSES TABLE */}
//         <h2 className="text-xl font-semibold mb-2">📚 Courses</h2>
//         <div className="overflow-x-auto mb-10">
//           <table className="w-full table-auto border">
//             <thead className="bg-purple-100">
//               <tr>
//                 <th className="px-4 py-2 border">Title</th>
//                 <th className="px-4 py-2 border">Instructor</th>
//                 <th className="px-4 py-2 border">Level</th>
//                 <th className="px-4 py-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {courses.map((c) => (
//                 <tr key={c.id} className="text-center border-t">
//                   <td className="px-4 py-2 border">{c.title}</td>
//                   <td className="px-4 py-2 border">{c.instructor_name || "N/A"}</td>
//                   <td className="px-4 py-2 border">{c.difficulty}</td>
//                   <td className="px-4 py-2 border">
//                     <button
//                       onClick={() => handleDeleteCourse(c.id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* 📝 REVIEWS TABLE */}
//         <h2 className="text-xl font-semibold mb-2">📝 Reviews</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full table-auto border">
//             <thead className="bg-yellow-100">
//               <tr>
//                 <th className="px-4 py-2 border">User</th>
//                 <th className="px-4 py-2 border">Course</th>
//                 <th className="px-4 py-2 border">Rating</th>
//                 <th className="px-4 py-2 border">Comment</th>
//                 <th className="px-4 py-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reviews.map((r) => (
//                 <tr key={r.id} className="text-center border-t">
//                   <td className="px-4 py-2 border">{r.user_email}</td>
//                   <td className="px-4 py-2 border">{r.course}</td>
//                   <td className="px-4 py-2 border">⭐ {r.rating}</td>
//                   <td className="px-4 py-2 border">{r.comment}</td>
//                   <td className="px-4 py-2 border">
//                     <button
//                       onClick={() => handleDeleteReview(r.id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// }

