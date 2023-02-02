import { useEffect, useState, Fragment } from "react";
import Footer from "../../components/footer/footer.component";
import Navigation from "../../components/navigation/navigation.component";
import SidebarNavigation from "../../components/sidebar/sidebar.component";
import { deleteBook, getUserBooks, updateBook } from "../../utils/firebase/firebase.utils";
import{ FiEdit } from "react-icons/fi"
import{ RiDeleteBin6Line } from "react-icons/ri"
import {HiOutlineExclamationCircle, HiOutlineInformationCircle} from "react-icons/hi"
import { FallingLines } from 'react-loader-spinner'
import PaginationComponent from '../../components/pagination/pagination-component'

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import FileResizer from 'react-image-file-resizer'
import BookItem from "../../components/book-item/book-item-component";

import { Button, Modal, Tooltip, Alert} from "flowbite-react";
import FormInput from '../../components/form-input/form-input.component'
import { setUserBookMap } from "../../store/userBook/userBook.action";
import { selectUserBooksMap } from "../../store/userBook/userBook.selector";
// import { createNewBook } from '../../utils/firebase/firebase.utils'

const bookCategory = [
    'Science',
    'Philosophy',
    'Art',
    'Business',
    'Self-Help',
    'Development',
    'Motivational',
    'Health',
    'Families & Relationships',
    'Guide / How-to',
    'Maths',
    'History',
    'Encyclopedia',
    'Autobiography',
    'Action and Adventure',
    'Fantasy',
    'Science Fiction',
    'Economics',
    'Non-fiction',
    'Others'
]

const bookStatus = [
    'Available',
    'Requested',
    'Not Available'
]

const defaultFormField = {
    book_owner: '',
    book_title: '',
    book_category: '',
    book_description: '',
    book_status: '',
    book_author: ''
}

// let indexOfLastItem = null
// let indexOfFirstPost = null
// let currentItems = []
// let currentItemsFiltered = []
// let pageNumber = []

