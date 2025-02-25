"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ColoredBackgroundWaveScene2 from "@/components/Ui Components/ColoredBackgroundWaveScene2";
import { Button } from "@/components/molecules/shadcn/button";
import { Input } from "@/components/molecules/shadcn/input";
import { Textarea } from "@/components/molecules/shadcn/textarea";
import emailjs from '@emailjs/browser';
import { toast } from "@/components/molecules/shadcn/use-toast";
import { CheckCircle2 } from "lucide-react";

export default function EarlyAccessForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1 });
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        'service_pkzbujv', // Service ID
        'template_c3aq3m2', // Template ID - you'll create this
        formRef.current!, 
        'R-JudV5vFRLMRdefk' // Replace with your EmailJS public key
      );
      
      console.log('Email sent successfully:', result.text);
      
      // Set success state
      setIsSuccess(true);
      
      // Show success message
      toast({
        title: "Success!",
        description: "Your request has been submitted successfully. We'll review your application and get back to you shortly.",
        variant: "default",
        duration: 5000,
        className: "bg-white border-green-100 border-2",
        action: (
          <div className="h-8 w-8 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </div>
        ),
      });
      
      // Reset form
      setFormData({ name: "", email: "", company: "", description: "" });
      
      // Reset success state after a delay
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      
      // Show error message
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-xl mx-auto px-4"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-xl">
          <h1 className="text-4xl font-semibold text-slate-800 mb-2">
            Request Early Access
          </h1>
          <p className="text-slate-600 mb-8">
            Join our exclusive early access program and be among the first to experience our AI-powered simulation platform.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Name
              </label>
              <Input
                type="text"
                name="user_name" // Important: match EmailJS template parameter
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
                name="user_email" // Important: match EmailJS template parameter
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
                name="user_company" // Important: match EmailJS template parameter
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
                name="message" // Important: match EmailJS template parameter
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
            
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-50 border border-green-100 rounded-lg flex items-center gap-3"
              >
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                <p className="text-green-800 text-sm">
                  Your request has been submitted successfully! We'll review your application and get back to you shortly.
                </p>
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  );
} 