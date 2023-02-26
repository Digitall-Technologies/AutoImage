const { uploadImages } = require("./helpers/upload.js");
const fs = require("fs");
let imagePaths = ["./images/image-0.jpeg", "images/image-1.jpeg"]; //fill this with image paths from the image folder

const upload = async () => {
  let locations = await uploadImages(imagePaths);
  fs.writeFileSync("./imageLocations.json", JSON.stringify(locations));

  console.log("LOCATIONS WRITTEN TO FILE");
};

upload();
