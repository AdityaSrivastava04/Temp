import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const CollegeSettings = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [image, setImage] = useState("https://via.placeholder.com/96");
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/svg+xml",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert(
          "Invalid file type! Please upload a JPG, PNG, GIF, or SVG image."
        );
        return;
      }

      const maxSize = 1 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size too large! Please upload an image less than 1MB.");
        return;
      }

      setImagePreview(URL.createObjectURL(file));
      setFormData((prevFormData) => ({
        ...prevFormData,
        profileImage: file,
      }));
    }
  };

  const [newLocation, setNewLocation] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddLocation = (e) => {
    if (e.key === "Enter" && newLocation.trim() !== "") {
      e.preventDefault();
      setFormData({
        ...formData,
        location: [...formData.location, newLocation.trim()],
      });
      setNewLocation("");
    }
  };

  const LocationTag = ({ label, onRemove }) => (
    <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs flex items-center m-1 cursor-default">
      {label}
      <button
        onClick={onRemove}
        className="ml-1 text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </span>
  );

  const [formData, setFormData] = useState({
    collegeName: "MIT Engineering College",
    website: "https://www.mitec.edu",
    location: ["Mumbai", "Pune"],
    students: "5000+",
    establishedDay: "15",
    establishedMonth: "August",
    establishedYear: "1985",
    accreditation: "NAAC A++",
    profileImage: null,
    description:
      "MIT Engineering College is one of the premier engineering institutions in India. With state-of-the-art facilities and experienced faculty, we provide quality education in various engineering disciplines. Our placement record has been exceptional with top companies visiting campus every year.",
    type: "engineering",
  });

  const textareaRef = useRef(null);

  const [description, setDescription] = useState("");
  const editorRef = useRef(null);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  useEffect(() => {
    if (editorRef.current) {
      const textOnly = editorRef.current.textContent || "";
      setCharCount(textOnly.length);
    }
  }, [description]);

  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setDescription(content);
    }
  };

  const applyBold = () => {
    document.execCommand("bold", false, null);
    editorRef.current.focus();
  };

  const applyItalic = () => {
    document.execCommand("italic", false, null);
    editorRef.current.focus();
  };

  const applyNumberedList = () => {
    document.execCommand("insertOrderedList", false, null);
    editorRef.current.focus();
  };

  const applyBulletList = () => {
    document.execCommand("insertUnorderedList", false, null);
    editorRef.current.focus();
  };

  const insertEmoji = (emoji) => {
    document.execCommand("insertText", false, emoji);
    editorRef.current.focus();
  };

  const insertLink = () => {
    if (linkUrl.trim()) {
      const displayText = linkText.trim() || linkUrl;
      document.execCommand(
        "insertHTML",
        false,
        `<a href="${linkUrl}" target="_blank">${displayText}</a>`
      );
      setLinkUrl("");
      setLinkText("");
      editorRef.current.focus();
    }
  };

  const handleSaveProfile = () => {
    console.log("Profile Data Saved:", formData);
    alert("Profile saved successfully!");
  };

  const emojis = ["😀", "😊", "👍", "🎉", "❤️", "🔥", "✅", "🚀", "💡", "📊"];

  const [socialLinks, setSocialLinks] = useState({
    instagram: "https://www.instagram.com/mitec/",
    twitter: "https://twitter.com/mitec/",
    facebook: "https://web.facebook.com/mitec/",
    linkedin: "https://linkedin.com/school/mitec",
    youtube: "https://youtube.com/mitec",
  });

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setSocialLinks({
      ...socialLinks,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    console.log("Saving social links:", socialLinks);
  };

  const [tpoTeam, setTpoTeam] = useState([
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      role: "TPO Head",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=90&h=90&fit=crop",
      socials: {
        linkedin: "https://linkedin.com/in/rajeshkumar",
        email: "tpo.head@mitec.edu",
      },
    },
    {
      id: 2,
      name: "Prof. Priya Singh",
      role: "Deputy TPO",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=90&h=90&fit=crop",
      socials: {
        linkedin: "https://linkedin.com/in/priyasingh",
        email: "deputy.tpo@mitec.edu",
      },
    },
    {
      id: 3,
      name: "Mr. Amit Sharma",
      role: "Industry Relations Officer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=90&h=90&fit=crop",
      socials: {
        linkedin: "https://linkedin.com/in/amitsharma",
        email: "industry.relations@mitec.edu",
      },
    },
  ]);

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    socials: {
      linkedin: "",
      email: "",
    },
  });

  const [selectedMember, setSelectedMember] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [showAddModal, setShowAddModal] = useState(false);

  const handleNewMemberChange = (e) => {
    const { name, value } = e.target;
    if (name === "linkedin" || name === "email") {
      setNewMember({
        ...newMember,
        socials: {
          ...newMember.socials,
          [name]: value,
        },
      });
    } else {
      setNewMember({
        ...newMember,
        [name]: value,
      });
    }
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role) {
      alert("Please fill in name and role fields");
      return;
    }

    const newId = Math.max(...tpoTeam.map((m) => m.id), 0) + 1;

    setTpoTeam([
      ...tpoTeam,
      {
        ...newMember,
        id: newId,
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=90&h=90&fit=crop",
      },
    ]);

    setNewMember({
      name: "",
      role: "",
      socials: {
        linkedin: "",
        email: "",
      },
    });

    setShowAddModal(false);
  };

  const handleRemoveMember = (id) => {
    if (confirm("Are you sure you want to remove this TPO team member?")) {
      setTpoTeam(tpoTeam.filter((member) => member.id !== id));
    }
  };

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setNewMember({
      name: member.name,
      role: member.role,
      socials: { ...member.socials },
    });
    setShowAddModal(true);
  };

  const handleUpdateMember = () => {
    if (!selectedMember) return;

    setTpoTeam(
      tpoTeam.map((member) =>
        member.id === selectedMember.id
          ? {
              ...member,
              name: newMember.name,
              role: newMember.role,
              socials: newMember.socials,
            }
          : member
      )
    );

    setSelectedMember(null);
    setNewMember({
      name: "",
      role: "",
      socials: {
        linkedin: "",
        email: "",
      },
    });

    setShowAddModal(false);
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
            <div className="border-b border-gray-300 flex space-x-6 text-base w-full">
              <button
                className={`pb-2 border-b-2 px-4 cursor-pointer ${
                  activeTab === "overview"
                    ? "border-blue-500 font-semibold text-blue-600"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`pb-2 border-b-2 px-4 cursor-pointer ${
                  activeTab === "sociallinks"
                    ? "border-blue-500 font-semibold text-blue-600"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => setActiveTab("sociallinks")}
              >
                Social Links
              </button>
              <button
                className={`pb-2 border-b-2 px-4 cursor-pointer ${
                  activeTab === "tpo"
                    ? "border-blue-500 font-semibold text-blue-600"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => setActiveTab("tpo")}
              >
                TPO Team
              </button>
            </div>
            <div className="p-2">
              {activeTab === "overview" && (
                <div>
                  <div className="border-b border-gray-300 pb-4">
                    <h2 className="text-xl font-bold">Basic Information</h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Update your college's basic information and details.
                    </p>
                  </div>
                  <div className="flex space-x-6 border-b border-gray-300 py-4">
                    <div className="flex flex-col items-start w-1/3">
                      <h2 className="text-lg font-bold">College Logo</h2>
                      <p className="text-gray-500 text-xs mt-1">
                        This image will be shown publicly as your college logo
                      </p>
                    </div>
                    <div className="flex space-x-4 items-center w-3/5">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="College Logo"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                            No Logo
                          </div>
                        )}
                      </div>
                      <label className="w-48 h-20 border-2 border-dashed border-blue-400 flex flex-col justify-center text-center p-2 rounded-lg cursor-pointer text-xs bg-[#F8F8FD] mb-3">
                        <span className="text-blue-500 font-semibold">
                          Click to replace
                        </span>
                        <p className="text-gray-400 mt-1">or drag and drop</p>
                        <p className="text-gray-400 text-xs">
                          SVG, PNG, JPG or GIF (max. 400 x 400px)
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 border-b border-gray-300 py-4">
                    <div className="w-1/3">
                      <h2 className="text-lg font-bold">College Details</h2>
                      <p className="text-gray-500 text-xs mt-1">
                        Provide essential information about your institution
                      </p>
                    </div>
                    <div className="w-2/3 space-y-3">
                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          College Name
                        </label>
                        <input
                          type="text"
                          name="collegeName"
                          value={formData.collegeName}
                          onChange={handleChange}
                          className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          Website
                        </label>
                        <input
                          type="text"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          Campus Locations
                        </label>
                        <div className="relative">
                          <div className="p-2 border border-gray-300 rounded flex flex-wrap items-center min-h-10 text-sm">
                            {formData.location.map((loc, index) => (
                              <LocationTag
                                key={index}
                                label={loc}
                                onRemove={() => {
                                  const newLocs = [...formData.location];
                                  newLocs.splice(index, 1);
                                  setFormData({
                                    ...formData,
                                    location: newLocs,
                                  });
                                }}
                              />
                            ))}
                            <input
                              type="text"
                              className="flex-1 outline-none min-w-16 text-sm cursor-pointer"
                              placeholder="Add campus location..."
                              value={newLocation}
                              onChange={(e) => setNewLocation(e.target.value)}
                              onKeyDown={handleAddLocation}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-1/2">
                          <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                            Total Students
                          </label>
                          <div className="relative">
                            <select
                              name="students"
                              value={formData.students}
                              onChange={handleChange}
                              className="w-full p-2 text-sm border border-gray-300 rounded appearance-none cursor-pointer"
                            >
                              <option value="1000-">Less than 1000</option>
                              <option value="1000-5000">1000 - 5000</option>
                              <option value="5000+">More than 5000</option>
                            </select>
                          </div>
                        </div>
                        <div className="w-1/2">
                          <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                            Accreditation
                          </label>
                          <div className="relative">
                            <select
                              name="accreditation"
                              value={formData.accreditation}
                              onChange={handleChange}
                              className="w-full p-2 text-sm border border-gray-300 rounded appearance-none cursor-pointer"
                            >
                              <option value="NAAC A++">NAAC A++</option>
                              <option value="NAAC A+">NAAC A+</option>
                              <option value="NAAC A">NAAC A</option>
                              <option value="NAAC B++">NAAC B++</option>
                              <option value="NAAC B+">NAAC B+</option>
                              <option value="NAAC B">NAAC B</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          Established Date
                        </label>
                        <div className="flex gap-2">
                          <div className="w-1/3 relative">
                            <select
                              name="establishedDay"
                              value={formData.establishedDay}
                              onChange={handleChange}
                              className="w-full p-2 text-sm border border-gray-300 rounded appearance-none cursor-pointer"
                            >
                              {Array.from({ length: 31 }, (_, i) => i + 1).map(
                                (day) => (
                                  <option key={day} value={day}>
                                    {day}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="w-1/3 relative">
                            <select
                              name="establishedMonth"
                              value={formData.establishedMonth}
                              onChange={handleChange}
                              className="w-full p-2 text-sm border border-gray-300 rounded appearance-none cursor-pointer"
                            >
                              {[
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December",
                              ].map((month) => (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="w-1/3 relative">
                            <select
                              name="establishedYear"
                              value={formData.establishedYear}
                              onChange={handleChange}
                              className="w-full p-2 text-sm border border-gray-300 rounded appearance-none cursor-pointer"
                            >
                              {Array.from(
                                { length: 100 },
                                (_, i) => 2025 - i
                              ).map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-6 items-start border-b border-gray-300 py-4">
                    <div className="flex flex-col items-start w-1/3">
                      <h2 className="text-lg font-bold text-gray-800">
                        About College
                      </h2>
                      <p className="text-gray-500 text-xs mt-1">
                        Provide a detailed description of your institution
                      </p>
                    </div>
                    <div className="flex flex-col w-2/3">
                      <h2 className="text-sm font-bold text-gray-800 mb-1">
                        Description
                      </h2>
                      <div className="border border-gray-300 rounded p-1 bg-white">
                        <div
                          ref={editorRef}
                          contentEditable="true"
                          onInput={handleInput}
                          className="w-full p-2 min-h-24 outline-none text-sm overflow-auto cursor-pointer"
                          style={{
                            minHeight: "6rem",
                            listStylePosition: "inside",
                          }}
                        />
                        <div className="border-t border-gray-200 pt-2 px-2 flex items-center justify-between">
                          <div className="flex space-x-2 relative">
                            <button
                              type="button"
                              className={`text-gray-500 hover:text-gray-700 cursor-pointer text-sm ${
                                showEmojiPicker ? "text-blue-500" : ""
                              }`}
                              onClick={() => {
                                setShowLinkDialog(false);
                                setShowEmojiPicker(!showEmojiPicker);
                              }}
                            >
                              😊
                            </button>

                            {showEmojiPicker && (
                              <div className="absolute top-6 left-0 bg-white shadow-md rounded p-2 z-10 border border-gray-200 min-w-40">
                                <div className="grid grid-cols-4 gap-1">
                                  {emojis.map((emoji, index) => (
                                    <button
                                      key={index}
                                      type="button"
                                      className="text-lg hover:bg-gray-100 w-6 h-6 flex items-center justify-center rounded cursor-pointer"
                                      onClick={() => {
                                        insertEmoji(emoji);
                                        setShowEmojiPicker(false);
                                      }}
                                    >
                                      {emoji}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            <button
                              type="button"
                              className="text-gray-700 font-bold cursor-pointer text-sm"
                              onClick={() => {
                                setShowEmojiPicker(false);
                                setShowLinkDialog(false);
                                applyBold();
                              }}
                            >
                              B
                            </button>
                            <button
                              type="button"
                              className="text-gray-700 italic cursor-pointer text-sm"
                              onClick={() => {
                                setShowEmojiPicker(false);
                                setShowLinkDialog(false);
                                applyItalic();
                              }}
                            >
                              I
                            </button>
                            <button
                              type="button"
                              className="text-gray-700 cursor-pointer text-sm"
                              onClick={() => {
                                setShowEmojiPicker(false);
                                setShowLinkDialog(false);
                                applyNumberedList();
                              }}
                            >
                              🔢
                            </button>
                            <button
                              type="button"
                              className="text-gray-700 cursor-pointer text-sm"
                              onClick={() => {
                                setShowEmojiPicker(false);
                                setShowLinkDialog(false);
                                applyBulletList();
                              }}
                            >
                              •
                            </button>

                            <button
                              type="button"
                              className={`text-gray-500 hover:text-gray-700 cursor-pointer text-sm ${
                                showLinkDialog ? "text-blue-500" : ""
                              }`}
                              onClick={() => {
                                setShowEmojiPicker(false);
                                setShowLinkDialog(!showLinkDialog);
                              }}
                            >
                              🔗
                            </button>

                            {showLinkDialog && (
                              <div className="absolute top-6 right-0 bg-white shadow-md rounded p-2 z-10 border border-gray-200 w-56">
                                <input
                                  type="text"
                                  placeholder="Enter link URL"
                                  className="border p-1 rounded w-full mb-1 text-sm cursor-pointer"
                                  value={linkUrl}
                                  onChange={(e) => setLinkUrl(e.target.value)}
                                />
                                <input
                                  type="text"
                                  placeholder="Enter link text (optional)"
                                  className="border p-1 rounded w-full mb-1 text-sm cursor-pointer"
                                  value={linkText}
                                  onChange={(e) => setLinkText(e.target.value)}
                                />
                                <button
                                  className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer text-sm"
                                  onClick={() => {
                                    insertLink();
                                    setShowLinkDialog(false);
                                  }}
                                >
                                  Insert Link
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {charCount} / {maxChars}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">
                        Maximum 500 character
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSaveProfile}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "sociallinks" && (
                <div>
                  <div className="flex items-start space-x-6 border-b border-gray-300 py-4">
                    <div className="w-1/3">
                      <h2 className="text-lg font-bold">Social Media Links</h2>
                      <p className="text-gray-500 text-xs mt-1">
                        Add your college's social media presence
                      </p>
                    </div>
                    <div className="w-2/3 space-y-3">
                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          Instagram
                        </label>
                        <input
                          type="text"
                          name="instagram"
                          value={socialLinks.instagram}
                          onChange={handleUpdate}
                          className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          Twitter
                        </label>
                        <input
                          type="text"
                          name="twitter"
                          value={socialLinks.twitter}
                          onChange={handleUpdate}
                          className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          Facebook
                        </label>
                        <input
                          type="text"
                          name="facebook"
                          value={socialLinks.facebook}
                          onChange={handleUpdate}
                          className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          LinkedIn
                        </label>
                        <input
                          type="text"
                          name="linkedin"
                          value={socialLinks.linkedin}
                          onChange={handleUpdate}
                          className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm mb-1 cursor-pointer">
                          YouTube
                        </label>
                        <input
                          type="text"
                          name="youtube"
                          value={socialLinks.youtube}
                          onChange={handleUpdate}
                          className="w-full p-2 text-sm border border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSaveChanges}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "tpo" && (
                <div>
                  <div className="flex items-start space-x-6 py-4">
                    <div className="w-1/3">
                      <h2 className="text-lg font-bold">TPO Team Members</h2>
                      <p className="text-gray-500 text-xs mt-1">
                        Manage your Training and Placement Office team
                      </p>
                    </div>
                    <div className="w-2/3">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-semibold">
                          {tpoTeam.length} Team Members
                        </h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setShowAddModal(true)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm cursor-pointer"
                          >
                            + Add Member
                          </button>
                          <div className="flex border rounded">
                            <button
                              onClick={() => setViewMode("grid")}
                              className={`p-1 cursor-pointer ${
                                viewMode === "grid"
                                  ? "bg-blue-100"
                                  : "bg-gray-50"
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => setViewMode("list")}
                              className={`p-1 cursor-pointer ${
                                viewMode === "list"
                                  ? "bg-blue-100"
                                  : "bg-gray-50"
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="8" y1="6" x2="21" y2="6" />
                                <line x1="8" y1="12" x2="21" y2="12" />
                                <line x1="8" y1="18" x2="21" y2="18" />
                                <line x1="3" y1="6" x2="3.01" y2="6" />
                                <line x1="3" y1="12" x2="3.01" y2="12" />
                                <line x1="3" y1="18" x2="3.01" y2="18" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {tpoTeam.map((member) => (
                            <div
                              key={member.id}
                              className="border rounded-lg p-4 relative group"
                            >
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => handleSelectMember(member)}
                                  className="text-gray-500 hover:text-blue-500 p-1 cursor-pointer"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleRemoveMember(member.id)}
                                  className="text-gray-500 hover:text-red-500 p-1 cursor-pointer"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M3 6h18" />
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                  </svg>
                                </button>
                              </div>
                              <div className="flex flex-col items-center">
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-20 h-20 rounded-full mb-3 cursor-pointer"
                                />
                                <h4 className="font-semibold text-sm cursor-pointer">
                                  {member.name}
                                </h4>
                                <p className="text-gray-500 text-xs mb-2 cursor-pointer">
                                  {member.role}
                                </p>
                                <div className="flex space-x-2">
                                  <a
                                    href={member.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-blue-500 cursor-pointer"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                      <rect x="2" y="9" width="4" height="12" />
                                      <circle cx="4" cy="4" r="2" />
                                    </svg>
                                  </a>
                                  <a
                                    href={`mailto:${member.socials.email}`}
                                    className="text-gray-400 hover:text-blue-500 cursor-pointer"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                      <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="border rounded-lg divide-y">
                          {tpoTeam.map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center justify-between p-4 hover:bg-gray-50"
                            >
                              <div className="flex items-center space-x-4">
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-12 h-12 rounded-full cursor-pointer"
                                />
                                <div>
                                  <h4 className="font-semibold text-sm cursor-pointer">
                                    {member.name}
                                  </h4>
                                  <p className="text-gray-500 text-xs cursor-pointer">
                                    {member.role}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <a
                                  href={member.socials.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-blue-500 cursor-pointer"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect x="2" y="9" width="4" height="12" />
                                    <circle cx="4" cy="4" r="2" />
                                  </svg>
                                </a>
                                <a
                                  href={`mailto:${member.socials.email}`}
                                  className="text-gray-400 hover:text-blue-500 cursor-pointer"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                  </svg>
                                </a>
                                <button
                                  onClick={() => handleSelectMember(member)}
                                  className="text-gray-400 hover:text-blue-500 cursor-pointer"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleRemoveMember(member.id)}
                                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M3 6h18" />
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {showAddModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                          <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-lg font-semibold">
                                {selectedMember
                                  ? "Edit Member"
                                  : "Add New Member"}
                              </h3>
                              <button
                                onClick={() => {
                                  setShowAddModal(false);
                                  setSelectedMember(null);
                                  setNewMember({
                                    name: "",
                                    role: "",
                                    socials: {
                                      linkedin: "",
                                      email: "",
                                    },
                                  });
                                }}
                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                              >
                                ×
                              </button>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  value={newMember.name}
                                  onChange={handleNewMemberChange}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm cursor-pointer"
                                  placeholder="Enter member name"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                                  Role
                                </label>
                                <input
                                  type="text"
                                  name="role"
                                  value={newMember.role}
                                  onChange={handleNewMemberChange}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm cursor-pointer"
                                  placeholder="Enter member role"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                                  LinkedIn Profile
                                </label>
                                <input
                                  type="text"
                                  name="linkedin"
                                  value={newMember.socials.linkedin}
                                  onChange={handleNewMemberChange}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm cursor-pointer"
                                  placeholder="https://linkedin.com/in/username"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  value={newMember.socials.email}
                                  onChange={handleNewMemberChange}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm cursor-pointer"
                                  placeholder="email@example.com"
                                />
                              </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                              <button
                                onClick={() => {
                                  setShowAddModal(false);
                                  setSelectedMember(null);
                                }}
                                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={
                                  selectedMember
                                    ? handleUpdateMember
                                    : handleAddMember
                                }
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                              >
                                {selectedMember ? "Update" : "Add"} Member
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeSettings;
