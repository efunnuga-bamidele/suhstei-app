import React from 'react'

export default function StepItem({icon, extraIcon, title, content, step, postStyle, preStyle}) {
  return (
    <div className='group flex justify-center m-4 '>{/*Search Book Card*/}
        <div className="block rounded-lg shadow lg bg-white max-w-sm text-center hover:transition ease-in-out duration-500 cursor-pointer">
            <div className="py-3 px-6 border-b border-gray-300 flex justify-center group-hover:rounded-t-lg">
                <img src={icon} alt="Search-Icon" className={`group-hover:text-white group-hover:animate-[bounce_1s_ease-in-out_3] ${postStyle}`}/>
                {extraIcon && <img src={extraIcon} alt="Book-Icon" className={`group-hover:text-white group-hover:animate-[bounce_1s_ease-in-out_3] ${preStyle}`}/>}
            </div>
            <div className="p-6 group group-hover:bg-blue-500">
                <h5 className="text-grat-900 text-xl font-medium mb-2 group group-hover:text-white">
                    {title}
                </h5>
                <p className="text-gray-700 text-base mb-4 group group-hover:text-white">
                    {content}
                </p>
            </div>
            <div className="py-3 px-6 border-t border-gray-300 text-gray-600 group-hover:text-white group-hover:bg-blue-500">
                {step}
            </div>
        </div>
    </div>
  )
}
