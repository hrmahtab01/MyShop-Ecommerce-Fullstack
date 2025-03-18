const orderModel = require("../Model/Order");

async function admingetallOrder(req, res) {
  try {
    const allOrder = await orderModel
      .find({})
      .populate("userId", "email , name");

    return res.status(200).send({
      success: true,
      message: "get all order successfully",
      data: allOrder,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function UpdateOrderAdmin(req, res) {
  const { id } = req.body;
  try {
    const order = await orderModel.findOne({ id });
    if (order) {
      order.status = req.body.status || order.status;
      order.isdelivered =
        req.body.status === "delivered" ? true : order.isdelivered;
      order.deliveredAt =
        req.body.status === "delivered" ? Date.now() : order.deliveredAt;

      const updateOrder = await order.save();
      return res.status(200).send({
        success: true,
        message: "order update successfully",
        data: updateOrder,
      });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "order not found" });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function AdminDeleteOrder(req, res) {
  const { id } = req.params;

  try {
    const deleteOrder = await orderModel.findOne({ _id:id });
    if (deleteOrder) {
        await deleteOrder.deleteOne();
        return res
        .status(200)
        .send({
          success: true,
          message: "delete successfully",
          data: deleteOrder,
        });
   
    }else{
        return res
        .status(404)
        .send({ success: false, message: "Order not found" });
    }
  
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

module.exports = { admingetallOrder, UpdateOrderAdmin, AdminDeleteOrder };
