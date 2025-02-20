import { Button } from '@/components/molecules/shadcn/button'
import { NavigationMenuDemo } from '@/components/organisms/shadcn/navigation-menu'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className='text-slate-900 absolute top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm '>
      <div className='flex items-center justify-between px-4 sm:px-6 lg:px-72 py-3 max-w-[1920px] mx-auto'>
        <Link 
          href='#' 
          className='flex items-center relative w-[90px] h-[26px] min-w-[90px]'
        >
          <Image 
            src="/simrepo.png" 
            alt="SimRepo Logo" 
            fill
            className='object-contain'
            priority
          />
        </Link>

        <nav className='hidden md:flex flex-1 justify-center max-w-2xl z-[60]'>
          <NavigationMenuDemo />
        </nav>

        <div className='flex items-center'>
          <Button 
            variant='default' 
            className='bg-slate-900 text-white whitespace-nowrap'
          >
            Request Access
          </Button>
        </div>
      </div>
    </header>
  )
}
