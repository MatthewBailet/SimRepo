import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'
import { Badge } from '@/components/molecules/shadcn/badge'

export default function Footer() {
  return (
    <footer className="border-t bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-18 lg:px-8 lg:py-20">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">SimRepo</h3>
            <p className="text-sm leading-6 text-slate-600 max-w-xs">
              Empowering businesses with AI-driven simulation and intelligence tools for better decision making.
            </p>
            <div className="flex gap-4">
              <Link href="https://twitter.com" className="text-slate-400 hover:text-slate-500">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://github.com" className="text-slate-400 hover:text-slate-500">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="text-slate-400 hover:text-slate-500">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Platform</h3>
                <ul role="list" className="mt-4 space-y-2">
                  <li>
                    <Link href="/features/engine" className="text-sm text-slate-600 hover:text-slate-900">
                      Simulation Engine
                    </Link>
                  </li>
                  <li>
                    <Link href="/features/webscraping" className="text-sm text-slate-600 hover:text-slate-900">
                      Industry Webscraping
                    </Link>
                  </li>
                  <li>
                    <Link href="/features/integrations" className="text-sm text-slate-600 hover:text-slate-900">
                      Integrations
                    </Link>
                  </li>
                  <li>
                    <Link href="/features/reporting" className="text-sm text-slate-600 hover:text-slate-900">
                      Reporting
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-slate-900">Company</h3>
                <ul role="list" className="mt-4 space-y-2">
                  <li>
                    <Link href="/about" className="text-sm text-slate-600 hover:text-slate-900">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/research" className="text-sm text-slate-600 hover:text-slate-900">
                      Research
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-sm text-slate-600 hover:text-slate-900">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm text-slate-600 hover:text-slate-900">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Resources</h3>
                <ul role="list" className="mt-4 space-y-2">
                  <li>
                    <Link href="/documentation" className="text-sm text-slate-600 hover:text-slate-900">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/roadmap" className="text-sm text-slate-600 hover:text-slate-900">
                      Roadmap
                    </Link>
                  </li>
                  <li>
                    <Link href="/api" className="text-sm text-slate-600 hover:text-slate-900">
                      API Reference
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-slate-900">Legal</h3>
                <ul role="list" className="mt-4 space-y-2">
                  <li>
                    <Link href="/privacy" className="text-sm text-slate-600 hover:text-slate-900">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-sm text-slate-600 hover:text-slate-900">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Link href="/pilot-program" className="inline-flex items-center">
                    <Badge variant="secondary" className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-900 gap-1">
                      Join Pilot Program
                      <ArrowRight className="h-3 w-3" />
                    </Badge>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-xs text-slate-600 text-center">
            © 2024 SimRepo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
