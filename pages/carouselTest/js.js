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
  { content: "A0", queue: "1" },
  { content: "A1", queue: "2" },
  { content: "A2", queue: "3" },
  { content: "A3", queue: "4" },
  { content: "A4", queue: "5" },
  { content: "A5", queue: "6" },
  { content: "A6", queue: "7" },
  { content: "A7", queue: "8" },
  { content: "A8", queue: "9" },
  { content: "A9", queue: "10" },
];

const activeSlideQuantity = 3;
const renderContainer = document.getElementsByClassName("render_ctn")[0];
const renderItems = renderContainer.getElementsByClassName("render_item_ctn");

function defaultRenderItems() {
  for (let i = 0; i < renderItems.length; i++) {
    renderItems[i].innerHTML = dataList[i].content;
  }
}

defaultRenderItems();

// Tìm index đầu hoặc cuối mảng đang render, để xác định item nào trong mảng gốc cần hiện tiếp theo
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

defaultRenderItems();

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
    let dataListIndex = anchorIndex + i - (activeSlideQuantity - 1);
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
//   const lastRenderItem = renderItems[renderItems.length - 1].innerHTML;
//   // console.log("lastRenderItem: ", lastRenderItem);
//   let anchorIndex = "";
//   for (let i = 0; i < dataList.length; i++) {
//     if (dataList[i] === lastRenderItem) {
//       anchorIndex = i;
//       // console.log("anchorIndex: ", anchorIndex);
//       break;
//     }
//   }
//   for (let i = renderItems.length - 1; i >= 0; i--) {
//     let dataListIndex = i + anchorIndex;
//     if (dataListIndex >= dataList.length) {
//       dataListIndex = dataListIndex - dataList.length;
//     }
//     renderItems[i].innerHTML = dataList[dataListIndex];
//     // console.log("renderItems[", i, "].innerHTML: ", renderItems[i].innerHTML);
//   }
// }, 2000);
