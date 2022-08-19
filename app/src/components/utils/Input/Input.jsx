import React from 'react'

export default function Input({ name = '', handleChange, placeholder = '', type = 'text', required = false, customClass = '' }) {
  return (
    <input type={type} name={name} placeholder={placeholder} required={required} className={`${customClass} text-next-100 w-full p-3 pl-5 bg-sky-50 border border-gray-300 rounded outline-none focus:bg-white focus:border-zinc-800`} onChange={handleChange} />
  )
}
