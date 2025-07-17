import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function CourseDetail() {
  const { id } = useParams();
  const { token, isAuthenticated, role } = useContext(AuthContext);

  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCourse();
    fetchReviews();
  }, []);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`https://skillup-website.onrender.com/api/courses/${id}/`);
      setCourse(res.data);
    } catch (err) {
      console.error("Course fetch error", err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`https://skillup-website.onrender.com/api/courses/${id}/reviews/`);
      setReviews(res.data);
    } catch (err) {
      console.error("Reviews fetch error", err);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `https://skillup-website.onrender.com/api/courses/${id}/reviews/add/`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Review submitted successfully!");
      setRating(5);
      setComment("");
      fetchReviews(); // Refresh reviews
    } catch (err) {
      console.error("Review submission error", err);
      setMessage("You may have already reviewed or must be logged in.");
    }
  };

  const handleEnroll = async () => {
    console.log("Token being sent:", token);

    try {
      await axios.post(
        `https://skillup-website.onrender.com/api/courses/${id}/enroll/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Enrolled successfully!");
    } catch (err) {
      console.error("Enrollment error", err);
      alert("⚠️ You may already be enrolled or need to log in.");
    }
  };

  if (!course) return <div className="p-6">Loading course...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">{course.title}</h1>
        <p className="text-gray-600 mb-4">By {course.instructor_name}</p>
        <p className="mb-4">{course.description}</p>

        {/* Video */}
        {course.video_url ? (
          <div className="mb-6">
            <iframe
              className="w-full aspect-video rounded-lg"
              src={course.video_url}
              title="Course Video"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p className="text-gray-500">No video available</p>
        )}

        {/* Average Rating */}
        <p className="text-lg text-yellow-500 font-semibold mb-4">
          ⭐ Average Rating: {course.avg_rating || "No reviews yet"}
        </p>

        {/* Enroll Button */}
        {isAuthenticated && role === "learner" && (
          <button
            onClick={handleEnroll}
            className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ✅ Enroll in this Course
          </button>
        )}

        {/* Review Form */}
        {isAuthenticated && (
          <form onSubmit={handleSubmitReview} className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-2">Leave a Review</h2>
            <div className="flex gap-4 mb-2">
              <label className="text-sm text-gray-700">Rating:</label>
              <select
                className="border px-2 py-1 rounded"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              className="w-full border p-2 rounded mb-2"
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Review
            </button>

            {message && <p className="text-green-600 mt-2">{message}</p>}
          </form>
        )}

        {/* Review List */}
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-3 border rounded shadow-sm">
                <p className="font-semibold text-gray-800">{review.user_email}</p>
                <p className="text-yellow-500">⭐ {review.rating}</p>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
