import React from 'react'

export default function BookItem({ bookImage, title, author}) {
  return (
    <div className="max-w-[290px] m-2">
        <div className="flex justify-center">
            <div className="rounded-lg shadow-lg bg-white max-w-sm">
            <img className="h-48 w-96 object-contain rounded-lg p-2" src={bookImage} alt=""/>
            <div className="p-6">
                <h5 className="text-gray-900 text-xl font-medium mb-2">{title}</h5>
                <p className="text-gray-700 text-base mb-4">
                by <span className='text-primary'>{author}</span>
                </p>
                <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
            </div>
            </div>
        </div>
    </div>
  )
}
