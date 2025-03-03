import React from "react";
import Banner from "../Components/Banner";
import GenderCollectionSection from "../Components/Products/GenderCollectionSection";
import NewArrivals from "../Components/Products/NewArrivals";

const Home = () => {
 
  return (
    <>
      <div></div>
      <div className="container mx-auto px-4 lg:px-0">
        <Banner />
        <GenderCollectionSection />
        <NewArrivals />
      </div>
      ;
    </>
  );
};

export default Home;
