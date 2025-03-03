import React from "react";
import { Link } from "react-router";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCopyright } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8  px-4 lg:px-0">
        <div>
          <h3 className="text-lg text-gray-500 mb-4">Newsletter</h3>
          <p className="text-gray-500 mb-4 ">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            Sign up and get 10% off your frist order.
          </p>
          {/* news latter form */}
          <form className="flex">
            <input
              className="w-full p-4 text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all "
              type="email"
              placeholder="Enter you email"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 text-sm rounded-r-md hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* shop links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to={"#"} className="hover:text-gray-600 transition-colors">
                Men's top wear
              </Link>
            </li>
            <li>
              <Link to={"#"} className="hover:text-gray-600 transition-colors">
                Women's top wear
              </Link>
            </li>
            <li>
              <Link to={"#"} className="hover:text-gray-600 transition-colors">
                Men's bottom wear
              </Link>
            </li>
            <li>
              <Link to={"#"} className="hover:text-gray-600 transition-colors">
                Women's bottom wear
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to={"#"} className="hover:text-gray-600 transition-colors">
                Contact US
              </Link>
            </li>
            <li>
              <Link to={"#"} className="hover:text-gray-600 transition-colors">
                About US
              </Link>
            </li>
            <li>
              <Link to={"#"} className="hover:text-gray-600 transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to={"#"} className="hover:text-gray-600 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow US</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="hover:text-gray-500"
            >
              <FaFacebookSquare className="text-2xl" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              className="hover:text-gray-500"
            >
              <FaXTwitter className="text-2xl" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              className="hover:text-gray-500"
            >
              <FaInstagram className="text-2xl" />
            </a>
          </div>
          <p className="text-gray-500">Call US</p>
          <p>
            <FaPhoneFlip className="inline-block mr-2 text-lg" />
            01723473565
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-PrimaryRed pt-6">
        <p className="text-center text-teal-900 text-lg tracking-tighter">
          <MdCopyright className="inline-block mr-2 text-lg " />
          2025 ,Mahtab ,All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
