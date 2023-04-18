import React from 'react'
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/navigation/navigation.component'

export default function AboutUsPage() {
  return (
    <div className='bg-gray-100 mx-1 font-body scroll-smooth h-0'>
      <Navigation />
      <main className=' flex justify-center items-center bg-gray-100 mt-20'>{/*who we are*/}
        <section>
          <div className='black justify-center mt-6'>
            <h5 className="block text-3xl font-normal tracking-tight text-slate-600 dark:text-white text-center">
              Who We Are
            </h5>
            <p className="block text-lg font-thin tracking-tight text-slate-800 dark:text-white text-center mx-5 md:mx-40 my-10">
              SUHSTEI is a sustainable social media platform, where books are shared between readers and book lovers in your community.
              We are currently pilot testing and soon we will be out there to make the world green and clean, one book at a time.
            </p>
          </div>
        </section>{/*who we are*/}
      </main>
      <Footer />
    </div>
  )
}
