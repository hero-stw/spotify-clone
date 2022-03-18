import React from 'react'

function AlbumController() {
  return (
    <div>
      <div className='px-5 pb-5 pt-7 flex space-x-7 items-center'>
        <div className='w-[60px] h-[60px] bg-[#1ed760] rounded-full flex items-center justify-center'>
          <svg role="img" height="28" width="28" viewBox="0 0 24 24"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z" fill='#000000'></path></svg>
        </div>
        <div>
        <svg role="img" height="32" width="32" viewBox="0 0 24 24"><path d="M8.667 1.912a6.257 6.257 0 00-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 003.09 0l7.956-9.482a6.188 6.188 0 001.382-5.234l-.49.097.49-.099a6.303 6.303 0 00-5.162-4.98h-.002a6.24 6.24 0 00-5.295 1.65.623.623 0 01-.848 0 6.257 6.257 0 00-2.91-1.568z" fill='#1ed760'></path></svg>
        </div>
      </div>
      <div className='grid grid-cols-2 text-gray-500 pt-4 pb-2 px-12'>
        <div className='flex items-center space-x-4'>
          <p className='font-300 text-[0.75rem] tracking-[0.1em]'>#</p>
          <p className='font-300 text-[0.75rem] tracking-[0.1em]'>TITLE</p>
        </div>  
        <div className='flex items-center justify-between ml-auto md:ml-0'>
          <p className='hidden md:inline w-40 font-300 text-[0.75rem] tracking-[0.1em]'>ALBUM</p>
          <p className=''>
            <svg role="img" height="16" width="16" viewBox="0 0 16 16" >
              <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" fill='rgb(107 114 128)'></path>
              <path d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z" fill='rgb(107 114 128)'></path>
            </svg>
            <span className='w-10'></span>
          </p>
        </div>
      </div>
    </div>
      
  )
}

export default AlbumController