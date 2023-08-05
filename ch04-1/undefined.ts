interface INameable {
  name: string
}

function getName(o: INameable | undefined){
  return o != undefined ? o.name : 'unknown name'
}

let n = getName(undefined)
console.log(n)
console.log(getName({name: 'jack'}))