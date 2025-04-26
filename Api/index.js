const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const app = express();
const html2canvas = require('html2canvas');
const insertLine = require('insert-line');
const fetch = require('cross-fetch');
const cors = require('cors');
const { base64 } = require('base64-img');
const { encode } = require('punycode');
const axios = require('axios');
require('dotenv').config();
let Count = 1;

function isValidJSON(myString) {
  try {
    JSON.parse(myString);
    return true;
  } catch (error) {
    return false;
  }
}

function cleanText(inputString) {
  const openingBraceIndex = inputString.indexOf('{');
  const closingBraceIndex = inputString.lastIndexOf('}');

  if (
    openingBraceIndex !== -1 &&
    closingBraceIndex !== -1 &&
    closingBraceIndex > openingBraceIndex
  ) {
    const extractedText = inputString
      .substring(openingBraceIndex, closingBraceIndex + 1)
      .trim();
    return extractedText;
  } else {
    return null;
  }
}

async function getData(topic) {
  const api_key = process.env.API_KEY;
  console.log(Count);

  const conf = {
    model: 'mistral-small',
    messages: [
      {
        role: 'user',
        content: `Create a JSON data depicting the roadmap for the topic "${topic}". Provide only the JSON data; no additional text. The JSON should have a "name" and "children" structure, where "children" is an array of TreeNode objects. Each TreeNode should have a "name" (string) and "children" (array), which can be empty. Ensure the JSON is properly formatted and complete.`,
      },
    ],
    temperature: 0.7,
  };

  try {
    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      conf,
      {
        headers: {
          Authorization: `Bearer ${api_key}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const value = cleanText(response.data.choices[0].message.content);
    console.log(value);
    return value;
  } catch (error) {
    console.error('Error fetching data from Mistral API:', error);
    throw error;
  }
}

async function QueryMessage(topic) {
  for (let i = 0; i < 10; i++) {
    let response = await getData(topic);
    Count++;
    if (isValidJSON(response)) {
      // console.log(response);
      return response;
    }
  }
  return `not Working`;
}

let data = {
  name: 'Decentralized Shopping Website with 3D 360 View of Products',
  children: [
    {
      name: 'Blockchain Integration',
      children: [
        {
          name: 'Smart Contract Development',
          children: [
            {
              name: 'ERC-20 Token Standard',
              children: [],
            },
            {
              name: 'ERC-721 Token Standard (for NFTs)',
              children: [],
            },
          ],
        },
        {
          name: 'Payment Integration',
          children: [
            {
              name: 'Cryptocurrencies (BTC, ETH, etc.)',
              children: [],
            },
            {
              name: 'Stablecoins (USDT, USDC, etc.)',
              children: [],
            },
          ],
        },
        {
          name: 'Decentralized Data Storage',
          children: [
            {
              name: 'IPFS',
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: 'Web Development',
      children: [
        {
          name: 'Frontend Development',
          children: [
            {
              name: 'React',
              children: [],
            },
            {
              name: 'Three.js',
              children: [],
            },
            {
              name: 'WebGL',
              children: [],
            },
          ],
        },
        {
          name: 'Backend Development',
          children: [
            {
              name: 'Node.js',
              children: [],
            },
            {
              name: 'Express',
              children: [],
            },
            {
              name: 'MongoDB',
              children: [],
            },
          ],
        },
        {
          name: 'API Development',
          children: [
            {
              name: 'RESTful API',
              children: [],
            },
            {
              name: 'GraphQL',
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: '3D Modeling and Animation',
      children: [
        {
          name: '3D Modeling Software',
          children: [
            {
              name: 'Blender',
              children: [],
            },
            {
              name: 'Autodesk Maya',
              children: [],
            },
          ],
        },
        {
          name: 'Animation Software',
          children: [
            {
              name: 'Unity',
              children: [],
            },
            {
              name: 'Unreal Engine',
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: 'Product Visualization',
      children: [
        {
          name: '3D Scanning',
          children: [
            {
              name: 'Photogrammetry',
              children: [],
            },
            {
              name: 'Lidar',
              children: [],
            },
          ],
        },
        {
          name: '3D Product Rendering',
          children: [
            {
              name: 'Product Design Software',
              children: [
                {
                  name: 'CAD (Computer-Aided Design)',
                  children: [],
                },
                {
                  name: 'SketchUp',
                  children: [],
                },
              ],
            },
            {
              name: '3D Rendering Software',
              children: [
                {
                  name: 'V-Ray',

                  children: [],
                },
                {
                  name: 'Blender',
                  children: [],
                },
                {
                  name: 'KeyShot',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: '360 View of Products',
          children: [
            {
              name: '360 Product Photography',
              children: [],
            },
            {
              name: '360 Product Viewer',
              children: [
                {
                  name: 'Three.js',
                  children: [],
                },
                {
                  name: 'A-Frame',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

let datastring = JSON.stringify(data);

// console.log(datastring);

app.use(cors());
app.get('/getRoadmap', async (req, res) => {
  const topic = req.query.topic || 'World';

  try {
    const fileCode = await fs.readFile('./Roadmap.html', 'utf-8');
    // Use the fileCode variable here
    // console.log(fileCode);
    data = await QueryMessage(topic);
    //  datastring = JSON.stringify(data);
    //  console.log(datastring);
    const modifiedData = fileCode.split('\n');

    modifiedData.splice(32, 0, 'data = ' + data);
    const html = modifiedData.join('\n');
    // console.log(html);
    if (html == fileCode) console.log('didnt work');

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setContent(html);

    // Use html2canvas to render the chart element as an image
    const chartElement = await page.$('#chart');
    const base64Data = await chartElement.screenshot({ encoding: 'base64' });
    // var blob = new Blob([base64Data], {type : 'image/svg+xml'});
    await browser.close();
    fs.writeFile('newfile.txt', base64Data, function (err) {
      if (err) throw err;
      console.log('Data written to file!');
    });
    res.header('Access-Control-Allow-Origin', '*');
    res.send({ photo: base64Data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
