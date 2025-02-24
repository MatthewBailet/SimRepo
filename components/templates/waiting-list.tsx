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

      <div className='container relative z-10 mx-auto px-4 md:px-6 lg:px-8'>
        <Card className="max-w-7xl mx-auto bg-white/50 backdrop-blur-sm border-gray-100 p-8 shadow-lg">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <Badge 
                variant="outline" 
                className="bg-blue-50 text-blue-600 border-blue-100"
              >
                Development Updates
              </Badge>
            </div>

            <h2 className='text-3xl font-semibold text-gray-900 mb-4 tracking-tight sm:text-4xl'>
              Stay Informed on Development
            </h2>
            <p className='text-gray-600 mb-8 max-w-xl mx-auto'>
              Join our newsletter to receive exclusive insights into our development process, 
              upcoming features, and early access opportunities.
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='flex justify-center'
            >
              <div className='flex w-full max-w-md items-center space-x-2'>
                <Input 
                  className='flex-1 bg-white/80 border-gray-200 focus:border-blue-300 focus:ring-blue-200' 
                  placeholder='Enter your email' 
                  type='email' 
                />
                <Button className="bg-gray-900 hover:bg-gray-800">
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </Card>
      </div>
    </section>
  )
}
