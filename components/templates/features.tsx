"use client"

import React, { useRef } from "react"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Badge } from "../molecules/shadcn/badge"
import { Check } from "lucide-react"
import "./features.css"


// --------------------
// Features Section Component
// --------------------
export default function Features() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-white text-black overflow-hidden">
      {/* Understated Wave Background */}
      <div className="absolute inset-0 -z-10 opacity-20">
       
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Left Column: 2x2 Animated Counter Grid */}
         
          {/* Right Column: Existing Feature Content */}
          <div className="space-y-6">
            <Badge variant="default" className="px-3 py-1 text-sm">
              New Features
            </Badge>
            <h2 className="text-3xl font tracking-tight sm:text-4xl md:text-5xl">
              Elevate your business with our cutting-edge features
            </h2>
            <p className="text-muted-foreground">
              Our platform offers a suite of powerful features to help you streamline your workflows and drive your business forward.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2">
                <Check className="h-6 w-6 text-black" />
                <div>
                  <h3 className="text-lg font">Advanced Analytics</h3>
                  <p className="text-muted-foreground">
                    Gain deeper insights into your data with our robust analytics tools.
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-6 w-6 text-black" />
                <div>
                  <h3 className="text-lg font">Seamless Collaboration</h3>
                  <p className="text-muted-foreground">
                    Empower your team to work together more efficiently with our collaboration features.
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-6 w-6 text-black" />
                <div>
                  <h3 className="text-lg font">Scalable Infrastructure</h3>
                  <p className="text-muted-foreground">
                    Easily scale your application with our reliable and high-performance infrastructure.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
