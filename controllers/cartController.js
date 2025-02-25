const cart = require("../models/cartModel");

// 페이지로 이동
const moveCart = async (req, res) => {
  try {
    const product = await cart;
    res.render("cart", { product });
  } catch (error) {
    console.error("DB 조회 오류:", error);
  }
};

module.exports = { moveCart };
