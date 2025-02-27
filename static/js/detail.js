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

// 장바구니 추가
let isAdding = false; // 전역 중복 방지 변수

async function addcart(productid) {
  if (isAdding) return;
  isAdding = true;

  try {
    const res = await axios.post("/detail/addCart", { id: productid });

    if (res.data === "increment") {
      const result = await Swal.fire({
        title: "이미 장바구니에 있는 상품입니다. 추가하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "추가하기",
        // 버튼 클릭 후 특정 작업 실행 (sweetAlert 옵션)
        preConfirm: async () => {
          if (isAdding) return;
          isAdding = true;

          try {
            await axios.post("/detail/addCart", { id: productid });
          } catch (error) {
            console.error("Second request failed:", error);
            await Swal.fire("추가 중 오류가 발생했습니다.", "", "error");
          } finally {
            isAdding = false;
          }
        },
      });

      if (result.isConfirmed) {
        await Swal.fire("장바구니에 추가되었습니다.", "", "success");
      }
    } else if (res.data === "added") {
      await Swal.fire({
        title: "장바구니에 추가되었습니다.",
        icon: "success",
      });
    } else {
      await Swal.fire({
        title: "다시 시도하여 주세요.",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Request failed:", error);
  } finally {
    isAdding = false;
    window.location.reload();
    scrollTo(0, 0);
  }
}
