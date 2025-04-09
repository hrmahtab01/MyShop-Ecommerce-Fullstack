import { useEffect, useLayoutEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router"; // Correct import
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

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



const NewArrivals = () => {
const [newArrivals , setNewArrivals] = useState([]);

  const fetchNewArrivals = async () => {
    try {
      const response = await axios.get(
        "https://myshop-ecommerce-fullstack.onrender.com/api/v1/product/new-arrivals"
      );
      setNewArrivals(response.data.data); // Log data instead of full response
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
    }
  };

  useLayoutEffect(() => {
    fetchNewArrivals();
  }, []);


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
              <div  key={item._id} className="relative p-1.5">
                {/* Added spacing using p-2 */ }
                <img
                  src={item.images[0]?.url}
                  alt={item.images[0]?.alTtext || item.name}
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
