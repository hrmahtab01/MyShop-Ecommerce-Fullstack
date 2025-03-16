const CheckoutModel = require("../Model/Checkout");
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "laraz67b794826e5c6";
const store_passwd = "laraz67b794826e5c6@ssl";
const is_live = false;

async function CheckoutCreateController(req, res) {
  const {
    checkoutItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    paymentStatus,
    transId,
    userId,
  } = req.body;

  try {
    if (paymentMethod === "COD") {
      const newCheckout = await CheckoutModel.create({
        userId,
        checkoutItems: checkoutItems,
        shippingAddress,
        paymentMethod: "COD",
        totalPrice,
        paymentStatus: "unpaid",
      });

      return res.status(201).send({
        success: true,
        message: "checkout created successfully",
        data: newCheckout,
      });
    } else {
      const transid = Date.now();
      const data = {
        total_amount: totalPrice,
        currency: "BDT",
        tran_id: transid,
        success_url: `http://localhost:4400/api/v1/checkout/success/${transid}`,
        fail_url: `http://localhost:4400/api/v1/checkout/fail${transid}`,
        cancel_url: `http://localhost:4400/api/v1/checkout/cancel${transid}`,
        ipn_url: `http://localhost:4400/api/v1/checkout/ipn${transid}`,
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: "Customer Name",
        cus_email: "customer@example.com",
        cus_add1: shippingAddress.address,
        cus_add2: "Dhaka",
        cus_city: shippingAddress.city,
        cus_state: "Dhaka",
        cus_postcode: shippingAddress.postalCode,
        cus_country: shippingAddress.country,
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };
      console.log(data);

      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz.init(data).then(async (apiResponse) => {
        const newCheckout = new CheckoutModel({
          userId,
          checkoutItems: checkoutItems,
          shippingAddress,
          paymentMethod: "online",
          totalPrice,
          transId: transid,
        });
        await newCheckout.save();
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send(GatewayPageURL);
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

module.exports = { CheckoutCreateController };
