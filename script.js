class imageLoader {
  constructor(imagePath1, imagePath2) {
    this.body = document.body;
    this.imagePath1 = imagePath1;
    this.imagePath2 = imagePath2;
  }

  // 画像要素を生成
  createImage(imagePath) {
    return new Promise((resolve, reject) => {
      const imgElement = document.createElement("img");
      imgElement.src = imagePath;
      imgElement.classList.add("images");

      imgElement.onload = () => {
        this.body.appendChild(imgElement);
        resolve(imgElement);
      };

      imgElement.onerror = () => {
        reject(new Error("Failed to load image"));
      };
    });
  }

  // 2秒待機して消す
  wait(seconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const imgElement = document.querySelectorAll(".images");
        imgElement.forEach((imgElement) => {
          imgElement.style.display = "none";
        });
        resolve();
      }, seconds * 1000);
    });
  }

  async loadImage() {
    try {
      const loader = new imageLoader();
      await this.createImage(imagePath1);
      await this.wait(2);
      await this.createImage(imagePath2);
      await this.wait(2);
    } catch (error) {
      console.log(error);
    }
  }
}
const imagePath1 = "images/1_image.jpeg";
const imagePath2 = "images/2_image.jpeg";
const loader = new imageLoader();
loader.loadImage();
