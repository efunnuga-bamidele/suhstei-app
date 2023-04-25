import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import Img from "../../assets/auth/icons8_male_user_500px.png"

const Message = ({ msg, user1, chat, currentUserProfile }) => {
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msg]);

    return (
        <div className={`chat chat-${msg.from === user1 ? ("start") : ("end")}`} ref={scrollRef}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={msg.from === user1 ? (
                        currentUserProfile.photoURL ? currentUserProfile.photoURL : Img
                    ) : (
                        chat.photoURL ? chat.photoURL : Img
                    )} />
                </div>
            </div>
            <div className="chat-header">
                {msg.from === user1 ? "me" : `${chat.displayName}`}
            </div>
            <div className="chat-bubble chat-bubble-primary">
                {msg.media
                    ?
                    <img src={msg.media} alt={msg.content} className="min-h-40 w-40 sm:min-h-40 sm:w-40 aspect-w-1 aspect-h-1" />
                    : null}
                {msg.content}
            </div>
            <div className="chat-footer opacity-100">
                <time className="text-xs"><Moment fromNow>{msg.createdAt.toDate()}</Moment></time>
            </div>
        </div>
    )
}

export default Message;