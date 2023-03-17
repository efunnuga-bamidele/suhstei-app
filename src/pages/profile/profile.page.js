import React, { Fragment, useState, useEffect } from 'react'
import { Alert, Modal } from 'flowbite-react'
import { HiOutlineInformationCircle } from "react-icons/hi"
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/navigation/navigation.component'
import SidebarNavigation from '../../components/sidebar/sidebar.component'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/user/user.selector'
import FormInput from '../../components/form-input/form-input.component'
import FileResizer from 'react-image-file-resizer'
import { getUserProfileData } from '../../utils/firebase/firebase.utils'
import { FallingLines } from 'react-loader-spinner'

const defaultFormField = {
    // display_name: '',
    firstName: '',
    lastName: '',
    country: '',
    state: '',
    city: '',
    zipcode: '',
    address: '',
    mobilePhone: ''
}

export default function ProfilePage() {

    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [formFields, setFormFields] = useState(defaultFormField);
    const [profileData, setProfileData] = useState([]);
    const [showModal, setShowmodal] = useState(false);
    let [tumbnail, setTumbnail] = useState(null);

    // get userdata from useSelector Redux
    const currentUser = useSelector(selectCurrentUser);
    const { firstName, lastName, country, state, city, zipcode, mobilePhone, address } = formFields;

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

    useEffect(() => {
        // get user detail from database here

        const data = async () => {
            const res = await getUserProfileData(currentUser.uid);
            setProfileData(res);
        }

        data();

        // console.log(profileData)

    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
        console.log(formFields)
    }

    const handleUpload = async (event) => {
        console.log("Upload Triggered")
        setTumbnail(null);
        let selected = event.target.files[0];
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
        setShowmodal(!showModal);
        setTumbnail(resizedImage);
    }
    const handleUpdate = (event) => {
        event.preventDefault();
        console.log("Update Triggered")
        setShowmodal(!showModal);
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
                            <div className='grid md:grid-cols-9 md:gap-6'>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <label htmlFor="thumbnail" className="flex flex-col cursor-pointer">
                                        <img
                                            className="mb-3 h-28 w-28 rounded-full shadow-lg"
                                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                            alt="Bonnie image"
                                        />
                                        <input id="thumbnail" name='thumbnail' type="file" className="hidden" />
                                    </label>
                                </div>
                                <div className='relative z-0 mb-6 w-auto group'>
                                    <button
                                        type="button"
                                        className="inline-block px-1 py-1 mt-0 bg-blue-600 text-white font-medium text-sm leading-snug lowercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        onClick={handleUpload}
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>
                            <div className='grid md:grid-cols-2 md:gap-6'>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='display_name'
                                        label='Display Name'
                                        type='text'
                                        onChange={handleChange}
                                        value={currentUser.displayName}
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
                                        value={currentUser.email}
                                        request={'required'}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='grid md:grid-cols-2 md:gap-6'>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='firstName'
                                        label='First Name'
                                        type='text'
                                        onChange={handleChange}
                                        value={firstName}
                                        request={'required'}
                                    />
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='lastName'
                                        label='Last Name'
                                        type='text'
                                        onChange={handleChange}
                                        value={lastName}
                                        request={'required'}
                                    />
                                </div>
                            </div>
                            <div className='grid md:grid-cols-1 md:gap-6'>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='address'
                                        label='Address ( e.g 123, First Avenue Street )'
                                        type='text'
                                        onChange={handleChange}
                                        value={address}
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
                                        value={country}
                                        request={'required'}
                                    />
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='state'
                                        label='State'
                                        type='text'
                                        onChange={handleChange}
                                        value={state}
                                        request={'required'}
                                    />
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='city'
                                        label='City'
                                        type='text'
                                        onChange={handleChange}
                                        value={city}
                                        request={'required'}
                                    />
                                </div>
                            </div>
                            <div className='grid md:grid-cols-2 md:gap-6'>
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
