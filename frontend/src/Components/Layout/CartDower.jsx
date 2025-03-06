import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Cartcontents from "../Cart/Cartcontents";
import { useNavigate } from "react-router";
const CartDower = ({ cartdoweropen, Handlecartdowertoggole }) => {
  const navigate = useNavigate()
  const HandleCheckout = () => {
    navigate("/checkout")
  };
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2  md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        cartdoweropen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* close button */}
      <div className="flex justify-end p-4 ">
        <button onClick={Handlecartdowertoggole}>
          <IoMdClose className="text-2xl text-gray-500 cursor-pointer" />
        </button>
      </div>
      {/* cart content with scroll able area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

        {/* component for cart content */}
        <Cartcontents />
      </div>
      <div className="p-4 bg-white sticky bottom-0">
        <button
          onClick={HandleCheckout}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-black transition duration-300 "
        >
          CheckOut
        </button>
        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
          Sipping ,taxes , and discount codes calculet at checkout.
        </p>
      </div>
    </div>
  );
};

export default CartDower;
