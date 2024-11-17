const express = require("express");
const { addCharges, getCharges, receivePayments } = require("../Controllers/charges/chargesControllers");
const { verifyaccessToken, RolePermission, hasAccess } = require("../Middlewares/authMiddleware");
// const { addBlockValidation } = require("../validators/blockValidation");

const route = express.Router();

route.post("/create/charges", verifyaccessToken, RolePermission('DATA_ENTRY'), hasAccess('DATA_ENTRY', 'Add'), addCharges)
route.post("/receive/payment", verifyaccessToken, receivePayments)

route.get('/charges/:id', verifyaccessToken, RolePermission('DATA_ENTRY'), hasAccess('DATA_ENTRY', 'View'), getCharges)

module.exports = route