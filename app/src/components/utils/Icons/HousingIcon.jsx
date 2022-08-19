import React from 'react';

export default function HousingIcon({ fill, customClass }) {
  return (
    <svg
      className={customClass}
      width='19'
      height='15'
      viewBox='0 0 19 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.75857 14.931V9.77337H11.3045V14.931H15.7368V8.05416H18.3962L9.53152 0.317688L0.666809 8.05416H3.32622V14.931H7.75857Z'
        fill={fill}
      />
    </svg>
  );
}
