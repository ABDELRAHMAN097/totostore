import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/image/batman.png";
import { FaSearch } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { useUser } from "../context/UserContext"; 
import LogoutButton from "../LogoutButton/LogoutButton"; 

const Header = () => {
  const { user } = useUser(); 

  return (
    <header className="header flex items-center justify-between p-2 bg-white shadow-md">
      <a
        href="/"
        className="w-10 h-10 mr-3 flex items-center justify-center sm:w-12 sm:h-12 md:w-16 md:h-16"
      >
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
        {!user ? ( // عرض صفحة التسجيل إذا كان المستخدم غير مسجل دخول
          <Link
            className="text-gray-700 hover:text-pink-500 transition duration-300"
            href="/signup"
          >
            <IoPersonOutline className="text-gray-700 text-[20px] hover:text-pink-500 transition duration-300" />
          </Link>
        ) : (
          <>
          <LogoutButton size={5} className="text-[20px]" />
          <Link
          className="text-gray-700 hover:text-pink-500 transition duration-300"
          href="/profile"
        >
          <MdAccountCircle  size={5} className="size-5" />
        </Link>
        </>
        )}
        <Link
          className="text-gray-700 hover:text-pink-500 transition duration-300"
          href="/Wishlist"
        >
          <FaRegHeart size={5} className="size-5" />
        </Link>
        <Link
          className="text-gray-700 hover:text-pink-500 transition duration-300"
          href="/Shoping"
        >
          <IoBagHandleOutline size={5} className="size-5" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
