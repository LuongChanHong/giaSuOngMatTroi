// Mảng dữ liệu gốc
const dataList = [
  { content: "A0" },
  { content: "A1" },
  { content: "A2" },
  { content: "A3" },
  { content: "A4" },
  { content: "A5" },
  { content: "A6" },
  { content: "A7" },
  { content: "A8" },
  { content: "A9" },
];
const tutorList = [
  {
    name: "Nguyễn Văn A",
    ielts: "1.0",
    image: "/assets/demoImg/1.jpeg",
    vote: "31",
    number: "0",
  },
  {
    name: "Nguyễn Văn B",
    ielts: "2.0",
    image: "/assets/demoImg/2.jpg",
    vote: "32",
    number: "1",
  },
  {
    name: "Nguyễn Văn C",
    ielts: "3.0",
    image: "/assets/demoImg/3.jpg",
    vote: "33",
    number: "2",
  },
  {
    name: "Nguyễn Văn B",
    ielts: "4.0",
    image: "/assets/demoImg/4.jpg",
    vote: "34",
    number: "3",
  },
  {
    name: "Nguyễn Văn D",
    ielts: "5.0",
    image: "/assets/demoImg/5.jpeg",
    vote: "35",
    number: "4",
  },
  {
    name: "Nguyễn Văn E",
    ielts: "6.0",
    image: "/assets/demoImg/6.jpg",
    vote: "36",
    number: "5",
  },
  {
    name: "Nguyễn Văn F",
    ielts: "7.0",
    image: "/assets/demoImg/7.jpg",
    vote: "37",
    number: "6",
  },
  {
    name: "Nguyễn Văn G",
    ielts: "8.0",
    image: "/assets/demoImg/8.jpg",
    vote: "38",
    number: "7",
  },
  {
    name: "Nguyễn Văn H",
    ielts: "9.0",
    image: "/assets/demoImg/9.jpg",
    vote: "39",
    number: "8",
  },
  {
    name: "Nguyễn Văn I",
    ielts: "10.0",
    image: "/assets/demoImg/10.jpg",
    vote: "40",
    number: "9",
  },
];
let screenWidth = document.body.clientWidth;
const pcScreen = 1024;
let activeSlideQuantity = screenWidth >= pcScreen ? 3 : 2;
const buttonDelayTime = 200;
const autoSlideDelayTime = 4000;
let _activeSlideQuantity = activeSlideQuantity - 1;

const renderContainer = document.getElementsByClassName(
  "carousel_slides_render"
)[0];
const renderItems = renderContainer.getElementsByClassName(
  "carousel_slide_item"
);
const slideRightButton = document.getElementsByClassName("carousel_r_btn")[0];
const slideLeftButton = document.getElementsByClassName("carousel_l_btn")[0];

// {
//   name: "Nguyễn Văn I",
//   ielts: "10.0",
//   image: "/assets/demoImg/10.jpg",
//   vote: "40",
//   number:"9"
// }
// HÀM TẠO HTML CAROUSEL ITEM
function carouselItem(item) {
  let carouselItem = `
    <div class="carousel_item_ctn" data-number="${item.number}">
      <div class="carousel_item_img" style="background-image: url(${item.image});">
        <div class="item_img_ielts">IELTS ${item.ielts}</div>
      </div>
      <div class="carousel_item_intro">
        <div class="item_intro_name">
          <p>${item.name}</p>
        </div>
        <div class="item_intro_ctt">
          <div class="item_intro_txt">
            listening, speaking, reading, writing 1.0
          </div>
          <div class="item_intro_txt">
            Dạy thành công 3 lớp
          </div>
          <div class="item_intro_txt">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error
          </div>
        </div>
        <div class="item_intro_vote">
          <div class="intro_star_group">
            <div class="intro_star">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star"
                  class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512">
                  <path fill="currentColor"
                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
                  </path>
                </svg>
            </div>
            <div class="intro_star">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star"
                  class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512">
                  <path fill="currentColor"
                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
                  </path>
                </svg>
            </div>
            <div class="intro_star">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star"
                  class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512">
                  <path fill="currentColor"
                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
                  </path>
                </svg>
            </div>
            <div class="intro_star">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star"
                  class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512">
                  <path fill="currentColor"
                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
                  </path>
                </svg>
            </div>
            <div class="intro_star">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star"
                  class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512">
                  <path fill="currentColor"
                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
                  </path>
                </svg>
            </div>
          </div>
          <div class="intro_vote_txt">
            <p>(<span>${item.vote}</span> vote)</p>
          </div>
        </div>
      </div>
    </div>
  `;
  return carouselItem;
}

