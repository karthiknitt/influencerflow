"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, TrendingUp, Users } from "lucide-react";

const CTASection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 360, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const features = [
    {
      icon: Sparkles,
      text: "AI-Powered Matching",
    },
    {
      icon: TrendingUp,
      text: "Real-time Analytics",
    },
    {
      icon: Users,
      text: "10M+ Influencers",
    },
    {
      icon: Zap,
      text: "Instant Setup",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20"
          animate={{
            scale: [1.5, 1, 1.5],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:60px_60px]" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={floatingVariants}
                animate="animate"
                style={{
                  position: "absolute",
                  top: `${20 + index * 15}%`,
                  left: `${10 + index * 20}%`,
                  animationDelay: `${index * 2}s`,
                }}
                className="hidden lg:block"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white mb-6">
              <Sparkles className="mr-2 h-4 w-4" />
              Ready to Transform Your Marketing?
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white"
          >
            Start Your Success Story
            <span className="block text-yellow-300">Today</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed"
          >
            Join thousands of brands already using InfluencerFlow to achieve
            <br className="hidden md:block" />
            unprecedented growth through influencer marketing.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white border border-white/30"
              >
                <feature.icon className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                Schedule Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-blue-100 mb-4">
              Trusted by 500+ brands worldwide
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              {/* Placeholder for brand logos */}
              <div className="w-20 h-8 bg-white/20 rounded"></div>
              <div className="w-20 h-8 bg-white/20 rounded"></div>
              <div className="w-20 h-8 bg-white/20 rounded"></div>
              <div className="w-20 h-8 bg-white/20 rounded"></div>
            </div>
          </motion.div>

          {/* Guarantee */}
          <motion.div
            variants={itemVariants}
            className="mt-12 inline-flex items-center bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-3 text-green-100 border border-green-400/30"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-400 rounded-full mr-3"
            />
            30-day money-back guarantee • No setup fees • Cancel anytime
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-20 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  );
};

export default CTASection;
