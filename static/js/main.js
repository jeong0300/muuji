function showAlert() {
  Swal.fire({
    icon: "error",
    title: "준비 중..",
    text: "아직 준비되지 않았습니다.",
  });
}

// 스크롤 이동
document.addEventListener("DOMContentLoaded", function () {
  const productImg = document.querySelector(".productImg");

  document.getElementById("scrollLeft").addEventListener("click", function () {
    productImg.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  });

  document.getElementById("scrollRight").addEventListener("click", function () {
    productImg.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  });
});
