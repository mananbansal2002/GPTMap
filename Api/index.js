const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const app = express();
const html2canvas = require('html2canvas');
const insertLine = require('insert-line');
const fetch = require("cross-fetch");
const cors = require('cors');
const { base64 } = require('base64-img');
const { encode } = require('punycode');
require('dotenv').config()
const api_key = process.env.API_KEY;

async function QueryMessage(topic) {
  const payload = {
    prompt:
    `create a json data depicting the roadmap for the topic ${topic} just provide the json data no need to write anything else. create the json data in the format name and children like children is of Treenode type and Treenode contains Treenode named children and a string named name, every children must have a children too , which can be empty `,
             temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 3800,
    stream: false,
    n: 1,
    model: "text-davinci-003",
  };
  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+api_key,
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
	  console.log(data)
    if (data?.choices?.length) {
      let messageFromGita = "";
      data?.choices?.map((obj) => (messageFromGita += obj.text));

      return messageFromGita.trim();
    }
    return "Something went wrong";
  } catch (error) {
    console.log(error.message, error);
    return "There's some error.";
  }
}




let data ={
  "name": "Decentralized Shopping Website with 3D 360 View of Products",
  "children": [
    {
      "name": "Blockchain Integration",
      "children": [
        {
          "name": "Smart Contract Development",
          "children": [
            {
              "name": "ERC-20 Token Standard",
              "children": []
            },
            {
              "name": "ERC-721 Token Standard (for NFTs)",
              "children": []
            }
          ]
        },
        {
          "name": "Payment Integration",
          "children": [
            {
              "name": "Cryptocurrencies (BTC, ETH, etc.)",
              "children": []
            },
            {
              "name": "Stablecoins (USDT, USDC, etc.)",
              "children": []
            }
          ]
        },
        {
          "name": "Decentralized Data Storage",
          "children": [
            {
              "name": "IPFS",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "name": "Web Development",
      "children": [
        {
          "name": "Frontend Development",
          "children": [
            {
              "name": "React",
              "children": []
            },
            {
              "name": "Three.js",
              "children": []
            },
            {
              "name": "WebGL",
              "children": []
            }
          ]
        },
        {
          "name": "Backend Development",
          "children": [
            {
              "name": "Node.js",
              "children": []
            },
            {
              "name": "Express",
              "children": []
            },
            {
              "name": "MongoDB",
              "children": []
            }
          ]
        },
        {
          "name": "API Development",
          "children": [
            {
              "name": "RESTful API",
              "children": []
            },
            {
              "name": "GraphQL",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "name": "3D Modeling and Animation",
      "children": [
        {
          "name": "3D Modeling Software",
          "children": [
            {
              "name": "Blender",
              "children": []
            },
            {
              "name": "Autodesk Maya",
              "children": []
            }
          ]
        },
        {
          "name": "Animation Software",
          "children": [
            {
              "name": "Unity",
              "children": []
            },
            {
              "name": "Unreal Engine",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "name": "Product Visualization",
      "children": [
        {
          "name": "3D Scanning",
          "children": [
            {
              "name": "Photogrammetry",
              "children": []
            },
            {
              "name": "Lidar",
              "children": []
            }
          ]
        },
        {
          "name": "3D Product Rendering",
          "children": [
            {
              "name": "Product Design Software",
              "children": [
                {
                  "name": "CAD (Computer-Aided Design)",
                  "children": []
                },
                {
                  "name": "SketchUp",
                  "children": []
                }
              ]
            },
            {
              "name": "3D Rendering Software",
              "children": [
                {
                  "name": "V-Ray",
                 
              "children": []
            },
            {
              "name": "Blender",
              "children": []
            },
            {
              "name": "KeyShot",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "name": "360 View of Products",
      "children": [
        {
          "name": "360 Product Photography",
          "children": []
        },
        {
          "name": "360 Product Viewer",
          "children": [
            {
              "name": "Three.js",
              "children": []
            },
            {
              "name": "A-Frame",
              "children": []
            }
          ]
        }
      ]
    }
  ]
}
]
};

let datastring = JSON.stringify(data);

console.log(datastring);








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
    
    modifiedData.splice(32, 0,"data = "+ data); 
        const html = modifiedData.join('\n');
    console.log(html);
    if(html==fileCode) console.log("didnt work");
    
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setContent(html);

    // Use html2canvas to render the chart element as an image
    const chartElement = await page.$('#chart');
    const base64Data = await chartElement.screenshot({encoding :"base64"});
    // var blob = new Blob([base64Data], {type : 'image/svg+xml'});
    await browser.close();
    fs.writeFile('newfile.txt', base64Data, function(err) {
  if (err) throw err;
  console.log('Data written to file!');
});
res.header('Access-Control-Allow-Origin', '*');
    res.send({photo:base64Data});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
