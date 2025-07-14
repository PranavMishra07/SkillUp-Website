import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("learner");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/signup/", {
        email,
        password,
        role,
      });

      setOtpSent(true);
      setMessage("OTP sent to your email. Please verify.");
      setError("");
    } catch (err) {
      setError("Signup failed. Email may already be registered.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/verify-otp/", {
        email,
        otp,
      });

      setMessage("Email verified successfully. You can now log in.");
      setError("");
    } catch (err) {
      setError("OTP verification failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create Your Account</h2>

        {message && <div className="text-green-600 mb-4 text-center">{message}</div>}
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        {!otpSent ? (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                className="w-full mt-1 p-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Confirm Password</label>
              <input
                type="password"
                className="w-full mt-1 p-2 border rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Select Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="learner">Learner</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Signup & Get OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Enter OTP</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Verify Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
