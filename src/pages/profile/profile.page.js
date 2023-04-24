import React, { Fragment, useState, useEffect, useMemo } from 'react'
import { Alert, Modal, Tooltip } from 'flowbite-react'
import { HiOutlineInformationCircle } from "react-icons/hi"
import { BsCameraFill } from "react-icons/bs"
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/navigation/navigation.component'
import SidebarNavigation from '../../components/sidebar/sidebar.component'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/user/user.selector'
import { selectCurrentUserProfile } from '../../store/userProfileData/userProfileData.selector'
import { setProfileData } from '../../store/userProfileData/userProfileData.action'
import { useDispatch } from 'react-redux'

import FormInput from '../../components/form-input/form-input.component'
import FileResizer from 'react-image-file-resizer'
import { getUserProfileData, retrieveProfileUpdate, sendVerificationEmail, updateProfile } from '../../utils/firebase/firebase.utils'
import { FallingLines } from 'react-loader-spinner'
import countryList from 'react-select-country-list'


export default function ProfilePage() {

    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [showModal, setShowmodal] = useState(false);
    let [thumbnail, setThumbnail] = useState(null);
    const [imagePreview, setImagePreview] = useState(null)

    // get userdata from useSelector Redux
    const currentUser = useSelector(selectCurrentUser);
    const currentUserProfile = useSelector(selectCurrentUserProfile);
    const [userData, setUserData] = useState(currentUserProfile)
    const { firstName, lastName, country, state, city, gender, displayName, email, photoURL } = userData;
    const dispatch = useDispatch();

    // get country data from package
    const options = useMemo(() => countryList().getData(), [])


    // Image File Resizing function

    const resizeFile = (file) =>
        new Promise((resolve) => {
            FileResizer.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((recentData) => ({ ...recentData, [name]: value }));
        // console.log(userData)
    }

    const handleFileChange = async (event) => {
        // console.log("Upload Triggered")
        setThumbnail(null);
        let selected = event.target.files[0];
        setImagePreview(URL.createObjectURL(event.target.files[0]));
        const resizedImage = await resizeFile(selected);

        if (!resizedImage) {
            setError("Please select a file");
            setTimeout(() => setError(''), 10000);
            return;
        }
        if (!resizedImage.type.includes('image')) {
            setError("Selected file must be an image");
            setTimeout(() => setError(''), 10000);
            return;
        }
        if (resizedImage.size > 1000000) {
            setError("Image file size must beless than 1mb");
            setTimeout(() => setError(''), 10000);
            return;
        }
        setError('')
        setThumbnail(resizedImage);

    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        const updateData = {
            displayName: currentUser['displayName'],
            email: currentUser['email'],
            firstName: userData.firstName,
            lastName: userData.lastName,
            gender: userData.gender,
            country: userData.country,
            state: userData.state,
            city: userData.city
        }
        
        setShowmodal(!showModal);
        const res = await updateProfile(currentUser.uid, thumbnail, userData.photoURL, updateData)

        const data = await retrieveProfileUpdate(currentUser.uid)
        dispatch(setProfileData(data))
        setUserData(data);
        if (res === 'success') {
            setSuccess("User profile updated successfully")
            setShowmodal(false);
            setTimeout(() => setSuccess(''), 10000);
        }
        else {
            setError("Failed to update user profile")
            setShowmodal(false);
            setTimeout(() => setError(''), 10000);
        }
        setThumbnail(null);
        setImagePreview(null);

    }

    const handleVerifyAccount = async () => {
        const res = await sendVerificationEmail()
        if (res === 'success') {
            setSuccess("Verification email sent successfully!")
            setShowmodal(false);
            setTimeout(() => setSuccess(''), 10000);
        }
        else {
            setError("Failed to send verification email")
            setShowmodal(false);
            setTimeout(() => setError(''), 10000);
        }
    }

    const handleDelete = () => {
        console.log("Delete Account Triggered")
    }

    const handleResetMail = () => {
        console.log("Reset Mail Triggered")
    }

    const handleResetPassword = () => {
        console.log("Reset Password Triggered")
    }

    return (
        <div className='bg-gray-100 font-body scroll-smooth h-0'>
            <Navigation />
            <main className='bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap'>
                <Fragment>
                    {/* Updating Modal here */}
                    <Modal
                        show={showModal}
                        size="md"
                        popup={true}
                        onClose={showModal}
                        className="max-md:pt-32 mt-10 bg-opacity-60"
                    >
                        <Modal.Body>
                            <div className="grid col-span-full place-items-center h-56">
                                <FallingLines
                                    color="#1e94cc"
                                    width="120"
                                    visible={true}
                                    arialLabel='falling-lines-loading'
                                />
                            </div>
                        </Modal.Body>

                    </Modal>
                </Fragment>
                <SidebarNavigation />
                <section className='bg-white mt-12 m-2 p-2 w-full rounded-md'>
                    <h1 className='font-bold text-xl text-right pr-4 underline text-slate-500'>
                        Profile
                    </h1>
                    <div className='container px-6 py-12 h-full'>
                        <form onSubmit={handleUpdate}>
                            {/* Alert section */}
                            <div className='relative z-0 mb-6 w-full group'>
                                {/* error alert */}
                                {error &&
                                    <Alert
                                        color='failure'
                                        icon={HiOutlineInformationCircle}
                                    >
                                        <span>
                                            {error}
                                        </span>
                                    </Alert>
                                }
                                {/* success alert */}
                                {success &&
                                    <Alert
                                        color='success'
                                        icon={HiOutlineInformationCircle}
                                    >
                                        <span>
                                            {success}
                                        </span>
                                    </Alert>

                                }
                            </div>
                            {/* Profile Image Section */}
                            <div className='grid grid-cols-2 min-[350px]:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 md:gap-6'>
                                <div className='relative z-0 mb-6 w-full group'>


                                    <label htmlFor="thumbnail" className="flex flex-col cursor-pointer">
                                        <BsCameraFill 
                                            color='white' 
                                            size={28} 
                                            style={{ cursor: "pointer", top:"38%", left:"38%", position:"absolute"}} 
                                            className='hidden transition delay-700 duration-300 ease-in-out group-hover:block '/>
                                        <img
                                            className="mb-3 h-28 w-28 rounded-full shadow-lg"
                                            src={imagePreview ? imagePreview : photoURL}
                                            alt={displayName && displayName}
                                        />
                                        <input id="thumbnail" name='thumbnail' type="file" accept='image/*' className="hidden" onChange={handleFileChange} />
                                    </label>
                                </div>

                            </div>
                            <div className='grid md:grid-cols-1 md:gap-6'>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <h1 className='font-bold text-lg text-left pr-4'>
                                        {
                                            currentUser.emailVerified === true
                                                ? <p className='text-blue-700'>Verified Account</p>
                                                : <p className='text-red-700'>Unverified Account</p>
                                        }
                                    </h1>
                                </div>
                            </div>
                            <div className='grid md:grid-cols-2 md:gap-6'>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='displayName'
                                        label='Display Name'
                                        type='text'
                                        onChange={handleChange}
                                        value={currentUser['displayName']}
                                        request={'required'}
                                        readonly
                                        disabled
                                    />
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='email'
                                        label='Email Address'
                                        type='email'
                                        onChange={handleChange}
                                        value={currentUser['email']}
                                        request={'required'}
                                        readonly
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='grid md:grid-cols-3 md:gap-6'>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='firstName'
                                        label='First Name'
                                        type='text'
                                        onChange={handleChange}
                                        value={firstName && firstName}
                                        request={'required'}
                                    />
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='lastName'
                                        label='Last Name'
                                        type='text'
                                        onChange={handleChange}
                                        value={lastName && lastName}
                                        request={'required'}
                                    />
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <select
                                        id="gender"
                                        className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        name="gender"
                                        onChange={handleChange}
                                        required
                                    >
                                        {gender ?
                                            <option defaultValue={gender}>{gender}</option>
                                            :
                                            <option defaultValue="...Select Gender">...Select Gender</option>
                                        }
                                        <option defaultValue="Male">Male</option>
                                        <option defaultValue="Female">Female</option>
                                        <option defaultValue="Others">Others</option>
                                    </select>
                                    <label
                                        htmlFor="gender"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Gender
                                    </label>
                                </div>
                            </div>
                            <div className='grid md:grid-cols-3 md:gap-6'>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <select
                                        id="country"
                                        className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        name="country"
                                        onChange={handleChange}
                                        required
                                    >
                                        {country ?
                                            <option defaultValue={country}>{country}</option>
                                            :
                                            <option defaultValue="...Select Country">...Select Country</option>
                                        }
                                        {/* <option value={value}>{value}</option> */}
                                        {options.map((item, index) => (
                                            <option key={index} defaultValue={item.label}>{item.label}</option>
                                        ))}
                                    </select>
                                    <label
                                        htmlFor="country"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Country
                                    </label>
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='state'
                                        label='State'
                                        type='text'
                                        onChange={handleChange}
                                        value={state && state}
                                        request={'required'}
                                    />
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='city'
                                        label='City'
                                        type='text'
                                        onChange={handleChange}
                                        value={city && city}
                                        request={'required'}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <div className='relative z-0 mb-6 w-50 group flex-auto'>
                                    <button
                                        type="submit"
                                        className="inline-block px-7 py-3 mt-0 bg-gray-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                    >
                                        Update Profile
                                    </button>
                                </div>
                                {
                                    currentUser.emailVerified === true
                                        ? <span></span>
                                        : <div className='relative z-0 mb-6 w-50 group flex-auto'>
                                            <button
                                                type="button"
                                                className="inline-block px-7 py-3 mt-0 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                data-mdb-ripple="true"
                                                data-mdb-ripple-color="light"
                                                onClick={handleVerifyAccount}
                                            >
                                                Verify Account
                                            </button>
                                        </div>
                                }

                                <div className='relative z-0 mb-6 w-50 group flex-auto hidden'>
                                    <button
                                        type="button"
                                        className="inline-block px-7 py-3 mt-0 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        onClick={handleResetMail}
                                    >
                                        Reset Email
                                    </button>
                                </div>
                                <div className='relative z-0 mb-6 w-50 group flex-auto hidden'>
                                    <button
                                        type="button"
                                        className="inline-block px-7 py-3 mt-0 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        onClick={handleResetPassword}
                                    >
                                        Reset Password
                                    </button>
                                </div>
                                <div className='relative z-0 mb-6 w-50 group flex-auto hidden'>
                                    <button
                                        type="button"
                                        className="inline-block px-7 py-3 mt-0 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        onClick={handleDelete}
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
