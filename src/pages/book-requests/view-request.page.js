import { Modal } from "flowbite-react";
import { Fragment, useState } from "react"
import { FallingLines } from "react-loader-spinner";
import Footer from "../../components/footer/footer.component";
import Navigation from "../../components/navigation/navigation.component";
import SidebarNavigation from "../../components/sidebar/sidebar.component";

export default function ViewRequstPage(){
    const [showLoadingModal, setShowLoadingModal] = useState(true)
    return(
        <div className='bg-gray-100 mx-1 font-body scroll-smooth h-0'>
            <Navigation />
            <main className="bg-gray-300 mt-5 flex flex-wrap-reverse md:flex-nowrap ">

                <Fragment>
                    <Modal
                        show={showLoadingModal}
                        size="md"
                        popup={true}
                        onClose={showLoadingModal}
                        className="max-md:pt-32 mt-10 bg-opacity-60"
                    >
                        <Modal.Body>
                            <div className="grid col-span-full place-items-center h-56">
                                <FallingLines
                                    color="#1e94cc"
                                    width="120"
                                    visible={true}
                                    ariaLabel="falling-lines-loading"
                                />
                            </div>
                        </Modal.Body>
                    </Modal>
                </Fragment>

                <SidebarNavigation />
            </main>
            <Footer/>
        </div>
    )
}