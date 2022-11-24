import React from 'react'

export default function BookItem({ bookImage, title, author}) {
  return (

          <div className="group relative">
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
              <img
                src={bookImage}
                alt={title}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-md text-gray-700 font-semibold">
                  <a href="/">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {title}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">by <span className='text-primary'>{author}</span></p>
                <p className="mt-1 text-sm text-gray-500">uploaded by <span className='text-primary'>{author}</span></p>
              </div>
            </div>
          </div>
       
  )
}
