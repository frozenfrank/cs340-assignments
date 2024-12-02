import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

let sqsClient = new SQSClient();

async function sendMessage(): Promise<void> {
  const sqs_url = "*** PUT YOUR QUEUE URL HERE ***";
  const messageBody = "*** PUT YOUR MESSAGE BODY HERE ***";

  const params = {
    DelaySeconds: 10,
    MessageBody: messageBody,
    QueueUrl: sqs_url,
  };

  try {
    const data = await sqsClient.send(new SendMessageCommand(params));
    console.log("Success, message sent. MessageID:", data.MessageId);
  } catch (err) {
    throw err;
  }
}

sendMessage();
