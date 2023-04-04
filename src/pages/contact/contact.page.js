import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Modal, Alert, Textarea, Label } from 'flowbite-react'
import { FallingLines } from 'react-loader-spinner'
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/navigation/navigation.component'
import FormInput from '../../components/form-input/form-input.component'
import ContactImage from '../../assets/icons/undraw-contact.svg'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { sendContactMessage } from '../../utils/firebase/firebase.utils'
import { init } from '@emailjs/browser'
import { selectCurrentUser } from '../../store/user/user.selector'
import { useSelector } from 'react-redux'


const defaultFormFields = {
  user_subject: '',
  user_message: ''
}

export default function ContactPage() {

  init("ODzKrI1eM90wmFfxS");
  const form = useRef()

  const [formField, setFormField] = useState(defaultFormFields);
  const { user_subject, user_message } = formField;
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const currentUser = useSelector(selectCurrentUser)

  const resetFields = () => {
    setFormField(defaultFormFields)
  }


  useEffect(() => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false)

    }, 2000);
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);
    const result = await sendContactMessage(form.current)
    if (result.status === 200 && result.text === "OK") {
      setSuccess("Message Sent Successfully")
      setTimeout(() => {
        setSuccess("")
        setShowModal(false);
        resetFields();
      }, 1000)

    } else {

      setError("Message Not Sent! Please Try Again.")
      setTimeout(() => {
        setError("")
        setShowModal(false)
      }, 1000)
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField({ ...formField, [name]: value })
  }

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
              <form onSubmit={handleSubmit} ref={form}>
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
                    required={true}
                    disabled
                    value={currentUser.displayName}
                    onChange={handleChange}

                  />
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <FormInput
                    name="user_address"
                    label="Email address"
                    type="email"
                    required={true}
                    disabled
                    value={currentUser.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <FormInput
                    name="user_subject"
                    label="Subject"
                    type="text"
                    value={user_subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="user_message"
                      value="Your message"
                      className='text-slate-500'
                    />
                  </div>
                  <Textarea
                    id="user_message"
                    name="user_message"
                    placeholder="Leave a message..."
                    required={true}
                    value={user_message}
                    rows={8}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Send Message
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
