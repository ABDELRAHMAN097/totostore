"use client";
import { useState } from "react";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { toast } from "react-toastify";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
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
      toast.error("Error signing up: " + error.message);
    }
  };

  return (
    <div className="h-100vh m-auto block max-w-sm rounded-lg bg-slate-500 p-6 shadow-4 dark:bg-surface-dark">
      <form className="relative" onSubmit={handleSignup}>
        <h1 className="text-white mb-6">Create Account Now</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Link href="/signin">Sign In</Link>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
