const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
 
console.log(req);

  

  return

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
   console.log(decoded);
   
    
   
  });
};

module.exports = protect;
