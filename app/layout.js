"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CgAdidas } from "react-icons/cg";
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
        {/* head */}

        <div className="head">
          <div className="social">
            <span><FaFacebook className="social-icon" /></span>
            <span><FaInstagram className="social-icon" /></span>
            <span><FaTiktok className="social-icon" /></span>
          </div>
          <div>
            <h2 className="text-[14px] md:text-[16px]">Free Shipping This Week Order Over - $55</h2>
          </div>
        </div>

        {/* header */}

        <header className="header">
          <div className="logo"><CgAdidas /></div>
          <div className="search">
            <input className="search-info" type="text"/>
            <FaSearch className="search-icon" />
          </div>
          <div className="icons">
            <Link className="link" href="/signup">
              <IoPersonOutline />
            </Link>
            <Link className="link" href="/Wishlist">
            <FaRegHeart />
            </Link>
            <Link className="link" href="/Shoping">
            <IoBagHandleOutline />
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
           <Link className="link" href="/dashboard">Dashboard</Link>
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
            © 2024 Copyright :
            <a className="cursor-pointer" href="https://tw-elements.com/"> totostore</a>
          </div>
        </footer>
        </CartProvider>
      </body>
    </html>
  );
}
