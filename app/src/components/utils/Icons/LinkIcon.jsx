import React from 'react';

export default function LinkIcon({ customClass }) {
  return (
    <svg
      className={customClass}
      width='12'
      height='18'
      viewBox='0 0 12 18'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
    >
      <path
        d='M2 13L10 5'
        stroke='#182CD1'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2 5H10V13'
        stroke='#182CD1'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
