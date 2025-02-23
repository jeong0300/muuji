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

// 상품 등록
const postProduct = async (data) => {
  try {
    const query = `INSERT INTO products (name, price, detail, image, category) VALUES (?, ?, ?, ?, ?)`;
    await pool.query(query, [
      data.name,
      data.price,
      data.detail,
      data.image,
      data.category,
    ]);
  } catch (errer) {
    console.error(errer);
  }
};

// 해당 로우 삭제하기
const deleteData = async (id) => {
  const query = `DELETE FROM products WHERE id = ?`;
  try {
    await pool.query(query, [id]);
    console;
  } catch (e) {
    console.log(e);
  }
};

// 해당 데이터 하나만
const getOne = async (id) => {
  const query = `SELECT * FROM products WHERE id = ${id}`;
  const [rows] = await pool.query(query);
  return rows;
};

// 해당 아이디를 가진 데이터 수정
const updateRow = async (data) => {
  const query = `UPDATE products SET name = ?, price = ?, image = ?, detail = ?, category = ? WHERE id = ?`;
  try {
    await pool.query(query, [
      data.name,
      data.price,
      data.image,
      data.detail,
      data.category,
      Number(data.id),
    ]);
  } catch (e) {
    console.log(e);
  }
};

// 중복 체크
const check = async (name) => {
  const query = `SELECT * FROM products WHERE name = ?;`;
  try {
    const [rows] = await pool.query(query, [name]);
    return rows.length > 0;
  } catch (err) {
    console.error("쿼리 오류:", err);
    throw err;
  }
};

module.exports = {
  getAllProduct,
  postProduct,
  deleteData,
  getOne,
  updateRow,
  check,
};
