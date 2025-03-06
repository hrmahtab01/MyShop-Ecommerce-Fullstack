import React from "react";
import { useSearchParams } from "react-router";

const ShortOption = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const HandlesortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };
  return (
    <div className="mb-4 flex items-center justify-end">
      <select
        value={searchParams.get("sortBy") || ""}
        onChange={HandlesortChange}
        id="sort"
        className="border p-2 rounded-md focus:outline-none"
      >
        <option value="">Default</option>
        <option value="priceAsc"> Price : Low to High</option>
        <option value="priceDesc"> Price: High to Low </option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default ShortOption;
