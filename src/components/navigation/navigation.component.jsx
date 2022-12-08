import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import Logo from '../../assets/icons/new-logo.png'

import './navigation.css';


export default function Navigation() {

  const [currentUser, setCurrentUser] = useState('');

  return (
    
 <header >
 <Navbar
 fluid={true}
 rounded={true}
 className='fixed-top inset-x-0'
>
 <Navbar.Brand href="/">
   <img
     src={Logo}
     className="mr-3 h-6 sm:h-9"
     alt="Suhstei Logo"
   />
   <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">
     Suhstei
   </span>
 </Navbar.Brand>
 <div className="flex md:order-2">
    {currentUser ? 
     <Dropdown
     arrowIcon={false}
     inline={true}
     label={
      <Avatar 
        alt="User settings" 
        img="https://flowbite.com/docs/images/people/profile-picture-3.jpg" 
        rounded={true}
        status="online"
        statusPosition="top-right"
      />
    }
     className="mx-6 px-6"
   >
     <Dropdown.Header>
       <span className="block text-sm mb-2">
         John Doe
       </span>
       <span className="block truncate text-sm font-medium">
         johnDoe@mail.com
       </span>
     </Dropdown.Header>
        <Dropdown.Item>
          <NavLink to="/dashboard" className="dropdown_hover">
            Dashboard
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item>
          <NavLink to="/settings" className="dropdown_hover">
            Settings
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item>
          <NavLink to="dropdown_hover">
            My Books
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <NavLink to="/Signout" className="dropdown_hover">
            Sign out
          </NavLink>
        </Dropdown.Item>
   </Dropdown> :
    <Navbar className='list-none'>
    <NavLink to="/login" className="dropdown_hover">
      Sign-In
    </NavLink>
    </Navbar>
  }
   <Navbar.Toggle className='ml-2' />
 </div>
 <Navbar.Collapse className=''>
   <NavLink to="/" className="nav_hover">
      Home
    </NavLink>
    <NavLink to="/books" className="nav_hover">
      Books
    </NavLink>
    <NavLink to="/community" className="nav_hover">
      Community
    </NavLink>
    <NavLink to="/about-us" className="nav_hover">
      About Us
    </NavLink>
    <NavLink to="/contact" className="nav_hover">
      Contact
    </NavLink>  
   
 </Navbar.Collapse>
</Navbar>

</header>
  )
}


