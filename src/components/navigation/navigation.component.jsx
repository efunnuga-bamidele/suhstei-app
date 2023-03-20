
import { useState, useEffect} from 'react'
import { useNavigation, useNavigate, Navigate, NavLink } from 'react-router-dom';
import { Navbar, Avatar, Dropdown } from 'flowbite-react';
import { MdDashboard, MdMessage } from 'react-icons/md';
import { HiOutlineAdjustments, HiUserCircle, HiLogout, HiLogin } from 'react-icons/hi';
// import { HiUserCircle } from 'react-icons/md';

import Logo from '../../assets/icons/new-logo.png'
import ProfileImage from '../../assets/auth/icons8_male_user_500px.png';

//redux imports
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector'

//firebase import 
import { db, signOutUser, userOnlineStstus } from '../../utils/firebase/firebase.utils';

import './navigation.css';
import { doc, onSnapshot } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';


export default function Navigation() {

  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();


    const [navClick, setNavClick] = useState();
    const [user, setUser] = useState();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [navClick]);

    useEffect(() => {
      if (currentUser !== null){
        setUser(currentUser.uid)
        // console.log("initial status update")
        userOnlineStstus(currentUser.uid);
      }else{
        userOnlineStstus(user);
      }

    }, [])

    // useEffect(() => {
    //   // const db = getDatabase()
      
    //   if (currentUser !== null){
        
    //     console.log("check status update")
    //     const userStatusFirestoreRef = doc(db, '/status/' + currentUser.uid)
    //     // onSnapshot
    //     onSnapshot(userStatusFirestoreRef, (doc) => {
    //       var isOnline = doc.data().state == 'online';
    //       console.log("User Status: ",isOnline)
    //     });
    //     //   const unsub = onSnapshot(userStatusFirestoreRef, (doc) => {
    //     //     var isOnline = doc.data().state == 'online';
    //     //     console.log("User Status: ",isOnline)
    //     // });

    //     // return unsub()
    //   }
    // }, [])


    const logoutHandle = async () => {
      const res = await signOutUser()
      if (res === "success") {
        setTimeout(() => {
          navigate("/")
        }, 500)
      }
    }

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
        <HiUserCircle className='mr-2' size={22} />
            <NavLink to="/profile" className="dropdown_hover" onClick={() => setNavClick(!navClick)}>
              Profile
            </NavLink>
          </Dropdown.Item>
        <Dropdown.Item className="cursor-default">
          <MdDashboard className='mr-2' size={22} />
          <NavLink to="/dashboard" className="dropdown_hover" onClick={() => setNavClick(!navClick)}>
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
                  <NavLink to="/my-books" className="dropdown_hover" onClick={() => setNavClick(!navClick)}>
                    View Books
                  </NavLink>
              </Dropdown.Item>
              <Dropdown.Item className="cursor-default grid md:hidden">
                <NavLink to="/create-book" className="dropdown_hover" onClick={() => setNavClick(!navClick)}>
                  Create Book
                </NavLink>
              </Dropdown.Item>
        </Dropdown>
        {/* End */}
        {/* collapsable Menu */}
        <Dropdown.Item className="cursor-default">
          <MdMessage className='mr-2' size={22} />
          <NavLink to="/messages" className="dropdown_hover" onClick={() => setNavClick(!navClick)}>
                  Messages
                </NavLink>
        </Dropdown.Item>
        <Dropdown
            id= "collapsable-dropdown"
            color="white"
            label="Book Requests"
            placement="bottom-start"
            dismissOnClick={false}
          >
              <Dropdown.Item className="cursor-default grid md:hidden">
                <NavLink to="/borrow-request" className="dropdown_hover" onClick={() => setNavClick(!navClick)}>
                  Borrow Request
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item className="cursor-default grid md:hidden">
                <NavLink to="/lending-request" className="dropdown_hover" onClick={() => setNavClick(!navClick)}>
                  Lending Request
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item className="cursor-default grid md:hidden">
                <NavLink to="/closed-request" className="dropdown_hover" onClick={() => setNavClick(!navClick)}>
                  Closed Request
                </NavLink>
              </Dropdown.Item>

          </Dropdown>
        <Dropdown.Item className="cursor-default">
        <HiOutlineAdjustments className='mr-2' size={22} />
          <NavLink to="/settings" className="dropdown_hover" onClick={() => setNavClick(!navClick)}>
            Settings
          </NavLink>
        </Dropdown.Item>

        <Dropdown.Divider />
        <Dropdown.Item className="cursor-default">
          <HiLogout className='mr-2' size={22}/>
          <NavLink as="Link" onClick={logoutHandle} className="dropdown_hover" >
            Sign out
          </NavLink>
        </Dropdown.Item>
   </Dropdown> ) : (
    <Navbar className='list-none'>
      <NavLink to="/login" className="dropdown_hover" onClick={() => setNavClick(!navClick)}>
        Sign-In
      </NavLink>
    </Navbar>
   )
  }
   <Navbar.Toggle className='ml-2' />
 </div>
 <Navbar.Collapse className=''>
   <NavLink to="/" className="nav_hover" onClick={() => setNavClick(!navClick)}>
      Home
    </NavLink>
    <NavLink to="/books" className="nav_hover" onClick={() => setNavClick(!navClick)}>
      Books
    </NavLink>
    <NavLink to="/community" className="nav_hover" onClick={() => setNavClick(!navClick)}>
      Community
    </NavLink>
    <NavLink to="/about-us" className="nav_hover" onClick={() => setNavClick(!navClick)}>
      About Us
    </NavLink>
    <NavLink to="/contact" className="nav_hover" onClick={() => setNavClick(!navClick)}>
      Contact
    </NavLink>
   
 </Navbar.Collapse>
</Navbar>

</header>
  )
}


