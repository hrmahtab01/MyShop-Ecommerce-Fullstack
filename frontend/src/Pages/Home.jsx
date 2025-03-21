import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import GenderCollectionSection from "../Components/Products/GenderCollectionSection";
import NewArrivals from "../Components/Products/NewArrivals";
import ProductDetails from "../Components/Products/ProductDetails";
import ProductGrid from "../Components/Products/ProductGrid";
import FeatureCollection from "../Components/Products/FeatureCollection";
import FeatureSection from "../Components/Products/FeatureSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllproducts } from "../../Slices/productSlice";

const Home = () => {
  const { product, loading, error } = useSelector((state) => state.productData);
  const dispatch = useDispatch();
  console.log(product);

  useEffect(() => {
    dispatch(
      fetchAllproducts({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );
  }, [dispatch]);
  return (
    <>
      <div className="container mx-auto px-4 lg:px-0">
        <Banner />
        <GenderCollectionSection />
        <NewArrivals />
        <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>

        <ProductDetails />

        <div>
          <h2 className="text-3xl text-center font-bold mb-4">
            Top Wear's For Women
          </h2>

          <ProductGrid products={product} loading={loading} error={error} />
        </div>
        <FeatureCollection />
        <FeatureSection />
      </div>
      ;
    </>
  );
};

export default Home;
