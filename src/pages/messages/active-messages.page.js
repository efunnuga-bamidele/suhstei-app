import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/navigation/navigation.component'
import SidebarNavigation from "../../components/sidebar/sidebar.component";


export default function ActiveMessagePage() {
    return (
        <div className='bg-gray-100 mx-1 font-body scroll-smooth h-0'>
            <Navigation />
            <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap overflow-x-hidden">

                <SidebarNavigation />
                <section className="bg-white mt-12 m-2 p-2 w-full rounded-lg relative overflow-x-auto shadow-md">
                    <h1 className="font-bold text-lg text-center underline">Active Message</h1>
                </section>
            </main>
            <Footer />
        </div>
    )
}