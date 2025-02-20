"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";
import { IoIosStar } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { useCart } from "../app/CartContext/CartContext";
import { useRouter } from "next/navigation";
import Home from "./pages/Home";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { addToCart, cartItems, addToWishlist } = useCart();
  const router = useRouter();

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
        autoClose: 2000,
      }
    );
  };

  // Add product to Wishlist
  const handleAddToWishlist = (product) => {
    addToWishlist(product);
  };

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const scrollToProducts = () => {
    const section = document.getElementById("products-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
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
    <div className="min-h-[44.5vh]">
      {loading && (
        <div className="loading-overlay">
          <BarLoader color={"#d60096"} loading={loading} size={350} />
        </div>
      )}

      <div className="px-1">
      <Home/>
      </div>

      <div className=" text-gray-500 pl-1 my-2">
      <h3 id="products-section" className="text-gray-500">
        Trendy clothes
      </h3>
      </div>
      <div>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found ... !</p>
        ) : (
          <div className="products px-1 md:p-0">
            {products.map((product) => {
              const discountAmount = (product.price * product.discount) / 100;
              const newPrice = product.price - discountAmount;
              return (
                <div
                  onClick={() => router.push(`/DetailsProduct/${product.id}`)} // ✅ توجيه عند الضغط على البطاقة
                  className="border relative my-2 mx-1 w-full md:w-48 block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark min-h-[369px] md:min-h-[230px] cursor-pointer"
                >
                  {" "}
                  <div>
                    <div>
                      <img
                        className="rounded-t-lg w-full h-[265px] md:h-48 object-cover"
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
                          <p>{newPrice.toFixed(2)}</p>
                        </div>
                        <span className="line-through text-[12px] text-gray-400">
                        {parseFloat(product.price).toFixed(2)}
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
                        handleAddToWishlist(product); // نفذ الدالة المطلوبة
                      }}
                    >
                      <FaRegHeart />
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;