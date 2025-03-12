const sendmail = require("../Helpers/Sendotpnodemailer");
const userModel = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const otp = require("../Helpers/RandomOtpGenerator");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

async function signupController(req, res) {
  const { name, email, password, role } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ message: "Password should be at least 6 characters long" });
    
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

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).send({ success: false, message: "Signup first" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Credentials" });
    }

    const tokenInfo = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };

    let token = jwt.sign({ tokenInfo }, process.env.JWT_SECRET, {
      expiresIn: existingUser.role === "admin" ? "1h" : "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    return res.status(200).send({
      success: true,
      message: "Login successfully",
      user: tokenInfo,
      token,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
}

module.exports = { signupController, LoginController };
