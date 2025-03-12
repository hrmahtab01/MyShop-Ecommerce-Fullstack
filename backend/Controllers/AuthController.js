const sendmail = require("../Helpers/Sendotpnodemailer");
const userModel = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const otp = require("../Helpers/RandomOtpGenerator");

async function signupController(req, res) {
  const { name, email, password, role } = req.body;

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



module.exports = { signupController };
