import React, { useState } from "react";
import { CalendarIcon, ChevronRight, Eye, FileText, School, Users, Briefcase } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [entityType, setEntityType] = useState("Companies");
  const [activeTab, setActiveTab] = useState("Week");
  const [activeSection, setActiveSection] = useState("Overview");

  // Dynamic cards based on selected entity type
  const cardsData = {
    Companies: [
      { number: 153, text: "Total Companies", color: "bg-blue-500" },
      { number: 12, text: "New Companies This Week", color: "bg-green-500" },
      { number: 76, text: "Active Recruiters", color: "bg-purple-500" },
    ],
    Colleges: [
      { number: 87, text: "Total Colleges", color: "bg-orange-500" },
      { number: 8, text: "New Colleges This Week", color: "bg-yellow-500" },
      { number: 45, text: "Placement Drives Active", color: "bg-pink-500" },
    ],
    Students: [
      { number: 2450, text: "Total Students", color: "bg-indigo-500" },
      { number: 126, text: "New Registrations", color: "bg-teal-500" },
      { number: 568, text: "Placements This Month", color: "bg-red-500" },
    ],
  };

  // Chart data for each entity type
  const chartData = {
    Companies: {
      Week: [
        { day: "Mon", views: 122, applications: 65, postings: 12 },
        { day: "Tue", views: 90, applications: 75, postings: 8 },
        { day: "Wed", views: 145, applications: 85, postings: 15 },
        { day: "Thu", views: 158, applications: 120, postings: 22 },
        { day: "Fri", views: 134, applications: 65, postings: 18 },
        { day: "Sat", views: 60, applications: 40, postings: 5 },
        { day: "Sun", views: 70, applications: 65, postings: 7 },
      ],
      Month: [
        { day: "Week 1", views: 520, applications: 310, postings: 45 },
        { day: "Week 2", views: 580, applications: 350, postings: 52 },
        { day: "Week 3", views: 620, applications: 420, postings: 61 },
        { day: "Week 4", views: 622, applications: 430, postings: 58 },
      ],
      Year: [
        { day: "Jan", views: 1520, applications: 810, postings: 180 },
        { day: "Feb", views: 1680, applications: 950, postings: 210 },
        { day: "Mar", views: 1720, applications: 1020, postings: 250 },
        { day: "Apr", views: 1622, applications: 930, postings: 220 },
        { day: "May", views: 1820, applications: 1110, postings: 270 },
        { day: "Jun", views: 1920, applications: 1210, postings: 290 },
      ],
    },
    Colleges: {
      Week: [
        { day: "Mon", visits: 45, registrations: 22, events: 2 },
        { day: "Tue", visits: 52, registrations: 28, events: 1 },
        { day: "Wed", visits: 65, registrations: 32, events: 3 },
        { day: "Thu", visits: 72, registrations: 40, events: 2 },
        { day: "Fri", visits: 60, registrations: 35, events: 4 },
        { day: "Sat", visits: 28, registrations: 15, events: 1 },
        { day: "Sun", visits: 20, registrations: 12, events: 0 },
      ],
      Month: [
        { day: "Week 1", visits: 210, registrations: 120, events: 8 },
        { day: "Week 2", visits: 250, registrations: 140, events: 10 },
        { day: "Week 3", visits: 280, registrations: 160, events: 12 },
        { day: "Week 4", visits: 260, registrations: 150, events: 9 },
      ],
      Year: [
        { day: "Jan", visits: 720, registrations: 350, events: 28 },
        { day: "Feb", visits: 820, registrations: 420, events: 32 },
        { day: "Mar", visits: 880, registrations: 450, events: 36 },
        { day: "Apr", visits: 790, registrations: 380, events: 30 },
        { day: "May", visits: 850, registrations: 410, events: 34 },
        { day: "Jun", visits: 920, registrations: 470, events: 40 },
      ],
    },
    Students: {
      Week: [
        { day: "Mon", profiles: 95, applications: 42, interviews: 12 },
        { day: "Tue", profiles: 85, applications: 50, interviews: 14 },
        { day: "Wed", profiles: 120, applications: 65, interviews: 18 },
        { day: "Thu", profiles: 135, applications: 72, interviews: 24 },
        { day: "Fri", profiles: 110, applications: 60, interviews: 20 },
        { day: "Sat", profiles: 45, applications: 25, interviews: 6 },
        { day: "Sun", profiles: 40, applications: 18, interviews: 4 },
      ],
      Month: [
        { day: "Week 1", profiles: 420, applications: 240, interviews: 60 },
        { day: "Week 2", profiles: 480, applications: 280, interviews: 72 },
        { day: "Week 3", profiles: 520, applications: 320, interviews: 86 },
        { day: "Week 4", profiles: 490, applications: 290, interviews: 78 },
      ],
      Year: [
        { day: "Jan", profiles: 1520, applications: 820, interviews: 240 },
        { day: "Feb", profiles: 1720, applications: 950, interviews: 280 },
        { day: "Mar", profiles: 1820, applications: 1020, interviews: 320 },
        { day: "Apr", profiles: 1650, applications: 880, interviews: 260 },
        { day: "May", profiles: 1750, applications: 920, interviews: 290 },
        { day: "Jun", profiles: 1880, applications: 1050, interviews: 340 },
      ],
    },
  };

  // Entity summaries
  const summaryData = {
    Companies: {
      total: 153,
      categories: [
        { name: "Technology", count: 60, color: "#1E88E5" },
        { name: "Finance", count: 35, color: "#4CAF50" },
        { name: "Healthcare", count: 22, color: "#FFC107" },
        { name: "Education", count: 16, color: "#FF5722" },
        { name: "Manufacturing", count: 20, color: "#29B6F6" },
      ],
    },
    Colleges: {
      total: 87,
      categories: [
        { name: "Engineering", count: 32, color: "#1E88E5" },
        { name: "Management", count: 24, color: "#4CAF50" },
        { name: "Science", count: 15, color: "#FFC107" },
        { name: "Arts", count: 8, color: "#FF5722" },
        { name: "Medical", count: 8, color: "#29B6F6" },
      ],
    },
    Students: {
      total: 2450,
      categories: [
        { name: "Engineering", count: 1200, color: "#1E88E5" },
        { name: "Business", count: 650, color: "#4CAF50" },
        { name: "Computer Science", count: 350, color: "#FFC107" },
        { name: "Arts & Design", count: 150, color: "#FF5722" },
        { name: "Others", count: 100, color: "#29B6F6" },
      ],
    },
  };

  // Entity-specific stats
  const statLabels = {
    Companies: { 
      metricOne: "Company Views", 
      metricTwo: "Applications Received",
      sidebarOne: "Openings",
      sidebarTwo: "Company Summary"
    },
    Colleges: { 
      metricOne: "College Profile Views", 
      metricTwo: "Student Registrations",
      sidebarOne: "Upcoming Events",
      sidebarTwo: "College Categories"
    },
    Students: { 
      metricOne: "Profile Views", 
      metricTwo: "Applications Sent",
      sidebarOne: "Interviews",
      sidebarTwo: "Student Categories"
    }
  };

  // Dynamic metrics
  const metrics = {
    Companies: {
      metricOne: { value: 2342, change: 6.4, up: true },
      metricTwo: { value: 654, change: -0.5, up: false },
      openings: 32
    },
    Colleges: {
      metricOne: { value: 1256, change: 4.2, up: true },
      metricTwo: { value: 432, change: 7.5, up: true },
      openings: 18
    },
    Students: {
      metricOne: { value: 5680, change: 8.4, up: true },
      metricTwo: { value: 1230, change: 2.8, up: true },
      openings: 45
    }
  };

  // Section tabs based on entity type
  const sectionTabs = {
    Companies: ["Overview", "Company Views", "Applications"],
    Colleges: ["Overview", "College Views", "Registrations"],
    Students: ["Overview", "Profile Views", "Applications"]
  };

  const getChartData = () => {
    const base = chartData[entityType][activeTab];
    const keysMap = {
      Companies: { primary: "views", secondary: "applications", tertiary: "postings" },
      Colleges: { primary: "visits", secondary: "registrations", tertiary: "events" },
      Students: { primary: "profiles", secondary: "applications", tertiary: "interviews" }
    };

    const keys = keysMap[entityType];

    if (activeSection === "Overview") return base;
    if (activeSection === `${entityType === 'Companies' ? 'Company' : entityType === 'Colleges' ? 'College' : 'Profile'} Views`) {
      return base.map((item) => ({ day: item.day, [keys.primary]: item[keys.primary] }));
    }
    if (activeSection === `${entityType === 'Students' ? 'Applications' : entityType === 'Colleges' ? 'Registrations' : 'Applications'}`) {
      return base.map((item) => ({ day: item.day, [keys.secondary]: item[keys.secondary] }));
    }
    return base;
  };

  // Entity type icon map
  const entityIcons = {
    Companies: <Briefcase size={20} />,
    Colleges: <School size={20} />,
    Students: <Users size={20} />
  };

  // Dynamic chart components
  const renderCharts = () => {
    const data = getChartData();
    const keysMap = {
      Companies: { primary: "views", secondary: "applications", tertiary: "postings" },
      Colleges: { primary: "visits", secondary: "registrations", tertiary: "events" },
      Students: { primary: "profiles", secondary: "applications", tertiary: "interviews" }
    };
    
    const keys = keysMap[entityType];
    const colors = { primary: "#FBBF24", secondary: "#2563EB", tertiary: "#10B981" };
    const names = {
      Companies: { primary: "Company Views", secondary: "Applications", tertiary: "Job Postings" },
      Colleges: { primary: "College Views", secondary: "Registrations", tertiary: "Events" },
      Students: { primary: "Profile Views", secondary: "Applications", tertiary: "Interviews" }
    };

    return (
      <BarChart
        data={data}
        margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
      >
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        {activeSection === "Overview" ? (
          <>
            <Bar
              dataKey={keys.primary}
              fill={colors.primary}
              name={names[entityType].primary}
              barSize={30}
            />
            <Bar
              dataKey={keys.secondary}
              fill={colors.secondary}
              name={names[entityType].secondary}
              barSize={30}
            />
            <Bar
              dataKey={keys.tertiary}
              fill={colors.tertiary}
              name={names[entityType].tertiary}
              barSize={30}
            />
            <Legend verticalAlign="bottom" height={30} />
          </>
        ) : activeSection === `${entityType === 'Companies' ? 'Company' : entityType === 'Colleges' ? 'College' : 'Profile'} Views` ? (
          <>
            <Bar
              dataKey={keys.primary}
              fill={colors.primary}
              name={names[entityType].primary}
              barSize={30}
            />
            <Legend verticalAlign="bottom" height={30} />
          </>
        ) : (
          <>
            <Bar
              dataKey={keys.secondary}
              fill={colors.secondary}
              name={names[entityType].secondary}
              barSize={30}
            />
            <Legend verticalAlign="bottom" height={30} />
          </>
        )}
      </BarChart>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          <div>
            <div className="flex justify-between items-center py-4 px-6">
              <div>
                <h1 className="text-3xl font-semibold text-black-900">
                  Welcome, Super Admin
                </h1>
                <p className="text-gray-500 mt-1 text-base">
                  Here is your dashboard analytics for July 19 - July 25, 2025.
                </p>
              </div>
              <div className="flex items-center">
                <div className="border-2 border-gray-300 px-3 py-1 cursor-pointer mr-4">
                  <span className="text-gray-700 font-semibold text-sm">
                    Jul 19 - Jul 25
                  </span>
                  <CalendarIcon className="w-3 h-3 text-blue-500 ml-2 inline" />
                </div>
              </div>
            </div>

            {/* Entity Type Selector */}
            <div className="flex justify-center items-center py-3 px-6">
              <div className="inline-flex rounded-md shadow-sm">
                {Object.keys(cardsData).map((type) => (
                  <button
                    key={type}
                    className={`px-6 py-2 text-sm font-medium cursor-pointer flex items-center ${
                      entityType === type
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } ${
                      type === "Companies"
                        ? "rounded-l-md"
                        : type === "Students"
                        ? "rounded-r-md"
                        : ""
                    } border border-gray-200`}
                    onClick={() => setEntityType(type)}
                  >
                    <span className="mr-2">{entityIcons[type]}</span>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="flex justify-between items-center py-3 px-2">
              {cardsData[entityType].map((card, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between ${card.color} text-white p-4 w-1/3 h-20 shadow-md mx-2 cursor-pointer`}
                >
                  <div>
                    <p className="text-3xl font-bold">{card.number}</p>
                    <p className="text-sm">{card.text}</p>
                  </div>
                  <ChevronRight size={20} />
                </div>
              ))}
            </div>

            <div className="flex p-4">
              <div className="w-3/4 pr-4">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="p-4 pb-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {entityType} Statistics
                        </h2>
                        <p className="text-xs text-gray-500">
                          Showing {entityType} Analytics for Jul 19-25
                        </p>
                      </div>

                      <div className="inline-flex rounded-md shadow-sm">
                        {["Week", "Month", "Year"].map((tab) => (
                          <button
                            key={tab}
                            className={`px-4 py-1 text-xs font-medium cursor-pointer ${
                              activeTab === tab
                                ? "bg-blue-500 text-white"
                                : "bg-blue-100 text-blue-500"
                            } ${
                              tab === "Week"
                                ? "rounded-l-md"
                                : tab === "Year"
                                ? "rounded-r-md"
                                : ""
                            } border border-blue-200`}
                            onClick={() => setActiveTab(tab)}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex mt-2 border-b">
                      {sectionTabs[entityType].map((section) => (
                        <button
                          key={section}
                          className={`px-6 py-1 text-sm font-medium cursor-pointer ${
                            activeSection === section
                              ? "text-blue-600 border-b-2 border-blue-600"
                              : "text-gray-500"
                          }`}
                          onClick={() => setActiveSection(section)}
                        >
                          {section}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col md:flex-row">
                    <div className="w-full md:w-3/4 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        {renderCharts()}
                      </ResponsiveContainer>
                    </div>

                    <div className="w-full md:w-1/4 mt-2 md:mt-0 md:pl-2 flex flex-col space-y-2">
                      <div className="bg-gray-100 rounded-lg p-3 relative cursor-pointer">
                        <p className="text-gray-600 text-xs">{statLabels[entityType].metricOne}</p>
                        <p className="text-xl font-bold">{metrics[entityType].metricOne.value}</p>
                        <p className={`${metrics[entityType].metricOne.up ? 'text-blue-600' : 'text-red-600'} text-xs`}>
                          This Week <span className="font-bold">{metrics[entityType].metricOne.change}%</span> {metrics[entityType].metricOne.up ? '🔼' : '🔽'}
                        </p>
                        <div className="absolute top-3 right-3 bg-yellow-100 p-1 rounded-full">
                          <Eye size={16} className="text-yellow-500" />
                        </div>
                      </div>

                      <div className="bg-gray-100 rounded-lg p-3 relative cursor-pointer">
                        <p className="text-gray-600 text-xs">{statLabels[entityType].metricTwo}</p>
                        <p className="text-xl font-bold">{metrics[entityType].metricTwo.value}</p>
                        <p className={`${metrics[entityType].metricTwo.up ? 'text-blue-600' : 'text-red-600'} text-xs`}>
                          This Week <span className="font-bold">{metrics[entityType].metricTwo.change}%</span> {metrics[entityType].metricTwo.up ? '🔼' : '🔽'}
                        </p>
                        <div className="absolute top-3 right-3 bg-blue-100 p-1 rounded-full">
                          <FileText size={16} className="text-blue-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="w-1/4 space-y-3">
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-600">
                    {statLabels[entityType].sidebarOne}
                  </h3>
                  <p className="text-4xl font-bold mt-1 text-gray-900">
                    {metrics[entityType].openings}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {entityType === 'Companies' ? 'Active Job Positions' : 
                     entityType === 'Colleges' ? 'Campus Events' : 'Scheduled Interviews'}
                  </p>
                </div>

                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-600">
                    {statLabels[entityType].sidebarTwo}
                  </h3>
                  <p className="text-4xl font-bold mt-1 text-gray-900">
                    {summaryData[entityType].total}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Total {entityType}</p>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-3">
                    <div className="h-full flex">
                      {summaryData[entityType].categories.map((category, index) => (
                        <div
                          key={index}
                          className="h-full"
                          style={{
                            width: `${(category.count / summaryData[entityType].total) * 100}%`,
                            backgroundColor: category.color,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-1 mt-2">
                    {summaryData[entityType].categories.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center cursor-pointer"
                      >
                        <span
                          className="w-2 h-2 inline-block rounded-sm mr-1"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-gray-600 text-xs">
                          {category.name}: {category.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;