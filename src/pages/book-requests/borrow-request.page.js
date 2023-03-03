import { Fragment, useEffect, useState } from "react"
import { FallingLines } from "react-loader-spinner";
import { Table, Button, Modal, Card } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi"
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
import { db, getBookById, getBookRequests, getProfile, RequestResponse } from "../../utils/firebase/firebase.utils";
import { Link,useNavigate } from "react-router-dom";

import { doc, updateDoc, getDoc, arrayRemove, setDoc } from "firebase/firestore";


export default function BorrowRequestPage() {
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [itemData, setItemData] = useState()
    const [showProfileModal, setShowProfileModal] = useState(false);
    const dispatch = useDispatch();
    const AllBookRequest = useSelector(selectBookRequest);
    const currentUser = useSelector(selectCurrentUser);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [profileData, setProfileData] = useState();
    const navigate = useNavigate();

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
    const currentItems = AllBookRequest.filter((items) => items.borrowers_name === currentUser.displayName && items.request_status !== "Closed" && items.request_status !== "Canceled" && items.request_status !== "Declined").slice(indexOfFirstPost, indexOfLastItem);
    const pageNumber = Math.ceil((AllBookRequest.filter((items) => items.borrowers_name === currentUser.displayName && items.request_status !== "Closed" && items.request_status !== "Canceled" && items.request_status !== "Declined").length) / itemsPerPage);


    const onPageChange = (event) => {
        setCurrentPage(event);
    }

    const handleConfirmationModal = (bookDetails) => {
        setShowConfirmationModal(showConfirmationModal ? false : true);
        setItemData(bookDetails)
    }

    const handleCancel = async (event) => {
        if (event === "Yes") {
            setShowLoadingModal(true)
            const data = await getBookById(itemData.book_id, itemData.book_owner_id);
            const canceledAt = new Date();
            const originalBookData = {
                ...data[0]
            };

            const response = await RequestResponse(originalBookData, itemData, canceledAt, currentUser, "Canceled", "Available");

            const getNewResponse = await getBookRequests(currentUser.uid);
            dispatch(setBookRequest(getNewResponse.book_requests))
            setShowLoadingModal(false)
        } else {
            setShowConfirmationModal(showConfirmationModal ? false : true);
        }
    }
    const handleMessage = async (itemDetail) => {
        // currentUser.uid
        // currentUser.displayName
        // currentUser.avatarURL
        // itemDetail.book_owner
        // itemDetail.book_owner_id
        // itemDetail.avatarURL
        const chatRoom_id = currentUser.uid + "_" + itemDetail.book_owner_id
        const reversedChatRoom_id = itemDetail.book_owner_id + "_" + currentUser.uid
        let masterRoom_id = "";
        const createdAt = new Date();


        const senderProfile = doc(db, "users", currentUser.uid);
        const receiverProfile = doc(db, "users", itemDetail.book_owner_id);
        const createChatRoom = doc(db, "messages", chatRoom_id);
        const getSenderProfile = await getDoc(senderProfile);
        const getReceiverProfile = await getDoc(receiverProfile);
        const getChatRoom = await getDoc(createChatRoom);

        // Handle Sender Update
        if (getSenderProfile.data()['chat']) { //checks if chat has been created
            // check if room_id exist
            const res = getSenderProfile.data()['chat'].filter((items) => items.room_id === chatRoom_id || items.room_id === reversedChatRoom_id)
            if (res.length === 1) {
                console.log("Can not create duplicate room: ", res[0].room_id);
                navigate('/messages', {state: {room_id: res[0].room_id}})
            } else {
                console.log("No data")
                // update sender user detail with chat room details
                await updateDoc(senderProfile, {
                    chat: [...getSenderProfile.data()['chat'], {
                        room_id: chatRoom_id,
                        receiver_id: itemDetail.book_owner_id,
                        receiver_Name: itemDetail.book_owner,
                        sender_id: currentUser.uid,
                        sender_name: currentUser.displayName,
                        createdAt: createdAt

                    }
                    ]
                })
            }

        } else {
            await updateDoc(senderProfile, {
                chat: [{
                    room_id: chatRoom_id,
                    receiver_id: itemDetail.book_owner_id,
                    receiver_Name: itemDetail.book_owner,
                    sender_id: currentUser.uid,
                    sender_name: currentUser.displayName,
                    createdAt: createdAt

                }
                ]
            })
        }


        // Handle receiver update
        if (getReceiverProfile.data()['chat']) { //checks if chat has been created
            // check if room_id exist
            const res = getReceiverProfile.data()['chat'].filter((items) => items.room_id === chatRoom_id || items.room_id === reversedChatRoom_id)
            if (res.length === 1) {
                console.log("Can not create duplicate room: ", res[0].room_id)
            } else {
                console.log("No data")
                // update receiver user detail with chat room details
                await updateDoc(receiverProfile, {
                    chat: [...getReceiverProfile.data()['chat'], {
                        room_id: chatRoom_id,
                        receiver_id: itemDetail.book_owner_id,
                        receiver_Name: itemDetail.book_owner,
                        sender_id: currentUser.uid,
                        sender_name: currentUser.displayName,
                        createdAt: createdAt

                    }
                    ]
                })


            }

        } else {
            // update receiver user detail with chat room details
            await updateDoc(receiverProfile, {
                chat: [{
                    room_id: chatRoom_id,
                    receiver_id: itemDetail.book_owner_id,
                    receiver_Name: itemDetail.book_owner,
                    sender_id: currentUser.uid,
                    sender_name: currentUser.displayName,
                    createdAt: createdAt

                }
                ]
            })
        }

        // create chat room
        if (getChatRoom.exists()){
            console.log("chat exists")
            // await updateDoc(createChatRoom, {
            //     chat: [...getChatRoom.data()['chat'],
            //         {
            //             senderID: itemDetail.book_owner_id,
            //             createdAt: "8:12",
            //             content: "Please, I want to lend a book from you."
            //         },
            //         {
            //             senderID: currentUser.displayName,
            //             createdAt: "8:13",
            //             content: "Okay, what is the name of the book?"
            //         },
            //     ]
            // })
        }else{
            
            await setDoc(createChatRoom, {
                room_uid: chatRoom_id,
                sender: currentUser.displayName,
                senderId: currentUser.uid,
                senderAvatar: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
                receiver: itemDetail.book_owner,
                receiverId: itemDetail.book_owner_id,
                receiverAvatar: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
                createdAt: createdAt,
                chat: [
                    {
                        senderID: itemDetail.book_owner_id,
                        createdAt: "8:00",
                        content: "hello, welcome to this chat"
                    },
                    {
                        senderID: currentUser.displayName,
                        createdAt: "8:10",
                        content: "hi, welcome to this chat"
                    },
                ]
            })
        }
        // console.log(currentUser)
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
                    {/* Cancel Request Modal */}
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
                                        onClick={() => handleCancel("Yes")}
                                    >
                                        Yes, I'm sure
                                    </Button>
                                    <Button
                                        color="gray"
                                        onClick={() => handleCancel("No")}
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
                                        <ButtonComponent btnColor="red" btnValue="Cancel" btnSize="px-4 py-2 mt-2" btnClick={() => handleConfirmationModal(item)} />
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