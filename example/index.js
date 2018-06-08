const p = require('../src/performance')

p.emit('ping', 'seconds')
p.emit('ping', 'milli')
p.emit('ping', 'my cats want food')

p.emit('ping', 'nani')
p.emit('ping', 'nani')

const done = new Promise((ok) => {

  setTimeout(() => {
    p.emit('ping', 'milli')
  }, 1)

  setTimeout(() => {
    p.emit('ping', 'seconds')
  }, 1234)

  setTimeout(() => {
    p.emit('ping', 'my cats want food')
    ok()
  }, 8000)

  p.emit('ping', 'jee')
})

p.emit('ping', 'jee')

done.then(() => p.emit('output'))

