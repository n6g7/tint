const { json, send } = require('micro')
const colorPalette = require('./lib/palette')
const download = require('./lib/download')

const coloursCount = 3

module.exports = async (req, res) => {
  const { url } = await json(req)
  const filePath = await download(url)
  const colours = await colorPalette(filePath, coloursCount)
  send(res, 200, { colours })
}
