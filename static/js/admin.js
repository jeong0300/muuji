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

        uploadImage(file);
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

async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post("/admin/uploadImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.success) {
      document.getElementById("preview").dataset.imageUrl = res.data.imageUrl;
    } else {
      alert("이미지 업로드 실패");
    }
  } catch (error) {
    console.error("이미지 업로드 에러:", error);
    alert("이미지 업로드 중 오류 발생");
  }
}

// 상품 등록하기
const addData = async () => {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const detail = document.getElementById("detail").value;
  const category = document.querySelector(
    'input[name="category"]:checked'
  ).value;
  const image = document.getElementById("preview").dataset.imageUrl || null;

  axios({
    method: "post",
    url: "/admin/addData",
    data: { name, price, detail, image, category },
  })
    .then((res) => {
      console.log(res);
      alert("등록성공");
      window.location.reload();
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
