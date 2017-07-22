const path = require('path')

const palette = require('../lib/palette')

describe('palette', () => {
  const TEST_PATH = path.resolve(__dirname, './img.jpg')
  const COLOURS = 2

  let res
  beforeEach(() => {
    res = palette(TEST_PATH, COLOURS)
  })

  it('returns a promise', () => {
    expect(res).toBeInstanceOf(Promise)
  })

  it('resolves to an array with n colours', () => {
    return res.then(colours => {
      expect(colours.length).toBe(COLOURS)
    })
  })

  it('returns well-formatted colours', () => {
    return res.then(colours => {
      colours.forEach(colour => {
        expect(colour).toHaveProperty('counts', expect.any(Number))
        expect(colour).toHaveProperty('rgb', expect.stringMatching(/^([0-9]{1,3},){2}[0-9]{1,3}$/i))
        expect(colour).toHaveProperty('hex', expect.stringMatching(/^[0-9a-f]{6}$/i))
        expect(colour).toHaveProperty('percentage', expect.any(Number))
        expect(colour).toHaveProperty('percent', expect.stringMatching(/^[0-9.]+%$/))
      })
    })
  })
})
