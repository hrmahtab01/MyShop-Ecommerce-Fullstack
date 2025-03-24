import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchproductDetils } from "../../../Slices/productSlice";

const EditProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.productData
  );
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://i.pinimg.com/736x/c3/a8/9c/c3a89c72c320ae959835b28c6e1d8ad4.jpg",
      },
      {
        url: "https://i.pinimg.com/736x/8c/d3/e1/8cd3e19ef44f3da329b7ee99a94465f0.jpg",
      },
    ],
  });

  const [upLoading, setUpLoading] = useState(false);
  useEffect(() => {
    if (id) {
      dispatch(fetchproductDetils(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      selectedProduct(selectedProduct);
    }
  }, [selectedProduct]);

  const HandleChange = async (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const HandleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      setUpLoading(true);
      const response = await axios.post(
        "http://localhost:4400/api/v1/upload",
        formData
      );
      selectedProduct((prevdata) => ({
        ...prevdata,
        image: [
          ...prevdata.images,
          { url: response.data.imageUrl, altText: "" },
        ],
      }));
      setUpLoading(false)
    } catch (error) {}
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:4400/api/v1/product/update/${id}`, productData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={HandleSubmit}>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={HandleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2"> Description</label>
          <textarea
            onChange={HandleChange}
            name="description"
            value={productData.description}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={HandleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count In Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={HandleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={HandleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (coma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors (coma-separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Images</label>
          <input type="file" onChange={HandleImageUpload} />
          <div className="gap-4 flex mb-4">
            {productData.images.map((img, index) => (
              <div key={index}>
                <img
                  src={img.url}
                  alt={img.alTtext || "product image"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
