const cartModel = require("../Model/Cart");
const productModel = require("../Model/productModel");

const getCart = async (guestId, userId) => {
  if (userId) {
    return await cartModel.findOne({ userId: userId });
  } else if (guestId) {
    return await cartModel.findOne({ guestId });
  }
  return null;
};

async function createCartController(req, res) {
  const { productId, quantity, color, size, guestId, userId } = req.body;
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "product not found" });
    }

    let cart = await getCart(guestId, userId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).send({
        success: true,
        data: cart,
      });
    } else {
      const newcart = await cartModel.create({
        userId: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).send({
        success: true,
        message: "cart created successfully",
        data: newcart,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function incrementQuantityController(req, res) {
  const { productId, quantity, color, size, guestId, userId } = req.body;
  try {
    const cart = await getCart(guestId, userId);

    if (!cart) {
      return res.status(404).send({
        success: false,
        message: "cart not found",
      });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1);
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).send({
        success: true,
        data: cart,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "product not found in cart",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function deleteCartController(req, res) {
  const { productId, color, size, guestId, userId } = req.body;

  try {
    const cart = await getCart(guestId, userId);
    if (!cart) {
      return res.status(404).send({
        success: false,
        message: "cart not found",
      });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).send({ success: true, data: cart });
    } else {
      return res.status(404).send({
        success: false,
        message: "product not found in cart",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function getCartController(req, res) {
  const { userId, guestId } = req.query;
  try {
    const cart = await getCart(guestId, userId);
    if (cart) {
      return res.status(200).send({
        success: true,
        data: cart,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "cart not found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function cartmargeController(req, res) {
  const { guestId } = req.body;

  try {
    const guestCart = await cartModel.findOne({ guestId });
    const usercart = await cartModel.findOne({ userId: req.user._id });
    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res
          .status(400)
          .send({ success: false, message: "guest cart is empty" });
      }
      if (usercart) {
        guestCart.products.forEach((guestItem) => {
          const productIndex = usercart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );
          if (productIndex > -1) {
            usercart.products[productIndex].quantity += guestItem.quantity;
          } else {
            usercart.products.push(guestItem);
          }
        });
        usercart.totalPrice = usercart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await usercart.save();
        try {
          await cartModel.findOneAndDelete({ guestId });
        } catch (error) {
          console.error("error deleting guest cart", error);
        }
        return res.status(200).send({ success: true, data: usercart });
      } else {
        guestCart.useId = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();
        return res.status(200).send({ success: true, data: guestCart });
      }
    }else{
      if (usercart) {
        return res.status(200).send({ success: true, data: usercart });
      }
      return res.status(404).send({
        success: false,
        message: "guestcart not found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}
module.exports = {
  createCartController,
  incrementQuantityController,
  deleteCartController,
  getCartController,
  cartmargeController,
};
