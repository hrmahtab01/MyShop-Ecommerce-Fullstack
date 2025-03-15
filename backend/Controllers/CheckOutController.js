const CheckoutModel = require("../Model/Checkout");

async function CheckoutCreateController(req, res) {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;
  if (!checkoutItems || checkoutItems.length === 0) {
    res.status(400).send({ success: false, message: "no items in checkout" });
  }
  try {
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
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

module.exports = { CheckoutCreateController };
