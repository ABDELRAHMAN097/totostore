// components/ProductList.js
"use client"
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { BarLoader } from "react-spinners";

const page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLoading(false);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
       {loading && ( 
      <div className="loading-overlay">
        <BarLoader  color={"#d60096"} loading={loading} size={350} className="loading-spinner" />
      </div>
        )}
      <h1 className="ml-5 my-5">Product List</h1>
      {products.length === 0 ? (
        <p className="ml-5">No products found</p>
      ) : (
        <div className="products px-2 md:p-0">
        {products.map(product => (
          <div className="border my-2 mx-1 w-48 block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark" key={product.id}>
            <img className="rounded-t-lg" src={product.imageUrl} alt={product.name} width="200" />
            <div className="text-surface dark:text-black p-2">
            <h2 className="text-surface dark:text-black">{product.name}</h2>
            <p className="text-surface dark:text-black">Price: ${product.price}</p>
          
            <p className="text-surface dark:text-black">Category: {product.category}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default page;