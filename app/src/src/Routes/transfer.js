const express = require("express");
const { verifyaccessToken, RolePermission, hasAccess } = require("../Middlewares/authMiddleware");
const { TransferMemberShip, TrackTransfer, updateTransfer, TrackTransferAdmin, getTransferDataById, search_membership_track } = require("../Controllers/Transfer/transferController");

const route = express.Router();

route.post("/transfer", verifyaccessToken, RolePermission('DATA_ENTRY'), TransferMemberShip)
route.post("/transfer/update", verifyaccessToken, RolePermission('DATA_ENTRY'), updateTransfer)
route.post("/track/transfer", verifyaccessToken, RolePermission('MANAGER', 'ADMIN'), TrackTransfer)
route.post("/track/transfer/admin", verifyaccessToken, TrackTransferAdmin)
route.get("/transfer/application-form/:id/:fileId", verifyaccessToken, getTransferDataById)
route.post("/transfer/search", verifyaccessToken, RolePermission('DATA_ENTRY'), search_membership_track)
module.exports = route