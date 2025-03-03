import React, { useState } from "react";
import { Link } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { HiBars3 } from "react-icons/hi2";
import Searchbar from "../Common/Searchbar";
import CartDower from "./CartDower";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [cartdoweropen, setCartdoweropen] = useState(false);
  const [navdroweropen, setNavdroweropen] = useState(false);

  const Handlecartdowertoggole = () => {
    setCartdoweropen(!cartdoweropen);
  };
  const Toggolenavdrower = () => {
    setNavdroweropen(!navdroweropen);
  };
  return (
    <>
      <nav>
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div>
            <Link className="text-2xl font-bold" to={"/"}>
              MyShop
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link className="text-gray-700 hover:text-teal-500 duration-300 text-sm font-medium uppercase">
              Men
            </Link>
            <Link className="text-gray-700 hover:text-teal-500 duration-300 text-sm font-medium uppercase">
              women
            </Link>
            <Link className="text-gray-700 hover:text-teal-500 duration-300 text-sm font-medium uppercase">
              Top wear
            </Link>
            <Link className="text-gray-700 hover:text-teal-500 duration-300 text-sm font-medium uppercase">
              bottom wear
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to={"/profile"} className="">
              <FaUserCircle className="text-2xl text-gray-700 hover:text-teal-800 duration-300" />
            </Link>
            <button onClick={Handlecartdowertoggole} className="relative  ">
              <FaShoppingBag className="text-2xl text-gray-700 hover:text-teal-800 duration-300 cursor-pointer" />
              <span className="absolute -top-1 text-xs text-white bg-PrimaryRed rounded-full px-2 py-0.5 ">
                4
              </span>
            </button>
            <div className="overflow-hidden">
              <Searchbar />
            </div>
            <button onClick={Toggolenavdrower} className="md:hidden ">
              <HiBars3 className="text-2xl text-gray-700 hover:text-teal-800 duration-300 cursor-pointer" />
            </button>
          </div>
        </div>
      </nav>
      <CartDower
        cartdoweropen={cartdoweropen}
        Handlecartdowertoggole={Handlecartdowertoggole}
      />
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navdroweropen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={Toggolenavdrower}>
            <IoMdClose className="text-2xl text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4"> Menu</h2>
          <nav className="space-y-4">
            <Link
              to={"#"}
              onClick={Toggolenavdrower}
              className="block text-gray-600 hover:text-teal-500 duration-300"
            >
              Men
            </Link>
            <Link
              to={"#"}
              onClick={Toggolenavdrower}
              className="block text-gray-600 hover:text-teal-500 duration-300"
            >
              Women
            </Link>
            <Link
              to={"#"}
              onClick={Toggolenavdrower}
              className="block text-gray-600 hover:text-teal-500 duration-300"
            >
              Top wear
            </Link>
            <Link
              to={"#"}
              onClick={Toggolenavdrower}
              className="block text-gray-600 hover:text-teal-500 duration-300"
            >
              Bottom wear
            </Link>
            
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
