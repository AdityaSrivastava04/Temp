import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {
  ChevronDown,
  Mail,
  Phone,
  Globe,
  Star,
  ChevronLeft,
  Calendar,
  Filter,
  Search,
  Award,
  Zap,
  Check,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CollegeDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("students");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [view, setView] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobRole, setSelectedJobRole] = useState("All");
  const [showTop25, setShowTop25] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // Sample student data (showing all students by default)
  const students = [
    // Software Engineers
    { id: 1, name: "Jake Gyll", ntScore: 85, jobRole: "Software Engineer", image: "https://randomuser.me/api/portraits/men/1.jpg", status: "Not Hired" },
    { id: 9, name: "Darrell Steward", ntScore: 89, jobRole: "Software Engineer", image: "https://randomuser.me/api/portraits/men/9.jpg", status: "Hired" },
    { id: 17, name: "Marvin McKinney", ntScore: 82, jobRole: "Software Engineer", image: "https://randomuser.me/api/portraits/men/17.jpg", status: "Not Hired" },
    { id: 25, name: "Kristin Watson", ntScore: 91, jobRole: "Software Engineer", image: "https://randomuser.me/api/portraits/women/25.jpg", status: "Hired" },
    
    // Product Managers
    { id: 2, name: "Guy Hawkins", ntScore: 78, jobRole: "Product Manager", image: "https://randomuser.me/api/portraits/men/2.jpg", status: "Not Hired" },
    { id: 10, name: "Floyd Miles", ntScore: 76, jobRole: "Product Manager", image: "https://randomuser.me/api/portraits/men/10.jpg", status: "Not Hired" },
    { id: 18, name: "Kathryn Murphy", ntScore: 94, jobRole: "Product Manager", image: "https://randomuser.me/api/portraits/women/18.jpg", status: "Hired" },
    
    // Data Scientists
    { id: 3, name: "Cyndy Lillibridge", ntScore: 92, jobRole: "Data Scientist", image: "https://randomuser.me/api/portraits/women/3.jpg", status: "Hired" },
    { id: 11, name: "Courtney Henry", ntScore: 91, jobRole: "Data Scientist", image: "https://randomuser.me/api/portraits/women/11.jpg", status: "Hired" },
    { id: 19, name: "Esther Howard", ntScore: 77, jobRole: "Data Scientist", image: "https://randomuser.me/api/portraits/women/19.jpg", status: "Not Hired" },
    
    // UX Designers
    { id: 4, name: "Rodolfo Goode", ntScore: 65, jobRole: "UX Designer", image: "https://randomuser.me/api/portraits/men/4.jpg", status: "Not Hired" },
    { id: 12, name: "Dianne Russell", ntScore: 84, jobRole: "UX Designer", image: "https://randomuser.me/api/portraits/women/12.jpg", status: "Not Hired" },
    { id: 20, name: "Albert Flores", ntScore: 83, jobRole: "UX Designer", image: "https://randomuser.me/api/portraits/men/20.jpg", status: "Not Hired" },
    
    // Frontend Developers
    { id: 5, name: "Leif Floyd", ntScore: 88, jobRole: "Frontend Developer", image: "https://randomuser.me/api/portraits/men/5.jpg", status: "Not Hired" },
    { id: 13, name: "Ronald Richards", ntScore: 79, jobRole: "Frontend Developer", image: "https://randomuser.me/api/portraits/men/13.jpg", status: "Not Hired" },
    { id: 21, name: "Bessie Cooper", ntScore: 90, jobRole: "Frontend Developer", image: "https://randomuser.me/api/portraits/women/21.jpg", status: "Hired" },
    
    // Full Stack Developers
    { id: 6, name: "Jenny Wilson", ntScore: 95, jobRole: "Full Stack Developer", image: "https://randomuser.me/api/portraits/women/6.jpg", status: "Hired" },
    { id: 14, name: "Jacob Jones", ntScore: 87, jobRole: "Full Stack Developer", image: "https://randomuser.me/api/portraits/men/14.jpg", status: "Hired" },
    { id: 22, name: "Cameron Williamson", ntScore: 85, jobRole: "Full Stack Developer", image: "https://randomuser.me/api/portraits/men/22.jpg", status: "Hired" },
    
    // Backend Developers
    { id: 7, name: "Jerome Bell", ntScore: 72, jobRole: "Backend Developer", image: "https://randomuser.me/api/portraits/men/7.jpg", status: "Not Hired" },
    { id: 15, name: "Theresa Webb", ntScore: 93, jobRole: "Backend Developer", image: "https://randomuser.me/api/portraits/women/15.jpg", status: "Hired" },
    { id: 23, name: "Leslie Alexander", ntScore: 74, jobRole: "Backend Developer", image: "https://randomuser.me/api/portraits/women/23.jpg", status: "Not Hired" },
    
    // DevOps Engineers
    { id: 8, name: "Eleanor Pena", ntScore: 81, jobRole: "DevOps Engineer", image: "https://randomuser.me/api/portraits/women/8.jpg", status: "Not Hired" },
    { id: 16, name: "Arlene McCoy", ntScore: 68, jobRole: "DevOps Engineer", image: "https://randomuser.me/api/portraits/women/16.jpg", status: "Not Hired" },
    { id: 24, name: "Robert Fox", ntScore: 88, jobRole: "DevOps Engineer", image: "https://randomuser.me/api/portraits/men/24.jpg", status: "Hired" },
  ];

  // Subscription plans data
  const subscriptionPlans = [
    {
      name: "Basic",
      price: "₹12,500",
      duration: "1 Month",
      access: "All College Profiles",
      tests: "Up to 4 Tests",
      features: ["Access to all college profiles", "Create up to 4 tests", "Basic support"]
    },
    {
      name: "Pro",
      price: "₹70,000",
      duration: "6 Months",
      access: "All College Profiles",
      tests: "Up to 30 Tests",
      features: ["Access to all college profiles", "Create up to 30 tests", "Priority support"]
    },
    {
      name: "Enterprise",
      price: "₹1,30,000",
      duration: "12 Months",
      access: "All College Profiles",
      tests: "Up to 120 Tests",
      features: [
        "Access to all college profiles",
        "Create up to 120 tests",
        "24/7 premium support",
      ]
    }
  ];

  // Get unique job roles
  const jobRoles = ["All", ...new Set(students.map((student) => student.jobRole))];

  // Filter students - showing all by default (we'll add subscription logic later)
  const filteredStudents = students
    .filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((student) =>
      selectedJobRole === "All" ? true : student.jobRole === selectedJobRole
    )
    .sort((a, b) => b.ntScore - a.ntScore)
    .slice(0, showTop25 ? 25 : students.length);

  // Group students by job role for pipeline view
  const jobRoleGroups = filteredStudents.reduce((groups, student) => {
    const group = groups[student.jobRole] || [];
    group.push(student);
    groups[student.jobRole] = group;
    return groups;
  }, {});

  const handleScheduleInterview = (student) => {
    setSelectedStudent(student);
    setShowScheduleModal(true);
  };

  const toggleWishlist = (studentId) => {
    if (wishlist.includes(studentId)) {
      setWishlist(wishlist.filter(id => id !== studentId));
    } else {
      setWishlist([...wishlist, studentId]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Hired": return "bg-green-50";
      case "Not Hired": return "bg-gray-50";
      default: return "bg-gray-50";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "Hired": return "text-green-600";
      case "Not Hired": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  const StudentCard = ({ student }) => (
    <div className="bg-white p-3 rounded-md shadow-sm border border-gray-200 mb-2 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => handleScheduleInterview(student)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img className="h-10 w-10 rounded-full border object-cover" src={student.image} alt={student.name} />
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">{student.name}</div>
            <div className="text-xs text-gray-500">{student.jobRole}</div>
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(student.id);
          }}
          className="text-gray-400 hover:text-red-500"
        >
          <Heart 
            className="h-5 w-5 cursor-pointer" 
            fill={wishlist.includes(student.id) ? "#ef4444" : "none"} 
            stroke={wishlist.includes(student.id) ? "#ef4444" : "currentColor"} 
          />
        </button>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <div className="text-sm">
          <span className="font-medium">NT Score: </span>
          <span className={student.ntScore >= 80 ? "text-green-600" : "text-yellow-600"}>
            {student.ntScore}/100
          </span>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusTextColor(student.status)} ${getStatusColor(student.status)}`}>
          {student.status}
        </span>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "students":
        if (view === "table") {
          return (
            <div>
              <div className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search students by name"
                        className="w-full pl-8 pr-2 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <select
                      value={selectedJobRole}
                      onChange={(e) => setSelectedJobRole(e.target.value)}
                      className="text-xs border rounded p-1 cursor-pointer"
                    >
                      {jobRoles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => setShowTop25(!showTop25)}
                    className={`flex items-center gap-1 px-2 py-1 text-xs rounded ${
                      showTop25 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                    } cursor-pointer`}
                  >
                    <Award className="h-3 w-3" />
                    Top 25
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">NT Score</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">Job Role</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap" onClick={() => handleScheduleInterview(student)}>
                          <div className="flex items-center">
                            <img className="h-8 w-8 rounded-full" src={student.image} alt={student.name} />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap" onClick={() => handleScheduleInterview(student)}>
                          <div className={`text-sm ${student.ntScore >= 80 ? "text-green-600" : "text-yellow-600"}`}>
                            {student.ntScore}/100
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap" onClick={() => handleScheduleInterview(student)}>
                          <div className="text-sm text-gray-900">{student.jobRole}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap" onClick={() => handleScheduleInterview(student)}>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusTextColor(student.status)} ${getStatusColor(student.status)}`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => toggleWishlist(student.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Heart 
                                className="h-5 w-5 cursor-pointer" 
                                fill={wishlist.includes(student.id) ? "#ef4444" : "none"} 
                                stroke={wishlist.includes(student.id) ? "#ef4444" : "currentColor"} 
                              />
                            </button>
                            <button
                              onClick={() => handleScheduleInterview(student)}
                              className="text-blue-600 hover:text-blue-900 flex items-center cursor-pointer"
                            >
                              <Calendar className="h-4 w-4 mr-1" />
                              Schedule
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <div className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search students by name"
                        className="w-full pl-8 pr-2 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <select
                      value={selectedJobRole}
                      onChange={(e) => setSelectedJobRole(e.target.value)}
                      className="text-xs border rounded p-1 cursor-pointer"
                    >
                      {jobRoles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => setShowTop25(!showTop25)}
                    className={`flex items-center gap-1 px-2 py-1 text-xs rounded ${
                      showTop25 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                    } cursor-pointer`}
                  >
                    <Award className="h-3 w-3" />
                    Top 25
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(jobRoleGroups).map(([jobRole, students]) => (
                  <div key={jobRole} className="bg-white rounded-md shadow-sm">
                    <div className="p-2 rounded-t-md bg-blue-50 cursor-default">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-blue-600">{jobRole}</h3>
                        <span className="bg-white px-2 py-0.5 rounded-full text-xs font-medium text-gray-700">
                          {students.length} students
                        </span>
                      </div>
                    </div>
                    <div className="p-2">
                      {students.length > 0 ? (
                        students.map((student) => (
                          <StudentCard key={student.id} student={student} />
                        ))
                      ) : (
                        <div className="text-center py-3 text-gray-500 text-sm">
                          No students found
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }

      case "courses":
        return (
          <div className="py-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Courses Offered</h2>
            <div className="space-y-4">
              {[
                "Computer Science Engineering",
                "Electronics and Communication",
                "Mechanical Engineering",
                "Civil Engineering",
                "Business Administration",
              ].map((course, index) => (
                <div key={index} className="border p-4 rounded-md hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-medium">{course}</h3>
                  <p className="text-sm text-gray-600 mt-1">Duration: 4 years | Intake: 60 students</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "placement":
        return (
          <div className="py-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Placement Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border p-4 rounded-md hover:bg-gray-50 cursor-pointer">
                <h3 className="text-sm font-medium text-gray-500">Last Year Placements</h3>
                <p className="text-2xl font-bold mt-1">87%</p>
              </div>
              <div className="border p-4 rounded-md hover:bg-gray-50 cursor-pointer">
                <h3 className="text-sm font-medium text-gray-500">Average Package</h3>
                <p className="text-2xl font-bold mt-1">₹6.5 LPA</p>
              </div>
              <div className="border p-4 rounded-md hover:bg-gray-50 cursor-pointer">
                <h3 className="text-sm font-medium text-gray-500">Highest Package</h3>
                <p className="text-2xl font-bold mt-1">₹32 LPA</p>
              </div>
              <div className="border p-4 rounded-md hover:bg-gray-50 cursor-pointer">
                <h3 className="text-sm font-medium text-gray-500">Top Recruiters</h3>
                <p className="text-sm mt-1">Google, Microsoft, Amazon, TCS, Infosys</p>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-base font-medium">Tab content not found</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          <div className="p-4">
            <div className="flex justify-between items-center pb-4">
              <div className="flex items-center space-x-2">
                <button
                  className="text-gray-700 text-2xl font-bold cursor-pointer hover:text-blue-600"
                  onClick={() => navigate('/browse-colleges')}
                >
                  <ChevronLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-gray-900 cursor-default">College Details</h1>
              </div>
              <button className="border border-blue-500 text-blue-500 px-3 py-1 rounded-md flex items-center space-x-1 text-sm cursor-pointer hover:bg-blue-50">
                <ChevronDown size={14} />
                <span>More Action</span>
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Left Side - College Details with Subscription Button */}
              <div className="w-full lg:w-72 bg-white border border-gray-300 rounded-lg p-4">
                <div className="flex flex-col items-center mb-3 cursor-default">
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="College"
                    className="w-20 h-20 rounded-full object-cover mb-2"
                  />
                  <h2 className="text-lg font-bold text-gray-800 text-center">National Institute of Technology</h2>
                  <p className="text-sm text-gray-500 mb-1">New Delhi, India</p>
                  <div className="flex items-center">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-0.5 text-sm text-gray-700">4.2</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded p-2 mb-3 cursor-default">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-indigo-600">Established</span>
                    <span className="text-xs text-gray-500">1961</span>
                  </div>
                  <div className="border-t border-gray-300 mb-2"></div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-gray-500">Type</p>
                      <p className="font-medium">Public</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Approved by</p>
                      <p className="font-medium">UGC, AICTE</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Students</p>
                      <p className="font-medium">5,200</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Faculty</p>
                      <p className="font-medium">320</p>
                    </div>
                  </div>
                </div>

                {/* Subscription Button */}
                <button 
                  className="w-full mb-3 py-2 px-4 bg-blue-600 text-white rounded-md flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors"
                  onClick={() => setShowSubscriptionModal(true)}
                >
                  <Zap className="h-4 w-4" />
                  <span>Get Subscription Plan</span>
                </button>

                <div className="border-t border-gray-300 mb-3"></div>

                <div className="cursor-default">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Contact</h3>
                  <div className="space-y-3">
                    {[
                      { icon: Mail, label: "Email", value: "info@nitdelhi.ac.in", href: "mailto:info@nitdelhi.ac.in" },
                      { icon: Phone, label: "Phone", value: "+91 11 27871000" },
                      { icon: Globe, label: "Website", value: "www.nitdelhi.ac.in", href: "https://www.nitdelhi.ac.in" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <item.icon className="w-4 w-4 text-gray-500" />
                        <div>
                          <span className="text-xs text-gray-500">{item.label}</span>
                          {item.href ? (
                            <a href={item.href} className="block text-xs font-medium text-blue-500 hover:underline cursor-pointer">
                              {item.value}
                            </a>
                          ) : (
                            <span className="block text-xs font-medium text-gray-700">{item.value}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Student Table */}
              <div className="flex-1 bg-white border border-gray-300 rounded-lg">
                <div className="flex justify-between items-center border-b p-2">
                  <div className="flex overflow-x-auto">
                    {[
                      { id: "students", label: "Students" },
                      { id: "courses", label: "Courses" },
                      { id: "placement", label: "Placement" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        className={`px-4 py-2 text-sm font-medium cursor-pointer whitespace-nowrap ${
                          activeTab === tab.id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  {activeTab === "students" && (
                    <div className="flex bg-blue-100 p-0.5 rounded-md ml-2">
                      <button
                        className={`w-24 h-7 px-2 py-0.5 rounded-sm text-blue-600 text-xs cursor-pointer ${
                          view === "pipeline" ? "bg-white shadow-sm" : "hover:bg-blue-200"
                        }`}
                        onClick={() => setView("pipeline")}
                      >
                        Pipeline
                      </button>
                      <button
                        className={`w-24 h-7 px-2 py-0.5 rounded-sm text-blue-600 text-xs cursor-pointer ${
                          view === "table" ? "bg-white shadow-sm" : "hover:bg-blue-200"
                        }`}
                        onClick={() => setView("table")}
                      >
                        Table
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-4 text-sm">
                  {activeTab === "students" && filteredStudents.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No students match your filters</div>
                  ) : (
                    renderTabContent()
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Schedule Interview for {selectedStudent?.name}</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 cursor-default">Interview Date</label>
                <input type="date" className="w-full border rounded-md p-2 cursor-pointer" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 cursor-default">Time Slot</label>
                <select className="w-full border rounded-md p-2 cursor-pointer">
                  <option>10:00 AM - 11:00 AM</option>
                  <option>11:00 AM - 12:00 PM</option>
                  <option>2:00 PM - 3:00 PM</option>
                  <option>3:00 PM - 4:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 cursor-default">Interview Type</label>
                <select className="w-full border rounded-md p-2 cursor-pointer">
                  <option>Technical Round</option>
                  <option>HR Round</option>
                  <option>Managerial Round</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 cursor-default">Interviewers</label>
                <input
                  type="text"
                  placeholder="Select interviewers"
                  className="w-full border rounded-md p-2 cursor-text"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Plans Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Choose a Subscription Plan</h3>
              <button
                onClick={() => setShowSubscriptionModal(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan, index) => (
                <div key={index} className={`border rounded-lg p-5 ${index === 1 ? "border-blue-500 shadow-lg" : "border-gray-200"}`}>
                  <h4 className="text-lg font-bold text-center mb-2">{plan.name}</h4>
                  <p className="text-3xl font-bold text-center mb-4">{plan.price}</p>
                  <div className="text-center text-gray-600 mb-6">
                    <p className="text-sm">{plan.duration}</p>
                    <p className="text-sm">{plan.access}</p>
                    <p className="text-sm">{plan.tests}</p>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full py-2 px-4 rounded-md flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                      index === 1 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span>Select Plan</span>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              Need help choosing a plan? <a href="#" className="text-blue-600 hover:underline">Contact our sales team</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeDetail;