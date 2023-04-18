import React from 'react'
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/navigation/navigation.component'

export default function CommunityPage() {
  return (
    <div className='h-0'>
      <Navigation />
      <main className='flex bg-gray-100 mt-20 h-64 items-center justify-center'>{/* */}
        <section>
          <div className='black flex justify-center'>
            <h1 className="block text-4xl font-thin tracking-tight text-slate-800 dark:text-white text-center">

              Community Page is Coming Soon
            </h1>
          </div>
        </section>{/*End of how we work */}
      </main>
      <Footer />
    </div>
  )
}
