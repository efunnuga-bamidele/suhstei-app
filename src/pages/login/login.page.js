import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as GoogleIcon} from '../../assets/socials/icons8_google.svg'
import { ReactComponent as FacebookIcon} from '../../assets/socials/facebook.svg'
import Navigation from '../../components/navigation/navigation.component'
import Footer from '../../components/footer/footer.component'

export default function LoginPage() {
  return (
    <div className='overscroll-none'>
        <Navigation />
        <section className="bg-slate-100 mt-20">
        <div className="container px-6 py-12 h-full">
            <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="w-full" alt="Phoneimage"
                />
                </div>
                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                <form>
                <div className="relative z-0 mb-6 w-full group">
                        <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold my-auto mb-4 text-primary text-right'>Sign In</h1>
                    </div>
                <div className="relative z-0 mb-6 w-full group">
                        <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>
        
                    <div className="flex justify-between items-center mb-6">
                    <div className="form-group form-check">
                        <input
                            type="checkbox"
                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            id="exampleCheck3"
                            // checked
                        />
                        <label 
                            className="form-check-label inline-block text-gray-800" 
                            htmlFor="exampleCheck2"
                        >
                            Remember me
                        </label>
                    </div>
                    <a
                        href="#!"
                        className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                        >Forgot password?</a
                    >
                    </div>
                    <button
                        type="submit"
                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                    >
                    Sign in
                    </button>
                    <Link to="/signup"
                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3 bg-secondary"
                    role="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    >
                        <span className='ml-2'>Don't have an account? Sign Up</span>
                    </Link>
                    <div
                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                    >
                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                    </div>
                    
        
                    <Link
                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3 bg-[#3b5998]"
                    href="#!"
                    role="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    >
                    <FacebookIcon /><span className='ml-2'>Sign up with Facebook</span>
                    </Link>
                    <Link
                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center bg-[#4285f4]"
                    href="#!"
                    role="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    >
                    <GoogleIcon /><span className='ml-2'>Sign up with Google</span>
                    </Link>
                </form>
                </div>
            </div>
        </div>
    </section>
    <Footer />
    </div>
  )
}
