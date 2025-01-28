import React from 'react';
import { useUser } from "../context/UserContext"; // تأكد من صحة المسار

export default function Page() {
    const { user, loading  } = useUser();

    if (loading) {
        return <div>Loading...</div>; // لو البيانات لسه بتتجلب
    }

    if (!user) {
        return <div>No user data available.</div>; // لو مفيش بيانات للمستخدم
    }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl p-8 space-y-6">
        <div className="flex justify-center">
          {/* صورة البروفايل */}
          <img
            src={user.imageUrl || '/default-avatar.png'}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
          />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-lg text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500">{user.phone}</p>
        </div>

        <div className="space-y-4">
          {/* بيانات المستخدم */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-semibold">Email:</p>
            <p className="text-gray-800">{user.email}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-semibold">Phone Number:</p>
            <p className="text-gray-800">{user.phone}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-semibold">Role:</p>
            <p className="text-gray-800">{user.isAdmin ? 'Admin' : 'User'}</p>
          </div>
        </div>

        {/* أزرار التعديل */}
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            Edit Profile
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}


