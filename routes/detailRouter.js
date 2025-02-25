const express = require("express");
const router = express.Router();
const detailController = require("../controllers/detailController");

router.get("/total", detailController.getCartTotalCount);
router.post("/addCart", detailController.addCart);

module.exports = router;
