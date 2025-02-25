const detail = require("../models/detailModel");

// 장바구니 추가
const addCart = async (req, res) => {
  try {
    const result = await detail.addCart(req.body.id);

    if (result === "increment") {
      return res.send("increment");
    }

    if (result === "added") {
      return res.send("added");
    }
  } catch (error) {
    console.error(error);
  }
};

// 장바구니 총 수량을 가져오는 함수
const getCartTotalCount = async (req, res) => {
  try {
    const totalCount = await detail.getCartTotalCount();

    res.send({ totalCount });
  } catch (error) {
    console.error("장바구니 총 수량 로드 실패:", error);
  }
};

module.exports = { addCart, getCartTotalCount };
