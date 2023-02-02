import { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from 'uuid'
import { selectCurrentUser } from "../../store/user/user.selector";
import { BorrowBook } from '../../utils/firebase/firebase.utils';
import ButtonComponent from "../button-component/button-component";
import { FallingLines } from "react-loader-spinner";

import { HiOutlineInformationCircle } from "react-icons/hi"
import { Alert, Modal } from 'flowbite-react'

export default function BookComponent({ bookDetails}){
    const { id, book_title, imageUrl, book_category, book_description, book_owner, book_status, book_author, createdAt, owner_id } = bookDetails;
    const currentUser = useSelector(selectCurrentUser);
    const unique_id = uuid();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [bookStatus, setBookStatus] = useState(book_status)
    const [showModal, setShowModal] = useState(false)

    const handleClick = async (requestedBook) => {
      const requestedAt = new Date();
      setShowModal(true)
      const response = await BorrowBook(unique_id, requestedBook, currentUser, requestedAt)

      console.log(response);
      if(response === "success"){
        setSuccess("Book borrowed successful!");
        setBookStatus("Requested");
        setTimeout(() => setSuccess(''), 5000);
        
      }else if(response === "added"){
          setSuccess("Book borrowed successfully!");
          setBookStatus("Requested");
          setTimeout(() => setSuccess(''), 5000);
      }else{
          setError("Failed to borrow book");
          setTimeout(() => setError(''), 5000);
      }
      setShowModal(false)
      }

    return(
        <div className="group flex flex-row max-sm:flex-col justify-start m-2 place-self-center border-2 p-2 rounded-md border-slate-100 ">
            <Fragment>
                    <Modal
                        show={showModal}
                        size="md"
                        popup={true}
                        onClose={showModal}
                        className="max-md:pt-32 mt-10 bg-opacity-60"
                    >
                   
                        <Modal.Body>
                            <div className="grid col-span-full place-items-center h-56"> 
                                <FallingLines
                                    color="#1e94cc"
                                    width="120"
                                    visible={true}
                                    ariaLabel='falling-lines-loading'
                                />               
                            </div>
                        </Modal.Body>
                    </Modal>
                </Fragment>

            <div className="">
                <img
                    src= {imageUrl}
                    alt={book_title} 
                    className="h-[400px] w-[400px] object-contain max-md:object-contain object-center p-4"
                />
            </div>
            <div className="mt-4 max-md:mt-2 max-md:w-[100%] w-[40%]">

                <h2 className="mt-1 text-md text-gray-500"><strong>Title:</strong> <span className='text-blue-600 hover:text-blue-400 hover:border-b-2 hover:border-red-400 cursor-pointer ml-2 font-semibold'>{book_title}</span></h2>
                <h3 className="mt-1 text-md text-gray-500"><strong>Category:</strong> <span className='text-blue-600 hover:text-blue-400 hover:border-b-2 hover:border-red-400 cursor-pointer ml-2 font-semibold'>{book_category}</span></h3>
                <h3 className="mt-1 text-md text-gray-500"><strong>Description:</strong> <span className='text-blue-600 hover:text-blue-400 hover:border-b-2 hover:border-red-400 cursor-pointer ml-2 font-semibold'>{book_description}</span></h3>
                <h4 className="mt-1 text-md text-gray-500"><strong>Book Owner:</strong><span className='text-blue-600 hover:text-blue-400 hover:border-b-2 hover:border-red-400 cursor-pointer ml-2 font-semibold'> {book_owner}</span></h4>
                <p className="mt-1 text-md text-gray-500"><strong>Book Author:</strong> <span className='text-blue-600 hover:text-blue-400 hover:border-b-2 hover:border-red-400 cursor-pointer ml-2 font-semibold'>{book_author}</span></p>
                <p className="mt-1 text-md text-gray-500"><strong>Created Date:</strong> <span className='text-blue-600 hover:text-blue-400 hover:border-b-2 hover:border-red-400 cursor-pointer ml-2 font-semibold'>{createdAt.toDate().toDateString()}</span></p>
                
                {bookStatus && (<p className="mt-1 text-md text-gray-500"><strong>Book Status:</strong> <span className='text-blue-600 hover:text-blue-400 hover:border-b-2 hover:border-red-400 cursor-pointer ml-2 font-semibold'>{bookStatus}</span></p>)}
                
                {bookStatus === 'Available' ? (
                    <ButtonComponent btnColor="blue" btnValue ="Borrow This Book" btnSize="px-7 py-3 mt-2" btnClick={() => handleClick(bookDetails)} />
                    ) : (
                    <ButtonComponent btnColor="blue" btnValue ="Not Available" btnSize="px-7 py-3 mt-2" />
                    )}
                    <div className="mb-6">
                      {error &&
                          <Alert
                              color="failure"
                              icon={HiOutlineInformationCircle}
                          >
                              <span>
                                  {error}!
                              </span>
                          </Alert>
                      }
                      {success &&
                          <Alert
                              color="success"
                              icon={HiOutlineInformationCircle}
                          >
                              <span>
                                  {success}!
                              </span>
                          </Alert>
                      }
                    </div>
            </div>
        </div>
    )
}