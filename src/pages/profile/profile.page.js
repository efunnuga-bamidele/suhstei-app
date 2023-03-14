import React, { Fragment, useState, useEffect } from 'react'
import { Alert } from 'flowbite-react'
import { HiOutlineInformationCircle } from "react-icons/hi"
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/navigation/navigation.component'
import SidebarNavigation from '../../components/sidebar/sidebar.component'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/user/user.selector'
import FormInput from '../../components/form-input/form-input.component'
import FileResizer from 'react-image-file-resizer'

const defaultFormField = {
    // display_name: '',
    // email: '',
    first_name: '',
    last_name: '',
    country: '',
    state: '',
    city: '',
    zipcode: '',
    address: '',
    mobile_phone: ''
}

export default function ProfilePage() {

    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [formFields, setFormFields] = useState(defaultFormField);
    const [showModal, setShowmodal] = useState(false);
    let [tumbnail, setTumbnail] = useState(null);

    // get userdata from useSelector Redux
    const currentUser = useSelector(selectCurrentUser);
    const { first_name, last_name, country, state, city, zipcode, mobile_phone, address } = formFields;

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
        setFormFields({ ...formFields, [name]: value });
        console.log(formFields)
    }

    useEffect(() => {
        // get user detail from database here
    }, [])

    return (
        <div className='bg-gray-100 font-body scroll-smooth h-0'>
            <Navigation />
            <main className='bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap'>
                <Fragment>
                    {/* Updating Modal here */}
                </Fragment>
                <SidebarNavigation />
                <section className='bg-white mt-12 m-2 p-2 w-full rounded-md'>
                    <h1 className='font-bold text-xl text-right pr-4 underline text-slate-500'>Profile</h1>
                    <div className='container px-6 py-12 h-full'>
                        <form onSubmit={""}>
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
                                    <label for="thumbnail" className="flex flex-col cursor-pointer">
                                        <img
                                            className="mb-3 h-28 w-28 rounded-full shadow-lg"
                                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                            alt="Bonnie image"
                                        />
                                        <input id="tumbnail" name='tumbnail' type="file" className="hidden" />
                                    </label>
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
                                        name='first_name'
                                        label='First Name'
                                        type='text'
                                        onChange={handleChange}
                                        value={first_name}
                                        request={'required'}
                                    />
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <FormInput
                                        name='last_name'
                                        label='Last Name'
                                        type='text'
                                        onChange={handleChange}
                                        value={last_name}
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
                                        name='mobile_phone'
                                        label='Mobile Number ( e.g +2348000000000)'
                                        type='text'
                                        onChange={handleChange}
                                        value={mobile_phone}
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-4 md:gap-6">
                                <div className='relative z-0 mb-6 w-full group'>
                                    <button
                                        type="submit"
                                        className="inline-block px-7 py-3 mt-0 bg-gray-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                    >
                                        Update Profile
                                    </button>
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <button
                                        type="submit"
                                        className="inline-block px-7 py-3 mt-0 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                    >
                                        Reset Email
                                    </button>
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <button
                                        type="submit"
                                        className="inline-block px-7 py-3 mt-0 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                    >
                                        Reset Password
                                    </button>
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <button
                                        type="submit"
                                        className="inline-block px-7 py-3 mt-0 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
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
