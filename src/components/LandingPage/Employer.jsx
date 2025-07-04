import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Employer = () => {
  // Enhanced employer data
  const employerData = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      position: "TPO Head",
      department: "Training & Placement",
      email: "rajesh.kumar@example.com",
      phone: "+91 98765 43210",
      linkedin: "https://www.linkedin.com/in/rajeshkumar",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      status: "Available",
      lastContact: "2023-06-15"
    },
    {
      id: 2,
      name: "Prof. Priya Singh",
      position: "Deputy TPO",
      department: "Corporate Relations",
      email: "priya.singh@example.com",
      phone: "+91 87654 32109",
      linkedin: "https://www.linkedin.com/in/priyasingh",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      status: "In Meeting",
      lastContact: "2023-06-10"
    },
    {
      id: 3,
      name: "Mr. Amit Sharma",
      position: "Industry Relations Officer",
      department: "Placement Cell",
      email: "amit.sharma@example.com",
      phone: "+91 76543 21098",
      linkedin: "https://www.linkedin.com/in/amitsharma",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      status: "On Leave",
      lastContact: "2023-05-28"
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [pipelineStatus, setPipelineStatus] = useState('All');

  const filteredEmployers = employerData.filter(employer => {
    const matchesSearch = 
      employer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      employer.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = 
      activeTab === 'all' || 
      employer.department.toLowerCase().includes(activeTab.toLowerCase());
    
    const matchesPipeline = 
      pipelineStatus === 'All' || 
      employer.status === pipelineStatus;
    
    return matchesSearch && matchesTab && (viewMode !== 'pipeline' || matchesPipeline);
  });

  const statusOptions = ['All', 'Available', 'In Meeting', 'On Leave'];

  return (
    <>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Placement Team</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with our dedicated team members who facilitate industry-academia collaborations.
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSelectedEmployer(null);
                  }}
                  className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-text"
                />
                <svg 
                  className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${viewMode === 'table' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('pipeline')}
                className={`px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${viewMode === 'pipeline' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Department Filter */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                All Departments
              </button>
              <button
                onClick={() => setActiveTab('Training')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer ${activeTab === 'Training' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Training
              </button>
              <button
                onClick={() => setActiveTab('Corporate')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer ${activeTab === 'Corporate' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Corporate
              </button>
              <button
                onClick={() => setActiveTab('Placement')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer ${activeTab === 'Placement' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Placement
              </button>
            </div>
          </div>
          
          {/* Pipeline Status Filter */}
          {viewMode === 'pipeline' && (
            <div className="mt-4 flex space-x-2 overflow-x-auto pt-2">
              {statusOptions.map(status => (
                <button
                  key={status}
                  onClick={() => setPipelineStatus(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer ${pipelineStatus === status ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployers.length > 0 ? (
              filteredEmployers.map(employer => (
                <div 
                  key={employer.id} 
                  onClick={() => setSelectedEmployer(selectedEmployer?.id === employer.id ? null : employer)}
                  className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 cursor-pointer ${selectedEmployer?.id === employer.id ? 'ring-2 ring-blue-500 transform scale-[1.02]' : 'hover:shadow-lg'}`}
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={employer.avatar} 
                        alt={employer.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 cursor-pointer"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 cursor-pointer">{employer.name}</h3>
                        <p className="text-blue-600 font-medium cursor-pointer">{employer.position}</p>
                        <p className="text-sm text-gray-500 mt-1 cursor-pointer">{employer.department}</p>
                        <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full cursor-pointer ${employer.status === 'Available' ? 'bg-blue-100 text-blue-800' : employer.status === 'In Meeting' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {employer.status}
                        </span>
                      </div>
                      <a 
                        href={employer.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 p-1 cursor-pointer"
                        onClick={e => e.stopPropagation()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#0077B5">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                    
                    {selectedEmployer?.id === employer.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
                        <div className="space-y-3">
                          <div className="flex items-center cursor-pointer">
                            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            <a href={`mailto:${employer.email}`} className="text-gray-700 hover:text-blue-600 cursor-pointer">{employer.email}</a>
                          </div>
                          <div className="flex items-center cursor-pointer">
                            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                            <a href={`tel:${employer.phone}`} className="text-gray-700 hover:text-blue-600 cursor-pointer">{employer.phone}</a>
                          </div>
                          <div className="flex items-center cursor-pointer">
                            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            <span className="text-gray-700 cursor-pointer">Last contact: {employer.lastContact}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <button 
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 font-medium cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `mailto:${employer.email}`;
                            }}
                          >
                            Email
                          </button>
                          <button 
                            className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition-colors duration-300 font-medium cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `tel:${employer.phone}`;
                            }}
                          >
                            Call
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <svg 
                  className="mx-auto h-12 w-12 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No team members found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}

        {viewMode === 'table' && (
          <div className="bg-white shadow-sm rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-default">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-default">Position</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-default">Department</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-default">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-default">Last Contact</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-default">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployers.length > 0 ? (
                    filteredEmployers.map(employer => (
                      <tr key={employer.id} className="hover:bg-gray-50 cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full cursor-pointer" src={employer.avatar} alt={employer.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 cursor-pointer">{employer.name}</div>
                              <div className="text-sm text-gray-500 cursor-pointer">{employer.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 cursor-pointer">{employer.position}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 cursor-pointer">{employer.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${employer.status === 'Available' ? 'bg-blue-100 text-blue-800' : employer.status === 'In Meeting' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {employer.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                          {employer.lastContact}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <a
                              href={`mailto:${employer.email}`}
                              className="text-blue-600 hover:text-blue-900 cursor-pointer"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                              </svg>
                            </a>
                            <a
                              href={`tel:${employer.phone}`}
                              className="text-blue-600 hover:text-blue-900 cursor-pointer"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                              </svg>
                            </a>
                            <a
                              href={employer.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-900 cursor-pointer"
                            >
                              <svg className="w-5 h-5" fill="#0077B5" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                              </svg>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center cursor-default">
                        <div className="text-gray-500 py-8">
                          <svg 
                            className="mx-auto h-12 w-12 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">No team members found</h3>
                          <p className="mt-1">Try adjusting your search or filter criteria</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewMode === 'pipeline' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statusOptions.filter(status => status !== 'All').map(status => (
              <div key={status} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-700 mb-4 flex items-center cursor-default">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${status === 'Available' ? 'bg-blue-500' : status === 'In Meeting' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                  {status}
                  <span className="ml-auto bg-white px-2 py-1 rounded-full text-xs font-medium cursor-default">
                    {filteredEmployers.filter(e => e.status === status).length}
                  </span>
                </h3>
                <div className="space-y-3">
                  {filteredEmployers.filter(employer => pipelineStatus === 'All' ? true : employer.status === status).map(employer => (
                    <div 
                      key={employer.id}
                      className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedEmployer(selectedEmployer?.id === employer.id ? null : employer)}
                    >
                      <div className="flex items-start">
                        <img 
                          src={employer.avatar} 
                          alt={employer.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-100 mr-3 cursor-pointer"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 cursor-pointer">{employer.name}</h4>
                          <p className="text-sm text-gray-500 cursor-pointer">{employer.position}</p>
                          <p className="text-xs text-gray-400 mt-1 cursor-pointer">Last contact: {employer.lastContact}</p>
                        </div>
                      </div>
                      {selectedEmployer?.id === employer.id && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex justify-between text-sm">
                            <a href={`mailto:${employer.email}`} className="text-blue-600 flex items-center cursor-pointer">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                              </svg>
                              Email
                            </a>
                            <a href={`tel:${employer.phone}`} className="text-blue-600 flex items-center cursor-pointer">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                              </svg>
                              Call
                            </a>
                            <a 
                              href={employer.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 flex items-center cursor-pointer"
                            >
                              <svg className="w-4 h-4 mr-1" fill="#0077B5" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                              </svg>
                              Profile
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {filteredEmployers.filter(employer => employer.status === status).length === 0 && (
                    <div className="text-center py-4 text-gray-400 text-sm cursor-default">
                      No team members in this status
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
};

export default Employer;