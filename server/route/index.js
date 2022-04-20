const express = require("express");
const router = express.Router();

const ctrl = require("./ctrl");

// router.get("/logout", ctrl.logout);

router.get("/home", ctrl.getAddress);
router.get("/history", ctrl.getHistory);

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/keylogin", ctrl.keylogin);
router.post("/walletupdate", ctrl.Walletupdate);
router.post("/complete", ctrl.Postreceipt);
router.post("/master", ctrl.Master);

// router.delete("/delete", ctrl.iddelete);
module.exports = router;
