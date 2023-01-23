// import { render } from "@testing-library/react";

import Footer from "../../components/footer/footer.component";
import Navigation from "../../components/navigation/navigation.component";
import SidebarNavigation from "../../components/sidebar/sidebar.component";


export default function ActiveRequestPage(){
    
    return(
        <div className='bg-gray-100 mx-1 font-body scroll-smooth h-0'>
            <Navigation />
            <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap ">
                <SidebarNavigation />
            </main>
            <Footer/>
        </div>
    )
}