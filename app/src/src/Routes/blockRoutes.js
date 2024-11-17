const express = require("express");
const { addblock, getblocks, updateBlock, deleteBlock, getBlockByPhase } = require("../Controllers/block/blockController");
const { verifyaccessToken, RolePermission, hasAccess } = require("../Middlewares/authMiddleware");
const { isAdmin, isRightToAccess, isManager } = require("../Role/isAdmin");
const { addBlockValidation } = require("../validators/blockValidation");

const route = express.Router();

route.post("/block", verifyaccessToken, RolePermission('DATA_ENTRY'), hasAccess('DATA_ENTRY', 'Add'), addBlockValidation, addblock)
route.get("/block", verifyaccessToken, getblocks)
route.put("/block/:id", verifyaccessToken, RolePermission('DATA_ENTRY'), hasAccess('DATA_ENTRY', 'Edit'), updateBlock)
route.get("/block/:id", verifyaccessToken, getBlockByPhase)

// route.delete("/block/:id", verifyaccessToken, isAdmin, deleteBlock)

module.exports = route