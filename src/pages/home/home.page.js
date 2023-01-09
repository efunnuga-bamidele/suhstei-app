import { useNavigate } from 'react-router-dom';

import Navigation from '../../components/navigation/navigation.component';
import Footer from '../../components/footer/footer.component';

import HeroBg1 from '../../assets/images/hero_bg_1.jpg';
import SearchIcon from '../../assets/icons/flat-ui_search.svg';
import NetworkIcon from '../../assets/icons/network.svg';
import BookIcon from '../../assets/icons/emojione_green-book.svg';
import ReceiveIcon from '../../assets/icons/icons8_recieve.svg';
import GiveIcon from '../../assets/icons/icons8_give.svg';


import BookItem from '../../components/book-item/book-item-component';
import StepItem from '../../components/step-item/step-item-component';
import { useEffect, useState } from 'react';
import { getAllBooks } from '../../utils/firebase/firebase.utils';

export default function HomePage (){
    const redirect = useNavigate()

    const [selectedBooks, setSelectedBooks] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        const getBooks = async () => {
            const booksData = await getAllBooks();
            setSelectedBooks(booksData);
            setIsLoading(false)
        }
        getBooks();
    }, [])

    const order = (a, b) => {
        return a < b ? -1 : (a > b ? 1 : 0);
        }

    return (
        <div className='bg-gray-100 mx-1 font-body scroll-smooth h-0'>
            <Navigation />
            <main className='bg-gray-100 mt-10'>{/* */}
                <section className='mt-3'>{/* */}
                    <div className="relative overflow-hidden bg-no-repeat bg-cover bg-center mt-2 " style=
                    {{ backgroundPosition: "50%", backgroundImage:`url("${HeroBg1}")`,height: "380px"}}>
                    <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
                        style={{backgroundColor: "rgba(0, 0, 0, 0.75)"}}>
                        <div className="flex justify-center items-center h-full">
                        <div className="text-center text-white px-6 md:px-12">
                            
                            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold my-auto mb-3">Welcome to <span className='text-primary'>Suhstei</span><span className='text-accent'>.</span></h1>
                            <h3 className="text-lg sm:text-2xl md:text-3xl font-light mb-3">where readers rule the world.</h3>
                            <h3 className="text-xs sm:text-sm md:text-xl mb-8 font-light">So let’s start connecting with other book lovers to lend books and start reading.</h3>
                        
                            <button type="button" onClick={() => redirect('books')}
                            className="inline-block px-6 py-2.5 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            data-mdb-ripple="true" data-mdb-ripple-color="light">
                            Get started
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>{/* */}
    {/*How we work*/}
                <section>
                    <div className='black justify-center mt-6'>
                        <h5 className="block text-3xl font-thin tracking-tight text-slate-800 dark:text-white text-center">
                            How it works
                        </h5>
                        <p className="block text-lg font-thin tracking-tight text-slate-400 dark:text-white text-center">
                            Looking for a book or need a book to read? We’ve got you covered . Lend, Borrow, Review
                            and connect with book lovers all over the world in 3 steps.
                        </p>
                    </div>
                    <div className='mx-auto my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
                        {/* Platform Steps */}
                        <StepItem icon={SearchIcon} title="Search for a book" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, cupiditate." step="Step 1"/> 
                        <StepItem icon={NetworkIcon} title="Connect with book owner" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, cupiditate." step="Step 2" postStyle="" preStyle=""/> 
                        <StepItem icon={ReceiveIcon} extraIcon={BookIcon} title="Recieve the required book" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, cupiditate." step="Step 3" preStyle="w-12 h-12" postStyle=""/> 
                        <StepItem icon={BookIcon} extraIcon={GiveIcon} title="Return book after use" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, cupiditate." step="Step 4" postStyle="w-12 h-12" preStyle=''/>

                    </div>
                </section>{/*End of how we work */}
    
                <section>
                    <div className='black justify-center my-10'>
                        <h5 className="block text-3xl font-thin tracking-tight text-slate-800 dark:text-white text-center">
                            Book Gallery
                        </h5>
                        <p className="block text-lg font-thin tracking-tight text-slate-400 dark:text-white text-center">
                            Get some of the most exciting books you have always been looking for.
                        </p>
                    </div>
                    <div className='m-6 overflow-x-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 '>{/* */}
                        {isLoading && <p>Loading.........</p>}
                        {selectedBooks && selectedBooks.map((booksMap) => (
                            booksMap['mybooks'].sort(order).slice(0, 4).map((item, index) => (
                               
                                    
                                    
                                    <BookItem key={index} bookImage = {item.imageUrl} title ={item.book_title} author ={item.book_author} owner={item.book_owner} buttonAction="Request Book" status={item.book_status} id ={item.id}/>
                               
                            ))

                        )).sort(order)}
                        
                    </div>{/*end of top review books */}
                </section>
            </main>{/* */}
            <Footer />
      </div>
    )
}