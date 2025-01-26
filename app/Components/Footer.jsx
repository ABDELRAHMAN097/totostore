import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer
          className="flex flex-col items-center bg-gray-500 text-center text-white">
          <div className="container p-6">
            <div className="">
              <div className="flex items-center justify-center">
                <span className="me-4">Register for free</span>
                <Link href="/signup">
                <button
                  type="button"
                  className="inline-block rounded-full border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 hover:text-neutral-200 focus:border-neutral-300 focus:text-neutral-200 focus:outline-none focus:ring-0 active:border-neutral-300 active:text-neutral-200 dark:hover:bg-fuchsia-500 dark:focus:bg-neutral-600"
                  data-twe-ripple-init
                  data-twe-ripple-color="light">
                  Sign up!
                </button>
                </Link>
              </div>
            </div>
          </div>

          

          <div className="w-full bg-black/20 p-4 text-center cursor-pointer">
             Developed By <Link className="text-pink-500" href="https://github.com/ABDELRAHMAN097">Abdelrahman</Link>  All Copy Rights Reserved @2024 :
            <a className="cursor-pointer text-pink-500"> totostore</a>
          </div>
        </footer>
  )
}

export default Footer