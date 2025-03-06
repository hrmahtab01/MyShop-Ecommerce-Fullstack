import React, { useState } from "react";
import { useNavigate } from "react-router";

const Checkout = () => {
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    fristName: "",
    lastName: "",
    address: "",
    city: "",
    postcode: "",
    country: "",
    phone: "",
  });

  const cartitem = [
    {
      _id: 1,
      name: "the golden shirt",
      images: [
        {
          url: "https://img.freepik.com/premium-photo/free-photo-fashion-portrait-young-beautiful-confident-lady-wearing-trendy-winter-outfits_1124573-77227.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
          alTtext: "cart image",
        },
      ],
      price: 4500,
      color: "pink",
      size: "XXl",
    },
    {
      _id: 2,
      name: "the golden shirt",
      images: [
        {
          url: "https://img.freepik.com/premium-photo/free-photo-fashion-portrait-young-beautiful-confident-lady-wearing-trendy-winter-outfits_1124573-77227.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
          alTtext: "cart image",
        },
      ],
      price: 4500,
      color: "blue",
      size: "L",
    },
    {
      _id: 3,
      name: "the golden shirt",
      images: [
        {
          url: "https://img.freepik.com/premium-photo/free-photo-fashion-portrait-young-beautiful-confident-lady-wearing-trendy-winter-outfits_1124573-77227.jpg?ga=GA1.1.1324640529.1734293495&semt=ais_hybrid",
          alTtext: "cart image",
        },
      ],
      price: 4500,
      color: "red",
      size: "M",
    },
  ];

  const [paymentMethod, setPaymentMethod] = useState("COD");

  console.log(paymentMethod);

  const HandleplaceOrder = () => {
    console.log("order confirm");
    navigate("/confirmorder")
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* left section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <div>
          <h2 className="text-lg mb-4">Contact Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={"mangoman@gmail.com"}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                value={shippingAddress.fristName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    fristName: e.target.value,
                  })
                }
                type="text"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                type="text"
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-600">
              Adress
            </label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                type="text"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Post Code</label>
              <input
                value={shippingAddress.postcode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postcode: e.target.value,
                  })
                }
                type="text"
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-600">
              Country
            </label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-600">
              Phone
            </label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
      </div>
      <div>
        {cartitem.map((item, index) => (
          <>
            <div
              key={item._id}
              className="w-full flex justify-between items-center px-6 py-3"
            >
              <div className="flex gap-2">
                <img
                  className="w-16 h-16 rounded object-cover"
                  src={item.images[0].url}
                  alt={item.images[0].alTtext}
                />
                <div className="flex flex-col">
                  <h3 className="text-md"> {item.name}</h3>
                  <p className="text-gray-500"> Color: {item.color}</p>
                  <p className="text-gray-500"> Size: {item.size}</p>
                </div>
              </div>
              <p className="text-lg">{item.price.toLocaleString()}</p>
            </div>
          </>
        ))}
        <div className="w-full flex justify-between items-center p-6 border-b border-gray-200">
          <p className="text-xl font-semibold">Subtotal:</p>
          <p>5000</p>
        </div>
        <div className="w-full flex justify-between items-center p-6 border-b border-gray-200">
          <p className="text-xl font-semibold">Shipping:</p>
          <p>Free</p>
        </div>
        <div className="w-full flex justify-between items-center p-6 ">
          <p className="text-xl font-semibold">Total:</p>
          <p>5000</p>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <label className="flex items-center gap-4">
            <input
              onChange={(e) => setPaymentMethod(e.target.value)}
              type="radio"
              name="paymentMethod"
              value="online"
              className="w-[24px] h-[24px]"
            />
            <span className="text-base text-primaryColor font-normal font-Nunito">
              Online
            </span>
          </label>

          <label className="flex items-center gap-4">
            <input
              type="radio"
              onChange={(e) => setPaymentMethod(e.target.value)}
              name="paymentMethod"
              defaultChecked
              value="COD"
              className="w-[24px] h-[24px]"
            />
            <span className="text-base text-primaryColor font-normal font-Nunito">
              Cash on Delivery
            </span>
          </label>
        </div>
        <div className="md:flex gap-4 p-6 grid grid-cols-1">
          <input
            className="w-[300px] h-[56px] border border-primaryColor rounded-[4px] outline-none placeholder:text-base placeholder:text-primaryColor/40  placeholder:font-normal placeholder:font-Nunito pl-6 text-base text-primaryColor font-normal font-Nunito"
            type="text"
            placeholder="Coupon Code"
          />
          <button className="w-[211px] h-[56px] bg-red-500  text-base text-white hover:bg-gradient-to-r from-orange-900 to-teal-900 duration-300 font-medium font-Nunito rounded-[4px]">
            Apply Coupon
          </button>
        </div>
        <div className="p-6">
          <button
            onClick={HandleplaceOrder}
            className="md:w-[211px] w-full h-[56px] bg-teal-500 text-base text-white font-medium hover:bg-black duration-300 font-Nunito rounded-[4px] cursor-pointer"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
