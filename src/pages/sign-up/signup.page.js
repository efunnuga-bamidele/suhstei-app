import React, { useState, useMemo  } from 'react'
import { Link } from 'react-router-dom'
import countryList from 'react-select-country-list'
import { Alert } from 'flowbite-react'
import { HiOutlineInformationCircle } from "react-icons/hi"

// Firebase
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInWithFacebookPopup
} from '../../utils/firebase/firebase.utils'

import { ReactComponent as GoogleIcon} from '../../assets/socials/icons8_google.svg'
import { ReactComponent as FacebookIcon} from '../../assets/socials/facebook.svg'
import Signup_Image from '../../assets/auth/signup.webp'
import Navigation from '../../components/navigation/navigation.component'
import Footer from '../../components/footer/footer.component'
import FormInput from '../../components/form-input/form-input.component'
import { getAuth, updateProfile } from 'firebase/auth'


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    country: ''
}

export default function SignupPage() {

    const options = useMemo(() => countryList().getData(), []);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword, firstName, lastName, country } = formFields;
    const [error, setError] = useState('');

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
        const countryOption = document.querySelector('#floating_country')
        countryOption.selectedIndex  = 0
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        if (formFields.password !== formFields.confirmPassword){
            setError('Passwords not a match');
            setTimeout(() => setError(''), 10000)
            return;
        }

        try{
            const { user } = await createAuthUserWithEmailAndPassword(formFields.email, formFields.password);
            // console.log("New Auth:",user);
            await createUserDocumentFromAuth( user, { displayName, firstName, lastName, country });
            
            const auth = getAuth();

            await updateProfile(auth.currentUser, {
                displayName
            });



            resetFormFields();
        }catch(err){
            if (err.code === 'auth/email-already-in-use'){
                setError('Cannot create user, email already in use');
                setTimeout(() => setError(''), 10000)
            }else{
                setError('user creation encounted an error');
                // console.log(err.message)
                setTimeout(() => setError(''), 10000)
            }
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]:value});
    }

    const logGooglePopUser = async () => {
        await signInWithGooglePopup();
    }

    const loggFacebookProvider = async () => {
        await signInWithFacebookPopup();
    }


  return (
    <div className='overscroll-none h-0'>
        <Navigation />
        <section className="bg-slate-100 mt-20">
        <div className="container px-6 py-12 h-full">
            <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                <img src={Signup_Image} className="w-full" alt="Phoneimage"
                />
                </div>
                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                <form onSubmit = {handleSubmit}>
                    <div className="relative z-0 mb-6 w-full group">
                        <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold my-auto mb-4 text-primary text-right'>Sign Up</h1>
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
                    <div className="relative z-0 mb-6 w-full group">
                        <FormInput
                            name = "confirmPassword"
                            label = "Confirm password"
                            type ="password"
                            onChange = {handleChange}
                            value = {confirmPassword}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 mb-6 w-full group">
                            <FormInput
                                name = "firstName"
                                label = "First name"
                                type ="text"
                                onChange = {handleChange}
                                value = {firstName}
                            />
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <FormInput
                                name = "lastName"
                                label = "Last name"
                                type ="text"
                                onChange = {handleChange}
                                value = {lastName}
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 mb-6 w-full group">
                            <FormInput
                                name = "displayName"
                                label = "Display name"
                                type ="text"
                                onChange = {handleChange}
                                value = {displayName}
                            />
                        </div>
                        <div className="relative z-0 mb-6 w-full group">

                        <select 
                            id="floating_country" 
                            className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            name="country"
                            onChange={handleChange} >
                        <option defaultValue=" -- Select country --"> -- Select country --</option>
                        {options.map((item, index) => (
                            <option 
                                value={item.label} 
                                key={index}
                            >
                                {item.label}
                            </option>
                        ))}
                        </select>

                        <label htmlFor="floating_country" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country</label> 
                     
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                    >
                    Sign Up
                    </button>
                    <Link to="/login"
                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3 bg-secondary"
                    role="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    >
                        <span className='ml-2'>Already have an account? Sign In</span>
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
                    <FacebookIcon /><span className='ml-2'>Sign up with Facebook</span>
                    </Link>
                    <Link
                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center bg-[#4285f4]"
                    href="#!"
                    role="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    onClick={logGooglePopUser}
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
