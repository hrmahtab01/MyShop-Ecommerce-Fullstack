import React from "react";
import { Link } from "react-router";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <div className="flex-1 relative">
          <img
            src="https://i.pinimg.com/736x/14/ea/f7/14eaf7e4e0dea79470f5058852993dea.jpg"
            alt="women's collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Women's Collections
            </h2>
            <Link
              to={"collections/all?gender=Women"}
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="flex-1 relative">
          <img
            src="https://www.apetogentleman.com/wp-content/uploads/2021/08/best-all-white-outfits-men-1.jpg"
            alt="Men's collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Men's Collections
            </h2>
            <Link
              to={"collections/all?gender=Men"}
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
