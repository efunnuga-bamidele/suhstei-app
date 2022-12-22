import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { 
    FcBarChart,
    FcReading,
    FcSms,
    FcSettings,
    FcReadingEbook,
    FcSimCardChip,
    FcAddDatabase,
    FcCollaboration
     } from 'react-icons/fc';

// import {
//     HiChartPie,
//     HiViewBoards,
//     HiInbox,
//     HiUser,
//     HiShoppingBag,
//     HiArrowSmRight,
//     HiTable,
//     HiScissors
// } from 'react-icons/hi';


export default function SidebarNavigation() {
    return (
        <div className='w-fit mt-10 p-2'>

            <Sidebar aria-label="Sidebar with content separator example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>

                        <span className='flex'>
                            <FcBarChart className='mr-2 ml-2 mb-4' size={25} />
                            <NavLink to="/dashboard" className="dropdown_hover" >Dashboard</NavLink>
                        </span>

                        <Sidebar.Collapse
                            icon={FcReading}
                            label="MyBooks"
                            >
                        <span className='flex ml-6 text-[0.9em]'>
                            <NavLink to="/my-books" className="dropdown_hover ml-6" >View Books</NavLink>
                            <FcReadingEbook className='mr-2 ml-2 mb-2' size={20} />
                        </span>

                        <span className='flex ml-6 text-[0.9em]'>
                            <NavLink to="/create-book" className="dropdown_hover ml-6" >Create Book</NavLink>
                            <FcAddDatabase className='mr-2 ml-2 mb-2' size={20} />
                        </span>

                        </Sidebar.Collapse>

                        <Sidebar.Collapse
                            icon={FcSms}
                            label="Messages"
                            >
                        <span className='flex ml-6 text-[0.9em]'>
                            <NavLink to="/messages" className="dropdown_hover ml-6" >Active Messages</NavLink>
                            <FcCollaboration className='mr-2 ml-2 mb-2' size={22} />
                        </span>

                        <span className='flex ml-6 text-[0.9em]'>
                            <NavLink to="/messages" className="dropdown_hover ml-6" >New Messages</NavLink>
                            <FcSms className='mr-2 ml-2 mb-2' size={22} />
                        </span>

                        </Sidebar.Collapse>
                        <span className='flex'>
                            <FcSimCardChip className='mr-2 ml-2 mb-4' size={25} />
                            <NavLink to="/transactions" className="dropdown_hover" >Trasactions</NavLink>
                        </span>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                        <span className='flex'>
                            <FcSettings className='mr-2 ml-2 mb-4' size={25} />
                            <NavLink to="/profile" className="dropdown_hover" >Profile</NavLink>
                        </span>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>

        </div>
    )
}