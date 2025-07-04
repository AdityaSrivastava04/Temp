import { useState } from "react";
import {
  Home,
  FileText,
  Search,
  Briefcase,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ClipboardList,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);

  // Function to check active path
  const isActive = (path) => location.pathname === path;

  // Toggle logout dropdown
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  // Handle logout functionality
  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    // You might want to redirect to login page or call a logout API
  };

  return (
    <div className="w-60 h-screen bg-[#F8F8FD] border-r border-gray-200 flex flex-col p-3 relative overflow-hidden">
      {/* Logo */}
      <div className="flex justify-center p-2">
        <h1 className="text-2xl font-bold text-black-800 mb-4 relative z-10">
          Nebulyn
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 relative z-10">
        <ul className="space-y-1">
          <li>
            <Link
              to="/admin-dashboard"
              className={`flex items-center px-3 py-2 rounded-md text-sm relative ${
                isActive("/admin-dashboard")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Home size={18} className="mr-2" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/company"
              className={`flex items-center px-3 py-2 rounded-md text-sm relative ${
                isActive("/company") || isActive("/company-data")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FileText size={18} className="mr-2" /> Company
            </Link>
          </li>
          <li>
            <Link
              to="/college"
              className={`flex items-center px-3 py-2 rounded-md text-sm relative ${
                isActive("/college") || isActive("/college-data")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Search size={18} className="mr-2" /> College
            </Link>
          </li>
          <li>
            <Link
              to="/candidate"
              className={`flex items-center px-3 py-2 rounded-md text-sm relative ${
                isActive("/candidate") || isActive("/candidate-data")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Briefcase size={18} className="mr-2" /> Candidate
            </Link>
          </li>
          <li>
            <Link
              to="/assessment"
              className={`flex items-center px-3 py-2 rounded-md text-sm relative ${
                isActive("/assessment")
                  ? "bg-[#E8F0FE] text-[#3B8BEB] font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1.5 before:bg-[#3B8BEB] before:rounded-full"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ClipboardList size={18} className="mr-2" /> Assessment
            </Link>
          </li>
        </ul>

        <div className="border-t border-blue-500 pt-3 relative z-10 mt-3">
        </div>
      </nav>

      {/* Profile Section with Logout Dropdown */}
      <div className="absolute bottom-4 left-3 z-10">
        <div
          className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100"
          onClick={toggleLogout}
        >
          <img
            src="https://via.placeholder.com/36"
            alt="Profile"
            className="w-10 h-10 rounded-full border"
          />
          <div>
            <p className="text-sm font-bold text-gray-800">Jake Gyll</p>
            <p className="text-xs text-gray-500">jakegyll@email.com</p>
          </div>
        </div>

        {/* Logout Dropdown */}
        {showLogout && (
          <div className="absolute bottom-16 left-0 w-full bg-white shadow-lg rounded-md p-2 border border-gray-200 transition-all duration-300">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-gray-100 rounded-md text-sm"
            >
              <LogOut size={18} className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;