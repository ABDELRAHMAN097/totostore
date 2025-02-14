"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../CartContext/CartContext"; // ضع المسار الصحيح هنا
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { IoMdCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";
import { IoIosStar } from "react-icons/io";
import { GiShoppingCart } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function Page() {
  const { addToCart, cartItems, wishlistItems, removeFromWishlist } = useCart();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");
  const [CurrentImage, setCurrentImage] = useState("");
  const [currentName, setcurrentName] = useState("");

  const openModal = (description, imageUrl, Name) => {
    setCurrentDescription(description);
    setCurrentImage(imageUrl);
    setcurrentName(Name);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Add product to shopping cart
  const handleAddToCart = (product) => {
    addToCart(product);
    localStorage.setItem("cartItems", JSON.stringify([...cartItems, product]));
    toast.success(
      <div>
        <span className="text-green-500">{product.name}</span> has been added to
        your cart!
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
      }
    );
  };

  // (Auto Vertical Carousel)
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 4); // 3 لأن لدينا 3 عناصر فقط
      }, 2000); // تغيير كل ثانيتين
  
      return () => clearInterval(interval);
    }, []);
  

  return (
      <div className="container min-h-[44.5vh] mx-auto p-2">
        <h1 className="text-3xl my-5 font-semibold text-center">Wishlist</h1>
        <div className="products px-2 md:p-0">
          {wishlistItems.map((product) => (
              <div
              onClick={() => router.push(`/DetailsProduct/${product.id}`)} // ✅ توجيه عند الضغط على البطاقة
              className="border relative my-2 mx-1 w-[300px] md:w-48 block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark min-h-[363px] md:min-h-[230px] cursor-pointer"
            >
              {" "}
              <div>
                <div>
                  <img
                    className="rounded-t-lg w-full h-[250px] md:h-48 object-cover"
                    src={product.imageUrls?.[0] || "/placeholder.png"}
                    alt={product.name}
                  />
                </div>
                <div className="relative text-right p-2">
                  <h2
                    dir="rtl"
                    className="text-gray-800 font-normal text-sm leading-none mb-1 py-1 overflow-hidden text-ellipsis line-clamp-2"
                  >
                    {product.description}
                  </h2>
                  <p className="text-gray-600 font-semibold flex items-center justify-end gap-2 text-right w-full">
                        <span className="bg-pink-500 text-[12px] text-white text-sm px-[2px] py-[2px] rounded">
                          -{product.discount}%
                        </span>
                        <div className="flex flex-row text-green-400 text-[12px] font-bold">
                          <p className="mr-1">جنيه</p>
                          <p>{product.price.toFixed(2)}</p>
                        </div>
                        <span className="line-through text-[12px] text-gray-400">
                          {product.price.toFixed(2)}
                        </span>
                      </p>
                  
                  <p className="absolute top-[-18px] right-1 text-pink-500 flex items-center text-[14px] font-light">
                    {product.rating} <IoIosStar className="text-[14px]" />
                  </p>
                    
                  {/* Auto Vertical Carousel */}
                  <div className="h-6 overflow-hidden text-gray-700 font-medium">
                    <motion.div
                      key={currentIndex}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-right"
                    >
                      {
                        [
                          <span
                            key="fast-selling"
                            className="flex items-center justify-end gap-1"
                          >
                            بتخلص بسرعة
                            <GiShoppingCart className="text-pink-500" />{" "}
                          </span>,
                          <span key="stock" className="text-[14px]">
                            {product.stock} عدد القطع المتاحة
                          </span>,
                          <span
                            key="discount"
                            className="text-[14px] text-green-400"
                          >
                            {product.brand}
                          </span>,
                          <span
                            key="delivery"
                            className="flex items-center justify-end gap-1"
                          >
                            توصيل مجاني
                            <TbTruckDelivery className="text-pink-500" />{" "}
                          </span>,
                        ][currentIndex]
                      }
                    </motion.div>
                  </div>
                </div>
                <button
                  className="absolute left-1 top-1 text-gray-500 bg-white rounded p-1"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // توقف انتشار الحدث
                    removeFromWishlist(product); // نفذ الدالة المطلوبة
                  }}
                >
                  <RiCloseCircleLine />
                </button>
                <button
                  className="absolute left-10 top-1 text-gray-500 bg-white rounded p-1"
                  onClick={(e) => {
                    e.preventDefault(); // منع السلوك الافتراضي
                    e.stopPropagation(); // منع انتشار الحدث
                    handleAddToCart(product); // نفذ الدالة المطلوبة
                  }}
                >
                  <GiShoppingCart className="text-pink-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-3">
            <div className="bg-white p-4 rounded-lg max-w-md w-full text-center relative">
              <img
                className="rounded-t-lg w-full object-cover"
                src={CurrentImage}
                alt={CurrentImage}
              />
              <h2 className="text-lg font-bold mb-2">{currentName}</h2>
              <p>{currentDescription}</p>
              <button
                className="text-pink-500 hover:text-pink-700 text-3xl rounded p-1 mt-4"
                onClick={closeModal}
              >
                <IoMdCloseCircle />
              </button>
            </div>
          </div>
        )}

        {/* الفلاتر */}
        {/* <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-4">
            <label htmlFor="size" className="text-lg">
              Size:
            </label>
            <select id="size" className="p-2 border border-gray-300 rounded-lg">
              <option value="all">All</option>
              <option value="s">Small</option>
              <option value="m">Mediam</option>
              <option value="l">Large</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="price" className="text-lg">
              Price:
            </label>
            <select
              id="price"
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All</option>
              <option value="0-100">0-100</option>
              <option value="100-500">100-500</option>
              <option value="500+">over than 500</option>
            </select>
          </div>
        </div> */}
      </div>
  );
}

