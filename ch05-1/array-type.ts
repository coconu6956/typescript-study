let numArray: number[] = [1,2,3]
let strArray: string[] = ['Hello','World']

type IPerson = {name: string, age?: number}
let personArray: IPerson[] = [{name: 'John'}, {name: 'Jane', age: 32}]

console.log(personArray)