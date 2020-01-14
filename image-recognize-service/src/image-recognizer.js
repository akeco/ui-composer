const Vibrant = require('node-vibrant');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const recognizerMiddleware = async (req, res, next) => {
  try {
    const image = await transformBase64Image(req.body.image);
    convertBase64ToFile(image);
    const result = await Vibrant.from(path.join(__dirname, 'temp', 'out.png')).getPalette();

    const formatedColors = Object.keys(result).map((item) => result[item].getHex());

    res.json(formatedColors);
  }
  catch(e) {
    console.log("ERR", e);
    res.send("ERROR");
  }
}

transformBase64Image = async (base64Image) => {
  let parts = base64Image.split(';');
  let mimType = parts[0].split(':')[1];
  let imageData = parts[1].split(',')[1];

  var img = new Buffer.from(imageData, 'base64');
  try {
    const resizedImageBuffer = await sharp(img).resize(400, 400).toBuffer();
    let resizedImageData = resizedImageBuffer.toString('base64');
    let resizedBase64 = `data:${mimType};base64,${resizedImageData}`;
    return resizedBase64;
  }
  catch(e) {
    return new Error(e);
  }
}

convertBase64ToFile = async (base64Image) => {
  var dir = './temp';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  var base64Data = base64Image.replace(/^data:image\/png;base64,/, "");
  console.log('path', __dirname);
  fs.writeFileSync(path.join(__dirname, 'temp', 'out.png'), base64Data, 'base64');
}

module.exports = recognizerMiddleware;
