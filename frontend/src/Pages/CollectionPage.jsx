import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../Components/Products/FilterSidebar";
import ShortOption from "../Components/Products/ShortOption";
import ProductGrid from "../Components/Products/ProductGrid";
import axios from "axios";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [params, setParams] = useState({
    collection: "",
    size: "",
    color: "",
    gender: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    search: "",
    category: "",
    brand: "",
    limit: "",
    material: "",
  });

  const quary = new URLSearchParams();
  if (params.collection) quary.append("collection", params.collection);
  if (params.size) quary.append("size", params.size);
  if (params.color) quary.append("color", params.color);
  if (params.gender) quary.append("gender", params.gender);
  if (params.minPrice) quary.append("minPrice", params.minPrice);
  if (params.maxPrice) quary.append("maxPrice", params.maxPrice);
  if (params.sortBy) quary.append("sortBy", params.sortBy);
  if (params.search) quary.append("search", params.search);
  if (params.category) quary.append("category", params.category);
  if (params.brand) quary.append("brand", params.brand);
  if (params.limit) quary.append("limit", params.limit);
  if (params.material) quary.append("material", params.material);
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
    return () => {
      document.removeEventListener("mousedown", handleclcikOutside);
    };
  }, []);

  useEffect(() => {
    const fetchdatAllProduct = () => {
      axios
        .get(
          `http://localhost:4400/api/v1/product/allproduct?${quary.toString()}`
        )
        .then((result) => {
          setProducts(result.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchdatAllProduct();
  }, [quary]);

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
        <ShortOption />
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
