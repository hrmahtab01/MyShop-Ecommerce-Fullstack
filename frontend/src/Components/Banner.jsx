import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router";

const Banner = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="mt-[50px] mb-[50px]">
      <Slider {...settings}>
        <div className="relative">
          <img
            className="w-full h-[400px] md:h-[550px] lg:h-[650px] object-cover "
            src="https://t3.ftcdn.net/jpg/06/08/19/10/360_F_608191088_ATXwUHQnOIe67Dnt7JDkzKWHDpgCfuCA.jpg"
            alt="banner image"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
                Vacation <br /> ready
              </h1>
              <p className="text-sm tracking-tighter md:text-lg mb-6">
                Explore our vacation-ready with fast worldwide shipping.
              </p>
              <Link
                to={"#"}
                className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg hover:text-teal-500 hover:bg-black duration-300 transition-all "
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            className="w-full h-[400px] md:h-[550px] lg:h-[650px] object-cover"
            src="https://t4.ftcdn.net/jpg/04/15/97/33/360_F_415973312_5yg3MrkRdi2SMHyVKbB4h7GgE5HrgUlb.jpg"
            alt="banner image"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
                Vacation <br /> ready
              </h1>
              <p className="text-sm tracking-tighter md:text-lg mb-6">
                Explore our vacation-ready with fast worldwide shipping.
              </p>
              <Link
                to={"#"}
                className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg hover:text-teal-500 hover:bg-black duration-300 transition-all "
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            className="w-full h-[400px] md:h-[550px] lg:h-[650px] object-cover"
            src="https://img.freepik.com/free-photo/portrait-excited-girl-shopper-holding-shopping-bags-buying-stores-smiling-amazed-enjoy-dis_1258-118364.jpg"
            alt="banner image"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
                Vacation <br /> ready
              </h1>
              <p className="text-sm tracking-tighter md:text-lg mb-6">
                Explore our vacation-ready with fast worldwide shipping.
              </p>
              <Link
                to={"#"}
                className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg  hover:bg-black hover:text-teal-500 duration-300 transition-all "
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
