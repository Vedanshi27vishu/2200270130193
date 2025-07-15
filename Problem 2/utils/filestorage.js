const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '../data');         // data folder
const filePath = path.join(dirPath, 'urls.json');        

const readData = () => {

  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data || '[]');
};


const writeData = (data) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
