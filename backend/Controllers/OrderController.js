
const SSLCommerzPayment = require("sslcommerz-lts");
const orderModel = require("../Model/Order");
const store_id = "laraz67b794826e5c6";
const store_passwd = "laraz67b794826e5c6@ssl";
const is_live = false;

async function orderCreateController(req, res) {
  const {
    ordertItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    paymentStatus,
    transId,
    userId,
  } = req.body;

  try {
    if (paymentMethod === "COD") {
      const neworder = await orderModel.create({
        userId,
        ordertItems:  ordertItems,
        shippingAddress,
        paymentMethod: "COD",
        totalPrice,
        paymentStatus: "unpaid",
      });

      return res.status(201).send({
        success: true,
        message: "checkout created successfully",
        data: neworder,
      });
    } else {
      const transid = Date.now();
      const data = {
        total_amount: totalPrice,
        currency: "BDT",
        tran_id: transid,
        success_url: `http://localhost:4400/api/v1/order/success/${transid}`,
        fail_url: `http://localhost:4400/api/v1/order/fail/${transid}`,
        cancel_url: `http://localhost:4400/api/v1/order/cancel/${transid}`,
        ipn_url: `http://localhost:4400/api/v1/order/ipn/${transid}`,
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
        const neworder = new orderModel({
          userId,
          ordertItems: ordertItems,
          shippingAddress,
          paymentMethod: "online",
          totalPrice,
          transId: transid,
        });
        await neworder.save();
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

async function paymentSuccessController(req, res) {
  const { id } = req.params;
  try {
    const findid = await orderModel.findOneAndUpdate(
      { transId: id },
      {
        paymentStatus: "paid",
        isPaid: true,
      },
      { new: true }
    ).then(() => {
     return res.redirect("http://localhost:5173/success");
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
}

async function PaymentfailController(req, res) {
  const { id } = req.params;
  const deleteorder = await orderModel.findOneAndDelete({
    trans_id: id,
  }).then(() => {
   return res.redirect("http://localhost:5173/fail");
  });
}

async function PaymentCencelController(req, res) {
  const { id } = req.params;

  const deleteorder = await orderModel.findOneAndDelete({
    trans_id: id,
  }).then(() => {
   return res.redirect("http://localhost:5173/cancel");
  });
}

async function getAllorderController(req, res) {
  
  try {
    const allorder = await orderModel.find({})
    return res.status(200).send({
      success: true,
      message: "all order get successfully",
      data: allorder,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function getsingleOrderController(req, res) {
  const { id } = req.params;
  try {
    const singleorder = await orderModel.findOne({ _id: id })
    if (!singleorder) {
      return res.status(404).send({
        success: false,
        message: "order not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "single order get successfully",
      data: singleorder,
    });
  } catch (error) {}
}

module.exports = {
  orderCreateController,
  paymentSuccessController,
  PaymentfailController,
  PaymentCencelController,
  getAllorderController,
  getsingleOrderController,
};
