import React from "react";
import { Link } from "react-router";

const FeatureCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="flex  flex-col-reverse lg:flex-row items-center bg-green-50  rounded-3xl">
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="font-lg font-semibold text-gray-700 mb-2">
            Comfort And Style
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Apperel mode for your everyday life
          </h2>
          <p className="text-lg text-green-600 mb-6">
            Discover high quality ,comfortable clothing that efforlessly blends
            fashion and function. Designed to make you look and feel great
            everyday
          </p>
          <Link
            to={"/collections/all"}
            className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>
        <div className="lg:w-1/2 ">
          <img
            src="https://www.shutterstock.com/image-photo/mystery-arabic-woman-black-long-600nw-2124196751.jpg"
            alt="featured product"
            className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureCollection;
