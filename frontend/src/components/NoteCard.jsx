import { PenSquareIcon, Trash2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils.js'

const NoteCard = ({note}) => {
  return (
    <Link to={`note/${note._id}`} className='card bg-base-200 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-primary/70'>
      <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/80 line-clamp-3'>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'>
          <span className="text-sm text-base-content/70">{formatDate(new Date(note.createdAt))}</span>
          <div className='flex items-center gap-1'>
            <button className='btn btn-ghost btn-sm  btn-circle'>
            <PenSquareIcon className='size-4'/>
            </button>
            <button className='btn btn-ghost btn-sm text-error btn-circle'>
              <Trash2 className='size-4'/> 
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard