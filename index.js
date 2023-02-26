const express = require("express");
const cron = require("node-cron");
require("dotenv").config();
const { uploadImages, postImage, generateCaption } = require("helpers.js");

const app = express();
const port = process.env.PORT || 3001;

// Fill out the topics and imagePaths then redeploy to heroku
//it will first upload the images
// then it will begin the cron job to generate a caption and post an image
//when it runs out of images it will stop trying to post

let topics = []; //fill this with topics you want for the caption to be generated
let imagePaths = []; //fill this with image paths from the image folder
let locations = await uploadImages(imagePaths);
let index = 0;
let max = locations.length;

const run = async () => {
  if (index == max) {
    return;
  }
  let topic = topics[Math.floor(Math.random() * topics.length)];

  let caption = await generateCaption(topic);
  let image = locations[index];

  await postImage(image, caption);
};

cron.schedule("0 */8 * * *", function () {
  console.log("---------------------");
  console.log("running a task every 8 hours");
  run();
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
