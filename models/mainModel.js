const mysql = require("mysql2/promise");

// DB 연결
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "111111",
  database: "muujiuser",
});

const getAllProduct = async () => {
  try {
    const query = "SELECT * FROM products";
    const [rows] = await pool.query(query);

    return rows;
  } catch (error) {
    console.error("DB 조회 오류:", error);
  }
};

const moveDetail = async (id) => {
  const query = `SELECT * FROM products WHERE id = ${id}`;
  const [rows] = await pool.query(query);
  return rows;
};

module.exports = {
  getAllProduct,
  moveDetail,
};
