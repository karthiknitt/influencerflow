"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { CheckIcon, Star, Zap, Crown } from 'lucide-react';

const PricingSection: React.FC = () => {
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
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      frequency: '/month',
      description: 'Perfect for small businesses getting started',
      icon: Star,
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        'Access to 1,000+ influencers',
        'Basic campaign management',
        'Email support',
        'Standard analytics',
        '5 active campaigns'
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: '$99',
      frequency: '/month',
      description: 'Ideal for growing businesses and agencies',
      icon: Zap,
      gradient: 'from-purple-500 to-pink-500',
      features: [
        'Access to 10,000+ influencers',
        'Advanced campaign management',
        'Priority email & chat support',
        'Advanced analytics dashboard',
        'Unlimited campaigns',
        'AI-powered recommendations',
        'Custom reporting'
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      frequency: '',
      description: 'For large organizations with specific needs',
      icon: Crown,
      gradient: 'from-orange-500 to-red-500',
      features: [
        'Access to entire influencer network',
        'Custom influencer discovery',
        'Dedicated account manager',
        'API access & integrations',
        'Advanced reporting & insights',
        'White-label solutions',
        'SLA guarantee',
        'Custom training & onboarding'
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 opacity-30" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 dark:border-purple-800 dark:bg-purple-900 dark:text-purple-300 mb-6">
            💎 Pricing Plans
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
            Choose the perfect plan
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              for your business
            </span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Start free and scale as you grow. All plans include our core features with varying limits and advanced capabilities.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="relative group"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ scale: 0, rotate: -12 }}
                  animate={{ scale: 1, rotate: -12 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </motion.div>
              )}

              <motion.div variants={cardHoverVariants}>
                <Card className={`h-full relative overflow-hidden ${plan.popular ? 'border-2 border-purple-500 shadow-2xl' : 'border border-gray-200 dark:border-gray-700 shadow-lg'} hover:shadow-2xl transition-all duration-300`}>
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <CardHeader className="relative z-10 text-center pb-8">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} text-white mb-4 mx-auto`}
                    >
                      <plan.icon className="h-8 w-8" />
                    </motion.div>
                    
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </CardTitle>
                    
                    <CardDescription className="text-gray-600 dark:text-gray-300 mt-2">
                      {plan.description}
                    </CardDescription>
                    
                    <div className="mt-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
                        className="text-5xl font-bold text-gray-900 dark:text-white"
                      >
                        {plan.price}
                      </motion.div>
                      <div className="text-gray-600 dark:text-gray-300 mt-1">
                        {plan.frequency}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 px-6">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.1) + (featureIndex * 0.1), duration: 0.5 }}
                          className="flex items-start gap-3"
                        >
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5"
                          >
                            <CheckIcon className="h-3 w-3 text-green-600 dark:text-green-400" />
                          </motion.div>
                          <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="relative z-10 pt-8">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full"
                    >
                      <Button 
                        className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-300 ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl' 
                            : 'bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                        }`}
                      >
                        {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-6 py-3 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-full text-green-700 dark:text-green-300"
          >
            <CheckIcon className="h-5 w-5 mr-2" />
            30-day money-back guarantee on all plans
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;