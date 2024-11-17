const jwt = require("jsonwebtoken");

const generateOtpToken = (data) => {
    return jwt.sign(data, process.env.OTP_SECRET,{ expiresIn: "1h" });
};

module.exports = { generateOtpToken };
