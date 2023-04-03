import React, { Fragment, useEffect, useState } from 'react'
import { Modal, Alert } from 'flowbite-react'
import { FallingLines } from 'react-loader-spinner'
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/navigation/navigation.component'
import FormInput from '../../components/form-input/form-input.component'
import ContactImage from '../../assets/icons/undraw-contact.svg'
import { HiOutlineInformationCircle } from 'react-icons/hi'



const defaultFormFields = {
  displayname: '',
  email: '',
  subject: '',
  message: ''
}

export default function ContactPage() {

  const [formField, setFormField] = useState(defaultFormFields);
  const { displayname, email, subject, message } = formField;
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);

  const resetFields = () => {
    setFormField(defaultFormFields)
  }

  useEffect(() => {
    setShowModal(true);
    setTimeout(() => setShowModal(false), 5000);
  }, [])

  return (
    <div className='h-0 overscroll-none'>
      <Fragment>
        <Modal
          show={showModal}
          size="md"
          popup={true}
          onClose={showModal}
          className="max-md:pt-16 mt-10 bg-opacity-60"
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
      <Navigation />
      <section className='bg-slate-100 mt-20'>
        <div className='container px-6 py-12 h-full'>
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className='md:w-8/12 lg:w-6/12 mb:mb-0'>
              <img src={ContactImage} className="w-full" alt="Phoneimage" />
            </div>
            <div className='md:w-8/12 lg:ml-20'>
              <form>
                <div className="relative z-0 mb-6 w-full group">
                  <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold my-auto mb-4 text-primary text-right'>Contact Form</h1>
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
                  {success &&
                    <Alert
                      color="success"
                      icon={HiOutlineInformationCircle}
                    >
                      <span>
                        {success}!
                      </span>
                    </Alert>
                  }
                </div>
                <div className="relative z-0 mb-6 w-full group">
                                    <FormInput
                                        name="email"
                                        label="Email address"
                                        type="email"
                                        onChange={handleChange}
                                        value={email}
                                    />
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <FormInput
                                        name="password"
                                        label="Password"
                                        type="password"
                                        onChange={handleChange}
                                        value={password}
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
                                    <Link
                                        className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out" onClick={showModal}
                                    >
                                        Forgot password?
                                    </Link>
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
