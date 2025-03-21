import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage (){
    const error = useRouteError();

    return (
        <main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]" id="error-page">
        <h1 class="text-xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-widest">{error.statusText}</h1>
        <div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
            {error.message}
        </div>
        <button class="mt-5">
          <Link to='/'
            class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
          >
            <span
              class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
            ></span>
    
            <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
              Go Home
            </span>
          </Link>
        </button>
    </main>
       
    )
}