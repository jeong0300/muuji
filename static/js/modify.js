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

// 파일 선택 후 미리보기 & 업로드 기능
function previewImage(event) {
  const file = event.target.files[0];
  const preview = document.getElementById("preview");
  const label = document.querySelector(".image-upload span");
  const imageUpload = document.querySelector(".image-upload");

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
}

const modifyProduct = async (id) => {
  let imageUrl = document.getElementById("preview").src;

  // 새 이미지 업로드 후 URL 가져오기
  if (document.getElementById("imageInput").files.length > 0) {
    const uploadedUrl = await uploadImage();
    if (uploadedUrl) {
      imageUrl = uploadedUrl;
    }
  }

  const form = document.forms["updateData"];

  console.log(id);

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
    url: "/admin/update/:id",
    data: data,
  })
    .then((res) => {
      alert("수정 성공!");
      window.location.href = "/";
    })
    .catch((e) => {
      alert(e);
    });
};
