const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// 데이터 가져오기
router.get("/", adminController.getAllProducts);

// 데이터 수정
router.get("/write/:id", adminController.updatePage);

// 이미지 업로드
router.post(
  "/uploadImage",
  adminController.upload.single("image"),
  adminController.uploadImage
);

// 데이터 중복 체크
router.post("/check", adminController.check);

// 데이터 등록
router.post("/addData", adminController.createRow);

// 데이터 삭제
router.delete("/delete/:id", adminController.deleteRow);

// 데이터 수정
router.put("/update/:id", adminController.dataUpdate);

module.exports = router;
