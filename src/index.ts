import fs from "fs";

import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

s3upload();

async function s3upload() {
  if(process.argv.length !== 3) {
    console.log("Specify the file to upload on the command line");
    process.exit();
  }

  try {
    const client = new S3Client();
    const fileContent = fs.readFileSync(process.argv[2]);

    const params = {
      "Body": fileContent,
      "Bucket": //TODO: Specify your bucket name,
      "Key": //TODO: Specify name or file path you want to appear in S3,
    }

    const command = // TODO: Create the PutObjectCommand
    const response = // TODO: Send the command and await the result

    console.log("File upload successful with ", response.$metadata.httpStatusCode);
  } catch (error) {
    console.log(error);
  }
}
