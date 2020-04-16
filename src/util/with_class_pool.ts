"use strict";
import { amountOfPOJOs } from "../benchmark.js";
import { Pool } from "../lib/object_pool_class";
import { mostImportantFunction, vitalMarketResearch } from "./busywork.js";
import { GenericMathObject } from "./generic_math_object.js";

/** Runs the equivalent operations while USING a pool. */
const withClassPool = (Pool: Pool<GenericMathObject>) => {
  const listOfCrap: any[] = [];

  while (listOfCrap.length < amountOfPOJOs) {
    const POJO = Pool.dibs();
    const dataObject = mostImportantFunction(POJO);
    listOfCrap.push(dataObject);
  }
  vitalMarketResearch(listOfCrap);

  let i = listOfCrap.length;
  while (i--) {
    Pool.noDibs(listOfCrap[i]);
  }
};

export { withClassPool };
