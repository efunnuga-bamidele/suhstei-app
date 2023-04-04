import React, { Fragment, useState, useEffect } from 'react'
import { Alert, Modal } from 'flowbite-react'
import { HiOutlineInformationCircle } from "react-icons/hi"
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
import { getUserProfileData, retrieveProfileUpdate, updateProfile } from '../../utils/firebase/firebase.utils'
import { FallingLines } from 'react-loader-spinner'

// const defaultFormField = {
//     displayName: '',
//     email:'',
//     firstName: '',
//     lastName: '',
//     country: '',
//     state: '',
//     city: '',
//     gender: ''
// }

export default function ProfilePage() {

    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    // const [formFields, setFormFields] = useState(defaultFormField);
    // const [profileData, setProfileData] = useState([]);
    const [showModal, setShowmodal] = useState(false);
    let [thumbnail, setThumbnail] = useState(null);
    const [imagePreview, setImagePreview] = useState(null)

    // get userdata from useSelector Redux
    const currentUser = useSelector(selectCurrentUser);
    const currentUserProfile = useSelector(selectCurrentUserProfile);
    const [userData, setUserData] = useState(currentUserProfile)
    // const { firstName, lastName, country, state, city, gender, displayName, email } = userData;
    const { firstName, lastName, country, state, city, gender, displayName, email, photoURL } = userData;
    const dispatch = useDispatch();

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
        // setShowmodal(!showModal);
        setThumbnail(resizedImage);

    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        // console.log("Update Triggered")
        const updateData = {
            displayName: userData.displayName,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            gender: userData.gender,
            country: userData.country,
            state: userData.state,
            city: userData.city
        }
        // console.log("Data to Update: ", updateData)
        setShowmodal(!showModal);
        const res = await updateProfile(currentUser.uid, thumbnail, userData.photoURL, updateData)

        const data = await retrieveProfileUpdate(currentUser.uid)
        dispatch(setProfileData(data))
        setUserData(data);
        if( res === 'success'){
            setSuccess("User profile updated successfully")
            setShowmodal(false);
            setTimeout(() => setSuccess(''), 10000);
        }
        else{
            setError("Failed to update user profile")
            setShowmodal(false);
            setTimeout(() => setError(''), 10000);
        }
        setThumbnail(null);
        setImagePreview(null);
        
    }

    const handleVerifyAccount = () => {
        console.log("Verify Account Triggered")
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
                    <h1 className='font-bold text-xl text-right pr-4 underline text-slate-500'>Profile</h1>
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
                                        <img
                                            className="mb-3 h-28 w-28 rounded-full shadow-lg"
                                            src={imagePreview ? imagePreview : photoURL}
                                            alt={displayName && displayName}
                                        />
                                        <input id="thumbnail" name='thumbnail' type="file" className="hidden" onChange= {handleFileChange}/>
                                    </label>
                                </div>

                            </div>
                            <div className='grid md:grid-cols-2 md:gap-6'>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='displayName'
                                        label='Display Name'
                                        type='text'
                                        onChange={handleChange}
                                        value={displayName && displayName}
                                        request={'required'}
                                        disabled
                                    />
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='email'
                                        label='Email Address'
                                        type='email'
                                        onChange={handleChange}
                                        value={email && email}
                                        request={'required'}
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
                                    <FormInput
                                        name='gender'
                                        label='Gender'
                                        type='text'
                                        onChange={handleChange}
                                        value={gender && gender}
                                        // request={'required'}
                                    />
                                </div>
                            </div>
                            <div className='grid md:grid-cols-3 md:gap-6'>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='country'
                                        label='Country'
                                        type='text'
                                        onChange={handleChange}
                                        value={country && country} 
                                        request={'required'}
                                    />
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
                            {/* <div className='grid md:grid-cols-2 md:gap-6'>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='zipcode'
                                        label='ZipCode'
                                        type='text'
                                        onChange={handleChange}
                                        value={zipcode}
                                    />
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='mobilePhone'
                                        label='Mobile Number ( e.g +2348000000000)'
                                        type='text'
                                        onChange={handleChange}
                                        value={mobilePhone}
                                    />
                                </div>
                            </div> */}
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
                                <div className='relative z-0 mb-6 w-50 group flex-auto'>
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
                                <div className='relative z-0 mb-6 w-50 group flex-auto'>
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
                                <div className='relative z-0 mb-6 w-50 group flex-auto'>
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
                                <div className='relative z-0 mb-6 w-50 group flex-auto'>
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
