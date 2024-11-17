const express = require("express");
const { addChargeType, getChargeTypes } = require("../Controllers/chargeType/chargeTypeControllers");
const { verifyaccessToken, RolePermission, hasAccess } = require("../Middlewares/authMiddleware");
// const { addBlockValidation } = require("../validators/blockValidation");

const route = express.Router();

route.post("/create/chargeType", verifyaccessToken, RolePermission('DATA_ENTRY'), hasAccess('DATA_ENTRY', 'Add'), addChargeType)

route.get('/get/chargeType', verifyaccessToken, RolePermission('DATA_ENTRY'), hasAccess('DATA_ENTRY', 'View'), getChargeTypes)

module.exports = route