"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { BarLoader } from "react-spinners";
import { IoMdCloseCircle } from "react-icons/io";

export default function AccessoriesPage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");
  const [CurrentImage, setCurrentImage] = useState("");
  const [currentName, setcurrentName] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchAccessories = async () => {
      try {
        const q = query(collection(db, "products"), where("category", "==", "Accessories"));
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching men's products:", error);
        setLoading(false);
      }
    };
    fetchAccessories();
  }, []);

  const openModal = (description, imageUrl, Name) => {
    setCurrentDescription(description);
    setCurrentImage(imageUrl);
    setcurrentName(Name);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const scrollToProducts = () => {
    const section = document.getElementById("products-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-[44.5vh]">
      {loading && (
        <div className="loading-overlay">
          <BarLoader color={"#d60096"} loading={loading} size={350} />
        </div>
      )}

      <div
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/image/Accessories cover.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Toto Store</h1>
          <h2 className="text-2xl mb-6">Accessories collection</h2>
          <button
            onClick={scrollToProducts}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          >
            Shop now
          </button>
        </div>
      </div>

      <h3 id="products-section" className="ml-5 my-5 text-gray-500">Accessories</h3>
      
      <div>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No men's products found ... !</p>
        ) : (
          <div className="products px-2 md:p-0">
            {products.map((product) => (
              <div
                className="border my-2 mx-1 w-48 block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark min-h-[280px]"
                key={product.id}
              >
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <div className="text-center p-2">
                  <h2 className="text-surface dark:text-black">{product.name}</h2>
                  <p className="text-surface dark:text-black">Price: ${product.price}</p>
                  <div className="flex justify-center gap-1 mt-2">
                  <button
                    className="bg-pink-500 hover:bg-pink-700 text-white rounded p-1"
                    onClick={() =>
                      openModal(
                        product.description,
                        product.imageUrl,
                        product.name
                      )
                    }
                  >
                    Details
                  </button>
                  <button className="bg-pink-500 hover:bg-pink-700 text-white rounded p-1">Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
    </div>
  );
}
