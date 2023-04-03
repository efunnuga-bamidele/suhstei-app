import React, { Fragment, useEffect, useState } from 'react'
import { Modal, Alert, Textarea, Label } from 'flowbite-react'
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
            <div className='md:w-8/12 lg:w-5/12 lg:ml-20'>
              <form>
                <div className="relative z-0 mb-6 w-full group">
                  <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold my-auto mb-4 text-primary text-right'>Contact Us</h1>
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
                    name="display_name"
                    label="Display name"
                    type="text"
                  />
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <FormInput
                    name="email"
                    label="Email address"
                    type="email"
                  />
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="comment"
                      value="Your message"
                      className='text-slate-500'
                    />
                  </div>
                  <Textarea
                    id="comment"
                    placeholder="Leave a comment..."
                    required={true}
                    rows={8}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Send comment
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
