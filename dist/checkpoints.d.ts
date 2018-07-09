declare const create: (tag: string) => void;
declare const finalize: (tag: string) => void;
declare const timings: () => string[][];
export { finalize, create, timings };
