import { S3 } from "aws-sdk";

export const imageUpload = async (data) => {
  if (data) {
    const s3 = new S3({
      accessKeyId: process.env.LIARA_ACCESS_KEY,
      secretAccessKey: process.env.LIARA_SECRET_KEY,
      endpoint: process.env.LIARA_ENDPOINT,
    });

    const params = {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: data.name,
      Body: data,
    };
    const response = await s3.upload(params).promise();
    return response.Location;
  }
};
