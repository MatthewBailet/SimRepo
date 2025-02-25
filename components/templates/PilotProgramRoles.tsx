"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  UserCheck, 
  MessageSquare, 
  Lightbulb,
  Rocket,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/molecules/shadcn/card";
import { Badge } from "@/components/molecules/shadcn/badge";

export default function PilotProgramRoles() {
  const roles = [
    {
      icon: <UserCheck className="h-6 w-6 text-sky-500" />,
      title: "Platform Testing",
      description: "Explore our platform's features and provide feedback on usability, performance, and overall experience.",
      badge: "Early Access",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-sky-500" />,
      title: "Free Access", 
      description: "Gain free access to our platform and services for a limited time.",
      badge: "No Cost",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-sky-500" />,
      title: "Feature Suggestions",
      description: "Contribute ideas for new features and improvements based on your industry experience.",
      badge: "Direct Impact",
    },
    {
      icon: <Rocket className="h-6 w-6 text-sky-500" />,
      title: "Early Adoption",
      description: "Be among the first to use new features and shape the future of business simulation.",
      badge: "Priority Access",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              Program Benefits
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Join our pilot program and get exclusive access to shape the future of business intelligence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group h-full p-6 transition-all duration-300 bg-white/50 backdrop-blur-sm border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-sky-50 group-hover:bg-sky-100 transition-colors duration-300">
                      {role.icon}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-900">{role.title}</h3>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 text-xs">
                          {role.badge}
                        </Badge>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{role.description}</p>
                      <div className="pt-2">
                        <button className="inline-flex items-center text-sky-600 text-sm font-medium hover:text-sky-700 transition-colors duration-200">
                          Learn more
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}