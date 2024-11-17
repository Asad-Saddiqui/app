const express = require("express");
const { verifyaccessToken, RolePermission, hasAccess } = require("../Middlewares/authMiddleware");
const { isAdmin, isRightToAccess, isManager } = require("../Role/isAdmin");
const { addMemberShip, fetchAllMemberships, fetchMembershipByid, importMembership, updateMembership } = require("../Controllers/memberShip/membershipControllsers");
const { validatePlotData, handleValidationErrors } = require("../validators/importDataValidations");
// const { ownerValidationRules } = require("../validators/OwnerValidation");
const route = express.Router();


route.post("/membership", verifyaccessToken, RolePermission('DATA_ENTRY'), hasAccess('DATA_ENTRY', 'Add'), addMemberShip)
route.get('/membership', verifyaccessToken, fetchAllMemberships)
route.get('/membership/:id', verifyaccessToken, fetchMembershipByid)
route.post('/import/memberships/', verifyaccessToken, importMembership)
route.post('/membership/update/:id', verifyaccessToken, updateMembership)

module.exports = route