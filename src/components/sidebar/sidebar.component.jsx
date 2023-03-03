import { useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { 
    FcBarChart,
    FcReading,
    FcSms,
    FcReadingEbook,
    FcSimCardChip,
    FcAddDatabase,
    FcCollaboration
     } from 'react-icons/fc';

export default function SidebarNavigation() {

    const [navClick, setNavClick] = useState();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [navClick]);



    return (
        <div className='w-full md:w-fit mt-0 max-md:hidden md:mt-10 pl-2 pt-0 md:pt-2 pb-2 pr-2 md:pr-0'>
            {/* <div className='h-full grid grid-cols-1'> */}
            <Sidebar className='h-auto md:h-full w-full md:w-60'>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>

                        <span className='flex'>
                            <FcBarChart className='mr-2 ml-2 mb-4' size={25} />
                            <NavLink to="/dashboard" className="dropdown_hover" onClick={() => setNavClick(!navClick)}>Dashboard</NavLink>
                        </span>

                        <Sidebar.Collapse
                            icon={FcReading}
                            label="MyBooks"
                            >
                        <span className='flex ml-6 text-[0.9em]'>
                            <NavLink to="/my-books" className="dropdown_hover ml-6" onClick={() => setNavClick(!navClick)}>View Books</NavLink>
                            <FcReadingEbook className='mr-2 ml-2 mb-2' size={20} />
                        </span>

                        <span className='flex ml-6 text-[0.9em]'>
                            <NavLink to="/create-book" className="dropdown_hover ml-6" onClick={() => setNavClick(!navClick)}>Create Book</NavLink>
                            <FcAddDatabase className='mr-2 ml-2 mb-2' size={20} />
                        </span>

                        </Sidebar.Collapse>
                        
                        <span className='flex'>
                        <FcSms className='mr-3 ml-2 mb-0' size={22} />
                        <NavLink to="/messages" className="dropdown_hover" onClick={() => setNavClick(!navClick)}>Messages</NavLink>
                        </span>
                        {/* <Sidebar.Collapse
                            icon={FcSms}
                            label="Messages"
                            >
                        <span className='flex ml-6 text-[0.9em]'>
                            <NavLink to="/active-message" className="dropdown_hover ml-6" onClick={() => setNavClick(!navClick)}>Active Messages</NavLink>
                            <FcCollaboration className='mr-2 ml-2 mb-2' size={22} />
                        </span>

                        <span className='flex ml-6 text-[0.9em]'>
                            <NavLink to="/new-message" className="dropdown_hover ml-6" onClick={() => setNavClick(!navClick)}>New Messages</NavLink>
                            <FcSms className='mr-2 ml-2 mb-2' size={22} />
                        </span>

                        </Sidebar.Collapse> */}
                        <Sidebar.Collapse
                            icon={FcSimCardChip}
                            label="Book Requests"
                            >
                        <span className='flex ml-6 text-[0.9em]'>
                            <NavLink to="/borrow-request" className="dropdown_hover ml-6" onClick={() => setNavClick(!navClick)}>Borrow Request</NavLink>
                            <FcSimCardChip className='mr-2 ml-2 mb-2' size={22} />
                        </span>
                        <span className='flex ml-6 text-[0.9em]'>
                            <NavLink to="/lending-request" className="dropdown_hover ml-6" onClick={() => setNavClick(!navClick)}>Lending Request</NavLink>
                            <FcSimCardChip className='mr-2 ml-2 mb-2' size={22} />
                        </span>
                        <span className='flex ml-6 text-[0.9em]'>
                            <NavLink to="/closed-request" className="dropdown_hover ml-6" onClick={() => setNavClick(!navClick)}>Closed Request</NavLink>
                            <FcSimCardChip className='mr-2 ml-2 mb-2' size={22} />
                        </span>
                        </Sidebar.Collapse>
                    </Sidebar.ItemGroup>
                    {/* <Sidebar.ItemGroup>
                        <span className='flex'>
                            <FcSettings className='mr-2 ml-2 mb-4' size={25} />
                            <NavLink to="/profile" className="dropdown_hover" >Profile</NavLink>
                        </span>
                    </Sidebar.ItemGroup> */}
                </Sidebar.Items>
            </Sidebar>
            {/* </div> */}
        </div>
    )
}
