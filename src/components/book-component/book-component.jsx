import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

export default function BookComponent({ bookDetails}){
    const { id, book_title, imageUrl, book_category, book_description, book_owner, book_status, book_author, createdAt, owner_id } = bookDetails;
    const currentUser = useSelector(selectCurrentUser);

    const handleClick = (event) => {
      console.log(event)
    }

    return(
        <div className="group flex flex-row max-sm:flex-col justify-start m-2 place-self-center border-2 p-2 rounded-md border-slate-100 ">
            <div className="">
                <img
                    src= {imageUrl}
                    alt={book_title} 
                    className="h-[400px] w-[400px] object-contain max-md:object-contain object-center p-4"
                />
            </div>
            <div className="mt-4 max-md:mt-2">
                <h2 className="mt-1 text-md text-gray-500"><strong>Title:</strong> <span className='text-blue-600 hover:text-blue-400 hover:border-b-2 hover:border-red-400 cursor-pointer ml-2 font-semibold'>{book_title}</span></h2>
                <h3 className="mt-1 text-md text-gray-500"><strong>Category:</strong> <span className='text-blue-600 hover:text-blue-400 hover:border-b-2 hover:border-red-400 cursor-pointer ml-2 font-semibold'>{book_category}</span></h3>
                <h3 className="mt-1 text-md text-gray-500"><strong>Description:</strong> <span className='text-blue-600 hover:text-blue-400 hover:border-b-2 hover:border-red-400 cursor-pointer ml-2 font-semibold'>{book_description}</span></h3>
                <h4 className="mt-1 text-md text-gray-500"><strong>Book Owner:</strong><span className='text-blue-600 hover:text-blue-400 hover:border-b-2 hover:border-red-400 cursor-pointer ml-2 font-semibold'> {book_owner}</span></h4>
                <p className="mt-1 text-md text-gray-500"><strong>Book Author:</strong> <span className='text-blue-600 hover:text-blue-400 hover:border-b-2 hover:border-red-400 cursor-pointer ml-2 font-semibold'>{book_author}</span></p>
                <p className="mt-1 text-md text-gray-500"><strong>Created Date:</strong> <span className='text-blue-600 hover:text-blue-400 hover:border-b-2 hover:border-red-400 cursor-pointer ml-2 font-semibold'>{createdAt.toDate().toDateString()}</span></p>
                
                {book_status && (<p className="mt-1 text-md text-gray-500"><strong>Book Status:</strong> <span className='text-blue-600 hover:text-blue-400 hover:border-b-2 hover:border-red-400 cursor-pointer ml-2 font-semibold'>{book_status}</span></p>)}
                
                {book_status === 'Available' ? (
                    <button 
                      type="button" 
                      className="inline-block px-7 py-3 mt-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      onClick={(ev) => handleClick(bookDetails)}>
                          Borrow This Book
                    </button>
                    ) : (
                    <button 
                      type="button" 
                      className="inline-block px-7 py-3 mt-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light">
                          Not Available
                    </button>
                    )}
            </div>
        </div>
    )
}