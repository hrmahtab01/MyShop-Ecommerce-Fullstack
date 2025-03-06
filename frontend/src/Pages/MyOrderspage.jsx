import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const MyOrderspage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      let fetchdata = [
        {
          _id: 1,
          CreateAt: Date.now(),
          address: { city: "dhaka", country: "bangladesh" },
          orderItems: [
            {
              name: "product 1",
              image:
                "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8140f313904805.5627a0dc02f78.jpg",
            },
          ],
          totalPrice: 154,
          isPaid: true,
        },
        {
          _id: 2,
          CreateAt: Date.now(),
          address: { city: "dhaka", country: "bangladesh" },
          orderItems: [
            {
              name: "product 2",
              image:
                "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/333c1d13904805.5627a0902b9f8.jpg",
            },
          ],
          totalPrice: 1554,
          isPaid: true,
        },
      ];
      setOrders(fetchdata);
    }, 1000);
  });

  const HandlerowClick =(id)=>{
    navigate(`/order/${id}`)
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price </th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  onClick={() => HandlerowClick(order._id)}
                  key={order._id}
                  className="border-b hover:border-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-2 py-2  sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="px-2 py-2  sm:py-4 sm:px-4">
                    {new Date(order.CreateAt).toLocaleDateString()} {""}
                    {new Date(order.CreateAt).toLocaleTimeString()}
                  </td>
                  <td className="px-2 py-2  sm:py-4 sm:px-4">
                    {order.address
                      ? `${order.address.city}, ${order.address.country}`
                      : "N/A"}
                  </td>
                  <td className="px-2 py-2  sm:py-4 sm:px-4">
                    {order.orderItems.length}
                  </td>
                  <td className="px-2 py-2  sm:py-4 sm:px-4">
                    {order.totalPrice}
                  </td>
                  <td className="px-2 py-2  sm:py-4 sm:px-4">
                    <span
                      className={`${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                    >
                      {order.isPaid ? "paid" : "panding"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrderspage;
