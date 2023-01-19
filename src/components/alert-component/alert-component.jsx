import React from 'react'
import { HiOutlineInformationCircle } from "react-icons/hi"
import { Alert} from 'flowbite-react'
export default function AlertComponent(message, error, success) {
  return (
    <div className="relative z-0 mb-6 w-full group">
    {message === "error" && (
            <Alert
                color="failure"
                icon={HiOutlineInformationCircle}
            >
                <span>
                    {error}!
                </span>
            </Alert>
        )} 
    {message === "success" && (
            <Alert
            color="success"
            icon={HiOutlineInformationCircle}
        >
            <span>
                {success}!
            </span>
        </Alert>
        )} 
        
    {message === "added" && (
                     <Alert
                     color="primary"
                     icon={HiOutlineInformationCircle}
                 >
                     <span>
                         {success}!
                     </span>
                 </Alert>
        )} 
      
    </div>
  )
}
