import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../Components/Products/FilterSidebar";
import ShortOption from "../Components/Products/ShortOption";
import ProductGrid from "../Components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggolesidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleclcikOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleclcikOutside);
    document.removeEventListener("mousedown", handleclcikOutside);
  });

  useEffect(() => {
    setTimeout(() => {
      const fetchdata = [
        {
          _id: 1,
          name: "product 1 ",
          price: 125,
          images: [
            {
              url: "https://img.freepik.com/premium-photo/free-photo-fashion-portrait-young-beautiful-confident-lady-wearing-trendy-winter-outfits_1124573-77227.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
              alTtext: "product 1",
            },
          ],
        },
        {
          _id: 2,
          name: "product 2 ",
          price: 125,
          images: [
            {
              url: "https://img.freepik.com/premium-photo/free-photo-fashion-portrait-young-beautiful-confident-lady-wearing-trendy-winter-outfits_1124573-77227.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
              alTtext: "product 2",
            },
          ],
        },
        {
          _id: 3,
          name: "product 3 ",
          price: 125,
          images: [
            {
              url: "https://img.freepik.com/premium-photo/free-photo-fashion-portrait-young-beautiful-confident-lady-wearing-trendy-winter-outfits_1124573-77227.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
              alTtext: "product 3",
            },
          ],
        },
        {
          _id: 4,
          name: "product 4 ",
          price: 125,
          images: [
            {
              url: "https://img.freepik.com/premium-photo/free-photo-fashion-portrait-young-beautiful-confident-lady-wearing-trendy-winter-outfits_1124573-77227.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
              alTtext: "product 4",
            },
          ],
        },
        {
          _id: 5,
          name: "product 5 ",
          price: 125,
          images: [
            {
              url: "https://img.freepik.com/premium-photo/pretty-blonde-girl-with-freckles-yellow-outfit-straw-hat-yellow_165383-71.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
              alTtext: "product 5",
            },
          ],
        },
        {
          _id: 6,
          name: "product 7 ",
          price: 125,
          images: [
            {
              url: "https://img.freepik.com/premium-photo/pretty-blonde-girl-with-freckles-yellow-outfit-straw-hat-yellow_165383-71.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
              alTtext: "product 6",
            },
          ],
        },
        {
          _id: 7,
          name: "product 7 ",
          price: 125,
          images: [
            {
              url: "https://img.freepik.com/premium-photo/pretty-blonde-girl-with-freckles-yellow-outfit-straw-hat-yellow_165383-71.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
              alTtext: "product 7",
            },
          ],
        },
        {
          _id: 8,
          name: "product 8 ",
          price: 125,
          images: [
            {
              url: "https://img.freepik.com/premium-photo/pretty-blonde-girl-with-freckles-yellow-outfit-straw-hat-yellow_165383-71.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
              alTtext: "product 8",
            },
          ],
        },
      ];
      setProducts(fetchdata);
    }, 1000);
  }, []);

 

  return (
    <div className="flex flex-col lg:flex-row">
      {/* mobaile fiter button */}
      <button
        onClick={toggolesidebar}
        className="lg:hidden  border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>
      {/* filter sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0 " : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        {/* short options */}
        <ShortOption/>
        <ProductGrid products={products}/>
      </div>
    </div>
  );
};

export default CollectionPage;
