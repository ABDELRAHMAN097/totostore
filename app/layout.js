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
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "toto store-توتو ستور",
  description: "توتو ستور هو متجر الكتروني لبيع الملابس و التيشيرتات المطبوعه و يمكنك طباعة اي رسمه خاصه بك من خلال توتو ستور تواصل معهم الان",
  keywords: [
    "متجر الكتروني",
    "توتو ستور",
    "طباعة ملابس",
    "تيشيرتات مطبوعه",
    "فاشون",
    "موضه",
    "ملابس",
    "تيشيرتات حسب تخصصك",
    "تيشيرتات للمبرمجين",
    "تيشيرتات للرياضه و الجيم",
    "تيشيرتات جفلات",
  ],
  author: "Abdelrahman Magdy",
  url: "https://totostore.vercel.app/",
  image: "../img/ir2.jpeg",
  social: {
    //   twitter: "@YourTwitterHandle",
    facebook: "https://www.facebook.com/profile.php?id=61563414478280",
    //   linkedin: "YourLinkedInProfile"
  },
  categories: [
    "ملابس",
    "تيشيرتات",
    "طباعة ملابس",
    "تيشيرتات قطن",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        {/* head */}

        <div className="head">
          <div className="social">
            <span><FaFacebook className="social-icon" /></span>
            <span><FaInstagram className="social-icon" /></span>
            <span><FaTiktok className="social-icon" /></span>
          </div>
          <div>
            <h2 className="text-sm md:2xl">Free Shipping This Week Order Over - $55</h2>
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
          <FaRegHeart />
          <IoBagHandleOutline />
          </div>
        </header>

        {/* head */}

        <nav className="nav">
          <Link className="link" href="/">Home</Link>
          <Link className="link" href="/">Categories</Link>
          <Link className="link" href="/dashboard">dashboard</Link>
        </nav>

        {children}

        {/* footer */}
       
        <footer
          className="flex flex-col items-center bg-[#0a4275] text-center text-white">
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
            © 2023 Copyright :
            <a className="cursor-pointer" href="https://tw-elements.com/"> totostore</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
