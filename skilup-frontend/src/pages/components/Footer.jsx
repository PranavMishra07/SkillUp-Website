import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-2">SkillUp</h2>
          <p className="text-gray-300">
            SkillUp is your one-stop platform to learn, teach, and grow. We empower learners and instructors with quality content and tools.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Explore</h3>
          <ul className="space-y-2">
            <li><Link to="/courses" className="hover:underline text-gray-300">Courses</Link></li>
            <li><Link to="/about" className="hover:underline text-gray-300">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline text-gray-300">Contact</Link></li>
            <li><Link to="/faq" className="hover:underline text-gray-300">FAQ</Link></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-blue-400">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook size={24} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter size={24} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin size={24} /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube size={24} /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SkillUp. All rights reserved.
      </div>
    </footer>
  );
}
