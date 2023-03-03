import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/navigation/navigation.component'
import SidebarNavigation from "../../components/sidebar/sidebar.component";
import ProfileImage from '../../assets/auth/icons8_male_user_500px.png';
import './messages.css'

import { db, getMessages } from '../../utils/firebase/firebase.utils';
import { doc, onSnapshot, getDoc, updateDoc, QuerySnapshot } from 'firebase/firestore';


const people = [
    {
        displayName: "Tunde Wale",
        userId: "1",
        photoURL: "https://flowbite.com/docs/images/people/profile-picture-1.jpg"
    },
    {
        displayName: "Neil Cole",
        userId: "2",
        photoURL: "https://flowbite.com/docs/images/people/profile-picture-2.jpg"
    },
    {
        displayName: "Sarah sharp",
        userId: "3",
        photoURL: "https://flowbite.com/docs/images/people/profile-picture-3.jpg"
    },
    {
        displayName: "Nina Austin",
        userId: "4",
        photoURL: "https://flowbite.com/docs/images/people/profile-picture-4.jpg"
    },
    {
        displayName: "Peter Smith",
        userId: "5",
        photoURL: "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
    },
]

export default function NewMessagePage() {
    const currentUser = useSelector(selectCurrentUser);
    const location = useLocation()
    const [activeRoom, setActiveRoom] = useState();
    const [currentRoom, setCurrentRoom] = useState('');
    const [content, setContent] = useState('');
    const [activeMessages, setActiveMessages] = useState();

    const scroll = useRef();



    const handleChange = (event) => {
        setContent(event.target.value)
    }

    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            handleSend(e)
            scroll.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }

    const handleSend = async (e) => {
        e.preventDefault();
        

        const createChatRoom = doc(db, "messages", activeRoom);
        const getChatRoom = await getDoc(createChatRoom);

        await updateDoc(createChatRoom, {
            chat: [...getChatRoom.data()['chat'],
            {
                senderID: currentUser.uid,
                senderName: currentUser.displayName,
                createdAt: new Date(),
                content: content
            }
            ]
        })
        scroll.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        setContent("");
        
    }

    useEffect(() => {
        if (currentRoom){
            setActiveRoom(currentRoom)
        }
        else{
            setActiveRoom(location.state['room_id'])
        }
        if (activeRoom) {
            const unsubscribe = onSnapshot(doc(db, "messages", activeRoom), (doc) => {
                setActiveMessages(doc.data());
                scroll.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            });
            
            return () => unsubscribe;
        }
    }, []);


    return (
        <div className='bg-gray-100 mx-1 font-body scroll-smooth h-0'>
            <Navigation />
            <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap overflow-x-hidden">

                <SidebarNavigation />
                <section className="bg-white mt-12 m-2 p-2 w-full rounded-lg relative overflow-x-auto shadow-md">
                    <h1 className="font-bold text-lg text-left underline">Message Room</h1>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
                        <div className='bg-gray-100 hidden border-2 border-slate-200 p-2 md:block max-h-[60vh] md:col-span-1 overflow-y-scroll scroll-smooth'>
                            {/* list of users */}
                            <h5 className='text-md text-gray-700 font-extrabold pb-3 text-right'>Active Chats</h5>
                            <ul className='max-w-md divide-y divide-gray-200 dark:divide-gray-700'>

                                <ChatList users={currentUser} />

                            </ul>
                        </div>
                        {/* ----------------------------- */}
                        <div className='bg-gray-100 rounded-lg border-2 border-slate-200 p-1 max-h-[60vh] grid grid-rows-6 col-span-4 md:col-span-3'>
                            {/* Message Section */}
                            <div className='bg-slate-300 border border-gray-300 rounded-lg px-4 py-4 row-span-5 overflow-y-scroll scroll-smooth'>
                                {/* Message */}
                                {activeMessages &&
                                <ChatMessage chat={activeMessages} />
                                }
                                <span ref={scroll}></span>
                            </div>


                            <div className='bg-slate-100 row-span-1'>
                                {/* Message Form */}
                                <form className="flex items-center mt-2" onSubmit={handleSend}>
                                    <label htmlFor="chat" className="sr-only">Your message</label>
                                    <div className="relative w-full ">
                                        <button type="button" className="absolute inset-y-0 left-0 flex items-center p-2 m-1 text-blue-500 rounded-lg cursor-pointer hover:text-blue-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                                            <span className="sr-only">Upload image</span>
                                        </button>
                                        <button type="button" className="absolute inset-y-0 left-10 flex items-center p-2 m-1 text-blue-500 rounded-lg cursor-pointer hover:text-blue-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd"></path></svg>
                                            <span className="sr-only">Add emoji</span>
                                        </button>
                                        <textarea type="text" rows={1} id="user_message" name="user_message" className="block w-full p-4 pl-24 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" placeholder="Your message..." onKeyDown={onEnterPress} autoFocus={true} onChange={handleChange} value={content}></textarea>
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

function ChatMessage({ chat }) {

    const currentUser = useSelector(selectCurrentUser);
    const convertTimestamp = (timestamp) => {
        let date = timestamp.toDate();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        let yyyy = date.getFullYear();
    
        date = mm + '/' + dd + '/' + yyyy;
        return date;
    }
    return (
        <>
            {chat['chat'] && chat['chat'].map((message, index) => (
                <div key={index} className={`chat-bubble ${message.senderID === currentUser.uid ? "right" : "left"}`}>
                    <img
                        className="chat-bubble__left"
                        src={message.senderID === currentUser.uid  ? chat['senderAvatar'] || ProfileImage : chat['receiverAvatar'] || ProfileImage}
                        alt="user avatar"
                    />
                    <div className="chat-bubble__right">
                        <p className="user-name">{message.senderID === currentUser.uid  ? chat['sender'] : chat['receiver']}</p>
                        <p className="user-message">{message.content}</p>
                        <p className="message-time">{convertTimestamp(message.createdAt)}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

function ChatList({ users }) {
    return (
        <>
            {
                users && users['chat'].map((user, index) => (
                    <li className='pb-2 sm:pb-3' key={index}>
                        <div className='flex items-center space-x-4'>
                            <div className='flex-shrink-0'>
                                <img className="w-8 h-8 rounded-full" src={user.photoURL || ProfileImage} alt="Neil image" />
                            </div >
                            <div className='flex-1 min-w-0'>
                                <button className='inline-flex items-left justify-start pl-4 p-2 mt-2 w-full text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'>{user.displayName}</button>
                            </div>
                        </div>
                    </li>

                ))
            }
        </>
    )
}