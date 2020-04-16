"use strict";
import { amountOfPOJOs } from "../benchmark.js";
import { mostImportantFunction, vitalMarketResearch } from "./busywork.js";
import { GenericMathObject } from "./generic_math_object.js";

/** Runs the equivalent operations while NOT using a pool. */
const withoutPool = () => {
  const listOfCrap: any[] = [];

  while (listOfCrap.length < amountOfPOJOs) {
    const POJO = new GenericMathObject();
    const dataObject = mostImportantFunction(POJO);
    listOfCrap.push(dataObject);
  }
  vitalMarketResearch(listOfCrap);
  // NOTE: So instead of calling `noDibs(listOfCrap)` in a loop here, we just let the scope end (like you would normally).
};

export { withoutPool };
