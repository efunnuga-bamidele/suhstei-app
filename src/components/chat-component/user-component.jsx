import { Fragment, useEffect, useState } from "react";
import Img from "../../assets/auth/icons8_male_user_500px.png"
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import { Avatar } from 'flowbite-react';

const User = ({ user1, user, handleSelectUser, chat }) => {
    const user2 = user?.id;
    const [data, setData] = useState("");

    useEffect(() => {
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

        let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
            setData(doc.data());
        })

        return () => unsub();
    }, []);

    return (
        // <div className={`user_wrapper ${chat.displayName === user.displayName && "selected_user"}`} onClick={() => selectUser(user)}>
        <div onClick={() => handleSelectUser(user)} className="cursor-pointer mb-2">

            <div className='user_info'>
                <div className='user_detail'>
                    {/* <img className="w-8 h-8 rounded-full" src={user.photoURL || Img} /> */}
                    {/* <div className="indicator"> */}
                    {/* <img src={user.photoURL || Img} alt="avatar" className="avatar " /> */}
                    {/* <img className="w-12 h-12 rounded-full" src={user.photoURL || Img} />  */}
                    <Avatar
                        alt="avatar"
                        className="w-13 h-13"
                        img={user.photoURL || Img}
                        rounded={true}
                        status={user.isOnline ? "online" : "offline"}
                        statusPosition="top-left"
                    />
                    {/* </div> */}
                    <h4 className="hidden lg:block indicator">{user.displayName}</h4>
                    {data?.from !== user1 && data?.unread && (
                        <span className=" ml-1 mb-4 indicator-item indicator-bottom badge badge-secondary">New</span>
                        // <span className="ml-1 mb-4 indicator-item badge badge-secondary"></span>
                    )}

                </div>
            </div>
        </div>
    )
}

export default User