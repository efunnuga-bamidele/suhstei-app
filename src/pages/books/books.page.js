
import React, { Fragment, useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import BookItem from '../../components/book-item/book-item-component'
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/navigation/navigation.component'
import { getAllBooks } from '../../utils/firebase/firebase.utils'
import { useDispatch, useSelector } from 'react-redux';
import { selectMyBooksMap } from '../../store/myBooks/myBooks.selector';
import { setMyBooksMap } from '../../store/myBooks/myBooks.action';

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

export default function BooksPage() {
    // const [booksArray, setBooksArray] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const booksArray = useSelector(selectMyBooksMap)
    const dispatch = useDispatch()
//   useEffect(() => {
//     const getBooks = async () => {
//         const booksData = await getAllBooks();
//         setBooksArray(booksData);
//         setIsLoading(false)
//     }
//     getBooks();

//   }, [])  



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



  return (
    <main className='h-0'>
        <Navigation />
        <section className='bg-gray-100 mt-20 '>
            <nav className="bg-gray-100 px-10 py-3 rounded-md w-full">
                <h1 className='text-lg text-slate-500 font-semibold'>Categories</h1>
                <ol className="list-reset flex flex-wrap">
                {bookCategory .map((item, index) => (
                        <Fragment>
                            <li key={index}><a href="#" className="text-blue-600 hover:text-blue-700">{item}</a></li>
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
                booksArray && booksArray.map((booksMap) => (
                    
                    booksMap['mybooks'].sort(order).map((item, index) => (
                        
                        <BookItem key={index} bookImage = {item.imageUrl} title ={item.book_title} author ={item.book_author} owner={item.book_owner} buttonAction="Request Book" status={item.book_status} id ={item.id}/>
                    ))

                )).sort(order)
            )}    
                    
            </div>{/*end of top review books */}

        </section>
        <Footer />
    </main>
  )
}
