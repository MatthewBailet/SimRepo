"use client";

import React from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Button } from '@/components/molecules/shadcn/button'
import { Badge } from '../molecules/shadcn/badge'
import { Input } from '../molecules/shadcn/input'
import { Card } from '../molecules/shadcn/card'
import { Mail } from 'lucide-react'
import ColoredBackgroundWaveScene2 from "@/components/Ui Components/ColoredBackgroundWaveScene2";

export default function WaitingList() {
  const [ref, isInView] = useIntersectionObserver(0.1);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      ref={ref}
      className='relative bg-white py-24 overflow-hidden'
    >
      {isInView && (
        <div className="absolute inset-0 -z-8">
          <ColoredBackgroundWaveScene2 
            color="rgb(111,127,242)"
          />
        </div>
      )}
      
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container relative z-10 px-6 mx-auto"
      >
        <motion.div 
          variants={itemVariants}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200">
            Limited Access
          </Badge>
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            Join Our Early Access Program
          </h2>
          <p className="text-lg text-gray-600">
            Be among the first to experience our AI-powered business intelligence platform.
          </p>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="max-w-md mx-auto"
        >
          <Card className="p-6 border-gray-200 shadow-md bg-white/80 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Request Access</h3>
                  <p className="text-sm text-gray-500">We'll notify you when you're approved</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Input placeholder="name@company.com" type="email" className="border-gray-300" />
                <Input placeholder="Company Name" className="border-gray-300" />
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Join Waitlist
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
