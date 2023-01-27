
import React, { Fragment, useEffect, useState } from 'react'
import { Pagination } from 'flowbite-react'
import { FallingLines } from 'react-loader-spinner'
import BookItem from '../../components/book-item/book-item-component'
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/navigation/navigation.component'
import { getAllBooks } from '../../utils/firebase/firebase.utils'
import { useDispatch, useSelector } from 'react-redux';
import { selectMyBooksMap } from '../../store/myBooks/myBooks.selector';
import { setMyBooksMap } from '../../store/myBooks/myBooks.action';
import { Link } from 'react-router-dom'
import PaginationComponent from '../../components/pagination/pagination-component'

const bookCategory = [
    'All',
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


let indexOfLastItem = null
let indexOfFirstPost = null
let currentItems = []
let currentItemsFiltered = []
let pageNumber = []

export default function BooksPage() {
    
    const [isLoading, setIsLoading] = useState(true);
    const [selectCategory, setSelectCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumbers, setPageNumbers] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const booksArray = useSelector(selectMyBooksMap);
    const dispatch = useDispatch();


useEffect(()=> {
    const getBooks = async () => {
        const booksArrayMap = await getAllBooks();
        dispatch(setMyBooksMap(booksArrayMap));
        setIsLoading(false)
    }
    getBooks();
  

}, [])


  const order = (a, b) => {
    return a < b ? -1 : (a > b ? 1 : 0);
    }


    indexOfLastItem = currentPage * itemsPerPage;
    indexOfFirstPost = indexOfLastItem - itemsPerPage;
    currentItems = booksArray.slice(indexOfFirstPost, indexOfLastItem);
    currentItemsFiltered = booksArray.filter((filteredData) => filteredData.book_category === selectCategory).slice(indexOfFirstPost, indexOfLastItem);
    pageNumber = Math.ceil((booksArray.filter((filteredData) => filteredData.book_category === selectCategory).length + 1) / itemsPerPage);

    useEffect(() => {
        if (selectCategory === "All"){
            setPageNumbers(Math.ceil(booksArray.length / itemsPerPage));
        }else{
            setPageNumbers(pageNumber);
        }
    },[currentItems, currentItemsFiltered]) 


    const onPageChange = (event) => {
        setCurrentPage(event);
    }

    const handleSelectedCategory = (event) => {
        setSelectCategory(event.target.text);
        setCurrentPage(1);
        setItemsPerPage(8);
        indexOfLastItem = currentPage * itemsPerPage;
        indexOfFirstPost = indexOfLastItem - itemsPerPage;
    }

  

  return (
    <main className='h-0'>
        <Navigation />
        <section className='bg-gray-100 mt-20 '>
            <nav className="bg-gray-100 px-10 py-3 rounded-md w-full">
                <h1 className='text-lg text-slate-500 font-semibold'>Categories</h1>
                <ol className="list-reset flex flex-wrap">
                {bookCategory.map((item, index) => (
                        <Fragment>
                            <li key={index} className="text-blue-600 hover:text-blue-700 cursor-pointer">
                                <Link onClick={handleSelectedCategory}>
                                    {item}
                                </Link>
                            </li>
                            <li><span className="text-gray-500 mx-2">|</span></li>
                        </Fragment>
                    ))}

                </ol>
            </nav>
            <div className='m-6 px-8 overflow-x-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10'>
            {isLoading ? (
                        <div className="grid col-span-full place-items-center h-56"> 
                             <FallingLines
                                color="#1e94cc"
                                width="120"
                                visible={true}
                                ariaLabel='falling-lines-loading'
                            /> 
                            </div>
                        ):(
                            // Book Filter Section
                            selectCategory === 'All' ? (
                                currentItems && currentItems.map((item, index) => (
                            
                                    <BookItem key={index} bookImage = {item.imageUrl} title ={item.book_title} author ={item.book_author} owner={item.book_owner} buttonAction="Request Book" status={item.book_status} id ={item.id} owner_id = {item.owner_id}/>
                                )).sort(order)
                            ) : (
                               (
                                    currentItems && currentItems.filter((filteredData) => filteredData.book_category === selectCategory).length === 0 ? (
                                        <div className="grid col-span-full place-items-center h-56"> 
                                        <p className='text-gray-500 text-center'>...No Book In {selectCategory} Category</p>
                                        </div>
                                    ) : (
                                        currentItemsFiltered && currentItemsFiltered.map((item, index) => (
                            
                                            <BookItem key={index} bookImage = {item.imageUrl} title ={item.book_title} author ={item.book_author} owner={item.book_owner} buttonAction="Request Book" status={item.book_status} id ={item.id} owner_id = {item.owner_id}/>
                                        )).sort(order)
                                    )
                               )
                                
                            )
                        
                         )
                         }    
                    
            </div>{/*end of top review books */}
            <PaginationComponent currentPage={currentPage} pageNumbers={pageNumbers} onPageChange={onPageChange} />
        </section>
        <Footer />
    </main>
  )
}
