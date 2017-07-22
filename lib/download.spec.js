const download = require('../lib/download')

jest.mock('fs', () => {
  const on = jest.fn()
  const writeStream = { on }
  const createWriteStream = jest.fn(() => writeStream)
  createWriteStream.writeStream = writeStream

  return {
    createWriteStream
  }
})

jest.mock('request', () => {
  const pipe = jest.fn()
  const request = jest.fn(() => ({
    pipe
  }))
  request.pipe = pipe

  return request
})

const fs = require('fs')
const request = require('request')

describe('download', () => {
  describe('getTempFilePath', () => {
    it('returns a file path in /tmp', () => {
      const path = download.getTempFilePath()

      expect(path).toMatch(/^\/tmp\/[a-f0-9-]{36}$/)
    })
  })

  describe('download', () => {
    const url = 'qodkqksdl'
    let res

    beforeEach(() => {
      fs.createWriteStream.mockClear()
      fs.createWriteStream.writeStream.on.mockClear()
      request.mockClear()
      request.pipe.mockClear()

      res = download(url)
    })

    it('returns a promise', () => {
      expect(res).toBeInstanceOf(Promise)
    })

    it('writes a file to disk', () => {
      expect(fs.createWriteStream).toHaveBeenCalledTimes(1)
      expect(fs.createWriteStream.mock.calls[0][0]).toMatch(/^\/tmp\/[a-f0-9-]{36}$/)

      expect(fs.createWriteStream.writeStream.on).toHaveBeenCalledTimes(1)
      expect(fs.createWriteStream.writeStream.on.mock.calls[0][0]).toBe('close')
      expect(fs.createWriteStream.writeStream.on.mock.calls[0][1]).toBeInstanceOf(Function)

      expect(request).toHaveBeenCalledTimes(1)
      expect(request.mock.calls[0]).toEqual([
        url
      ])

      expect(request.pipe).toHaveBeenCalledTimes(1)
      expect(request.pipe.mock.calls[0]).toEqual([
        fs.createWriteStream.writeStream
      ])
    })
  })
})
