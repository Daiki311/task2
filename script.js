class ImageLoader {
  constructor(imagePath) {
    this.imagePath = imagePath;
  }

  // 画像要素を生成 
  body = document.body;
  createImage() {
    return new Promise((resolve, reject) => {
      const imgElement = document.createElement("img");
      imgElement.src = this.imagePath;
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
      await this.createImage();
      await this.wait(2);
    } catch (error) {
      console.log(error);
    }
  }
}

const loader1 = new ImageLoader("images/1_image.jpeg");
const loader2 = new ImageLoader("images/2_image.jpeg");

const loadImages = async () => {
  await loader1.loadImage();
  await loader2.loadImage();
};

loadImages();
