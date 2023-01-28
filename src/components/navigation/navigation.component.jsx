
import { NavLink } from 'react-router-dom';
import { Navbar, Avatar } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';

import Logo from '../../assets/icons/new-logo.png'
import ProfileImage from '../../assets/auth/icons8_male_user_500px.png';

//redux imports
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector'

//firebase import 
import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.css';


export default function Navigation() {

  const currentUser = useSelector(selectCurrentUser);

  return (
    
 <header  className='mb-6 z-50'>
 <Navbar
 fluid={true}
 rounded={true}
 className='fixed-top inset-x-0'
>
 <Navbar.Brand href="/">
   <img
     src={Logo}
     className="ml-4 h-12 sm:h-12"
     alt="Suhstei Logo"
   />
   {/* <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">
     Suhstei
   </span> */}
 </Navbar.Brand>
 <div className="flex md:order-2">
    {
      currentUser ? (
     <Dropdown
     arrowIcon={false}
     inline={true}
     label={
      <Avatar 
        alt="User settings" 
        img={ProfileImage} 
        rounded={true}
        status="online"
        statusPosition="top-right"
      />
    }
     className="mx-6 px-6"
   >
     <Dropdown.Header>
       <span className="block text-sm mb-2">
         {currentUser.displayName}
       </span>
       <span className="block truncate text-sm font-medium">
         {currentUser.email}
       </span>
     </Dropdown.Header>
        <Dropdown.Item className="cursor-default">
            <NavLink to="/profile" className="dropdown_hover">
              Profile
            </NavLink>
          </Dropdown.Item>
        <Dropdown.Item className="cursor-default">
          <NavLink to="/dashboard" className="dropdown_hover">
            Dashboard
          </NavLink>
        </Dropdown.Item>
        {/* collapsable Menu */}
        <Dropdown
            id= "collapsable-dropdown"
            color="white"
            label="My Books"
            placement="bottom-start"
            dismissOnClick={false}
          >
              <Dropdown.Item className="cursor-default grid md:hidden">
                  <NavLink to="/my-books" className="dropdown_hover">
                    View Books
                  </NavLink>
              </Dropdown.Item>
              <Dropdown.Item className="cursor-default grid md:hidden">
                <NavLink to="/create-book" className="dropdown_hover">
                  Create Book
                </NavLink>
              </Dropdown.Item>
        </Dropdown>
        {/* End */}
        {/* collapsable Menu */}
        <Dropdown
            id= "collapsable-dropdown"
            color="white"
            label="Messages"
            placement="bottom-start"
            dismissOnClick={false}
          >
              <Dropdown.Item className="cursor-default grid md:hidden">
                <NavLink to="/messages" className="dropdown_hover">
                  Active Messages
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item className="cursor-default grid md:hidden">
                <NavLink to="/messages" className="dropdown_hover">
                  New Messages
                </NavLink>
              </Dropdown.Item>
        </Dropdown>
        {/* End */}
        {/* collapsable Menu */}
        <Dropdown
            id= "collapsable-dropdown"
            color="white"
            label="Book Requests"
            placement="bottom-start"
            dismissOnClick={false}
          >
              <Dropdown.Item className="cursor-default grid md:hidden">
                <NavLink to="/borrow-request" className="dropdown_hover">
                  Borrow Request
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item className="cursor-default grid md:hidden">
                <NavLink to="/lending-request" className="dropdown_hover">
                  Lending Request
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item className="cursor-default grid md:hidden">
                <NavLink to="/closed-request" className="dropdown_hover">
                  Closed Request
                </NavLink>
              </Dropdown.Item>

          </Dropdown>
        <Dropdown.Item className="cursor-default">
          <NavLink to="/settings" className="dropdown_hover">
            Settings
          </NavLink>
        </Dropdown.Item>

        <Dropdown.Divider />
        <Dropdown.Item className="cursor-default">
          <NavLink as="Link" onClick={signOutUser} className="dropdown_hover">
            Sign out
          </NavLink>
        </Dropdown.Item>
   </Dropdown> ) : (
    <Navbar className='list-none'>
      <NavLink to="/login" className="dropdown_hover">
        Sign-In
      </NavLink>
    </Navbar>
   )
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
    {/* {currentUser &&
    <NavLink to="/profile" className="nav_hover">
      Profile
    </NavLink>
    } */}
   
 </Navbar.Collapse>
</Navbar>

</header>
  )
}


