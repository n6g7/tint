const colorPalette = require('./lib/palette')
const download = require('./lib/download')

const coloursCount = 3

module.exports.tint = (event, context, cb) => {
  const { url } = JSON.parse(event.body)

  download(url)
  .then(filePath => colorPalette(filePath, coloursCount))
  .then(colours => cb(null, {
    body: JSON.stringify({ colours })
  }))
}
