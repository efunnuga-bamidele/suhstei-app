import { useEffect, useState } from "react";
import Footer from "../../components/footer/footer.component";
import Navigation from "../../components/navigation/navigation.component";
import SidebarNavigation from "../../components/sidebar/sidebar.component";
import { getUserBooks } from "../../utils/firebase/firebase.utils";

import { useDispatch, useSelector } from "react-redux";
import { setMyBooks } from "../../book/myBooks/myBooks.action";
import { selectMyBooksMap } from "../../book/myBooks/myBooks.selector";

import BookItem from "../../components/book-item/book-item-component";

export default function MyBooksPage(){

    // const dispatch = useDispatch();
    // const myBooksMap = useSelector(selectMyBooksMap);
    const [myBooks, setMyBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
      
        const getBooks = async () => {

            const books = await getUserBooks("dTARGAWUzGb1cym3h0mA61EcdGy1");
            // console.log(books[0].mybooks)
            setMyBooks(books[0].mybooks)
            setIsLoading(false)
            // dispatch(setMyBooks(mybooks))

        }
        getBooks()
       
    },[])

    // console.log(myBooksMap)

    return(
        <div className='bg-gray-100 mx-1 font-body scroll-smooth'>
        <Navigation />
            <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap">
                    <SidebarNavigation />
                    <section className="bg-white mt-12 mb-2 p-2 w-full mr-1">
                    {/* <section className='bg-gray-100 mt-20'> */}
                        <h1 className="font-bold text-lg text-center underline">My Books</h1>
                        <div className='m-6 overflow-x-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 px-2'>{/* */}
                            {isLoading && <p>Loading.........</p>}
                            {myBooks && myBooks.map((item, index) => (
                                // <p key={index}> {item.book_author} </p>
                                <BookItem key={index} bookImage = {item.imageUrl} title ={item.book_title} author ={item.book_author} />
                            ))}
                        </div>

                        

                        
                    </section>
            </main>
        <Footer />
        </div>
    )
}
