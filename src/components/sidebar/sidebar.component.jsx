import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { FcBarChart } from 'react-icons/fc';

import {
    HiChartPie,
    HiViewBoards,
    HiInbox,
    HiUser,
    HiShoppingBag,
    HiArrowSmRight,
    HiTable,
    HiScissors
} from 'react-icons/hi';


export default function SidebarNavigation() {
    return (
        <div className='w-fit mt-10 p-2'>

            <Sidebar aria-label="Sidebar with content separator example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <span className='flex'>
                            <FcBarChart className='mr-2 ml-2 mb-4' size={25} />
                            <NavLink to="/dashboard" className="nav_hover" >Dashboard</NavLink>
                        </span>
                        <span className='flex'>
                            <HiViewBoards className='mr-2 ml-2 mb-4' size={25} />
                            <NavLink to="/contact" className="nav_hover" >Kanban</NavLink>
                        </span>
                        <span className='flex'>
                            <HiInbox className='mr-2 ml-2 mb-4' size={25} />
                            <NavLink to="/contact" className="nav_hover" >Inbox</NavLink>
                        </span>
                        <span className='flex'>
                            <HiUser className='mr-2 ml-2 mb-4' size={25} />
                            <NavLink to="/contact" className="nav_hover" >Users</NavLink>
                        </span>
                        <span className='flex'>
                            <HiShoppingBag className='mr-2 ml-2 mb-4' size={25} />
                            <NavLink to="/contact" className="nav_hover" >Books</NavLink>
                        </span>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>

                        <span className='flex'>
                            <HiChartPie className='mr-2 ml-2 mb-4' size={25} />
                            <NavLink to="/contact" className="nav_hover" >Upgrade to Pro</NavLink>
                        </span>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>

        </div>
    )
}
