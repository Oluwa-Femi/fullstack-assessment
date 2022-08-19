import React from 'react';

export default function Table({ children, customClass = '' }) {
  return (
    <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
      <div className='py-2 inline-block min-w-full sm:px-6 md:px-8'>
        <div className='overflow-hidden rounded-lg shadow-sm'>
          <table className={`${customClass} flex flex-col w-full`}>
            {children}
          </table>
        </div>
      </div>
    </div>
  );
}
