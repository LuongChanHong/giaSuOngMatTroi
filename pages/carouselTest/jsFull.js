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
const autoSlideDelayTime = 2000;

const _activeSlideQuantity = activeSlideQuantity - 1;
const dotButtons = document.getElementsByClassName("dot_btn");
const renderContainer = document.getElementsByClassName("render_ctn")[0];
const renderItems = renderContainer.getElementsByClassName("render_item_ctn");

// TẠO CÁC ITEM CAROUSEL CẦN HIỂN THỊ THEO activeSlideQuantity
function renderCarouselItem() {
  let renderHTML = "";
  for (let i = 0; i < activeSlideQuantity; i++) {
    renderHTML += `<div class="render_item_ctn activeSlide"></div>`;
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

// ĐẾM SỐ DOT BUTTON
let dotButtonQuantity = 1;
function dotButtonCounter() {
  do {
    isReturn = false;
    dotButtonQuantity = dotButtonQuantity + 1;

    // Cho chạy thử đếm số lần cần chạy để quay lại từ đầu mảng dữ liệu gốc
    let anchorIndex = anchorIndexHandler("last");
    for (let i = renderItems.length - 1; i >= 0; i--) {
      // Xử lí index, nếu > length mảng gốc thì cần - length đó để lấy index 0,1,2,...
      let dataListIndex = i + anchorIndex;
      if (dataListIndex >= dataList.length) {
        dataListIndex = dataListIndex - dataList.length;
      }
      renderItems[i].innerHTML = dataList[dataListIndex].content;
      // console.log("renderItems[", i, "].innerHTML: ", renderItems[i].innerHTML);
    }

    // Nếu item đang hiện giống như phần tử 0 mảng dữ liệu gốc => đã biết được cần bao nhiêu dot button
    for (let i = renderItems.length - 1; i >= 0; i--) {
      if (renderItems[i].innerHTML === dataList[0].content) {
        // console.log("RUN");
        // console.log("renderItems[", i, "].innerHTML: ", renderItems[i].innerHTML);
        isReturn = true;
        break;
      }
    }
  } while (isReturn == false);
  console.log("dotButtonQuantity: ", dotButtonQuantity);
}
dotButtonCounter();

// RENDER CÁC NÚT DOT BUTTON CỦA CAROUSEL
function renderDotButton() {
  let dotButtonContainer = document.getElementsByClassName("dot_btn_ctn")[0];
  let dotButtonContainer_content = ``;
  for (let i = 0; i < dotButtonQuantity; i++) {
    dotButtonContainer_content += `<div class="dot_btn"></div>`;
  }
  dotButtonContainer.innerHTML = dotButtonContainer_content;
  // Mặc định dot button đầu tiên active
  dotButtons[0].classList.add("active_dot");
}
renderDotButton();

// Hiện lại các slide mặc định sau khi đếm các dot button
defaultRenderItems();

// CHIA CÁC ITEM VÀO CÁC MẢNG NHỎ, SAU NÀY SẼ HIỆN TƯƠNG ỨNG KHI NHẤN DOT BUTTON
let eleWrapInDotButton = [];
function shareDataInDotButton() {
  // Dự vào số lượng dotButtonQuantity để tạo ra bao nhiêu mảng tương ứng (để chứa item sẽ hiện)
  for (let i = 0; i < dotButtonQuantity; i++) {
    eleWrapInDotButton.push([]);
  }
  let dataListIndex = 0;
  // VD activeSlideQuantity LÀ 3, dotButtonQuantity LÀ 5, THÌ MỖI DOT CHỨA 3 ITEM
  for (let i = 0; i < dotButtonQuantity; i++) {
    for (let j = 0; j < activeSlideQuantity; j++) {
      if (dataListIndex >= 0) {
        eleWrapInDotButton[i].push(dataList[dataListIndex]);
      } else {
        let _dataListIndex = dataListIndex + dataList.length;
        eleWrapInDotButton[i].push(dataList[_dataListIndex]);
      }
      // Tăng để lấy phần tử tiếp theo push vào eleWrapInDotButton
      dataListIndex++;
      // Xử lí index, nếu > length mảng gốc thì cần - length đó để lấy index 0,1,2,...
      if (dataListIndex >= dataList.length) {
        dataListIndex = dataListIndex - dataList.length;
      }
    }
    // Sau mỗi activeSlideQuantity(3,4,...) item, item cuối là item đầu của dot tiếp theo VD: [0,1,2][2,3,4]
    // Nên cần lùi lại 1 index
    dataListIndex = dataListIndex - 1;
  }
  console.log("eleWrapInDotButton:", eleWrapInDotButton);
  // console.log("eleWrapInDotButton[0][2].content:", eleWrapInDotButton[0][2].content);
}
shareDataInDotButton();

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

// XỬ LÍ ACTIVE DOT BUTTON
function handleActiveDotButton(activeDotButton) {
  for (let i = 0; i < dotButtons.length; i++) {
    let dotButton = dotButtons[i];
    if (dotButton.classList.contains("active_dot")) {
      dotButton.classList.remove("active_dot");
    }
  }
  activeDotButton.classList.add("active_dot");
}

function autoActiveDotButton() {
  let activeButtonIndex;
  // Nếu item index 0 mảng đang hiện giống phần tử đầu của mảng con nào của eleWrapInDotButton,
  // thì mảng con đó đang active, lưu lại index i để set active
  for (let i = 0; i < eleWrapInDotButton.length; i++) {
    if (renderItems[0].innerHTML == eleWrapInDotButton[i][0].content) {
      activeButtonIndex = i;
      break;
    }
  }
  // Vì index 0 (3 item đầu eleWrapInDotButton) mặc định active, nên cần tăng lên 1 cho đúng
  activeButtonIndex += 1;
  if (activeButtonIndex >= eleWrapInDotButton.length) {
    activeButtonIndex -= eleWrapInDotButton.length;
  }
  handleActiveDotButton(dotButtons[activeButtonIndex]);
  console.log("activeButtonIndex:", activeButtonIndex);
}

// GÁN SỰ KIỆN SLICK CHO DOT BUTTON, THAY ĐỔI NỘI DUNG SLIDE HIỂN THỊ
for (let i = 0; i < dotButtons.length; i++) {
  let dotButton = dotButtons[i];
  dotButton.addEventListener("click", () => {
    for (let j = 0; j < eleWrapInDotButton[i].length; j++) {
      handleActiveSlide(j, eleWrapInDotButton[i][j].content);
    }
  });
}

// CÁC XỬ LÝ TRONG NÚT QUA PHẢI
document.getElementsByClassName("r_btn")[0].addEventListener("click", () => {
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
  autoActiveDotButton();
  // console.log("R RUN");
});

// CÁC XỬ LÝ TRONG NÚT QUA TRÁI
document.getElementsByClassName("l_btn")[0].addEventListener("click", () => {
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
  autoActiveDotButton();
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

    autoActiveDotButton();
  }, autoSlideDelayTime);
}
autoSlide();
