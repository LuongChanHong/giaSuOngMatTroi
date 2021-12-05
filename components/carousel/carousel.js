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

const activeSlideQuantity = 3;
const buttonDelayTime = 200;
const autoSlideDelayTime = 4000;

const _activeSlideQuantity = activeSlideQuantity - 1;
const renderContainer = document.getElementsByClassName(
  "carousel_slides_render"
)[0];
const renderItems = renderContainer.getElementsByClassName(
  "carousel_slide_item"
);
const slideRightButton = document.getElementsByClassName("carousel_r_btn")[0];
const slideLeftButton = document.getElementsByClassName("carousel_l_btn")[0];

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
    renderItems[i].innerHTML = dataList[i].content;
  }
}
defaultRenderItems();

// TÌM INDEX ĐẦU/ CUỐI MẢNG ĐANG RENDER, XÁC ĐỊNH ITEM NÀO CỦA MẢNG GỐC CẦN HIỆN TIẾP THEO
function anchorIndexHandler(lastOrFirst) {
  let renderItem = "";
  switch (lastOrFirst) {
    case "first":
      renderItem = renderItems[0].innerHTML;
      // console.log("renderItem: ", renderItem);
      break;
    case "last":
      renderItem = renderItems[renderItems.length - 1].innerHTML;
      // console.log("renderItem: ", renderItem);
      break;
    default:
      console.log("error::anchorIndexHandler");
      break;
  }
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i].content === renderItem) {
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
    if (dataListIndex >= dataList.length) {
      dataListIndex = dataListIndex - dataList.length;
    }
    handleActiveSlide(i, dataList[dataListIndex].content);
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
      dataListIndex = dataList.length + dataListIndex;
    }
    handleActiveSlide(i, dataList[dataListIndex].content);
    // console.log("renderItems[", i, "].innerHTML: ", renderItems[i].innerHTML);
  }
  // console.log("L RUN");
});

// CÁC XỬ LÝ AUTO SLIDE
function autoSlide() {
  setInterval(() => {
    // Nội dung như code nút sang trai
    let anchorIndex = anchorIndexHandler("last");
    for (let i = renderItems.length - 1; i >= 0; i--) {
      let dataListIndex = i + anchorIndex;
      if (dataListIndex >= dataList.length) {
        dataListIndex = dataListIndex - dataList.length;
      }
      handleActiveSlide(i, dataList[dataListIndex].content);
      // console.log("renderItems[", i, "].innerHTML: ", renderItems[i].innerHTML);
    }
  }, autoSlideDelayTime);
}
autoSlide();
