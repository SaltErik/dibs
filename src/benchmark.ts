"use strict";
import { instantiate } from "./lib/object_pool.js";
import { Pool } from "./lib/object_pool_class.js";
import { GenericMathObject } from "./util/generic_math_object.js";
// import { withoutPool } from "./util/without_pool.js";
import { withClassPool } from "./util/with_class_pool.js";
import { withPool } from "./util/with_pool.js";

// GLOBAL BENCHMARKING OPTIONS ////////////////////////////////////////////////////
const completeBenchmarkPasses = 20;
const individualTestRuns = 1000;
const amountOfPOJOs = 8192;
const propertyKeyLoops = 100;

/** Loops through the various test functions, timing their respective executions. */
const benchmark = (): void => {
  // WITH POOL //////////////////////////////////////////////////////////////////
  console.time(`Pooled\t\t`);
  instantiate<GenericMathObject>(amountOfPOJOs, GenericMathObject);
  for (let i = 0; i < individualTestRuns; i++) {
    withPool();
  }
  console.timeEnd(`Pooled\t\t`);

  // WITH POOL CLASS ////////////////////////////////////////////////////////////
  console.time(`Pooled Class\t`);
  const pool = new Pool<GenericMathObject>(amountOfPOJOs, GenericMathObject);
  for (let i = 0; i < individualTestRuns; i++) {
    withClassPool(pool);
  }
  console.timeEnd(`Pooled Class\t`);

  // WITHOUT POOL ///////////////////////////////////////////////////////////////
  // console.time(`Non-pooled\t`);
  // for (let i = 0; i < individualTestRuns; i++) {
  //   withoutPool();
  // }
  // console.timeEnd(`Non-pooled\t`);
};

for (let i = 0; i < completeBenchmarkPasses; i++) {
  console.log(`\n#${i + 1}`)
  benchmark();
}

export { propertyKeyLoops, amountOfPOJOs, individualTestRuns };
