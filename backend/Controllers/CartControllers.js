const productModel = require("../Model/productModel");

async function createCartController(req, res) {
  const { productId, quantity, color, size, guestId, userId } = req.body;
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "product not found" });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

module.exports = { createCartController };
