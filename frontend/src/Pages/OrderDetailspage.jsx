import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";

const OrderDetailspage = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const { id } = useParams();

  const fetchOrderDetails = async () => {
    await axios
      .get(`https://myshop-ecommerce-fullstack.onrender.com/api/v1/order/singleorder/${id}`)
      .then((response) => {
        setOrderDetails(response.data.data);
        console.log(response.data.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>

      {!orderDetails ? (
        <p>No Order Details Found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order ID : #{id}
              </h3>
              <p className="text-gray-600">
                {new Date(orderDetails.createdAt).toDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.paymentstatus ==="paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                { orderDetails.paymentstatus ==="paid" ? "Approved" : "Pending"}
              </span>
              <span
                className={`${
                  ! orderDetails.paymentstatus ==="paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isDelivered ? "Delivared" : "Pending Delivery"}
              </span>
            </div>
          </div>
          {/* customer , payment , and shipping info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Payment method :{orderDetails.paymentmethod}</p>
              <p>Status: {orderDetails.paymentstatus==="paid" ? "Paid" : "Unpaid"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p>Shipping method :{orderDetails.shppingMethod}</p>
              <p>
                Address:{" "}
                {`${orderDetails.city} , ${orderDetails.address}`}
              </p>
            </div>
          </div>
          <div className="overflow-x-auto ">
            <h4 className="text-lg font-semibold mb-4"> Products</h4>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Unit Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.cartitem.map((item) => (
                  <tr key={item.productID}>
                    <td className="py-2 px-4 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg mr-4"
                      />
                      <Link
                        className="text-blue-500 hover:underline"
                        to={`/product/${item.productID}`}
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4">{item.price}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to={"/my-orders"} className="text-blue-500 hover:underline">
            Back to MY Orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailspage;
