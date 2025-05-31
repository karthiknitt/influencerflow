"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Search, 
  BarChart3, 
  MessageSquare, 
  Shield, 
  Zap,
  Users,
  Target,
  TrendingUp
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Our advanced AI algorithms analyze millions of data points to find the perfect influencers for your brand.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Search,
      title: "Smart Discovery",
      description: "Discover hidden gems and trending influencers across all major social platforms with intelligent search.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track campaign performance with comprehensive analytics and actionable insights in real-time.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: MessageSquare,
      title: "Seamless Communication",
      description: "Built-in messaging system to communicate with influencers and manage collaborations effortlessly.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Shield,
      title: "Fraud Protection",
      description: "Advanced fraud detection algorithms protect your campaigns from fake followers and engagement.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "Automated Workflows",
      description: "Streamline your influencer marketing with automated campaign management and approval processes.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const stats = [
    {
      icon: Users,
      number: "10M+",
      label: "Influencers",
      description: "Global network"
    },
    {
      icon: Target,
      number: "98%",
      label: "Match Accuracy",
      description: "AI precision"
    },
    {
      icon: TrendingUp,
      number: "300%",
      label: "ROI Increase",
      description: "Average boost"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 opacity-50" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-900 dark:text-blue-300 mb-6">
            <Zap className="mr-2 h-4 w-4" />
            Powerful Features
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Everything you need to
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              succeed with influencers
            </span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From discovery to analytics, our comprehensive platform provides all the tools you need to run successful influencer marketing campaigns.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={cardHoverVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 h-full hover:shadow-2xl transition-shadow duration-300"
              >
                <motion.div
                  variants={iconVariants}
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-6`}
                >
                  <feature.icon className="h-6 w-6" />
                </motion.div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by industry leaders
            </h3>
            <p className="text-xl text-blue-100">
              Join thousands of brands achieving exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4"
                >
                  <stat.icon className="h-8 w-8" />
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
                  className="text-4xl md:text-5xl font-bold mb-2"
                >
                  {stat.number}
                </motion.div>
                
                <div className="text-xl font-semibold mb-1">{stat.label}</div>
                <div className="text-blue-100">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;