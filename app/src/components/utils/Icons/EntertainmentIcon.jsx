import React from 'react';

export default function EntertainmentIcon({ fill, customClass }) {
  return (
    <svg
      className={customClass}
      width='21'
      height='21'
      viewBox='0 0 21 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.5316 0.792114C5.02659 0.792114 0.558777 5.12454 0.558777 10.4627C0.558777 15.8009 5.02659 20.1333 10.5316 20.1333C16.0366 20.1333 20.5044 15.8009 20.5044 10.4627C20.5044 5.12454 16.0366 0.792114 10.5316 0.792114ZM8.53705 14.8145V6.11093L14.5207 10.4627L8.53705 14.8145Z'
        fill={fill}
      />
    </svg>
  );
}
