'use strict';

const fs = require('fs');
const path = require('path');
const request = require('request');
const uuid = require('uuid');

function getTempFilePath() {
  return path.resolve('/tmp', uuid.v4());
}

module.exports = url => {
  const filePath = getTempFilePath();

  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filePath);
    writeStream.on('close', () => resolve(filePath));

    request(url).pipe(writeStream);
  });
};
