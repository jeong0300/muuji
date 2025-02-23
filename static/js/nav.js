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

// 장바구니 상품 수
if (typeof window.shoppingCart === "undefined") {
  window.shoppingCart =
    JSON.parse(window.localStorage.getItem("shoppingCart")) || [];
}

const num = document.getElementById("num");

if (window.shoppingCart.length === 0) {
  num.innerText = 0;
} else {
  num.innerText = window.shoppingCart.length;
}

function showAlert() {
  Swal.fire({
    icon: "error",
    title: "준비 중..",
    text: "아직 준비되지 않았습니다.",
  });
}

function moveDetail(id) {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = `../html/bearCraftShopDetail.html?id=${id}`;
  }, 500);
}
