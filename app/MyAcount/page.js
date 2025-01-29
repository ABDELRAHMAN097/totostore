"use client";
import React from "react";
import { useUser } from "../context/UserContext";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const ProfilePage = () => {
  const { user, userRole, loading, logout } = useUser();

  if (loading) {
    return <p className="text-center text-white text-xl">جارٍ تحميل البيانات...</p>;
  }

  if (!user) {
    return <p className="text-center text-red-500 text-xl">يجب تسجيل الدخول لعرض البروفايل.</p>;
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
      {/* صورة البروفايل */}
      <div className="relative w-24 h-24 mx-auto">
        <img
          src={user.imageUrl}
          alt="Profile"
          className="w-full h-full rounded-full border-4 border-gray-200"
        />
        <div className="absolute bottom-1 right-1 bg-pink-500 p-1.5 rounded-full shadow-md cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 010 2.828L8.828 14l-4.242.707.707-4.242L14.586 2.586a2 2 0 012.828 0z" />
          </svg>
        </div>
      </div>

      {/* اسم المستخدم */}
      <h2 className="text-xl font-bold mt-4">{user.name}</h2>

      {/* بيانات المستخدم */}
      <div className="text-left mt-6">
        <div className="flex items-center text-gray-700 mb-3">
          <FaEnvelope className="text-pink-500 w-5 h-5 mr-2" />
          <p className="text-sm">{user.email}</p>
        </div>
        <div className="flex items-center text-gray-700">
          <FaPhone className="text-pink-500 w-5 h-5 mr-2" />
          <p className="text-sm">
            {user.phone ? user.phone : "رقم الهاتف غير متاح"}
          </p>
        </div>
      </div>

      {/* زر تسجيل الخروج */}
      <button
        onClick={logout}
        className="mt-8 w-full px-6 py-2 text-white bg-pink-500 rounded-lg font-semibold pink:bg-orange-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
