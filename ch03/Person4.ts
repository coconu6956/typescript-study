interface IPerson4 {
  name: string
  age?: number
}

class Person4 implements IPerson4 {
  constructor(public name: string, public age?: number){}
}

let june: IPerson4 = new Person4('june',20)
console.log(june)