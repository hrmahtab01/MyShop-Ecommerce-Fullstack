import React from "react";
import { FaBagShopping } from "react-icons/fa6";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { MdOutlineCreditCard } from "react-icons/md";

const FeatureSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <FaBagShopping className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2">FREE INTARNATION SHIPPING</h4>
          <p className="text-green-600 text-sm tracking-tighter">
            On world orders over 100000 Taka
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiArrowPathRoundedSquare className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2">7 DAYS RETURN </h4>
          <p className="text-green-600 text-sm tracking-tighter">
            Money back guarantee
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <MdOutlineCreditCard className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2">SECURE CHECKOUT</h4>
          <p className="text-green-600 text-sm tracking-tighter">
            100% secured checkout procces
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
