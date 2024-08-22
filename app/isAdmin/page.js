"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase"; // تأكد من أنك تستورد قاعدة البيانات بشكل صحيح

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  // استدعاء المستخدمين من Firestore عند تحميل الصفحة
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  // دالة لتعيين أو إزالة دور Admin
  const toggleAdmin = async (uid, isAdmin) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        isAdmin: !isAdmin // تغيير حالة Admin
      });

      // تحديث حالة المستخدمين محليًا بعد تغيير الحالة في Firestore
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.uid === uid ? { ...user, isAdmin: !isAdmin } : user
        )
      );
    } catch (error) {
      console.error("Error updating admin role:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.uid} className="mb-2 p-2 border-b border-gray-200">
            <span className="mr-4">{user.email}</span>
            <span
              className={`${
                user.isAdmin ? "text-green-600" : "text-red-600"
              } font-bold`}
            >
              {user.isAdmin ? "Admin" : "User"}
            </span>
            <button
              className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => toggleAdmin(user.uid, user.isAdmin)}
            >
              {user.isAdmin ? "Remove Admin" : "Make Admin"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
