import Navigation from "../../components/navigation/navigation.component";
import Footer from "../../components/footer/footer.component";
import SidebarNavigation from "../../components/sidebar/sidebar.component";


export default function DashboardPage(){
    return (
        <div className='bg-gray-100 mx-1 font-body scroll-smooth'>
            <Navigation />
                <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap">
                  
                    <SidebarNavigation />
                    <section className="bg-white mt-12 mb-2 p-2 w-full mr-1">
                        <h1 className="font-bold text-lg text-center underline">My Dashboard</h1>
                        <p> Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.Get some of the most exciting books you have always been looking for.</p>
                    </section>
                </main>
            <Footer />
        </div>
    )
}
