const fs = require("fs");
async function checkDirectory(directoryName) {
  const folderName = `./public/image/${directoryName}`;
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true });
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  uploadImage: async (image, path) => {
    try {
      checkDirectory(path);

      const imagePath = `/image/${path}/${new Date().getTime()}.jpg`;
      const filePath = `./public${imagePath}`;

      await new Promise((resolve, reject) => {
        image.mv(filePath, (err) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve();
        });
      });

      return imagePath;
    } catch (e) {
      throw e;
    }
  },
  deleteImage: async (path) => {
    const filePath = `./public${path}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  },
};
