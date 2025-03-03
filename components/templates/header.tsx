import { Button } from '@/components/molecules/shadcn/button'
import { NavigationMenuDemo } from '@/components/organisms/shadcn/navigation-menu'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className='w-full top-0 z-50 bg-white backdrop-blur-sm absolute z-40'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <Link 
            href='/' 
            className='flex items-center relative w-[90px] h-[26px] shrink-0'
          >
            <Image 
              src="/simrepo.png" 
              alt="SimRepo Logo" 
              fill
              className='object-contain'
              priority
              draggable={false}
            />
          </Link>

          <nav className='hidden md:flex flex-1 justify-center max-w-2xl mx-4'>
            <NavigationMenuDemo />
          </nav>

          <div className='flex items-center shrink-0'>
            <Link href='/early-access'>
              <Button 
                variant='default' 
                className='bg-sky-950 text-white'
              >
                Request Access
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
