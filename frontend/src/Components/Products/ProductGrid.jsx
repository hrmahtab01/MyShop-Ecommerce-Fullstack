import React from "react";
import { Link } from "react-router";

const ProductGrid = ({ products  ,loading , error}) => {
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error:{error}</h1>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((item, index) => (
        <Link key={index} to={`/product/${item._id}`} className="block">
          <div className="bg-white p-4 rounded-lg">
            <div className="w-full h-96 mb-4">
              <img
                src={item.images[0]?.url}
                alt={item.images[0]?.alTtext}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-sm mb-2">{item.name}</h3>
            <p className="text-gray-500 font-medium text-sm tracking-tighter">
              {item.price} Taka
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
