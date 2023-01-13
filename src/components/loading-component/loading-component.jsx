import { Fragment } from 'react'
import { Modal } from 'flowbite-react'
import { FallingLines } from 'react-loader-spinner'
export default function LoaderComponent({showModal}){
    <Fragment>
                    <Modal
                        show={showModal}
                        size="md"
                        popup={true}
                        onClose={showModal}
                        className="max-md:pt-32 mt-10 bg-opacity-60"
                    >
                   
                        <Modal.Body>
                            <div className="grid col-span-full place-items-center h-56"> 
                                <FallingLines
                                    color="#1e94cc"
                                    width="120"
                                    visible={true}
                                    ariaLabel='falling-lines-loading'
                                />               
                            </div>
                        </Modal.Body>
                    </Modal>
                </Fragment>
}

