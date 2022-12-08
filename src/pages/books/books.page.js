
import React from 'react'

import Book1 from '../../assets/books-image/book1.png'
import Book2 from '../../assets/books-image/book2.png'
import Book3 from '../../assets/books-image/book3.png'
import Book4 from '../../assets/books-image/book4.png'
import Book5 from '../../assets/books-image/book5.png'
import Book6 from '../../assets/books-image/book6.png'

import BookItem from '../../components/book-item/book-item-component'
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/navigation/navigation.component'

export default function BooksPage() {
  return (
    <main>
        <Navigation />
        <section className='bg-gray-100 mt-20'>
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
            <div className='m-6 overflow-x-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10'>{/* */}
                            
                <BookItem bookImage={Book1} title="Photographer’s trouble shooter" author="Michael Freeman" />
                <BookItem bookImage={Book2} title="Photographer’s trouble shooter" author="Michael Freeman" />
                <BookItem bookImage={Book3} title="Photographer’s trouble shooter" author="Michael Freeman" />
                <BookItem bookImage={Book4} title="Photographer’s trouble shooter" author="Michael Freeman" />
                <BookItem bookImage={Book5} title="Photographer’s trouble shooter" author="Michael Freeman" />
                <BookItem bookImage={Book6} title="Photographer’s trouble shooter" author="Michael Freeman" />

                <BookItem bookImage={Book3} title="Photographer’s trouble shooter" author="Michael Freeman" />
                <BookItem bookImage={Book2} title="Photographer’s trouble shooter" author="Michael Freeman" />
                <BookItem bookImage={Book4} title="Photographer’s trouble shooter" author="Michael Freeman" />
                <BookItem bookImage={Book6} title="Photographer’s trouble shooter" author="Michael Freeman" />
                <BookItem bookImage={Book5} title="Photographer’s trouble shooter" author="Michael Freeman" />
                <BookItem bookImage={Book1} title="Photographer’s trouble shooter" author="Michael Freeman" />

                <BookItem bookImage={Book2} title="Photographer’s trouble shooter" author="Michael Freeman" />
                <BookItem bookImage={Book4} title="Photographer’s trouble shooter" author="Michael Freeman" />
                <BookItem bookImage={Book6} title="Photographer’s trouble shooter" author="Michael Freeman" />
                <BookItem bookImage={Book1} title="Photographer’s trouble shooter" author="Michael Freeman" />
                <BookItem bookImage={Book3} title="Photographer’s trouble shooter" author="Michael Freeman" />
                <BookItem bookImage={Book5} title="Photographer’s trouble shooter" author="Michael Freeman" />
                        
                    
            </div>{/*end of top review books */}

        </section>
        <Footer />
    </main>
  )
}
