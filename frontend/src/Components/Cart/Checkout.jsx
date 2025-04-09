import React, { useEffect, useState } from "react";

import { MdDone } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const Checkout = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentmethod, Setpaymentmethod] = useState("COD");
  const [loader, setLoader] = useState(false);
  const cartData = useSelector((state) => state.cartData.cart);
  console.log(cartData);

  const totalPrice = cartData.products?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  console.log(cartData);

  const cart = cartData.products.map((item) => {
    return {
      productid: item.productId,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
      name: item.name,
      image: item.image,
      price: item.price,
    };
  });

  const Handleplaceorder = () => {
    setLoader(true);
    axios
      .post("https://myshop-ecommerce-fullstack.onrender.com/api/v1/order/create", {
        user: cartData.userId,
        name,
        email,
        phone,
        address,
        city,
        paymentmethod: paymentmethod,
        cartitem: cart,
        totalprice: totalPrice,
      })
      .then((result) => {
        if (result.data.data.paymentmethod === "COD") {
          toast.success(result?.data?.message || "add to cart successfully", {
            position: "top-left",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
          navigate("/");
        } else if (result.data.data.paymentmethod === "online") {
          window.location.href = result.data.url;

          toast.success(result?.data?.message || "add to cart successfully", {
            position: "top-left",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
        }

        setTimeout(() => {
          setLoader(false);
        }, 2500);
      })
      .catch((error) => {
        console.log(error);

        toast.error(error?.response?.data.error || "Something went wrong", {
          position: "top-left",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        setTimeout(() => {
          setLoader(false);
        }, 2500);
      });
  };

  return (
    <div className="pt-[80px] pb-[140px] ">
      <ToastContainer
        position="top-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />

      <div>
        <div className=" md:mt-[80px] mt-[40px] gap-[173px] md:flex grid grid-cols-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
            <div>
              <h2 className="text-4xl text-primaryColor font-medium font-inter leading-[31px]">
                Billing Details
              </h2>
              <div className="w-[470px] h-[614px]">
                <div className="mt-[48px]">
                  <p className="text-base text-primaryColor/40 font-normal font-Nunito">
                    Name<span className="text-ThirdColor">*</span>
                  </p>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-[50px] bg-[#F5F5F5] rounded-[4px] text-base text-primaryColor font-normal font-Nunito pl-5 mt-2"
                    type="text"
                  />
                </div>

                <div className="mt-[32px]">
                  <p className="text-base text-primaryColor/40 font-normal font-Nunito">
                    Address
                  </p>
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-[50px] bg-[#F5F5F5] rounded-[4px] text-base text-primaryColor font-normal font-Nunito pl-5 mt-2"
                    type="text"
                  />
                </div>

                <div className="mt-[32px]">
                  <p className="text-base text-primaryColor/40 font-normal font-Nunito">
                    Town/City<span className="text-ThirdColor">*</span>
                  </p>
                  <input
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-[50px] bg-[#F5F5F5] rounded-[4px] text-base text-primaryColor font-normal font-Nunito pl-5 mt-2"
                    type="text"
                  />
                </div>
                <div className="mt-[32px]">
                  <p className="text-base text-primaryColor/40 font-normal font-Nunito">
                    Phone Number<span className="text-ThirdColor">*</span>
                  </p>
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-[50px] bg-[#F5F5F5] rounded-[4px] text-base text-primaryColor font-normal font-Nunito pl-5 mt-2"
                    type="number"
                  />
                </div>
                <div className="mt-[32px]">
                  <p className="text-base text-primaryColor/40 font-normal font-Nunito">
                    Email Address<span className="text-ThirdColor">*</span>
                  </p>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-[50px]  focus:border-t-teal-500 bg-[#F5F5F5] rounded-[4px] text-base text-primaryColor font-normal font-Nunito pl-5 mt-2"
                    type="email"
                  />
                </div>
                <div className="flex mt-6 gap-4">
                  <label className="flex items-center gap-4 mt-6">
                    <input type="checkbox" className="w-[24px] h-[24px]" />
                    <span className="text-base text-primaryColor font-normal font-Nunito">
                      Save this information for faster check-out next time
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="w-[527px] h-[600px] ">
              <div>
                {cartData.products.map((item) => (
                  <>
                    <div className="flex justify-between items-center w-[350px] md:w-[422px] ">
                      <div className="flex gap-6 items-center mb-3 ">
                        <img
                          className="w-[60px] h-[60px] object-cover mb-3"
                          src={item?.image || ""}
                          alt="monitorImage"
                        />
                        <div className="flex flex-col ">
                          <p className="text-base text-primaryColor font-normal font-Nunito">
                            {item?.name}
                          </p>
                          <p className=" font-normal font-Nunito">
                            Color:{item?.color}
                          </p>
                          <p className=" font-normal font-Nunito">
                            Size: {item?.size}
                          </p>
                        </div>
                      </div>
                      <p className="text-base text-primaryColor font-normal font-Nunito">
                        {item?.price}
                      </p>
                    </div>
                  </>
                ))}

                <div className="mt-[32px]">
                  <div className="flex justify-between border-b pt-[24px] pb-[16px] border-primaryColor w-[350px] md:w-[422px]">
                    <p className="text-base  text-primaryColor font-normal font-Nunito">
                      Subtotal:
                    </p>
                    <p className="text-base  text-primaryColor font-normal font-Nunito">
                      {totalPrice}
                    </p>
                  </div>
                  <div className="flex justify-between border-b pt-[24px] pb-[16px] border-primaryColor w-[350px] md:w-[422px]">
                    <p className="text-base  text-primaryColor font-normal font-Nunito">
                      Shipping:
                    </p>
                    <p className="text-base  text-primaryColor font-normal font-Nunito">
                      Free
                    </p>
                  </div>
                  <div className="flex justify-between pt-[16px] pb-[16px] w-[350px] md:w-[422px] ">
                    <p className="text-base  text-primaryColor font-normal font-Nunito">
                      Total:
                    </p>
                    <p className="text-base  text-primaryColor font-normal font-Nunito">
                      {totalPrice}
                    </p>
                  </div>
                </div>
                <div className="mt-[32px] flex flex-col gap-4">
                  <label className="flex items-center gap-4">
                    <input
                      onChange={(e) => Setpaymentmethod(e.target.value)}
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
                      onChange={(e) => Setpaymentmethod(e.target.value)}
                      type="radio"
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
                <div className="md:flex gap-4 mt-[32px] grid grid-cols-1">
                  <input
                    className="w-[300px] h-[56px] border border-primaryColor rounded-[4px] outline-none placeholder:text-base placeholder:text-primaryColor/40  placeholder:font-normal placeholder:font-Nunito pl-6 text-base text-primaryColor font-normal font-Nunito"
                    type="text"
                    placeholder="Coupon Code"
                  />
                  <button className="w-[211px] h-[56px] bg-red-500  text-base text-white hover:bg-gradient-to-r from-orange-900 to-teal-900 duration-300 font-medium font-Nunito rounded-[4px]">
                    Apply Coupon
                  </button>
                </div>
                {loader ? (
                  <div className="mt-[32px] ml-12 " role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <button
                    onClick={Handleplaceorder}
                    className="md:w-[211px] w-full h-[56px] bg-red-500 text-base text-white font-medium hover:bg-black duration-300 font-Nunito rounded-[4px] mt-[32px]"
                  >
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
