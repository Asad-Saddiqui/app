const express = require("express");
const { addPhase, getPhases, updatePhase, deletePhase, searchPhaes, } = require("../Controllers/phase/phaseController");
const { addPhaseValidation } = require("../validators/phaseValidation");
const { verifyaccessToken, RolePermission, hasAccess } = require("../Middlewares/authMiddleware");
const { isAdmin, isRightToAccess, isManager } = require("../Role/isAdmin");

const route = express.Router();

route.post("/phase", verifyaccessToken, RolePermission('DATA_ENTRY'), hasAccess('DATA_ENTRY', 'Add'), addPhaseValidation, addPhase)
route.get("/phase", verifyaccessToken, getPhases)
route.put("/phase/:id", verifyaccessToken, RolePermission('DATA_ENTRY'), hasAccess('DATA_ENTRY', 'Edit'), updatePhase)
route.delete("/phase/:id", verifyaccessToken, RolePermission('ADMIN'), hasAccess('ADMIN', 'Delete'), deletePhase)

module.exports = route