import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Search, Filter, ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("table");
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Jake Gyll",
      email: "jake.gyll@example.com",
      mobile: "+1 1234567890",
      gpa: 3.8,
      status: "Not Hired",
      graduationDate: "May 2023",
      course: "BTech",
      major: "Computer Science",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      previousApplications: ["Google", "Microsoft"],
    },
    {
      id: 2,
      name: "Guy Hawkins",
      email: "guy.hawkins@example.com",
      mobile: "+1 2345678901",
      gpa: 3.5,
      status: "Not Hired",
      graduationDate: "June 2023",
      course: "BTech",
      major: "Software Engineering",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      previousApplications: ["Amazon", "Facebook"],
    },
    {
      id: 3,
      name: "Cyndy Lillibridge",
      email: "cyndy.lillibridge@example.com",
      mobile: "+1 3456789012",
      gpa: 4.0,
      status: "Not Hired",
      graduationDate: "December 2022",
      course: "MSc",
      major: "Data Science",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      previousApplications: ["IBM", "Oracle"],
    },
    {
      id: 4,
      name: "Rodolfo Goode",
      email: "rodolfo.goode@example.com",
      mobile: "+1 4567890123",
      gpa: 3.2,
      status: "Not Hired",
      graduationDate: "May 2023",
      course: "BTech",
      major: "Computer Engineering",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      previousApplications: ["Apple", "Intel"],
    },
    {
      id: 5,
      name: "Leif Floyd",
      email: "leif.floyd@example.com",
      mobile: "+1 5678901234",
      gpa: 3.9,
      status: "Hired",
      graduationDate: "December 2022",
      course: "BFA",
      major: "Graphic Design",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      previousApplications: ["Adobe", "Canva"],
    },
    {
      id: 6,
      name: "Jenny Wilson",
      email: "jenny.wilson@example.com",
      mobile: "+1 6789012345",
      gpa: 3.7,
      status: "Hired",
      graduationDate: "May 2023",
      course: "BDes",
      major: "UI/UX Design",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      previousApplications: ["Spotify", "Netflix"],
    },
    {
      id: 7,
      name: "Jerome Bell",
      email: "jerome.bell@example.com",
      mobile: "+1 7890123456",
      gpa: 3.5,
      status: "Not Hired",
      graduationDate: "June 2023",
      course: "BFA",
      major: "Visual Design",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      previousApplications: ["Twitter", "Slack"],
    },
    {
      id: 8,
      name: "Eleanor Pena",
      email: "eleanor.pena@example.com",
      mobile: "+1 8901234567",
      gpa: 3.3,
      status: "Not Hired",
      graduationDate: "December 2022",
      course: "BBA",
      major: "Information Systems",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      previousApplications: ["Salesforce", "Airbnb"],
    },
    {
      id: 9,
      name: "Darrell Steward",
      email: "darrell.steward@example.com",
      mobile: "+1 9012345678",
      gpa: 3.6,
      status: "Not Hired",
      graduationDate: "May 2023",
      course: "BTech",
      major: "Web Development",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      previousApplications: ["Dropbox", "Uber"],
    },
    {
      id: 10,
      name: "Floyd Miles",
      email: "floyd.miles@example.com",
      mobile: "+1 0123456789",
      gpa: 3.4,
      status: "Not Hired",
      graduationDate: "June 2023",
      course: "BTech",
      major: "Computer Graphics",
      image: "https://randomuser.me/api/portraits/men/10.jpg",
      previousApplications: ["EA", "Epic Games"],
    },
  ]);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(10);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [xmlFile, setXmlFile] = useState(null);
  const [manualStudent, setManualStudent] = useState({
    name: "",
    email: "",
    mobile: "",
    gpa: "",
    status: "Not Hired",
    graduationDate: "",
    course: "BTech",
    major: "",
    previousApplications: "",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  });
  const [addMethod, setAddMethod] = useState("manual");

  const fileInputRef = useRef(null);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((student) => student.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelect = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((sid) => sid !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const statusGroups = {
    Hired: filteredStudents.filter((s) => s.status === "Hired"),
    "Not Hired": filteredStudents.filter((s) => s.status === "Not Hired"),
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Hired":
        return "bg-green-50";
      case "Not Hired":
        return "bg-gray-50";
      default:
        return "bg-gray-50";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "Hired":
        return "text-green-600";
      case "Not Hired":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const getGpaColor = (gpa) => {
    if (gpa >= 3.7) return "text-green-500";
    if (gpa >= 3.3) return "text-blue-500";
    return "text-yellow-500";
  };

  const getCourseColor = (course) => {
    switch (course) {
      case "BTech":
        return "text-blue-600";
      case "BBA":
        return "text-purple-600";
      case "MSc":
        return "text-green-600";
      case "BFA":
        return "text-orange-600";
      case "BDes":
        return "text-pink-600";
      default:
        return "text-gray-600";
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/xml") {
      setXmlFile(file);
    } else {
      alert("Please select an XML file");
    }
  };

  const handleManualInputChange = (e) => {
    const { name, value } = e.target;
    setManualStudent({
      ...manualStudent,
      [name]: value,
    });
  };

  const handleAddStudent = () => {
    if (addMethod === "xml") {
      if (xmlFile) {
        const newStudent = {
          id: students.length + 1,
          name: `Student from XML ${students.length + 1}`,
          email: `student${students.length + 1}@example.com`,
          mobile: `+1 ${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          gpa: (Math.random() * 1.5 + 2.5).toFixed(1),
          status: "Not Hired",
          graduationDate: "May 2023",
          course: "BTech",
          major: "Computer Science",
          image: "https://randomuser.me/api/portraits/men/" + (students.length + 1) + ".jpg",
          previousApplications: ["Company A", "Company B"],
        };
        setStudents([...students, newStudent]);
        setShowAddStudentModal(false);
        setXmlFile(null);
      } else {
        alert("Please select an XML file");
      }
    } else {
      if (!manualStudent.name || !manualStudent.email || !manualStudent.mobile || !manualStudent.gpa || !manualStudent.graduationDate || !manualStudent.major) {
        alert("Please fill all required fields");
        return;
      }

      const newStudent = {
        id: students.length + 1,
        name: manualStudent.name,
        email: manualStudent.email,
        mobile: manualStudent.mobile,
        gpa: parseFloat(manualStudent.gpa),
        status: manualStudent.status,
        graduationDate: manualStudent.graduationDate,
        course: manualStudent.course,
        major: manualStudent.major,
        previousApplications: manualStudent.previousApplications.split(",").map(app => app.trim()),
        image: manualStudent.image,
      };

      setStudents([...students, newStudent]);
      setShowAddStudentModal(false);
      setManualStudent({
        name: "",
        email: "",
        mobile: "",
        gpa: "",
        status: "Not Hired",
        graduationDate: "",
        course: "BTech",
        major: "",
        previousApplications: "",
        image: "https://randomuser.me/api/portraits/men/11.jpg",
      });
    }
  };

  const StudentCard = ({ student }) => (
    <div
      className="bg-white p-2 rounded-md shadow-sm border border-gray-200 mb-2 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate("/student-detail")}
    >
      <div className="flex items-center mb-1">
        <div className="w-7 h-7 flex-shrink-0">
          <img
            src={student.image}
            alt={student.name}
            className="w-full h-full rounded-full border object-cover cursor-pointer"
          />
        </div>
        <div className="ml-2 min-w-0">
          <h3 className="text-xs font-medium text-gray-900 truncate cursor-pointer">
            {student.name}
          </h3>
          <p className="text-[0.65rem] text-gray-500 truncate cursor-pointer">
            <span className={`${getCourseColor(student.course)} font-medium cursor-pointer`}>
              {student.course}
            </span>{" "}
            - {student.major}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center text-[0.65rem] cursor-pointer">
        <div className={`flex items-center ${getGpaColor(student.gpa)} cursor-pointer`}>
          <span>GPA: {student.gpa}</span>
        </div>
        <span className="text-gray-500 cursor-pointer">{student.graduationDate}</span>
      </div>
      <div className="mt-1 text-[0.65rem] text-gray-600 cursor-pointer">
        <p className="truncate">
          Applied: {student.previousApplications.join(", ")}
        </p>
      </div>
      <div className="mt-1">
        <button
          className="w-full px-1 py-0.5 text-[0.65rem] border border-blue-500 bg-[#E9EBFD] text-blue-500 rounded hover:bg-blue-100 transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/student-detail");
          }}
        >
          View Profile
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen cursor-default">
      <div className="flex flex-row flex-grow cursor-default">
        <div className="h-screen sticky top-0 cursor-default">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all w-full cursor-default">
          <Header />
          <div className="container mx-auto cursor-default">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center p-2 md:p-3 cursor-default">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-0 cursor-default">
                Students:{" "}
                <span className="font-bold cursor-default">{filteredStudents.length}</span>
              </h2>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 cursor-default">
                <div className="relative w-full md:w-40 cursor-default">
                  <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-gray-400 cursor-default" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-7 pr-2 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                <button 
                  className="flex items-center gap-1 px-2 py-1.5 border rounded-md hover:bg-gray-100 text-xs cursor-pointer"
                  onClick={() => setShowAddStudentModal(true)}
                >
                  <Plus className="h-3.5 w-3.5 cursor-pointer" /> Add Student
                </button>

                <button className="flex items-center gap-1 px-2 py-1.5 border rounded-md hover:bg-gray-100 text-xs cursor-pointer">
                  <Filter className="h-3.5 w-3.5 cursor-pointer" /> Filter
                </button>

                <div className="hidden md:block border-l h-5 mx-1 cursor-default"></div>

                <div className="flex bg-blue-100 p-0.5 rounded-md cursor-default">
                  <button
                    className={`w-28 h-7 px-2 py-0.5 rounded-sm text-blue-600 text-xs cursor-pointer ${
                      view === "pipeline"
                        ? "bg-white shadow-sm"
                        : "hover:bg-blue-200"
                    }`}
                    onClick={() => setView("pipeline")}
                  >
                    Status View
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

{showAddStudentModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 cursor-default">
    <div className="bg-white rounded-md shadow-lg w-full max-w-lg cursor-default" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <div className="flex justify-between items-center border-b p-3 cursor-default">
        <h3 className="text-lg font-medium cursor-default">Add New Student</h3>
        <button 
          onClick={() => setShowAddStudentModal(false)}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <X className="h-5 w-5 cursor-pointer" />
        </button>
      </div>
      <div className="p-4 cursor-default">
        <div className="flex mb-4 border-b cursor-default">
          <button
            className={`px-4 py-2 text-sm font-medium cursor-pointer ${
              addMethod === 'manual' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500'
            }`}
            onClick={() => setAddMethod('manual')}
          >
            Manual Entry
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium cursor-pointer ${
              addMethod === 'xml' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500'
            }`}
            onClick={() => setAddMethod('xml')}
          >
            Import XML
          </button>
        </div>

        {addMethod === 'xml' ? (
          <div className="space-y-4 cursor-default">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xml"
                className="hidden"
              />
              <button
                className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-100 cursor-pointer"
              >
                Select XML File
              </button>
              <p className="mt-2 text-xs text-gray-500 cursor-default">
                {xmlFile ? xmlFile.name : "No file selected"}
              </p>
            </div>
            <p className="text-xs text-gray-500 cursor-default">
              Upload an XML file containing student data in the required format.
            </p>
          </div>
        ) : (
          <div className="space-y-3 cursor-default">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 cursor-default">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={manualStudent.name}
                  onChange={handleManualInputChange}
                  className="w-full px-2 py-1.5 border rounded-md text-xs cursor-text"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 cursor-default">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={manualStudent.email}
                  onChange={handleManualInputChange}
                  className="w-full px-2 py-1.5 border rounded-md text-xs cursor-text"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 cursor-default">
                  Mobile Number*
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={manualStudent.mobile}
                  onChange={handleManualInputChange}
                  className="w-full px-2 py-1.5 border rounded-md text-xs cursor-text"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 cursor-default">
                  GPA*
                </label>
                <input
                  type="number"
                  name="gpa"
                  min="0"
                  max="4"
                  step="0.1"
                  value={manualStudent.gpa}
                  onChange={handleManualInputChange}
                  className="w-full px-2 py-1.5 border rounded-md text-xs cursor-text"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 cursor-default">
                  Status
                </label>
                <select
                  name="status"
                  value={manualStudent.status}
                  onChange={handleManualInputChange}
                  className="w-full px-2 py-1.5 border rounded-md text-xs cursor-pointer"
                >
                  <option value="Not Hired">Not Hired</option>
                  <option value="Hired">Hired</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 cursor-default">
                  Course
                </label>
                <select
                  name="course"
                  value={manualStudent.course}
                  onChange={handleManualInputChange}
                  className="w-full px-2 py-1.5 border rounded-md text-xs cursor-pointer"
                >
                  <option value="BTech">BTech</option>
                  <option value="BBA">BBA</option>
                  <option value="MSc">MSc</option>
                  <option value="BFA">BFA</option>
                  <option value="BDes">BDes</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 cursor-default">
                  Graduation Date*
                </label>
                <input
                  type="text"
                  name="graduationDate"
                  value={manualStudent.graduationDate}
                  onChange={handleManualInputChange}
                  placeholder="Month YYYY"
                  className="w-full px-2 py-1.5 border rounded-md text-xs cursor-text"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 cursor-default">
                  Major*
                </label>
                <input
                  type="text"
                  name="major"
                  value={manualStudent.major}
                  onChange={handleManualInputChange}
                  className="w-full px-2 py-1.5 border rounded-md text-xs cursor-text"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 cursor-default">
                Previous Applications
              </label>
              <input
                type="text"
                name="previousApplications"
                value={manualStudent.previousApplications}
                onChange={handleManualInputChange}
                placeholder="Comma separated list"
                className="w-full px-2 py-1.5 border rounded-md text-xs cursor-text"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end space-x-2 p-4 border-t cursor-default">
        <button
          onClick={() => setShowAddStudentModal(false)}
          className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-100 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleAddStudent}
          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
        >
          {addMethod === 'xml' ? 'Import Students' : 'Add Student'}
        </button>
      </div>
    </div>
  </div>
)}

            {view === "table" && (
              <div className="overflow-x-auto px-3 md:px-4 cursor-default">
                <table className="min-w-full border-collapse border border-gray-200 rounded-md overflow-hidden text-sm cursor-default">
                  <thead className="bg-white text-gray-600 uppercase border-b border-gray-200 cursor-default">
                    <tr>
                      <th className="p-2 text-left cursor-default">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-500 border-gray-300 rounded cursor-pointer h-4 w-4"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                      {[
                        "Name",
                        "GPA",
                        "Status",
                        "Graduation",
                        "Course",
                        "Major",
                        "Previous Applications",
                        "Action",
                      ].map((header) => (
                        <th
                          key={header}
                          className="p-2 text-left font-medium cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-1 cursor-pointer">
                            <span className="cursor-pointer">{header}</span>
                            <span className="text-xs opacity-50 cursor-pointer">▲▼</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="cursor-default">
                    {currentStudents.length > 0 ? (
                      currentStudents.map((student) => (
                        <tr
                          key={student.id}
                          className="border-t hover:bg-gray-50 cursor-pointer"
                          onClick={() => navigate("/student-detail")}
                        >
                          <td
                            className="p-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-500 cursor-pointer h-4 w-4"
                              checked={selectedStudents.includes(student.id)}
                              onChange={() => handleSelect(student.id)}
                            />
                          </td>
                          <td className="p-2">
                            <div className="flex items-center space-x-2 cursor-pointer">
                              <img
                                src={student.image}
                                alt={student.name}
                                className="w-6 h-6 rounded-full border object-cover cursor-pointer"
                              />
                              <span className="font-medium text-gray-900 cursor-pointer">
                                {student.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-2">
                            <div
                              className={`flex items-center ${getGpaColor(
                                student.gpa
                              )} cursor-pointer`}
                            >
                              <span className="cursor-pointer">{student.gpa}</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer
                                ${getStatusTextColor(student.status)} 
                                ${getStatusColor(student.status)}`}
                            >
                              {student.status}
                            </span>
                          </td>
                          <td className="p-2 text-gray-600 cursor-pointer">
                            {student.graduationDate}
                          </td>
                          <td className="p-2">
                            <span
                              className={`font-medium ${getCourseColor(
                                student.course
                              )} cursor-pointer`}
                            >
                              {student.course}
                            </span>
                          </td>
                          <td className="p-2 text-gray-600 cursor-pointer">{student.major}</td>
                          <td className="p-2 text-gray-600 cursor-pointer">
                            {student.previousApplications.join(", ")}
                          </td>
                          <td className="p-2">
                            <button
                              className="px-2 py-1 text-xs border border-blue-500 bg-[#E9EBFD] text-blue-500 rounded cursor-pointer hover:bg-blue-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/student-detail");
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
                          colSpan="8"
                          className="p-3 text-center text-gray-500 text-sm cursor-default"
                        >
                          No matching students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {view === "pipeline" && (
              <div className="p-2 cursor-default">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 cursor-default">
                  {Object.keys(statusGroups).map((status) => (
                    <div key={status} className="bg-white rounded-md shadow-sm cursor-default">
                      <div
                        className={`p-1.5 rounded-t-md ${getStatusColor(
                          status
                        )} cursor-default`}
                      >
                        <div className="flex justify-between items-center cursor-default">
                          <h3
                            className={`text-xs font-medium ${getStatusTextColor(
                              status
                            )} cursor-default`}
                          >
                            {status}
                          </h3>
                          <span className="bg-white px-1 py-0.5 rounded-full text-[0.65rem] font-medium text-gray-700 cursor-default">
                            {statusGroups[status].length}
                          </span>
                        </div>
                      </div>
                      <div className="p-1.5 max-h-[calc(100vh-250px)] overflow-y-auto cursor-default">
                        {statusGroups[status].length > 0 ? (
                          statusGroups[status].map((student) => (
                            <StudentCard key={student.id} student={student} />
                          ))
                        ) : (
                          <div className="text-center py-3 text-gray-500 text-[0.65rem] cursor-default">
                            No students
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {view === "table" && (
              <div className="flex flex-col md:flex-row justify-between items-center p-2 md:p-3 text-xs cursor-default">
                <div className="flex items-center space-x-1.5 mb-2 md:mb-0 cursor-default">
                  <span className="cursor-default">Show</span>
                  <select
                    value={studentsPerPage}
                    onChange={(e) => {
                      setStudentsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border rounded px-1 py-0.5 cursor-pointer"
                  >
                    <option value={10} className="cursor-pointer">10</option>
                    <option value={20} className="cursor-pointer">20</option>
                    <option value={50} className="cursor-pointer">50</option>
                  </select>
                  <span className="cursor-default">per page</span>
                </div>
                <div className="flex items-center space-x-1 cursor-default">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`p-1 border rounded cursor-pointer ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <ChevronLeft size={12} className="cursor-pointer" />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`px-2 py-0.5 border rounded cursor-pointer ${
                          currentPage === pageNum
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`p-1 border rounded cursor-pointer ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <ChevronRight size={12} className="cursor-pointer" />
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

export default Students;