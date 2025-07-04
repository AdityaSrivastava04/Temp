import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Search, Filter, ChevronLeft, ChevronRight, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Company = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("table");
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [selectedCompanyForRenewal, setSelectedCompanyForRenewal] = useState(null);
  const [renewalDuration, setRenewalDuration] = useState("1");
  const [renewalPlan, setRenewalPlan] = useState("premium");

  const companies = [
    {
      id: 1,
      name: "TechCorp Inc.",
      industry: "Information Technology",
      type: "Corporation",
      status: "Hiring",
      joinedDate: "13 July, 2021",
      employees: "500-1000",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      subscription: {
        type: "Premium",
        expires: "15 June, 2024",
        status: "active" // active, expired, expiring_soon
      }
    },
    {
      id: 2,
      name: "DesignHub LLC",
      industry: "Creative Services",
      type: "LLC",
      status: "Not Hiring",
      joinedDate: "13 July, 2021",
      employees: "50-100",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      subscription: {
        type: "Basic",
        expires: "30 May, 2024",
        status: "expiring_soon"
      }
    },
    {
      id: 3,
      name: "FinServe Partners",
      industry: "Financial Services",
      type: "Partnership",
      status: "Hiring",
      joinedDate: "12 July, 2021",
      employees: "1000+",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      subscription: {
        type: "Enterprise",
        expires: "15 January, 2025",
        status: "active"
      }
    },
    {
      id: 4,
      name: "HealthPlus Systems",
      industry: "Healthcare",
      type: "Corporation",
      status: "Hiring",
      joinedDate: "11 July, 2021",
      employees: "200-500",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      subscription: {
        type: "Premium",
        expires: "1 April, 2024",
        status: "expired"
      }
    },
    {
      id: 5,
      name: "EduTech Solutions",
      industry: "Education",
      type: "Startup",
      status: "Not Hiring",
      joinedDate: "11 July, 2021",
      employees: "100-200",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      subscription: {
        type: "Basic",
        expires: "10 July, 2024",
        status: "active"
      }
    },
    {
      id: 6,
      name: "GreenEnergy Co.",
      industry: "Energy",
      type: "Corporation",
      status: "Hiring",
      joinedDate: "9 July, 2021",
      employees: "500-1000",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      subscription: {
        type: "Premium",
        expires: "20 March, 2024",
        status: "expired"
      }
    },
    {
      id: 7,
      name: "LogiTrans International",
      industry: "Logistics",
      type: "Corporation",
      status: "Hiring",
      joinedDate: "5 July, 2021",
      employees: "1000+",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      subscription: {
        type: "Enterprise",
        expires: "15 December, 2024",
        status: "active"
      }
    },
    {
      id: 8,
      name: "RetailNet Group",
      industry: "Retail",
      type: "LLC",
      status: "Not Hiring",
      joinedDate: "5 July, 2021",
      employees: "500-1000",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      subscription: {
        type: "Basic",
        expires: "5 May, 2024",
        status: "expiring_soon"
      }
    },
    {
      id: 9,
      name: "FoodWorks Enterprises",
      industry: "Food Services",
      type: "Corporation",
      status: "Hiring",
      joinedDate: "3 July, 2021",
      employees: "200-500",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      subscription: {
        type: "Premium",
        expires: "1 June, 2024",
        status: "active"
      }
    },
    {
      id: 10,
      name: "BuildRight Construction",
      industry: "Construction",
      type: "Partnership",
      status: "Hiring",
      joinedDate: "1 July, 2021",
      employees: "100-200",
      image: "https://randomuser.me/api/portraits/men/10.jpg",
      subscription: {
        type: "Basic",
        expires: "15 May, 2024",
        status: "expiring_soon"
      }
    },
  ];

  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage, setCompaniesPerPage] = useState(10);

  // Filter related states
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedTypeFilters, setSelectedTypeFilters] = useState([]);
  const [selectedSubscriptionFilters, setSelectedSubscriptionFilters] = useState([]);
  const filterRef = useRef(null);

  // Available company types for filter
  const companyTypes = ["Corporation", "LLC", "Partnership", "Startup"];
  const subscriptionStatuses = ["active", "expiring_soon", "expired"];

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
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(companies.map((company) => company.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelect = (id) => {
    if (selectedCompanies.includes(id)) {
      setSelectedCompanies(selectedCompanies.filter((cid) => cid !== id));
    } else {
      setSelectedCompanies([...selectedCompanies, id]);
    }
  };

  const toggleTypeFilter = (type) => {
    if (selectedTypeFilters.includes(type)) {
      setSelectedTypeFilters(selectedTypeFilters.filter((t) => t !== type));
    } else {
      setSelectedTypeFilters([...selectedTypeFilters, type]);
    }
    setCurrentPage(1);
  };

  const toggleSubscriptionFilter = (status) => {
    if (selectedSubscriptionFilters.includes(status)) {
      setSelectedSubscriptionFilters(selectedSubscriptionFilters.filter((s) => s !== status));
    } else {
      setSelectedSubscriptionFilters([...selectedSubscriptionFilters, status]);
    }
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedTypeFilters([]);
    setSelectedSubscriptionFilters([]);
  };

  // Filter companies based on search term AND type filters
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTypeFilter =
      selectedTypeFilters.length === 0 ||
      selectedTypeFilters.includes(company.type);
    const matchesSubscriptionFilter =
      selectedSubscriptionFilters.length === 0 ||
      selectedSubscriptionFilters.includes(company.subscription.status);
    return matchesSearch && matchesTypeFilter && matchesSubscriptionFilter;
  });

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

  // Company types for pipeline view
  const typeOrder = ["Corporation", "LLC", "Partnership", "Startup"];

  // Group companies by type for pipeline view
  const typeGroups = {
    Corporation: filteredCompanies.filter((c) => c.type === "Corporation"),
    LLC: filteredCompanies.filter((c) => c.type === "LLC"),
    Partnership: filteredCompanies.filter((c) => c.type === "Partnership"),
    Startup: filteredCompanies.filter((c) => c.type === "Startup"),
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Corporation":
        return "bg-blue-50";
      case "LLC":
        return "bg-purple-50";
      case "Partnership":
        return "bg-yellow-50";
      case "Startup":
        return "bg-green-50";
      default:
        return "bg-gray-50";
    }
  };

  const getTypeTextColor = (type) => {
    switch (type) {
      case "Corporation":
        return "text-blue-600";
      case "LLC":
        return "text-purple-600";
      case "Partnership":
        return "text-yellow-600";
      case "Startup":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Hiring":
        return "bg-green-50";
      case "Not Hiring":
        return "bg-gray-50";
      default:
        return "bg-gray-50";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "Hiring":
        return "text-green-600";
      case "Not Hiring":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const getSubscriptionColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-50";
      case "expiring_soon":
        return "bg-yellow-50";
      case "expired":
        return "bg-red-50";
      default:
        return "bg-gray-50";
    }
  };

  const getSubscriptionTextColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "expiring_soon":
        return "text-yellow-600";
      case "expired":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getSubscriptionIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-3 w-3" />;
      case "expiring_soon":
        return <Clock className="h-3 w-3" />;
      case "expired":
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const openRenewModal = (company) => {
    setSelectedCompanyForRenewal(company);
    setShowRenewModal(true);
  };

  const closeRenewModal = () => {
    setShowRenewModal(false);
    setSelectedCompanyForRenewal(null);
  };

  const handleRenewalSubmit = () => {
    // Here you would typically make an API call to update the subscription
    alert(`Subscription renewed for ${selectedCompanyForRenewal.name} - ${renewalPlan} plan for ${renewalDuration} year(s)`);
    closeRenewModal();
  };

  const CompanyCard = ({ company }) => (
    <div
      className="bg-white p-2 rounded-md shadow-sm border border-gray-200 mb-2 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate("/company-data")}
    >
      <div className="flex items-center mb-1">
        <div className="w-7 h-7 flex-shrink-0">
          <img
            src={company.image}
            alt={company.name}
            className="w-full h-full rounded-full border object-cover"
          />
        </div>
        <div className="ml-2 min-w-0">
          <h3 className="text-xs font-medium text-gray-900 truncate">
            {company.name}
          </h3>
          <p className="text-[0.65rem] text-gray-500 truncate">
            {company.industry}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center text-[0.65rem] mb-1">
        <span
          className={`px-1.5 py-0.5 rounded-full ${getStatusTextColor(
            company.status
          )} ${getStatusColor(company.status)}`}
        >
          {company.status}
        </span>
        <span className="text-gray-500">{company.employees} employees</span>
      </div>
      <div className="flex justify-between items-center text-[0.65rem] mb-1">
        <span className="text-gray-500">Expires: {company.subscription.expires}</span>
        <span
          className={`px-1.5 py-0.5 rounded-full flex items-center gap-1 ${getSubscriptionTextColor(
            company.subscription.status
          )} ${getSubscriptionColor(company.subscription.status)}`}
        >
          {getSubscriptionIcon(company.subscription.status)}
          {company.subscription.status.replace('_', ' ')}
        </span>
      </div>
      <div className="flex gap-1">
        <button
          className="w-full px-1 py-0.5 text-[0.65rem] border border-blue-500 bg-[#E9EBFD] text-blue-500 rounded hover:bg-blue-100 transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/company-data");
          }}
        >
          View
        </button>
        <button
          className="w-full px-1 py-0.5 text-[0.65rem] border border-green-500 bg-green-50 text-green-500 rounded hover:bg-green-100 transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            openRenewModal(company);
          }}
        >
          Renew
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
                Companies:{" "}
                <span className="font-bold">{filteredCompanies.length}</span>
              </h2>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <div className="relative w-full md:w-40">
                  <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-gray-400" />
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

                <div className="relative" ref={filterRef}>
                  <button
                    className={`flex items-center gap-1 px-2 py-1.5 border rounded-md ${
                      selectedTypeFilters.length > 0 || selectedSubscriptionFilters.length > 0
                        ? "bg-blue-50 text-blue-600 border-blue-300"
                        : "hover:bg-gray-100"
                    } text-xs cursor-pointer`}
                    onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                  >
                    <Filter className="h-3.5 w-3.5" />
                    Filter
                    {(selectedTypeFilters.length > 0 || selectedSubscriptionFilters.length > 0) && (
                      <span className="ml-1 bg-blue-100 text-blue-600 px-1.5 rounded-full text-[0.65rem]">
                        {selectedTypeFilters.length + selectedSubscriptionFilters.length}
                      </span>
                    )}
                  </button>

                  {filterMenuOpen && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
                      <div className="px-3 py-2 border-b border-gray-100">
                        <h3 className="text-xs font-medium text-gray-700">
                          Filter Options
                        </h3>
                      </div>

                      <div className="px-3 py-1 border-b border-gray-100">
                        <h4 className="text-xs font-medium text-gray-600 mb-1">Company Type</h4>
                        <div className="space-y-1">
                          {companyTypes.map((type) => (
                            <div
                              key={type}
                              className="hover:bg-gray-50 cursor-pointer flex items-center"
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
                                } cursor-pointer`}
                              >
                                {type}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="px-3 py-1">
                        <h4 className="text-xs font-medium text-gray-600 mb-1">Subscription Status</h4>
                        <div className="space-y-1">
                          {subscriptionStatuses.map((status) => (
                            <div
                              key={status}
                              className="hover:bg-gray-50 cursor-pointer flex items-center"
                              onClick={() => toggleSubscriptionFilter(status)}
                            >
                              <input
                                type="checkbox"
                                className="form-checkbox h-3 w-3 text-blue-500 cursor-pointer"
                                checked={selectedSubscriptionFilters.includes(status)}
                                onChange={() => {}}
                              />
                              <span
                                className={`ml-2 text-xs capitalize ${
                                  selectedSubscriptionFilters.includes(status)
                                    ? "font-medium"
                                    : ""
                                } cursor-pointer`}
                              >
                                {status.replace('_', ' ')}
                              </span>
                            </div>
                          ))}
                        </div>
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

            {(selectedTypeFilters.length > 0 || selectedSubscriptionFilters.length > 0) && (
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
                {selectedSubscriptionFilters.map((status) => (
                  <div
                    key={status}
                    className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 cursor-pointer ${getSubscriptionTextColor(
                      status
                    )} ${getSubscriptionColor(status)}`}
                  >
                    {status.replace('_', ' ')}
                    <button
                      className="ml-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                      onClick={() => toggleSubscriptionFilter(status)}
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
                        "Industry",
                        "Type",
                        "Status",
                        "Subscription",
                        "Expires",
                        "Employees",
                        "Action",
                      ].map((header) => (
                        <th
                          key={header}
                          className="p-2 text-left font-medium cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-1 cursor-pointer">
                            <span>{header}</span>
                            <span className="text-xs opacity-50">▲▼</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {currentCompanies.length > 0 ? (
                      currentCompanies.map((company) => (
                        <tr
                          key={company.id}
                          className="border-t hover:bg-gray-50 cursor-pointer"
                          onClick={() => navigate("/company-data")}
                        >
                          <td
                            className="p-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-500 cursor-pointer h-4 w-4"
                              checked={selectedCompanies.includes(company.id)}
                              onChange={() => handleSelect(company.id)}
                            />
                          </td>
                          <td className="p-2">
                            <div className="flex items-center space-x-2">
                              <img
                                src={company.image}
                                alt={company.name}
                                className="w-6 h-6 rounded-full border object-cover"
                              />
                              <span className="font-medium text-gray-900 cursor-pointer">
                                {company.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-2 text-gray-600">
                            {company.industry}
                          </td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer
                              ${getTypeTextColor(company.type)} 
                              ${getTypeColor(company.type)}`}
                            >
                              {company.type}
                            </span>
                          </td>
                          <td className="p-2 text-gray-600">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer
                              ${getStatusTextColor(company.status)} 
                              ${getStatusColor(company.status)}`}
                            >
                              {company.status}
                            </span>
                          </td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              {getSubscriptionIcon(company.subscription.status)}
                              <span
                                className={`text-xs font-medium cursor-pointer
                                ${getSubscriptionTextColor(company.subscription.status)}`}
                              >
                                {company.subscription.type}
                              </span>
                              <span
                                className={`px-1.5 py-0.5 rounded-full text-[0.65rem] flex items-center gap-1 cursor-pointer
                                ${getSubscriptionTextColor(company.subscription.status)} 
                                ${getSubscriptionColor(company.subscription.status)}`}
                              >
                                {company.subscription.status.replace('_', ' ')}
                              </span>
                            </div>
                          </td>
                          <td className="p-2 text-gray-600">
                            {company.subscription.expires}
                          </td>
                          <td className="p-2 text-gray-600">
                            {company.employees}
                          </td>
                          <td className="p-2">
                            <div className="flex gap-1">
                              <button
                                className="px-2 py-1 text-xs border border-blue-500 bg-[#E9EBFD] text-blue-500 rounded cursor-pointer hover:bg-blue-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate("/company-data");
                                }}
                              >
                                View
                              </button>
                              <button
                                className="px-2 py-1 text-xs border border-green-500 bg-green-50 text-green-500 rounded cursor-pointer hover:bg-green-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openRenewModal(company);
                                }}
                              >
                                Renew
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="9"
                          className="p-3 text-center text-gray-500 text-sm"
                        >
                          No matching companies found
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
                        className={`p-1.5 rounded-t-md ${getTypeColor(type)} cursor-pointer`}
                      >
                        <div className="flex justify-between items-center">
                          <h3
                            className={`text-xs font-medium ${getTypeTextColor(
                              type
                            )} cursor-pointer`}
                          >
                            {type}
                          </h3>
                          <span className="bg-white px-1 py-0.5 rounded-full text-[0.65rem] font-medium text-gray-700 cursor-pointer">
                            {typeGroups[type].length}
                          </span>
                        </div>
                      </div>
                      <div className="p-1.5 max-h-[calc(100vh-250px)] overflow-y-auto">
                        {typeGroups[type].length > 0 ? (
                          typeGroups[type].map((company) => (
                            <CompanyCard key={company.id} company={company} />
                          ))
                        ) : (
                          <div className="text-center py-3 text-gray-500 text-[0.65rem]">
                            No companies
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Renew Subscription Modal */}
      {showRenewModal && selectedCompanyForRenewal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Renew Subscription
              </h3>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Renewing subscription for: <span className="font-medium">{selectedCompanyForRenewal.name}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Current plan: <span className="font-medium">{selectedCompanyForRenewal.subscription.type}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Expires on: <span className="font-medium">{selectedCompanyForRenewal.subscription.expires}</span>
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Plan
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    className={`px-3 py-2 border rounded-md text-sm cursor-pointer ${
                      renewalPlan === "basic"
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setRenewalPlan("basic")}
                  >
                    Basic
                  </button>
                  <button
                    className={`px-3 py-2 border rounded-md text-sm cursor-pointer ${
                      renewalPlan === "premium"
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setRenewalPlan("premium")}
                  >
                    Premium
                  </button>
                  <button
                    className={`px-3 py-2 border rounded-md text-sm cursor-pointer ${
                      renewalPlan === "enterprise"
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setRenewalPlan("enterprise")}
                  >
                    Enterprise
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (years)
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                  value={renewalDuration}
                  onChange={(e) => setRenewalDuration(e.target.value)}
                >
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3 Years</option>
                </select>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                onClick={closeRenewModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                onClick={handleRenewalSubmit}
              >
                Confirm Renewal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Company;