export default function MyBooksPage(){
    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    // const [modalResponse, setModalResponse] = useState(null);
    const [itemData, setItemData] = useState([]);
    const currentUser = useSelector(selectCurrentUser);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formFields, setFormFields] = useState(defaultFormField);
    const [initialFormData, setInitialFormData] = useState(defaultFormField);
    const {book_owner, book_author, book_title, book_category, book_description, book_status} = formFields;
    let [thumbnail, setThumbnail] = useState(null)
    let [fileUrl, setFileUrl] = useState(null)
    const dispatch = useDispatch()
    const myBooks = useSelector(selectUserBooksMap)

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastItem - itemsPerPage;
    const currentItems = myBooks.slice(indexOfFirstPost, indexOfLastItem);
    const pageNumbers = Math.ceil(myBooks.length / itemsPerPage);

    // Image File Resizing function

    const resizeFile = (file) =>
    new Promise((resolve) => {
      FileResizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
    
// Get Books to Populate the page
    useEffect(() => {
      
        const getBooks = async () => {

            const books = await getUserBooks(currentUser.uid);
            dispatch(setUserBookMap(books.mybooks))
            setIsLoading(false)
        }
        getBooks(dispatch)
        
    },[])

    const resetFields = () => {
        setFormFields(defaultFormField);
        const categoryOption = document.querySelector('#book_category')
        const statusOption = document.querySelector('#book_status')
        document.getElementById('thumbnail').value = ''
        categoryOption.selectedIndex  = 0
        statusOption.selectedIndex  = 0
        setThumbnail = null

    }

    const onPageChange = (event) => {
        setCurrentPage(event);
    }
    
     const handleDeleteModal = (el, imageUrl) => {
        setShowModal(showModal ? false : true)
        setItemData({el, imageUrl})
    }

   
    const handleDeleteResponse = async (event) => {
        
            if (event === "Yes"){
                setShowLoadingModal(true);
                const newBooks = myBooks.filter((item) => item.id !== itemData['el'])
                const res = await deleteBook(currentUser.uid, newBooks, itemData['imageUrl'])

                if (res === "success")
                {
                    dispatch(setUserBookMap(newBooks))
                    setShowLoadingModal(false);
                    setShowModal(showModal ? false : true)
                    setItemData(null)

                }
            }else{
                setShowModal(showModal ? false : true);
            }      
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleFileChange = async (event) => {
        setThumbnail(null);
        let selected = event.target.files[0];
        const resizedImage = await resizeFile(selected);
        // console.log(resizedImage.size);
        if(!resizedImage){
            setError("Please select a file");
            setTimeout(() => setError(''), 10000);
            return;
        }
        if (!resizedImage.type.includes('image')){
            setError("Selected file must be an image");
            setTimeout(() => setError(''), 10000);
            return;
        }
        if (resizedImage.size > 1000000){ //1000000 == 1 mb
            setError("Image file size must be less than 1mb");
            setTimeout(() => setError(''), 10000);
            return;
        }
        setError('');
        setThumbnail(resizedImage);
        setFileUrl(null);
    }

    const handleEditModal = (el, imageUrl) => {
        setShowEditModal(showEditModal ? false : true)
        setInitialFormData(el);
        if (el && imageUrl){
            setFormFields(el)
            setFileUrl(imageUrl.split('%2Fbooks%2')[1].split('?')[0])
            setThumbnail(imageUrl)
        }
    }

    const handleBookEdit = async (el) => {
        el.preventDefault();
        setShowLoadingModal(true);
        // console.log(formFields, thumbnail, fileUrl)
        const imageState = fileUrl ? true : false;

        setError('');

        setShowLoadingModal(true);
       const res = await updateBook(currentUser.uid, thumbnail, formFields, imageState, initialFormData);

        if(res === "success"){
            setSuccess("Book updated successfully!");
            setShowLoadingModal(false);
            resetFields();
            setTimeout(() => setSuccess(''), 500);
            const books = await getUserBooks(currentUser.uid);
            dispatch(setUserBookMap(books.mybooks))
            setShowEditModal(false)

        }else{
            setError("Failed to updated book");
            setTimeout(() => setError(''), 500);
            setShowLoadingModal(false);
            setShowEditModal(true)
        }
        
        
        
        
    }


    

    return(
        <div className='bg-gray-100 font-body scroll-smooth h-0'>
        <Navigation />
            <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap">
                        <Fragment>
                            {/* Delete Book Modal */}
                            <Modal
                                show={showModal}
                                size="md"
                                popup={true}
                                onClose={handleDeleteModal}
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

                        

                        <Fragment>
                            <Modal
                                show={showEditModal}
                                size="3xl"
                                popup={true}
                                onClose={handleEditModal}
                                className="max-md:pt-16 mt-10 bg-opacity-60"
                            >
                                <Modal.Header />
                                <Modal.Body>
                                    {/* Loading Modal */}
                                <Fragment>
                                    <Modal
                                        show={showLoadingModal}
                                        size="md"
                                        popup={true}
                                        onClose={showLoadingModal}
                                        className="max-md:pt-32 mt-10 bg-opacity-60 z-50"
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

                                <div className='container px-6 py-2 h-full'>
                                <form onSubmit={handleBookEdit}>
                                    <div className='relative z-0 mb-8 w-full group'>
                                        <h1 className='text-1xl sm:text-2xl md:text-3xl font-bold my-auto mb-4 text-primary'>Edit Book Detail</h1>
                                    </div>
                                    <div className="relative z-0 mb-6 w-full group mt-1 pt-0">
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
                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <div className='relative z-0 mb-6 w-full group'>
                                            <FormInput
                                                name="book_owner"
                                                label="Book Owner"
                                                type="text"
                                                onChange={handleChange}
                                                value={currentUser['displayName'] === book_owner ? book_owner : ''}
                                                request={"required"}
                                                disabled
                                            />
                                        </div>
                                        <div className='relative z-0 mb-6 w-full group'>
                                            <FormInput
                                                name="book_title"
                                                label="Book Title"
                                                type="text"
                                                onChange={handleChange}
                                                value={book_title && book_title}
                                                request={"required"}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <div className='relative z-0 mb-6 w-full group'>
                                           
                                            <FormInput
                                                name="thumbnail"
                                                id="thumbnail"
                                                label={thumbnail && fileUrl ? `Book Image : ${fileUrl}` : "Book Image"}                                                
                                                type="file"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div className='relative z-0 mb-6 mt-5 w-full group'>
                                            <select
                                                id="book_category"
                                                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                name="book_category"
                                                onChange={handleChange}
                                                required
                                            >
                                                <option defaultValue={book_category && book_category}>{book_category && book_category}</option>
                                                {bookCategory.map((item, index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))}
                                            </select>
                                            <label
                                                htmlFor="book_category"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Book Categories
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <div className='relative z-0 mb-6 w-full group'>
                                            <textarea
                                                name='book_description'
                                                id='book_description'
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                rows="2"
                                                placeholder=""
                                                onChange={handleChange}
                                                value={book_description && book_description}
                                                required
                                            />
                                            <label
                                                htmlFor='book_description'
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Book Description
                                            </label>
                                        </div>

                                        <div className='relative z-0 mb-6 mt-5 w-full group'>
                                            <select
                                                id="book_status"
                                                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                name="book_status"
                                                onChange={handleChange}
                                                required
                                            >
                                                <option defaultValue={book_status && book_status}>{book_status && book_status}</option>
                                                {bookStatus.map((item, index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))}
                                            </select>
                                            <label
                                                htmlFor="book_status"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Book Status
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <div className='relative z-0 mb-6 w-full group'>
                                            <FormInput
                                                name="book_author"
                                                label="Book Author"
                                                type="text"
                                                onChange={handleChange}
                                                value={book_author && book_author}
                                                request={"required"}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <div className='relative z-0 mb-6 w-full group'>
                                            <button
                                                type="submit"
                                                className="inline-block px-7 py-3 mt-0 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                data-mdb-ripple="true"
                                                data-mdb-ripple-color="light"
                                            >
                                                Update Book
                                            </button>
                                        </div>
                                        <div className='relative z-0 mb-6 w-full group'>
                                            <button
                                                type="submit"
                                                className="inline-block px-7 py-3 mt-0 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                data-mdb-ripple="true"
                                                data-mdb-ripple-color="light"
                                                onClick={() => handleEditModal(defaultFormField, null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </Fragment>
                <SidebarNavigation />
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
                            currentItems && currentItems.map((item, index) => (
                                <div key={index} className="relative group/div">
                                    <Tooltip
                                        content="Edit Book"
                                        placement="right"
                                        className="absolute ml-20 mt-6"
                                    >
                                        {/* Edit Button */}
                                        <button className="group absolute ml-7 mt-7 z-50 text-white font-extrabold bg-gray-100 py-1 px-2 rounded-md border-2 border-slate-300 hover:scale-x-125 hover:scale-y-95 hover:translate-x-1 transition duration-700 ease-in-out shadow-md opacity-0 group-hover/div:opacity-100">
                                            <FiEdit color="blue" onClick={() => handleEditModal(item, item.imageUrl)} />
                                        </button>
                                    </Tooltip>
                                    <Tooltip
                                        content="Delete Book"
                                        placement="right"
                                        className="absolute ml-20 mt-14"
                                    >
                                        {/* Delete Button */}
                                        <button className="group absolute ml-7 mt-16 z-50 text-white font-extrabold bg-gray-100 py-1 px-2 rounded-md border-2 border-slate-300 hover:scale-x-125 hover:scale-y-95 hover:translate-x-1 transition duration-700 ease-in-out opacity-0 group-hover/div:opacity-100"><RiDeleteBin6Line color="red" onClick={() => handleDeleteModal(item.id, item.imageUrl)} /></button>
                                    </Tooltip>

                                    <BookItem key={index} bookImage={item.imageUrl} title={item.book_title} author={item.book_author} owner={item.book_owner} buttonAction="View Book" status={item.book_status} id={item.id} owner_id = {item.owner_id}/>
                                </div>
                            ))
                        )}
                    </div>
                    <PaginationComponent currentPage={currentPage} pageNumbers={pageNumbers} onPageChange={onPageChange} />
                </section>

            </main>
            <Footer />
        </div>
    )
}
