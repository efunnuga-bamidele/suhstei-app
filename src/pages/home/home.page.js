import Navigation from '../../components/navigation/navigation.component';
import Footer from '../../components/footer/footer.component';

import HeroBg1 from '../../assets/images/hero_bg_1.jpg';
import SearchIcon from '../../assets/icons/flat-ui_search.svg';
import NetworkIcon from '../../assets/icons/network.svg';
import BookIcon from '../../assets/icons/emojione_green-book.svg';
import ReceiveIcon from '../../assets/icons/icons8_recieve.svg';
import GiveIcon from '../../assets/icons/icons8_give.svg';

export default function HomePage (){
    return (
        <div className='bg-gray-100 mx-1 font-body'>
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
            
                <section className='my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>{/* */}
                    <div className='group flex justify-center m-4'>{/*Search Book Card*/}
                        <div className="block rounded-lg shadow lg bg-white max-w-sm text-center hover:bg-blue-500 transition ease-in-out duration-500 cursor-pointer  ">
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
                                2 days ago
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
                            2 days ago
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
                        2 days ago
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
                         2 days ago
                     </div>
                 </div>
                  </div>{/* */}
                </section>{/*End of how we work */}
    
                <section className='grid grid-col-4'> {/* Top review Books*/}
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </section>{/*end of top review books */}
            </main>{/* */}
            <Footer />
      </div>
    )
}