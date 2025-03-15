const CheckoutModel = require("../Model/Checkout");
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false;

async function CheckoutCreateController(req, res) {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;
  if (!checkoutItems || checkoutItems.length === 0) {
    res.status(400).send({ success: false, message: "no items in checkout" });
  }
  try {
    if (paymentMethod === "COD") {
      const newCheckout = await CheckoutModel.create({
        user: req.user._id,
        checkoutItems: checkoutItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        paymentStatus: "unpaid",
      });
      console.log(`checkout created for user ${req.user._id}`);
      return res.status(201).send({
        success: true,
        message: "checkout created successfully",
        data: newCheckout,
      });
    } else {
      const transid = Date.now();
      const data = {
        total_amount: 100,
        currency: "BDT",
        tran_id: transid, // use unique tran_id for each api call
        success_url: "http://localhost:3030/success",
        fail_url: "http://localhost:3030/fail",
        cancel_url: "http://localhost:3030/cancel",
        ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: "Customer Name",
        cus_email: "customer@example.com",
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
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
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz.init(data).then((apiResponse) => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.redirect(GatewayPageURL);
        console.log("Redirecting to: ", GatewayPageURL);
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
