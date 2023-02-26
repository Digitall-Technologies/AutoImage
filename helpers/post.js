const { IgApiClient } = require("instagram-private-api");
const fs = require("fs");
require("dotenv").config();

const ig = new IgApiClient();

exports.postImage = async (imagePath, caption) => {
  console.log("-------------------------------");
  console.log("---- FETCHING POST CONTENT ----");
  console.log("-------------------------------");
  try {
    const image = await Jimp.read(imagePath);
    const buff = await image.getBufferAsync("image/jpeg");
    const photo = buff;

    ig.state.generateDevice(process.env.USERNAME);

    const user = await ig.account.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    //uploading
    const published = await ig.publish.photo({
      file: photo,
      caption: caption,
    });

    if (published.status === "ok") {
      console.log("-------------------------------");
      console.log("--------- POST SUCCESS --------");
      console.log("-------------------------------");
    } else {
      console.log("PUBLISH ERROR");
    }
  } catch (error) {
    console.log(error);
  }
};
