import React, { useState } from 'react'
import Link from 'next/link'
import { IoMdArrowDropdown } from "react-icons/io";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
      };
      const closeDropdown = () => {
        setShowDropdown(false);
      };
  return (
    <nav className="nav">
    <Link className="link" href="/">
      <FaHome className="text-2xl" />
    </Link>
    <div className="relative inline-block">
      <button
        className="link flex items-center"
        onClick={toggleDropdown}
      >
        Categories <IoMdArrowDropdown className="text-2xl" />
      </button>

      {showDropdown && (
        <div className="absolute z-30 left-0 mt-2 w-32 bg-white border rounded-lg shadow-lg">
          <Link
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-lg"
            href="/Men"
            onClick={closeDropdown}
          >
            Men
          </Link>
          <Link
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-lg"
            href="/Women"
            onClick={closeDropdown}
          >
            Women
          </Link>
          <Link
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-lg"
            href="/Accessories"
            onClick={closeDropdown}
          >
            Accessories
          </Link>
        </div>
      )}
    </div>
    <Link className="link" href="/dashboard">
     Dashboard
    </Link>
  </nav>
  )
}

export default Navbar