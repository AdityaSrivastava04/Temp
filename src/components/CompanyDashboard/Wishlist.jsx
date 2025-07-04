import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Search, Filter, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("table");
  const colleges = [
    {
      id: 1,
      name: "Indian Institute of Technology Bombay",
      location: "Mumbai, Maharashtra",
      type: "IIT",
      established: "1958",
      students: "10,000+",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/IIT_Bombay_Logo.svg/1200px-IIT_Bombay_Logo.svg.png",
      wishlistedStudents: [
        {
          id: 101,
          name: "Rahul Sharma",
          email: "rahul.sharma@example.com",
          wishlistedDate: "2023-05-15",
          course: "B.Tech Computer Science",
          score: "98.5%",
          contact: "+91 9876543210"
        },
        // ... other students
      ]
    },
    // ... other colleges
  ];

  const [selectedColleges, setSelectedColleges] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectAllStudents, setSelectAllStudents] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [collegesPerPage, setCollegesPerPage] = useState(10);
  const [expandedCollege, setExpandedCollege] = useState(null);
  const [showStudentDetails, setShowStudentDetails] = useState(null);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedTypeFilters, setSelectedTypeFilters] = useState([]);
  const filterRef = useRef(null);

  const collegeTypes = [
    "IIT", "NIT", "IIIT", "Central University", "State University", 
    "Deemed University", "Private University", "Private College", "Autonomous College"
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectAll = () => {
    setSelectedColleges(selectAll ? [] : colleges.map(college => college.id));
    setSelectAll(!selectAll);
  };

  const handleSelectAllStudents = (collegeId) => {
    const college = colleges.find(c => c.id === collegeId);
    if (!college) return;

    if (selectAllStudents) {
      setSelectedStudents(selectedStudents.filter(id => 
        !college.wishlistedStudents.some(student => student.id === id)
      ));
    } else {
      const newSelectedStudents = [
        ...selectedStudents,
        ...college.wishlistedStudents.map(student => student.id)
      ];
      setSelectedStudents([...new Set(newSelectedStudents)]);
    }
    setSelectAllStudents(!selectAllStudents);
  };

  const handleSelect = (id) => {
    setSelectedColleges(selectedColleges.includes(id) 
      ? selectedColleges.filter(cid => cid !== id) 
      : [...selectedColleges, id]
    );
  };

  const handleSelectStudent = (id) => {
    setSelectedStudents(selectedStudents.includes(id)
      ? selectedStudents.filter(sid => sid !== id)
      : [...selectedStudents, id]
    );
  };

  const toggleCollegeExpand = (collegeId) => {
    setExpandedCollege(expandedCollege === collegeId ? null : collegeId);
  };

  const toggleTypeFilter = (type) => {
    setSelectedTypeFilters(selectedTypeFilters.includes(type)
      ? selectedTypeFilters.filter(t => t !== type)
      : [...selectedTypeFilters, type]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedTypeFilters([]);
  };

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTypeFilter = selectedTypeFilters.length === 0 || 
      selectedTypeFilters.includes(college.type);
    return matchesSearch && matchesTypeFilter;
  });

  const filteredStudents = (students) => {
    if (!students) return [];
    return students.filter(student => {
      return student.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(studentSearchTerm.toLowerCase());
    });
  };

  const indexOfLastCollege = currentPage * collegesPerPage;
  const indexOfFirstCollege = indexOfLastCollege - collegesPerPage;
  const currentColleges = filteredColleges.slice(indexOfFirstCollege, indexOfLastCollege);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredColleges.length / collegesPerPage);

  const typeOrder = [
    "IIT", "NIT", "IIIT", "Central University", "State University",
    "Deemed University", "Private University", "Private College", "Autonomous College"
  ];

  const typeGroups = typeOrder.reduce((groups, type) => {
    groups[type] = filteredColleges.filter(c => c.type === type);
    return groups;
  }, {});

  const getTypeColor = (type) => {
    const colors = {
      "IIT": "bg-orange-50",
      "NIT": "bg-blue-50",
      "IIIT": "bg-indigo-50",
      "Central University": "bg-red-50",
      "State University": "bg-green-50",
      "Deemed University": "bg-purple-50",
      "Private University": "bg-yellow-50",
      "Private College": "bg-pink-50",
      "Autonomous College": "bg-teal-50"
    };
    return colors[type] || "bg-gray-50";
  };

  const getTypeTextColor = (type) => {
    const colors = {
      "IIT": "text-orange-600",
      "NIT": "text-blue-600",
      "IIIT": "text-indigo-600",
      "Central University": "text-red-600",
      "State University": "text-green-600",
      "Deemed University": "text-purple-600",
      "Private University": "text-yellow-600",
      "Private College": "text-pink-600",
      "Autonomous College": "text-teal-600"
    };
    return colors[type] || "text-gray-600";
  };

  const CollegeCard = ({ college }) => (
    <div 
      className="bg-white p-2 rounded-md shadow-sm border border-gray-200 mb-2 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => toggleCollegeExpand(college.id)}
    >
      <div className="flex items-center mb-1">
        <div className="w-7 h-7 flex-shrink-0">
          <img
            src={college.image || "https://via.placeholder.com/28"}
            alt={college.name}
            className="w-full h-full rounded-full border object-cover"
          />
        </div>
        <div className="ml-2 min-w-0">
          <h3 className="text-xs font-medium text-gray-900 truncate">
            {college.name}
          </h3>
          <p className="text-[0.65rem] text-gray-500 truncate">
            {college.location}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center text-[0.65rem]">
        <span className={`px-1.5 py-0.5 rounded-full ${getTypeTextColor(college.type)} ${getTypeColor(college.type)}`}>
          {college.type}
        </span>
        <span className="text-gray-500">Est. {college.established}</span>
      </div>
      <div className="mt-1 flex justify-between items-center">
        <span className="text-[0.65rem] text-gray-500">
          {college.wishlistedStudents?.length || 0} wishlisted
        </span>
      </div>
    </div>
  );

  const StudentRow = ({ student }) => (
    <tr className="border-t hover:bg-gray-50 cursor-pointer">
      <td className="p-2">
        <input
          type="checkbox"
          className="form-checkbox text-blue-500 cursor-pointer h-4 w-4"
          checked={selectedStudents.includes(student.id)}
          onChange={() => handleSelectStudent(student.id)}
        />
      </td>
      <td className="p-2" onClick={() => setShowStudentDetails(student)}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 cursor-pointer">
            {student.name.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-gray-900 cursor-pointer">{student.name}</div>
            <div className="text-xs text-gray-500 cursor-pointer">{student.email}</div>
          </div>
        </div>
      </td>
      <td className="p-2 text-gray-600 text-sm cursor-pointer" onClick={() => setShowStudentDetails(student)}>
        {student.course}
      </td>
      <td className="p-2 text-gray-600 text-sm cursor-pointer" onClick={() => setShowStudentDetails(student)}>
        {student.score}
      </td>
      <td className="p-2 text-gray-600 text-sm cursor-pointer" onClick={() => setShowStudentDetails(student)}>
        {student.wishlistedDate}
      </td>
      <td className="p-2 text-gray-600 text-sm cursor-pointer" onClick={() => setShowStudentDetails(student)}>
        {student.contact}
      </td>
      <td className="p-2">
        <button
          className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 cursor-pointer"
          onClick={() => setShowStudentDetails(student)}
        >
          <User className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all w-full">
          <Header />
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center p-2 md:p-3">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-0 cursor-default">
                Wishlisted Colleges: <span className="font-bold">{filteredColleges.length}</span>
              </h2>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <div className="relative w-full md:w-40">
                  <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search colleges"
                    className="w-full pl-7 pr-2 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                <div className="relative" ref={filterRef}>
                  <button
                    className={`flex items-center gap-1 px-2 py-1.5 border rounded-md ${
                      selectedTypeFilters.length > 0
                        ? "bg-blue-50 text-blue-600 border-blue-300"
                        : "hover:bg-gray-100"
                    } text-xs cursor-pointer`}
                    onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                  >
                    <Filter className="h-3.5 w-3.5" />
                    Filter
                    {selectedTypeFilters.length > 0 && (
                      <span className="ml-1 bg-blue-100 text-blue-600 px-1.5 rounded-full text-[0.65rem] cursor-pointer">
                        {selectedTypeFilters.length}
                      </span>
                    )}
                  </button>

                  {filterMenuOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
                      <div className="px-3 py-2 border-b border-gray-100">
                        <h3 className="text-xs font-medium text-gray-700 cursor-default">
                          Filter by College Type
                        </h3>
                      </div>

                      <div className="py-1">
                        {collegeTypes.map((type) => (
                          <div
                            key={type}
                            className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer flex items-center"
                            onClick={() => toggleTypeFilter(type)}
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox h-3 w-3 text-blue-500 cursor-pointer"
                              checked={selectedTypeFilters.includes(type)}
                              onChange={() => {}}
                            />
                            <span className={`ml-2 text-xs ${selectedTypeFilters.includes(type) ? "font-medium" : ""}`}>
                              {type}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="px-3 py-2 border-t border-gray-100 flex justify-between">
                        <button
                          className="text-xs text-blue-500 hover:text-blue-700 cursor-pointer"
                          onClick={clearFilters}
                        >
                          Clear filters
                        </button>
                        <button
                          className="text-xs text-gray-700 hover:text-gray-900 cursor-pointer"
                          onClick={() => setFilterMenuOpen(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="hidden md:block border-l h-5 mx-1 cursor-default"></div>

                <div className="flex bg-blue-100 p-0.5 rounded-md cursor-pointer">
                  <button
                    className={`w-28 h-7 px-2 py-0.5 rounded-sm text-blue-600 text-xs cursor-pointer ${
                      view === "status" ? "bg-white shadow-sm" : "hover:bg-blue-200"
                    }`}
                    onClick={() => setView("status")}
                  >
                    Pipeline
                  </button>
                  <button
                    className={`w-28 h-7 px-2 py-0.5 rounded-sm text-blue-600 text-xs cursor-pointer ${
                      view === "table" ? "bg-white shadow-sm" : "hover:bg-blue-200"
                    }`}
                    onClick={() => setView("table")}
                  >
                    Table
                  </button>
                </div>
              </div>
            </div>

            {selectedTypeFilters.length > 0 && (
              <div className="px-3 py-2 flex flex-wrap gap-2 items-center">
                <span className="text-xs text-gray-500 cursor-default">Applied filters:</span>
                {selectedTypeFilters.map((type) => (
                  <div
                    key={type}
                    className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 cursor-pointer ${getTypeTextColor(type)} ${getTypeColor(type)}`}
                  >
                    {type}
                    <button
                      className="ml-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                      onClick={() => toggleTypeFilter(type)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  className="text-xs text-blue-500 hover:underline ml-2 cursor-pointer"
                  onClick={clearFilters}
                >
                  Clear all
                </button>
              </div>
            )}

            {view === "table" && (
              <div className="overflow-x-auto px-3 md:px-4">
                <table className="min-w-full border-collapse border border-gray-200 rounded-md overflow-hidden text-sm">
                  <thead className="bg-white text-gray-600 uppercase border-b border-gray-200">
                    <tr>
                      <th className="p-2 text-left">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-500 border-gray-300 rounded cursor-pointer h-4 w-4"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                      {["College", "Location", "Type", "Established", "Wishlisted Students"].map((header) => (
                        <th
                          key={header}
                          className="p-2 text-left font-medium cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-1">
                            <span>{header}</span>
                            <span className="text-xs opacity-50 cursor-pointer">▲▼</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {currentColleges.length > 0 ? (
                      currentColleges.map((college) => (
                        <React.Fragment key={college.id}>
                          <tr
                            className="border-t hover:bg-gray-50 cursor-pointer"
                            onClick={() => toggleCollegeExpand(college.id)}
                          >
                            <td className="p-2" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                className="form-checkbox text-blue-500 cursor-pointer h-4 w-4"
                                checked={selectedColleges.includes(college.id)}
                                onChange={() => handleSelect(college.id)}
                              />
                            </td>
                            <td className="p-2">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={college.image || "https://via.placeholder.com/24"}
                                  alt={college.name}
                                  className="w-6 h-6 rounded-full border object-cover cursor-pointer"
                                />
                                <span className="font-medium text-gray-900 cursor-pointer">
                                  {college.name}
                                </span>
                              </div>
                            </td>
                            <td className="p-2 text-gray-600 cursor-pointer">
                              {college.location}
                            </td>
                            <td className="p-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer 
                                ${getTypeTextColor(college.type)} 
                                ${getTypeColor(college.type)}`}
                              >
                                {college.type}
                              </span>
                            </td>
                            <td className="p-2 text-gray-600 cursor-pointer">
                              {college.established}
                            </td>
                            <td className="p-2 text-gray-600 cursor-pointer">
                              {college.wishlistedStudents?.length || 0} students
                            </td>
                          </tr>
                          
                          {expandedCollege === college.id && (
                            <tr className="bg-gray-50">
                              <td colSpan="6" className="p-3">
                                <div className="bg-white rounded-md shadow-sm border border-gray-200">
                                  <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                                    <h3 className="font-medium text-gray-800 cursor-default">
                                      Wishlisted Students from {college.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                      <div className="relative w-40">
                                        <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-gray-400" />
                                        <input
                                          type="text"
                                          placeholder="Search students..."
                                          className="w-full pl-7 pr-2 py-1 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-text"
                                          value={studentSearchTerm}
                                          onChange={(e) => setStudentSearchTerm(e.target.value)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="overflow-x-auto">
                                    <table className="min-w-full border-collapse text-sm">
                                      <thead className="bg-gray-50 text-gray-600 uppercase border-b border-gray-200">
                                        <tr>
                                          <th className="p-2 text-left">
                                            <input
                                              type="checkbox"
                                              className="form-checkbox text-blue-500 border-gray-300 rounded cursor-pointer h-4 w-4"
                                              checked={selectAllStudents}
                                              onChange={() => handleSelectAllStudents(college.id)}
                                            />
                                          </th>
                                          {["Student", "Course", "Score", "Wishlisted On", "Contact", "Profile"].map((header) => (
                                            <th
                                              key={header}
                                              className="p-2 text-left font-medium cursor-pointer hover:bg-gray-50"
                                            >
                                              {header}
                                            </th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {filteredStudents(college.wishlistedStudents).length > 0 ? (
                                          filteredStudents(college.wishlistedStudents).map((student) => (
                                            <StudentRow key={student.id} student={student} />
                                          ))
                                        ) : (
                                          <tr>
                                            <td colSpan="6" className="p-3 text-center text-gray-500 text-sm cursor-default">
                                              No matching students found
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="p-3 text-center text-gray-500 text-sm cursor-default">
                          No matching colleges found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {view === "status" && (
              <div className="p-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {typeOrder.map((type) => (
                    <div key={type} className="bg-white rounded-md shadow-sm cursor-default">
                      <div className={`p-1.5 rounded-t-md ${getTypeColor(type)}`}>
                        <div className="flex justify-between items-center">
                          <h3 className={`text-xs font-medium ${getTypeTextColor(type)} cursor-default`}>
                            {type}
                          </h3>
                          <span className="bg-white px-1 py-0.5 rounded-full text-[0.65rem] font-medium text-gray-700 cursor-default">
                            {typeGroups[type]?.length || 0}
                          </span>
                        </div>
                      </div>
                      <div className="p-1.5 max-h-[calc(100vh-250px)] overflow-y-auto">
                        {typeGroups[type]?.length > 0 ? (
                          typeGroups[type].map((college) => (
                            <CollegeCard key={college.id} college={college} />
                          ))
                        ) : (
                          <div className="text-center py-3 text-gray-500 text-[0.65rem] cursor-default">
                            No colleges in this category
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredColleges.length > collegesPerPage && (
              <div className="flex justify-between items-center px-4 py-3 border-t border-gray-200">
                <div className="text-xs text-gray-500 cursor-default">
                  Showing {indexOfFirstCollege + 1} to{" "}
                  {Math.min(indexOfLastCollege, filteredColleges.length)} of{" "}
                  {filteredColleges.length} colleges
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`p-1 rounded-md ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100 cursor-pointer"
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-7 h-7 text-xs rounded-md ${
                          currentPage === number
                            ? "bg-blue-500 text-white cursor-pointer"
                            : "text-gray-700 hover:bg-gray-100 cursor-pointer"
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-1 rounded-md ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100 cursor-pointer"
                    }`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showStudentDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-default">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 cursor-default">Student Details</h3>
              <button
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowStudentDetails(null)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-medium text-gray-600 cursor-default">
                  {showStudentDetails.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-semibold cursor-default">{showStudentDetails.name}</h4>
                  <p className="text-gray-600 cursor-default">{showStudentDetails.email}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 cursor-default">Course:</span>
                  <span className="font-medium cursor-default">{showStudentDetails.course}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 cursor-default">Score:</span>
                  <span className="font-medium cursor-default">{showStudentDetails.score}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 cursor-default">Wishlisted On:</span>
                  <span className="font-medium cursor-default">{showStudentDetails.wishlistedDate}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 cursor-default">Contact:</span>
                  <span className="font-medium cursor-default">{showStudentDetails.contact}</span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setShowStudentDetails(null)}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 cursor-pointer"
                  onClick={() => alert(`Contacting ${showStudentDetails.name} at ${showStudentDetails.contact}`)}
                >
                  Contact Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;