// TẠO CÁC ITEM CAROUSEL CẦN HIỂN THỊ THEO activeSlideQuantity
function renderCarouselItem() {
  let renderHTML = "";
  for (let i = 0; i < activeSlideQuantity; i++) {
    renderHTML += `<div class="carousel_slide_item activeSlide"></div>`;
  }
  renderContainer.innerHTML = renderHTML;
}
renderCarouselItem();

// HIỆN MẶC ĐỊNH CÁC SLIDE BAN ĐẦU
function defaultRenderItems() {
  for (let i = 0; i < renderItems.length; i++) {
    renderItems[i].innerHTML = carouselItem(tutorList[i]);
  }
}
defaultRenderItems();

// TÌM INDEX ĐẦU/ CUỐI MẢNG ĐANG RENDER, XÁC ĐỊNH ITEM NÀO CỦA MẢNG GỐC CẦN HIỆN TIẾP THEO
function anchorIndexHandler(lastOrFirst) {
  let renderItem = "";
  switch (lastOrFirst) {
    case "first":
      renderItem = renderItems[0]
        .getElementsByClassName("carousel_item_ctn")[0]
        .getAttribute("data-number");
      // console.log("first renderItem: ", renderItem);
      break;
    case "last":
      renderItem = renderItems[renderItems.length - 1]
        .getElementsByClassName("carousel_item_ctn")[0]
        .getAttribute("data-number");
      // console.log("last renderItem: ", renderItem);
      break;
    default:
      console.log("error::anchorIndexHandler");
      break;
  }
  for (let i = 0; i < tutorList.length; i++) {
    if (tutorList[i].number === renderItem) {
      // console.log("anchorIndex: ", i);
      return i;
    }
  }
}

// Hiện lại các slide mặc định sau khi đếm các dot button
defaultRenderItems();

// HÀM XỬ LÍ ACTIVE CHO CÁC SLIDE
function handleActiveSlide(activeIndex, activeContent) {
  renderItems[activeIndex].classList.remove("activeSlide");
  setTimeout(() => {
    renderItems[activeIndex].classList.add("activeSlide");
  }, buttonDelayTime);
  setTimeout(() => {
    renderItems[activeIndex].innerHTML = activeContent;
  }, buttonDelayTime);
}

// CÁC XỬ LÝ TRONG NÚT QUA PHẢI
slideRightButton.addEventListener("click", () => {
  // Tính cột mốc item cuối mảng đang hiện
  let anchorIndex = anchorIndexHandler("last");
  // Gán nội dung cho item cuối của mảng đang hiện trước
  for (let i = renderItems.length - 1; i >= 0; i--) {
    // Tính index cần lấy nội dung mới để gán vào item hiện
    let dataListIndex = i + anchorIndex;
    // Nếu index > length mảng gốc, -= length để lấy index đầu mảng gốc 0,1,2,...
    if (dataListIndex >= tutorList.length) {
      dataListIndex = dataListIndex - tutorList.length;
    }
    handleActiveSlide(i, carouselItem(tutorList[dataListIndex]));
    // console.log("renderItems[", i, "].innerHTML: ", renderItems[i].innerHTML);
  }
  // console.log("R RUN");
});

// CÁC XỬ LÝ TRONG NÚT QUA TRÁI
slideLeftButton.addEventListener("click", () => {
  // Tính cột mốc item đầu mảng đang hiện
  let anchorIndex = anchorIndexHandler("first");
  // Gán nội dung cho item đầu của mảng đang hiện trước
  for (let i = 0; i < renderItems.length; i++) {
    // Tính index cần lấy nội dung mới để gán vào item hiện
    let dataListIndex = anchorIndex + i - _activeSlideQuantity;
    // Nếu index âm, + length để lấy index cuối mảng gốc 0,1,2,...
    if (dataListIndex < 0) {
      dataListIndex = tutorList.length + dataListIndex;
    }
    handleActiveSlide(i, carouselItem(tutorList[dataListIndex]));
    // console.log("renderItems[", i, "].innerHTML: ", renderItems[i].innerHTML);
  }
  // console.log("L RUN");
});

// CÁC XỬ LÝ AUTO SLIDE
function autoSlide() {
  setInterval(() => {
    // Nội dung như code nút sang phải
    let anchorIndex = anchorIndexHandler("last");
    for (let i = renderItems.length - 1; i >= 0; i--) {
      let dataListIndex = i + anchorIndex;
      if (dataListIndex >= tutorList.length) {
        dataListIndex = dataListIndex - tutorList.length;
      }
      handleActiveSlide(i, carouselItem(tutorList[dataListIndex]));
      // console.log("renderItems[", i, "].innerHTML: ", renderItems[i].innerHTML);
    }
  }, autoSlideDelayTime);
}
autoSlide();
