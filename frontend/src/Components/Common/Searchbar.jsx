import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const Searchbar = () => {
  const [searchterm, setSearchterm] = useState("");
  const [isopen, setIsopen] = useState(false);

  const Handlesearchtoggle = () => {
    setIsopen(!isopen);
  };
  const Handlesearch = (e) => {
    e.preventDefault();
    console.log("search term", searchterm);
    setIsopen(false);
  };
  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isopen ? "absolute top-0 right-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {isopen ? (
        <form
          onSubmit={Handlesearch}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              onChange={(e) => setSearchterm(e.target.value)}
              placeholder="Search here"
              value={searchterm}
              className="bg-gray-100 px-4 py-2 pl-2  pr-12 rounded-lg focus:outline-none w-full placeholder:text-teal-700"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 duration-150"
            >
              <HiMagnifyingGlass className="text-2xl" />
            </button>
          </div>
          <button
            onClick={Handlesearchtoggle}
            type="button "
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 duration-150"
          >
            <HiMiniXMark className="text-2xl cursor-pointer" />
          </button>
        </form>
      ) : (
        <button onClick={Handlesearchtoggle}>
          <HiMagnifyingGlass className="text-2xl cursor-pointer " />
        </button>
      )}
    </div>
  );
};

export default Searchbar;
