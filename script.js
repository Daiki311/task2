// wait()に入れた秒数待機
const wait = (seconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });

const createImage = async (imagePath) => {
  // まずはhtmlのbodyを指定
  const body = document.body;
  // 次にimg要素を作る
  const imgElement = document.createElement("img");
  imgElement.src = imagePath;
  await new Promise((resolve, reject) => {
    // 画像を読み込んだら発火
    imgElement.addEventListener("load", () => {
      // imgElementをbodyに追加
      body.appendChild(imgElement);
      //クラス名をimagesに変更
      imgElement.classList.add("images");
      // 要素を返す
      resolve(imgElement);
    });

    imgElement.addEventListener("error", () => {
      reject(new Error("Failed to load image"));
    });
  });
  return imgElement;
};

(async () => {
  try {
    const image = await createImage("images/1_image.jpeg");
    console.log(`画像1が読み込まれました`);

    await wait(2);
    console.log(`2秒経ちました`);
    image.style.display = "none";

    const image2 = await createImage("images/2_image.jpeg");
    console.log(`画像2が読み込まれました`);

    await wait(2);
    console.log(`2秒経ちました`);
    image2.style.display = "none";
  } catch (error) {
    console.error(error);
  }
})();
