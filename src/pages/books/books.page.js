
import React, { useEffect, useState } from 'react'

import BookItem from '../../components/book-item/book-item-component'
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/navigation/navigation.component'
import { getAllBooks } from '../../utils/firebase/firebase.utils'

export default function BooksPage() {
    const [booksArray, setBooksArray] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
        const booksData = await getAllBooks();
        setBooksArray(booksData);
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
                    <li><a href="#" className="text-blue-600 hover:text-blue-700">Science</a></li>
                    <li><span className="text-gray-500 mx-2">|</span></li>
                    <li><a href="#" className="text-blue-600 hover:text-blue-700">Philosophy</a></li>
                    <li><span className="text-gray-500 mx-2">|</span></li>
                    <li><a href="#" className="text-blue-600 hover:text-blue-700">Math</a></li>
                    <li><span className="text-gray-500 mx-2">|</span></li>
                    <li><a href="#" className="text-blue-600 hover:text-blue-700">History</a></li>
                    <li><span className="text-gray-500 mx-2">|</span></li>
                    <li><a href="#" className="text-blue-600 hover:text-blue-700">Encyclopedia</a></li>
                    <li><span className="text-gray-500 mx-2">|</span></li>
                    <li><a href="#" className="text-blue-600 hover:text-blue-700">Autobiography</a></li>
                    <li><span className="text-gray-500 mx-2">|</span></li>
                    <li><a href="#" className="text-blue-600 hover:text-blue-700">Action and adventure</a></li>
                    <li><span className="text-gray-500 mx-2">|</span></li>
                    <li><a href="#" className="text-blue-600 hover:text-blue-700">Fantasy</a></li>
                    <li><span className="text-gray-500 mx-2">|</span></li>
                    <li><a href="#" className="text-blue-600 hover:text-blue-700">Science fiction</a></li>
                </ol>
            </nav>
            <div className='m-6 px-8 overflow-x-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10'>
            {isLoading && <p>Loading.........</p>}
                {booksArray && booksArray.map((booksMap) => (
                    booksMap['mybooks'].sort(order).map((item, index) => (
                        <BookItem key={index} bookImage = {item.imageUrl} title ={item.book_title} author ={item.book_author} owner={item.book_owner} buttonAction="Request Book" status={item.book_status}/>
                    ))

                )).sort(order)}
                        
                    
            </div>{/*end of top review books */}

        </section>
        <Footer />
    </main>
  )
}
