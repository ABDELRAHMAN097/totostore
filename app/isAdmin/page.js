"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase"; // تأكد أن db هو import صحيح لـ Firebase Firestore
import { auth } from "../lib/firebase"; // تأكد من أن auth هو Firebase Authentication

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // حالة للتحقق من إذا كان المستخدم الحالي أدمن

  // استدعاء المستخدمين
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // التحقق من حالة المستخدم الحالي (هل هو أدمن؟)
        const currentUserRef = doc(db, "users", auth.currentUser.uid);
        const currentUserSnap = await getDoc(currentUserRef);

        if (currentUserSnap.exists() && currentUserSnap.data().isAdmin) {
          setIsAdmin(true); // المستخدم الحالي أدمن

          // استدعاء بيانات جميع المستخدمين
          const usersCollection = collection(db, "users");
          const userSnapshot = await getDocs(usersCollection);
          const userList = userSnapshot.docs.map((doc) => ({
            uid: doc.id,
            ...doc.data(),
          }));
          setUsers(userList);
        } else {
          console.error("Access denied: You are not an admin.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // تعديل دور المستخدم
  const toggleAdmin = async (uid, currentIsAdmin) => {
    try {
      if (!isAdmin) {
        console.error("Access denied: You are not an admin.");
        return;
      }

      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        isAdmin: !currentIsAdmin,
      });

      // تحديث حالة المستخدمين في الـ state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.uid === uid ? { ...user, isAdmin: !currentIsAdmin } : user
        )
      );
    } catch (error) {
      console.error("Error updating admin role:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      {!isAdmin ? (
        <p className="text-red-500">Access denied: You are not an admin.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li
              key={user.uid}
              className="mb-2 p-2 border-b border-gray-200 flex justify-between items-center"
            >
              <div>
                <span className="mr-4">{user.email}</span>
                <span
                  className={`${
                    user.isAdmin ? "text-green-600" : "text-red-600"
                  } font-bold`}
                >
                  {user.isAdmin ? "Admin" : "User"}
                </span>
              </div>
              <button
                className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => toggleAdmin(user.uid, user.isAdmin)}
              >
                {user.isAdmin ? "Remove Admin" : "Make Admin"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}