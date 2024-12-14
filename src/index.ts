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
    const filename = process.argv[2];
    console.log(filename);

    const client = new S3Client();
    const fileContent = fs.readFileSync(filename);

    const params = {
      "Body": fileContent,
      "Bucket": "my-cs340-bucket-cli",
      "Key": filename,
    }

    const command = new PutObjectCommand(params);
    const response = await client.send(command);

    console.log("File upload successful with ", response.$metadata.httpStatusCode);
  } catch (error) {
    console.log(error);
  }
}
