import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { selectMyBooksMap } from "../../store/myBooks/myBooks.selector";

// Reusable Components Import
import Footer from "../../components/footer/footer.component";
import Navigation from "../../components/navigation/navigation.component";
import BookComponent from "../../components/book-component/book-component";
import { getBookById } from "../../utils/firebase/firebase.utils";
import { setMyBooksMap } from "../../store/myBooks/myBooks.action";

export default function BookViewPage(){
    const [isLoading, setIsLoading] = useState(true);
    const [bookRequested, setBookRequested] = useState();
    const { book_id, owner_id } = useParams();
    const booksItem = useSelector(selectMyBooksMap);
    const dispatch = useDispatch();

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
        <main className="h-0">
            <Navigation />
            <section className='bg-gray-100 mt-20 '>
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
                            <div>
                            <BookComponent bookDetails={bookRequested[0]} />
                            </div>
                    )
                    }
                </div>
                </section>
            <Footer />
        </main>
    )
}