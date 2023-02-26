const { S3 } = require("aws-sdk");
const uuid = require("uuid").v4;
require("dotenv").config();

exports.s3Uploadv2 = async (buff) => {
  const s3 = new S3();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${process.env.AWS_FOLDER_NAME}/${uuid()}.jpg`,
    Body: buff,
  };
  const results = await s3.upload(params).promise();

  return results;
};
