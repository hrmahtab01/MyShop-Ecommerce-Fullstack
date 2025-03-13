const jwt = require("jsonwebtoken");
const userModel = require("../Model/UserModel");

const protect = async (req, res, next) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) {
      return res
        .status(401)
        .send({
          success: false,
          message:  "you are not authrized" || err.message,
        });
    }
    if (decoded) {
      req.user = await userModel.findOne(decoded.user);
      next();
    }
  });
};

module.exports = protect;
