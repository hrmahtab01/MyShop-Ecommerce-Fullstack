import React from "react";
import Banner from "../Components/Banner";
import GenderCollectionSection from "../Components/Products/GenderCollectionSection";
import NewArrivals from "../Components/Products/NewArrivals";
import ProductDetails from "../Components/Products/ProductDetails";
import ProductGrid from "../Components/Products/ProductGrid";
import FeatureCollection from "../Components/Products/FeatureCollection";
import FeatureSection from "../Components/Products/FeatureSection";

const placeholderproducts = [
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

const Home = () => {
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
          <ProductGrid products={placeholderproducts} />
        </div>
        <FeatureCollection />
        <FeatureSection />
      </div>
      ;
    </>
  );
};

export default Home;
