import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router"; // Correct import
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} hidden md:block`} // Tailwind applied correctly
      style={{
        ...style,
        background: "red",
        position: "absolute",
        top: "-20px",
        right: "70px",
      }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} hidden lg:block`} 
      style={{
        ...style,
        background: "green",
        position: "absolute",
        top: "-20px",
        
        left: "lg:50px", 
      }}
      onClick={onClick}
    />
  );
};

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
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
    Images: [{ url: "https://picsum.photos/200?random=1", alTtext: "jacket" }], // Fixed URL
  },
  {
    _id: 2,
    name: "Jacket",
    price: 1500,
    Images: [{ url: "https://picsum.photos/200?random=2", alTtext: "jacket" }], // Fixed URL
  },
  {
    _id: 3,
    name: "Jacket",
    price: 1500,
    Images: [{ url: "https://picsum.photos/200?random=3", alTtext: "jacket" }],
  },
  {
    _id: 4,
    name: "Jacket",
    price: 1500,
    Images: [{ url: "https://picsum.photos/200?random=4", alTtext: "jacket" }],
  },
  {
    _id: 5,
    name: "Jacket",
    price: 1500,
    Images: [{ url: "https://picsum.photos/200?random=5", alTtext: "jacket" }],
  },
  {
    _id: 6,
    name: "Jacket",
    price: 1500,
    Images: [{ url: "https://picsum.photos/200?random=6", alTtext: "jacket" }],
  },
  {
    _id: 7,
    name: "Jacket",
    price: 1500,
    Images: [{ url: "https://picsum.photos/200?random=7", alTtext: "jacket" }],
  },
  {
    _id: 8,
    name: "Jacket",
    price: 1500,
    Images: [{ url: "https://picsum.photos/200?random=8", alTtext: "jacket" }],
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
              <div key={item._id} className="relative p-1">
                {/* Added spacing using p-2 */}
                <img
                  src={item.Images[0]?.url}
                  alt={item.Images[0]?.alTtext || item.name}
                  className="w-full h-[500px] object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 ml-1 backdrop-blur-md p-4 text-white  py-2 rounded-b-lg">
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
