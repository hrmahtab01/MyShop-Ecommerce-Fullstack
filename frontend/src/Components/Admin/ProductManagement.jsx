import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import { Link } from "react-router";
import { toast } from "react-toastify";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loding, setLoding] = useState(false);

  const fetchAllproduct = useCallback(() => {
    axios
      .get("https://myshop-ecommerce-fullstack.onrender.com/api/v1/product/allproduct")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    fetchAllproduct();
  }, [fetchAllproduct]);

  const HandleDelete = (id) => {
    setLoding(true);

    axios
      .delete(`https://myshop-ecommerce-fullstack.onrender.com/api/v1/product/delete/${id}`)
      .then(() => {
        toast.success("product deleted successfully", {
          duration: 1000,
        });
        setTimeout(() => {
          setLoding(false);
        }, 1000);
      })

      .catch((error) => {
        toast.error(error.response.data.message || "something went wrong", {
          duration: 1000,
        });
        setTimeout(() => {
          setLoding(false);
        }, 1000);
      });
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <toaser></toaser>
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Sku</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-100 cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="p-4">{item.price}</td>
                  <td className="p-4">{item.sku}</td>
                  <td className="p-4">
                    <Link
                      to={`/admin/products/${item._id}/edit`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    {loding ? (
                      <span>Loading....</span>
                    ) : (
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 duration-300 cursor-pointer"
                        onClick={() => HandleDelete(item._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;
