const express = require("express");
const cron = require("node-cron");
require("dotenv").config();
const { postImage } = require("./helpers/post.js");
const { generateCaption } = require("./helpers/caption.js");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3001;

//go to uploads.js and upload the images in the images folder, after redeploy to heroku

let locations = JSON.parse(fs.readFileSync("./imageLocations.json"));
let topics = []; //fill this with topics you want for the caption to be generated

let index = 0;
let max = locations.length;

const run = async () => {
  if (index == max) {
    console.log("we are out of photos");
    return;
  }
  let topic = topics[Math.floor(Math.random() * topics.length)];

  let caption = await generateCaption(topic);
  console.log("Caption_______");
  console.log(caption);

  let image = locations[index];

  console.log("Image_____");
  console.log(image);

  await postImage(image, caption);
  index = index + 1;
  console.log(index);
};

cron.schedule("0 0 * * *", function () {
  console.log("---------------------");
  console.log("running a task once a day");
  run();
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
