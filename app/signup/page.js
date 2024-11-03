"use client";
import { useState } from "react";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Link from "next/link";
import { DotLoader } from "react-spinners";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: email,
        isAdmin: false,
      });

      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.code === "auth/weak-password") {
        toast.error("Password is too weak.");
      } else if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use.");
      } else {
        toast.error("Error signing up: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-[450px] bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      {/* Background animated shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-700 rounded-full opacity-30 animate-[pulse_5s_ease-in-out_infinite]" />
      <div className="absolute top-10 right-0 w-72 h-72 bg-pink-300 rounded-full opacity-20 animate-[bounce_18s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 left-20 w-64 h-64 bg-pink-500 rounded-full opacity-25 animate-[spin_2s_linear_infinite]" />

      <div className="relative z-10 w-full max-w-sm p-8 bg-slate-500 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-white mb-6">Create Account Now</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2 mb-4 rounded bg-gray-600 text-white"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2 mb-4 rounded bg-gray-600 text-white"
          />
          <button
            type="submit"
            className="w-full p-3 mt-4 text-sm font-semibold text-white bg-pink-500 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? <DotLoader color="#ffffff" size={24} /> : "Sign Up"}
          </button>
        </form>
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
