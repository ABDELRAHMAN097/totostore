"use client";
import React from 'react';
import Link from "next/link";
import { useCart } from '../CartContext/CartContext';

export default function ShoppingCart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  // حساب التكلفة الكلية لكل المنتجات
  const totalCost = cartItems.reduce((total, product) => total + parseFloat(product.price) * product.quantity, 0);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4 sm:p-8">
        <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row">
          {/* قسم المنتجات */}
          <div className="w-full lg:w-2/3 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <div className="flex justify-between border-b pb-4 mb-4">
              <span className="text-lg font-semibold">{cartItems.length} Items</span>
            </div>

            {/* عرض المنتجات */}
            <div className="space-y-4">
              {cartItems.map((product) => (
                <div
                  className="flex flex-row gap-2 sm:gap-7 items-center border-b pb-2"
                  key={product.id}
                >
                  <div className="flex items-center mb-4 sm:mb-0">
                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 mr-4" />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <span className="text-gray-500 text-sm">{product.category}</span>
                      <p
                        className="text-blue-500 cursor-pointer text-sm mt-1"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 mb-4 sm:mb-0">
                   <button className="px-2 py-1 border" onClick={() => decreaseQuantity(product.id)}>-</button>
                   <span>{product.quantity}</span>
                   <button className="px-2 py-1 border" onClick={() => increaseQuantity(product.id)}>+</button>
                 </div>
                  <span className="text-gray-500">£{product.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* قسم ملخص الطلب */}
          <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center lg:text-left">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>ITEMS </span>
              <span>£{totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              {/* <span>SHIPPING</span> */}
              <span>Standard Delivery</span>
              <span>£5.00</span>
            </div>
            <div className="mb-4">
              <label className="text-gray-600">PROMO CODE</label>
              <input type="text" placeholder="Enter your code" className="w-full p-2 border rounded mt-1" />
              <button className="w-full mt-2 p-2 bg-pink-500 hover:bg-pink-600 text-white rounded ml-1">APPLY</button>
            </div>
            <div className="flex justify-between mb-4 font-semibold">
              <span>TOTAL COST</span>
              <span>£{(totalCost + 5).toFixed(2)}</span>
            </div>
            <Link href="/Shoping/Payment">
              <button className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 ml-1">
                CHECKOUT
              </button>
            </Link>
          </div>
        </div>

        <Link href="../Wishlist">
          <p className="mt-4 text-blue-500 cursor-pointer lg:text-left">← Continue Wishlist</p>
        </Link>
      </div>
    </div>
  );
}
