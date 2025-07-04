import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// User profile images
const user1 = "https://randomuser.me/api/portraits/men/1.jpg";
const user2 = "https://randomuser.me/api/portraits/women/1.jpg";
const user3 = "https://randomuser.me/api/portraits/men/2.jpg";

// Company logos (using higher quality sources)
const googleLogo = "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg";
const appleLogo = "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg";
const intelLogo = "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg";
const microsoftLogo = "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg";
const amazonLogo = "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg";
const deloitteLogo = "https://upload.wikimedia.org/wikipedia/commons/1/12/Deloitte_logo.svg";
const ibmLogo = "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg";
const metaLogo = "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg";
const adobeLogo = "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo.svg";
const ciscoLogo = "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg";
const zomatoLogo = "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.svg";
const tcsLogo = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg";
const netflixLogo = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";
const spotifyLogo = "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg";

const jobs = [
  {
    title: "Technical Support Specialist",
    type: "PART-TIME",
    salary: "20,000 INR - 25,000 INR",
    company: "Google Inc.",
    location: "New Delhi, India",
    applicants: "10+ applicants",
    logo: googleLogo,
    bookmarked: false,
  },
  {
    title: "Senior UI/UX Designer",
    type: "FULL-TIME",
    salary: "$30,000 - $55,000",
    company: "Apple",
    location: "Boston, USA",
    applicants: "9+ applicants",
    logo: appleLogo,
    bookmarked: false,
  },
  {
    title: "Marketing Officer",
    type: "PART-TIME",
    salary: "15,000 INR - 35,000 INR",
    company: "Intel Corp",
    location: "Bangalore, India",
    applicants: "30+ applicants",
    logo: intelLogo,
    bookmarked: false,
  },
  {
    title: "Software Engineer",
    type: "FULL-TIME",
    salary: "$70,000 - $90,000",
    company: "Microsoft",
    location: "Seattle, USA",
    applicants: "20+ applicants",
    logo: microsoftLogo,
    bookmarked: false,
  },
  {
    title: "Data Scientist",
    type: "FULL-TIME",
    salary: "$80,000 - $120,000",
    company: "Amazon",
    location: "San Francisco, USA",
    applicants: "15+ applicants",
    logo: amazonLogo,
    bookmarked: false,
  },
  {
    title: "Business Analyst",
    type: "FULL-TIME",
    salary: "50,000 INR - 70,000 INR",
    company: "Deloitte",
    location: "Mumbai, India",
    applicants: "12+ applicants",
    logo: deloitteLogo,
    bookmarked: false,
  },
  {
    title: "Cloud Engineer",
    type: "FULL-TIME",
    salary: "$85,000 - $110,000",
    company: "IBM",
    location: "Austin, USA",
    applicants: "18+ applicants",
    logo: ibmLogo,
    bookmarked: false,
  },
  {
    title: "Product Manager",
    type: "FULL-TIME",
    salary: "$90,000 - $130,000",
    company: "Meta",
    location: "New York, USA",
    applicants: "25+ applicants",
    logo: metaLogo,
    bookmarked: false,
  },
  {
    title: "Graphic Designer",
    type: "PART-TIME",
    salary: "30,000 INR - 50,000 INR",
    company: "Adobe",
    location: "Pune, India",
    applicants: "8+ applicants",
    logo: adobeLogo,
    bookmarked: false,
  },
  {
    title: "Cybersecurity Analyst",
    type: "FULL-TIME",
    salary: "$75,000 - $100,000",
    company: "Cisco",
    location: "San Diego, USA",
    applicants: "14+ applicants",
    logo: ciscoLogo,
    bookmarked: false,
  },
  {
    title: "Digital Marketing Manager",
    type: "FULL-TIME",
    salary: "40,000 INR - 60,000 INR",
    company: "Zomato",
    location: "Hyderabad, India",
    applicants: "22+ applicants",
    logo: zomatoLogo,
    bookmarked: false,
  },
  {
    title: "HR Executive",
    type: "PART-TIME",
    salary: "25,000 INR - 35,000 INR",
    company: "TCS",
    location: "Chennai, India",
    applicants: "11+ applicants",
    logo: tcsLogo,
    bookmarked: false,
  },
  {
    title: "DevOps Engineer",
    type: "FULL-TIME",
    salary: "$85,000 - $115,000",
    company: "Netflix",
    location: "Los Angeles, USA",
    applicants: "17+ applicants",
    logo: netflixLogo,
    bookmarked: false,
  },
  {
    title: "Frontend Developer",
    type: "FULL-TIME",
    salary: "$60,000 - $80,000",
    company: "Spotify",
    location: "Toronto, Canada",
    applicants: "19+ applicants",
    logo: spotifyLogo,
    bookmarked: false,
  },
];

