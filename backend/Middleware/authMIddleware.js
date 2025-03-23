const jwt = require("jsonwebtoken");
const userModel = require("../Model/UserModel");

const protect = async (req, res, next) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) {
      return res.status(401).send({
        success: false,
        message: "you are not authrized" || err.message,
      });
    }
    if (decoded) {
      req.user = await userModel.findOne(decoded.user);
      next();
    }
  });
};

const admin = (req, res, next) => {

  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .send({ success: false, message: "Not Authorized as an admin" });
  }
};

module.exports = {protect , admin};
