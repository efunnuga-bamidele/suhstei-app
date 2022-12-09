import React from 'react'
// import { Link } from 'react-router-dom'

import './bookitem.css'

export default function BookItem({ bookImage, title, author}) {
  return (

          <div className="group flex flex-col justify-center m-4 place-self-center">
         
            <div className="flex flex-col relative min-h-60 w-70 sm:min-h-60 sm:w-60 aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80 items-center">

              <img
                src={bookImage}
                alt={title}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
             <button type="button" className="btn bottom-3 rounded-lg">
                Review Book
              </button>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-md text-gray-700 font-semibold">
                 
                    {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                    {title}
                
                </h3>
                <p className="mt-1 text-sm text-gray-500">by <span className='text-primary'>{author}</span></p>
                <p className="mt-1 text-sm text-gray-500">uploaded by <span className='text-primary'>{author}</span></p>
              </div>
            </div>
           
          </div>
       
  )
}
