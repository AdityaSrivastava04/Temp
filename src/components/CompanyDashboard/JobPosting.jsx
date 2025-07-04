import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Range } from "react-range";

// --- DUMMY DATA ---
const DUMMY_COMPANY_ID = "dummy-company-id-123";

const jobCategories = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "Designer",
  "Marketing",
  "Sales",
];

// RichTextEditor remains unchanged (uses only local state)
const RichTextEditor = ({ value, onChange, placeholder }) => {
  const [description, setDescription] = useState(value || "");
  const editorRef = useRef(null);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const emojis = ["😀", "😊", "👍", "🎉", "❤️", "🔥", "✅", "🚀", "💡", "📊"];

  useEffect(() => {
    if (editorRef.current && value !== undefined && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

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
      if (onChange) onChange(content);
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
    setShowEmojiPicker(false);
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
      setShowLinkDialog(false);
      editorRef.current.focus();
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-2 bg-white">
      <div
        ref={editorRef}
        contentEditable="true"
        onInput={handleInput}
        className="w-full p-2 min-h-24 outline-none text-sm overflow-auto"
        style={{
          minHeight: "6rem",
          listStylePosition: "inside",
        }}
        data-placeholder={placeholder}
        onFocus={(e) => {
          if (e.target.innerHTML === placeholder) {
            e.target.innerHTML = '';
          }
        }}
        onBlur={(e) => {
          if (e.target.innerHTML === '') {
            e.target.innerHTML = placeholder ? `<span class="text-gray-400">${placeholder}</span>` : '';
          }
        }}
      />
      <div className="border-t border-gray-200 pt-2 px-2 flex items-center justify-between">
        <div className="flex space-x-2 relative">
          <button
            type="button"
            className={`text-gray-500 hover:text-gray-700 text-sm ${showEmojiPicker ? "text-blue-500" : ""} cursor-pointer`}
            onClick={() => {
              setShowLinkDialog(false);
              setShowEmojiPicker(!showEmojiPicker);
            }}
          >
            😊
          </button>
          {showEmojiPicker && (
            <div className="absolute top-8 left-0 bg-white shadow-md rounded-lg p-2 z-10 border border-gray-200 min-w-40">
              <div className="grid grid-cols-4 gap-1">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    type="button"
                    className="text-lg hover:bg-gray-100 w-6 h-6 flex items-center justify-center rounded cursor-pointer"
                    onClick={() => insertEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button
            type="button"
            className="text-gray-700 font-bold hover:bg-gray-100 px-1 py-0.5 rounded text-sm cursor-pointer"
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
            className="text-gray-700 italic hover:bg-gray-100 px-1 py-0.5 rounded text-sm cursor-pointer"
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
            className="text-gray-700 hover:bg-gray-100 px-1 py-0.5 rounded text-sm cursor-pointer"
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
            className="text-gray-700 hover:bg-gray-100 px-1 py-0.5 rounded text-sm cursor-pointer"
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
            className={`text-gray-500 hover:text-gray-700 text-sm ${showLinkDialog ? "text-blue-500" : ""} cursor-pointer`}
            onClick={() => {
              setShowEmojiPicker(false);
              setShowLinkDialog(!showLinkDialog);
            }}
          >
            🔗
          </button>
          {showLinkDialog && (
            <div className="absolute top-8 right-0 bg-white shadow-md rounded-lg p-2 z-10 border border-gray-200 w-56">
              <input
                type="text"
                placeholder="Enter link URL"
                className="border p-1 rounded w-full mb-1 text-sm"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter link text (optional)"
                className="border p-1 rounded w-full mb-1 text-sm"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-2 py-0.5 rounded text-sm cursor-pointer"
                onClick={insertLink}
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
  );
};

const JobPosting = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([]);
  const [highestVisitedTab, setHighestVisitedTab] = useState(1);
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [companyId, setCompanyId] = useState("");

  // Simulate fetching company ID
  useEffect(() => {
    setTimeout(() => {
      setCompanyId(DUMMY_COMPANY_ID);
    }, 400);
  }, []);

  useEffect(() => {
    if (activeTab > highestVisitedTab) {
      setHighestVisitedTab(activeTab);
    }
  }, [activeTab, highestVisitedTab]);

  const [salary, setSalary] = useState([5000, 22000]);
  const handleChange = (values) => {
    setSalary(values);
  };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleSelect = (event) => {
    const value = event.target.value;
    if (!selectedCategories.includes(value)) {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const handleRemove = (category) => {
    setSelectedCategories(
      selectedCategories.filter((item) => item !== category)
    );
  };

  const [skills, setSkills] = useState([
    "Graphic Design",
    "Communication",
    "Illustrator",
  ]);
  const [inputValue, setInputValue] = useState("");

  const addSkill = () => {
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      setSkills([...skills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleEmploymentTypeChange = (type) => {
    if (selectedEmploymentTypes.includes(type)) {
      setSelectedEmploymentTypes(
        selectedEmploymentTypes.filter((item) => item !== type)
      );
    } else {
      setSelectedEmploymentTypes([...selectedEmploymentTypes, type]);
    }
  };

  const [jobDescription, setJobDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [niceToHaves, setNiceToHaves] = useState("");

  const [benefits, setBenefits] = useState([
    {
      id: 1,
      icon: "healthcare",
      title: "Full Healthcare",
      description:
        "We believe in thriving communities and that starts with our team being happy and healthy.",
    },
    {
      id: 2,
      icon: "vacation",
      title: "Unlimited Vacation",
      description:
        "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
    },
    {
      id: 3,
      icon: "development",
      title: "Skill Development",
      description:
        "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newBenefit, setNewBenefit] = useState({
    title: "",
    description: "",
    icon: "healthcare",
  });

  const removeBenefit = (id) => {
    setBenefits(benefits.filter((benefit) => benefit.id !== id));
  };

  const addBenefit = () => {
    if (newBenefit.title && newBenefit.description) {
      const id =
        benefits.length > 0 ? Math.max(...benefits.map((b) => b.id)) + 1 : 1;
      setBenefits([...benefits, { ...newBenefit, id }]);
      setNewBenefit({ title: "", description: "", icon: "healthcare" });
      setShowAddForm(false);
    }
  };

  const renderIcon = (iconType) => {
    switch (iconType) {
      case "healthcare":
        return <span role="img" aria-label="healthcare">🏥</span>;
      case "vacation":
        return <span role="img" aria-label="vacation">🏖️</span>;
      case "development":
        return <span role="img" aria-label="development">📚</span>;
      default:
        return null;
    }
  };

  // Simulated submit
  const handleSubmit = () => {
    setError("");
    setSuccess("");
    if (!companyId) {
      setError("No company found. Please create a company profile first.");
      return;
    }
    if (!jobTitle.trim()) {
      setError("Job title is required");
      return;
    }
    if (selectedEmploymentTypes.length === 0) {
      setError("Please select at least one employment type");
      return;
    }
    if (!jobDescription || jobDescription.trim() === "") {
      setError("Job description is required");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess("Job posted successfully (dummy mode)!");
      setActiveTab(1);
      // Reset form if desired
    }, 1200);
  };

  // ...rest of your multi-tab form logic & UI (unchanged, just remove axios)

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
            {error && <div className="mb-2 text-red-600">{error}</div>}
            {success && <div className="mb-2 text-green-600">{success}</div>}
            {/* ...your multi-step form goes here, using the above state */}
            {/* For brevity, not repeating the entire multi-tab UI here—just use your existing form code */}
            {/* On final submit, call handleSubmit */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosting;
