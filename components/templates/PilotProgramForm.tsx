"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/molecules/shadcn/input";
import { Textarea } from "@/components/molecules/shadcn/textarea";
import { Button } from "@/components/molecules/shadcn/button";
import { Card } from "@/components/molecules/shadcn/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/molecules/shadcn/select";

export default function PilotProgramForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    companySize: "",
    industry: "",
    useCase: "",
    timeline: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
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
              Apply for Early Access
            </h2>
            <p className="text-slate-600">
              Join our pilot program and help shape the future of AI-powered business intelligence
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <Input
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Work Email</label>
                <Input
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Company Name</label>
                <Input
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-white/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Your Role</label>
                <Input
                  placeholder="Head of Strategy"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="bg-white/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Company Size</label>
                <Select onValueChange={(value) => setFormData({ ...formData, companySize: value })}>
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
                <Select onValueChange={(value) => setFormData({ ...formData, industry: value })}>
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
              <Select onValueChange={(value) => setFormData({ ...formData, useCase: value })}>
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
              <label className="text-sm font-medium text-slate-700">Implementation Timeline</label>
              <Select onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                <SelectTrigger className="bg-white/50">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="1-3-months">1-3 months</SelectItem>
                  <SelectItem value="3-6-months">3-6 months</SelectItem>
                  <SelectItem value="6-12-months">6-12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Additional Information</label>
              <Textarea
                placeholder="Tell us about your specific needs and how you plan to use our platform..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white/50"
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white">
              Submit Application
            </Button>
          </form>
        </Card>
      </motion.div>
    </section>
  );
} 