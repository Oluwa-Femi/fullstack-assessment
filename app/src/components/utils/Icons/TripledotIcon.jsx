import React from 'react';

export default function TripledotIcon({ fill, customClass }) {
  return (
    <svg
      className={customClass}
      width='28'
      height='6'
      viewBox='0 0 28 6'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <ellipse
        cx='3.04952'
        cy='2.68627'
        rx='2.77022'
        ry='2.68627'
        fill={fill}
      />
      <ellipse
        cx='14.1305'
        cy='2.68627'
        rx='2.77022'
        ry='2.68627'
        fill={fill}
      />
      <ellipse
        cx='25.2114'
        cy='2.68627'
        rx='2.77022'
        ry='2.68627'
        fill={fill}
      />
    </svg>
  );
}
