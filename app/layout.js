"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "../app/CartContext/CartContext.jsx";
import { UserProvider } from "./context/UserContext";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <CartProvider>
            {/* ToastContainer */}
            <ToastContainer position="top-right" autoClose={3000} />
            {/* head */}
             <div className="head">
                        <div className="social">
                          <span>
                            <FaFacebook className="social-icon" />
                          </span>
                          {/* <span><FaInstagram className="social-icon" /></span> */}
                          <span>
                            <FaTiktok className="social-icon" />
                          </span>
                        </div>
                        <div>
                          <h2 className="text-[14px] md:text-[16px]">
                            Free Shipping This Week Order Over - $55
                          </h2>
                        </div>
                      </div>
            {/* header */}
            <Header />
            {/* nav */}
            <Navbar />
            {children}
            {/* footer */}
            <Footer />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
