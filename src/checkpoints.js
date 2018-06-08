'use strict'

const MICRO = 'µs'
const MILLI = 'ms'
const SEC = 's'
const NANO = 'ns'

const NS_PER_SEC = 1e9
const NS_PER_MILLI = 1e6

const checkpoints = {}
const hrtime = (start = undefined) => process.hrtime(start)
const hrToNano = (hr) => +hr[0] * NS_PER_SEC + +hr[1]
const nanoToMicro = (ns) => ns / 1000
const nanoToMilli = (ns) => ns / NS_PER_MILLI
const nanoToSeconds = (ns) => ns / NS_PER_SEC

const humantime = (ns) => {
  if (ns >= NS_PER_SEC) {
    return nanoToSeconds(ns).toFixed(2) + SEC
  } else if (ns > NS_PER_MILLI) {
    return nanoToMilli(ns).toFixed(2) + MILLI
  } else if (ns > 1000) {
    return nanoToMicro(ns).toFixed(2) + MICRO
  }
  return ns.toFixed(2) + NANO
}

const create = (tag) => {
  if (!tag || !tag.trim()) {
    throw new Error(`No empty tags`)
  }

  (!checkpoints.hasOwnProperty(tag))
    ? checkpoints[tag] = {
        start: hrtime(),
        total: null
      }
    : checkpoints[tag].total = hrToNano(hrtime(checkpoints[tag].start))
}

const finalize = (tag) => {
  if (checkpoints.hasOwnProperty(tag) && !checkpoints[tag].total) {
    create(tag)
  }
}

const timings = () =>
  Object.entries(checkpoints).map(([key, times]) => {
    finalize(key)
    return [key, humantime(times.total)]
  })

const output = () =>
  Object.entries(checkpoints).forEach(
    ([key, times]) => {
      finalize(key)
      console.log(key, humantime(times.total))
    }
  )


exports.finalize = finalize
exports.create = create
exports.timings = timings
exports.output = output
