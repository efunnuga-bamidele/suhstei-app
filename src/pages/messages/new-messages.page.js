import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCurrentUserProfile } from '../../store/userProfileData/userProfileData.selector';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/navigation/navigation.component'
import SidebarNavigation from "../../components/sidebar/sidebar.component";
import { Alert } from 'flowbite-react'
import { HiOutlineInformationCircle } from "react-icons/hi"

import { db, auth, storage } from '../../utils/firebase/firebase.utils';
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    Timestamp,
    orderBy,
    setDoc,
    doc,
    getDoc,
    updateDoc,
    getDocs,
} from "firebase/firestore";

import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from '../../components/chat-component/user-component';
import Message from '../../components/chat-component/message-component';
import FileResizer from 'react-image-file-resizer'

export default function NewMessagePage() {
    const currentUser = useSelector(selectCurrentUser);
    const currentUserProfile = useSelector(selectCurrentUserProfile);
    const [content, setContent] = useState('');
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState(null);
    const [img, setImg] = useState("");
    const [msgs, setMsgs] = useState([]);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    // const [redirectData, setRedirectData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate()

    const user1 = currentUser.uid.trim();

    const resizeFile = (file) =>
        new Promise((resolve) => {
            FileResizer.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

    const handleFileChange = async (event) => {
        // console.log("Upload Triggered")
        setImg("");
        setError('')
        let selected = event.target.files[0];
        const resizedImage = await resizeFile(selected);

        if (!resizedImage) {
            setError("Please select a file");
            setTimeout(() => setError(''), 10000);
            return;
        }
        if (!resizedImage.type.includes('image')) {
            setError("Selected file must be an image");
            setTimeout(() => setError(''), 10000);
            return;
        }
        if (resizedImage.size > 1000000) {
            setError("Image file size must beless than 1mb");
            setTimeout(() => setError(''), 10000);
            return;
        }
        setError('')
        setImg(resizedImage);

    }

    //Get users on platform
    useEffect(() => {
        if (location.state && location.state.name) {
            const unsub = async () => {
                const q = query(collection(db, "users"), where("displayName", "==", location.state.name))

                const querySnapshot = await getDocs(q)
                querySnapshot.forEach((doc) => {
                    handleSelectUser(doc.data());
                });
            }
            unsub();
            // Clear history
            navigate(location.pathname, { replace: true });
        }
        const usersRef = collection(db, "users");
        // create query object
        const q = query(usersRef, where("id", "not-in", [user1]));
        // execute query
        const unsub = onSnapshot(q, (querySnapshot) => {
            let users = []
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            setUsers(users);
        });
        return () => unsub();
    }, [])



    const handleSelectUser = async (user) => {
        setChat(user)
        // console.log(user)

        const user2 = user.id;
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

        const msgsRef = collection(db, "messages", id, "chat");
        const q = query(msgsRef, orderBy("createdAt", "asc"));

        onSnapshot(q, (querySnapshot) => {
            let msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push(doc.data());
            });
            setMsgs(msgs);
        });

        // get last message b/w logged in user and selected user
        const docSnap = await getDoc(doc(db, "lastMsg", id));
        // if last message exists and message is from selected user
        if (docSnap.data() && docSnap.data().from !== user1) {
            // update last message doc, set unread to false
            await updateDoc(doc(db, "lastMsg", id), { unread: false });
        }
    }


    const handleChange = (event) => {
        setContent(event.target.value)
    }


    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            handleSend(e)
        }
    }



    const handleSend = async (e) => {
        e.preventDefault();

        if (chat) {
            const user2 = chat.id;

            const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

            let url;
            if (img) {
                const imgRef = ref(
                    storage,
                    `images/${new Date().getTime()} - ${img.name}`
                );
                const snap = await uploadBytes(imgRef, img);
                const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
                url = dlUrl
            }

            await addDoc(collection(db, "messages", id, "chat"), {
                content,
                from: user1,
                to: user2,
                createdAt: Timestamp.fromDate(new Date()),
                media: url || "",
            });

            await setDoc(doc(db, "lastMsg", id), {
                content,
                from: user1,
                to: user2,
                createdAt: Timestamp.fromDate(new Date()),
                media: url || "",
                unread: true,
            });

            setContent("");
            setImg("");
        }

    }




    return (
        <div className='bg-gray-100 mx-1 font-body scroll-smooth h-0'>
            <Navigation />
            <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap overflow-x-hidden">

                <SidebarNavigation />
                <section className="bg-white mt-12 m-2 p-2 w-full rounded-lg relative overflow-hidden shadow-md max-h-[80vh]">
                    <div className="flex justify-end text-md breadcrumbs text-slate-500 ">
                        <ul >
                            <li>Message Room</li>
                            {chat
                                ? (
                                    <li>{`Chatting with ${chat.displayName}`}</li>
                                )
                                : (
                                    <li>Select an active room to start conversation</li>
                                )
                            }
                        </ul>
                    </div>

                    {/* Alert section */}
                    <div className='relative z-0 mb-6 w-full group'>
                        {/* error alert */}
                        {error &&
                            <Alert
                                color='failure'
                                icon={HiOutlineInformationCircle}
                            >
                                <span>
                                    {error}
                                </span>
                            </Alert>
                        }
                        {/* success alert */}
                        {success &&
                            <Alert
                                color='success'
                                icon={HiOutlineInformationCircle}
                            >
                                <span>
                                    {success}
                                </span>
                            </Alert>

                        }
                    </div>
                    <div className='grid grid-cols-4 gap-2'>
                        {/* <div className='bg-gray-100 hidden border-2 border-slate-200 p-2 md:block max-h-[60vh] md:col-span-1 overflow-y-scroll scroll-smooth'> */}
                        <div className='bg-gray-100 border-2 border-slate-200 p-2 min-h-[50vh] max-h-[65vh] md:col-span-1 overflow-y-scroll scroll-smooth'>
                            {/* list of users */}
                            <h5 className='text-sm md:text-md text-gray-700 font-extrabold pb-3 text-right'>Active Rooms</h5>
                            {users.map((user) => (
                                <User
                                    key={user.id}
                                    user={user}
                                    handleSelectUser={handleSelectUser}
                                    user1={user1}
                                    chat={chat}
                                />
                            ))}
                        </div>
                        {/* ----------------------------- */}
                        {/* <div className='bg-gray-100 rounded-lg border-2 border-slate-200 p-1 max-h-[60vh] grid grid-rows-6 col-span-4 md:col-span-3'> */}
                        <div className='bg-gray-100 rounded-lg border-2 border-slate-200 p-1 min-h-[50vh] max-h-[65vh] grid col-span-3'>
                            {/* Message Section */}
                            <div className='bg-slate-300 border border-gray-300 rounded-lg px-4 row-span-5 overflow-y-scroll scroll-smooth'>
                                {/* Message */}

                                <div className="">
                                    {msgs.length && msgs[0]?.to === chat?.id || msgs[0]?.from === chat?.id
                                        ? msgs.map((msg, index) => (
                                            <Message key={index} msg={msg} user1={user1} chat={chat} currentUserProfile={currentUserProfile} />
                                        ))
                                        : null
                                    }
                                </div>
                            </div>


                            <div className='bg-slate-100 row-span-1'>
                                {/* Message Form */}
                                <form className="flex items-center mt-2 message_form" onSubmit={handleSend}>
                                    <label htmlFor="chat" className="sr-only">Your message</label>
                                    <div className="relative w-full ">
                                        <div className='relative hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'>
                                            <label htmlFor="img" className="absolute inset-y-0 left-0 top-4 flex items-center p-2 m-1 text-blue-500 rounded-lg cursor-pointer hover:text-blue-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                <svg aria-hidden="true" style={{}} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                                                <input
                                                    className=""
                                                    // onChange={(e) => setImg(e.target.files[0])}
                                                    onChange={handleFileChange}
                                                    type="file"
                                                    id="img"
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                />
                                            </label>
                                        </div>

                                        {/* <button type="button" className="absolute inset-y-0 left-10 flex items-center p-2 m-1 text-blue-500 rounded-lg cursor-pointer hover:text-blue-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd"></path></svg>
                                            <span className="sr-only">Add emoji</span>
                                        </button> */}
                                        <textarea type="text" rows={1} id="user_message" name="user_message" className="block w-full p-4 pl-11 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" placeholder="Your message..." onKeyDown={onEnterPress} autoFocus={true} onChange={handleChange} value={content}></textarea>
                                    </div>
                                    <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                                        <span className="sr-only">Send message</span>
                                    </button>
                                </form>


                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    )
}

