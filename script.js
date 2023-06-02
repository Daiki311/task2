// wait()を使用すると2秒待機
const wait = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};

const createImage = (imagePath) => {
  // まずはhtmlのbodyを指定
  const body = document.body;
  // 次にimg要素を作る
  const imgElement = document.createElement("img");
  imgElement.src = imagePath;
  return new Promise((resolve, reject) => {
    // 画像を読み込んだら発火
    imgElement.onload = () => {
      // img要素をbodyに追加
      body.appendChild(imgElement);
      //クラス名をimagesに変更
      imgElement.classList.add("images");
      // 要素を返す
      resolve(imgElement);
    };

    imgElement.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
};

// 画像1を読み込ませる
let image = createImage("images/1_image.jpeg")
  .then((imgElement) => {
    console.log(`画像1が読み込まれました`);
    return wait(2).then(() => {
      imgElement.style.display = "none";
    });
  })
  .then(() => {
    // 画像2を読み込む
    let image2 = createImage("images/2_image.jpeg");
    return image2;
  })
  .then((imgElement2) => {
    console.log(`画像2が読み込まれました`);
    return wait(2).then(() => {
      imgElement2.style.display = "none";
    });
  })
  .catch((error) => {
    console.error(error);
  });
