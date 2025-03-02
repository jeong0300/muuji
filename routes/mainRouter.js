const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/", mainController.moveMain);
router.get("/detail/:id", mainController.moveDetail);
router.get("/:url", mainController.move);

module.exports = router;
