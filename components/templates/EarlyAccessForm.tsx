"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ColoredBackgroundWaveScene2 from "@/components/Ui Components/ColoredBackgroundWaveScene2";
import { Button } from "@/components/molecules/shadcn/button";
import { Input } from "@/components/molecules/shadcn/input";
import { Textarea } from "@/components/molecules/shadcn/textarea";

export default function EarlyAccessForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would typically send the data to your backend
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    // Reset form
    setFormData({ name: "", email: "", company: "", description: "" });
    setIsSubmitting(false);
    alert("Thank you for your interest! We'll be in touch soon.");
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {inView && (
        <div className="absolute inset-0 -z-8">
          <ColoredBackgroundWaveScene2 color="rgb(247,255,22)" />
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-xl mx-auto px-4"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-xl">
          <h1 className="text-4xl font-semibold text-slate-800 mb-2">
            Request Early Access
          </h1>
          <p className="text-slate-600 mb-8">
            Join our exclusive early access program and be among the first to experience our AI-powered simulation platform.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Name
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Company
              </label>
              <Input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                className="w-full"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                How will you use our platform?
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="w-full"
                placeholder="Tell us about your use case..."
                rows={4}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-slate-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </div>
      </motion.div>
    </section>
  );
} 