import { Fragment, useEffect, useState } from "react"
import { FallingLines } from "react-loader-spinner";
import { Table, Button, Modal, Card } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { FcRating } from 'react-icons/fc'

import PaginationComponent from "../../components/pagination/pagination-component";
import ButtonComponent from '../../components/button-component/button-component';
import { useDispatch, useSelector } from "react-redux";
import { selectBookRequest } from "../../store/booksRequest/booksRequest.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { setBookRequest } from "../../store/booksRequest/booksRequest.action";
import  { selectCurrentUserProfile } from "../../store/userProfileData/userProfileData.selector"

import Footer from "../../components/footer/footer.component";
import Navigation from "../../components/navigation/navigation.component";
import SidebarNavigation from "../../components/sidebar/sidebar.component";
import { getBookById, getBookRequests, RequestResponse, getProfile, createRoom } from "../../utils/firebase/firebase.utils";
import { Link, useNavigate } from "react-router-dom";


export default function LendingRequestPage() {
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [itemData, setItemData] = useState()
    const [showProfileModal, setShowProfileModal] = useState(false);
    const dispatch = useDispatch();
    const AllBookRequest = useSelector(selectBookRequest);
    const currentUser = useSelector(selectCurrentUser);
    const currentUserProfile = useSelector(selectCurrentUserProfile)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [profileData, setProfileData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const getBookRequest = async () => {
            setShowLoadingModal(true)
            const response = await getBookRequests(currentUser.uid);
            if (response !== undefined) {
            dispatch(setBookRequest(response.book_requests))
            }
            setShowLoadingModal(false)
        }

        getBookRequest();
    }, [])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastItem - itemsPerPage;
    const currentItems = AllBookRequest.filter((items) => items.borrowers_name !== currentUser.displayName && items.request_status !== "Closed" && items.request_status !== "Canceled" && items.request_status !== "Declined").slice(indexOfFirstPost, indexOfLastItem);
    const pageNumber = Math.ceil((AllBookRequest.filter((items) => items.borrowers_name !== currentUser.displayName && items.request_status !== "Closed" && items.request_status !== "Canceled" && items.request_status !== "Declined").length) / itemsPerPage);


    const onPageChange = (event) => {
        setCurrentPage(event);
    }

    const handleConfirmationModal = (bookDetails) => {
        setShowConfirmationModal(showConfirmationModal ? false : true);
        setItemData(bookDetails)
    }

    const handleDecline = async (event) => {
        if (event === "Yes") {
            setShowLoadingModal(true);
            const data = await getBookById(itemData.book_id, itemData.book_owner_id);
            const canceledAt = new Date();
            const originalBookData = {
                ...data[0]
            }

            const response = await RequestResponse(originalBookData, itemData, canceledAt, currentUser, "Declined", "Available");

            const getNewResponse = await getBookRequests(currentUser.uid);
            dispatch(setBookRequest(getNewResponse.book_requests))
            setShowLoadingModal(false)
        } else {
            setShowConfirmationModal(showConfirmationModal ? false : true);
        }
    }

    const handleProfileView = async (profileID) => {
        setShowProfileModal(true)
        const data = await getProfile(profileID);
        setProfileData(data)

    }

    const handleClose = () => {
        setShowProfileModal(false);
    }

    const handleMessage = async (itemDetail) => {
        // const res = await createRoom(itemDetail.borrowers_name, currentUser, currentUserProfile)
        //  navigate('/messages', { state: { room_id: res } });
        navigate('/messages', { state: { name: itemDetail.borrowers_name } });
     }

    return (
        <div className='bg-gray-100 mx-1 font-body scroll-smooth h-0'>
            <Navigation />
            <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap overflow-x-hidden">

                <Fragment>
                    {/* Decline Request Modal */}
                    <Modal
                        show={showConfirmationModal}
                        size="md"
                        popup={true}
                        onClose={handleConfirmationModal}
                        className="max-md:pt-32 mt-10"
                    >
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this book?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        color="failure"
                                        onClick={() => handleDecline("Yes")}
                                    >
                                        Yes, I'm sure
                                    </Button>
                                    <Button
                                        color="gray"
                                        onClick={() => handleDecline("No")}
                                    >
                                        No, cancel
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </Fragment>
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
                        <Modal.Header  >
                            <p className="font-bold text-lg text-center text-gray-600 pl-5">Book Owner Profile</p>
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
                    <h1 className="font-bold text-xl text-right pr-4 underline text-slate-500 my-4">Open Lending Requests</h1>


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
                                        <Link className="text-primary underline" onClick={() => handleProfileView(item.book_owner_id)}>{item.borrowers_name}</Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.request_status}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <ButtonComponent btnColor="blue" btnValue="Approve" btnSize="px-4 py-2 mt-2" />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <ButtonComponent btnColor="red" btnValue="Decline" btnSize="px-4 py-2 mt-2" btnClick={() => handleConfirmationModal(item)} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <ButtonComponent btnColor="purple" btnValue="Message" btnSize="px-4 py-2 mt-2" btnClick={() => handleMessage(item)} />
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