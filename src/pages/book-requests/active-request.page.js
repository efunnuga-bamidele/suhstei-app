import { Modal } from "flowbite-react";
import { Fragment, useEffect, useState } from "react"
import { FallingLines } from "react-loader-spinner";
import { Table } from "flowbite-react";
// import { convertTimestamp } from "convert-firebase-timestamp";


import { useDispatch, useSelector } from "react-redux";
import { selectBookRequest } from "../../store/booksRequest/booksRequest.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { setBookRequest } from "../../store/booksRequest/booksRequest.action";

import Footer from "../../components/footer/footer.component";
import Navigation from "../../components/navigation/navigation.component";
import SidebarNavigation from "../../components/sidebar/sidebar.component";
import { getBookRequests } from "../../utils/firebase/firebase.utils";


export default function ActiveRequestPage(){
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const dispatch = useDispatch();
    const AllBookRequest = useSelector(selectBookRequest);
    const currentUser = useSelector(selectCurrentUser);
    

    const convertTimestamp = (timestamp) => {
        let date = timestamp.toDate();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        let yyyy = date.getFullYear();
    
        date = mm + '/' + dd + '/' + yyyy;
        return date;
    }
    useEffect(()=> {
    const getBookRequest =  async () => {
        setShowLoadingModal(true)
        const response = await getBookRequests(currentUser.uid);
        dispatch(setBookRequest(response.book_requests))
        // console.log(response);
        setShowLoadingModal(false)
    }

    getBookRequest();
    },[])

    return(
        <div className='bg-gray-100 mx-1 font-body scroll-smooth h-0'>
            <Navigation />
            <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap overflow-x-hidden">

                <Fragment>
                    <Modal
                        show={showLoadingModal}
                        size="md"
                        popup={true}
                        onClose={showLoadingModal}
                        className="max-md:pt-32 mt-10 bg-opacity-60"
                    >
                        <Modal.Body>
                            <div className="grid col-span-full place-items-center h-56">
                                <FallingLines
                                    color="#1e94cc"
                                    width="120"
                                    visible={true}
                                    ariaLabel="falling-lines-loading"
                                />
                            </div>
                        </Modal.Body>
                    </Modal>
                </Fragment>

                <SidebarNavigation />
                <section className="bg-white mt-12 m-2 p-2 w-full rounded-md relative overflow-x-auto">
                        <h1 className="font-bold text-lg text-center underline text-gray-600">Active Request</h1>
                       

                        <Table className="mt-6" hoverable={true}>
                            <Table.Head >
                                <Table.HeadCell className="bg-red-400">
                                    Index SN
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Book Name
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Requested By
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Requested Date
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Received Date
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Due Date
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Returned Date
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Status
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Action
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Action
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                            
                            {AllBookRequest && AllBookRequest.map((item, index) => (
                               <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 " key={index}>
                                    <Table.Cell className="whitespace-nowarp font-medium text-gray-900 dark:text-white">
                                        {index + 1}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.book_title}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.borrowers_name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        { item.request_date !== null ? convertTimestamp(item.request_date) : "No Data"}
                                    </Table.Cell>
                                    <Table.Cell>
                                        { item.received_date !== null ? convertTimestamp(item.received_date) : "No Data"}
                                    </Table.Cell>
                                    <Table.Cell>
                                        { item.due_date !== null ? convertTimestamp(item.due_date) : "No Data"}
                                    </Table.Cell>
                                    <Table.Cell>
                                        { item.return_date !== null ? convertTimestamp(item.return_date) : "No Data"}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.request_status}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {<button 
                                            type="button" 
                                            className="inline-block px-7 py-3 mt-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                            data-mdb-ripple="true"
                                            data-mdb-ripple-color="light"
                                            // onClick={(ev) => handleClick(bookDetails)}
                                        >
                                            Aprove
                                        </button>}
                                    </Table.Cell>
                                    <Table.Cell>
                                    {<button 
                                            type="button" 
                                            className="inline-block px-7 py-3 mt-2 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                            data-mdb-ripple="true"
                                            data-mdb-ripple-color="light"
                                            // onClick={(ev) => handleClick(bookDetails)}
                                        >
                                            Cancel
                                        </button>}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                                
                            </Table.Body>
                        </Table>
                    </section>
            </main>
            <Footer/>
        </div>
    )
}