"use strict";
import { propertyKeyLoops } from "../benchmark.js";

class Pool<T extends { [key: number]: number }> {
  private static _existingPools = new WeakMap();
  private _pool: T[] = [];

  private _POJOConstructor!: new () => T;

  private _initialPoolSize: number = 0;

  private _poolGrownBy: number = 0;

  //@ts-ignore
  private get _totalPOJOsInCirculation(this: Pool<T>) {
    return this._initialPoolSize + this._poolGrownBy;
  }

  constructor(initialPoolSize: number, POJOConstructor: new () => T) {
    return Pool._existingPools.get(POJOConstructor) || Pool._instantiate<T>(initialPoolSize, POJOConstructor, this);
  }

  private static _instantiate<T extends { [key: number]: number }>(this: typeof Pool, initialPoolSize: number, POJOConstructor: new () => T, poolInstance: Pool<T>) {
    poolInstance._initialPoolSize = initialPoolSize;
    poolInstance._POJOConstructor = POJOConstructor;
    poolInstance._fillPool();
    Pool._existingPools.set(POJOConstructor, poolInstance);
  }

  private _fillPool(this: Pool<T>): void {
    for (let i = 0; i < this._initialPoolSize; i++) {
      const POJO = new this._POJOConstructor();
      // Plop mint condition POJO into the pool
      this._pool.push(POJO);
    }
  }

  private _growPool(this: Pool<T>): T {
    this._poolGrownBy++;
    return new this._POJOConstructor();
  }

  dibs(this: Pool<T>): T {
    return this._pool.pop() || this._growPool();
  }

  noDibs(this: Pool<T>, POJO: T): void {
    // Zero-out all fields
    for (let i = 0; i < propertyKeyLoops; i++) {
      POJO[i] = 0;
    }
    // Plunge scrubbed POJO into the pool
    this._pool.push(POJO);
  }
}

export { Pool };
