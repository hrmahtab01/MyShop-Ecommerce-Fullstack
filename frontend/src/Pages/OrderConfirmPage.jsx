import React from "react";

const checkout = {
  _id: 123,
  createdAt: new Date(),
  checkoutItems: [
    {
      productI: "1",
      name: "sareee",
      color: "black",
      size: "M",
      quantity: 1,
      price: 4521,
      image:
        "https://img.freepik.com/premium-photo/free-photo-fashion-portrait-young-beautiful-confident-lady-wearing-trendy-winter-outfits_1124573-77227.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
    },
    {
      productID: "2",
      name: "punjabi",
      color: "black",
      size: "xl",
      quantity: 1,
      price: 455,
      image:
        "https://img.freepik.com/premium-photo/free-photo-fashion-portrait-young-beautiful-confident-lady-wearing-trendy-winter-outfits_1124573-77227.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
    },
  ],
  shippingAddress: {
    address: "chayaneer",
    city: "dhaka",
    country: "bangladesh",
  },
};

const OrderConfirmPage = () => {
  const CalculateEstimateDelivery = (createdAt) => {
    const orderdate = new Date(createdAt);
    orderdate.setDate(orderdate.getDate() + 10);
    return orderdate.toDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold text-center text-emerald-700 mb-8">
        Thank You for Your Order
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            {/* order id and date  */}
            <div className="">
              <h2 className="text-xl font-semibold">OrderId: {checkout._id}</h2>
              <p className="text-gray-500">
                OrderDate: {new Date(checkout.createdAt).toDateString()}
              </p>
            </div>
            <div>
              <p className="text-emerald-700 text-sm">
                Estimate Delivery :{" "}
                {CalculateEstimateDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          {/* order items */}
          <div className="mb-20">
            {checkout.checkoutItems.map((items) => (
              <div key={items.productID} className="flex items-center mb-4">
                <img
                  src={items.image}
                  alt={items.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold">{items.name}</h4>
                  <p className="text-sm text-gray-500">
                    {items.color} | {items.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md">{items.price}</p>
                  <p className="text-sm text-gray-500">
                    {" "}
                    Quantity: {items.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* payment and delivery information */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">Cash On Delivery</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city} {","}{" "}
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmPage;
