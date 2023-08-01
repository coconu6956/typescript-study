# typescript-study 03 - 객체와 타입

# 타입스크립트 변수 선언문

## 타입스크립트 기본 제공 타입

유형 | 자바스크립트 타입 | 타입스크립트 타입
---- | ---- | ----
수 타입 | Number | number
불리언 타입 | Boolean | boolean
문자열 타입 | String | string
객체 타입 | Object | object

## let, const 

ES5 자바스크립트는 variable의 앞 세글자를 딴 var라는 키워드를 사용해 변수 선언.
ESNext에서는 var 키워드를 사용하지 말라고 권고

- let: 변수 
```javascript
let 변수이름 [= 초깃값]
```

- const : 상수
```javascript
const 변수이름 [= 초깃값]
```

## 타입 주석

자바스크립트 변수 선언문을 확장해 다음과 같은 형태로 타입을 명시 할 수 있음. 이를 타입 주석이라 함. 
```javascript
let 변수이름: 타입 [=초깃값]
const 변수이름: 타입 = 초깃값
```
```javascript
let n: number = 1
let b: boolean = true
let s: string = 'hello'
let o: object = {}
```

let으로 선언한 변숫값은 타입 주석으로 명시한 타입에 해당하는 값으로만 바꿀 수 있음. 

```javascript
let n: number = 1
let b: boolean = true
let s: string = 'hello'
let o: object = {}

// 타입 불일치
n = 'a'
b = 1
s = false
o = {name: 'Jack', age: 32}
```

## 타입 추론

타입스크립트는 자바스크립트와 호환성을 위해 타입 주석 부분 생략 가능.
컴파일러는 다음과 같은 코드를 만나면 대입 연산자 = 오른쪽 값에 따라 변수 타입 지정. 이를 타입 추론이라 함.

```javascript
let n = 1
let b = true
let s = 'hello'
let o = {}
```

## any 타입

자바스크립트와 호환을 위해 any라는 이름의 타입 제공. 
타입과 무관하게 어떤 종류의 값도 저장 가능.

```javascript
let a: any = 0
a = 'hello'
a = true
a = {}
```

## undefined 타입

자바스크립트에서 undefined는 값임.
변수를 초기화하지 않으면 해당 변수는 undefined라는 값을 가짐.
그러나 타입스크립트에서는 undefined는 타입임.

```javascript
let u: undefined = undefined
u = 1 // Type '1' is not assignable to type 'undefined'
```
타입 상속 관계를 보면 any는 모든 타입의 루트 타입, 최상위 타입
반면 undefined는 모든 타입의 최하위 타입.

``` bash
|-- any
|    |---number, boolean, string
|    |---object
|          └── inerface, class
└── undefined
```

## 템플릿 문자열

```typescript
`${변수이름}`
```

# 객체와 인터페이스

object타입으로 선언된 변수는 number, boolean, string 값을 가질 수는 없지만, 다음처럼 속성 이름이 다른 객체를 모두 자유롭게 담을 수 있음.

```typescript
let o: object = {name: 'Jack', age: 32}
o = {first: 1, second: 2}
```

object타입은 마치 객체를 대상으로 any타입터럼 동작.
이렇게 동작하지 않게 하려는 목적으로 **인터페리스 구문** 고안

## 인터페이스 선언문

타입스크립트는 객체의 타입을 정의할 수 있게 interface라는 키워드 제공
이너페이스는 객체의 타입을 정의하는 것이 목적. 

```typescript
interface 인터페이스 이름{
  속성이름[?]: 속성타입[,...]
}
```

```typescript
interface IPerson{
  name: string
  age: number
}
```

## 선택 속성 구문

인터페이스를 설계할 때 어떤 속성은 반드시 있어야 하지만, 어떤 속성은 있어도 되고 없어도 되는 형태로 만들고 싶을 때가 있음.
이러한 속성을 선택 속성(optional property)라 함.

```typescript
interface IPerson2 {
  name: string  // 필수 속성
  age: number   // 필수 속성
  etc?: boolean // 선택 속성
}
```

## 익명 인터페이스
interface 키워드 사용하지 않고 이름도 없는 인터페이스를 만들 수 있음.
이를 익명 인터페이스(anonymous interface)라 함.

```typescript
let ai: {
  name: string
  age: number
  etc?: boolean
} = {name: 'Jack', age: 32}
```

# 객체와 클래스

## 클래스 선언문

```typescript
class 클래스 이름 {
  [private | protected | public] 속성이름[?]: 속성타입[...]
}
```

```typescript
class Person1 {
  name: string
  age?: number 
}
```

## 접근 제한자

클래스의 속성은 public, private, protect와 같은 접근 제한자를 이름 앞에 붙일 수 있음. 생략하면 public으로 간주.

## 생성자
constructor라는 이름의 생성자 포함.
객체 초기화를 위해 선언.

```typescript
class Person2 {
  constructor(public name: string, public age?: number) {}
}

let jack2: Person2 = new Person2('jack', 32)
console.log(jack2)
```

## 인터페이스 구현

클래스가 인터페이스를 구현할 때는 다음처럼 implements 키워드 사용

```typescript
class 클래스 이름 implements 인터페이스 이름 {

}
```
인터페이스는 이러이러한 속성이 잇어야 한다는 규약에 불과할 뿐 물리적으로 해당 속성을 만들지 않는다. 
따라서 클래스 몸통에는 반드시 인터페이스가 정의하고 있는 속성을 멤버 속성으로 포함해야함.
```typescript
interface IPerson4 {
  name: string
  age?: number
}

class Person4 implements IPerson4 {
  name: string
  age?: number
}
```

## 추상 클래스 

추상 클래스는 자신의 속성이나 메서트 앞에 abstract를 붙여 나를 상속하는 다른 클래스에서 이 속성이나 메서드를 구현하게 함.

```typescript
abstract class 클래스 이름 {
  abstract 속성이름: 속성타입
  abstract 메서드 이름() {}
}

abstract class AbstractPerson5 {
  abstract name: string
  constructor(public age?: number) {}
}
```
abstract가 붙었으므로 new 연간자를 적용해 객체를 만들 수 없음.

## 클래스 상속

```typescript
class 상속 클래스 extends 부모 클래스 { ...}
```
참고로 타입스크립트에서 부모 클래스의 생성자를 super키워드로 호출 가능.

## static 속성
정적 속성

```typescript
class 클래스 이름{
  static 정적 속성 이름: 속성 타입
}
```




