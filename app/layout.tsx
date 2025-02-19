import Footer from '@/components/templates/footer'
import Header from '@/components/templates/header'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@/components/templates/DoubleCardSection'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SimRepo - Fast and Accurate',
  description: 'An open-source landing page template built with Next.js and all shadcn/ui components.',
  icons: '/favicon.svg',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div >
        <Header></Header>
        <main>{children}</main>
        <Footer></Footer>

        </div>
       
        
        <Analytics />
      </body>
    </html>
  )
}
