"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { BarLoader } from "react-spinners";

const page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BarLoader color={"#d60096"} loading={loading} size={350} />
      </div>
    );
  }

  if (!product) {
    return <p className="text-center text-gray-500">Product not found!</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <img className="w-full max-h-[500px] object-cover" src={product.imageUrl} alt={product.name} />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-lg mt-2 text-gray-700">{product.description}</p>
      <p className="text-xl mt-2 font-bold text-pink-500">Price: ${product.price}</p>
    </div>
  );
};

export default page;
