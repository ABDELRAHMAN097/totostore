"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut  } from "firebase/auth";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); 
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
  
   // edit user
   const updateUser = async (newData) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, newData); // تحديث البيانات في Firestore

      // تحديث الحالة داخل التطبيق
      setUser((prevUser) => ({
        ...prevUser,
        ...newData,
      }));
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  };

  // Delete User Function
const deleteUser = async (uid) => {
  try {
    await deleteDoc(doc(db, "users", uid)); // حذف المستخدم من Firestore
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error; // علشان لو فيه مشكلة ترجع للمكان اللي استدعى الدالة
  }
};

  

   // Logout Function
   const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, userRole, setUserRole, loading, logout, deleteUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
