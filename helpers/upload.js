const fs = require("fs");
const { s3Uploadv2 } = require("./s3");

exports.uploadImages = async (imagePaths) => {
  let imageLocations = await Promise.all(
    imagePaths.map(async (image) => {
      let buff = fs.readFileSync(image);

      let data = await s3Uploadv2(buff);

      let location = data.Location;

      return location;
    })
  );
  return imageLocations;
};
