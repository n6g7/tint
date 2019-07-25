/**
 * Borrowed from gh://cyrilis/colors-palette
 */

const exec = require('child_process').exec
const path = require('path')

const colorScript = path.resolve(__dirname, './color-palette.sh')

module.exports = (imgPath, number) => {
  const cmd = `${colorScript} ${imgPath} ${number}`

  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(err)
      if (!stdout) return reject(stderr)

      try {
        const data = JSON.parse(stdout)
          .result
          .map(instance => Object.assign(
            {},
            instance,
            { counts: parseInt(instance.counts) }
          ))

        const sum = data.reduce(
          (s, instance) => s + instance.counts,
          0
        )

        const result = data.map(instance => {
          const pct = Math.round(instance.counts / sum * 10000)

          return Object.assign({}, instance, {
            percentage: pct / 10000,
            percent: `${pct / 100}%`
          })
        })

        resolve(result)
      } catch (error) {
        return reject(error)
      }
    })
  })
}
