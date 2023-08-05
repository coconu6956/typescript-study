import { IPerson } from "./IPerson_ICompany";

let jack: IPerson = {name: 'jack', age: 32}
let {name, age} = jack
console.log(name, age)