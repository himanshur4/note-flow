const NoteCardSkeleton = () => {
  return (
    <div className='card bg-base-200 border-t-4 border-solid border-primary/30'>
      <div className='card-body'>
        <div className='skeleton h-7 w-2/3'></div>
        <div className='skeleton h-4 w-full'></div>
        <div className='skeleton h-4 w-5/6'></div>
        <div className='skeleton h-4 w-24 mt-6'></div>
      </div>
    </div>
  )
}

export default NoteCardSkeleton
