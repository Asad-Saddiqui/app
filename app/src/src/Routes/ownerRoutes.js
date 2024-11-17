const express = require("express");
const { verifyaccessToken, RolePermission, hasAccess } = require("../Middlewares/authMiddleware");
const { isAdmin, isRightToAccess, isManager } = require("../Role/isAdmin");
const { addOwners, getOwners, updateOwner } = require("../Controllers/Owner/OwnerController");
const { ownerValidationRules } = require("../validators/OwnerValidation");
const route = express.Router();


route.post("/owner", verifyaccessToken, RolePermission('DATA_ENTRY'), hasAccess('DATA_ENTRY', 'Add'), ownerValidationRules(), addOwners)
route.get('/owner', verifyaccessToken, getOwners)
route.put('/owner/:id', verifyaccessToken, updateOwner)

// 

module.exports = route