import React, { Fragment } from 'react'
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/navigation/navigation.component'
import SidebarNavigation from '../../components/sidebar/sidebar.component'

export default function ProfilePage() {
  return (
    <div classname='bg-gray-100 font-body scroll-smooth h-0'>
        <Navigation />
        <main className='bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap'>
            <Fragment>
                {/* Updating Modal here */}
            </Fragment>
            <SidebarNavigation />
            <section className='bg-white mt-12 m-2 p-2 w-full rounded-md'>
                <h1 className='font-bold text-xl text-right pr-4 underline text-slate-500'>Profile</h1>
            </section>
        </main>
        <Footer />
    </div>
  )
}
