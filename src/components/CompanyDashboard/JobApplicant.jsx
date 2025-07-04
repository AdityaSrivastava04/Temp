import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Search,
  Filter,
  Star,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Umbrella,
  GraduationCap,
  Users,
  Laptop,
  Bus,
  Heart,
  X,
  Loader,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate, useLocation } from "react-router-dom";

// --- DUMMY DATA SECTION ---

const DUMMY_JOB = {
  company: "Acme Corp",
  position: "Frontend Developer",
  description: "We are looking for a passionate Frontend Developer to join our team.",
  responsibilities: [
    "Develop user-facing features",
    "Optimize applications for speed and scalability",
    "Collaborate with designers and backend engineers"
  ],
  whoYouAre: [
    "Strong in React.js",
    "Excellent communication skills",
    "Team player"
  ],
  niceToHaves: [
    "Experience with TypeScript",
    "Familiarity with CI/CD pipelines"
  ],
  applied: 7,
  capacity: 10,
  deadline: "31 July, 2025",
  postedDate: "1 July, 2025",
  jobType: "Full-time",
  salary: "$90,000 USD",
  categories: ["Software", "Engineering"],
  requiredSkills: ["React", "JavaScript", "CSS", "HTML"]
};

const DUMMY_APPLICANTS = [
  {
    id: "1",
    name: "Alice Johnson",
    score: 4,
    hiringStage: "Shortlisted",
    appliedDate: "2 July, 2025",
    jobRole: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    name: "Bob Smith",
    score: 5,
    hiringStage: "Interview",
    appliedDate: "1 July, 2025",
    jobRole: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: "3",
    name: "Carla Gomez",
    score: 3,
    hiringStage: "Interviewed",
    appliedDate: "29 June, 2025",
    jobRole: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/women/46.jpg",
  },
  {
    id: "4",
    name: "David Lee",
    score: 0,
    hiringStage: "Declined",
    appliedDate: "28 June, 2025",
    jobRole: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
  },
  {
    id: "5",
    name: "Emily Chen",
    score: 5,
    hiringStage: "Hired",
    appliedDate: "25 June, 2025",
    jobRole: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
  },
];

const DUMMY_TRAFFIC_DATA = [
  { name: "Direct", value: 48, color: "#FFBA49" },
  { name: "Social", value: 23, color: "#4DA1FF" },
  { name: "Organic", value: 24, color: "#0066FF" },
  { name: "Other", value: 5, color: "#4ECDC4" },
];

const DUMMY_PERKS = [
  {
    icon: <Stethoscope size={32} className="text-blue-500" />,
    title: "Full Healthcare",
    description: "Happy and healthy team members.",
  },
  {
    icon: <Umbrella size={32} className="text-blue-500" />,
    title: "Unlimited Vacation",
    description: "Flexible schedule for family and fun.",
  },
  {
    icon: <GraduationCap size={32} className="text-blue-500" />,
    title: "Skill Development",
    description: "Always learning and leveling up skills.",
  },
  {
    icon: <Users size={32} className="text-blue-500" />,
    title: "Team Summits",
    description: "Regular team summits for planning.",
  },
  {
    icon: <Laptop size={32} className="text-blue-500" />,
    title: "Remote Working",
    description: "Work from anywhere you choose.",
  },
  {
    icon: <Bus size={32} className="text-blue-500" />,
    title: "Commuter Benefits",
    description: "Benefits for your daily commute.",
  },
  {
    icon: <Heart size={32} className="text-blue-500" />,
    title: "We Give Back",
    description: "Matching donations to causes you care about.",
  },
];

// --- COMPONENT STARTS ---

