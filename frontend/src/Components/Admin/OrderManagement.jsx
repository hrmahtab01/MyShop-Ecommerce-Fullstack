import axios from "axios";
import React, { useEffect, useState } from "react";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchAllOrder = async () => {
      axios
        .get("https://myshop-ecommerce-fullstack.onrender.com/api/v1/order/allorder")
        .then((response) => {
          setOrders(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchAllOrder();
  }, []);

  const HandleStatusChange = async (orderid) => {
    axios
      .put(`https://myshop-ecommerce-fullstack.onrender.com/api/v1/order/update/${orderid}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 ">Order Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <th className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{item._id}
                  </th>
                  <th className="p-4">{item.name}</th>
                  <th className="p-4">{item.totalprice}</th>
                  <th className="p-4">
                    <select
                      name=""
                      value={item.status}
                      onChange={(e) =>
                        HandleStatusChange(item._id, e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                      <option value="processing">Processing</option>
                      <option value="Shiped">Shiped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </th>
                  <th className="p-4">
                    {item.status === "Delivered" ? (
                      <span className="text-teal-500">Delivered</span>
                    ) : (
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-900 duration-200"
                        onClick={() => HandleStatusChange(item._id)}
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <th colSpan={5} className="p-4 text-center text-gray-500">
                  No Orders Found
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderManagement;
