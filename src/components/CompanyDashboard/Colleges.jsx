import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Colleges = () => {
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
    },
    {
      id: 2,
      name: "University of Delhi",
      location: "Delhi",
      type: "Central University",
      established: "1922",
      students: "400,000+",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/44/University_of_Delhi_logo.svg/1200px-University_of_Delhi_logo.svg.png",
    },
    {
      id: 3,
      name: "Banaras Hindu University",
      location: "Varanasi, Uttar Pradesh",
      type: "Central University",
      established: "1916",
      students: "30,000+",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Banaras_Hindu_University_Logo.png/1200px-Banaras_Hindu_University_Logo.png",
    },
    {
      id: 4,
      name: "Jawaharlal Nehru University",
      location: "New Delhi",
      type: "Central University",
      established: "1969",
      students: "8,000+",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Jawaharlal_Nehru_University_Logo.png/1200px-Jawaharlal_Nehru_University_Logo.png",
    },
    {
      id: 5,
      name: "Anna University",
      location: "Chennai, Tamil Nadu",
      type: "State University",
      established: "1978",
      students: "15,000+",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Anna_University_Logo.svg/1200px-Anna_University_Logo.svg.png",
    },
    {
      id: 6,
      name: "National Institute of Technology Trichy",
      location: "Tiruchirappalli, Tamil Nadu",
      type: "NIT",
      established: "1964",
      students: "7,500+",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/National_Institute_of_Technology%2C_Tiruchirappalli_logo.png/1200px-National_Institute_of_Technology%2C_Tiruchirappalli_logo.png",
    },
    {
      id: 7,
      name: "St. Xavier's College",
      location: "Mumbai, Maharashtra",
      type: "Private College",
      established: "1869",
      students: "5,000+",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/St._Xavier%27s_College%2C_Mumbai_Logo.png/1200px-St._Xavier%27s_College%2C_Mumbai_Logo.png",
    },
    {
      id: 8,
      name: "Presidency University",
      location: "Kolkata, West Bengal",
      type: "State University",
      established: "1817",
      students: "4,000+",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Presidency_University%2C_Kolkata_Logo.png/1200px-Presidency_University%2C_Kolkata_Logo.png",
    },
    {
      id: 9,
      name: "Indian Institute of Science",
      location: "Bangalore, Karnataka",
      type: "Deemed University",
      established: "1909",
      students: "4,000+",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Indian_Institute_of_Science_Logo.png/1200px-Indian_Institute_of_Science_Logo.png",
    },
    {
      id: 10,
      name: "Lady Shri Ram College for Women",
      location: "New Delhi",
      type: "Private College",
      established: "1956",
      students: "2,500+",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Lady_Shri_Ram_College_for_Women_logo.png/1200px-Lady_Shri_Ram_College_for_Women_logo.png",
    },
  ];

  const [selectedColleges, setSelectedColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [collegesPerPage, setCollegesPerPage] = useState(10);

  // Filter related states
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedTypeFilters, setSelectedTypeFilters] = useState([]);
  const filterRef = useRef(null);

  // Available college types for filter (Indian education system)
  const collegeTypes = [
    "IIT",
    "NIT",
    "IIIT",
    "Central University",
    "State University",
    "Deemed University",
    "Private University",
    "Private College",
    "Autonomous College"
  ];

  // Close filter menu when clicking outside
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
    if (selectAll) {
      setSelectedColleges([]);
    } else {
      setSelectedColleges(colleges.map((college) => college.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelect = (id) => {
    if (selectedColleges.includes(id)) {
      setSelectedColleges(selectedColleges.filter((cid) => cid !== id));
    } else {
      setSelectedColleges([...selectedColleges, id]);
    }
  };

  const toggleTypeFilter = (type) => {
    if (selectedTypeFilters.includes(type)) {
      setSelectedTypeFilters(selectedTypeFilters.filter((t) => t !== type));
    } else {
      setSelectedTypeFilters([...selectedTypeFilters, type]);
    }
    // Reset to page 1 when changing filters
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedTypeFilters([]);
  };

  // Filter colleges based on search term AND type filters
  const filteredColleges = colleges.filter((college) => {
    const matchesSearch = college.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTypeFilter =
      selectedTypeFilters.length === 0 ||
      selectedTypeFilters.includes(college.type);
    return matchesSearch && matchesTypeFilter;
  });

  const indexOfLastCollege = currentPage * collegesPerPage;
  const indexOfFirstCollege = indexOfLastCollege - collegesPerPage;
  const currentColleges = filteredColleges.slice(
    indexOfFirstCollege,
    indexOfLastCollege
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredColleges.length / collegesPerPage);

  // College types for pipeline view (Indian education system)
  const typeOrder = [
    "IIT",
    "NIT",
    "IIIT",
    "Central University",
    "State University",
    "Deemed University",
    "Private University",
    "Private College",
    "Autonomous College"
  ];

  // Group colleges by type for pipeline view
  const typeGroups = typeOrder.reduce((groups, type) => {
    groups[type] = filteredColleges.filter((c) => c.type === type);
    return groups;
  }, {});

  const getTypeColor = (type) => {
    switch (type) {
      case "IIT":
        return "bg-orange-50";
      case "NIT":
        return "bg-blue-50";
      case "IIIT":
        return "bg-indigo-50";
      case "Central University":
        return "bg-red-50";
      case "State University":
        return "bg-green-50";
      case "Deemed University":
        return "bg-purple-50";
      case "Private University":
        return "bg-yellow-50";
      case "Private College":
        return "bg-pink-50";
      case "Autonomous College":
        return "bg-teal-50";
      default:
        return "bg-gray-50";
    }
  };

  const getTypeTextColor = (type) => {
    switch (type) {
      case "IIT":
        return "text-orange-600";
      case "NIT":
        return "text-blue-600";
      case "IIIT":
        return "text-indigo-600";
      case "Central University":
        return "text-red-600";
      case "State University":
        return "text-green-600";
      case "Deemed University":
        return "text-purple-600";
      case "Private University":
        return "text-yellow-600";
      case "Private College":
        return "text-pink-600";
      case "Autonomous College":
        return "text-teal-600";
      default:
        return "text-gray-600";
    }
  };

  const CollegeCard = ({ college }) => (
    <div
      className="bg-white p-2 rounded-md shadow-sm border border-gray-200 mb-2 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate("/college-detail")}
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
        <span
          className={`px-1.5 py-0.5 rounded-full ${getTypeTextColor(
            college.type
          )} ${getTypeColor(college.type)}`}
        >
          {college.type}
        </span>
        <span className="text-gray-500">Est. {college.established}</span>
      </div>
      <div className="mt-1">
        <button
          className="w-full px-1 py-0.5 text-[0.65rem] border border-blue-500 bg-[#E9EBFD] text-blue-500 rounded hover:bg-blue-100 transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/college-detail");
          }}
        >
          View Profile
        </button>
      </div>
    </div>
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
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-0">
                Colleges:{" "}
                <span className="font-bold">{filteredColleges.length}</span>
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
                      <span className="ml-1 bg-blue-100 text-blue-600 px-1.5 rounded-full text-[0.65rem]">
                        {selectedTypeFilters.length}
                      </span>
                    )}
                  </button>

                  {filterMenuOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
                      <div className="px-3 py-2 border-b border-gray-100">
                        <h3 className="text-xs font-medium text-gray-700">
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
                            <span
                              className={`ml-2 text-xs ${
                                selectedTypeFilters.includes(type)
                                  ? "font-medium"
                                  : ""
                              }`}
                            >
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

                <div className="hidden md:block border-l h-5 mx-1"></div>

                <div className="flex bg-blue-100 p-0.5 rounded-md">
                  <button
                    className={`w-28 h-7 px-2 py-0.5 rounded-sm text-blue-600 text-xs cursor-pointer ${
                      view === "status"
                        ? "bg-white shadow-sm"
                        : "hover:bg-blue-200"
                    }`}
                    onClick={() => setView("status")}
                  >
                    Pipeline
                  </button>
                  <button
                    className={`w-28 h-7 px-2 py-0.5 rounded-sm text-blue-600 text-xs cursor-pointer ${
                      view === "table"
                        ? "bg-white shadow-sm"
                        : "hover:bg-blue-200"
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
                <span className="text-xs text-gray-500">Applied filters:</span>
                {selectedTypeFilters.map((type) => (
                  <div
                    key={type}
                    className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 cursor-pointer ${getTypeTextColor(
                      type
                    )} ${getTypeColor(type)}`}
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
                      {[
                        "Name",
                        "Location",
                        "Type",
                        "Established",
                        "Students",
                        "Action",
                      ].map((header) => (
                        <th
                          key={header}
                          className="p-2 text-left font-medium cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-1">
                            <span>{header}</span>
                            <span className="text-xs opacity-50">▲▼</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {currentColleges.length > 0 ? (
                      currentColleges.map((college) => (
                        <tr
                          key={college.id}
                          className="border-t hover:bg-gray-50 cursor-pointer"
                          onClick={() => navigate("/college-detail")}
                        >
                          <td
                            className="p-2"
                            onClick={(e) => e.stopPropagation()}
                          >
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
                                className="w-6 h-6 rounded-full border object-cover"
                              />
                              <span className="font-medium text-gray-900">
                                {college.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-2 text-gray-600">
                            {college.location}
                          </td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium 
                              ${getTypeTextColor(college.type)} 
                              ${getTypeColor(college.type)}`}
                            >
                              {college.type}
                            </span>
                          </td>
                          <td className="p-2 text-gray-600">
                            {college.established}
                          </td>
                          <td className="p-2 text-gray-600">
                            {college.students}
                          </td>
                          <td className="p-2">
                            <button
                              className="px-2 py-1 text-xs border border-blue-500 bg-[#E9EBFD] text-blue-500 rounded cursor-pointer hover:bg-blue-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/college-detail");
                              }}
                            >
                              View Profile
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="p-3 text-center text-gray-500 text-sm"
                        >
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
                    <div key={type} className="bg-white rounded-md shadow-sm">
                      <div
                        className={`p-1.5 rounded-t-md ${getTypeColor(type)}`}
                      >
                        <div className="flex justify-between items-center">
                          <h3
                            className={`text-xs font-medium ${getTypeTextColor(
                              type
                            )}`}
                          >
                            {type}
                          </h3>
                          <span className="bg-white px-1 py-0.5 rounded-full text-[0.65rem] font-medium text-gray-700">
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
                          <div className="text-center py-3 text-gray-500 text-[0.65rem]">
                            No colleges in this category
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pagination */}
            {filteredColleges.length > collegesPerPage && (
              <div className="flex justify-between items-center px-4 py-3 border-t border-gray-200">
                <div className="text-xs text-gray-500">
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
                        : "text-gray-700 hover:bg-gray-100"
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
                            ? "bg-blue-500 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      paginate(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`p-1 rounded-md ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
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
    </div>
  );
};

export default Colleges;