import React from 'react';

export default function Modal({ variant = 'light', children }) {
  // detemine the total background color of the modal
  const bgColor = variant === 'light' ? 'bg-white' : 'bg-gray-500';

  return (
    <div className={`${bgColor} flex flex-col fixed w-full h-screen overflow-hidden`}>
      <div className='flex flex-col items-center text-white absolute w-4/5 max-w-lg px-4 py-8 bg-black z-[9999]  left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-md md:w-1/2 md:px-12'>
        {children}
      </div>
    </div>
  );
}
