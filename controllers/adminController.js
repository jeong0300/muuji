const path = require("path");
const multer = require("multer");
const products = require("../models/adminModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = path.basename(file.originalname, ext);
    cb(null, filename + ext);
  },
});

const upload = multer({ storage: storage });

// 이미지 업로드 컨트롤러 함수
const uploadImage = (req, res) => {
  console.log("이미지 업로드 시작");
  if (!req.file) {
    console.log("이미지 파일이 없습니다.");
    return res.status(400).json({ message: "이미지 업로드 실패" });
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

// 수정 후 등록하기
const dataUpdate = async (req, res) => {
  await products.updateRow(req.body);
  res.send("200");
};

// 중복 체크하기
const check = async (req, res) => {
  const { name } = req.body;

  try {
    const isExist = await products.check(name);

    if (isExist) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("중복 체크 에러:", error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};

module.exports = {
  upload,
  uploadImage,
  getAllProducts,
  createRow,
  deleteRow,
  updatePage,
  dataUpdate,
  check,
};
