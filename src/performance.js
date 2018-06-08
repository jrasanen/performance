'use strict'

const EventEmitter = require('events')

const checkpoints = require('./checkpoints')

class Measure extends EventEmitter {}
const measure = new Measure()

measure.on('ping', checkpoints.create)
measure.on('end', checkpoints.finalize)
measure.on('output', checkpoints.output)

module.exports = measure
