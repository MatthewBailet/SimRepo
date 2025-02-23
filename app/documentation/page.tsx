"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/molecules/shadcn/skeleton";
import { InfoIcon, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/molecules/shadcn/alert";
import { Button } from "@/components/molecules/shadcn/button";

export default function Documentation() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto">
        <div className="flex min-h-screen pt-20">
          {/* Sidebar Skeleton */}
          <div className="w-64 border-r border-gray-100 p-4 shrink-0">
            <Skeleton className="h-8 w-[80%] mb-8" />
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-[60%]" />
                  <div className="pl-4 space-y-2">
                    <Skeleton className="h-3 w-[40%]" />
                    <Skeleton className="h-3 w-[50%]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1 p-8">
            <div className="max-w-4xl">
              <Skeleton className="h-12 w-[60%] mb-6" />
              <div className="space-y-4 mb-8">
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[85%]" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-[120px] w-full" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-[100px] w-full" />
                  <Skeleton className="h-[100px] w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay Alert */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95  }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{  delay: 1 }}
          className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-10 px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 border border-gray-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <InfoIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Documentation Access</h2>
                <p className="text-gray-600 text-sm mt-1">Early Access Members Only</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Our documentation is currently limited to early access members. 
                Join our pilot program to unlock full access to our documentation and platform features.
              </p>
              <div className="pt-2">
                <Button 
                  onClick={() => router.push('/')}
                  className="bg-slate-800 hover:bg-slate-700 text-white w-full flex items-center justify-center gap-2 h-10"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Return to Homepage
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}