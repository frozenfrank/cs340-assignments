export const handler = async function (event: any) {
  for (let i = 0; i < event.Records.length; ++i) {
    const { body } = event.Records[i];
    console.log(`Received message: ${body}`);
  }
  return null;
};
