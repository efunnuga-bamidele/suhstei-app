import { Modal } from "flowbite-react";
import { Fragment, useEffect, useState } from "react"
import { FallingLines } from "react-loader-spinner";
import { Table, Card } from "flowbite-react";
import { FcRating } from 'react-icons/fc'

import ButtonComponent from '../../components/button-component/button-component'
import PaginationComponent from "../../components/pagination/pagination-component";

import { useDispatch, useSelector } from "react-redux";
import { selectBookRequest } from "../../store/booksRequest/booksRequest.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { setBookRequest } from "../../store/booksRequest/booksRequest.action";

import Footer from "../../components/footer/footer.component";
import Navigation from "../../components/navigation/navigation.component";
import SidebarNavigation from "../../components/sidebar/sidebar.component";
import { getBookById, getBookRequests, getProfile, RequestResponse } from "../../utils/firebase/firebase.utils";
import { Link } from "react-router-dom";


export default function BorrowRequestPage() {
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const dispatch = useDispatch();
    const AllBookRequest = useSelector(selectBookRequest);
    const currentUser = useSelector(selectCurrentUser);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [profileData, setProfileData] = useState();

    useEffect(() => {
        const getBookRequest = async () => {
            setShowLoadingModal(true)
            const response = await getBookRequests(currentUser.uid);
            dispatch(setBookRequest(response.book_requests))
            setShowLoadingModal(false)
        }

        getBookRequest();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastItem - itemsPerPage;
    const currentItems = AllBookRequest.filter((items) => items.borrowers_name === currentUser.displayName && items.request_status !== "Closed" && items.request_status !== "Canceled").slice(indexOfFirstPost, indexOfLastItem);
    const pageNumber = Math.ceil((AllBookRequest.filter((items) => items.borrowers_name === currentUser.displayName && items.request_status !== "Closed" && items.request_status !== "Canceled").length) / itemsPerPage);


    const onPageChange = (event) => {
        setCurrentPage(event);
    }

    const handleCancel = async (bookDetails) => {
        const data = await getBookById(bookDetails.book_id, bookDetails.book_owner_id);
        const canceledAt = new Date();
        const originalBookData = {
            ...data[0]
        };

        const response = await RequestResponse(originalBookData, bookDetails, canceledAt, currentUser, "Canceled", "Available");
        // console.log("Hello World", response);
        // to be worked on later
        window.location.reload(true)
    }
    const handleClick = () => {
        console.log("Hello World")
    }

    const handleProfileView = async (profileID) => {
        setShowProfileModal(true)
        const data = await getProfile(profileID);
        setProfileData(data)

    }
    const handleClose = () => {
        setShowProfileModal(false);
    }

    return (
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
                {/* Profile Modal */}
                <Fragment>
                    <Modal
                        show={showProfileModal}
                        size="md"
                        popup={true}
                        onClose={handleClose}
                        className="max-md:pt-32 mt-10 bg-opacity-60"
                    >
                        <Modal.Header >

                            <h1 className="font-bold text-lg text-center text-slate-600 pl-5">Book Owner Profile</h1>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="max-w-sm pt-3">
                                <Card>

                                    {profileData ? (
                                        <div className="flex flex-col items-center pb-10">
                                            <img
                                                className="mb-3 h-24 w-24 rounded-full shadow-lg"
                                                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                                                alt="Bonnie image"
                                            />
                                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                                {profileData.displayName}
                                            </h5>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {profileData.email}
                                            </span>

                                            <span className="text-sm text-gray-500 dark:text-gray-400 flex">
                                                <p className="pt-3">13 x </p><FcRating size={40} />
                                            </span>
                                            <div className="mt-4 flex space-x-3 lg:mt-6">
                                                <a
                                                    href="#"
                                                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                                                >
                                                    Message
                                                </a>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid col-span-full place-items-center h-56">
                                            <FallingLines
                                                color="#1e94cc"
                                                width="120"
                                                visible={true}
                                                ariaLabel="falling-lines-loading"
                                            />
                                        </div>
                                    )}

                                </Card>
                            </div>
                            {/* </div> */}
                        </Modal.Body>
                    </Modal>
                </Fragment>

                <SidebarNavigation />
                <section className="bg-white mt-12 m-2 p-2 w-full rounded-md relative overflow-x-auto">
                    <h1 className="font-bold text-lg text-center underline text-gray-600">My Book Requests</h1>


                    <Table className="mt-6" hoverable={true}>
                        <Table.Head >
                            <Table.HeadCell className="bg-red-400">
                                Index SN
                            </Table.HeadCell>
                            <Table.HeadCell className="truncate">
                                Book Name
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Owner's Name
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
                                        {/* To redirect to profile */}
                                        <Link className="text-primary underline" onClick={() => handleProfileView(item.book_owner_id)}>{item.book_owner}</Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.request_status}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <ButtonComponent btnColor="red" btnValue="Cancel" btnSize="px-4 py-2 mt-2" btnClick={() => handleCancel(item)} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <ButtonComponent btnColor="purple" btnValue="Message" btnSize="px-4 py-2 mt-2" btnClick={handleClick} />
                                    </Table.Cell>
                                </Table.Row>
                            ))}

                        </Table.Body>
                    </Table>
                    <PaginationComponent currentPage={currentPage} pageNumbers={pageNumber} onPageChange={onPageChange} />
                </section>
            </main>
            <Footer />
        </div>
    )
}