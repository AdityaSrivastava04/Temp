import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Rocket, Zap, Star, CheckCircle, BarChart2, Clock, Code } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Assessment = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const rocketVariants = {
    hover: {
      y: [-5, 5, -5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    float: {
      y: [-15, 15],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const featureVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.5
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  const features = [
    { icon: <Zap className="w-6 h-6 text-yellow-500" />, text: "Quick Tests" },
    { icon: <BarChart2 className="w-6 h-6 text-blue-500" />, text: "Real-time Analytics" },
    { icon: <Code className="w-6 h-6 text-purple-500" />, text: "Multi-language Support" },
    { icon: <Clock className="w-6 h-6 text-green-500" />, text: "Timed Assessments" },
    { icon: <Star className="w-6 h-6 text-red-500" />, text: "Skill Evaluation" },
    { icon: <CheckCircle className="w-6 h-6 text-indigo-500" />, text: "Auto-grading" }
  ];

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all w-full">
          <Header />
          
          <div className="container mx-auto px-4">
            <motion.div
              className="flex flex-col items-center justify-center py-12 md:py-20"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Rocket Animation */}
              <motion.div
                className="bg-gradient-to-br from-blue-100 to-blue-200 p-8 rounded-full mb-6 shadow-xl"
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div
                  variants={rocketVariants}
                  animate="float"
                  whileHover={{ scale: 1.1 }}
                >
                  <Rocket className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
                </motion.div>
              </motion.div>

              {/* Text Content */}
              <motion.h2 
                className="text-4xl font-bold text-gray-800 mb-4 text-center"
                variants={itemVariants}
              >
                Next-Gen Assessment Platform
              </motion.h2>
              
              <motion.p 
                className="text-xl text-blue-600 font-medium mb-8"
                variants={itemVariants}
              >
                Launching with Exciting Features!
              </motion.p>
              
              <motion.p 
                className="text-gray-600 max-w-2xl text-center mb-12 text-lg leading-relaxed"
                variants={itemVariants}
              >
                Our advanced assessment system is designed to help you evaluate candidates
                with precision, efficiency, and insightful analytics.
              </motion.p>

              {/* Features Grid */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl"
                variants={containerVariants}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center border border-gray-100"
                    variants={featureVariants}
                    whileHover="hover"
                  >
                    <motion.div 
                      className="mb-4 p-3 rounded-full bg-opacity-20"
                      style={{ backgroundColor: `${feature.icon.props.className.includes('text-yellow-500') ? 'rgba(234, 179, 8, 0.1)' : 
                                              feature.icon.props.className.includes('text-blue-500') ? 'rgba(59, 130, 246, 0.1)' :
                                              feature.icon.props.className.includes('text-purple-500') ? 'rgba(168, 85, 247, 0.1)' :
                                              feature.icon.props.className.includes('text-green-500') ? 'rgba(34, 197, 94, 0.1)' :
                                              feature.icon.props.className.includes('text-red-500') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)'}` }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="font-semibold text-gray-800 text-lg">{feature.text}</h3>
                  </motion.div>
                ))}
              </motion.div>

              
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;