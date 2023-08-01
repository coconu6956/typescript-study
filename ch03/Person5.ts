abstract class AbstractPerson5 {
  abstract name: string
  constructor(public age?: number) {}
}

class Person5 extends AbstractPerson5 {
  constructor(public name: string, age?: number){
    super(age)
  }
}

let mimi : Person5 = new Person5('mimi', 30)
console.log(mimi)