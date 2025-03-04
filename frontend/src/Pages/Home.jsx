import React from "react";
import Banner from "../Components/Banner";
import GenderCollectionSection from "../Components/Products/GenderCollectionSection";
import NewArrivals from "../Components/Products/NewArrivals";
import ProductDetails from "../Components/Products/ProductDetails";

const Home = () => {
  return (
    <>
      <div className="container mx-auto px-4 lg:px-0">
        <Banner />
        <GenderCollectionSection />
        <NewArrivals />
        <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
        <ProductDetails />
      </div>
      ;
    </>
  );
};

export default Home;
