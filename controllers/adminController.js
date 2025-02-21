const path = require("path");
const multer = require("multer");
const products = require("../models/adminModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 파일 저장 경로
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // 고유한 파일명 설정
  },
});

const upload = multer({ storage: storage });

// 이미지 업로드 컨트롤러 함수
const uploadImage = (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "파일 업로드 실패" });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, imageUrl });
};

// 등록하기
const createRow = async (req, res) => {
  await products.postProduct(req.body);
  res.send("200");
};

// 가져오기
const getAllProducts = async (req, res) => {
  try {
    const product = await products.getAllProduct();
    // console.log(product);
    res.render("admin", { product });
  } catch (error) {
    console.error("DB 조회 오류:", error);
  }
};

// 삭제하기
const deleteRow = async (req, res) => {
  await products.deleteData(req.params.id);
  res.send("200");
};

// 수정하기
const updatePage = async (req, res) => {
  const product = await products.getOne(req.params.id);
  console.log(product);
  res.render("modify", { product });
};

const dataUpdate = async (req, res) => {
  await products.updateRow(req.body);
  res.send("200");
};

module.exports = {
  upload,
  uploadImage,
  getAllProducts,
  createRow,
  deleteRow,
  updatePage,
  dataUpdate,
};
