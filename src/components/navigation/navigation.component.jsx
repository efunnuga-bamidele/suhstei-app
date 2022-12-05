// import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/icons/new-logo.png'

import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { useContext } from 'react';

export default function Navigation() {

  // const {user, setUser} = useContext('');

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
          Dashboard
        </Dropdown.Item>
        <Dropdown.Item>
          Settings
        </Dropdown.Item>
        <Dropdown.Item>
          My Books
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          Sign out
        </Dropdown.Item>
   </Dropdown>
   <Navbar.Toggle className='ml-2' />
 </div>
 <Navbar.Collapse className=''>
  <Navbar.Link
  href="/"
  active={true}
  >
  Home
  </Navbar.Link>
  <Navbar.Link href="/Books">
  Books
  </Navbar.Link>
  <Navbar.Link href="/Community">
  Community
  </Navbar.Link>
  <Navbar.Link href="/about-us">
  About Us
  </Navbar.Link>
  <Navbar.Link href="/contact">
  Contact
  </Navbar.Link>
    
   
 </Navbar.Collapse>
</Navbar>

</header>
  )
}


