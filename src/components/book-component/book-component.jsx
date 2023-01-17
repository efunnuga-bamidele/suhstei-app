import React from "react";


export default function BookComponent({ bookDetails}){
    const { id, book_title, imageUrl, book_category, book_description, book_owner, book_status, book_author } = bookDetails;

    const handleClick = (event) => {

    }

    return(
        <div className="flex flex-row max-md:flex-col justify-start place-self-center bg-slate-300 m-4 pl-20 max-md:pl-4">
            <div className="">
                <img
                    src= {imageUrl}
                    alt={book_title} 
                    className="h-[400px] w-[100%] max-md:h-[400px] object-cover max-md:object-contain object-center p-4"
                    // style={{"height":"400px", "width":"100%"}}
                />
            </div>
            <div className="mt-4 max-md:mt-2">
                <h2>Title: {book_title}</h2>
                <h3>Category: {book_category}</h3>
                <h3>Description: {book_description}</h3>
                <h4>Book Owner: {book_owner}</h4>
                <p className="mt-1 text-sm text-gray-500">Book Author: <span className='text-primary'>{book_author}</span></p>
                
                {book_status &&(<p className="mt-1 text-sm text-gray-500">Book Status: <span className='text-primary'>{book_status}</span></p>)}
                
                {book_status =='Available' ? (
                    <button 
                      type="button" 
                      className="inline-block px-7 py-3 mt-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      onClick={(ev) => handleClick(id)}>
                          Place Reqest Order
                    </button>
                  ): (
                    <button 
                      type="button" 
                      className="inline-block px-7 py-3 mt-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      disabled>
                        Not Available
                    </button>
                  )}
            </div>
        </div>
    )
}