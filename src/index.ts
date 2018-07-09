import * as checkpoints from './checkpoints';

// tslint:disable-next-line
const EventEmitter: any = require('events');

class Measure extends EventEmitter {}
const measure: Measure = new Measure();

measure.on('ping', checkpoints.create);
measure.on('end', checkpoints.finalize);

export {
  checkpoints,
  measure
};
