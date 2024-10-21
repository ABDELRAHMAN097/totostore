"use client";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase"; 
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Link from "next/link";

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
    <div className="control">
      <div>
        <input
          className="text-black"
          type="text"
          placeholder="اسم المنتج"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="text-black"
          type="number"
          placeholder="سعر المنتج"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          className="text-black textarea"
          placeholder="وصف المنتج"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="text-black"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Men">رجال</option>
          <option value="Women">نساء</option>
        </select>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleAddProduct}>إضافة منتج</button>
      </div>

      <div>
        <h2>المستخدم إلى الإدارة</h2>
        <Link href="/isAdmin">كل المدراء</Link>
      </div>

      <div>
        <h1>لوحة تحكم المنتجات</h1>
        {products.length === 0 ? (
          <p>لا توجد منتجات</p>
        ) : (
          <div className="products">
            {products.map((product) => (
              <div className="card" key={product.id}>
                <img
                  className="product-img"
                  src={product.imageUrl}
                  alt={product.name}
                  width="200"
                />
                <div className="card-body">
                  <h2>{product.name}</h2>
                  <p>السعر: ${product.price}</p>
                  <p>الوصف: {product.description}</p>
                  <p>الفئة: {product.category}</p>
                  <button onClick={() => handleDeleteProduct(product.id)}>
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
