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

    // console.log("DB에서 가져온 데이터:", rows);

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
// const getOne = async (userId) => {
//   const query = `SELECT * FROM users WHERE id = ${userId}`;
//   const [rows] = await pool.query(query);
//   // console.log("한 명", rows);
//   return rows;
// };

// // 해당 아이디를 가진 데이터 수정
// const updateRow = async (data) => {
//   const query = `UPDATE users SET name = ?, comment = ? WHERE id = ?`;
//   try {
//     await pool.query(query, [data.name, data.comment, Number(data.id)]);
//   } catch (e) {
//     console.log(e);
//   }
// };

module.exports = { getAllProduct, postProduct, deleteData };
