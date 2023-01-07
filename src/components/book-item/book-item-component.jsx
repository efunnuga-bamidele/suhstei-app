import React from 'react'
// import { Link } from 'react-router-dom'

import './bookitem.css'

export default function BookItem({ bookImage, title, author, owner, buttonAction, status}) {

  // const imgHover = {
    
  //     background-color: #4CAF50;
  //     color: white;
  //     font-size: 16px;
  //     padding: 16px 32px;
    
  // }
  return (

          <div className="container group flex flex-col justify-center m-2 place-self-center border-2 p-2 rounded-md border-slate-200 "
            style={{"height": '400px', "width": "260px"}}
          >
         
            <div className="flex flex-col relative min-h-60 w-70 sm:min-h-60 sm:w-60 aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80 items-center">

              <img
                src={bookImage}
                alt={title}
                className="bookImg h-full w-full object-cover object-center"
                style={{"height": '100%', "width": "100%"}}
                // className="object-center md:object-cover object-scale-down w-full"
              />
              {status ==='Available' ? (
              <button type="button" className="btn bottom-3 rounded-lg ">
                  {buttonAction}
                </button>
              ): (
                <button type="button" className="btn bottom-3 rounded-lg">
                  View Book
                </button>
              )}

            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700 font-semibold text-clip overflow-hidden">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">by <span className='text-primary'>{author}</span></p>
                <p className="mt-1 text-sm text-gray-500">uploaded by <span className='text-primary'>{owner}</span></p>
                {status &&(<p className="mt-1 text-sm text-gray-500">Status: <span className='text-primary'>{status}</span></p>)}
              </div>
            </div>
           
          </div>
       
  )
}
