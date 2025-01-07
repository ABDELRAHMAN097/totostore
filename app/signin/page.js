"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { DotLoader } from "react-spinners";
import Link from "next/link";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !password) {
        alert("Please enter both email and password.");
        setLoading(false);
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const isAdmin = userDoc.data().isAdmin;
        localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
        alert("Signed in successfully");

        // مسح حقول الإدخال بعد تسجيل الدخول الناجح
        setEmail("");
        setPassword("");
      } else {
        alert("User does not exist in Firestore!");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      if (error.code === "auth/invalid-credential") {
        alert("Invalid email or password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        alert("User not found. Please check your email.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else {
        alert("Error signing in. Please try again later.");
      }
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
        <h2 className="text-2xl font-semibold text-white mb-6">Sign In</h2>
        <form onSubmit={handleSignin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-3 mb-4 text-sm rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-3 mb-4 text-sm rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full p-3 mt-4 text-sm font-semibold text-white bg-pink-500 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? <DotLoader color="#ffffff" size={24} /> : "Log In"}
          </button>
        </form>
        <p className="text-white mt-4">
          Forgot your password?{" "}
          <Link href="/signup" className="text-blue-300 underline">
          Sign Up
        </Link>
        </p>
      </div>
    </div>
  );
}
