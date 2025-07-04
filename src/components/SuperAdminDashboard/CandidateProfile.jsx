import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {
  ChevronDown,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Globe,
  Star,
  MessageSquare,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CandidateProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Personal Info
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="text-base font-medium">Jerome Bell</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Gender</p>
                  <p className="text-base font-medium">Male</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                  <p className="text-base font-medium">
                    March 23, 1995{" "}
                    <span className="text-gray-500">(26 y.o)</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Language</p>
                  <p className="text-base font-medium">
                    English, French, Bahasa
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">Address</p>
                <p className="text-base font-medium">4517 Washington Ave.</p>
                <p className="text-base font-medium">
                  Manchester, Kentucky 39495
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Professional Info
              </h2>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">About Me</p>
                <p className="text-base mb-2 leading-relaxed">
                  I'm a product designer + filmmaker currently working remotely
                  at Twitter from beautiful Manchester, United Kingdom.
                </p>
                <p className="text-base leading-relaxed">
                  For 10 years, I've specialized in interface, experience &
                  interaction design as well as working in user research and
                  product strategy.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Current Job</p>
                  <p className="text-base font-medium">Product Designer</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Experience</p>
                  <p className="text-base font-medium">4 Years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Highest Qualification
                  </p>
                  <p className="text-base font-medium">
                    Bachelors in Engineering
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Skill set</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-xs">
                      Project Management
                    </span>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-xs">
                      Copywriting
                    </span>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-xs">
                      English
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "resume":
        return (
          <div className="py-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Resume</h2>
            <div className="border p-4 rounded-md text-center">
              <p className="text-base text-gray-600 mb-3">
                Resume content goes here
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-base cursor-pointer hover:bg-blue-700">
                Download Resume
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-base font-medium">Tab content not found</div>
        );
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
                  onClick={() => navigate("/candidate")}
                >
                  <ChevronLeft size={24} />
                </button>
                <h1
                  className="text-xl font-bold text-gray-900 cursor-pointer hover:text-blue-600"
                  onClick={() => navigate("/candidate")}
                >
                  Student Details
                </h1>
              </div>
              {/* <button className="border border-blue-500 text-blue-500 px-3 py-1 rounded-md flex items-center space-x-1 text-sm cursor-pointer hover:bg-blue-50">
                <ChevronDown size={14} />
                <span>More Action</span>
              </button> */}
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-72 bg-white border border-gray-300 rounded-lg p-4">
                <div className="flex flex-col items-center mb-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/7.jpg"
                    alt="Profile"
                    className="w-14 h-14 rounded-full object-cover mb-2 cursor-pointer"
                  />
                  <h2 className="text-lg font-bold text-gray-800 cursor-pointer hover:text-blue-600">
                    Jerome Bell
                  </h2>
                  <p className="text-sm text-gray-500 mb-1">Product Designer</p>
                  <div className="flex items-center">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-0.5 text-sm text-gray-700">4.0</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded p-2 mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-indigo-600">
                      Applied Jobs
                    </span>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                  <div className="border-t border-gray-300 mb-2"></div>
                  <h3 className="font-medium text-sm text-gray-800 mb-0.5">
                    Product Development
                  </h3>
                  <div className="flex text-xs text-gray-500">
                    <span>Marketing</span>
                    <span className="mx-1">•</span>
                    <span>Full-Time</span>
                  </div>
                </div>


                <div className="border-t border-gray-300 mb-3"></div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                    Contact
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: Mail,
                        label: "Email",
                        value: "jeromeBell45@email.com",
                        href: "mailto:jeromeBell45@email.com",
                      },
                      {
                        icon: Phone,
                        label: "Phone",
                        value: "+44 1245 572 135",
                      },
                      {
                        icon: Instagram,
                        label: "Instagram",
                        value: "instagram.com/jeromebell",
                        href: "https://instagram.com/jeromebell",
                      },
                      {
                        icon: Twitter,
                        label: "Twitter",
                        value: "twitter.com/jeromebell",
                        href: "https://twitter.com/jeromebell",
                      },
                      {
                        icon: Globe,
                        label: "Website",
                        value: "www.jeromebell.com",
                        href: "https://www.jeromebell.com",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <item.icon className="w-4 h-4 text-gray-500" />
                        <div>
                          <span className="text-xs text-gray-500">
                            {item.label}
                          </span>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="block text-xs font-medium text-blue-500 hover:underline cursor-pointer"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <span className="block text-xs font-medium text-gray-700">
                              {item.value}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-white border border-gray-300 rounded-lg">
                <div className="flex border-b overflow-x-auto">
                  {[
                    { id: "profile", label: "Student Profile" },
                    { id: "resume", label: "Resume" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`px-4 py-2 text-sm font-medium cursor-pointer whitespace-nowrap ${
                        activeTab === tab.id
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-4 text-sm">{renderTabContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;