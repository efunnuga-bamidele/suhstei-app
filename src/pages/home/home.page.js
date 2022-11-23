import Navigation from '../../components/navigation/navigation.component';
import Footer from '../../components/footer/footer.component';

import HeroBg1 from '../../assets/images/hero_bg_1.jpg'

export default function HomePage (){
    return (
        <div className='bg-gray-100 mx-1 font-body'>
            <Navigation />
            <main className='bg-gray-100'>{/* */}
                <section className='mt-3'>{/* */}
                    <div className="relative overflow-hidden bg-no-repeat bg-cover bg-center mt-2" style=
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
    
                <section>{/* */}
                    <div></div>{/* */}
                    <div></div>{/* */}
                    <div></div>{/* */}
                    <div></div>{/* */}
                </section>{/* */}
    
                <section> {/* */}
            
                </section>{/* */}
            </main>{/* */}
            <Footer />
      </div>
    )
}