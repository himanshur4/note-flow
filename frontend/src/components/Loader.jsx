import { LucideLoader, LucideLoader2, LucideLoaderCircle, LucideLoaderPinwheel } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
     <div className='flex-col flex items-center justify-center gap-4'>
      <LucideLoader className='animate-spin size-10 text-primary mt-40'/>
    </div>
  )
}

export default Loader