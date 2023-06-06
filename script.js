const image1 = "images/1_image.jpeg";
const image2 = "images/2_image.jpeg";

const imgView = async () => {
  try {
    await createImage(image1);
    await wait(2);
    await createImage(image2);
    await wait(2);
  } catch (error) {
    console.error(error);
  }
};

const createImage = (imagePath) => {
  // まずはhtmlのbodyを指定
  const body = document.body;
  // 次にimg要素を作る
  const imgElement = document.createElement("img");
  imgElement.src = imagePath;
  //クラス名をimagesに変更
  imgElement.classList.add("images");
  return new Promise((resolve, reject) => {
    // 画像を読み込んだら発火
    imgElement.onload = () => {
      // img要素をbodyに追加
      body.appendChild(imgElement);
      // 要素を返す
      resolve(imgElement);
    };

    imgElement.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
};

// wait()を使用すると2秒待機後画像非表示
const wait = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const imgElement = document.querySelectorAll(".images");
      imgElement.forEach((imgElement) => {
        imgElement.style.display = "none";
      });
      resolve();
    }, seconds * 1000);
  });
};

imgView();