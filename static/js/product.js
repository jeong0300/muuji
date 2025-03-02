// 상세 페이지로 이동
function moveDetail(id) {
  axios
    .get(`/muuji/detail/${id}`)
    .then((response) => {
      window.location.href = `/muuji/detail/${id}`;
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
    });
}
