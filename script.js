// wait()を使用すると2秒待機
function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

function createImage(imagePath) {
  return new Promise((resolve, reject) => {
    // まずはhtmlのbodyを指定
    const body = document.body;
    // 次にimg要素を作る
    const imgElement = document.createElement("img");
    imgElement.src = imagePath;
    // img要素をbodyに追加
    body.appendChild(imgElement);
    imgElement.onload = () => {
      imgElement.classList.add("images");
      resolve(imgElement);
    };
    imgElement.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
}

// 画像1を読み込ませる
createImage("images/1_image.jpeg")
  .then((imgElement) => {
    console.log(`画像1が読み込まれました`);
    return wait(2).then(() => {
      imgElement.style.display = "none";
    });
  })
  .then(() => {
    //画像2を読み込ませる
    return createImage("images/2_image.jpeg");
  })
  .then((imgElement) => {
    console.log(`画像2が読み込まれました`);
    return wait(2).then(() => {
      imgElement.style.display = "none";
    });
  })
  .catch((error) => {
    console.error(error);
  });