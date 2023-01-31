import { Modal } from "flowbite-react";
import { Fragment, useEffect, useState } from "react"
import { FallingLines } from "react-loader-spinner";
import { Table, Button } from "flowbite-react";

import PaginationComponent from "../../components/pagination/pagination-component";
import ButtonComponent from '../../components/button-component/button-component';
import { useDispatch, useSelector } from "react-redux";
import { selectBookRequest } from "../../store/booksRequest/booksRequest.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { setBookRequest } from "../../store/booksRequest/booksRequest.action";

import Footer from "../../components/footer/footer.component";
import Navigation from "../../components/navigation/navigation.component";
import SidebarNavigation from "../../components/sidebar/sidebar.component";
import { getBookRequests } from "../../utils/firebase/firebase.utils";
import { Link } from "react-router-dom";


export default function LendingRequestPage(){
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const dispatch = useDispatch();
    const AllBookRequest = useSelector(selectBookRequest);
    const currentUser = useSelector(selectCurrentUser);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    

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
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastItem - itemsPerPage;
    const currentItems = AllBookRequest.filter((items) => items.borrowers_name !== currentUser.displayName).slice(indexOfFirstPost, indexOfLastItem);
    const pageNumber = Math.ceil((AllBookRequest.filter((items) => items.borrowers_name !== currentUser.displayName).length) / itemsPerPage);


    const onPageChange = (event) => {
        setCurrentPage(event);
    }


    const handleClick = () => {
        console.log("Hello World")
    }
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
                        <h1 className="font-bold text-lg text-center underline text-gray-600">Open Lending Requests</h1>
                       

                        <Table className="mt-6" hoverable={true}>
                            <Table.Head >
                                <Table.HeadCell className="bg-red-400">
                                    Index SN
                                </Table.HeadCell>
                                <Table.HeadCell className="truncate">
                                    Book Name
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Requested By
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Status
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    {/* Action */}
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    {/* Action */}
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    {/* Action */}
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                            
                            {currentItems && currentItems.map((item, index) => (
                               <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 " key={index}>
                                    <Table.Cell className="whitespace-nowarp font-medium text-gray-900 dark:text-white">
                                        {index + 1}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.book_title}
                                    </Table.Cell>
                                    <Table.Cell>
                                    <Link className="text-primary underline">{item.borrowers_name}</Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.request_status}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <ButtonComponent btnColor="blue" btnValue="Approve" btnSize="px-4 py-2 mt-2" />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <ButtonComponent btnColor="red" btnValue="Decline" btnSize="px-4 py-2 mt-2" />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <ButtonComponent btnColor="purple" btnValue="Message" btnSize="px-4 py-2 mt-2" />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                                
                            </Table.Body>
                        </Table>
                            <PaginationComponent currentPage={currentPage} pageNumbers={pageNumber} onPageChange={onPageChange} />
                    </section>
                    
            </main>
            <Footer/>
        </div>
    )
}