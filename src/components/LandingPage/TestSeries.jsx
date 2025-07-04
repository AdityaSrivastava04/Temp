import React from "react";
import { Rocket, Star, CheckCircle, BarChart2, Clock, BookOpen, Award, TrendingUp, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";

const TestSeries = () => {
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
    { icon: <ClipboardCheck className="w-6 h-6 text-blue-500" />, text: "Mock Tests" },
    { icon: <TrendingUp className="w-6 h-6 text-green-500" />, text: "Performance Tracking" },
    { icon: <BookOpen className="w-6 h-6 text-purple-500" />, text: "Detailed Solutions" },
    { icon: <Clock className="w-6 h-6 text-yellow-500" />, text: "Time Management" },
    { icon: <Award className="w-6 h-6 text-red-500" />, text: "Ranking System" },
    { icon: <BarChart2 className="w-6 h-6 text-indigo-500" />, text: "Skill Analysis" }
  ];

  // Generate floating question papers
  const generateFloatingPapers = () => {
    return [...Array(8)].map((_, i) => (
      <motion.div
        key={`paper-${i}`}
        className="absolute bg-white p-2 rounded shadow-sm flex flex-col items-center"
        style={{
          width: `${Math.random() * 40 + 30}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: 0.7,
          rotate: Math.random() * 30 - 15
        }}
        animate={{
          y: [0, Math.random() * 100 - 50],
          x: [0, Math.random() * 40 - 20],
          rotate: [Math.random() * 10 - 5, Math.random() * 10 + 5],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: Math.random() * 15 + 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-1 bg-gray-200 mb-1"></div>
        <div className="w-full h-1 bg-gray-200 mb-1"></div>
        <div className="w-full h-1 bg-gray-200"></div>
      </motion.div>
    ));
  };

  // Generate progress charts
  const generateProgressCharts = () => {
    return [...Array(5)].map((_, i) => (
      <motion.div
        key={`chart-${i}`}
        className="absolute bg-white bg-opacity-20 rounded-full border border-white border-opacity-30"
        style={{
          width: `${Math.random() * 100 + 50}px`,
          height: `${Math.random() * 100 + 50}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 180]
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-blue-400 bg-opacity-40 rounded-full"
          style={{ height: `${Math.random() * 70 + 30}%` }}
          animate={{
            height: [`${Math.random() * 30 + 30}%`, `${Math.random() * 70 + 30}%`]
          }}
          transition={{
            duration: Math.random() * 8 + 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </motion.div>
    ));
  };

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Background animation elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Floating question papers */}
        {generateFloatingPapers()}
        
        {/* Progress charts */}
        {generateProgressCharts()}
        
        {/* Success stars */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-yellow-400"
            style={{
              fontSize: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 20 - 10],
              x: [0, Math.random() * 20 - 10],
              opacity: [0, 1, 0],
              rotate: [0, 180]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <Star className="w-full h-full" fill="currentColor" />
          </motion.div>
        ))}
      </motion.div>

      <div className="relative flex-grow transition-all w-full z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col items-center justify-center py-12 md:py-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Rocket Animation with placement theme */}
            <motion.div
              className="bg-gradient-to-br from-blue-100 to-blue-200 p-8 rounded-full mb-6 shadow-xl relative"
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
              <motion.div 
                className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 3
                }}
              >
                <TrendingUp className="w-5 h-5" />
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.div 
              className="flex flex-col items-center mb-8 text-center"
              variants={itemVariants}
            >
              <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2">
                Placement Preparation
                <br />
                Test Series
              </h1>
              <div className="w-24 h-1 bg-blue-500 rounded-full mt-4"></div>
            </motion.div>
            
            <motion.p 
              className="text-gray-600 max-w-2xl text-center mb-12 text-lg leading-relaxed"
              variants={itemVariants}
            >
              Ace your campus placements with our comprehensive test series featuring company-specific mock tests, detailed analytics, and performance tracking.
            </motion.p>

            {/* Features Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mb-12"
              variants={containerVariants}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center border border-gray-100 hover:border-blue-200 transition-colors"
                  variants={featureVariants}
                  whileHover="hover"
                >
                  <motion.div 
                    className="mb-4 p-3 rounded-full bg-opacity-20"
                    style={{ backgroundColor: `${feature.icon.props.className.includes('text-blue-500') ? 'rgba(59, 130, 246, 0.1)' :
                                            feature.icon.props.className.includes('text-green-500') ? 'rgba(34, 197, 94, 0.1)' :
                                            feature.icon.props.className.includes('text-purple-500') ? 'rgba(168, 85, 247, 0.1)' :
                                            feature.icon.props.className.includes('text-yellow-500') ? 'rgba(234, 179, 8, 0.1)' :
                                            feature.icon.props.className.includes('text-red-500') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)'}` }}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">{feature.text}</h3>
                  <p className="text-gray-500 text-sm">
                    {feature.text === "Mock Tests" ? "Company-specific practice tests" :
                     feature.text === "Performance Tracking" ? "Monitor your improvement over time" :
                     feature.text === "Detailed Solutions" ? "Step-by-step answer explanations" :
                     feature.text === "Time Management" ? "Practice with timed assessments" :
                     feature.text === "Ranking System" ? "Compare with peers nationwide" :
                     "Identify your strong and weak areas"}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Animated Progress Bar */}
            <motion.div 
              className="max-w-2xl mx-auto bg-white rounded-full h-4 mb-12 overflow-hidden shadow-inner"
              variants={itemVariants}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  ease: "easeOut"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TestSeries;