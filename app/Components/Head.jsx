import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const Head = () => {
  return (
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
  )
}

export default Head