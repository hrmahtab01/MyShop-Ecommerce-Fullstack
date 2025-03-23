import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link } from "react-router";

const AdmiHomepage = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const fetchAllOrders = async () => {
    axios
      .get("http://localhost:4400/api/v1/order/allorder")
      .then((response) => {
        setAllOrders(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  

  let totalprice = allOrders.map((order) => order.totalprice);
 const totalpRice = totalprice.reduce((acc, price) => acc + price, 0);

  console.log(totalprice);

  const fethcAllproduct = async () => {
    axios
      .get("http://localhost:4400/api/v1/product/allproduct")
      .then((response) => {
        setAllProduct(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fethcAllproduct();
  }, []);

  const order = [
    {
      _id: 1245,
      user: {
        name: "mango",
      },
      totalPrice: 1455,
      status: "processing",
    },
    {
      _id: 1245,
      user: {
        name: "mango",
      },
      totalPrice: 1455,
      status: "processing",
    },
    {
      _id: 1245,
      user: {
        name: "mango",
      },
      totalPrice: 1455,
      status: "processing",
    },
    {
      _id: 1245,
      user: {
        name: "mango",
      },
      totalPrice: 1455,
      status: "processing",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h3 className="text-3xl font-bold mb-6">Admin Dashboard</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold"> Revenue</h2>
          <p className="text-2xl">{totalpRice}</p>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold"> Total Orders</h2>
          <p className="text-2xl">{allOrders.length}</p>
          <Link to={"/admin/orders"} className="text-blue-500 hover:underline">
            Manage Orders
          </Link>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold"> Total Products</h2>
          <p className="text-2xl">{allProduct.length}</p>
          <Link
            to={"/admin/products"}
            className="text-blue-500 hover:underline"
          >
            Manage Products
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4"> Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="py-3 px-4 ">Order ID</th>
                <th className="py-3 px-4 ">User </th>
                <th className="py-3 px-4 ">Total Price</th>
                <th className="py-3 px-4 ">Status</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.length > 0 ? (
                allOrders.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-4">#{item._id}</td>
                    <td className="p-4">{item.user}</td>
                    <td className="p-4">{item.totalprice}</td>
                    <td className="p-4">{item.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No Recent Order Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdmiHomepage;
