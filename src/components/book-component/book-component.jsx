import React from "react";


export default function BookComponent({ bookDetails}){
    const { id, book_title, imageUrl, book_category, book_description, book_owner, book_status, book_author } = bookDetails;

    const handleClick = (event) => {

    }

    return(
        <div className="flex flex-row justify-center ,2 place-self-center">
            <div>
                <img
                    src= {imageUrl}
                    alt={book_title} 
                    className="h-full w-full object-cover object-center"
                    style={{"height":"100%", "width":"100%"}}
                />
            </div>
            <div>
                <h2>Title: {book_title}</h2>
                <h3>Category: {book_category}</h3>
                <h3>Description: {book_description}</h3>
                <h4>Book Owner: {book_owner}</h4>
                <p className="mt-1 text-sm text-gray-500">Book Author: <span className='text-primary'>{book_author}</span></p>
                
                {book_status &&(<p className="mt-1 text-sm text-gray-500">Book Status: <span className='text-primary'>{book_status}</span></p>)}
                {book_status ==='Available' ? (
              <button type="button" className="btn bottom-3 rounded-lg " onClick={(ev) => handleClick(id)}>
                  Place Reqest Order
                </button>
              ): (
                <button type="button" className="btn bottom-3 rounded-lg" disabled>
                  Not Available
                </button>
              )}
            </div>
        </div>
    )
}