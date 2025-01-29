"use client";
import React from "react";
import { useUser } from "../context/UserContext";

const ProfilePage = () => {
  const { user, userRole, loading, logout } = useUser();

  if (loading) {
    return <p className="text-center text-white text-xl">جارٍ تحميل البيانات...</p>;
  }

  if (!user) {
    return <p className="text-center text-red-500 text-xl">يجب تسجيل الدخول لعرض البروفايل.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
      <img
        src={user.imageUrl}
        alt="Profile"
        className="w-24 h-24 mx-auto rounded-full border-4 border-pink-500"
      />
      <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-600">{user.phone ? `📞 ${user.phone}` : "رقم الهاتف غير متاح"}</p>

      <div className="mt-4">
        {userRole === "admin" ? (
          <p className="text-green-500 font-semibold">🎖️ لديك صلاحيات الأدمن</p>
        ) : (
          <p className="text-blue-500 font-semibold">👤 مستخدم عادي</p>
        )}
      </div>

      <button
        onClick={logout}
        className="mt-6 px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
      >
        تسجيل الخروج
      </button>
    </div>
  );
};

export default ProfilePage;
