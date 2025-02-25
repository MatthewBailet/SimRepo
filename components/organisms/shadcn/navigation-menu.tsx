'use client'

import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { Info, Layers, Users, Code2, FlaskConical, BookOpen, Mail, BarChart2, Settings, Building2, Cpu, Sparkles, Rocket, ArrowRight } from 'lucide-react'

import { AspectRatio } from '@/components/molecules/shadcn/aspect-ratio'

import EngineCard from '@/components/Ui Components/EngineCard'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/molecules/shadcn/navigation-menu'
import { cn } from '@/lib/utils'
import EngineCard3 from '@/components/Ui Components/BannerEngineCard'
import { motion } from 'framer-motion'

const services = {
  payments: [
    {
      title: "Our Platform",
      href: "/platform",
      description: "Access our comprehensive business intelligence suite",
      icon: <Layers className="h-5 w-5" />,
    },
    {
      title: "Consulting",
      href: "/consulting",
      description: "Expert guidance for your business needs",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "API",
      href: "/api",
      description: "Integrate our services into your workflow",
      icon: <Code2 className="h-5 w-5" />,
    },
  ],
  features: [
    {
      title: "Simulation Engine",
      href: "/features/engine",
      description: "Advanced modeling for business scenarios",
      icon: <Cpu className="h-5 w-5" />,
    },
    {
      title: "Industry Webscraping",
      href: "/features/webscraping",
      description: "Real-time market data collection",
      icon: <Mail className="h-5 w-5" />,
    },
    {
      title: "Integrations",
      href: "/features/integrations", 
      description: "Seamless connection with your tools",
      icon: <Mail className="h-5 w-5" />,
    },
    {
      title: "Reporting",
      href: "/features/reporting",
      description: "Comprehensive insights and analytics",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: "Automation",
      href: "/features/automation",
      description: "Streamline your business processes",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: "Organizations",
      href: "/features/organizations",
      description: "Team and access management",
      icon: <Building2 className="h-5 w-5" />,
    },
  ],
};

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-1.5 font-medium">
            
            What is SimRepo?
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2.5 py-5 px-4 w-[380px] list-none">
              <ListItem 
                href="/about" 
                title="About Us" 
                icon={<Info className="h-5 w-5 text-blue-600" />}
                className="hover:bg-blue-50/70"
              >
                Learn about our mission and vision
              </ListItem>
              <ListItem 
                href="/research" 
                title="Research" 
                icon={<FlaskConical className="h-5 w-5 text-blue-600" />}
                className="hover:bg-blue-50/70"
              >
                Explore our methodologies and papers
              </ListItem>
              <ListItem 
                href="/blog" 
                title="Blog" 
                icon={<BookOpen className="h-5 w-5 text-emerald-600" />}
                className="hover:bg-emerald-50/70"
              >
                Latest insights and updates
              </ListItem>
              <ListItem 
                href="/contact" 
                title="Contact Us" 
                icon={<Mail className="h-5 w-5 text-purple-600" />}
                className="hover:bg-purple-50/70"
              >
                Get in touch with our team
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-1 font-medium">
            
            Our Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[880px] p-5">
              <div className="grid grid-cols-5 gap-6">
                {/* Left Panel */}
                <div className="col-span-2">
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-xs text-gray-400">Core Services</h3>
                    <div className="space-y-4">
                      {services.payments.map((item) => (
                        <NavigationMenuLink key={item.title} asChild>
                          <Link href={item.href} className="group block">
                            <div className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50">
                              <div className="flex-shrink-0">
                                <div className="pt-5 px-2">{item.icon}</div>
                              </div>
                              <div>
                                <div className="font-semibold text-xs text-gray-900 mb-1">{item.title}</div>
                                <p className="text-xs text-gray-500 leading-snug">{item.description}</p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Panel */}
                <div className="col-span-3">
                  <h3 className="font-medium mb-2 text-xs text-gray-400">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {services.features.map((item) => (
                      <NavigationMenuLink key={item.title} asChild>
                        <Link href={item.href} className="group block">
                          <div className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50">
                            <div className="flex-shrink-0">
                              <div className="pt-4 px-2">{item.icon}</div>
                            </div>
                            <div>
                              <div className="font-medium text-xs text-gray-900 mb-1">{item.title}</div>
                              <p className="text-xs text-gray-500 leading-snug">{item.description}</p>
                            </div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </div>
              </div>

              {/* Banner Section */}
              <div className="mt-6 pt-6 border-t">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="relative overflow-hidden rounded-lg py-2 px-2"
                >
                  <EngineCard3 />
                </motion.div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href='/roadmap' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Roadmap</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link href='/documentation' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Documentation</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
       
        
        <NavigationMenuItem>
          <Link href='/' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact Us</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'> & { icon?: React.ReactNode }>(
  ({ className, title, children, icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}>
            <div className="flex items-center gap-2">
              {icon}
              <div className="text-sm font-medium leading-none">{title}</div>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'
