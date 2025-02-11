"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { IoIosStar } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import Image from "next/image";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
          setSelectedImage(docSnap.data().images?.[0] || "/placeholder.png");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!product) return <p className="text-center">Product not found!</p>;

  const discountAmount = (product.price * product.discount) / 100;
  const newPrice = product.price - discountAmount;

  return (
    <div className="container mx-auto p-4 md:flex md:gap-8">
      {/* تفاصيل المنتج */}
      <div className="md:w-1/2 text-end">
        <h2 className="text-pink-500 font-semibold mb-2">{product.brand}</h2>
        <p className="text-xl text-gray-600 font-semibold">{product.name} <span className="text-pink-400">|</span> {product.category}</p>
        <p className="text-xl text-gray-600 font-semibold my-2">{product.description}</p>
        <p className="text-xl text-gray-600 font-semibold">عدد القطع المتاحه : {product.stock}</p>
        <div className="flex items-center justify-end text-pink-500 text-end">
          <IoIosStar /> {product.rating}
        </div>

        <p className="text-gray-500 mt-2 line-through">{product.price} جنيه</p>
        <p className="text-gray-600 text-lg font-semibold">{newPrice.toFixed(2)} جنيه</p>
        <p className="text-sm font-semibold text-green-600">وفر {discountAmount} جنيه - {product.discount}% خصم</p>

        <button className="flex items-center justify-center mt-4 bg-pink-500 text-white py-2 px-4 rounded w-full">
          <GiShoppingCart className="inline mr-2" /> Add to cart
        </button>
        <button className="flex items-center justify-center mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded w-full">
          <FaRegHeart className="inline mr-2" /> Add to Wishlist
        </button>
      </div>

       {/* عرض الصور */}
       <div className="md:w-1/2 flex flex-col items-center">
        <Image
          src="/image/MastarCard.png"
          alt={product.name}
          width={400}
          height={400}
          className="rounded shadow-md w-full max-w-md"
        />
        <div className="flex mt-4 space-x-2">
          {product.images?.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={product.name}
              width={80}
              height={80}
              className="border border-blue-500"
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
