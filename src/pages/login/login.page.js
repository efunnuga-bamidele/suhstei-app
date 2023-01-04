import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from 'flowbite-react'
import { HiOutlineInformationCircle } from "react-icons/hi"



import { ReactComponent as GoogleIcon} from '../../assets/socials/icons8_google.svg'
import { ReactComponent as FacebookIcon} from '../../assets/socials/facebook.svg'
import Signin_Image from '../../assets/auth/signin.svg'
import Navigation from '../../components/navigation/navigation.component'
import Footer from '../../components/footer/footer.component'

import FormInput from '../../components/form-input/form-input.component'

//firebase import
import {
    sighAuthUserInWithEmailAndPassword,
    signInWithGooglePopup,
    signInWithFacebookPopup,
} from '../../utils/firebase/firebase.utils';

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../book/user/user.selector'


const defaultFormFields = {
    email: '',
    password: ''
}

export default function LoginPage() {
    const currentUser  = useSelector(selectCurrentUser) 
    const redirect = useNavigate()
    
    // useEffect(() => {
    //     if (currentUser){
    //         redirect('/')
    //         console.log('Logged In')
    //     }
    // },[currentUser])

    const [ formField, setFormField ] = useState(defaultFormFields);
    const { email, password } = formField;
    const [error, setError] = useState('');

    const resetFields = () => {
        setFormField(defaultFormFields);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormField({ ...formField, [name]: value});
    };

    const logGooglePopUser = async () => {
        const { user } = await signInWithGooglePopup();
    }

    const loggFacebookProvider = async () => {
        const { user } = await signInWithFacebookPopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try{
            const { user } = await sighAuthUserInWithEmailAndPassword(formField.email, formField.password)
            // console.log(user)
            resetFields();

        }catch(err){
            switch (err.code){
                case "auth/user-not-found":
                    setError("User detail was not found");
                    setTimeout(() => setError(''), 10000)
                    break;
                case "auth/wrong-password":
                    setError("Incorrect password for email");
                    setTimeout(() => setError(''), 10000)
                    break;
                default:
                    // console.log(err.message);
            }
        }
    }



  return (
    <div className='overscroll-none h-0'>
        <Navigation />
        <section className="bg-slate-100 mt-20">
        <div className="container px-6 py-12 h-full">
            <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                <img src={Signin_Image} className="w-full" alt="Phoneimage"
                />
                </div>
                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                <form onSubmit={handleSubmit}>
                <div className="relative z-0 mb-6 w-full group">
                    <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold my-auto mb-4 text-primary text-right'>Sign In</h1>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    {error && 
                    <Alert
                        color="failure"
                        icon={HiOutlineInformationCircle}
                    >
                        <span>
                        {error}!
                        </span>
                    </Alert>
                    }
                </div>
                <div className="relative z-0 mb-6 w-full group">
                        <FormInput
                            name = "email"
                            label = "Email address"
                            type ="email"
                            onChange = {handleChange}
                            value = {email}
                        />
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <FormInput
                            name = "password"
                            label = "Password"
                            type ="password"
                            onChange = {handleChange}
                            value = {password}
                        />
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
                    onClick={loggFacebookProvider}
                    >
                    <FacebookIcon /><span className='ml-2'>Sign In with Facebook</span>
                    </Link>
                    <Link
                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center bg-[#4285f4]"
                    href="#!"
                    role="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    onClick={logGooglePopUser}
                    >
                    <GoogleIcon /><span className='ml-2'>Sign In with Google</span>
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
