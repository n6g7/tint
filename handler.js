'use strict'

const colorPalette = require('./lib/palette')
const download = require('./lib/download')

const coloursCount = 3

module.exports.tint = (event, context, cb) => {
  download(event.body.url)
  .then(filePath => colorPalette(filePath, coloursCount))
  .then(colours => cb(null, { colours }))
}
