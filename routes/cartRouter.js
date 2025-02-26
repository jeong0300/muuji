const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.moveCart);

// 데이터 삭제
router.delete("/delete/:id", cartController.deleteRow);

module.exports = router;
