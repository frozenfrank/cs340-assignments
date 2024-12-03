export const handler = async function (event: any) {
  console.log("Invoking lambda handler")
  for (let i = 0; i < event.Records.length; ++i) {
    const { body } = event.Records[i];
    console.log(`Received message: ${body}`);
  }
  return null;
};
