import { IPerson, ICompany } from "./IPerson_ICompany";

let jack: IPerson = {name: 'jack', age: 32},
    jane: IPerson = {name: 'jane', age: 32}

let apple: ICompany = {name: 'Apple Computer, Inc', age:43},
    ms: ICompany = {name: 'Microsoft', age:44}

    console.log(jack, jane, apple, ms)