# typescript-study 01

# 세 종류의 자바스크립트 
- 자바스크립트는 현재 세 가지 종류가 있음
- ES5 / 웹 브라우저에서 동작하는 표준 자바스크립트
- ESNext : 매년 새로운 버전을 발표
  > ES6 이후 버전을 통틀어 가리키는 말 '새로운 자바스크립트'라는 뜻 
- Typescript(타입스크립트) : ESNext에 타입 기능 추가 

TypeScript > ESNext > ES5

# 트랜스파일
ESNext 자바스크립트 소스코드는 바벨이라는 트랜스파일러를 거치면 ES5 자바스크립트 코드로 변환.
바벨과 유사하게 타입스크립트 소스코드는 TSC(TypeScript Compiler)라는 트랜스파일러를 통해 ES5 자바스크립트 코드로 변환 

- 트랜스파일러란?
> 어떤 프로그래밍 언어로 된 소스코드로 바꿔주는 프로그램. 텍스트로 된 소스코드를 바이너리 코드로 바꿔주는 컴파일러와 구분하기 위해 생긴 용어  

# ESNext 주요 문법
## (1) 비구조화 할당
비구조화 할당은 객체와 배열에 적용할 수 있음
``` javascript
let person = {name: : 'John', age: 22}
let {name ,age} = person // name = 'jane', age = 22

let array = [1, 2, 3, 4]
let [head, ...rest] = array // head = 1, rest = [2, 3, 4]

let a =1, b = 2
[a, b] = [b, a]  // a = 2, b = 1
```

## (2) 화살표 함수
코드를 간결하게 작성해서 읽기 좋음
``` javascript
function add(a, b) {return a + b}
const add2 = (a, b) => a + b
```

## (3) 클래스
객체지향 프로그래밍은 
- 캡슐화(encapsulation)
- 상속(inheritance)
- 다형성(polymorphism)  
지원

``` javascript
abstract class Animal {
  constructor(public name?: string, public age?: number) { }
  abstract say(): string
}

class Cat extends Animal {
  say() { return '애옹' }
}

class Dog extends Animal {
  say() { return '왈왈' }
}

let animals: ANimal[] = [new Cat('애옹이', 2), new Dog('댕댕이', 3)]
let sounds = animals.map(a => a.say()) //['애옹','왈왈']
```

## (4) 모듈
모듈을 사용하면 코드를 여러 개 파일로 분할해서 작성 가능.
변수나 함수, 클래스 등 export 키워드를 사용해 모듈로 만들면 다른 파일에서도 사용 가능.
이렇게 만든 모둘을 가져오고 싶을 때는 import 키워드를 사용
``` javascript
import * as fs from 'fs'
export function writeFile(filepath: string, content: any){
  fs.writeFile(filepath, content, (err) => {
    err && console.log('error', err)
  })
}
```

## (5) 생성기
타입스크립트는 yield라는 특별한 키워드 제공
yield문은 '반복자'를 의미하는 반복기(iterator)를 생성할 때 사용. 그런데 반복기는 독립적으로 존재하지 않고 반복기 제공자(iterable)를 통해 얻음
yield문을 이용해 반복기를 만들어 내는 반보기 제공자를 '생성기(generator)'라 부름

생성기는 function 키워드에 별표를 결합한 'function*'과 yield 키워드를 이용해 만듬.
타입스크립트에서 yield는 반드시 function*으로 만들어진 함수 내부에서만 사용 가능.
``` javascript
function* gen(){
  yield* [1,2]
}
for(let value of gen()) {console.log(value)} //1, 2
```

## (6) Promise, async/await 구문
``` javascript
async function get(){
  let values = []
  valuse.push(await Promise.resolve(1))
  valuse.push(await Promise.resolve(2))
  valuse.push(await Promise.resolve(3))
  return values
}

get().then(valuse => console.log(values)) // [1, 2, 3]
```

awiat는 Promist 객체를 헤소(resolve)해줌.
아래 get함수는 [1, 2, 3] 값을 Promist 형태로 반환.
get이 반환한 Promise 객체는 then 메서드를 호출해 실제 값을 얻을 수 있음. 

# 타입스크립트 고유 문법 살펴보기
## (1) 타입 주석과 타입 추론
```javascript
let n: number = 1
let m = 2
```
변수 n 뒤에 콜론(:) = 타입 주석(type annotation)이라고 함
2행처럼 타입 부분을 생략할 수 있음. 
- 타입 추론(type inference) : 변수의 타입 부분이 생략되면 대입 연산자(=)의 오른쪽 값을 분석해 왼쪽 변수의 타입을 결정
- 타입 추론 기능은 자바스크립트 소스코드와 호환성을 보장하는데 큰 역할을 함
- 자바스크립트로 작성된 '.js' 파일을 확장자만 '.ts'로 바꾸면 타입스크립트 환경에서도 바로 동작

## (2) 인터페이스 
인터페이스는 상호 간에 정의한 약속 혹은 규칙
``` javascript
interface Person {
  name: string
  agr?: number
}

let person:person = {name: "Jane"}
```

## (3)튜플
튜플은 뮬리적으로는 배열과 같음.
다만, 배열에 저장되는 아이템의 데이터 타입이 모두 같은면, 배열, 다르면 튜플
```javascript
let numberArray: number[ ] = [1, 2, 3] // 배열
let tuple: [boolean, number, string] = [true, 1, 'Ok'] // 튜플
```

## (4)제네릭 타입
다양한 타입을 한꺼번에 취급할 수 있게 해줌.
```javascript
class Container<T>{
  constructor(public value: T) { }
}

let numberContainer: Container<number> = new Container<number>(1)
let stringContainer: Container<string> = new Container<string>("Hello wold")
```
## (5)대수 타입
ADT란, 추상 데이터 타입(adstract data type)을 의미하기도 하지만 대수 타입(algebraic data type)이라는 의미로도 사용됨.
- 대수 타입이란, 다른 자료형의 값을 가지는 자료형을 의미
- 합집한 타입(| : union, sum type)과 교집합 타입(& : intersection, product type)
 두가지 있음

```javascript
type NumerOrString = number | string
type AnimalAndPerson = Animal & Person 
```

# 01-3 타입스크립트 개발 환경 만들기

## 비주얼 스튜디오 코드 설치
## Node.js 설치
> 안정버전 LTS(long term support) 버전 설치
## 타입스크립트 컴파일러 설치
```shell
npm i -g typescript
tsc --version
```

## 파일 생성
```shell
touch hello.ts
```

## 타입스크립트 컴파일과 실행
```shell
tsc hello.ts
```
> hello.js 파일 생김. TSC에 의해 트랜스파일됭서 helo.js 파일 생성

```shell
node helo.js
```
실행

## ts-node 설치
ES5로 변환하고 실행까지 동시에 하려면 ts-node 설치

```shell
npm i -g ts-node
ts-node hello.ts
```

