const { compose, middlewares, res } = require('sls-compose')
const colorPalette = require('./lib/palette')
const download = require('./lib/download')

const coloursCount = 3

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
