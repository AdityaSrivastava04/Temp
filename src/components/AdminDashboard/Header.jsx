import React, { useState } from "react";
import { FaBell, FaUpload } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Mapping paths to titles
  const pathToTitle = {
    "/dashboard": "Dashboard",
    "/applications": "My Applications",
    "/jobs": "Find Jobs",
    "/companies": "",
    "/profile": "My Public Profile",
    "/settings": "Settings",
    "/help": "Help Center",
    "/description": "Job Description",
  };

  const notifications = [
    {
      id: 1,
      name: "Jan Mayer",
      message: "invited you to interview with Nomad",
      avatar: "/avatar1.png",
      status: "New",
      statusColor: "text-yellow-500",
      time: "12 mins ago",
    },
    {
      id: 2,
      name: "Jana Alicia",
      message: "from Udacity updated your job applications status",
      avatar: "/avatar2.png",
      status: "Shortlisted",
      statusColor: "bg-green-100 text-green-600 px-2 py-0.5 rounded-md",
      time: "3 days ago",
    },
    {
      id: 3,
      name: "Ally Wales",
      message: "from Digital Ocean sent you an interview invitation",
      avatar: "/avatar3.png",
      status: "Interview - Jake Gyll",
      role: "Social Media Manager Role",
      date: "Mon, 20 July 2021",
      timeSlot: "12 PM - 12:30 PM",
      email: "jakegyll@email.com",
      time: "14 July 2021 - 3:26 PM",
    },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitResume = (e) => {
    e.preventDefault();
    if (selectedFile) {
      // Here you would typically handle the file upload
      console.log("Uploading file:", selectedFile);
      // Add your API call or file processing logic here
      alert(`Resume "${selectedFile.name}" submitted successfully!`);
      setSelectedFile(null);
      setShowResumeModal(false);
    }
  };

  // Get the current title or fallback to "Dashboard"
  const title = pathToTitle[location.pathname];

  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between p-4">
      {/* Dynamic Page Title - Smaller */}
      <h1 className="text-2xl font-bold text-gray-900 cursor-default">
        {title === "Job Description" ? (
          <a href="/jobs" className="font-bold cursor-pointer flex items-center">
            <span className="text-3xl font-extrabold -mt-1">←</span> {title}
          </a>
        ) : (
          title
        )}
      </h1>

      <div className="flex items-center space-x-4 px-2 py-1">
        {/* Add Resume Button - Wider */}
        <button
          onClick={() => setShowResumeModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold cursor-pointer transition-colors duration-200 min-w-[120px] justify-center"
        >
          <FaUpload className="w-3 h-3" />
          <span>Add Resume</span>
        </button>

        {/* Back to Homepage Button - Wider */}
        <Link
          to="/"
          className="border border-blue-700 text-blue-700 px-4 py-2 text-sm font-semibold hover:bg-blue-50 rounded-md cursor-pointer transition-colors duration-200 min-w-[120px] text-center block"
        >
          Back to homepage
        </Link>

        {/* Notification Icon with Badge - Smaller */}
        <div className="relative">
          {/* Notification Icon */}
          <div
            className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setOpen(!open)}
          >
            <FaBell className="text-gray-700 w-5 h-5" /> {/* Smaller icon */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>{" "}
            {/* Smaller badge */}
          </div>

          {/* Overlay (Greyish Fade Background) */}
          {open && (
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-40 cursor-pointer"
              onClick={() => setOpen(false)}
            ></div>
          )}

          {/* Dropdown Panel - Smaller */}
          {open && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-2xl border-gray-100 rounded-lg border p-4 z-50">
              {/* Header */}
              <div className="flex justify-between items-center border-gray-300 border-b pb-2 mb-2">
                <h2 className="text-base font-bold cursor-default">Notifications</h2>
                <button className="text-blue-600 text-xs hover:underline cursor-pointer">
                  Mark all as read
                </button>
              </div>

              {/* Notification Items */}
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-3 border-b border-gray-300 p-3 -mt-2 cursor-pointer hover:bg-gray-50"
                  >
                    {/* Avatar */}
                    <img
                      src={notification.avatar}
                      alt="User"
                      className="w-8 h-8 rounded-full cursor-pointer"
                    />
                    {/* Content */}
                    <div className="flex-1">
                      <p className="text-sm">
                        <strong className="cursor-pointer hover:underline">
                          {notification.name}
                        </strong>{" "}
                        {notification.message}
                      </p>

                      {/* Status Badge (New / Shortlisted) */}
                      {notification.status && (
                        <span
                          className={`text-xs font-semibold px-1.5 py-0.5 rounded-full inline-block mt-1 cursor-pointer ${
                            notification.status === "New"
                              ? "bg-yellow-100 text-yellow-600 border border-yellow-400"
                              : "bg-green-100 text-green-600 border border-green-400"
                          }`}
                        >
                          {notification.status}
                        </span>
                      )}

                      {notification.role && (
                        <div className="border-l-3 border-blue-500 pl-2 mt-2 bg-gray-100 p-2 rounded-sm cursor-pointer hover:bg-gray-200">
                          <p className="text-sm font-semibold">
                            {notification.status}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notification.role}
                          </p>
                          <p className="text-xs font-medium">
                            {notification.date}{" "}
                            <span className="text-gray-400">|</span>{" "}
                            {notification.timeSlot}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notification.email}
                          </p>
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-1 cursor-default">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resume Upload Modal */}
      {showResumeModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 cursor-pointer"
            onClick={() => setShowResumeModal(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold cursor-default">Upload Resume</h3>
              <button
                onClick={() => setShowResumeModal(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer text-xl"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmitResume}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 cursor-default">
                  Select PDF or DOCX file
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaUpload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 cursor-pointer">
                        <span className="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-gray-500 cursor-pointer">
                        PDF or DOCX (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {selectedFile && (
                  <div className="mt-2 text-sm text-gray-600 cursor-default">
                    Selected: {selectedFile.name}
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowResumeModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer transition-colors duration-200 min-w-[80px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md cursor-pointer transition-colors duration-200 min-w-[120px] ${
                    selectedFile
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-400 cursor-not-allowed"
                  }`}
                >
                  Upload Resume
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;