import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Subscription plans data
  const subscriptionPlans = [
    {
      name: "Basic",
      price: "₹12,500",
      duration: "1 Month",
      features: [
        "All College Profiles",
        "Up to 4 Tests",
        "Access to all college profiles",
        "Create up to 4 tests",
        "Basic support"
      ],
      testLimit: "Up to 4 Tests",
      buttonText: "Select Plan"
    },
    {
      name: "Pro",
      price: "₹70,000",
      duration: "6 Months",
      features: [
        "All College Profiles",
        "Up to 30 Tests",
        "Access to all college profiles",
        "Create up to 30 tests",
        "Priority support"
      ],
      testLimit: "Up to 30 Tests",
      buttonText: "Select Plan"
    },
    {
      name: "Enterprise",
      price: "₹1,30,000",
      duration: "12 Months",
      features: [
        "All College Profiles",
        "Up to 120 Tests",
        "Access to all college profiles",
        "Create up to 120 tests",
        "24/7 premium support"
      ],
      testLimit: "Up to 120 Tests",
      buttonText: "Select Plan"
    }
  ];

  // Notification data (existing code)
  const notifications = [
    // ... (existing notification data)
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-200 flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          {/* Company Icon */}
          <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center">
            <img
              src="invalid-path.jpg"
              alt="Company Logo"
              className="w-full h-full rounded-md"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>

          {/* Company Text */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">College</span>
            <div className="flex items-center space-x-1">
              <span className="text-lg font-semibold text-gray-900 cursor-pointer">
                KCC
              </span>
              <ChevronDown className="w-3 h-3 text-gray-500 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6 px-3 py-1">
          {/* Subscription Button */}
          <button 
            onClick={() => setShowSubscriptionModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
          >
            Buy Subscription
          </button>

          {/* Notification Icon */}
          <div className="relative">
            <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
              <FaBell className="text-gray-700 w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </div>

            {/* Notification Dropdown (existing code) */}
            {open && (
              <>
                <div
                  className="fixed inset-0 bg-opacity-30 z-40"
                  onClick={() => setOpen(false)}
                ></div>
                <div className="absolute right-0 mt-3 w-[28rem] bg-white shadow-2xl border-gray-100 rounded-lg border p-4 z-50">
                  {/* ... existing notification dropdown content ... */}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center pb-4">
                <h2 className="text-2xl font-bold text-gray-800">Choose a Subscription Plan</h2>
                <button 
                  onClick={() => setShowSubscriptionModal(false)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {subscriptionPlans.map((plan, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-4">{plan.price}</p>
                    
                    <div className="space-y-2 mb-6">
                      <p className="text-gray-700 font-medium">{plan.duration}</p>
                      <p className="text-gray-700 font-medium">{plan.features[0]}</p>
                      <p className="text-gray-700 font-medium">{plan.features[1]}</p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <ul className="space-y-2">
                        {plan.features.slice(2).map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors cursor-pointer">
                      {plan.buttonText}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center border-t pt-6">
                <p className="text-gray-600">
                  Need help choosing a plan? <span className="text-blue-600 hover:underline cursor-pointer">Contact our sales team</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;