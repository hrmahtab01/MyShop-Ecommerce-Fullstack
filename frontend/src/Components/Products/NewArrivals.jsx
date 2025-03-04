import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router"; // Correct import
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const newArrivals = [
  {
    _id: 1,
    name: "Jacket",
    price: 1500,
    Images: [
      {
        url: "https://img.freepik.com/free-photo/teenage-girl-lifestyle-concept_23-2148093965.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
        alTtext: "jacket",
      },
    ], // Fixed URL
  },
  {
    _id: 2,
    name: "Jacket",
    price: 1500,
    Images: [
      {
        url: "https://img.freepik.com/premium-photo/beautiful-young-blonde-model-is-posing-straw-hat-green-transparent-blouse_165383-32.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
        alTtext: "jacket",
      },
    ], // Fixed URL
  },
  {
    _id: 3,
    name: "Jacket",
    price: 1500,
    Images: [
      {
        url: "https://img.freepik.com/free-photo/portrait-young-beautiful-hipster-bad-girl-trendy-red-summer-hoodie-earring-her-nose-sexy-carefree-smiling-blond-woman-posing-studio-wig-positive-model-licking-round-sugar-candy_158538-15573.jpg",
        alTtext: "jacket",
      },
    ],
  },
  {
    _id: 4,
    name: "Jacket",
    price: 1500,
    Images: [
      {
        url: "https://img.freepik.com/premium-photo/free-photo-fashion-portrait-young-beautiful-confident-lady-wearing-trendy-winter-outfits_1124573-77227.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
        alTtext: "jacket",
      },
    ],
  },
  {
    _id: 5,
    name: "Jacket",
    price: 1500,
    Images: [
      {
        url: "https://img.freepik.com/premium-photo/pretty-blonde-girl-with-freckles-yellow-outfit-straw-hat-yellow_165383-71.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
        alTtext: "jacket",
      },
    ],
  },
  {
    _id: 6,
    name: "Jacket",
    price: 1500,
    Images: [
      {
        url: "https://img.freepik.com/premium-photo/portrait-fashionable-young-blonde-woman-dressed-yellow-pants-sneakers-straw-hat_102037-334.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
        alTtext: "jacket",
      },
    ],
  },
  {
    _id: 7,
    name: "Jacket",
    price: 1500,
    Images: [
      {
        url: "https://img.freepik.com/premium-photo/young-woman-elegant-black-dress-summer-hat_178605-146.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
        alTtext: "jacket",
      },
    ],
  },
  {
    _id: 8,
    name: "Jacket",
    price: 1500,
    Images: [
      {
        url: "https://img.freepik.com/free-photo/portrait-young-elegant-blonde-woman-hat-stylish-winter-white-sweater_273443-2248.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
        alTtext: "jacket",
      },
    ],
  },
];

const NewArrivals = () => {
  return (
    <section>
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>
        <div className="slider-container">
          <Slider {...settings}>
            {newArrivals.map((item) => (
              <div key={item._id} className="relative p-1.5">
                {/* Added spacing using p-2 */}
                <img
                  src={item.Images[0]?.url}
                  alt={item.Images[0]?.alTtext || item.name}
                  className="w-full h-[500px] object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 ml-1 backdrop-blur-md  text-white  py-2 rounded-b-lg">
                  <Link to={`/product/${item._id}`} className="block">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="mt-1">{item.price} Taka</p>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
