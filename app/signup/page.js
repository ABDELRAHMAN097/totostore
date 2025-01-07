"use client";
import { useState } from "react";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Link from "next/link";

export default function Signup() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Enter phone, Step 2: Enter OTP

  // Configure reCAPTCHA
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved - allow signInWithPhoneNumber.
            console.log("Recaptcha Verified");
          },
        },
        auth
      );
    }
  };

  // Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      setStep(2); // Move to OTP step
      toast.success("OTP sent to your phone!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
      const userCredential = await auth.signInWithCredential(credential);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        phone: phone,
        isAdmin: false,
      });

      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      {/* Background animated shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-700 rounded-full opacity-30 animate-[pulse_5s_ease-in-out_infinite]" />
      <div className="absolute top-10 right-0 w-72 h-72 bg-pink-300 rounded-full opacity-20 animate-[bounce_18s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 left-20 w-64 h-64 bg-pink-500 rounded-full opacity-25 animate-[spin_2s_linear_infinite]" />

      <div className="relative z-10 w-full max-w-sm p-8 bg-slate-500 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-white mb-6">
          {step === 1 ? "Sign Up with Phone" : "Verify OTP"}
        </h2>
        <form onSubmit={step === 1 ? sendOtp : verifyOtp}>
          {step === 1 ? (
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
              className="w-full p-2 mb-4 rounded bg-gray-600 text-white"
            />
          ) : (
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full p-2 mb-4 rounded bg-gray-600 text-white"
            />
          )}
          <button
            type="submit"
            className="w-full p-3 mt-4 text-sm font-semibold text-white bg-pink-500 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? "Loading..." : step === 1 ? "Send OTP" : "Verify OTP"}
          </button>
        </form>
        <div id="recaptcha-container"></div>
        <p className="text-white mt-4">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-300 underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}