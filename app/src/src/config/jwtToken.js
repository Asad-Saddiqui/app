const jwt = require("jsonwebtoken");
const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "3d" });
};

module.exports = { generateToken };
