import Footer from '@/components/templates/footer'
import Header from '@/components/templates/header'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@/components/templates/DoubleCardSection'
import { SpeedInsights } from "@vercel/speed-insights/next"
import AppPreviewLayout from '@/components/templates/appPreviewLayout'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
   
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights/>
      </body>
    </html>
  )
}
