const productModel = require("../Model/productModel");
const userModel = require("../Model/UserModel");

async function admingetAlluserController(req, res) {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      success: true,
      message: "all users get successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function admincreateNewuser(req, res) {
  const { name, email, password, role } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .send({ success: false, message: "user already exit" });
    }

    const newUser = new userModel({
      name,
      email,
      password,
      role: role || "customer",
    });

    await newUser.save();

    return res.status(201).send({
      success: true,
      message: "new user create successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function adminUpdateuserController(req, res) {
  const { name, email, role } = req.body;
  const { id } = req.params;
  try {
    const user = await userModel.findOneAndUpdate({ id });
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;
    }
    const updateuser = await user.save();
    return res.status(200).send({
      success: true,
      message: "user update successfully",
      user: updateuser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}
async function adminDeleteUserController(req, res) {
  const { id } = req.body;

  try {
    const deleteuser = await userModel.findOneAndDelete({ id });
    if (!deleteuser) {
      return res
        .status(404)
        .send({ success: false, message: "User not found " });
    }
    return res
      .status(200)
      .send({
        success: true,
        message: "User delete successfully",
        user: deleteuser,
      });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}
async function adminGetallProduct(req, res) {
    try {
      const allProduct = await productModel.find({});
      return res
        .status(200)
        .send({
          success: true,
          message: "get all product succeffully",
          data: allProduct,
        });
    } catch (error) {
      return res.status(500).send({
        Success: false,
        message: error.message || "something went wrong",
      });
    }
  }
  

module.exports = {
  admingetAlluserController,
  admincreateNewuser,
  adminUpdateuserController,
  adminDeleteUserController,
  adminGetallProduct
};
