'use strict'

const expect = require('chai').expect
const fs = require('fs')

const download = require('../lib/download')

const TEST_URL = 'https://cdn-images-1.medium.com/max/2000/1*_bO_wis0q5DHOITEqfy6VA.jpeg'

describe('download', () => {
  describe('getTempFilePath', () => {
    it('returns a file path in /tmp', () => {
      const path = download.getTempFilePath()

      expect(path).to.match(/^\/tmp\/[a-z0-9_-]+$/)
    })
  })

  describe('download', () => {
    let res
    beforeEach(() => {
      res = download(TEST_URL)
    })

    it('returns a promise', () => {
      expect(res).to.be.a('Promise')
    })

    it('resolves to a path in /tmp', () => {
      return res.then(path => {
        expect(path).to.match(/^\/tmp\/[a-z0-9_-]+$/)
      })
    })

    it('writes a file', () => {
      return res.then(path => {
        const file = fs.statSync(path)
        expect(file.isFile()).to.be.true
      })
    })
  })
})
