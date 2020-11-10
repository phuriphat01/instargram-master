const addImagestoGallery = (res) => {
  // const สร้างตัวแปลค่าคงที่
  const gallery = document.querySelector(".gallery");
  let html = "";
  res.results.forEach((element) => {
    html += `
    <section class="photo">
    <header class="photo__header">
        <div class="photo__header-column">
        <a href="profile.html?username=${element.user.username}">
            <img class="photo__avatar" src="${element.user.profile_image.small}" />
</a>
        </div>
        <div class="photo__header-column">
        <a href="profile.html?username=${element.user.username}">
            <span class="photo__username">${element.user.username} </span>
</a>
        </div>

    </header>
    <div class="photo__file-container">
        <img class="photo__file" src="${element.urls.raw}  " />

    </div>
    <div class="photo__info">
        <div class="photo__icons">
            <span class="photo__icon">
                <i class="fa fa-heart-o heart fa-lg"></i>
            </span>
            <span class="photo__icon">
                <i class="fa fa-comment-o fa-lg"></i>
            </span>
        </div>
        <span class="photo__likes">${element.likes} like </span>
        <div class="photo__comments">
            <div class="photo__comment">
                <span class="photo__comment-author">${element.user.username} </span>${element.alt_description}

            </div>

        </div>

    </div>
</section>     
    `;
  });
  gallery.innerHTML = html;
};

const callAPI = async (keyword) => {
  try {
    console.log("keyword --> ", keyword);
    // res = reponseคำตอบ req = request คำถาม
    const response = await fetch("/api/searchPhotos", {
      // fetch ใช้ในการเรียกใช้ api
      // {} -> object [] -> array ()-> funtion
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword }),//JSON.stringify การแปลงข้อมูลข้อความเป็น json
    });
    const res = await response.json();
    //check response return from our API
    console.log("response ----> ", res);// console.log ปริ้นข้อความทั่วๆไปอยู่บน web console
    addImagestoGallery(res);
  } catch (error) {
    console.log("message error --->", error);
    //Do Something
  }
};

const removeAllPhoto = () => {
  const galleryElement = document.querySelector(".gallery");
  galleryElement.innerHTML = "";
};

const searchPhoto = (event) => {
  //= การกำหนดค่าให้กับตัวแปร ==เปรียบค่าที่ให้เท่ากัน2ฝั่งหรือเปล่า === เปรียบเทียบชนิดของค่าและชนิดข้อมูล
  const keyword = event.target.value;
  if (event.key === "Enter" && keyword) {
    // && เงื่อนไขจริงกับจริงถึงจะเป็นจริง ในที่นี้ keyword ต้องไม่ใช้ค่าว่าง
    removeAllPhoto();
    //5. Call API
    callAPI(keyword);
  }
};
const main = () => {
  // ค้นหาองค์ประกอบที่มีคลาสเท่ากับSearch แล้วเก็บไว้ในตัวแปล Element
  const inputElement = document.querySelector(".search");
  // ทำงานตามfuntionn
  inputElement.addEventListener("keydown", searchPhoto);
  //เพิ่มตัวที่คอยรับฟังเหตุการณ์ keydownที่เรากดลงที่และเลือกใช้ searchPhoto
};

main();
