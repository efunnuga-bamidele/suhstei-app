

import Navigation from '../../components/navigation/navigation.component';
import Footer from '../../components/footer/footer.component';

import HeroBg1 from '../../assets/images/hero_bg_1.jpg';
import SearchIcon from '../../assets/icons/flat-ui_search.svg';
import NetworkIcon from '../../assets/icons/network.svg';
import BookIcon from '../../assets/icons/emojione_green-book.svg';
import ReceiveIcon from '../../assets/icons/icons8_recieve.svg';
import GiveIcon from '../../assets/icons/icons8_give.svg';

import Book1 from '../../assets/books-image/book1.png'
import Book2 from '../../assets/books-image/book2.png'
import Book3 from '../../assets/books-image/book3.png'
import Book4 from '../../assets/books-image/book4.png'
import Book5 from '../../assets/books-image/book5.png'
import Book6 from '../../assets/books-image/book6.png'

import BookItem from '../../components/book-item/book-item-component';

export default function HomePage (){
    return (
        <div className='bg-gray-100 mx-1 font-body scroll-smooth'>
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
                        
                            <button type="button"
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
                <div className='mx-auto my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>{/* */}
                    <div className='group flex justify-center m-4'>{/*Search Book Card*/}
                        <div className="block rounded-lg shadow lg bg-white max-w-sm text-center hover:bg-blue-500 transition ease-in-out duration-500 cursor-pointer">
                            <div className="py-3 px-6 border-b border-gray-300 flex justify-center group-hover:bg-white group-hover:rounded-t-lg">
                                <img src={SearchIcon} alt="Search-Icon" className='group-hover:text-white group-hover:animate-[bounce_1s_ease-in-out_3]'/>
                            </div>
                            <div className="p-6">
                                <h5 className="text-grat-900 text-xl font-medium mb-2 group group-hover:text-white">
                                    Search for a book
                                </h5>
                                <p className="text-gray-700 text-base mb-4 group group-hover:text-white">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, cupiditate.
                                </p>
                            </div>
                            <div className="py-3 px-6 border-t border-gray-300 text-gray-600 group-hover:text-white">
                                Step 1
                            </div>
                        </div>
                    </div>{/* */}
                    <div className='group flex justify-center m-4'>
                    <div className="block rounded-lg shadow lg bg-white max-w-sm text-center hover:bg-blue-500 transition ease-in-out duration-500 cursor-pointer">
                        <div className="py-3 px-6 border-b border-gray-300 flex justify-center group-hover:bg-white group-hover:rounded-t-lg">
                            <img src={NetworkIcon} alt="Network-Icon" className='group-hover:text-white group-hover:animate-[bounce_1s_ease-in-out_3]'/>
                        </div>
                        <div className="p-6">
                            <h5 className="text-grat-900 text-xl font-medium mb-2 group-hover:text-white">
                                Connect with book owner
                            </h5>
                            <p className="text-gray-700 text-base mb-4 group-hover:text-white">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, cupiditate.
                            </p>
                        </div>
                        <div className="py-3 px-6 border-t border-gray-300 text-gray-600 group-hover:text-white">
                            Step 2
                        </div>
                    </div>
                </div>{/* */}
                <div className='group flex justify-center m-4'>
                <div className="block rounded-lg shadow lg bg-white max-w-sm text-center hover:bg-blue-500 transition ease-in-out duration-500 cursor-pointer">
                    <div className="py-3 px-6 border-b border-gray-300 flex justify-center group-hover:bg-white group-hover:rounded-t-lg">
                        <img src={ReceiveIcon} alt="Receive-Icon" className='group-hover:text-white group-hover:animate-[bounce_1s_ease-in-out_3]'/>
                        <img src={BookIcon} alt="Book-Icon" className='w-12 h-12 group-hover:text-white group-hover:animate-[bounce_1s_ease-in-out_3]'/>
                    </div>
                    <div className="p-6">
                        <h5 className="text-grat-900 text-xl font-medium mb-2 group-hover:text-white">
                            Recieve the required book
                        </h5>
                        <p className="text-gray-700 text-base mb-4 group-hover:text-white">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, cupiditate.
                        </p>
                    </div>
                    <div className="py-3 px-6 border-t border-gray-300 text-gray-600 group-hover:text-white">
                        Step 3
                    </div>
                </div>
                 </div>{/* */}
                 <div className='group flex justify-center m-4'>
                 <div className="block rounded-lg shadow lg bg-white max-w-sm text-center hover:bg-blue-500 transition ease-in-out duration-500 cursor-pointer">
                     <div className="py-3 px-6 border-b border-gray-300 flex justify-center group-hover:bg-white group-hover:rounded-t-lg">
                         <img src={BookIcon} alt="Book-Icon" className='w-12 h-12 group-hover:text-white group-hover:animate-[bounce_1s_ease-in-out_3]'/>
                         <img src={GiveIcon} alt="Give-Icon" className=' group-hover:text-white group-hover:animate-[bounce_1s_ease-in-out_3]'/>
                     </div>
                     <div className="p-6">
                         <h5 className="text-grat-900 text-xl font-medium mb-2 group-hover:text-white">
                             Return book after use
                         </h5>
                         <p className="text-gray-700 text-base mb-4 group-hover:text-white">
                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, cupiditate.
                         </p>
                     </div>
                     <div className="py-3 px-6 border-t border-gray-300 text-gray-600 group-hover:text-white">
                        Step 4
                     </div>
                 </div>
                  </div>{/* */}
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
                    <div className='m-6 overflow-x-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>{/* */}
                            
                        <BookItem bookImage={Book1} title="Photographer’s trouble shooter" author="Michael Freeman" />
                        <BookItem bookImage={Book2} title="Photographer’s trouble shooter" author="Michael Freeman" />
                        <BookItem bookImage={Book3} title="Photographer’s trouble shooter" author="Michael Freeman" />
                        <BookItem bookImage={Book4} title="Photographer’s trouble shooter" author="Michael Freeman" />
                        <BookItem bookImage={Book5} title="Photographer’s trouble shooter" author="Michael Freeman" />
                        <BookItem bookImage={Book6} title="Photographer’s trouble shooter" author="Michael Freeman" />
                                
                            
                    </div>{/*end of top review books */}
                </section>
            </main>{/* */}
            <Footer />
      </div>
    )
}