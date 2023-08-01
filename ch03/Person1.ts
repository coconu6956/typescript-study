class Person1 {
  name: string
  age?: number
}

let jack1: Person1 = new Person1();
jack1.name = 'Jack';
jack1.age = 32;

console.log(jack1.name);
console.log(jack1.age !== undefined ? jack1.age : 'Age not provided');
