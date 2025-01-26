"use client";
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebase"; // تأكد من صحة المسار

export default function AddProducts() {
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
        // استدعاء fetchProducts إذا كان موجودًا
        console.log("تم إضافة المنتج بنجاح.");
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

  return (
    <div className="my-8 mx-4 min-h-[47.4vh]">
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
      <input
        type="file"
        className="block w-full mb-4"
        onChange={handleFileChange}
      />
      <button
        className="block w-full p-2 bg-blue-600 text-white rounded-lg"
        onClick={handleAddProduct}
      >
        Add Product
      </button>
    </div>
  );
}
