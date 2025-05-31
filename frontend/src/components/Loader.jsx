import { LucideLoader, LucideLoader2, LucideLoaderCircle, LucideLoaderPinwheel } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
     <div className='min-h-screen bg-base-900 flex items-center justify-center'>
      <LucideLoader className='animate-spin size-10'/>
    </div>
  )
}

export default Loader