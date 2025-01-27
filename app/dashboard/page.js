"use client";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Link from "next/link";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { MdAddBusiness } from "react-icons/md";
import { BiSolidCalendarEdit } from "react-icons/bi";
import ProtectedRoute from "../ProtectedRoute/page";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

export default function Page() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    } catch (error) {
      console.error("خطأ في جلب المنتجات:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      setProducts(products.filter((product) => product.id !== productId));
      console.log("تم حذف المنتج بالمعرف:", productId);
    } catch (error) {
      console.error("خطأ في حذف المنتج:", error);
    }
  };

  const { user, userRole, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // لو المستخدم مش Admin، يتم توجيهه
    if (!loading && userRole !== "admin") {
      router.push("/signin"); // صفحة لرفض الوصول
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
        <Link href="/isAdmin">
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md">
            <span>
            <IoMdSettings className="text-[22px] md:text-[42px]" />
            </span>
            <p className="text-gray-500 mt-2">Delete Products</p>
          </div>
        </Link>
      </div>

      {/* Form Section */}
      {/* Products Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
        {products.length === 0 ? (
          <p>No Products Available</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-48 w-full object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-500">Price: ${product.price}</p>
              <p className="text-gray-500">
                Description: {product.description}
              </p>
              <p className="text-gray-500">Category: {product.category}</p>
              <button
                className="mt-4 w-full text-center p-2 bg-red-500 text-white rounded-lg"
                onClick={() => handleDeleteProduct(product.id)}
              >
                <RiDeleteBin5Fill className="w-full text-center" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
