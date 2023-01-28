
export default function ButtonComponent({btnColor, btnValue}){
    return (
        <button 
        type="button" 
        className={`inline-block px-4 py-2 mt-2 bg-${btnColor}-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-${btnColor}-700 hover:shadow-lg focus:bg-${btnColor}-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-${btnColor}-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-3`}
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        >
            {btnValue}
        </button>
    )
}