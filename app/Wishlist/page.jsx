
"use client"
import React from 'react'
// import { useCart } from "../CartContext/CartContext.jsx";


export default function Page() {
  // const { removeFromCart, cartItems } = useCart();
  // const { removeFromWishlist, addToCart, wishlistItems } = useCart();


  return (
    <div className="container mx-auto p-6">
      {/* العنوان */}
      <h1 className="text-3xl font-semibold text-center">Wishlist</h1>

      {/* شريط البحث */}
      <div className="mt-4 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="ابحث في المفضلة..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* عرض المنتجات باستخدام Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="product-image.jpg"
            alt="Product 1"
            className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900">اسم المنتج</h3>
            <p className="text-lg text-gray-700 mt-2">100 جنيه</p>
            <div className="flex justify-between items-center mt-4">
              <button 
              className="text-red-500 hover:text-red-700 font-semibold transition-colors duration-300"
              onClick={() => removeFromCart(product.id)}
              >
                إزالة من المفضلة
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                أضف إلى السلة
              </button>
            </div>
          </div>
        </div>

        {/* تكرار نفس الهيكل لبقية المنتجات */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="product-image.jpg"
            alt="Product 2"
            className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900">اسم المنتج 2</h3>
            <p className="text-lg text-gray-700 mt-2">200 جنيه</p>
            <div className="flex justify-between items-center mt-4">
              <button className="text-red-500 hover:text-red-700 font-semibold transition-colors duration-300">
                إزالة من المفضلة
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                أضف إلى السلة
              </button>
            </div>
          </div>
        </div>

        {/* إضافة منتج ثالث */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="product-image.jpg"
            alt="Product 3"
            className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900">اسم المنتج 3</h3>
            <p className="text-lg text-gray-700 mt-2">150 جنيه</p>
            <div className="flex justify-between items-center mt-4">
              <button className="text-red-500 hover:text-red-700 font-semibold transition-colors duration-300">
                إزالة من المفضلة
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                أضف إلى السلة
              </button>
            </div>
          </div>
        </div>

        {/* إضافة منتج رابع */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="product-image.jpg"
            alt="Product 4"
            className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900">اسم المنتج 4</h3>
            <p className="text-lg text-gray-700 mt-2">250 جنيه</p>
            <div className="flex justify-between items-center mt-4">
              <button className="text-red-500 hover:text-red-700 font-semibold transition-colors duration-300">
                إزالة من المفضلة
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                أضف إلى السلة
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* الفلاتر */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center space-x-4">
          <label htmlFor="size" className="text-lg">الـحجم:</label>
          <select id="size" className="p-2 border border-gray-300 rounded-lg">
            <option value="all">الكل</option>
            <option value="s">صغير</option>
            <option value="m">متوسط</option>
            <option value="l">كبير</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="price" className="text-lg">الـسعر:</label>
          <select id="price" className="p-2 border border-gray-300 rounded-lg">
            <option value="all">الكل</option>
            <option value="0-100">0-100</option>
            <option value="100-500">100-500</option>
            <option value="500+">أكثر من 500</option>
          </select>
        </div>
      </div>
    </div>
  )
}
