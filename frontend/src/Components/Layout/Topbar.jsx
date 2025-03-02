import React from "react";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";

const Topbar = () => {
  return (
    <div className="py-2  bg-PrimaryRed">
      <div className="flex justify-around gap-2 items-center">
        <div className="hidden md:flex gap-2 items-center">
          <a href="#">
            <FaFacebook className="text-lg font-semibold font-Inter text-white" />
          </a>
          <a href="#">
            <IoLogoInstagram className="text-lg font-semibold font-Inter text-white" />
          </a>
          <a href="#">
            <FaXTwitter className="text-lg font-semibold font-Inter text-white" />
          </a>
        </div>
        <div>
          <p className="px-2 lg:px-0 text-sm font-Inter font-semibold text-white">
            We ship worldwide -- fast and reliable shipping
          </p>
        </div>
        <div>
          <a
            href="tel:01723473565"
            className="text-base font-Inter hidden md:block font-semibold text-white hover:text-teal-500 duration-300"
          >
            01723473565
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
