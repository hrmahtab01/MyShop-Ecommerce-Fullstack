import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

const MyOrderspage = () => {
  const [orders, setOrders] = useState([]);
  const [orderData, setOrderData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userData?.value?.user?.id);

  const fetchOrders = async () => {
    await axios
      .get(`http://localhost:4400/api/v1/order/userorder/${userId}`)
      .then((response) => {
        setOrderData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [userId, navigate]);

  const HandlerowClick = (id) => {
    console.log(id);
    navigate(`/order/${id}`);
  };

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
            {orderData.length > 0 ? (
              orderData.map((order) => (
                <tr
                  onClick={() => HandlerowClick(order._id)}
                  key={order._id}
                  className="border-b hover:border-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.cartitem[0].image}
                      alt={order.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-2 py-2  sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order.cartitem[0].productid}
                  </td>
                  <td className="px-2 py-2  sm:py-4 sm:px-4">
                    {new Date(order.createdAt).toLocaleDateString()} {""}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="px-2 py-2  sm:py-4 sm:px-4">
                    {order ? `${order.city}, ${order.address}` : "N/A"}
                  </td>
                  <td className="px-2 py-2  sm:py-4 sm:px-4">
                    {order.cartitem[0].name}
                  </td>
                  <td className="px-2 py-2  sm:py-4 sm:px-4">
                    {order.cartitem[0].price}
                  </td>
                  <td className="px-2 py-2  sm:py-4 sm:px-4">
                    <span
                      className={`${
                        order.paymentstatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                    >
                      {order.paymentstatus === "paid" ? "paid" : "panding"}
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
