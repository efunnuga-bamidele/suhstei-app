import React, { useState, useRef, createRef,forwardRef, Fragment } from 'react'
import Navigation from '../../components/navigation/navigation.component'
import Footer from '../../components/footer/footer.component'
import SidebarNavigation from '../../components/sidebar/sidebar.component'
import { HiOutlineInformationCircle } from "react-icons/hi"
import { Alert, Modal, Button } from 'flowbite-react'
import { v4 as uuid } from 'uuid'
import FileResizer from 'react-image-file-resizer'
import { FallingLines } from 'react-loader-spinner'

import FormInput from '../../components/form-input/form-input.component'
import { createNewBook } from '../../utils/firebase/firebase.utils'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../book/user/user.selector'

const bookCategory = [
    'Science',
    'Philosophy',
    'Maths',
    'History',
    'Encyclopedia',
    'Autobiography',
    'Action and Adventure',
    'Fantasy',
    'Science Fiction',
    'Economics',
    'Non-fiction'
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
export default function CreateBookPage() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false)
    const unique_id = uuid();
    const [formFields, setFormFields] = useState(defaultFormField);
    const {book_owner, book_author, book_title, book_category, book_description, book_status} = formFields;
    let [thumbnail, setThumbnail] = useState(null)
    const user = useSelector(selectCurrentUser);

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
    

    

    const resetFields = () => {
        setFormFields(defaultFormField);
        const categoryOption = document.querySelector('#book_category')
        const statusOption = document.querySelector('#book_status')
        document.getElementById('thumbnail').value = ''
        categoryOption.selectedIndex  = 0
        statusOption.selectedIndex  = 0
        setThumbnail = null
        // imageInput.value = []
        // inputRef.current.value = null

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
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowModal(true);
        formFields.book_owner = user['displayName'];

        if (!formFields.book_category || formFields.book_category === " -- Select Category --"){
            setError('Please select a book category');
            setTimeout(() => setError(''), 10000);
            return;
        }

        if (!formFields.book_status || formFields.book_status === " -- Select Book Status --"){
            setError('Please select a book status');
            setTimeout(() => setError(''), 10000);
            return;
        }

        setError('');
        const createdAt = new Date();
        
        const bookData = {
            id: unique_id,
            createdAt,
            ...formFields
        }
       const data = await createNewBook(user.uid, thumbnail, bookData);

        if(data === "success"){
            setSuccess("Book creation successful!");
            resetFields();
            setTimeout(() => setSuccess(''), 10000);
            
        }else if(data === "added"){
            setSuccess("Book added successfully!");
            resetFields();
            setTimeout(() => setSuccess(''), 10000);
        }else{
            setError("Failed to create book");
            setTimeout(() => setError(''), 10000);
        }
        
        setShowModal(false);
    }



    return (
        <div className='bg-gray-100 mx-1 font-body scroll-smooth h-0'>
            <Navigation />
            <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap">
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

                <SidebarNavigation />
                <section className="bg-slate-100 mt-12 m-2 p-2 w-full rounded-md">
                    <div className='container px-6 py-12 h-full'>
                        <form onSubmit={handleSubmit}>
                            <div className='relative z-0 mb-6 w-full group'>
                                <h1 className='text-1xl sm:text-2xl md:text-3xl font-bold my-auto mb-4 text-primary'>Create New Book</h1>
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
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
                                        onChange= {handleChange}
                                        value= {user['displayName']}
                                        request={"required"}
                                        disabled
                                    />
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name="book_title"
                                        label="Book Title"
                                        type="text"
                                        onChange= {handleChange}
                                        value= {book_title}
                                        request={"required"}
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name="thumbnail"
                                        id="thumbnail"
                                        label="Book Image"
                                        type="file"
                                        onChange= {handleFileChange}
                                    />
                                </div>
                                <div className='relative z-0 mb-6 mt-5 w-full group'>
                                    <select
                                        id="book_category"
                                        className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        name="book_category"
                                        onChange= {handleChange}
                                        required
                                    >
                                        <option defaultValue=" -- Select Category --"> -- Select Category --</option>
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
                                        onChange= {handleChange}
                                        value= {book_description}
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
                                        onChange= {handleChange}
                                        required
                                    >
                                        <option defaultValue=" -- Select Book Status --"> -- Select Book Status --</option>
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
                                        onChange= {handleChange}
                                        value= {book_author}
                                        request={"required"}
                                    />
                                </div>
                            <div className='relative z-0 mb-6 w-full group'>
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 mt-0 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Create Book
                                </button>
                            </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
