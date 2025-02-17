import { Button } from '@/components/molecules/shadcn/button'
import { Badge } from '../molecules/shadcn/badge'
import { Input } from '../molecules/shadcn/input'

export default function WaitingList() {
  return (
    <section className='bg-gray-100 py-16 md:py-24 lg:py-32'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <Badge className='px-3 py-1 text-sm font-medium'>Join the Newsletter</Badge>
          <h2 className='mt-4 text-3xl font tracking-tight sm:text-4xl md:text-5xl'>
            Want to stay informed on development?
          </h2>
          <p className='mt-4 text-muted-foreground'>
            Sign up for our development newsletter to get up to date insights into the latest project updates
          </p>
          <div className='mt-8 flex justify-center'>
            <div className='flex w-full max-w-md items-center space-x-2'>
              <Input className='flex-1' placeholder='Enter your email' type='email' />
              <Button variant='default'>Join Newsletter</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
