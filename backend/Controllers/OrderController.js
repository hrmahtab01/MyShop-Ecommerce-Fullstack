const SSLCommerzPayment = require("sslcommerz-lts");
const orderModel = require("../Model/Order");
const store_id = "laraz67b794826e5c6";
const store_passwd = "laraz67b794826e5c6@ssl";
const is_live = false;

async function orderCreateController(req, res) {
  const {
    user,
    cartitem,
    totalprice,
    paymentstatus,
    paymentmethod,
    address,
    city,
    phone,
    name,
    email,
    trans_id,
  } = req.body;

  try {
    if (paymentmethod === "COD") {
      const order = new orderModel({
        user,
        cartitem,
        totalprice,
        paymentstatus,
        paymentmethod,
        address,
        city,
        phone,
        name,
        email,
      });
      await order.save();
      return res.status(201).send({
        success: true,
        message: "order placed successfully",
        data: order,
      });
    } else {
      const transid = Date.now();
      const data = {
        total_amount: 100,
        currency: "BDT",
        tran_id: transid,
        success_url: `http://localhost:4400/api/v1/order/success/${transid}`,
        fail_url: `http://localhost:4400/api/v1/order/fail/${transid}`,
        cancel_url: `http://localhost:4400/api/v1/order/cencel/${transid}`,
        ipn_url: "http://localhost:4400/api/v1/order/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: name,
        cus_email: email,
        cus_add1: address,
        cus_add2: "Dhaka",
        cus_city: city,
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: phone,
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
      sslcz.init(data).then(async (apiResponse) => {
        const order = new orderModel({
          user,
          cartitem,
          totalprice,
          paymentstatus,
          paymentmethod,
          address,
          city,
          phone,
          name,
          email,
          trans_id: transid,
        });

        await order.save();
        let GatewayPageURL = apiResponse.GatewayPageURL;

        return res.status(201).send({
          success: true,
          message: "order placed successfully",
          data: order,
          url: GatewayPageURL,
        });
      });
    }
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
}

async function paymentSuccessController(req, res) {
  const { id } = req.params;
  try {
    const updateorder = await orderModel
      .findOneAndUpdate({ trans_id: id }, { paymentstatus: "paid" })
      .then(() => {
        return res.redirect("https://mangoshopp.netlify.app/success");
      });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
}

async function PaymentfailController(req, res) {
  const { id } = req.params;
  const deleteorder = await orderModel
    .findOneAndDelete({
      trans_id: id,
    })
    .then(() => {
      return res.redirect("https://mangoshopp.netlify.app/fail");
    });
}

async function PaymentCencelController(req, res) {
  const { id } = req.params;

  const deleteorder = await orderModel
    .findOneAndDelete({
      trans_id: id,
    })
    .then(() => {
      return res.redirect("https://mangoshopp.netlify.app/cancel");
    });
}

async function getAllorderController(req, res) {
  try {
    const allorder = await orderModel.find({});
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
    const singleorder = await orderModel.findOne({ _id: id });
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

async function getUserOrderController(req, res) {
  const { userId } = req.params;

  try {
    const userOder = await orderModel.find({ user: userId });
    if (!userOder) {
      return res.status(404).send({
        success: false,
        message: "order not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "single order get successfully",
      data: userOder,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function orderUpdateController(req, res) {
  const { id } = req.params;

  try {
    const order = await orderModel.findOneAndUpdate(
      { _id: id },
      { status: "Delivered" },
      { new: true }
    );
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "order not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "order update successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

module.exports = {
  orderCreateController,
  paymentSuccessController,
  PaymentfailController,
  PaymentCencelController,
  getAllorderController,
  getsingleOrderController,
  getUserOrderController,
  orderUpdateController,
};
