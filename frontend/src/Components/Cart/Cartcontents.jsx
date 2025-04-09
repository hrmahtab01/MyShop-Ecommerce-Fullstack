import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateCart } from "../../../Slices/cartSlice";

const Cartcontents = ({ cart, userId }) => {
  const dispatch = useDispatch();
 
  const handleAddToCart = (productId, delta, size, color, quantity) => {
    const newquantity = quantity + delta;

    if (newquantity >= 1) {
      dispatch(
        updateCart({ productId, quantity: newquantity, size, color, userId })
      );
    }
  };
  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(updateCart({ productId, size, color, userId }));
  };
  return (
    <div>
      {cart.products.map((item, index) => (
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
                <button  onClick={() =>
                    handleAddToCart(
                      item.productId,
                      -1,
                      item.size,
                      item.color,
                      item.quantity
                    )
                  } className="border rounded px-2 py-1 text-xl font-medium">
                  -
                </button>
                <span className="mx-4 ">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      item.productId,
                      1,
                      item.size,
                      item.color,
                      item.quantity
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>{item.price.toLocaleString()} Taka</p>
            <button onClick={() => handleRemoveFromCart(item.productId, item.size, item.color)}>
              <MdDelete className="text-2xl mt-2 text-PrimaryRed " />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cartcontents;
