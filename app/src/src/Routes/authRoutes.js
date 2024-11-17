const express = require("express");
const { login, signup, getUsers, verify, resendOtp, forgotPassword, resetPassword, getUserByID, assignPermissions, getPermissions } = require("../Controllers/auth/authController");
const { signupValidation } = require("../validators/signupValidation");
const { verifyotpToken, resetauthToken, verifyaccessToken, RolePermission, hasAccess, } = require("../Middlewares/authMiddleware");

const route = express.Router();

route.post("/login", login)
route.post("/add/user", verifyaccessToken, RolePermission('ADMIN'), hasAccess('ADMIN', 'Add'), signupValidation, signup)
route.get("/permission", verifyaccessToken, RolePermission('ADMIN'), getPermissions)
route.get("/get/user", verifyaccessToken, RolePermission('ADMIN'), getUsers)
route.get("/get/user/:id", verifyaccessToken, RolePermission('ADMIN'), getUserByID)
route.put("/permission/user/:id", verifyaccessToken, RolePermission('ADMIN'), hasAccess('ADMIN', 'Edit'), assignPermissions)

route.post("/verify-otp", verifyotpToken, verify)
route.post('/send-otp', resendOtp);
route.post('/forgot-password', forgotPassword);
route.post('/reset-password', verifyotpToken, verify, resetPassword);

module.exports = route