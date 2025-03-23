const sendmail = require("../Helpers/Sendotpnodemailer");
const userModel = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const otp = require("../Helpers/RandomOtpGenerator");
const jwt = require("jsonwebtoken");

async function signupController(req, res) {
  const { name, email, password, role } = req.body;

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password should be at least 6 characters long" });
  }

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const exituser = await userModel.findOne({ email });
  if (exituser) {
    return res.status(400).json({ message: "user already exist" });
  }

  bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    try {
      const user = new userModel({
        name,
        email,
        password: hash,
        role,
      });

      sendmail(email, name);

      await user.save();

      await userModel.findOneAndUpdate(
        {
          email: email,
        },
        {
          otpvalue: otp,
        },
        {
          new: true,
        }
      );

      setTimeout(async () => {
        await userModel.findOneAndUpdate(
          {
            email: email,
          },
          {
            otpvalue: null,
          },
          {
            new: true,
          }
        );
      }, 120000);

      return res.status(201).send({
        success: true,
        message: "user created successfully",
        data: user,
      });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  });
}
async function LoginController(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    // Token payload
    const tokenInfo = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };

    const token = jwt.sign(tokenInfo, process.env.JWT_SECRET, {
      expiresIn: existingUser.role === "admin" ? "20m" : "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    return res.status(200).send({
      message: "Login successful",
      user: tokenInfo,
      token,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
async function userprofileController(req, res) {
  res.send(req.user);
}

async function upadateuserController(req, res) {
  const { role } = req.body;
  const { userId } = req.params;
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: userId },
      { role: role },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    return res
      .status(200)
      .send({ message: "user updated successfully", data: user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
async function deleteuserController(req, res) {
  const { id } = req.params;
  try {
    const user = await userModel.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    return res
      .status(200)
      .send({ message: "user deleted successfully", data: user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
const getAlluserController = async (req, res) => {
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
};

module.exports = {
  signupController,
  LoginController,
  userprofileController,
  upadateuserController,
  deleteuserController,
  getAlluserController,
};
