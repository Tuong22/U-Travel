import React from 'react'

export const CustomButton = ({ title, onClick }) => {
  return (
    <div className="text-center">
      <button onClick={onClick} className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-full transition-colors duration-200">
        {title}
      </button>
    </div>
  )
}
