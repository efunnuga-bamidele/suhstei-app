import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";

// Reusable Components Import
import Footer from "../../components/footer/footer.component";
import Navigation from "../../components/navigation/navigation.component";
import BookComponent from "../../components/book-component/book-component";
import { getBookById } from "../../utils/firebase/firebase.utils";

export default function BookViewPage(){
    const [isLoading, setIsLoading] = useState(true);
    const [bookRequested, setBookRequested] = useState();

    const location = useLocation();

    useEffect(() => {
        {setTimeout(() => { setIsLoading(false)},3000)}
    },[])

    useEffect(() => {
        const getRequestedBook = async () => {
            const res = await getBookById(location.state.book_Id, location.state.owner_Id)
            setBookRequested(res)
            // dispatch(setMyBooksMap(res))
        }
        getRequestedBook();
    },[])
    return(
        <div className="bg-gray-100 font-body scroll-smooth h-0">
            <Navigation />
            <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap">
            <section className='bg-white mt-12 m-2 p-4 w-full rounded-md'>
                <div classname="m-6 px-8 overflow-x-hidden grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {isLoading ? (
                        <div className="grid col-span-full place-items-center h-50">
                        <FallingLines
                            color="#1e94cc"
                            width="120"
                            visible={true}
                            ariaLabel='falling-lines-loading'
                        />
                        </div>
                    ) : (
                            
                            <BookComponent bookDetails={bookRequested[0]} />
                          
                    )
                    }
                </div>
                </section>
                </main>
            <Footer />
        </div>
    )
}