import React from 'react'

import { ReactComponent as FbIcon } from '../../assets/socials/facebook.svg'
import { ReactComponent as InIcon } from '../../assets/socials/instagram.svg'
import { ReactComponent as TwIcon } from '../../assets/socials/twitter.svg'

import Logo from '../../assets/icons/new-logo.png'

export default function Footer() {
  return (
 
   
<footer className="p-4 bg-white sm:p-6 dark:bg-gray-900">
<div className="md:flex md:justify-between">
    <div className="mb-6 md:mb-0">
        <a href="/" className="flex items-center">
            {/* <img src={Logo} className="mr-3 h-12 sm:h-12" alt="Suhstei Logo" /> */}
            <h1><span className="self-center text-2xl whitespace-nowrap dark:text-white text-primary font-semibold">Suhstei</span><span className='text-accent font-extrabold'>.</span></h1>
        </a>
    </div>
    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
        <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
            <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                    <a href="/" className="hover:underline">Suhstei</a>
                </li>
                <li>
                    <a href="/" className="hover:underline">Tailwind CSS</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
            <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                    <a href="/" className="hover:underline ">Github</a>
                </li>
                <li>
                    <a href="/" className="hover:underline">Discord</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                </li>
            </ul>
        </div>
    </div>
</div>
<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
<div className="sm:flex sm:items-center sm:justify-between h-0 mb-0 pb-0">
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <a href="/" className="hover:underline">Suhstei™</a>. All Rights Reserved.
    </span>
    <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
        <a href="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
           <FbIcon />
            <span className="sr-only">Facebook page</span>
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <InIcon />
            <span className="sr-only">Instagram page</span>
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <TwIcon />
            <span className="sr-only">Twitter page</span>
        </a>
    </div>
</div>
</footer>

  
  )
}
