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







