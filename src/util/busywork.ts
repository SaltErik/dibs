"use strict";
import { propertyKeyLoops } from "../benchmark.js";

/** Busywork function. */
const vitalMarketResearch = (POJOs: any[]) => {
  for (let POJO of POJOs) {
    for (let i = 0; i < propertyKeyLoops; i += 4) {
      POJO[i] = i - i;
    }
  }
};

/** Busywork function. */
const mostImportantFunction = (POJO: any) => {
  for (let i = 0; i < propertyKeyLoops; i++) {
    POJO[i] = i + i;
  }
  return POJO;
};

export { vitalMarketResearch, mostImportantFunction };
