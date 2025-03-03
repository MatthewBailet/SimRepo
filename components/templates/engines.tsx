"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/molecules/shadcn/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/molecules/shadcn/accordion";
import { Gradient } from "whatamesh";

const Engines: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas2Ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Add required CSS variables
    const style = document.createElement('style');
    style.textContent = `
      #ernst1 {
        --gradient-color-1: #c3e4ff;
        --gradient-color-2: #6ec3f4;
        --gradient-color-3: #eae2ff;
        --gradient-color-4: #b9beff;
      }
    `;
    document.head.appendChild(style);

    // Initialize gradient after a small delay to ensure CSS is applied
    const timer = setTimeout(() => {
      if (canvasRef.current) {
        const gradient = new Gradient();
        gradient.initGradient('#ernst1');
      }
    }, 100);

    return () => {
      document.head.removeChild(style);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Add required CSS variables
    const style = document.createElement('style');
    style.textContent = `
      #ernst2 {
        --gradient-color-1: #c3e4ff;
        --gradient-color-2: #6ec3f4;
        --gradient-color-3: #adfff5;
        --gradient-color-4: #8adcff;
      }
    `;
    document.head.appendChild(style);

    // Initialize gradient after a small delay to ensure CSS is applied
    const timer = setTimeout(() => {
      if (canvas2Ref.current) {
        const gradient = new Gradient();
        gradient.initGradient('#ernst2');
      }
    }, 100);

    return () => {
      document.head.removeChild(style);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative min-h-full bg-white text-bold overflow-hidden pb-2 pt-00">
      <div className="container relative z-10 pt-0 px-3">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
              }
            }
          }}
          className="text-center sm:mb:10 md:mb-12 mt-20"
        >
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }} 
            className="text-4xl font-semibold text-slate-800 mb-20 pt-10 mt-10 px-3 md:px-28"
          >
            Meet Our Engines
          </motion.h2>
        </motion.div>

        <div className="flex justify-center items-center gap-12 mt-12 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-gray-200 w-72 h-72 bg-slate-50 rounded-2xl flex-col shadow-lg flex items-center justify-center"
          >
            <canvas
              id="ernst1"
              ref={canvasRef}
              className="inset-0 w-full h-full transition-opacity duration-300 rounded-2xl"
              style={{ 
                '--gradient-color-1': '#ffffff',
                '--gradient-color-2': '#d6eaff',
                '--gradient-color-3': '#ffffff',
                '--gradient-color-4': '#f2f2f2'
              } as React.CSSProperties}
            />
            <div className="absolute">
              <h3 className="text-4xl font-semibold text-slate-800 block">Ernst</h3>
              <p className="text-gray-500 text-md text-center font-medium">Hybrid</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-72 h-72 rounded-2xl shadow-lg flex-col flex items-center justify-center relative overflow-hidden"
          >            
            <canvas
              id="ernst2"
              ref={canvas2Ref}
              className="inset-0 w-full h-full transition-opacity duration-300 rounded-2xl"
              style={{ 
                transform: 'rotate(180deg)'
              } as React.CSSProperties}
            />
            <div className="absolute flex flex-col items-center">
            <Badge className=" font-bold text-xs hover:bg-black text-white bg-slate-800 tracking-wide gap-1.5 -mt-5">
                Beta
              </Badge>
              <h3 className="text-4xl font-semibold text-black text-center">Ernst 2.1</h3>
              
                <p className="text-gray-500 text-md text-center font-medium text-sm ">Deep Reasoning</p>
              
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 pt-10 max-w-2xl mx-auto text-medium"
        >
          <Accordion type="single" collapsible>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>What is an engine?</AccordionTrigger>
                <AccordionContent>
                  In our case, an engine is the assembly and interaction point for all the raw data that is fed into our system through both AI and user data.
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <AccordionItem value="item-2">
                <AccordionTrigger>Are all the engines the same?</AccordionTrigger>
                <AccordionContent>
                  While all our engines are built to handle complex data and simulations, each engine is optimized for specific use cases. Some models have specialized features that may not be necessary for every implementation.
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I choose the right engine?</AccordionTrigger>
                <AccordionContent>
                  The best engine choice depends on your specific needs. Our team can help assess your requirements and recommend the most suitable engine based on factors like data complexity, processing needs, and integration requirements.
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I switch engines later?</AccordionTrigger>
                <AccordionContent>
                  Yes, our platform is designed to be flexible. You can switch between engines or use multiple engines as your needs evolve, with minimal disruption to your existing workflows.
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default Engines; 