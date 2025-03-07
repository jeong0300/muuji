// 파일 선택 후 미리보기 & 업로드 기능
async function previewImage(event) {
  const file = event.target.files[0];
  const preview = document.getElementById("preview");
  const label = document.querySelector(".image-upload span");
  const imageUpload = document.querySelector(".image-upload");

  // 이미지 업로드 후 URL 받아오기
  let uploadedImageUrl = "";
  try {
    uploadedImageUrl = await uploadImage(file);
  } catch (error) {
    console.error("이미지 업로드 중 오류 발생", error);
    alert("이미지 업로드 실패");
    return;
  }

  // 이미지 미리보기
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;

      const img = new Image();
      img.onload = function () {
        preview.style.display = "block";
        label.style.display = "none";
        imageUpload.style.border = "2px solid transparent";
      };
      img.onerror = function () {
        alert("이미지 로드에 실패했습니다.");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    preview.style.display = "none";
    label.style.display = "block";
    imageUpload.style.border = "2px dashed #ccc";
  }

  if (uploadedImageUrl) {
    preview.src = uploadedImageUrl;
  }
}

// 이미지 업로드
async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post("/admin/uploadImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.imageUrl) {
      const preview = document.getElementById("preview");
      preview.dataset.imageUrl = res.data.imageUrl;

      return res.data.imageUrl;
    } else {
      alert("이미지 업로드 실패");
      return "";
    }
  } catch (error) {
    console.error("이미지 업로드 에러:", error);
    alert("이미지 업로드 중 오류 발생");
    return "";
  }
}

// 이름 중복 확인
const check = async () => {
  const name = document.getElementById("name").value.trim();
  const nameAlert = document.getElementById("nameAlert");

  if (!name) {
    nameAlert.innerHTML = "<p class='red'>상품명을 입력하세요.</p>";
    return;
  }

  try {
    const res = await axios.post("/admin/check", { name });

    if (res.data.exists) {
      nameAlert.innerHTML = "<p class='red'>중복되는 상품명입니다.</p>";
    } else {
      nameAlert.innerHTML = "<p class='green'>사용 가능한 상품명입니다.</p>";
    }
  } catch (err) {
    console.error("중복 체크 중 오류 발생:", err);
    if (err.response && err.response.data) {
      nameAlert.innerHTML = `<p class='red'>${err.response.data.message}</p><br/>`;
    } else {
      nameAlert.innerHTML = "<p class='red'>서버 오류 발생</p><br/>";
    }
  }
};

const detailEditor = new toastui.Editor({
  el: document.querySelector("#detailEditor"),
  height: "170px",
  initialEditType: "wysiwyg",
  previewStyle: "vertical",
  initialValue: "상세 정보를 입력해주세요.",
});

// 상품 등록하기
function removeHTMLTags(str) {
  return str.replace(/<\/?[^>]+(>|$)/g, ""); // 태그를 제거
}

const addData = async () => {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const detail = detailEditor.getHTML();
  const cleanedDetail = removeHTMLTags(detail);
  const category = document.querySelector('select[name="category"]').value;

  const image = document.getElementById("preview").dataset.imageUrl || null;

  if (!name || !price || !detail || !cleanedDetail) {
    Swal.fire({
      icon: "error",
      text: "정보를 모두 기입해주세요",
    });
    return;
  }

  axios({
    method: "post",
    url: "/admin/addData",
    data: { name, price, detail: cleanedDetail, image, category },
  })
    .then((res) => {
      Swal.fire({
        title: "등록 완료되었습니다!",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    })
    .catch((e) => {
      console.log("에러 :", e);
    });
};

const deleteProduct = (id) => {
  axios({
    method: "delete",
    url: `/admin/delete/${id}`,
  })
    .then((res) => {
      window.location.reload();
    })
    .catch((e) => {
      console.log(e);
    });
};

const updatePage = (id) => {
  window.location.href = `/admin/write/${id}`;
};
