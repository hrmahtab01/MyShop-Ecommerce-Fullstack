import React from "react";
import { Link } from "react-router";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <div className="flex-1 relative">
          <img
            src="https://cdn.shopify.com/s/files/1/2570/6860/files/festival-outfits-2024-face-chain_600x600.jpg?v=1712933342"
            alt="women's collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Women's Collections
            </h2>
            <Link
              to={"collection/all?gender=women"}
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="flex-1 relative">
          <img
            src="https://scontent.fdac140-1.fna.fbcdn.net/v/t39.30808-6/367488016_2015472572139494_7532209825833079501_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGKOFLkxlXYbplPCOozxCsRL6jNBIhD0aovqM0EiEPRqqf4LZM5XpFBxfxtP8jNUGxk_tNrE-VGhowVyc3OxTxx&_nc_ohc=HxMAgPL2Y1QQ7kNvgGSt_va&_nc_oc=AdjcA3Vj7PdjCkT7lXDeWvoWKhQDp53YSIvxMQOsH9f0mrFPjoNkLRlYeal2xklhOk0&_nc_zt=23&_nc_ht=scontent.fdac140-1.fna&_nc_gid=AOSJgiRycKy2kxfFVEPINEB&oh=00_AYBE026Sf9e9Xulc8yC3-qAhUKeeFfrOeZG9-Yom3TMAng&oe=67CBC46C"
            alt="Men's collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Men's Collections
            </h2>
            <Link
              to={"collection/all?gender=men"}
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
