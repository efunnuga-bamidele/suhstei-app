import { useEffect } from "react";
import Footer from "../../components/footer/footer.component";
import Navigation from "../../components/navigation/navigation.component";
import SidebarNavigation from "../../components/sidebar/sidebar.component";
import { getUserBooks } from "../../utils/firebase/firebase.utils";

import { useDispatch } from "react-redux";

export default function MyBooksPage(){
    

    useEffect(() => {
      
        const getBooks = async () => {
            // const bookArray = await getUserBooks("dTARGAWUzGb1cym3h0mA61EcdGy1")
            // console.log(bookArray)
            const mybooks = await getUserBooks("dTARGAWUzGb1cym3h0mA61EcdGy1")
            console.log(mybooks)
            // bookArray.map((doc) => {
            //     console.log(doc)
            // })
        }
        getBooks()
       
    },[])

    return(
        <div className='bg-gray-100 mx-1 font-body scroll-smooth'>
        <Navigation />
            <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap">
                    <SidebarNavigation />
                    <section className="bg-white mt-12 mb-2 p-2 w-full mr-1">
                        <h1 className="font-bold text-lg text-center underline">My Books</h1>
                        <p> Get some of the most exciting books you have always been looking for.</p>
                        
                    </section>
            </main>
        <Footer />
        </div>
    )
}
