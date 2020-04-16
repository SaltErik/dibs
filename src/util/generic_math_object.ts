"use strict";
import { propertyKeyLoops } from "../benchmark.js";

class GenericMathObject {
  [key: number]: number;

  constructor() {
    // Initialize all fields (zeroed-out)
    for (let i = 0; i < propertyKeyLoops; i++) {
      this[i] = 0;
    }
  }
}

export { GenericMathObject };
