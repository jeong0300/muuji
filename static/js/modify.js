// 페이지 로드 시 이미지 상태 확인
window.onload = function () {
  const preview = document.getElementById("preview");
  const label = document.querySelector(".image-upload span");
  const imageUpload = document.querySelector(".image-upload");

  // 이미 이미지가 존재하는 경우
  if (preview.src && preview.src.trim() !== "" && preview.src !== "undefined") {
    preview.style.display = "block";
    label.style.display = "none";
    imageUpload.style.border = "2px solid transparent";
  } else {
    preview.style.display = "none";
    label.style.display = "block";
    imageUpload.style.border = "2px dashed #ccc";
  }
};

async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post("/admin/uploadImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.imageUrl) {
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

// 파일 선택 후 미리보기 & 업로드 기능
async function previewImage(event) {
  const file = event.target.files[0];
  const preview = document.getElementById("preview");
  const label = document.querySelector(".image-upload span");
  const imageUpload = document.querySelector(".image-upload");

  if (file) {
    try {
      const uploadedImageUrl = await uploadImage(file);

      if (uploadedImageUrl) {
        preview.src = uploadedImageUrl;
        preview.style.display = "block";
        label.style.display = "none";
        imageUpload.style.border = "2px solid transparent";
        preview.dataset.imageUrl = uploadedImageUrl;
      } else {
        alert("이미지 업로드 실패");
      }
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생", error);
      alert("이미지 업로드 실패");
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    preview.style.display = "none";
    label.style.display = "block";
    imageUpload.style.border = "2px dashed #ccc";
  }
}

async function previewImage(event) {
  const file = event.target.files[0];
  const preview = document.getElementById("preview");
  const label = document.querySelector(".image-upload span");
  const imageUpload = document.querySelector(".image-upload");

  if (file) {
    try {
      const uploadedImageUrl = await uploadImage(file);

      if (uploadedImageUrl) {
        preview.src = uploadedImageUrl;
        preview.style.display = "block";
        label.style.display = "none";
        imageUpload.style.border = "2px solid transparent";
        preview.dataset.imageUrl = uploadedImageUrl;
      } else {
        alert("이미지 업로드 실패");
      }
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생", error);
      alert("이미지 업로드 실패");
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    preview.style.display = "none";
    label.style.display = "block";
    imageUpload.style.border = "2px dashed #ccc";
  }
}

async function modifyProduct(id) {
  const preview = document.getElementById("preview");
  let imageUrl = preview.dataset.imageUrl;

  if (!imageUrl) {
    imageUrl = preview.src;
  }

  const form = document.forms["updateData"];
  const data = {
    id: id,
    name: form["name"].value,
    price: form["price"].value,
    category: form["category"].value,
    detail: form["detail"].value,
    image: imageUrl,
  };

  axios({
    method: "put",
    url: `/admin/update/${id}`,
    data: data,
  })
    .then((res) => {
      alert("수정 성공!");
      window.location.href = "/";
    })
    .catch((e) => {
      alert("수정 실패:", e);
    });
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
