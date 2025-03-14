import React from "react";
import { Link } from "react-router";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <div className="flex-1 relative">
          <img
            src="https://i.pinimg.com/736x/14/ea/f7/14eaf7e4e0dea79470f5058852993dea.jpg"
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
            src="https://scontent.fdac140-1.fna.fbcdn.net/v/t39.30808-6/405335606_2076286892724728_4014104283922080168_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEIsEu_eAj9Z0lzB5QxpI9ZFZ4Hl64NpQgVngeXrg2lCFzYl6e87j7d7bvsDuKEDZc9CaYlpC2hTvQJaeWh3TlS&_nc_ohc=qIYSp_4qbpkQ7kNvgFCIpiM&_nc_oc=AdiEJy5O9AT8s4WatmIadpXvUVoPzdSFL894ZaVZWVYwSixdGQk0kp6-gBlxiSCPu8o&_nc_zt=23&_nc_ht=scontent.fdac140-1.fna&_nc_gid=7c_vedJZkc7tCGzd4RbQKA&oh=00_AYFY_45hY_4PVfp-MGFlWy43lLLke576W72yQocFWTjUZA&oe=67DA2772"
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
