document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");

  // 스크롤 이벤트
  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
});

function showAlert() {
  Swal.fire({
    icon: "error",
    title: "준비 중..",
    text: "아직 준비되지 않았습니다.",
  });
}

// 페이지 이동
function move(url) {
  axios
    .get(`/muuji/${url}`)
    .then((res) => {
      window.location.href = `/muuji/${url}`;
    })
    .catch((error) => {
      console.error(error);
    });
}

// 장바구니 총 수량
document.addEventListener("DOMContentLoaded", function () {
  axios
    .get("/detail/total")
    .then((response) => {
      const totalCount = response.data.totalCount;
      const numElement = document.getElementById("num");

      numElement.textContent = totalCount;
    })
    .catch((error) => {
      console.error("Failed to load cart total:", error);
    });
});
