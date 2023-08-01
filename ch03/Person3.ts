class Person3 {
  name: string
  age?: number
  constructor(name: string, age?: number){
    this.name = name
    this.age = age
  }
}

let jane: Person3 = new Person3('Jane', 30)
console.log(jane)