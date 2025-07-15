const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '../data');         // data folder
const filePath = path.join(dirPath, 'urls.json');        

// Read URLs from file
const readData = () => {
  // If file doesn't exist, return empty array
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data || '[]');
};

// Write URLs to file
const writeData = (data) => {
  // ✅ Ensure data folder exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
