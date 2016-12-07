var npm = require('./index')

describe('packagist-package-lookup tests', function () {
  it('should find packages by name', function () {
    return npm.search('axios').then(function (names) {
      expect(names).toBeInstanceOf(Array)
      names.forEach(function (name) {
        expect(typeof name).toBe('string')
      })
    })
  })

  it('should versions of a package', function () {
    return npm.versions('axios').then(function (versions) {
      expect(versions).toBeInstanceOf(Array)
      versions.forEach(function (version) {
        expect(typeof version).toBe('string')
      })
    })
  })
})
