
import React, { Fragment, useEffect, useState } from 'react'
import { Carousel } from 'flowbite-react'
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
import SearchIcon from '../../assets/icons/search.svg';

import { bookCategory } from '../../utils/bookCategory'
//Add All to book category
bookCategory.unshift('All');


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
    const [searchFilter, setSearchFilter] = useState();
    const [searchActive, setSearchActive] = useState(false);
    const [searchField, setSearchField] = useState("");
    const booksArray = useSelector(selectMyBooksMap);
    const dispatch = useDispatch();


    useEffect(() => {
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
        if (selectCategory === "All") {
            setPageNumbers(Math.ceil(booksArray.length / itemsPerPage));
        } else {
            setPageNumbers(pageNumber);
        }
    }, [currentItems, currentItemsFiltered])


    const onPageChange = (event) => {
        setCurrentPage(event);
    }

    const handleSelectedCategory = (event) => {
        clearSearch();
        setSelectCategory(event.target.text);
        setCurrentPage(1);
        setItemsPerPage(8);
        indexOfLastItem = currentPage * itemsPerPage;
        indexOfFirstPost = indexOfLastItem - itemsPerPage;
    }
    const handleSearch = (e) => {
        setSearchField(e.target.value);

        if (e.target.value !== "") {
            setSelectCategory("All");

            setSearchActive(true)

            setSelectCategory("");
            setCurrentPage(1);
            setItemsPerPage(8);
            indexOfLastItem = currentPage * itemsPerPage;
            indexOfFirstPost = indexOfLastItem - itemsPerPage;

            currentItemsFiltered = booksArray.filter((filteredData) => filteredData.book_title.toLowerCase().includes(e.target.value.toLowerCase())).slice(indexOfFirstPost, indexOfLastItem);

            pageNumber = Math.ceil((booksArray.filter((filteredData) => filteredData.book_title.toLowerCase().includes(e.target.value.toLowerCase())).length + 1) / itemsPerPage);
            setSearchFilter(currentItemsFiltered);
            setPageNumbers(pageNumber);

        } else {
            setSearchActive(false);
            setSearchField("");
            setSelectCategory("All");
        }
    }
    
    const clearSearch = () => {
        setSearchActive(false)
        setSearchField("");
        setSelectCategory("All");
    }



    return (
        <main className='h-0'>
            <Navigation />
            <section className='bg-gray-100 mt-20 '>
                <nav className="bg-gray-100 px-10 py-3 rounded-md w-full">
                    <h1 className="font-bold text-xl pb-2 pr-4 underline text-slate-500">Categories</h1>

                    <ol className="list-reset flex flex-wrap">
                        {bookCategory.map((item, index) => (
                            <Fragment key={index}>
                                <li key={index} className="text-blue-600 hover:text-blue-700 cursor-pointer">
                                    <Link onClick={handleSelectedCategory}>
                                        {item}
                                    </Link>
                                </li>
                                <li><span className="text-gray-500 mx-2">|</span></li>
                            </Fragment>
                        ))}

                    </ol>
                    {/* search book field */}
                    <form>
                        <label htmlFor="book_search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative mt-4">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <img src={SearchIcon} className="w-5 h-5" alt='' />
                            </div>
                            <input
                                type="search"
                                id="book_search"
                                name='book_search'
                                onChange={handleSearch}
                                value={searchField}
                                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for book here..." />
                            <button type="button" className="text-white absolute right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={clearSearch}>X</button>
                        </div>
                    </form>
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
                    ) : (
                        // Book Filter Section
                        selectCategory === 'All' ? (
                            currentItems && currentItems.map((item, index) => (

                                <BookItem key={index} bookImage={item.imageUrl} title={item.book_title} author={item.book_author} owner={item.book_owner} buttonAction="Request Book" status={item.book_status} id={item.id} owner_id={item.owner_id} />
                            )).sort(order)

                        ) : (
                            searchActive ? (
                                searchFilter && searchFilter.map((item, index) => (

                                    <BookItem key={index} bookImage={item.imageUrl} title={item.book_title} author={item.book_author} owner={item.book_owner} buttonAction="Request Book" status={item.book_status} id={item.id} owner_id={item.owner_id} />
                                )).sort(order)

                            ) : (

                                currentItems && currentItems.filter((filteredData) => filteredData.book_category === selectCategory).length === 0 ? (
                                    <div className="grid col-span-full place-items-center h-56">
                                        <p className='text-gray-500 text-center'>...No Book In {selectCategory} Category</p>
                                    </div>
                                ) : (
                                    currentItemsFiltered && currentItemsFiltered.map((item, index) => (

                                        <BookItem key={index} bookImage={item.imageUrl} title={item.book_title} author={item.book_author} owner={item.book_owner} buttonAction="Request Book" status={item.book_status} id={item.id} owner_id={item.owner_id} />
                                    )).sort(order)
                                )

                            )
                        )

                    )
                    }

                </div>{/*end of top review books */}
                <PaginationComponent currentPage={currentPage} pageNumbers={pageNumbers} onPageChange={onPageChange} />
                {/* Advert */}
                <section className='pt-2 pb-4 bg-gray-100'>{/* */}
                    <div className='h-56 sm:h-64 xl:h-80 2xl:h-96 mx-5'>
                        <Carousel slideInterval={3000}>
                            <img
                                src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                                alt="..."
                            />
                            <div className='flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white'>
                                Advert. 2
                            </div>
                            <div className='flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white'>
                                Advert. 3
                            </div>
                            <img
                                src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                                alt="..."
                            />
                            <div className='flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white'>
                                Advert. 5
                            </div>
                            <img
                                src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                                alt="..."
                            />
                        </Carousel>
                    </div>

                </section>{/* */}
                <Footer />
            </section>
        </main>
    )
}
