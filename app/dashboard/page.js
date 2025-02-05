"use client";
import { useEffect } from "react";
import Link from "next/link";
import { IoMdSettings } from "react-icons/io";
import { MdAddBusiness } from "react-icons/md";
import { BiSolidCalendarEdit } from "react-icons/bi";
import ProtectedRoute from "../ProtectedRoute/page";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

export default function Page() {
  

  const { user, userRole, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // لو المستخدم مش Admin، يتم توجيهه
    if (!loading && userRole !== "admin") {
      router.push("/403"); // صفحة لرفض الوصول
    }
  }, [userRole, loading, router]);

  // عرض Loading Spinner لحد ما يتم التحقق
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute adminOnly={true}>
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Display Stats */}
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md">
        <p className="text-2xl font-bold">322</p>
          <p className="text-gray-500 mt-2">Completed</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md">
        <p className="text-2xl font-bold">208</p>
          <p className="text-gray-500 mt-2">Active</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md">
        <p className="text-2xl font-bold">85</p>
          <p className="text-gray-500 mt-2">Review</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md">
        <p className="text-2xl font-bold">48</p>
          <p className="text-gray-500 mt-2">Approval</p>
        </div>
        {/* ################# */}
        <Link href="/isAdmin">
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md">
            <span>
            <IoMdSettings className="text-[22px] md:text-[42px]" />
            </span>
            <p className="text-gray-500 mt-2">Manage Users</p>
          </div>
        </Link>
        <Link href="/AddProducts">
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md">
            <span>
            <MdAddBusiness className="text-[22px] md:text-[42px]" />
            </span>
            <p className="text-gray-500 mt-2">Add Products</p>
          </div>
        </Link>
        <Link href="/isAdmin">
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md">
            <span>
            <BiSolidCalendarEdit className="text-[22px] md:text-[42px]" />
            </span>
            <p className="text-gray-500 mt-2">Edit Products</p>
          </div>
        </Link>
        <Link href="/dashboard/DeleteProduct">
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md">
            <span>
            <IoMdSettings className="text-[22px] md:text-[42px]" />
            </span>
            <p className="text-gray-500 mt-2">Delete Products</p>
          </div>
        </Link>
      </div>

      {/* Form Section */}
      
    </div>
    </ProtectedRoute>
  );
}
