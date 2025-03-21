import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../Components/Products/FilterSidebar";
import ShortOption from "../Components/Products/ShortOption";
import ProductGrid from "../Components/Products/ProductGrid";
import axios from "axios";
import { useParams, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllproducts } from "../../Slices/productSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productData);
  const sidebarRef = useRef();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const queryParams = Object.fromEntries([...searchParams]);

  useEffect(() => {
    dispatch(fetchAllproducts({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

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
        <ProductGrid products={product} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
