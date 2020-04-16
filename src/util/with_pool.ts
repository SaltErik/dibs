"use strict";
import { amountOfPOJOs } from "../benchmark.js";
import { dibs, noDibs } from "../lib/object_pool.js";
import { mostImportantFunction, vitalMarketResearch } from "./busywork.js";

/** Runs the equivalent operations while USING a pool. */
const withPool = () => {
  const listOfCrap: any[] = [];

  while (listOfCrap.length < amountOfPOJOs) {
    const POJO = dibs();
    const dataObject = mostImportantFunction(POJO);
    listOfCrap.push(dataObject);
  }
  vitalMarketResearch(listOfCrap);

  let i = listOfCrap.length;
  while (i--) {
    noDibs(listOfCrap[i]);
  }
};

export { withPool };
