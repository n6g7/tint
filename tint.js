const { json, send } = require('micro')
const { compose, middlewares, res } = require('sls-compose')
const colorPalette = require('./lib/palette')
const download = require('./lib/download')

const coloursCount = 3

res.enableCors()

module.exports.usage = (event, context, cb) => {
  cb(
    null,
    res.html(require('./usage'))
  )
}

module.exports.tint = compose(
  middlewares.parseBody,
  (event, context, cb) => {
    download(event.body.url)
    .then(filePath => colorPalette(filePath, coloursCount))
    .then(colours => cb(
      null,
      res.json({ colours })
    ))
  }
)

module.exports = async (req, res) => {
  const { url } = await json(req)
  const filePath = await download(url)
  const colours = await colorPalette(filePath, coloursCount)
  send(res, 200, { colours })
}
