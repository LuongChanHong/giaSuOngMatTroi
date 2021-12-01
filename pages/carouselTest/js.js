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
const dataList = ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"];

const activeSlideQuantity = 3;
const renderContainer = document.getElementsByClassName("render_ctn")[0];
const renderItems = renderContainer.getElementsByClassName("render_item_ctn");
for (let i = 0; i < renderItems.length; i++) {
  renderItems[i].innerHTML = dataList[i];
}

// CÁC XỬ LÝ TRONG NÚT QUA PHẢI
document.getElementsByClassName("r_btn")[0].addEventListener("click", () => {
  const lastRenderItem = renderItems[renderItems.length - 1].innerHTML;
  console.log("lastRenderItem: ", lastRenderItem);

  let anchorIndex = "";
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i] === lastRenderItem) {
      anchorIndex = i;
      console.log("anchorIndex: ", anchorIndex);
      break;
    }
  }
  for (let i = renderItems.length - 1; i >= 0; i--) {
    let dataListIndex = i + anchorIndex;
    if (dataListIndex >= dataList.length) {
      dataListIndex = dataListIndex - dataList.length;
    }
    renderItems[i].innerHTML = dataList[dataListIndex];
    console.log("renderItems[", i, "].innerHTML: ", renderItems[i].innerHTML);
  }
  console.log("R RUN");
});

// CÁC XỬ LÝ TRONG NÚT QUA TRÁI
document.getElementsByClassName("l_btn")[0].addEventListener("click", () => {
  const firstRenderItem = renderItems[0].innerHTML;
  console.log("firstRenderItem: ", firstRenderItem);

  let anchorIndex = "";
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i] === firstRenderItem) {
      anchorIndex = i;
      console.log("anchorIndex: ", anchorIndex);
      break;
    }
  }
  for (let i = 0; i < renderItems.length; i++) {
    let dataListIndex = anchorIndex + i - (activeSlideQuantity - 1);
    if (dataListIndex < 0) {
      dataListIndex = dataList.length + dataListIndex;
    }
    renderItems[i].innerHTML = dataList[dataListIndex];
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
