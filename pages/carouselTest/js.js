const imgList = [
  "img/1.jpeg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpeg",
  "img/6.jpg",
  "img/7.jpg",
  "img/8.jpg",
  "img/9.jpg",
  "img/10.jpg",
];
// Mảng dử liệu gốc
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

const activeSlideQuantity = 4;
const _activeSlideQuantity = activeSlideQuantity - 1;
console.log("_activeSlideQuantity:", _activeSlideQuantity);
const renderContainer = document.getElementsByClassName("render_ctn")[0];
const renderItems = renderContainer.getElementsByClassName("render_item_ctn");

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

// ĐẾM SỐ DOT BUTTON
let dotButtonQuantity = 1;
do {
  isReturn = false;
  dotButtonQuantity = dotButtonQuantity + 1;

  let anchorIndex = anchorIndexHandler("last");
  for (let i = renderItems.length - 1; i >= 0; i--) {
    let dataListIndex = i + anchorIndex;
    if (dataListIndex >= dataList.length) {
      dataListIndex = dataListIndex - dataList.length;
    }
    renderItems[i].innerHTML = dataList[dataListIndex].content;
    // console.log("renderItems[", i, "].innerHTML: ", renderItems[i].innerHTML);
  }

  for (let i = renderItems.length - 1; i >= 0; i--) {
    if (renderItems[i].innerHTML === dataList[0].content) {
      // console.log("RUN");
      // console.log("dataList[0].content: ", dataList[0].content);
      // console.log("renderItems[", i, "].innerHTML: ", renderItems[i].innerHTML);
      isReturn = true;
      break;
    }
  }
} while (isReturn == false);
console.log("dotButtonQuantity: ", dotButtonQuantity);

// RENDER CÁC NÚT PAGINATION CỦA CAROUSEL
let dotButtonContainer = document.getElementsByClassName("dot_btn_ctn")[0];
let dotButtonContainer_content = ``;
for (let i = 0; i < dotButtonQuantity; i++) {
  dotButtonContainer_content += `<div class="dot_btn"></div>`;
}
dotButtonContainer.innerHTML = dotButtonContainer_content;

// Hiện lại các slide mặc định sau khi đếm các dot button
defaultRenderItems();

// CHIA CÁC ITEM VÀO CÁC MẢNG NHỎ, SAU NÀY SẼ HIỆN TƯƠNG ỨNG KHI NHẤN DOT BUTTON
let eleWrapInDotButton = [];
for (let i = 0; i < dotButtonQuantity; i++) {
  eleWrapInDotButton.push([]);
}
let dataListIndex = 0;
for (let i = 0; i < dotButtonQuantity; i++) {
  for (let j = 0; j < activeSlideQuantity; j++) {
    if (dataListIndex >= 0) {
      eleWrapInDotButton[i].push(dataList[dataListIndex]);
    } else {
      let _dataListIndex = dataListIndex + dataList.length;
      eleWrapInDotButton[i].push(dataList[_dataListIndex]);
    }
    dataListIndex = dataListIndex + 1;
    if (dataListIndex >= dataList.length) {
      dataListIndex = dataListIndex - dataList.length;
    }
  }
  dataListIndex = dataListIndex - 1;
}
console.log("eleWrapInDotButton:", eleWrapInDotButton);
// console.log("eleWrapInDotButton[0][2].content:", eleWrapInDotButton[0][2].content);

// GÁN SỰ KIỆN SLICK CHO DOT BUTTON, THAY ĐỔI NỘI DUNG SLIDE HIỂN THỊ
const dotButtons = document.getElementsByClassName("dot_btn");
for (let i = 0; i < dotButtons.length; i++) {
  let dotButton = dotButtons[i];
  dotButton.addEventListener("click", () => {
    for (let j = 0; i < eleWrapInDotButton[i].length; j++) {
      renderItems[j].innerHTML = eleWrapInDotButton[i][j].content;
    }
  });
}

// CÁC XỬ LÝ TRONG NÚT QUA PHẢI
document.getElementsByClassName("r_btn")[0].addEventListener("click", () => {
  let anchorIndex = anchorIndexHandler("last");

  for (let i = renderItems.length - 1; i >= 0; i--) {
    let dataListIndex = i + anchorIndex;
    if (dataListIndex >= dataList.length) {
      dataListIndex = dataListIndex - dataList.length;
    }
    renderItems[i].innerHTML = dataList[dataListIndex].content;
    console.log("renderItems[", i, "].innerHTML: ", renderItems[i].innerHTML);
  }
  console.log("R RUN");
});

// CÁC XỬ LÝ TRONG NÚT QUA TRÁI
document.getElementsByClassName("l_btn")[0].addEventListener("click", () => {
  let anchorIndex = anchorIndexHandler("first");

  for (let i = 0; i < renderItems.length; i++) {
    let dataListIndex = anchorIndex + i - _activeSlideQuantity;
    if (dataListIndex < 0) {
      dataListIndex = dataList.length + dataListIndex;
    }
    renderItems[i].innerHTML = dataList[dataListIndex].content;
    console.log("renderItems[", i, "].innerHTML: ", renderItems[i].innerHTML);
  }
  console.log("L RUN");
});

// CÁC XỬ LÝ AUTO SLIDE
// setInterval(() => {
//   let anchorIndex = anchorIndexHandler("last");

//   for (let i = renderItems.length - 1; i >= 0; i--) {
//     let dataListIndex = i + anchorIndex;
//     if (dataListIndex >= dataList.length) {
//       dataListIndex = dataListIndex - dataList.length;
//     }
//     renderItems[i].innerHTML = dataList[dataListIndex].content;
//     console.log("renderItems[", i, "].innerHTML: ", renderItems[i].innerHTML);
//   }
//   console.log("R RUN");
// }, 1000);
