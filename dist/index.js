"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkpoints = require("./checkpoints");
exports.checkpoints = checkpoints;
// tslint:disable-next-line
const EventEmitter = require('events');
class Measure extends EventEmitter {
}
const measure = new Measure();
exports.measure = measure;
measure.on('ping', checkpoints.create);
measure.on('end', checkpoints.finalize);
//# sourceMappingURL=index.js.map