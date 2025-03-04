import React, { useEffect, useState } from "react";

const ProductDetails = () => {
  const [mainimage, setMainimage] = useState(0);
  const [selectedSize, setSelectedsize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  const SelectProduct = {
    name: "Stylish jacket",
    price: 1560,
    originalprice: 5200,
    description: "this in a stylish jacket perfect for any occesion",
    brand: "fashionBrand",
    material: "leather",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black", "Blue"],
    images: [
      {
        url: "https://img.freepik.com/free-photo/high-angle-boy-with-headphones_23-2148478673.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
        alTtext: "jacket 1",
      },
      {
        url: "https://img.freepik.com/free-photo/stylish-woman-red-denim-jacket-apparel-shoot-rear-view_53876-102122.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
        alTtext: "jacket 2",
      },
    ],
  };
  useEffect(() => {
    if (SelectProduct?.images?.length > 0) {
      setMainimage(SelectProduct.images[0].url);
    }
  }, [setMainimage]);

  const handlesetQuantity = (action) => {
    if (quantity > 1) {
      if (action === "minus") setQuantity((prev) => prev - 1);
    }
    if (action === "plus") setQuantity((prev) => prev + 1);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {SelectProduct.images.map((img, index) => (
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
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="md:hidden flex overscroll-x-auto space-x-4 mb-4">
            {SelectProduct.images.map((img, index) => (
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
              {SelectProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {SelectProduct.originalprice}
            </p>
            <p className="text-xl text-gray-500 mb-2">
              {SelectProduct.price} Taka
            </p>
            <p className="text-gray-600 mb-4">{SelectProduct.description}</p>
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {SelectProduct.colors.map((color) => (
                  <button
                    onClick={() => setSelectedColor(color)}
                    key={color}
                    className={`w-8 h-8 rounded-full border cursor-pointer ${
                      selectedColor === color
                        ? "border-4 border-black"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
                      filter: "brightness(2.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {SelectProduct.sizes.map((size) => (
                  <button
                    onClick={() => setSelectedsize(size)}
                    key={size}
                    className={`px-4 py-2 rounded border cursor-pointer ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "border-gray-300"
                    }`}
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
            <button className="bg-teal-600 text-white py-2 px-6 rounded w-full mb-4 cursor-pointer hover:bg-black duration-300 uppercase">
              Add to cart
            </button>
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{SelectProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{SelectProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
