import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { 
    FcBarChart,
    FcReading,
    FcSms,
    FcSettings,
    FcPortraitMode,
    FcSimCardChip,
    FcShop
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
                        <span className='flex'>
                            <FcReading className='mr-2 ml-2 mb-4' size={25} />
                            <NavLink to="/my-books" className="dropdown_hover" >My Books</NavLink>
                        </span>
                        <span className='flex'>
                            <FcSms className='mr-2 ml-2 mb-4' size={25} />
                            <NavLink to="/messages" className="dropdown_hover" >Messages</NavLink>
                        </span>
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
