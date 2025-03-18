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

async function adminUpdateuserController(req , res) {
    res.send("user update successfully")
}

module.exports = { admingetAlluserController, admincreateNewuser , adminUpdateuserController };
