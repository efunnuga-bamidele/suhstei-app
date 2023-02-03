import Navigation from "../../components/navigation/navigation.component";
import Footer from "../../components/footer/footer.component";
import SidebarNavigation from "../../components/sidebar/sidebar.component";
import { Table } from "flowbite-react";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useState, useEffect } from "react";
import { getUserBooks } from "../../utils/firebase/firebase.utils";

export default function DashboardPage(){

    const [myBooks, setMyBooks] = useState([]);
    const [myAvailableBooks, setMyAvailableBooks] = useState([]);
    const [myRequestedBooks, setRequestedBooks] = useState([]);
    const [myNotAvailableBooks, setNotAvailableBooks] = useState([]);
    // const [myBooks, setMyAvailableBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const currentUser = useSelector(selectCurrentUser);
    

    

    useEffect(() => {
      
        const getBooks = async () => {
            const books = await getUserBooks(currentUser.uid);
            setMyBooks(books.mybooks)
            setIsLoading(false)
        }
        getBooks()
       
    },[])

    useEffect(() => {
        setMyAvailableBooks(myBooks.filter((item) => item["book_status"] === "Available"))
        // console.log(myAvailableBooks)
       
    },[myBooks])
    useEffect(() => {
        setNotAvailableBooks(myBooks.filter((item) => item["book_status"] === "Not Available"))
        // console.log(myAvailableBooks)
       
    },[myBooks])
    useEffect(() => {
        setRequestedBooks(myBooks.filter((item) => item["book_status"] === "Requested"))
        // console.log(myAvailableBooks)
       
    },[myBooks])


    

    return (
        <div className='bg-gray-100 mx-1 font-body scroll-smooth h-0'>
            <Navigation />
                <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap overflow-x-hidden">
                  
                    <SidebarNavigation />
                    <section className="bg-white mt-12 m-2 p-2 w-full rounded-lg relative overflow-x-auto shadow-md">
                        <h1 className="font-bold text-lg text-center underline">My Dashboard</h1>
                        {isLoading && <p>Loading.........</p>}
                        
                        <Table hoverable={true}>
                            <Table.Head>
                                <Table.HeadCell className="bg-warning">
                                    Index SN
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Description Category
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Owner
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Quantity
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowarp font-medium text-gray-900 dark:text-white">
                                        1
                                    </Table.Cell>
                                    <Table.Cell>
                                        All Books Owned
                                    </Table.Cell>
                                    <Table.Cell>
                                        {currentUser.displayName}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {myBooks.length !== 0 ? myBooks.length : 'Fetching data..'}
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowarp font-medium text-gray-900 dark:text-white">
                                        2
                                    </Table.Cell>
                                    <Table.Cell>
                                        Available Books
                                    </Table.Cell>
                                    <Table.Cell>
                                        {currentUser.displayName}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {myAvailableBooks.length !== 0 ? myAvailableBooks.length : 'Fetching data...'}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowarp font-medium text-gray-900 dark:text-white">
                                        3
                                    </Table.Cell>
                                    <Table.Cell>
                                        Requested Books
                                    </Table.Cell>
                                    <Table.Cell>
                                        {currentUser.displayName}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {myRequestedBooks.length !== 0 ? myRequestedBooks.length : 'Fetching data...'}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowarp font-medium text-gray-900 dark:text-white">
                                        4
                                    </Table.Cell>
                                    <Table.Cell>
                                        Un-Available Books
                                    </Table.Cell>
                                    <Table.Cell>
                                    {currentUser.displayName}
                                    </Table.Cell>
                                    <Table.Cell>
                                    {myNotAvailableBooks.length !== 0 ? myNotAvailableBooks.length : 'Fetching data...'}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </section>
                </main>
            <Footer />
        </div>
    )
}
