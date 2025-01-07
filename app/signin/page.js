"use client";
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../lib/firebase";
import { DotLoader } from "react-spinners";

export default function SigninWithOTP() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible", // يمكنك تغييرها إلى "normal" إذا أردت عرض الـ Recaptcha
          callback: (response) => {
            console.log("Recaptcha verified");
          },
        },
        auth
      );
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!phoneNumber) {
      alert("Please enter your phone number.");
      setLoading(false);
      return;
    }

    try {
      setupRecaptcha();

      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setShowOtpInput(true);
      alert("OTP has been sent to your phone.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!otp) {
      alert("Please enter the OTP.");
      setLoading(false);
      return;
    }

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      alert("Signed in successfully!");
      console.log("User signed in:", user);

      // مسح الحقول بعد تسجيل الدخول
      setPhoneNumber("");
      setOtp("");
      setShowOtpInput(false);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-700 rounded-full opacity-30 animate-[pulse_5s_ease-in-out_infinite]" />
      <div className="absolute top-10 right-0 w-72 h-72 bg-pink-300 rounded-full opacity-20 animate-[bounce_18s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 left-20 w-64 h-64 bg-pink-500 rounded-full opacity-25 animate-[spin_2s_linear_infinite]" />

      <div className="relative z-10 w-full max-w-sm p-8 bg-gray-700 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-white mb-6">Sign In with OTP</h2>
        {!showOtpInput ? (
          <form onSubmit={sendOtp}>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number (e.g., +201234567890)"
              required
              className="w-full p-3 mb-4 text-sm rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full p-3 mt-4 text-sm font-semibold text-white bg-pink-500 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? <DotLoader color="#ffffff" size={24} /> : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full p-3 mb-4 text-sm rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full p-3 mt-4 text-sm font-semibold text-white bg-pink-500 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? <DotLoader color="#ffffff" size={24} /> : "Verify OTP"}
            </button>
          </form>
        )}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}