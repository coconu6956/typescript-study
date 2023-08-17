import { pureDelete } from "./pureDelete";

const mixedArray: object[] = [
  [], {name: 'Jack'}, {name: 'John', age: 32}, [`description`] 
]

const objectsOnly: object[] = pureDelete(mixedArray, (val) => Array.isArray(val))

console.log(mixedArray, objectsOnly)