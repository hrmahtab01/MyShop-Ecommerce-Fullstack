import React from "react";
import { MdDelete } from "react-icons/md";

const Cartcontents = () => {
  const Cartitem = [
    {
      productId: "1",
      name: "t-shirt",
      size: "M",
      color: "red",
      quantity: "1",
      price: 500,
      image: "https://picsum.photos/200?ramdom=1",
    },
    {
      productId: "2",
      name: "Jeans",
      size: "Lg",
      color: "black",
      quantity: "2",
      price: 1500,
      image: "https://picsum.photos/200?ramdom=2",
    },
  ];
  return (
    <div>
      {Cartitem.map((item, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{item.name}</h3>
              <p className="text-sm text-gray-500">
                size:{item.size} | color:{item.color}
              </p>
              <div className="flex items-center mt-2">
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  -
                </button>
                <span className="mx-4 ">{item.quantity}</span>
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>{item.price.toLocaleString()} Taka</p>
            <button>
              <MdDelete className="text-2xl mt-2 text-PrimaryRed " />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cartcontents;
