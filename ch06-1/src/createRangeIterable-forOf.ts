import { createRangeIterable } from "./createRangeIterable";

const iterator = createRangeIterable(1, 3 + 1)
for(let value of iterator) 
  console.log(value)
