import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const BackHeader = ({ title, RightComponent }) => {

  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(-1);
  }
  return (
    <div className="sticky z-50 top-0 glass border-b border-white/10 shadow-2xl backdrop-blur-xl">
      <div className='grid grid-cols-3 items-center max-w-[1400px] w-full mx-auto px-6 py-4 justify-between'>
        <button
          onClick={handleClickBack}
          className="flex items-center gap-1 text-text-muted hover:text-primary transition-colors cursor-pointer group w-fit"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>
        <div className='text-center font-black text-2xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
          {title}
        </div>
        <div className="flex justify-end">
          {RightComponent}
        </div>
      </div>
    </div>
  )
}

export default BackHeader