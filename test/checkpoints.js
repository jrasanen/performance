const assert = require('assert')

const c = require('../src/checkpoints')

describe('Checkpoint', function() {
  it('#create()', function() {
    const tag = 'my cats want food'
    c.create(tag)
    c.finalize(tag)
    const timings = c.timings()
    assert.equal(timings.length, 1)
    assert.equal(timings[0].length, 2)
    assert.equal(timings[0][0], tag)
  })

  it('#create() throws error on empty tag', function() {
    assert.throws(c.create, Error, 'No empty tags')
  })
})
