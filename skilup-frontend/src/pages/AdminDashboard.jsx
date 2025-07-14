import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function AdminDashboard() {
  const { token } = useContext(AuthContext);

  const [stats, setStats] = useState({});
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchPendingInstructors();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/admin/stats/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats", err);
    }
  };

  const fetchPendingInstructors = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/admin/pending-instructors/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInstructors(res.data);
    } catch (err) {
      console.error("Error fetching instructors", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/admin/approve-instructor/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPendingInstructors(); // Refresh list
    } catch (err) {
      console.error("Approval failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">🛡️ Admin Dashboard</h1>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard label="Users" value={stats.total_users} />
          <StatCard label="Courses" value={stats.total_courses} />
          <StatCard label="Reviews" value={stats.total_reviews} />
        </div>

        {/* Instructor Approvals */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Pending Instructor Approvals</h2>
          {instructors.length > 0 ? (
            <div className="space-y-4">
              {instructors.map((inst) => (
                <div
                  key={inst.id}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded"
                >
                  <div>
                    <p className="font-medium">{inst.email}</p>
                    <p className="text-sm text-gray-500">Registered: {inst.created_at}</p>
                  </div>
                  <button
                    onClick={() => handleApprove(inst.id)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No pending instructor requests.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow text-center">
      <h3 className="text-lg font-semibold text-blue-700">{label}</h3>
      <p className="text-2xl font-bold text-blue-900">{value || 0}</p>
    </div>
  );
}
