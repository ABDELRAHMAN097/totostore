"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from 'next/image';
import logo from '../public/image/batman.png'
import { FaSearch } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from "../app/CartContext/CartContext.jsx";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [admin, setAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedIsAdmin = localStorage.getItem("isAdmin");
    if (storedIsAdmin) {
      setAdmin(JSON.parse(storedIsAdmin));
    }
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const closeDropdown = () => {
    setShowDropdown(false)
  }

  return (
    <html lang="en">
      <body className={inter.className}>
      <CartProvider> 

      {/* ToastContainer */}
      
      <ToastContainer position="top-right" autoClose={3000} />

        {/* head */}

        <div className="head">
          <div className="social">
            <span><FaFacebook className="social-icon" /></span>
            {/* <span><FaInstagram className="social-icon" /></span> */}
            <span><FaTiktok className="social-icon" /></span>
          </div>
          <div>
            <h2 className="text-[14px] md:text-[16px]">Free Shipping This Week Order Over - $55</h2>
          </div>
        </div>

        {/* header */}

        <header className="header flex items-center justify-between p-2 bg-white shadow-md ">
  <a href="/" className="w-10 h-10 mr-3 flex items-center justify-center sm:w-12 sm:h-12 md:w-16 md:h-16">
    <Image src={logo} alt="logo" className="w-full" />
  </a>

  <div className="flex flex-1 items-center justify-center mx-2 sm:mx-4 md:mx-6 relative">
  <input
    className="w-full p-2 pl-10 pr-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-pink-500 md:text-base lg:p-3"
    type="text"
    placeholder="Search..."
  />
  <FaSearch className="absolute left-3 text-gray-400" />
</div>


  <div className="flex items-center space-x-3 sm:space-x-4">
    <Link className="text-gray-700 hover:text-pink-500 transition duration-300" href="/signup">
      <IoPersonOutline size={5} className="size-5" />
    </Link>
    <Link className="text-gray-700 hover:text-pink-500 transition duration-300" href="/Wishlist">
      <FaRegHeart size={5} className="size-5" />
    </Link>
    <Link className="text-gray-700 hover:text-pink-500 transition duration-300" href="/Shoping">
      <IoBagHandleOutline size={5} className="size-5" />
    </Link>
  </div>
</header>


        {/* nav */}

        <nav className="nav">
          <Link className="link" href="/"><FaHome className="text-2xl" /></Link>
          <div className="relative inline-block">
        <button className="link flex items-center" onClick={toggleDropdown}>
          Categories <IoMdArrowDropdown className="text-2xl" />
        </button>
        
        {showDropdown && (
          <div className="absolute z-30 left-0 mt-2 w-32 bg-white border rounded-lg shadow-lg">
            <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-lg" href="/Men" onClick={closeDropdown}>Men</Link>
            <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-lg" href="/Women" onClick={closeDropdown}>Women</Link>
            <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-lg" href="/Accessories" onClick={closeDropdown}>Accessories</Link>
          </div>
        )}
      </div>
           {/* {admin && <Link className="link" href="/dashboard">Dashboard</Link>} */}
        </nav>

        {children}

        {/* footer */}
       
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
             Developed By <a className="text-pink-500" href="https://github.com/ABDELRAHMAN097">Abdelrahman</a>  All Copy Rights Reserved @2024 :
            <a className="cursor-pointer text-pink-500"> totostore</a>
          </div>
        </footer>
        </CartProvider>
      </body>
    </html>
  );
}