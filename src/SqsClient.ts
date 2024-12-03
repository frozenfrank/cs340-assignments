import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

let sqsClient = new SQSClient({
  region: "us-west-2",
});

async function sendMessage(): Promise<void> {
  const sqs_url = "https://sqs.us-west-2.amazonaws.com/043309350193/CS_340_SQS_Exercise_Queue";
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
