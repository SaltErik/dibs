"use strict";
import { propertyKeyLoops } from "../benchmark.js";

/** Boolean flag denoting if new calls to `instantiate` are accepted or not. */
let alreadyFilled = false;

/** The pool holds our available POJOs -- ready to be lent out at a moment's notice! */
const pool: any[] = [];

/** Call `dibs()` to lend a fresh POJO from the object pool. Remember to call `noDibs()` afterwards!*/
const dibs = <T extends { [key: number]: number }>(): T => {
  return pool.pop() as T;
};

/** Call `noDibs()` to return a list of used POJOs to the object pool. Thanks for recycling! */
const noDibs = <T extends { [key: number]: number }>(POJO: T): void => {
  // Zero-out all fields
  for (let i = 0; i < propertyKeyLoops; i++) {
    POJO[i] = 0;
  }
  // Plunge scrubbed POJO into the pool
  pool.push(POJO);
};

/** Initial setup. Populates the pool with POJOs of type `T`. */
const instantiate = <T extends { [key: number]: number }>(initialPoolSize: number, POJOConstructor: new () => T): void => {
  if (!alreadyFilled) {
    for (let i = 0; i < initialPoolSize; i++) {
      const POJO = new POJOConstructor();
      // Initialize all fields (zeroed-out)
      for (let i = 0; i < propertyKeyLoops; i++) {
        POJO[i] = 0;
      }
      // Plop mint condition POJO into the pool
      pool.push(POJO);
    }
    alreadyFilled = true;
  }
};

export { dibs, noDibs, instantiate };