// "use client"
// import React from 'react'

// export default function Page() {

//   return (
//     <div className="container mx-auto p-6">
//       {/* العنوان */}
//       <h1 className="text-3xl font-semibold text-center">Wishlist</h1>

//       {/* شريط البحث */}
//       <div className="mt-4 max-w-lg mx-auto">
//         <input
//           type="text"
//           placeholder="ابحث في المفضلة..."
//           className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* عرض المنتجات باستخدام Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//           <img
//             src="product-image.jpg"
//             alt="Product 1"
//             className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
//           />
//           <div className="p-4">
//             <h3 className="text-xl font-semibold text-gray-900">اسم المنتج</h3>
//             <p className="text-lg text-gray-700 mt-2">100 جنيه</p>
//             <div className="flex justify-between items-center mt-4">
//               <button
//               className="text-red-500 hover:text-red-700 font-semibold transition-colors duration-300"

//               >
//                 إزالة من المفضلة
//               </button>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
//                 أضف إلى السلة
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* تكرار نفس الهيكل لبقية المنتجات */}
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//           <img
//             src="product-image.jpg"
//             alt="Product 2"
//             className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
//           />
//           <div className="p-4">
//             <h3 className="text-xl font-semibold text-gray-900">اسم المنتج 2</h3>
//             <p className="text-lg text-gray-700 mt-2">200 جنيه</p>
//             <div className="flex justify-between items-center mt-4">
//               <button className="text-red-500 hover:text-red-700 font-semibold transition-colors duration-300">
//                 إزالة من المفضلة
//               </button>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
//                 أضف إلى السلة
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* إضافة منتج ثالث */}
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//           <img
//             src="product-image.jpg"
//             alt="Product 3"
//             className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
//           />
//           <div className="p-4">
//             <h3 className="text-xl font-semibold text-gray-900">اسم المنتج 3</h3>
//             <p className="text-lg text-gray-700 mt-2">150 جنيه</p>
//             <div className="flex justify-between items-center mt-4">
//               <button className="text-red-500 hover:text-red-700 font-semibold transition-colors duration-300">
//                 إزالة من المفضلة
//               </button>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
//                 أضف إلى السلة
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* إضافة منتج رابع */}
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//           <img
//             src="product-image.jpg"
//             alt="Product 4"
//             className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
//           />
//           <div className="p-4">
//             <h3 className="text-xl font-semibold text-gray-900">اسم المنتج 4</h3>
//             <p className="text-lg text-gray-700 mt-2">250 جنيه</p>
//             <div className="flex justify-between items-center mt-4">
//               <button className="text-red-500 hover:text-red-700 font-semibold transition-colors duration-300">
//                 إزالة من المفضلة
//               </button>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
//                 أضف إلى السلة
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* الفلاتر */}
//       <div className="flex justify-between items-center mt-6">
//         <div className="flex items-center space-x-4">
//           <label htmlFor="size" className="text-lg">الـحجم:</label>
//           <select id="size" className="p-2 border border-gray-300 rounded-lg">
//             <option value="all">الكل</option>
//             <option value="s">صغير</option>
//             <option value="m">متوسط</option>
//             <option value="l">كبير</option>
//           </select>
//         </div>
//         <div className="flex items-center space-x-4">
//           <label htmlFor="price" className="text-lg">الـسعر:</label>
//           <select id="price" className="p-2 border border-gray-300 rounded-lg">
//             <option value="all">الكل</option>
//             <option value="0-100">0-100</option>
//             <option value="100-500">100-500</option>
//             <option value="500+">أكثر من 500</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   )
// }