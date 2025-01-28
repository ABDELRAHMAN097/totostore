"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut  } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // تعريف userRole و setUserRole
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const isAdmin = userDoc.data().isAdmin || false;
          setUser({
            uid: user.uid,
            email: user.email,
            name: userDoc.data().name,
            phone: userDoc.data().phone,
            imageUrl: userDoc.data().imageUrl || "/default-avatar.png",
            isAdmin: userDoc.data().isAdmin || false,
          });
          setUserRole(isAdmin ? "admin" : "user");
        } else {
          setUser(null);
          setUserRole(null);
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


   // Function لتسجيل الخروج
   const logout = async () => {
    try {
      await signOut(auth); // Firebase signOut
      setUser(null); // تفريغ بيانات المستخدم
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, userRole, setUserRole, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
