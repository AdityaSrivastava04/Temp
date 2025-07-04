import { useState } from 'react';

const GrievanceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    webPortal: '',
    pageUrl: '',
    complaintDetails: '',
    supportingDocuments: null,
    isNotRobot: false,
    otherDetails: '',
    complaintOptions: {
      belongsToAnotherPerson: false,
      isDefamatory: false,
      isHarmfulToChild: false,
      infringesRights: false,
      violatesLaw: false,
      deceives: false,
      impersonates: false,
      threatens: false,
      containsVirus: false,
      isPatentlyFalse: false,
      others: false
    }
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox' && name in formData.complaintOptions) {
      setFormData(prev => ({
        ...prev,
        complaintOptions: {
          ...prev.complaintOptions,
          [name]: checked
        }
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'file') {
      if (files && files[0]) {
        const file = files[0];
        const validFileTypes = ['image/gif', 'image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
        const fileSize = file.size / 1024 / 1024; // Convert to MB
        
        if (!validFileTypes.includes(file.type)) {
          setFileError('Please upload only GIF, PNG, JPG, JPEG or PDF files.');
          setFileSelected(false);
          setFileName('');
          return;
        }
        
        if (fileSize > 2) {
          setFileError('File size exceeds 2MB limit.');
          setFileSelected(false);
          setFileName('');
          return;
        }
        
        setFileSelected(true);
        setFileName(file.name);
        setFileError('');
        setFormData(prev => ({
          ...prev,
          supportingDocuments: file
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    // In a real app, you would send the data to a server here
    console.log("Form data submitted:", formData);
    setFormSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormSubmitted(false);
      resetForm();
    }, 3000);
  };
  
  const validateForm = () => {
    // Basic validation example
    if (!formData.name || !formData.email || !formData.contactNumber || !formData.webPortal || 
        !formData.pageUrl || !formData.complaintDetails || !formData.isNotRobot) {
      alert("Please fill in all required fields.");
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    
    // Contact number validation (simple example)
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(formData.contactNumber.replace(/\D/g, ''))) {
      alert("Please enter a valid contact number.");
      return false;
    }
    
    // Check if at least one complaint option is selected
    const hasComplaintOption = Object.values(formData.complaintOptions).some(value => value === true);
    if (!hasComplaintOption) {
      alert("Please select at least one reason for your complaint.");
      return false;
    }
    
    return true;
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      contactNumber: '',
      webPortal: '',
      pageUrl: '',
      complaintDetails: '',
      supportingDocuments: null,
      isNotRobot: false,
      otherDetails: '',
      complaintOptions: {
        belongsToAnotherPerson: false,
        isDefamatory: false,
        isHarmfulToChild: false,
        infringesRights: false,
        violatesLaw: false,
        deceives: false,
        impersonates: false,
        threatens: false,
        containsVirus: false,
        isPatentlyFalse: false,
        others: false
      }
    });
    setFileSelected(false);
    setFileName('');
    setFileError('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {formSubmitted ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="text-green-600 text-xl font-medium mb-4">Form submitted successfully!</div>
          <div className="text-gray-600">Thank you for your submission. We will review your grievance shortly.</div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Grievance Form - for Complaints relating to content and Consumer Complaints.</h1>
          <div className="text-right text-sm text-gray-600 mb-4">* Compulsory Fields</div>
          
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Your Name:
              </label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Your E-Mail ID:
              </label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="example@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Your Contact Number:
              </label>
              <input 
                type="tel" 
                name="contactNumber" 
                value={formData.contactNumber} 
                onChange={handleChange} 
                required 
                placeholder="Enter your contact number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Please mark the web portal which hosts the issue(s) encountered by you:
              </label>
              <select 
                name="webPortal" 
                value={formData.webPortal} 
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Select a platform</option>
                <option value="Facebook">Facebook</option>
                <option value="Twitter">Twitter</option>
                <option value="Instagram">Instagram</option>
                <option value="YouTube">YouTube</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="TikTok">TikTok</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Please share the link (URL) of the Page which you are reporting against:
              </label>
              <input 
                type="url" 
                name="pageUrl" 
                value={formData.pageUrl} 
                onChange={handleChange} 
                required 
                placeholder="https://example.com/page"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Please tell us the reason for your complaint/concern:
              </label>
              
              <div className="flex flex-col space-y-3 mt-2 p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="flex items-start space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                  <input 
                    type="checkbox" 
                    id="belongsToAnotherPerson"
                    name="belongsToAnotherPerson" 
                    checked={formData.complaintOptions.belongsToAnotherPerson} 
                    onChange={handleChange} 
                    className="mt-1 cursor-pointer w-4 h-4"
                  />
                  <label htmlFor="belongsToAnotherPerson" className="text-sm leading-tight cursor-pointer">
                    belongs to another person
                  </label>
                </div>

                <div className="flex items-start space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                  <input 
                    type="checkbox" 
                    id="isDefamatory"
                    name="isDefamatory" 
                    checked={formData.complaintOptions.isDefamatory} 
                    onChange={handleChange} 
                    className="mt-1 cursor-pointer w-4 h-4"
                  />
                  <label htmlFor="isDefamatory" className="text-sm leading-tight cursor-pointer">
                    is defamatory, obscene, pornographic, invasive of another's privacy
                  </label>
                </div>

                <div className="flex items-start space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                  <input 
                    type="checkbox" 
                    id="isHarmfulToChild"
                    name="isHarmfulToChild" 
                    checked={formData.complaintOptions.isHarmfulToChild} 
                    onChange={handleChange} 
                    className="mt-1 cursor-pointer w-4 h-4"
                  />
                  <label htmlFor="isHarmfulToChild" className="text-sm leading-tight cursor-pointer">
                    relates to or encourages money laundering or harmful to child
                  </label>
                </div>

                <div className="flex items-start space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                  <input 
                    type="checkbox" 
                    id="infringesRights"
                    name="infringesRights" 
                    checked={formData.complaintOptions.infringesRights} 
                    onChange={handleChange} 
                    className="mt-1 cursor-pointer w-4 h-4"
                  />
                  <label htmlFor="infringesRights" className="text-sm leading-tight cursor-pointer">
                    infringes any patent, trademark, copyright or other proprietary rights
                  </label>
                </div>

                <div className="flex items-start space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                  <input 
                    type="checkbox" 
                    id="impersonates"
                    name="impersonates" 
                    checked={formData.complaintOptions.impersonates} 
                    onChange={handleChange} 
                    className="mt-1 cursor-pointer w-4 h-4"
                  />
                  <label htmlFor="impersonates" className="text-sm leading-tight cursor-pointer">
                    impersonates another person
                  </label>
                </div>

                <div className="flex items-start space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                  <input 
                    type="checkbox" 
                    id="threatens"
                    name="threatens" 
                    checked={formData.complaintOptions.threatens} 
                    onChange={handleChange} 
                    className="mt-1 cursor-pointer w-4 h-4"
                  />
                  <label htmlFor="threatens" className="text-sm leading-tight cursor-pointer">
                    threatens the unity, integrity, defense, security or sovereignty of India
                  </label>
                </div>

                <div className="flex items-start space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                  <input 
                    type="checkbox" 
                    id="containsVirus"
                    name="containsVirus" 
                    checked={formData.complaintOptions.containsVirus} 
                    onChange={handleChange} 
                    className="mt-1 cursor-pointer w-4 h-4"
                  />
                  <label htmlFor="containsVirus" className="text-sm leading-tight cursor-pointer">
                    contains software virus or any other computer code
                  </label>
                </div>
                
                <div className="flex items-start space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                  <input 
                    type="checkbox" 
                    id="others"
                    name="others" 
                    checked={formData.complaintOptions.others} 
                    onChange={handleChange} 
                    className="mt-1 cursor-pointer w-4 h-4"
                  />
                  <div className="flex flex-col">
                    <label htmlFor="others" className="text-sm leading-tight cursor-pointer mb-2">
                      Others (including Consumer Complaints)
                    </label>
                    {formData.complaintOptions.others && (
                      <input 
                        type="text"
                        name="otherDetails"
                        value={formData.otherDetails}
                        onChange={handleChange}
                        placeholder="Please specify details"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Please describe your complaint/concern in detail:
              </label>
              <textarea 
                name="complaintDetails" 
                value={formData.complaintDetails} 
                onChange={handleChange} 
                required 
                placeholder="Please provide all relevant details about your grievance here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Please upload any supporting document(s):
              </label>
              <input 
                type="file"
                id="fileInput"
                name="supportingDocuments"
                onChange={handleChange}
                className="hidden"
                accept=".gif,.png,.jpg,.jpeg,.pdf"
              />
              <div 
                onClick={handleFileButtonClick}
                className="flex items-center justify-between text-sm text-gray-700 border border-gray-300 rounded p-2 bg-gray-50 hover:bg-gray-100 cursor-pointer"
              >
                <span>{fileSelected ? fileName : 'Choose File (No file chosen)'}</span>
                <button 
                  type="button"
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer text-xs"
                >
                  Browse
                </button>
              </div>
              {fileError && <div className="text-xs text-red-500 mt-1">{fileError}</div>}
              <div className="text-xs text-gray-500 mt-1">
                (Please upload a GIF, PNG, JPG, PDF or JPEG file only. [Maximum File Size Limit 2 MB])
              </div>
            </div>

            <div className="mt-4">
              <div className="inline-flex items-center border border-gray-300 rounded-md p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                <div className="flex items-center mr-6">
                  <input 
                    type="checkbox" 
                    id="recaptcha"
                    name="isNotRobot" 
                    checked={formData.isNotRobot} 
                    onChange={handleChange} 
                    required 
                    className="w-5 h-5 mr-2 cursor-pointer"
                  />
                  <label htmlFor="recaptcha" className="text-sm cursor-pointer">I'm not a robot</label>
                </div>
                <div className="flex flex-col">
                  <div className="text-xs font-bold text-gray-600">reCAPTCHA</div>
                  <div className="text-xs text-gray-500">
                    <span className="cursor-pointer hover:underline">Privacy</span> - 
                    <span className="cursor-pointer hover:underline">Terms</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <button 
                type="submit" 
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
              <button 
                type="button" 
                onClick={resetForm}
                className="px-6 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm hover:bg-gray-200 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Reset
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default GrievanceForm;