import { S3 } from "aws-sdk";

var s3 = new S3({
  accessKeyId: process.env.LIARA_ACCESS_KEY,
  secretAccessKey: process.env.LIARA_SECRET_KEY,
  endpoint: process.env.LIARA_ENDPOINT,
});

export const imageUpload = async (data) => {
  const divPercent = document.getElementById(data.id);
  const imagePreview = document.getElementById(`image_preview${data.id}`);
  const imageUploadProgress = document.getElementById(
    `image-upload-progress${data.id}`
  );
  console.log("-------start-------");

  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: data.name,
    Body: data,
  };

  const response = await s3
    .upload(params, function (err, data) {
      if (err) console.log("error");
    })
    .on("httpUploadProgress", function (progress) {
      let progressPercentage = Math.round(
        (progress.loaded / progress.total) * 100
      );
      divPercent.style.width = `${progressPercentage}%`;
      if (progressPercentage == 100) {
        imagePreview.style.display = "none";
        imageUploadProgress.style.display = "none";
      }
    });

  return response;
};
