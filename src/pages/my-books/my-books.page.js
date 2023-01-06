import { useEffect, useState } from "react";
import Footer from "../../components/footer/footer.component";
import Navigation from "../../components/navigation/navigation.component";
import SidebarNavigation from "../../components/sidebar/sidebar.component";
import { getUserBooks } from "../../utils/firebase/firebase.utils";
import{ FiEdit } from "react-icons/fi"
import{ RiDeleteBin6Line } from "react-icons/ri"

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../book/user/user.selector";

import BookItem from "../../components/book-item/book-item-component";

export default function MyBooksPage(){

    // const dispatch = useDispatch();
    // const myBooksMap = useSelector(selectMyBooksMap);
    const [myBooks, setMyBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const currentUser = useSelector(selectCurrentUser);
    

    

    useEffect(() => {
      
        const getBooks = async () => {

            const books = await getUserBooks(currentUser.uid);
            // console.log(books[0].mybooks)
            // setMyBooks(books[0].mybooks)
            setMyBooks(books.mybooks)
            setIsLoading(false)
            // dispatch(setMyBooks(mybooks))

        }
        getBooks()
       
    },[])

    
    // console.log(myBooksMap)

    return(
        <div className='bg-gray-100 font-body scroll-smooth h-0'>
        <Navigation />
            <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap">
                    <SidebarNavigation/>
                    <section className="bg-white mt-12 m-2 p-2 w-full rounded-md">
                    {/* <section className='bg-gray-100 mt-20'> */}
                        <h1 className="font-bold text-lg text-center underline">My Books</h1>
                        <div className='overflow-x-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 px-2'>{/* */}
                            {isLoading && <p>Loading.........</p>}
                            {myBooks && myBooks.map((item, index) => (
                                <div key={index} className="relative group/div">
                                <button className="group absolute ml-7 mt-7 z-50 text-white font-extrabold bg-gray-100 py-1 px-2 rounded-md border-2 border-slate-300 hover:scale-x-125 hover:scale-y-95 hover:translate-x-1 transition duration-700 ease-in-out shadow-md opacity-0 group-hover/div:opacity-100">
                                    <FiEdit color="blue"/>
                                </button>
                                <button className="group absolute ml-7 mt-16 z-50 text-white font-extrabold bg-gray-100 py-1 px-2 rounded-md border-2 border-slate-300 hover:scale-x-125 hover:scale-y-95 hover:translate-x-1 transition duration-700 ease-in-out opacity-0 group-hover/div:opacity-100"><RiDeleteBin6Line color="red"/></button>
                                
                                <BookItem key={index} bookImage = {item.imageUrl} title ={item.book_title} author ={item.book_author} owner={item.book_owner} buttonAction="View Book"/>
                                </div>
                            ))}
                        </div>
                    </section>
            </main>
        <Footer />
        </div>
    )
}
