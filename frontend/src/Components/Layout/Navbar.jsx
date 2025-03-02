import React from "react";
import { Link } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { HiBars3 } from "react-icons/hi2";
import Searchbar from "../Common/Searchbar";

const Navbar = () => {
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
            <button className="relative  ">
              <FaShoppingBag className="text-2xl text-gray-700 hover:text-teal-800 duration-300 cursor-pointer" />
              <span className="absolute -top-1 text-xs text-white bg-PrimaryRed rounded-full px-2 py-0.5 ">
                4
              </span>
            </button>
            <div className="overflow-hidden">
              <Searchbar />
            </div>
            <button className="md:hidden ">
              <HiBars3 className="text-2xl text-gray-700 hover:text-teal-800 duration-300 cursor-pointer" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
