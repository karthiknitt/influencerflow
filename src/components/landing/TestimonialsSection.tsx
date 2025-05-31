"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
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
    hidden: { y: 30, opacity: 0 },
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
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const testimonials = [
    {
      quote: "InfluencerFlow has revolutionized our marketing strategy. We&apos;ve seen a 300% increase in engagement and our ROI has never been better. The AI matching is incredibly accurate.",
      name: 'Sarah Johnson',
      title: 'Marketing Director',
      company: 'Creative Solutions Inc.',
      avatar: '/placeholder-avatar.jpg',
      rating: 5,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      quote: "The platform&apos;s intuitive interface and powerful analytics have saved us countless hours. We can now manage multiple campaigns effortlessly and track performance in real-time.",
      name: 'David Smith',
      title: 'CEO',
      company: 'Innovate Digital',
      avatar: '/placeholder-avatar.jpg',
      rating: 5,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      quote: "What impressed us most is the quality of influencers and the fraud protection. Every collaboration has been authentic and delivered exceptional results for our brand.",
      name: 'Emily Davis',
      title: 'Brand Manager',
      company: 'Global Marketing Group',
      avatar: '/placeholder-avatar.jpg',
      rating: 5,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      quote: "The customer support is outstanding and the platform keeps evolving with new features. It&apos;s become an essential tool for our influencer marketing campaigns.",
      name: 'Michael Chen',
      title: 'Growth Marketing Lead',
      company: 'TechStart Ventures',
      avatar: '/placeholder-avatar.jpg',
      rating: 5,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      quote: "InfluencerFlow&apos;s automation features have streamlined our entire workflow. We&apos;ve reduced campaign setup time by 80% while improving results significantly.",
      name: 'Lisa Rodriguez',
      title: 'Digital Marketing Manager',
      company: 'Fashion Forward',
      avatar: '/placeholder-avatar.jpg',
      rating: 5,
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      quote: "The detailed analytics and reporting capabilities give us insights we never had before. We can now make data-driven decisions that consistently improve our campaigns.",
      name: 'James Wilson',
      title: 'Marketing VP',
      company: 'Lifestyle Brands Co.',
      avatar: '/placeholder-avatar.jpg',
      rating: 5,
      gradient: 'from-pink-500 to-rose-500'
    }
  ];

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:bg-blue-800"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:bg-purple-800"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-900 dark:text-green-300 mb-6">
            💬 Client Stories
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
            Loved by marketing teams
            <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              worldwide
            </span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See what our clients have to say about their experience with InfluencerFlow and the results they&apos;ve achieved.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="group"
            >
              <motion.div variants={cardHoverVariants}>
                <Card className="h-full bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <CardContent className="p-8 relative z-10">
                    {/* Quote Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.gradient} text-white mb-6`}
                    >
                      <Quote className="h-6 w-6" />
                    </motion.div>

                    {/* Rating */}
                    <div className="mb-4">
                      <StarRating rating={testimonial.rating} />
                    </div>
                    
                    {/* Quote */}
                    <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    
                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Avatar className="w-12 h-12 border-2 border-gray-200 dark:border-gray-700">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className={`bg-gradient-to-r ${testimonial.gradient} text-white font-semibold`}>
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-500">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">4.9/5</div>
              <div className="text-gray-600 dark:text-gray-300">Average Rating</div>
              <div className="flex justify-center mt-2">
                <StarRating rating={5} />
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-300">Happy Clients</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">99%</div>
              <div className="text-gray-600 dark:text-gray-300">Retention Rate</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;