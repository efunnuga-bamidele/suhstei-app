import { useEffect, useState, Fragment } from "react";
import Footer from "../../components/footer/footer.component";
import Navigation from "../../components/navigation/navigation.component";
import SidebarNavigation from "../../components/sidebar/sidebar.component";
import { deleteBook, getUserBooks } from "../../utils/firebase/firebase.utils";
import{ FiEdit } from "react-icons/fi"
import{ RiDeleteBin6Line } from "react-icons/ri"
import {HiOutlineExclamationCircle} from "react-icons/hi"
import { FallingLines } from 'react-loader-spinner'

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../book/user/user.selector";

import BookItem from "../../components/book-item/book-item-component";

import { Button, Modal, Tooltip} from "flowbite-react";

export default function MyBooksPage(){

    // const dispatch = useDispatch();
    // const myBooksMap = useSelector(selectMyBooksMap);
    const [myBooks, setMyBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalResponse, setModalResponse] = useState(null);
    const [itemData, setItemData] = useState([]);
    const currentUser = useSelector(selectCurrentUser);
    

    

    useEffect(() => {
      
        const getBooks = async () => {

            const books = await getUserBooks(currentUser.uid);
            setMyBooks(books.mybooks)
            setIsLoading(false)
        }
        getBooks()
       
    },[myBooks])

    const handleBookEdit = (el) => {
        console.log(el)
    }

    const handleModal = (el, imageUrl) => {
        setShowModal(showModal ? false : true)
        // console.log(itemData)
        setItemData({el, imageUrl})
        
    }
    const handleDeleteResponse = async (event) => {
            if (event === "Yes"){
                const modifyedBooks = myBooks.filter((item) => item.id !== itemData['el'])
                await deleteBook(currentUser.uid, modifyedBooks, itemData['imageUrl'])
                setItemData(null)
            }
            // setItemData((previousArr) => (previousArr.slice(0, -1)))
            setShowModal(showModal ? false : true)
            
            // console.log(itemData)
    }

    return(
        <div className='bg-gray-100 font-body scroll-smooth h-0'>
        <Navigation />
            <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap">
                            <Fragment>
                            <Modal
                                show={showModal}
                                size="md"
                                popup={true}
                                onClose={handleModal}
                                className="max-md:pt-32 mt-10"
                            >
                                <Modal.Header />
                                <Modal.Body>
                                <div className="text-center">
                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this book?
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                    <Button
                                        color="failure"
                                        onClick={() => handleDeleteResponse("Yes")}
                                    >
                                        Yes, I'm sure
                                    </Button>
                                    <Button
                                        color="gray"
                                        onClick={() => handleDeleteResponse("No") }
                                    >
                                        No, cancel
                                    </Button>
                                    </div>
                                </div>
                                </Modal.Body>
                            </Modal>
                            </Fragment>
                    <SidebarNavigation/>
                    <section className="bg-white mt-12 m-2 p-2 w-full rounded-md">
                    {/* <section className='bg-gray-100 mt-20'> */}
                        <h1 className="font-bold text-xl text-center underline text-slate-500">My Books</h1>
                        <div className='overflow-x-hidden grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 px-2'>{/* */}
                            {isLoading ? (
                                    <div className="grid col-span-full place-items-center h-56"> 
                                 
                                        <FallingLines
                                            color="#1e94cc"
                                            width="100"
                                            visible={true}
                                            ariaLabel='falling-lines-loading'
                                            />
                                    </div>
                            ) : (
                                myBooks && myBooks.map((item, index) => (
                                    <div key={index} className="relative group/div">
                                    <Tooltip
                                        content="Edit Book"
                                        placement="right"
                                        className="absolute ml-20 mt-6"
                                    >
                                    <button className="group absolute ml-7 mt-7 z-50 text-white font-extrabold bg-gray-100 py-1 px-2 rounded-md border-2 border-slate-300 hover:scale-x-125 hover:scale-y-95 hover:translate-x-1 transition duration-700 ease-in-out shadow-md opacity-0 group-hover/div:opacity-100">
                                        <FiEdit color="blue" onClick={() => handleBookEdit(item.id)}/>
                                    </button>
                                    </Tooltip>
                                    <Tooltip
                                        content="Delete Book"
                                        placement="right"
                                        className="absolute ml-20 mt-14"
                                    >
                                    <button className="group absolute ml-7 mt-16 z-50 text-white font-extrabold bg-gray-100 py-1 px-2 rounded-md border-2 border-slate-300 hover:scale-x-125 hover:scale-y-95 hover:translate-x-1 transition duration-700 ease-in-out opacity-0 group-hover/div:opacity-100"><RiDeleteBin6Line color="red" onClick={() => handleModal(item.id, item.imageUrl)}/></button>
                                    </Tooltip>
                                    
                                    <BookItem key={index} bookImage = {item.imageUrl} title ={item.book_title} author ={item.book_author} owner={item.book_owner} buttonAction="View Book" status={item.book_status} id ={item.id}/>
                                    </div>
                                ))
                        )}
                        </div>
                    </section>
                    
            </main>
        <Footer />
        </div>
    )
}
