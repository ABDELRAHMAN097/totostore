"use client";
import React, { useEffect, useState } from 'react'
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { RiDeleteBin5Fill } from "react-icons/ri";
import ProtectedRoute from "../../ProtectedRoute/page";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";
import SearchBar from '@/app/Components/SearchBar ';

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setFilteredProducts(productsData); // عند جلب البيانات، نقوم بتمريرها إلى filteredProducts
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
      setFilteredProducts(filteredProducts.filter((product) => product.id !== productId)); // تحديث المنتجات المفلترة بعد الحذف
      console.log("تم حذف المنتج بالمعرف:", productId);
    } catch (error) {
      console.error("خطأ في حذف المنتج:", error);
    }
  };

  const { user, userRole, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && userRole !== "admin") {
      router.push("/403"); // صفحة لرفض الوصول
    }
  }, [userRole, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute adminOnly={true}>
      <div>
        <SearchBar products={products} setFilteredProducts={setFilteredProducts} />
        
        {/* Products Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
          {filteredProducts.length === 0 ? (
            <p>No Products Available</p>
          ) : (
            filteredProducts.map((product) => (
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

export default DeleteProduct;
