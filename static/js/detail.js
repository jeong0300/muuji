function showAlert() {
  Swal.fire({
    icon: "error",
    title: "준비 중..",
    text: "아직 준비되지 않았습니다.",
  });
}

// 텍스트 애니메이션 시간 및 딜레이 설정
document.addEventListener("DOMContentLoaded", function () {
  const textElements = document.querySelectorAll(
    ".text4, .text5, .text6, .text7"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("text-visible")
        ) {
          setTimeout(() => {
            entry.target.classList.add("text-visible");
          }, index * 300);
        }
      });
    },
    { threshold: 0.5 }
  );

  textElements.forEach((el) => observer.observe(el));
});

function addcart(id) {
  axios({
    method: "post",
    url: `/detail/addCart/${id}`,
    data: data,
  }).then((res) => {});
}
