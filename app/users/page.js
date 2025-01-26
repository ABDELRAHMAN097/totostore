"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

export default function GetUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const allUsers = userSnapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data()
        }));

        // تصفية المستخدمين الذين ليس لديهم دور Admin
        const regularUsers = allUsers.filter(user => !user.isAdmin);
        setUsers(regularUsers);
        setLoading(false); // إيقاف حالة التحميل
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error);
        setLoading(false); // إيقاف حالة التحميل في حالة حدوث خطأ
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>; // عرض رسالة أثناء التحميل
  }

  if (error) {
    return <div>Error fetching users: {error.message}</div>; // عرض رسالة في حالة حدوث خطأ
  }

  return (
    <ProtectedRoute adminOnly={true}>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Regular Users</h1>
      <ul>
        {users.length > 0 ? (
          users.map(user => (
            <li key={user.uid} className="mb-2 p-2 border-b border-gray-200">
              <span className="mr-4">{user.email}</span>
              <span className="text-red-600 font-bold">User</span>
            </li>
          ))
        ) : (
          <p>No regular users found.</p>
        )}
      </ul>
    </div>
    </ProtectedRoute>
  );
}
