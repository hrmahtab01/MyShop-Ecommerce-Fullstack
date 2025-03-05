import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minpirce: 0,
    maxprice: 10000,
  });
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const Categorys = ["topwear", "bottomwear", "footwear"];
  const Colors = ["red", "blue", "black", "white", "green", "yellow", "orange"];
  const Sizes = ["S", "M", "L", "XL", "XXL"];
  const Materials = ["cotton", "polyester", "leather", "synthetic"];
  const Brands = ["adidas", "nike", "puma", "reebok"];
  const Genders = ["male", "female"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minprice: params.minprice || 0,
      maxprice: params.maxprice || 10000,
    });

    setPriceRange([0, params.maxprice || 10000]);
  }, [searchParams]);

  const hanldefilterchange = (e) => {
    const { name, value, checked, type } = e.target;

    let Newfilters = { ...filters };
    if (type === "checkbox") {
      if (checked) {
        Newfilters[name] = [...(Newfilters[name] || []), value];
      } else {
        Newfilters[name] = Newfilters[name].filter((item) => item !== value);
      }
    } else {
      Newfilters[name] = value;
    }
    setFilters(Newfilters);

    updateulrParams(Newfilters);
  };

  const updateulrParams = (Newfilters) => {
    const params = new URLSearchParams();
    Object.keys(Newfilters).forEach((key) => {
      if (Array.isArray(Newfilters[key]) && Newfilters[key].length > 0) {
        params.append(key, Newfilters[key].join(","));
      } else if (Newfilters[key]) {
        params.append(key, Newfilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlepriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilter = { ...filters, minprice: 0, maxprice: newPrice };
    setFilters(newFilter);
    updateulrParams(newFilter);
  };

  return (
    <div className="p-4">
      <h3 className="text-3xl font-medium text-gray-800 mb-4">Filter</h3>
      {/* categoryfiler */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {Categorys.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              checked={category === filters.category}
              value={category}
              onChange={hanldefilterchange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>
      {/* gender filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {Genders.map((geneder) => (
          <div key={geneder} className="flex items-center mb-1">
            <input
              value={geneder}
              onChange={hanldefilterchange}
              checked={geneder === filters.gender}
              type="radio"
              name="gender"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
            />
            <span className="text-gray-700">{geneder}</span>
          </div>
        ))}
      </div>
      {/* color filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Colors</label>
        <div className="flex flex-wrap gap-2">
          {Colors.map((color) => (
            <button
              value={color}
              onClick={hanldefilterchange}
              key={color}
              name="color"
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-110 ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color.toLocaleLowerCase() }}
            ></button>
          ))}
        </div>
      </div>
      {/* Size filter */}
      <div className="mb-6">
        <label className="block text-gray-600 mb-2 font-medium ">Sizes</label>
        {Sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              checked={filters.size.includes(size)}
              value={size}
              onChange={hanldefilterchange}
              type="checkbox"
              name="size"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>
      {/* material filter */}
      <div className="mb-6">
        <label className="block text-gray-600 mb-2 font-medium ">
          Materials
        </label>
        {Materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              checked={filters.material.includes(material)}
              value={material}
              onChange={hanldefilterchange}
              type="checkbox"
              name="material"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>
      {/* brand filter */}
      <div className="mb-6">
        <label className="block text-gray-600 mb-2 font-medium ">Brand</label>
        {Brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              checked={filters.brand.includes(brand)}
              value={brand}
              onChange={hanldefilterchange}
              type="checkbox"
              name="brand"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/* price range filter  */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={10000}
          value={priceRange[1]}
          onChange={handlepriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>0</span>
          <span>{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
