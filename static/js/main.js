function showAlert() {
  Swal.fire({
    icon: "error",
    title: "준비 중..",
    text: "아직 준비되지 않았습니다.",
  });
}

// 스크롤 이동
document.addEventListener("DOMContentLoaded", function () {
  const scrollLeftButton = document.getElementById("scrollLeft");
  const scrollRightButton = document.getElementById("scrollRight");
  const productContainer = document.getElementById("productContainer");

  if (scrollLeftButton && scrollRightButton && productContainer) {
    scrollLeftButton.addEventListener("click", function () {
      smoothScroll(productContainer, -1200);
    });

    scrollRightButton.addEventListener("click", function () {
      smoothScroll(productContainer, 1200);
    });
  }

  function smoothScroll(element, distance) {
    const start = element.scrollLeft;
    const end = start + distance;
    const duration = 700;
    let startTime = null;

    function scrollAnimation(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      element.scrollLeft = start + (end - start) * progress;

      if (elapsedTime < duration) {
        requestAnimationFrame(scrollAnimation);
      }
    }

    requestAnimationFrame(scrollAnimation);
  }
});

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
