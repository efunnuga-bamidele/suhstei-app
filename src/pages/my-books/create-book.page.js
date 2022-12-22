import {useState} from 'react'
import Navigation from '../../components/navigation/navigation.component'
import Footer from '../../components/footer/footer.component'
import SidebarNavigation from '../../components/sidebar/sidebar.component'
import { HiOutlineInformationCircle } from "react-icons/hi"
import { Alert } from 'flowbite-react'

import FormInput from '../../components/form-input/form-input.component'
import { map } from '@firebase/util'

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
export default function CreateBookPage() {
    const [error, setError] = useState('');

    return (
        <div className='bg-gray-100 mx-1 font-body scroll-smooth'>
            <Navigation />
            <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap">
                <SidebarNavigation />
                <section className="bg-slate-100 mt-12 mb-2 p-2 w-full mr-1">
                    <div className='container px-6 py-12 h-full'>
                        <form>
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
                            </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className='relative z-0 mb-6 w-full group'>
                                <FormInput
                                    name= "owner"
                                    label= "Book Owner"
                                    type= "text"
                                    // value= {''}
                                />
                            </div>
                            <div className='relative z-0 mb-6 w-full group'>
                                <FormInput
                                    name= "title"
                                    label= "Book Title"
                                    type= "text"
                                    // onChange= {''}
                                    // value= {''}
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className='relative z-0 mb-6 w-full group'>
                                <FormInput
                                    name= "book_image"
                                    label= "Book Image"
                                    type= "file"
                                    // onChange= {''}
                                    // value= {''}
                                />
                            </div>
                            <div className='relative z-0 mb-6 mt-5 w-full group'>
                            <select 
                                id="book_category" 
                                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                name="book_category"
                                // onChange={''} 
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
                                name='description'
                                id='description'
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                rows="2"
                                // value={''}
                                placeholder="" 
                                // onChange={''}
                            />
                            <label 
                                htmlFor='description'
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
                                // onChange={''} 
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
                                Book Statux
                            </label>
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
