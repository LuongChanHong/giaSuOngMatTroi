// Tạo ra danh sách tất cả phần tử có thể hiện ra, chuyển đổi thành html
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
const dataList = ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"];

const activeSlideQuantity = 3;
const renderContainer = document.getElementsByClassName("render_ctn")[0];
// Mảng các item sẽ hiện trên màn hình, trường hợp đang sử dụng là 3.
const renderItems = renderContainer.getElementsByClassName("render_item_ctn");
// Mặc định gán innerHTML của 3 item hiện trên màn hình là 3 phần tử đầu của mảng gốc.
for (let i = 0; i < renderItems.length; i++) {
  renderItems[i].innerHTML = dataList[i];
}

// CÁC XỬ LÝ TRONG NÚT QUA PHẢI
document.getElementsByClassName("r_btn")[0].addEventListener("click", () => {
  // Lấy interHTML của item cuối mảng hiện trên màn hình, dùng xác định index dùng làm neo.
  const lastRenderItem = renderItems[renderItems.length - 1].innerHTML;
  // console.log("lastRenderItem: ", lastRenderItem);
  // Xác định, lưu trữ index mỏ neo, làm cột mốc thay đổi nội dung 3 item hiện lên màn hình.

  // trong TH này anchorIndex = 2.

  let anchorIndex = "";
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i] === lastRenderItem) {
      anchorIndex = i;
      console.log("anchorIndex: ", anchorIndex);
      break;
    }
  }
  // Duyệt ngược mảng item hiện lên màn hình, xác định item nào của mảng gốc sẽ hiện lên.
  for (let i = renderItems.length - 1; i >= 0; i--) {
    // Xác định và điều chỉnh index item mảng gốc sẽ hiện lên.

    // trong TH này, tất cả item mảng hiện lên sẽ hiện dữ liệu mảng gốc 2 index về bên phải liền kề (+anchorIndex)
    // VD: A1 A2 A3 => A3 A4 A5 (A3=>A5 A2=>A4 A1=>A3)

    let dataListIndex = i + anchorIndex;

    // Nếu index mảng sắp hiện >= length mảng gốc (TH này là 10)
    // thì lấy dataListIndex - length, để index đó thành index đầu mảng gốc
    // VD: TH A6[i=6] A7[i=7] A8[i=8]
    // 8 (index A8) + 2 (index neo) => dataListIndex = 10 (>=length mảng gốc)
    // dataListIndex -= 10 (length mảng gốc) = 0 => mảng gốc index 0 sẽ hiện lên => mảnh đang hiện quay lại từ đầu mảng gốc

    if (dataListIndex >= dataList.length) {
      dataListIndex = dataListIndex - dataList.length;
    }

    // Gán mảng gốc sắp hiện cho mảng hiện lên màn hình
    renderItems[i].innerHTML = dataList[dataListIndex];
    console.log("renderItems[", i, "].innerHTML: ", renderItems[i].innerHTML);
  }
  console.log("R RUN");
});

// CÁC XỬ LÝ TRONG NÚT QUA TRÁI
document.getElementsByClassName("l_btn")[0].addEventListener("click", () => {
  // Lấy interHTML của item đầu mảng hiện trên màn hình, dùng xác định index dùng làm neo.
  const firstRenderItem = renderItems[0].innerHTML;
  console.log("firstRenderItem: ", firstRenderItem);

  // Xác định, lưu trữ index mỏ neo, làm cột mốc thay đổi nội dung 3 item hiện lên màn hình.
  // trong TH này anchorIndex = 0.
  let anchorIndex = "";
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i] === firstRenderItem) {
      anchorIndex = i;
      console.log("anchorIndex: ", anchorIndex);
      break;
    }
  }
  // Duyệt mảng item hiện lên màn hình, xác định item nào của mảng gốc sẽ hiện lên.
  for (let i = 0; i < renderItems.length; i++) {
    // Xác định và điều chỉnh index item mảng gốc sẽ hiện lên.
    // trong TH này, tất cả item mảng hiện lên sẽ hiện dữ liệu mảng gốc 2 index về bên trái liền kề (-activeSlideQuantity-1)
    // VD: A3 A4 A5 => A1 A2 A3 (A3=>A1 A2=>A2 A5=>A3)
    let dataListIndex = anchorIndex + i - (activeSlideQuantity - 1);

    // Nếu index mảng sắp hiện < 0
    // thì lấy dataListIndex(số âm) + length, để index đó thành index cuối mảng gốc
    // VD: TH A0[i=0] A1[i=1] A2[i=2]
    // 0 (index neo) + 0 (index A0) - 2 (activeSlideQuantity-1) => dataListIndex=-2
    // dataListIndex = -2 + 10 (length mảng gốc) = 8 => mảng gốc index 8 sẽ hiện lên => mảnh đang hiện quay lại cuối mảng gốc
    if (dataListIndex < 0) {
      dataListIndex = dataList.length + dataListIndex;
    }

    // Gán mảng gốc sắp hiện cho mảng hiện lên màn hình
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
