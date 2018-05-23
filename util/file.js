const path = require('path');
const util = require('util');
const fs = require('fs');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const inputPath = path.join(__dirname, '../data');
const outputPath = path.join(__dirname, '../dist');

exports.readDataFileAsync = async fileName =>
  readFileAsync(path.join(inputPath, fileName), 'utf-8');

exports.writeDistFileAsync = async (fileName, file) =>
  writeFileAsync(path.join(outputPath, fileName), file);
