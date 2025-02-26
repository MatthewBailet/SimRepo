"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/molecules/shadcn/input";
import { Textarea } from "@/components/molecules/shadcn/textarea";
import { Button } from "@/components/molecules/shadcn/button";
import { Card } from "@/components/molecules/shadcn/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/molecules/shadcn/select";
import emailjs from '@emailjs/browser';
import { toast } from "@/components/molecules/shadcn/use-toast";
import { CheckCircle2 } from "lucide-react";

export default function PilotProgramForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    companySize: "",
    industry: "",
    useCase: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
      const templateParams = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        role: formData.role,
        companySize: formData.companySize,
        industry: formData.industry,
        useCase: formData.useCase,
        message: formData.message
      };

      const result = await emailjs.send(
        'service_pkzbujv',
        'template_orge4el',
        templateParams,
        'R-JudV5vFRLMRdefk'
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
      setFormData({ name: "", email: "", company: "", role: "", companySize: "", industry: "", useCase: "", message: "" });
      
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
    <section className="py-20 px-6 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="p-8 md:p-12 backdrop-blur-sm bg-white/90 border-slate-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-3 text-slate-900">
              Apply for the Pilot Program
            </h2>
            <p className="text-slate-600">
              Join us in shaping the future of business simulation technology
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <Input
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/50"
                  name="name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <Input
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/50"
                  name="email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Company Name</label>
                <Input
                  placeholder="Company Inc."
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-white/50"
                  name="company"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Your Role</label>
                <Input
                  placeholder="CEO, Manager, etc."
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="bg-white/50"
                  name="role"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Company Size</label>
                <Select name="companySize" onValueChange={(value) => setFormData({ ...formData, companySize: value })}>
                  <SelectTrigger className="bg-white/50">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501+">501+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Industry</label>
                <Select name="industry" onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                  <SelectTrigger className="bg-white/50">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="finance">Finance & Banking</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail & E-commerce</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Primary Use Case</label>
              <Select name="useCase" onValueChange={(value) => setFormData({ ...formData, useCase: value })}>
                <SelectTrigger className="bg-white/50">
                  <SelectValue placeholder="Select primary use case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market-analysis">Market Analysis</SelectItem>
                  <SelectItem value="risk-assessment">Risk Assessment</SelectItem>
                  <SelectItem value="competitive-intelligence">Competitive Intelligence</SelectItem>
                  <SelectItem value="strategic-planning">Strategic Planning</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Additional Information</label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white/50"
                rows={4}
                name="message"
                placeholder="Tell us about your business needs and what you&apos;re looking to achieve with our platform"
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Submit Application
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
        </Card>
      </motion.div>
    </section>
  );
} 