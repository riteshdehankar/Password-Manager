import React from 'react'

const Footer = () => {
  return (
    <div className='bg-blue-300 text-black flex flex-col justify-center items-center fixed bottom-0 w-full'>
     <div className="logo font-bold text-white text-2xl ">
          <span className='text-red-700'>&lt;</span>
          <span className='text-white'>Pass</span>
          <span className='text-green-700'>OP/&gt;</span>
        </div>
    <div className='flex font-bold justify-center items-center'>
     Created With <img className=' mx-1 w-7' src="/heart.png" alt="" /> by riteshDehankar
    </div>
    </div>
  )
}

export default Footer
