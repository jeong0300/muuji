const cart = require("../models/cartModel");

// 페이지로 이동
const moveCart = async (req, res) => {
  try {
    const product = await cart.getAllCart();

    // 총 가격
    const totalPrice = product.reduce(
      (sum, item) => sum + Number(item.price) * item.cnt,
      0
    );

    product.forEach((item) => {
      item.price = Number(item.price).toLocaleString();
    });

    res.render("cart", { product, totalPrice: totalPrice.toLocaleString() });
  } catch (error) {
    console.error("DB 조회 오류:", error);
  }
};

// 삭제하기
const deleteRow = async (req, res) => {
  await cart.deleteData(req.params.id);
  res.send("200");
};

module.exports = { moveCart, deleteRow };
