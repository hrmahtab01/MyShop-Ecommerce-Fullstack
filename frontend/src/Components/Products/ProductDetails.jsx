import React, { use, useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import axios from "axios";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { addtoCart } from "../../../Slices/cartSlice";

const ProductDetails = () => {
  const [mainimage, setMainimage] = useState(0);
  const [selectedSize, setSelectedsize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [bestseller, setBestseller] = useState({});
  const [allImages, setAllImages] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userData?.value?.user?.id);
  console.log(userId);

  useEffect(() => {
    const fetchBestsellers = () => {
      axios
        .get("http://localhost:4400/api/v1/product/best-seller")
        .then((result) => {
          setBestseller(result.data.data);
          setAllImages(result.data.data.images);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchBestsellers();
  }, []);
  console.log(similarProducts);
  useEffect(() => {
    setMainimage(allImages[0]?.url);
  }, [allImages]);

  const handlesetQuantity = (action) => {
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);

    if (action === "plus") setQuantity((prev) => prev + 1);
  };
  const HandleAddtoCart = () => {
    setIsButtonDisable(true);
    if (!selectedColor || !selectedSize) {
      toast.error("please select a size and color before adding to cart", {
        duration: 1000,
      });
      setTimeout(() => {
        setIsButtonDisable(false);
      }, 500);
    }

    if (selectedColor && selectedSize) {
      dispatch(
        addtoCart({
          productId: bestseller._id,
          color: selectedColor,
          size: selectedSize,
          quantity,
          userId: userId,
        })
      )
        .then(() => {
          toast.success("Product added to cart", {
            duration: 1000,
          });
        })
        .finally(() => {
          setIsButtonDisable(false);
        });
    }
  };

  useEffect(() => {
    const fetchsimilarProducts = () => {
      axios
        .get(`http://localhost:4400/api/v1/product/similar/${bestseller._id}`)
        .then((result) => {
          setSimilarProducts(result.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchsimilarProducts();
  }, [bestseller._id]);

  useEffect(() => {
    const fetchsingleProduct = () => {
      axios
        .get(`http://localhost:4400/api/v1/product/singleproduct/${id}`)
        .then((result) => {
          setBestseller(result.data.data);
          setAllImages(result.data.data.images);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchsingleProduct();
  }, [id]);

  return (
    <>
      {location.pathname === "/" ? (
        <div className="p-6">
          <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
            <div className="flex flex-col md:flex-row">
              <div className="hidden md:flex flex-col space-y-4 mr-6">
                {allImages.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={img.alTtext || `thumnail${index}`}
                    className={`w-20 h-20 object-cover rounded-b-lg cursor-pointer border ${
                      mainimage === img.url ? "border-black" : "border-gray-400"
                    }`}
                    onClick={() => setMainimage(img.url)}
                  />
                ))}
              </div>
              <div className="md:w-1/2">
                <div className="mb-4">
                  <img
                    src={mainimage}
                    alt="main product"
                    className="w-full h-auto md:h-[500px] object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="md:hidden flex overscroll-x-auto space-x-4 mb-4">
                {allImages.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={img.alTtext || `thumnail${index}`}
                    className={`w-20 h-20 object-cover rounded-b-lg cursor-pointer border ${
                      mainimage === img.url ? "border-black" : "border-gray-400"
                    }`}
                    onClick={() => setMainimage(img.url)}
                  />
                ))}
              </div>
              <div className="md:1/2 md:ml-10">
                <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                  {bestseller.name}
                </h1>
                <p className="text-lg text-gray-600 mb-1 line-through">
                  {bestseller.originalprice}
                </p>
                <p className="text-xl text-gray-500 mb-2">
                  {bestseller.price} Taka
                </p>
                <p className="text-gray-600 mb-4">{bestseller.description}</p>
                <div className="mb-4">
                  <p className="text-gray-700">Color:</p>
                  <div className="flex gap-2 mt-2">
                    {bestseller.colors?.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`${
                          selectedColor === color
                            ? "bg-black text-white"
                            : "bg-gray-200 text-gray-700"
                        } px-4 py-2 rounded`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700">Size:</p>
                  <div className="flex gap-2 mt-2">
                    {bestseller.sizes?.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedsize(size)}
                        className={`${
                          selectedSize === size
                            ? "bg-black text-white"
                            : "bg-gray-200 text-gray-700"
                        } px-4 py-2 rounded`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-gray-700">Quantity</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => handlesetQuantity("minus")}
                      className="px-2 py-1 bg-gray-200 rounded text-lg"
                    >
                      -
                    </button>
                    <span className="text-lg">{quantity}</span>
                    <button
                      onClick={() => handlesetQuantity("plus")}
                      className="px-2 py-1 bg-gray-200 rounded text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={HandleAddtoCart}
                  disabled={isButtonDisable}
                  className={`bg-black text-white py-2 px-6 rounded w-full mb-4 cursor-pointer  duration-300 uppercase ${
                    isButtonDisable
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-teal-600"
                  }`}
                >
                  {isButtonDisable ? "adding..." : "Add to cart"}
                </button>
                <div className="mt-10 text-gray-700">
                  <h3 className="text-xl font-bold mb-4">Characteristics</h3>
                  <table className="w-full text-left text-sm text-gray-600">
                    <tbody>
                      <tr>
                        <td className="py-1">Brand</td>
                        <td className="py-1">{bestseller.brand}</td>
                      </tr>
                      <tr>
                        <td className="py-1">Material</td>
                        <td className="py-1">{bestseller.material}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mt-20">
              <h2 className="text-2xl text-center font-medium mb-4">
                You May Also Like
              </h2>
              <ProductGrid
                products={similarProducts}
                productid={bestseller._id}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
            <div className="flex flex-col md:flex-row">
              <div className="hidden md:flex flex-col space-y-4 mr-6">
                {allImages.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={img.alTtext || `thumnail${index}`}
                    className={`w-20 h-20 object-cover rounded-b-lg cursor-pointer border ${
                      mainimage === img.url ? "border-black" : "border-gray-400"
                    }`}
                    onClick={() => setMainimage(img.url)}
                  />
                ))}
              </div>
              <div className="md:w-1/2">
                <div className="mb-4">
                  <img
                    src={mainimage}
                    alt="main product"
                    className="w-full h-auto md:h-[500px] object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="md:hidden flex overscroll-x-auto space-x-4 mb-4">
                {allImages.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={img.alTtext || `thumnail${index}`}
                    className={`w-20 h-20 object-cover rounded-b-lg cursor-pointer border ${
                      mainimage === img.url ? "border-black" : "border-gray-400"
                    }`}
                    onClick={() => setMainimage(img.url)}
                  />
                ))}
              </div>
              <div className="md:1/2 md:ml-10">
                <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                  {bestseller.name}
                </h1>
                <p className="text-lg text-gray-600 mb-1 line-through">
                  {bestseller.originalprice}
                </p>
                <p className="text-xl text-gray-500 mb-2">
                  {bestseller.price} Taka
                </p>
                <p className="text-gray-600 mb-4">{bestseller.description}</p>
                <div className="mb-4">
                  <p className="text-gray-700">Color:</p>
                  <div className="flex gap-2 mt-2">
                    {bestseller.colors?.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`${
                          selectedColor === color
                            ? "bg-black text-white"
                            : "bg-gray-200 text-gray-700"
                        } px-4 py-2 rounded`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700">Size:</p>
                  <div className="flex gap-2 mt-2">
                    {bestseller.sizes?.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedsize(size)}
                        className={`${
                          selectedSize === size
                            ? "bg-black text-white"
                            : "bg-gray-200 text-gray-700"
                        } px-4 py-2 rounded`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-gray-700">Quantity</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => handlesetQuantity("minus")}
                      className="px-2 py-1 bg-gray-200 rounded text-lg"
                    >
                      -
                    </button>
                    <span className="text-lg">{quantity}</span>
                    <button
                      onClick={() => handlesetQuantity("plus")}
                      className="px-2 py-1 bg-gray-200 rounded text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={HandleAddtoCart}
                  disabled={isButtonDisable}
                  className={`bg-black text-white py-2 px-6 rounded w-full mb-4 cursor-pointer  duration-300 uppercase ${
                    isButtonDisable
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-teal-600"
                  }`}
                >
                  {isButtonDisable ? "adding..." : "Add to cart"}
                </button>
                <div className="mt-10 text-gray-700">
                  <h3 className="text-xl font-bold mb-4">Characteristics</h3>
                  <table className="w-full text-left text-sm text-gray-600">
                    <tbody>
                      <tr>
                        <td className="py-1">Brand</td>
                        <td className="py-1">{bestseller.brand}</td>
                      </tr>
                      <tr>
                        <td className="py-1">Material</td>
                        <td className="py-1">{bestseller.material}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mt-20">
              <h2 className="text-2xl text-center font-medium mb-4">
                You May Also Like
              </h2>
              <ProductGrid
                products={similarProducts}
                productid={bestseller._id}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