const Job = () => {
  const navigate = useNavigate();
  const [visibleJobs, setVisibleJobs] = useState(jobs);

  const toggleBookmark = (index) => {
    setVisibleJobs((prevJobs) =>
      prevJobs.map((job, i) =>
        i === index ? { ...job, bookmarked: !job.bookmarked } : job
      )
    );
  };

  // Slick slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="p-20 bg-gray-50">
      <h2 className="text-5xl font-bold text-center text-black">
        Featured Jobs
      </h2>
      <p className="text-gray-500 text-center mb-12 text-xl mt-4">
        Choose jobs from the top employers and apply for the same.
      </p>

      {/* Slider */}
      <Slider {...settings} className="px-4">
        {visibleJobs.map((job, index) => (
          <div key={index} className="p-7">
            <div className="relative p-6 border-2 border-black rounded-lg bg-white shadow-lg min-h-[290px] flex flex-col justify-between hover:shadow-2xl hover:scale-105 transition-all duration-300">
              {/* Bookmark Icon */}
              <div className="absolute top-4 right-4">
                {job.bookmarked ? (
                  <FaBookmark
                    className="text-[#3B8BEB] text-2xl cursor-pointer"
                    onClick={() => toggleBookmark(index)}
                  />
                ) : (
                  <FaRegBookmark
                    className="text-gray-400 text-2xl cursor-pointer"
                    onClick={() => toggleBookmark(index)}
                  />
                )}
              </div>

              {/* Job Title */}
              <h3 className="text-lg font-semibold text-gray-900">
                {job.title}
              </h3>

              {/* Job Type & Salary */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-md ${
                    job.type === "FULL-TIME"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {job.type}
                </span>
                <p className="text-gray-600 text-sm">Salary: {job.salary}</p>
              </div>

              {/* Company & Location */}
              <div className="flex items-center gap-4 mt-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/40";
                      e.target.className = "w-10 h-10 object-cover";
                    }}
                  />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">{job.company}</p>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin size={16} className="text-gray-400" />
                    {job.location}
                  </div>
                </div>
              </div>

              {/* Applicants */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex -space-x-2">
                  <img
                    src={user1}
                    className="w-7 h-7 rounded-full border-2 border-white"
                    alt="Applicant 1"
                  />
                  <img
                    src={user2}
                    className="w-7 h-7 rounded-full border-2 border-white"
                    alt="Applicant 2"
                  />
                  <img
                    src={user3}
                    className="w-7 h-7 rounded-full border-2 border-white"
                    alt="Applicant 3"
                  />
                </div>
                <p className="text-gray-500 text-sm">{job.applicants}</p>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6 gap-4 p-2">
                <button 
                  className="border-2 border-black font-semibold px-3 py-2 rounded-md text-black text-sm w-full hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/job-details/${index}`)}
                >
                  View details
                </button>
                <button className="border-2 border-black font-semibold bg-green-600 text-white px-3 py-2 rounded-md text-sm w-full hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                  Apply now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <p
        className="text-center mt-8 font-semibold cursor-pointer text-2xl"
        onClick={() => navigate("/jobs")}
      >
        View all jobs →
      </p>
    </div>
  );
};

export default Job;