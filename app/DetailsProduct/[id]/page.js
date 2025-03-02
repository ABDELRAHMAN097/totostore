"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { IoIosStar } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { useCart } from "../../CartContext/CartContext.jsx"; // ضع المسار الصحيح هنا
import Image from "next/image";
import { toast } from "react-toastify";
import { BarLoader } from "react-spinners";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const { addToCart, cartItems, addToWishlist } = useCart();

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
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
        autoClose: 2000,
      }
    );
  };

  useEffect(() => {
    if (!id) return;
    
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const productData = docSnap.data(); // تم إصلاح الخطأ هنا
          console.log("Fetched Product Data:", productData);
          setProduct(productData);
          setSelectedImage(productData.imageUrls?.[0] || "/placeholder.png");
        }else {
          console.log("No such product found!");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading-overlay">
  <BarLoader color={"#d60096"} loading={loading} size={350} />
</div>;
  if (!product) return <p className="text-center">Product not found!</p>;

  const discountAmount = (product.price * product.discount) / 100;
  const newPrice = product.price - discountAmount;

  return (
    <div className="container mx-auto p-4 md:flex md:gap-8">
      {loading && (
        <div className="loading-overlay">
          <BarLoader color={"#d60096"} loading={loading} size={350} />
        </div>
      )}
      {/* تفاصيل المنتج */}
      <div className="md:w-1/2 text-end">
        <h2 className="text-pink-500 font-semibold mb-2">{product.brand}</h2>
        <p className="text-xl text-gray-600 font-semibold">
          {product.name} <span className="text-pink-400">|</span>{" "}
          {product.category}
        </p>
        <p className="text-xl text-gray-600 font-semibold my-2">
          {product.description}
        </p>
        <p className="text-xl text-gray-600 font-semibold">
          عدد القطع المتاحه : {product.stock}
        </p>
        <div className="flex items-center justify-end text-pink-500 text-end">
          <IoIosStar /> {product.rating}
        </div>

        <p className="text-gray-500 mt-2 line-through">{product.price} جنيه</p>
        <p className="text-gray-600 text-lg font-semibold">
          {newPrice.toFixed(2)} جنيه
        </p>
        <p className="text-sm font-semibold text-green-600">
          وفر {discountAmount} جنيه - {product.discount}% خصم
        </p>

        <button
          onClick={() => handleAddToCart(product)}
          className="flex items-center justify-center mt-4 bg-pink-500 text-white py-2 px-4 rounded w-full"
        >
          <GiShoppingCart className="inline mr-2" />
          Add to cart
        </button>
        <button
          onClick={() => handleAddToWishlist(product)}
          className="flex items-center justify-center mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded w-full"
        >
          <FaRegHeart className="inline mr-2" /> Add to Wishlist
        </button>
      </div>

      {/* عرض الصور */}
      <div className="flex md:w-1/2 mt-3 md:mt-0">
        {/* الصورة الكبيرة على الشمال */}
        <div className="w-3/4">
          <img
            className="rounded-lg w-full object-cover"
            src={selectedImage}
            alt={product.name}
          />
        </div>

        {/* الصور الصغيرة على اليمين */}
        <div className="flex flex-col w-1/4 pl-4">
          {product.imageUrls?.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={product.name}
              width={80}
              height={80}
              className="border w-full h-auto mb-2 rounded-lg cursor-pointer"
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
