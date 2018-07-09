// tslint:disable:readonly-keyword
type Time = [number, number];

const MICRO: string = 'µs';
const MILLI: string = 'ms';
const SEC: string = 's';
const NANO: string = 'ns';

const NS_PER_SEC: number = 1e9;
const NS_PER_MILLI: number = 1e6;

interface Checkpoints {
  total?: number;
  start?: Time;
  // tslint:disable-next-line:no-any
  [idx: string]: any;
}

// tslint:disable-next-line
let checkpoints: Checkpoints;
checkpoints = {};

const hrtime: (start?: Time) => Time = (start = undefined) => process.hrtime(start);
const hrToNano: (hr: Time) => number = (hr) => +hr[0] * NS_PER_SEC + +hr[1];
const nanoToMicro: (ns: number) => number = (ns) => ns / 1000;
const nanoToMilli: (ns: number) => number = (ns) => ns / NS_PER_MILLI;
const nanoToSeconds: (ns: number) => number = (ns) => ns / NS_PER_SEC;

const humantime: (ns: number) => string =
  (ns) => {
    if (ns >= NS_PER_SEC) {
      return nanoToSeconds(ns).toFixed(2) + SEC;
    } else if (ns > NS_PER_MILLI) {
      return nanoToMilli(ns).toFixed(2) + MILLI;
    } else if (ns > 1000) {
      return nanoToMicro(ns).toFixed(2) + MICRO;
    }

    return ns.toFixed(2) + NANO;
  };

const create: (tag: string) => void =
  (tag) => {
    if (!tag || !tag.trim()) {
      throw new Error(`No empty tags`);
    }

    (!checkpoints || !checkpoints.hasOwnProperty(tag))
      ? checkpoints[tag] = {
          start: hrtime(),
          total: null
        }
      : checkpoints[tag].total = hrToNano(hrtime(checkpoints[tag].start));
  };

const finalize: (tag: string) => void =
  (tag) => {
    if (checkpoints && checkpoints.hasOwnProperty(tag) && !checkpoints[tag].total) {
      create(tag);
    }
  };

const timings: () => string[][] =
  () =>
    Object.keys(checkpoints)
    .map((key) => {
      const checkpoint: { total: number; start: Time } = checkpoints[key];
      finalize(key);

      return [key, humantime(checkpoint.total)];
    });

export {
  finalize,
  create,
  timings
};
