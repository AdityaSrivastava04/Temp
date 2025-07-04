import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/LandingPage/Home";
import Login from "./components/LandingPage/Login";
import SignUp from "./components/LandingPage/SignUp";
import Dashboard from "./components/AdminDashboard/Dashboard";
import Application from "./components/AdminDashboard/Application";
import Settings from "./components/AdminDashboard/Settings";
import Jobs from "./components/AdminDashboard/Jobs";
import Companies from "./components/AdminDashboard/Companies";
import Profile from "./components/AdminDashboard/Profile";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Help from "./components/AdminDashboard/Help";
import Description from "./components/AdminDashboard/Description";
import CompanyDashboard from "./components/CompanyDashboard/Dashboard";
import CompanyProfile from "./components/CompanyDashboard/Profile";
import Applicant from "./components/CompanyDashboard/Applicant";
import JobListing from "./components/CompanyDashboard/JobListing";
import Schedule from "./components/CompanyDashboard/Schedule";
import CompanySettings from "./components/CompanyDashboard/CompanySettings";
import ApplicantDetail from "./components/CompanyDashboard/ApplicantDetail";
import JobApplicant from "./components/CompanyDashboard/JobApplicant";
import JobPosting from "./components/CompanyDashboard/JobPosting";
import CompanyHelp from "./components/CompanyDashboard/CompanyHelp";
import About from "./components/LandingPage/About";
import Contact from "./components/LandingPage/Contact";
import ScrollToTop from "./components/ScrollToTop";
import CollegeDashboard from "./components/CollegeDashboard/Dashboard";
import Placement from "./components/CollegeDashboard/Placement";
import BrowseCompanies from "./components/CollegeDashboard/Companies";
import BrowseStudents from "./components/CollegeDashboard/Students";
import CompanyDetails from "./components/CollegeDashboard/CompanyProfile";
import StudentProfile from "./components/CollegeDashboard/StudentProfile";
import CollegeProfile from "./components/CollegeDashboard/Profile";
import CollegeSettings from "./components/CollegeDashboard/CollegeSettings";
import CollegeHelp from "./components/CollegeDashboard/CollegeHelp";
import BrowseColleges from "./components/CompanyDashboard/Colleges"
import CollegeDetail from "./components/CompanyDashboard/CollegeDetail";
import CollegeAssessment from "./components/CollegeDashboard/Assessment"
import CompanyWishlist from "./components/CompanyDashboard/Wishlist"
import Terms from "./components/LandingPage/Terms"
import Policy from "./components/LandingPage/Policy";
import Employer from "./components/LandingPage/Employer";
import GrievanceForm from "./components/LandingPage/GrievanceForm";
import SuperAdminDashboard from "./components/SuperAdminDashboard/Dashboard";
import SuperAdminCompany from "./components/SuperAdminDashboard/Company";
import SuperAdminCompanyProfile from "./components/SuperAdminDashboard/CompanyProfile"
import SuperAdminCollege from "./components/SuperAdminDashboard/College"
import SuperAdminCollegeProfile from "./components/SuperAdminDashboard/CollegeProfile"
import SuperAdminCandidate from "./components/SuperAdminDashboard/Candidate"
import SuperAdminCandidateProfile from "./components/SuperAdminDashboard/CandidateProfile"
import Assessment from "./components/SuperAdminDashboard/Assessment";
import AdminLogin from "./components/SuperAdminDashboard/AdminLogin";

// Backend API URL
export const API_URL = "http://localhost:8000/api";

function App() {
  const googleClientId =
    "69056251506-h4u9nd77t85ovk87ufa44jkudt6d5ske.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        {/* Set up Routes */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Application />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />
          <Route path="/description" element={<Description />} />
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/applicants" element={<Applicant />} />
          <Route path="/job-listing" element={<JobListing />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/company-settings" element={<CompanySettings />} />
          <Route path="/applicant-detail" element={<ApplicantDetail />} />
          <Route path="/job-applicant" element={<JobApplicant />} />
          <Route path="/job-posting" element={<JobPosting />} />
          <Route path="/company-help" element={<CompanyHelp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/college-dashboard" element={<CollegeDashboard />} />
          <Route path="/placement-dashboard" element={<Placement />} />
          <Route path="/browse-companies" element={<BrowseCompanies />} />
          <Route path="/browse-students" element={<BrowseStudents />} />
          <Route path="/company-detail" element={<CompanyDetails />} />
          <Route path="/student-detail" element={<StudentProfile />} />
          <Route path="/college-profile" element={<CollegeProfile />} />
          <Route path="/student-detail" element={<StudentProfile />} />
          <Route path="/college-settings" element={<CollegeSettings />} />
          <Route path="/college-help" element={<CollegeHelp />} />
          <Route path="/browse-colleges" element={<BrowseColleges />} />
          <Route path="/college-detail" element={<CollegeDetail />} />
          <Route path="/college-assessment" element={<CollegeAssessment />} />
          <Route path="/company-wishlist" element={<CompanyWishlist />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Policy />} />
          <Route path="/employers" element={<Employer />} />
          <Route path="/grievance" element={<GrievanceForm />} />
          <Route path="/admin-dashboard" element={<SuperAdminDashboard />} />
          <Route path="/company" element={<SuperAdminCompany />} />
          <Route path="/company-data" element={<SuperAdminCompanyProfile />} />
          <Route path="/college" element={<SuperAdminCollege />} />
          <Route path="/college-data" element={<SuperAdminCollegeProfile />} />
          <Route path="/candidate" element={<SuperAdminCandidate />} />
          <Route path="/candidate-data" element={<SuperAdminCandidateProfile />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
