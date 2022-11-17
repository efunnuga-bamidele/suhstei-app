import { Link } from 'react-router-dom';
import { ReactComponent as Open} from '../../assets/icons/list.svg'
import { ReactComponent as Close} from '../../assets/icons/close.svg'
import Logo from '../../assets/icons/new-logo.png'

export default function Navigation() {
    const handleOpenMenu = () => {
        const close = document.querySelector('#close')
        const open = document.querySelector('#open')
        const off_canvas = document.querySelector('.offcanvas-menu')
    
          close.classList.remove('hidden')
          open.classList.add('hidden')
          off_canvas.classList.remove('hidden')
          off_canvas.classList.add('flex')
          
      
          off_canvas.classList.remove('translate-x-full')
          off_canvas.classList.add('translate-x-0')
      }
    
      const handleCloseMenu = () => {
    
        const close = document.querySelector('#close')
        const open = document.querySelector('#open')
        const off_canvas = document.querySelector('.offcanvas-menu')
    
          close.classList.add('hidden')
          open.classList.remove('hidden')
          off_canvas.classList.add('translate-x-full')
          off_canvas.classList.remove('translate-x-0')  
      }

  return (
    <header className='h-20 bg-slate-100 shadow-md'>{/*Header Start*/}
    <div className='container ml-4 pr-4'>{/* */}
        <div className="grid grid-cols-3 h-20 items-center">
          <div className='col-span-1'>{/*Icon section */}
              <Link to="/"><img src={Logo} alt="Suhstei" className='w-15 h-12 font-extrabold text-primary pl-2 cursor-pointer md:w-18 md:h-15' /></Link>
              {/*<Link to="/"><h1 className='text-left text-2xl font-extrabold text-primary pl-2 cursor-pointer md:w-18 md:h-15'>Suhstei<span className='text-accent'>.</span></h1></Link>*/}
          </div>
          <div className='col-span-2 flex justify-end items-center '>
                <div className='relative'>
                    <Open className='text-gray-400 mr-2 cursor-pointer block md:hidden hover:animate-[wiggle_1s_ease-in-out_5]' id='open' onClick={handleOpenMenu}/>
            
                    <nav className='offcanvas-menu fixed bg-slate-100 h-screen top-0 right-0 shadow-md w-2/3 hidden items-center px-8 translate-x-0 duration-500 md:duration-75 md:translate-x-0 md:flex md:justify-start md:flex-col md:h-0 md:items-end md:w-full' >
                        <ul className='text-sm md:flex' id='menu'>
                            <Close className='text-slate-400 mr-2 cursor-pointer inline absolute top-6 left-6 md:hidden hover:animate-[spin_1s_ease-in-out_2]' id='close' onClick={handleCloseMenu}/>
                            <li className='py-1 my-5'><Link to="/" className='px-4 border-b-2 border-slate-100 hover:border-primary hover:font-semibold hover:text-primary transition ease-in-out duration-500'>Home</Link></li>
                            <li className='py-1 my-5'><Link to="/books" className='px-4 border-b-2 border-slate-100 hover:border-primary hover:font-semibold hover:text-primary transition ease-in-out duration-500'>Books</Link></li>
                            <li className='py-1 my-5'><Link to="/community" className='px-4 border-b-2 border-slate-100 hover:border-primary hover:font-semibold hover:text-primary transition ease-in-out duration-500'>Community</Link></li>
                            <li className='py-1 my-5'><Link to="/about-us" className='px-4 border-b-2 border-slate-100 hover:border-primary hover:font-semibold hover:text-primary transition ease-in-out duration-500'>About Us</Link></li>
                            <li className='py-1 my-5'><Link to="/sign-in" className='px-4 border-b-2 border-slate-100 hover:border-primary hover:font-semibold hover:text-primary transition ease-in-out duration-500'>Sign-In</Link></li>
                        </ul>
                  </nav>
                </div>
            </div>
        </div>
    </div>{/* */}
  </header>
  )
}
