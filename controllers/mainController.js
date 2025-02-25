const products = require("../models/mainModel");

// 메인 페이지로 이동
const moveMain = async (req, res) => {
  try {
    const product = await products.getAllProduct();
    res.render("muuji", { product });
  } catch (error) {
    console.error("DB 조회 오류:", error);
  }
};

// detail 페이지로 이동
const moveDetail = async (req, res) => {
  const detail = await products.moveDetail(req.params.id);
  res.render("detail", { detail });
};

module.exports = { moveMain, moveDetail };
