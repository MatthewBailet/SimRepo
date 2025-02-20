"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  UserCheck, 
  MessageSquare, 
  Lightbulb,
  Rocket 
} from "lucide-react";

export default function PilotProgramRoles() {
  const roles = [
    {
      icon: <UserCheck className="h-6 w-6 text-blue-600" />,
      title: "Platform Testing",
      description: "Explore our platform's features and provide feedback on usability, performance, and overall experience.",
      learnMoreText: "Testing Guidelines",
      linkHref: "#",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
      title: "Feedback Sessions", 
      description: "Participate in regular feedback sessions and help us understand your needs and pain points.",
      learnMoreText: "Session Details",
      linkHref: "#",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-blue-600" />,
      title: "Feature Suggestions",
      description: "Contribute ideas for new features and improvements based on your industry experience.",
      learnMoreText: "Suggestion Process",
      linkHref: "#",
    },
    {
      icon: <Rocket className="h-6 w-6 text-blue-600" />,
      title: "Early Adoption",
      description: "Be among the first to use new features and shape the future of business simulation.",
      learnMoreText: "Program Benefits",
      linkHref: "#",
    },
  ];

  return (
    <section className="relative bg-white text-bold overflow-hidden">
      <div className="container relative z-10 px-6 md:px-6 lg:px-20 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-4 tracking-tight pb-8">
            About the Pilot Program
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16 leading-relaxed pb-8">
            We&apos;re launching our pilot program to gather valuable insights and feedback from industry professionals before our full launch. This exclusive pre-launch phase helps us refine our AI simulation platform while giving early adopters special access and benefits.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roles.map((role, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-100 rounded-xl p-6 hover:border-blue-100 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    {role.icon}
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold mb-2 tracking-tight">{role.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{role.description}</p>
                    <a 
                      href={role.linkHref}
                      className="text-blue-600 text-sm hover:text-blue-700 transition-colors duration-200 font-medium"
                    >
                      {role.learnMoreText} →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}