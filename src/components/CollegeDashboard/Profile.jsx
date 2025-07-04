import React, { useState,  useRef } from "react";
import { Edit, Upload } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function CollegeProfile() {
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingPrograms, setIsEditingPrograms] = useState(false);
  const [isEditingFacilities, setIsEditingFacilities] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [isAddingFaculty, setIsAddingFaculty] = useState(false);

  const [collegeData, setCollegeData] = useState({
    name: "Knowledge City College (KCC)",
    motto: "Empowering Minds, Building Futures",
    location: "Bangalore, India",
    established: "Established in 1995",
    about: {
      title: "About KCC",
      description:
        "Knowledge City College (KCC) is a premier educational institution committed to academic excellence and holistic development. With state-of-the-art infrastructure and experienced faculty, we provide an environment conducive to learning and innovation.",
      vision:
        "To be a center of excellence in education and research, nurturing future leaders who will make a positive impact on society.",
    },
    programs: [
      "B.Tech in Computer Science",
      "B.Tech in Mechanical Engineering",
      "MBA in Finance",
      "MBA in Marketing",
      "B.Sc in Data Science",
      "B.A. in English Literature",
      "M.Sc in Biotechnology",
    ],
    facilities: [
      "24/7 Library",
      "High-Tech Labs",
      "Sports Complex",
      "Hostel Facilities",
      "Cafeteria",
      "Auditorium",
      "Medical Center",
    ],
    contact: {
      email: "info@kcc.edu.in",
      phone: "+91 80 1234 5678",
      address: "123 Knowledge City, Bangalore - 560001, Karnataka, India",
    },
    social: {
      facebook: "facebook.com/kcccollege",
      twitter: "twitter.com/kcccollege",
      website: "www.kcc.edu.in",
      linkedin: "linkedin.com/school/kcc-college",
    },
  });

  const [facultyData, setFacultyData] = useState([
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      position: "Professor & HOD",
      department: "Computer Science",
      experience: "15 years",
      specialization: "Artificial Intelligence",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      position: "Professor",
      department: "Mechanical Engineering",
      experience: "12 years",
      specialization: "Thermodynamics",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Prof. Amit Patel",
      position: "Associate Professor",
      department: "Business Administration",
      experience: "10 years",
      specialization: "Financial Management",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    {
      id: 4,
      name: "Dr. Sunita Reddy",
      position: "Professor",
      department: "Biotechnology",
      experience: "18 years",
      specialization: "Genetic Engineering",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
    },
  ]);

  const handleHeaderSubmit = (e) => {
    e.preventDefault();
    setIsEditingHeader(false);
  };

  const handleAboutSubmit = (e) => {
    e.preventDefault();
    setIsEditingAbout(false);
  };

  const handleProgramsSubmit = (e) => {
    e.preventDefault();
    setIsEditingPrograms(false);
  };

  const handleFacilitiesSubmit = (e) => {
    e.preventDefault();
    setIsEditingFacilities(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsEditingContact(false);
  };

  const handleSocialSubmit = (e) => {
    e.preventDefault();
    setIsEditingSocial(false);
  };

  const handleFacultySubmit = (e, faculty) => {
    e.preventDefault();
    if (editingFaculty) {
      setFacultyData(
        facultyData.map((fac) =>
          fac.id === editingFaculty.id
            ? { ...faculty, id: editingFaculty.id }
            : fac
        )
      );
      setEditingFaculty(null);
    } else if (isAddingFaculty) {
      setFacultyData([...facultyData, { ...faculty, id: Date.now() }]);
      setIsAddingFaculty(false);
    }
  };

  const EditButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="p-1.5 text-blue-600 border border-gray-300 rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
    >
      <Edit className="w-4 h-4" />
    </button>
  );

  const EditableInput = ({ value, onChange, label }) => (
    <div className="mb-3">
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );

  const ImageUploader = ({ label, imagePreview, onImageChange }) => {
    const fileInputRef = React.useRef(null);

    const handleClick = () => {
      fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          onImageChange(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div
          onClick={handleClick}
          className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-2 flex flex-col items-center justify-center hover:border-blue-500 transition-colors"
        >
          {imagePreview ? (
            <div className="w-full flex flex-col items-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full mb-1 shadow-md"
              />
              <span className="text-xs text-blue-500">
                Click to change image
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center py-2">
              <Upload className="w-6 h-6 text-gray-400 mb-1" />
              <p className="text-xs text-gray-500">Click to upload image</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const FacultyForm = ({ faculty, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(
      faculty || {
        name: "",
        position: "",
        department: "",
        experience: "",
        specialization: "",
        image: "",
      }
    );

    return (
      <form
        onSubmit={(e) => onSubmit(e, formData)}
        className="space-y-4 p-4 w-full bg-white rounded-lg shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <ImageUploader
              label="Faculty Photo"
              imagePreview={formData.image}
              onImageChange={(imageData) =>
                setFormData({ ...formData, image: imageData })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Dr. Rajesh Kumar"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Professor & HOD"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Department
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Computer Science"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Experience
            </label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. 15 years"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Specialization
            </label>
            <textarea
              value={formData.specialization}
              onChange={(e) =>
                setFormData({ ...formData, specialization: e.target.value })
              }
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={2}
              placeholder="Areas of expertise"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    );
  };

  const FacultyList = ({ faculty }) => {
    const [visibleCount, setVisibleCount] = useState(2);

    const handleShowMore = () => {
      setVisibleCount((prev) => Math.min(prev + 2, faculty.length));
    };

    const handleShowLess = () => {
      setVisibleCount(2);
    };

    if (isAddingFaculty) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Add Faculty Member
          </h1>
          <FacultyForm
            onSubmit={handleFacultySubmit}
            onCancel={() => setIsAddingFaculty(false)}
          />
        </div>
      );
    }

    if (editingFaculty) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Edit Faculty Member
          </h1>
          <FacultyForm
            faculty={editingFaculty}
            onSubmit={handleFacultySubmit}
            onCancel={() => setEditingFaculty(null)}
          />
        </div>
      );
    }

    return (
      <div className="bg-white p-4 rounded-lg shadow-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">Our Faculty</h1>
          <button
            onClick={() => setIsAddingFaculty(true)}
            className="text-blue-600 text-xl font-semibold border border-gray-300 px-1.5 hover:bg-blue-100 transition cursor-pointer"
          >
            <span className="relative -top-0.5">+</span>
          </button>
        </div>

        {faculty.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-sm text-gray-500">
              No faculty members added yet. Click the Add button to get started.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faculty.slice(0, visibleCount).map((fac) => (
                <div
                  key={fac.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={fac.image}
                        alt={fac.name}
                        className="w-16 h-16 rounded-full shadow-md object-cover"
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {fac.name}
                        </h2>
                        <p className="text-gray-600 text-sm">
                          <span className="font-semibold">{fac.position}</span>
                        </p>
                        <p className="text-gray-500 text-xs">
                          {fac.department} • {fac.experience} experience
                        </p>
                        <p className="text-gray-700 mt-2 text-sm leading-relaxed">
                          <span className="font-medium">Specialization:</span>{" "}
                          {fac.specialization}
                        </p>
                      </div>
                    </div>
                    <EditButton onClick={() => setEditingFaculty(fac)} />
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < faculty.length ? (
              <button
                onClick={handleShowMore}
                className="block text-blue-600 text-sm font-medium mt-4 mx-auto px-4 py-1 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
              >
                Show {Math.min(2, faculty.length - visibleCount)} more faculty
              </button>
            ) : (
              faculty.length > 2 && (
                <button
                  onClick={handleShowLess}
                  className="block text-blue-600 text-sm font-medium mt-4 mx-auto px-4 py-1 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  Show less faculty
                </button>
              )
            )}
          </>
        )}
      </div>
    );
  };

  const [galleryItems, setGalleryItems] = useState([
    {
      id: 1,
      title: "Campus View",
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      title: "Library",
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      title: "Computer Lab",
      image: "/api/placeholder/300/200",
    },
    {
      id: 4,
      title: "Sports Ground",
      image: "/api/placeholder/300/200",
    },
  ]);

  const [imageUrl, setImageUrl] = useState("/api/placeholder/800/200");
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);
    }
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: "",
    image: "/api/placeholder/300/200",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const imageInputRef = useRef(null);

  const handleAddClick = () => {
    setShowAddModal(true);
    setPreviewImage(null);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewGalleryItem({
      title: "",
      image: "/api/placeholder/300/200",
    });
    setPreviewImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGalleryItem({
      ...newGalleryItem,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target.result);
      setNewGalleryItem({
        ...newGalleryItem,
        image: event.target.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newGalleryItem.title.trim()) return;

    const newItem = {
      id: galleryItems.length + 1,
      title: newGalleryItem.title,
      image: previewImage || newGalleryItem.image,
    };

    setGalleryItems([...galleryItems, newItem]);
    handleCloseModal();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow ">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all overflow-x-hidden">
          <div className="flex-grow overflow-y-auto">
            <Header />
            <div className="p-2">
              <div className="flex">
                <div className="w-3/4 p-2">
                  {/* Header Section */}
                  <div className="flex justify-between items-center">
                    <div className="w-full bg-white rounded-md overflow-hidden shadow-sm">
                      <div className="relative h-36 w-full">
                        <img
                          src={imageUrl}
                          alt="Banner"
                          className="w-full h-full object-cover"
                        />
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <div
                          className="absolute top-2 right-2 text-white rounded p-1 cursor-pointer"
                          onClick={handleEditClick}
                        >
                          <EditButton />
                        </div>
                      </div>

                      <div className="px-4 pt-2 pb-4 relative">
                        <div className="absolute -top-8 left-4">
                          <div className="w-20 h-20 rounded-full bg-blue-500 border-4 border-white overflow-hidden">
                            <img
                              src="/api/placeholder/80/80"
                              alt="College Logo"
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>

                        {isEditingHeader ? (
                          <form onSubmit={handleHeaderSubmit} className="mt-14">
                            <EditableInput
                              label="College Name"
                              value={collegeData.name}
                              onChange={(e) =>
                                setCollegeData({
                                  ...collegeData,
                                  name: e.target.value,
                                })
                              }
                            />
                            <EditableInput
                              label="Motto"
                              value={collegeData.motto}
                              onChange={(e) =>
                                setCollegeData({
                                  ...collegeData,
                                  motto: e.target.value,
                                })
                              }
                            />
                            <EditableInput
                              label="Location"
                              value={collegeData.location}
                              onChange={(e) =>
                                setCollegeData({
                                  ...collegeData,
                                  location: e.target.value,
                                })
                              }
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setIsEditingHeader(false)}
                                className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="flex justify-between items-center ml-20">
                            <div>
                              <h1 className="text-xl font-bold text-gray-800">
                                {collegeData.name}
                              </h1>
                              <p className="text-sm text-gray-500 mt-1">
                                {collegeData.motto}
                              </p>
                              <div className="flex items-center mt-1 text-gray-500 text-sm">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                <span>{collegeData.location}</span>
                              </div>
                              <div className="flex items-center mt-2 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs border border-blue-200">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3 mr-1"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="uppercase text-xs font-medium tracking-wide">
                                  {collegeData.established}
                                </span>
                              </div>
                            </div>
                            <button
                              className="border border-blue-400 text-blue-500 px-3 py-0.5 text-sm hover:bg-blue-50 -mt-14 cursor-pointer"
                              onClick={() => setIsEditingHeader(true)}
                            >
                              Edit Profile
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* About Section */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="bg-white shadow-sm rounded-md p-4 border border-gray-200 w-full">
                      {isEditingAbout ? (
                        <form onSubmit={handleAboutSubmit}>
                          <h2 className="text-lg font-bold text-gray-900 mb-3">
                            {collegeData.about.title}
                          </h2>
                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              value={collegeData.about.description}
                              onChange={(e) =>
                                setCollegeData({
                                  ...collegeData,
                                  about: {
                                    ...collegeData.about,
                                    description: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                              rows={4}
                              placeholder="Write about your college..."
                            />
                          </div>
                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Vision
                            </label>
                            <textarea
                              value={collegeData.about.vision}
                              onChange={(e) =>
                                setCollegeData({
                                  ...collegeData,
                                  about: {
                                    ...collegeData.about,
                                    vision: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                              rows={3}
                              placeholder="Write your college's vision..."
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setIsEditingAbout(false)}
                              className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900">
                              {collegeData.about.title}
                            </h2>
                            <EditButton
                              onClick={() => setIsEditingAbout(true)}
                            />
                          </div>
                          <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                            {collegeData.about.description}
                          </p>
                          <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400">
                            <h3 className="text-sm font-semibold text-blue-800 mb-1">
                              Our Vision
                            </h3>
                            <p className="text-sm text-blue-700 leading-relaxed">
                              {collegeData.about.vision}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Faculty Section */}
                  <div className="flex justify-between items-center mt-4">
                    <FacultyList faculty={facultyData} />
                  </div>

                  {/* Programs Section */}
                  <div className="flex justify-between items-center mt-4 shadow-sm">
                    <div className="border border-gray-200 p-3 rounded-md w-full">
                      {isEditingPrograms ? (
                        <form onSubmit={handleProgramsSubmit}>
                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Programs Offered (comma-separated)
                            </label>
                            <textarea
                              value={collegeData.programs.join(", ")}
                              onChange={(e) =>
                                setCollegeData({
                                  ...collegeData,
                                  programs: e.target.value
                                    .split(",")
                                    .map((program) => program.trim()),
                                })
                              }
                              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                              rows={4}
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setIsEditingPrograms(false)}
                              className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold text-gray-900">
                              Academic Programs
                            </h2>
                            <div className="flex gap-2">
                              <EditButton
                                onClick={() => setIsEditingPrograms(true)}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {collegeData.programs.map((program, index) => (
                              <div
                                key={index}
                                className="flex items-start p-2 bg-gray-50 rounded"
                              >
                                <svg
                                  className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  ></path>
                                </svg>
                                <span className="text-sm text-gray-700">
                                  {program}
                                </span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Facilities Section */}
                  <div className="flex justify-between items-center mt-4 shadow-sm">
                    <div className="border border-gray-200 p-3 rounded-md w-full">
                      {isEditingFacilities ? (
                        <form onSubmit={handleFacilitiesSubmit}>
                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Facilities (comma-separated)
                            </label>
                            <textarea
                              value={collegeData.facilities.join(", ")}
                              onChange={(e) =>
                                setCollegeData({
                                  ...collegeData,
                                  facilities: e.target.value
                                    .split(",")
                                    .map((facility) => facility.trim()),
                                })
                              }
                              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                              rows={4}
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setIsEditingFacilities(false)}
                              className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold text-gray-900">
                              Campus Facilities
                            </h2>
                            <div className="flex gap-2">
                              <EditButton
                                onClick={() => setIsEditingFacilities(true)}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {collegeData.facilities.map((facility, index) => (
                              <div
                                key={index}
                                className="flex items-start p-2 bg-gray-50 rounded"
                              >
                                <svg
                                  className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  ></path>
                                </svg>
                                <span className="text-sm text-gray-700">
                                  {facility}
                                </span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Gallery Section */}
                  <div className="w-full max-w-4xl bg-white rounded-md shadow-sm mt-4 border border-gray-100 p-4 overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Campus Gallery
                      </h2>
                      <button
                        onClick={handleAddClick}
                        className="text-blue-600 text-xl font-semibold border border-gray-300 px-1.5 hover:bg-blue-100 transition cursor-pointer"
                      >
                        <span className="relative -top-0.5">+</span>
                      </button>
                    </div>

                    <div className="relative overflow-hidden mb-4">
                      <div className="overflow-x-auto scrollbar-hide px-1">
                        <div className="flex transition-transform ease-out">
                          {galleryItems.map((item) => (
                            <div
                              key={item.id}
                              className="w-48 mr-3 flex-shrink-0 select-none cursor-pointer"
                            >
                              <div className="bg-white rounded-md overflow-hidden shadow-sm mb-2 border border-gray-100 w-48">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-32 object-cover select-none"
                                  draggable="false"
                                />
                              </div>
                              <p className="text-xs text-gray-700 font-medium mb-1 text-center">
                                {item.title}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add Gallery Modal */}
                  {showAddModal && (
                    <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
                      <div className="bg-white rounded-md p-4 w-full max-w-sm">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-md font-semibold">
                            Add New Gallery Item
                          </h3>
                          <button
                            onClick={handleCloseModal}
                            className="text-gray-500 hover:text-gray-700 cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label className="block text-gray-700 text-xs font-medium mb-1">
                              Image Title
                            </label>
                            <input
                              type="text"
                              name="title"
                              value={newGalleryItem.title}
                              onChange={handleInputChange}
                              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="Enter image title"
                              required
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-gray-700 text-xs font-medium mb-1">
                              Image
                            </label>
                            <div
                              onClick={handleImageClick}
                              className="border-2 border-dashed border-gray-300 rounded-md p-3 text-center cursor-pointer hover:border-blue-500 transition"
                            >
                              {previewImage ? (
                                <div className="relative">
                                  <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="max-h-40 mx-auto rounded"
                                  />
                                  <p className="text-xs text-gray-500 mt-1">
                                    Click to change image
                                  </p>
                                </div>
                              ) : (
                                <div className="py-6">
                                  <svg
                                    className="mx-auto h-8 w-8 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                  >
                                    <path
                                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <p className="mt-1 text-xs text-gray-600">
                                    Click to upload an image
                                  </p>
                                  <p className="mt-1 text-2xs text-gray-500">
                                    PNG, JPG, GIF up to 10MB
                                  </p>
                                </div>
                              )}
                              <input
                                ref={imageInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                              />
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2">
                            <button
                              type="button"
                              onClick={handleCloseModal}
                              className="px-3 py-1.5 text-xs text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-1.5 text-xs text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer"
                            >
                              Add Image
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Sidebar */}
                <div className="w-1/4 p-2">
                  {/* Contact Details Card */}
                  <div className="bg-white border border-gray-200 mb-3 shadow-sm overflow-hidden">
                    {isEditingContact ? (
                      <div className="p-3">
                        <form onSubmit={handleContactSubmit}>
                          <EditableInput
                            label="Email"
                            value={collegeData.contact.email}
                            onChange={(e) =>
                              setCollegeData({
                                ...collegeData,
                                contact: {
                                  ...collegeData.contact,
                                  email: e.target.value,
                                },
                              })
                            }
                          />
                          <EditableInput
                            label="Phone"
                            value={collegeData.contact.phone}
                            onChange={(e) =>
                              setCollegeData({
                                ...collegeData,
                                contact: {
                                  ...collegeData.contact,
                                  phone: e.target.value,
                                },
                              })
                            }
                          />
                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Address
                            </label>
                            <textarea
                              value={collegeData.contact.address}
                              onChange={(e) =>
                                setCollegeData({
                                  ...collegeData,
                                  contact: {
                                    ...collegeData.contact,
                                    address: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                              rows={3}
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setIsEditingContact(false)}
                              className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center px-3 py-2">
                          <h2 className="font-medium text-sm text-gray-800">
                            Contact Details
                          </h2>
                          <EditButton
                            onClick={() => setIsEditingContact(true)}
                          />
                        </div>
                        <div className="px-3 py-2">
                          <div className="flex mb-2">
                            <div className="w-5 mr-2 text-gray-400">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                                  stroke="#9CA3AF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M22 6L12 13L2 6"
                                  stroke="#9CA3AF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-0.5">
                                Email
                              </div>
                              <div className="text-gray-800 text-xs">
                                {collegeData.contact.email}
                              </div>
                            </div>
                          </div>

                          <div className="flex mb-2">
                            <div className="w-5 mr-2 text-gray-400">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.09494 3.90363 2.12781 3.62452 2.2165 3.36136C2.3052 3.09821 2.44763 2.85666 2.63476 2.65162C2.82189 2.44657 3.04974 2.28271 3.30372 2.17052C3.55771 2.05833 3.83227 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
                                  stroke="#9CA3AF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-0.5">
                                Phone
                              </div>
                              <div className="text-gray-800 text-xs">
                                {collegeData.contact.phone}
                              </div>
                            </div>
                          </div>

                          <div className="flex">
                            <div className="w-5 mr-2 text-gray-400">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                                  stroke="#9CA3AF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                                  stroke="#9CA3AF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-0.5">
                                Address
                              </div>
                              <div className="text-gray-800 text-xs">
                                {collegeData.contact.address}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Social Links Card */}
                  <div className="bg-white border border-gray-200 mb-3 shadow-sm overflow-hidden">
                    {isEditingSocial ? (
                      <div className="p-3">
                        <form onSubmit={handleSocialSubmit}>
                          <EditableInput
                            label="Facebook"
                            value={collegeData.social.facebook}
                            onChange={(e) =>
                              setCollegeData({
                                ...collegeData,
                                social: {
                                  ...collegeData.social,
                                  facebook: e.target.value,
                                },
                              })
                            }
                          />
                          <EditableInput
                            label="Twitter"
                            value={collegeData.social.twitter}
                            onChange={(e) =>
                              setCollegeData({
                                ...collegeData,
                                social: {
                                  ...collegeData.social,
                                  twitter: e.target.value,
                                },
                              })
                            }
                          />
                          <EditableInput
                            label="LinkedIn"
                            value={collegeData.social.linkedin}
                            onChange={(e) =>
                              setCollegeData({
                                ...collegeData,
                                social: {
                                  ...collegeData.social,
                                  linkedin: e.target.value,
                                },
                              })
                            }
                          />
                          <EditableInput
                            label="Website"
                            value={collegeData.social.website}
                            onChange={(e) =>
                              setCollegeData({
                                ...collegeData,
                                social: {
                                  ...collegeData.social,
                                  website: e.target.value,
                                },
                              })
                            }
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setIsEditingSocial(false)}
                              className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center px-3 py-2">
                          <h2 className="font-medium text-sm text-gray-800">
                            Connect With Us
                          </h2>
                          <EditButton
                            onClick={() => setIsEditingSocial(true)}
                          />
                        </div>
                        <div className="px-3 py-2">
                          <div className="flex mb-2">
                            <div className="w-5 mr-2 text-gray-400">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
                                  stroke="#9CA3AF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-0.5">
                                Facebook
                              </div>
                              <a
                                href={`https://${collegeData.social.facebook}`}
                                className="text-blue-500 text-xs cursor-pointer"
                              >
                                {collegeData.social.facebook}
                              </a>
                            </div>
                          </div>

                          <div className="flex mb-2">
                            <div className="w-5 mr-2 text-gray-400">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z"
                                  stroke="#9CA3AF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-0.5">
                                Twitter
                              </div>
                              <a
                                href={`https://${collegeData.social.twitter}`}
                                className="text-blue-500 text-xs cursor-pointer"
                              >
                                {collegeData.social.twitter}
                              </a>
                            </div>
                          </div>

                          <div className="flex mb-2">
                            <div className="w-5 mr-2 text-gray-400">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                                  stroke="#9CA3AF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6 9H2V21H6V9Z"
                                  stroke="#9CA3AF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                                  stroke="#9CA3AF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-0.5">
                                LinkedIn
                              </div>
                              <a
                                href={`https://${collegeData.social.linkedin}`}
                                className="text-blue-500 text-xs cursor-pointer"
                              >
                                {collegeData.social.linkedin}
                              </a>
                            </div>
                          </div>

                          <div className="flex">
                            <div className="w-5 mr-2 text-gray-400">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                  stroke="#9CA3AF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M2 12H22"
                                  stroke="#9CA3AF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                                  stroke="#9CA3AF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-0.5">
                                Website
                              </div>
                              <a
                                href={`https://${collegeData.social.website}`}
                                className="text-blue-500 text-xs cursor-pointer"
                              >
                                {collegeData.social.website}
                              </a>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollegeProfile;
