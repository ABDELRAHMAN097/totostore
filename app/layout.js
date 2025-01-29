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
