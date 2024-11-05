"use client";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase"; 
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");

  const uploadProductImage = async (file) => {
    if (!file) {
      throw new Error("لا يوجد ملف للرفع.");
    }
    const storageRef = ref(storage, `products/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("رابط الصورة:", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("خطأ في رفع الصورة:", error);
      throw error;
    }
  };

  const addProductWithImage = async (productData) => {
    try {
      const imageUrl = await uploadProductImage(file);
      const docRef = await addDoc(collection(db, "products"), {
        ...productData,
        imageUrl,
      });
      console.log("تم إضافة المنتج بالمعرف:", docRef.id);
      return true;
    } catch (error) {
      console.error("خطأ في إضافة المنتج:", error);
      return false;
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("الملف المحدد:", selectedFile);
    setFile(selectedFile);
  };

  const handleAddProduct = async () => {
    if (file && name && price) {
      const productData = {
        name,
        price: parseFloat(price),
        description,
        category,
      };

      const success = await addProductWithImage(productData);
      if (success) {
        resetForm();
        fetchProducts();
      } else {
        console.error("فشل في إضافة المنتج.");
      }
    } else {
      console.error("لم يتم تحديد ملف أو تفاصيل المنتج مفقودة.");
    }
  };

  const resetForm = () => {
    setFile(null);
    setName("");
    setPrice("");
    setDescription("");
    setCategory("Men");
  };

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

  return (
    <div className="container mx-auto p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Display Stats */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-2xl font-bold">322</p>
        <p className="text-gray-500">Completed</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-2xl font-bold">208</p>
        <p className="text-gray-500">Active</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-2xl font-bold">85</p>
        <p className="text-gray-500">Review</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-2xl font-bold">48</p>
        <p className="text-gray-500">Approval</p>
      </div>
    </div>
  
    {/* Form Section */}
    <div className="my-8">
      <input
        className="block w-full border border-gray-300 p-2 rounded-lg mb-4"
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="block w-full border border-gray-300 p-2 rounded-lg mb-4"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <textarea
        className="block w-full border border-gray-300 p-2 rounded-lg mb-4"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="block w-full border border-gray-300 p-2 rounded-lg mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Accessories">Accessories</option>
      </select>
      <input type="file" className="block w-full mb-4" onChange={handleFileChange} />
      <button
        className="block w-full p-2 bg-blue-600 text-white rounded-lg"
        onClick={handleAddProduct}
      >
        Add Product
      </button>
    </div>
  
    {/* Products Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <p className="text-gray-500">Description: {product.description}</p>
            <p className="text-gray-500">Category: {product.category}</p>
            <button
              className="mt-4 w-full text-center p-2 bg-red-500 text-white rounded-lg"
              onClick={() => handleDeleteProduct(product.id)}
            >
              <RiDeleteBin5Fill className="w-full text-center"/>
            </button>
          </div>
        ))
      )}
    </div>
  </div>
  
  );
}
