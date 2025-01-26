"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useUser } from "../context/UserContext"; // تأكد من مسار الـ Context

export default function ManageUsers() {
  const { user } = useUser(); // جلب بيانات المستخدم من الـ Context
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) return;

    // التحقق من إذا كان المستخدم الحالي أدمن
    const checkAdmin = async () => {
      const adminCheck = user?.isAdmin || false;
      setIsAdmin(adminCheck);
    };

    checkAdmin();
  }, [user]);

  useEffect(() => {
    if (!isAdmin) return; // فقط الأدمن يقدر يجلب بيانات المستخدمين

    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data()
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [isAdmin]);

  const toggleAdmin = async (uid, currentAdminStatus) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        isAdmin: !currentAdminStatus
      });

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.uid === uid ? { ...user, isAdmin: !currentAdminStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating admin role:", error);
    }
  };

  if (!isAdmin) {
    return <div>Access Denied: Admins Only</div>;
  }

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
