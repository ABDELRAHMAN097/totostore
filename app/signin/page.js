"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const isAdmin = userDoc.data().isAdmin;
        setIsAdmin(isAdmin);

        localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
        alert("Signed in successfully");
      } else {
        alert("User does not exist in Firestore!");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="h-100vh m-auto block max-w-sm rounded-lg bg-slate-500 p-6 shadow-4 dark:bg-surface-dark">
      <form className="relative" onSubmit={handleSignin}>
        <h1 className="text-white mb-6">Sign In</h1>
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
