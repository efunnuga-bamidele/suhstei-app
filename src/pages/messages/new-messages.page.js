import { useRef } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri'
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/navigation/navigation.component'
import SidebarNavigation from "../../components/sidebar/sidebar.component";



export default function NewMessagePage() {

    const ref = useRef()

    const onEnterPress = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
          e.preventDefault();
        //   this.myFormRef.requestSubmit();
        console.log("Form submitted")
        }
      }

      const handleSend = (e) => {
        e.preventDefault();
        console.log("Form submitted")
      }

    return (
        <div className='bg-gray-100 mx-1 font-body scroll-smooth h-0'>
            <Navigation />
            <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap overflow-x-hidden">

                <SidebarNavigation />
                <section className="bg-white mt-12 m-2 p-2 w-full rounded-lg relative overflow-x-auto shadow-md">
                    <h1 className="font-bold text-lg text-left underline">New Message</h1>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
                        <div className='bg-gray-400 hidden md:block h-96 md:col-span-1'>
                            {/* list of users */}
                        </div>
                        {/* ----------------------------- */}
                        <div className='bg-gray-300 rounded-lg h-96 grid grid-rows-6 col-span-4 md:col-span-3'>
                            {/* Message Section */}
                            <div className='bg-slate-300 border border-gray-300 rounded-lg px-4 py-4 row-span-5 overflow-y-scroll scroll-smooth'>
                                {/* Message list */}
                                01

                            </div>
                            <div className='bg-slate-100 row-span-1'>
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
                                        <textarea type="text" rows={1} id="simple-search" className="block w-full p-4 pl-24 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" placeholder="Your message..." onKeyDown={onEnterPress} autoFocus={true}></textarea>
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

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
    // const messageClass = uid === selectCurrentUser.uid ? 'sent' : 'received';

    return (
        <>
            <div>
                <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='' />
                <p>{text}</p>
            </div>
        </>
    )
}