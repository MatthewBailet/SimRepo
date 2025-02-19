import MountainIcon from '@/components/icons/mountain-icon'
import { Button } from '@/components/molecules/shadcn/button'
import { NavigationMenuDemo } from '@/components/organisms/shadcn/navigation-menu'
import { Github } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className='top-0 left-0 right-0 z-50 bg-white flex items-center justify-between px-6 lg:px-64 py-3 '>
      <Link className='flex items-center ' href='#'>

        <Image src="/simrepo.png" alt="SimRepo Logo" width={90} height={26} />
        
      </Link>
      <nav className='hidden space-x-3 md:flex'>
        <NavigationMenuDemo></NavigationMenuDemo>
      </nav>
      <Link target='_blank' href='https://github.com/kpedrok/nextjs-atomic-shadcn-ui-landing-page'>
        <Button variant='default'>
    
          <p className='pl-1'>Request Access</p>
        </Button>
      </Link>
    </header>
  )
}
