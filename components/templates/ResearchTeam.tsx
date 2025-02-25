"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/molecules/shadcn/card";
import { Badge } from "@/components/molecules/shadcn/badge";
import { Linkedin, Twitter } from "lucide-react";

export default function ResearchTeam() {
  const team = [
    {
      name: "Matthew Bailet",
      role: "Founder",
      bio: "I started RepoLabs to help companies make better decisions with data.",
      linkedin: "https://www.linkedin.com/in/matthew-bailet-506618230/",
      twitter: "#"
    },
    {
        name: "Matthew Filippone",
        role: "Research Lead",
        bio: "I have a passion for using data to make better decisions. I also like Pokemon.",
        linkedin: "https://www.linkedin.com/in/matthew-filippone-0ba0b6255/",
        twitter: "#"
      },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-rose-100 text-slate-800 hover:text-white px-3 py-1">
              RepoLabs Team
            </Badge>
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              Meet Our Research Team
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our team of experts brings together diverse backgrounds in AI, data science, and industry expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto px-28">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="max-w-xs justify-center mx-auto"
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full border-slate-200 max-w-xs transition-colors duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-blue-100 rounded-full mb-4 flex items-center justify-center">
                      <span className="text-2xl font-semibold text-blue-500">{member.name.split(' ')[0][0]}{member.name.split(' ')[1][0]}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                    <p className="text-slate-700 text-sm mb-3">{member.role}</p>
                    <p className="text-slate-600 text-sm mb-4">{member.bio}</p>
                    <div className="flex space-x-3">
                      <a href={member.linkedin} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors duration-200">
                        <Linkedin className="h-4 w-4 text-slate-600" />
                      </a>
                  
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