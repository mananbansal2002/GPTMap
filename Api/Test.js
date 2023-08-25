const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const makeApiCall = async (topic) => {
  try {
    const response = await axios.get(`http://localhost:3000/getRoadmap?topic=${topic}`);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const getUserInput = async () => {
  return new Promise((resolve) => {
    rl.question('Enter your topic: ', (topic) => {
      resolve(topic);
    });
  });
};

const main = async () => {
  const topic = await getUserInput();
  await makeApiCall(topic);

  rl.close();
};

main().catch((error) => {
  console.log(error);
});

rl.on('close', () => {
  process.exit(0);
});