const JobApplicant = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // UI state
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicantsPerPage] = useState(10);
  const [jobData, setJobData] = useState({});
  const [sampleJobData, setSampleJobData] = useState({});

  // Pie chart hover
  const [hoverSegment, setHoverSegment] = useState(null);

  // Simulate loading dummy data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setJobData({
        company: DUMMY_JOB.company,
        position: DUMMY_JOB.position,
        description: DUMMY_JOB.description,
        responsibilities: DUMMY_JOB.responsibilities,
        whoYouAre: DUMMY_JOB.whoYouAre,
        niceToHaves: DUMMY_JOB.niceToHaves,
      });
      setSampleJobData({
        applied: DUMMY_JOB.applied,
        capacity: DUMMY_JOB.capacity,
        deadline: DUMMY_JOB.deadline,
        postedDate: DUMMY_JOB.postedDate,
        jobType: DUMMY_JOB.jobType,
        salary: DUMMY_JOB.salary,
        categories: DUMMY_JOB.categories,
        requiredSkills: DUMMY_JOB.requiredSkills,
      });
      setCandidates(DUMMY_APPLICANTS);
      setLoading(false);
    }, 650);
  }, []);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(candidates.map((candidate) => candidate.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelect = (id) => {
    if (selectedCandidates.includes(id)) {
      setSelectedCandidates(selectedCandidates.filter((cid) => cid !== id));
    } else {
      setSelectedCandidates([...selectedCandidates, id]);
    }
  };

  // Filtering and pagination
  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = filteredCandidates.slice(
    indexOfFirstApplicant,
    indexOfLastApplicant
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredCandidates.length / applicantsPerPage);

  // Kanban grouping
  const stageOrder = [
    "Shortlisted",
    "Interview",
    "Interviewed",
    "Hired",
    "Declined",
  ];
  const stageGroups = {
    Shortlisted: filteredCandidates.filter(
      (c) => c.hiringStage === "Shortlisted"
    ),
    Interview: filteredCandidates.filter((c) => c.hiringStage === "Interview"),
    Interviewed: filteredCandidates.filter(
      (c) => c.hiringStage === "Interviewed"
    ),
    Hired: filteredCandidates.filter((c) => c.hiringStage === "Hired"),
    Declined: filteredCandidates.filter((c) => c.hiringStage === "Declined"),
  };

  // UI helpers
  const getStageColor = (stage) => {
    switch (stage) {
      case "Shortlisted":
        return "bg-blue-50";
      case "Interview":
        return "bg-yellow-50";
      case "Interviewed":
        return "bg-blue-50";
      case "Hired":
        return "bg-green-50";
      case "Declined":
        return "bg-red-50";
      default:
        return "bg-gray-50";
    }
  };
  const getStageTextColor = (stage) => {
    switch (stage) {
      case "Shortlisted":
        return "text-blue-600";
      case "Interview":
        return "text-yellow-600";
      case "Interviewed":
        return "text-blue-600";
      case "Hired":
        return "text-green-600";
      case "Declined":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };
  const getStarColor = (score) => (score > 0 ? "text-yellow-500" : "text-gray-400");

  // Pie chart
  const total = DUMMY_TRAFFIC_DATA.reduce((sum, item) => sum + item.value, 0);
  const generatePaths = () => {
    let cumulativePercent = 0;
    return DUMMY_TRAFFIC_DATA.map((item, index) => {
      const startPercent = cumulativePercent;
      const endPercent = startPercent + (item.value / total) * 100;
      cumulativePercent = endPercent;

      const startAngle = (startPercent / 100) * 2 * Math.PI - Math.PI / 2;
      const endAngle = (endPercent / 100) * 2 * Math.PI - Math.PI / 2;

      const outerRadius = 70;
      const innerRadius = 50;

      const startOuterX = Math.cos(startAngle) * outerRadius;
      const startOuterY = Math.sin(startAngle) * outerRadius;
      const endOuterX = Math.cos(endAngle) * outerRadius;
      const endOuterY = Math.sin(endAngle) * outerRadius;

      const startInnerX = Math.cos(startAngle) * innerRadius;
      const startInnerY = Math.sin(startAngle) * innerRadius;
      const endInnerX = Math.cos(endAngle) * innerRadius;
      const endInnerY = Math.sin(endAngle) * innerRadius;

      const largeArcFlag = endPercent - startPercent > 50 ? 1 : 0;

      const pathData = [
        `M ${startOuterX} ${startOuterY}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endOuterX} ${endOuterY}`,
        `L ${endInnerX} ${endInnerY}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startInnerX} ${startInnerY}`,
        "Z",
      ].join(" ");

      const isActive = hoverSegment === item.name;
      const segmentScale = isActive ? 1.05 : 1;

      return (
        <path
          key={item.name}
          d={pathData}
          fill={item.color}
          transform={isActive ? `scale(${segmentScale})` : ""}
          onMouseEnter={() => setHoverSegment(item.name)}
          onMouseLeave={() => setHoverSegment(null)}
          style={{
            transition: "transform 0.2s",
            cursor: "pointer",
          }}
        />
      );
    });
  };

  // Candidate card
  const CandidateCard = ({ candidate }) => (
    <div className="bg-white p-3 rounded shadow mb-2 border border-gray-200">
      <div className="flex items-center mb-2">
        <img
          src={candidate.image}
          alt={candidate.name}
          className="w-8 h-8 rounded-full border object-cover"
        />
        <div className="ml-2 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">
            {candidate.name}
          </h3>
          <p className="text-xs text-gray-500 truncate">{candidate.jobRole}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Star
            className={getStarColor(candidate.score)}
            fill={candidate.score > 0 ? "#FACC15" : "none"}
            size={14}
          />
          <span className="ml-1 text-sm text-gray-900">{candidate.score}</span>
        </div>
        <span className="text-xs text-gray-500">{candidate.appliedDate}</span>
      </div>
      <div className="mt-2">
        <button
          className="w-full px-2 py-1 text-xs border border-blue-500 bg-[#E9EBFD] text-blue-500 rounded hover:bg-blue-100 cursor-pointer"
          onClick={() => navigate("/applicant-detail")}
        >
          See Application
        </button>
      </div>
    </div>
  );

  // --- RENDER ---
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all w-full">
          <Header />

          {loading ? (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
              <div className="flex flex-col items-center">
                <Loader className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="mt-2 text-gray-600">Loading job & applicants...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
              <div className="text-center bg-red-50 p-4 rounded-lg max-w-lg">
                <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-600 mt-1">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {/* Job Header */}
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{jobData.position}</h1>
                  <p className="text-gray-600 text-sm">{jobData.company}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5">{sampleJobData.jobType}</span>
                    <span className="text-xs bg-green-100 text-green-700 rounded px-2 py-0.5">{sampleJobData.salary}</span>
                    <span className="text-xs bg-gray-100 text-gray-700 rounded px-2 py-0.5">Deadline: {sampleJobData.deadline}</span>
                  </div>
                </div>
                <div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700">Edit Job</button>
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Job Description</h2>
                <p className="text-gray-700 mb-2">{jobData.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {sampleJobData.requiredSkills?.map((skill, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{skill}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {sampleJobData.categories?.map((cat, idx) => (
                    <span key={idx} className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs">{cat}</span>
                  ))}
                </div>
              </div>

              {/* Perks */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Perks & Benefits</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {DUMMY_PERKS.map((perk, idx) => (
                    <div key={idx} className="flex flex-col items-center bg-gray-50 rounded-lg p-3">
                      {perk.icon}
                      <span className="font-medium mt-2">{perk.title}</span>
                      <span className="text-xs text-gray-500 text-center">{perk.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applicants Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold">Applicants</h2>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Search applicants..."
                      className="border px-2 py-1 rounded text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                      className={`px-3 py-1 rounded ${view === "table" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                      onClick={() => setView("table")}
                    >
                      Table
                    </button>
                    <button
                      className={`px-3 py-1 rounded ${view === "kanban" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                      onClick={() => setView("kanban")}
                    >
                      Kanban
                    </button>
                  </div>
                </div>
                {candidates.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">No applicants found.</div>
                ) : view === "table" ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white divide-y divide-gray-200 shadow-sm border border-gray-200 rounded-md">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                            <input
                              type="checkbox"
                              className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                              checked={selectAll}
                              onChange={handleSelectAll}
                            />
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Score
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hiring Stage
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Applied
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {currentApplicants.map((candidate) => (
                          <tr
                            key={candidate.id}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => navigate(`/applicant-detail/${candidate.id}`)}
                          >
                            <td className="px-3 py-2">
                              <input
                                type="checkbox"
                                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                                checked={selectedCandidates.includes(candidate.id)}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleSelect(candidate.id);
                                }}
                              />
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8">
                                  <img
                                    className="h-8 w-8 rounded-full object-cover"
                                    src={candidate.image}
                                    alt={candidate.name}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=random`;
                                    }}
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">
                                    {candidate.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex items-center">
                                <Star
                                  className={`${getStarColor(candidate.score)} h-4 w-4`}
                                  fill={candidate.score > 0 ? "#FACC15" : "none"}
                                />
                                <span className="ml-1 text-sm">
                                  {candidate.score}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-2">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(
                                  candidate.hiringStage
                                )} ${getStageTextColor(candidate.hiringStage)}`}
                              >
                                {candidate.hiringStage}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500">
                              {candidate.appliedDate}
                            </td>
                            <td className="px-3 py-2 text-sm">
                              <button
                                className="text-blue-600 hover:text-blue-800 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/applicant-detail/${candidate.id}`);
                                }}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-between items-center mt-4 px-2">
                        <div className="text-sm text-gray-700">
                          Showing {indexOfFirstApplicant + 1} to{" "}
                          {Math.min(indexOfLastApplicant, filteredCandidates.length)} of{" "}
                          {filteredCandidates.length} results
                        </div>
                        <div className="inline-flex gap-1">
                          <button
                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                            className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft size={16} />
                          </button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(
                              (number) =>
                                number === 1 ||
                                number === totalPages ||
                                Math.abs(number - currentPage) <= 1
                            )
                            .map((number, index, array) => (
                              <React.Fragment key={number}>
                                {index > 0 && array[index - 1] !== number - 1 && (
                                  <span className="px-2 py-1 border border-gray-300 rounded-md text-sm">
                                    ...
                                  </span>
                                )}
                                <button
                                  onClick={() => paginate(number)}
                                  className={`px-3 py-1 border rounded-md text-sm ${
                                    currentPage === number
                                      ? "bg-blue-600 text-white border-blue-600"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {number}
                                </button>
                              </React.Fragment>
                            ))}
                          <button
                            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                            className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                            disabled={currentPage === totalPages}
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Kanban View
                  <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
                    {stageOrder.map((stage) => (
                      <div key={stage} className="flex-1 min-w-[250px]">
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${getStageColor(
                              stage
                            ).replace("bg-", "bg-")}`}
                          ></span>
                          {stage}{" "}
                          <span className="text-gray-500 text-sm">
                            ({stageGroups[stage]?.length || 0})
                          </span>
                        </h3>
                        <div className="space-y-2">
                          {stageGroups[stage]?.map((candidate) => (
                            <CandidateCard key={candidate.id} candidate={candidate} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicant;
