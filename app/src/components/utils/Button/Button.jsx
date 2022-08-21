import React from 'react'

export default function Button({ children, disabled = false, type = 'button', name = '', variant, customClass = '', handleClick = () => null }) {
  const style = variant === 'dark' ?  'bg-blue-700 text-white disabled:text-gray-200 disabled:bg-blue-300'  :  'bg-white text-blue-700 disabled:text-white disabled:bg-gray-200';
  return (
    <button disabled={disabled} type={type} name={name} className={`${variant ? style : ''} flex flex-col items-center w-full px-6 py-4 rounded-md disabled:cursor-not-allowed ${customClass}`} onClick={handleClick}>
      {children}
    </button>
  )
}
