"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/molecules/shadcn/card";
import { Badge } from "@/components/molecules/shadcn/badge";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export default function ResearchPapers() {
  const papers = [
    {
      title: "Predictive Analytics in Market Forecasting",
      authors: "Matthew Bailet, Matthew Filippone",
      date: "February 2025",
      abstract: "This paper explores novel approaches to market forecasting using transformer-based neural networks trained on multi-modal industry data.",
      tags: ["AI", "Forecasting", "Neural Networks"],
      downloadUrl: "#",
      imageUrl: "/images/research/paper1.jpg",
      color: "blue"
    },
    {
        title: "ARIMA Model use in Large Language Modeling Parameter use",
        authors: "Matthew Bailet",
        date: "February 2025",
        abstract: "This paper explores novel approaches to market forecasting using transformer-based neural networks trained on multi-modal industry data.",
        tags: ["AI", "Forecasting", "Neural Networks"],
        downloadUrl: "#",
        imageUrl: "/images/research/paper1.jpg"
      },

  ];

  return (
    <section id="research-papers" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-2xl font-medium text-slate-900 mb-4">
              Latest Research
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Explore our latest publications and findings in the field of AI-driven business intelligence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-0 place-items-center px-48">
            {papers.map((paper, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="max-w-sm h-full"
              >
                <Card className="overflow-hidden h-full flex flex-col border-slate-200 transition-colors duration-300">
                  <div className="h-48 bg-slate-100 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-100/80 to-slate-100/40"></div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-white/80 text-blue-700 backdrop-blur-sm">
                        RepoLabs
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-2">
                      {paper.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="mr-2 mb-2 text-xs border-slate-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{paper.title}</h3>
                    <p className="text-sm text-blue-600 mb-4">{paper.authors} • {paper.date}</p>
                    <p className="text-slate-600 text-sm mb-6 flex-1">{paper.abstract}</p>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <Link href={paper.downloadUrl} className="inline-flex items-center text-slate-600 text-sm font-medium hover:text-blue-700 transition-colors duration-200">
                        Read paper
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                      
                      <Link href={paper.downloadUrl} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors duration-200">
                        <Download className="h-4 w-4 text-slate-600" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/research/archive" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200">
              View all research papers
              <ArrowRight className="ml-1 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 