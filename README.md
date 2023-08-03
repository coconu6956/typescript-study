# typescript-study

# 04 함수와 메서드

## 04-1 함수 선언문

자바스크립트에서 함수 선언문
```javascript
function 함수이름(매개변수1, 매개변수2[, ...]) {

}
```

타입스크립트에서 함수 선언문
매개변수와 함수 반환값에 다입 주석을 붙이는 형태

```typescript
function 함수이름(매개변수1: 타입1, 매개변수2: 타입2[,...]): 반환값 타입 {
}
```
```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

### 매개변수와 인수, 인자
일반적으로 parameter는 매개변수라고 하고, argument는 인수 혹은 인자라고 함. 
- 매개변수는 함수 선언문에서 함수 이름 뒤 괄호 안에 선언하는 변수
- 인수는 함수를 호출할 때 전달하는 값
```typescript
// a,b는 매개변수
function add(a: number, b: number): number {
  return a + b;
}

let result = add(1, 2) //1, 2는 인수
```

## 매개변수와 반환값의 타입 주석 생략

변수와 마찬가지로 함수 선언문에서 매개변수와 반환값 타입 주석 생략 가능.
다마느 변수 때와 달리 함수의 매개변수 타입과 반환 타입을 생략하는 것은 바람직하지 못함. 타입이 생략되어 있으면 함수의 구현 의도를 알기 어렵고, 잘못 사용하기 쉬움.

## void 타입

값은 반환하지 않는 함수는 반환 타입이 void 임. void는 함수 반환 타입으로만 사용 가능.

```typescript
function printMe(name: string, age: number): void {
  console.log(`name: ${name}, age: ${age}`)
}
```

## 함수 시그니처

함수의 타입을 함수 시그니처(function signature)라고 함.

```typescript
(매개변수1 타입, 매개변수2타입[,...]) => 반환값 타입
```

```typescript
let printMe: (string, number) => void = function(name: string, age: number): void {}
```
()=> void 매개변수도 없고 반환값도 없는 함수 시그니처임.

## type 키워드로 타입 별칭 만들기

타입 별칭(type alias)

```typescript
type 새로운 타입 = 기존 타입
```

```typescript
type stringNumberFunc = (string, number) => void

let f: stringFunc = function(a: string, b: number): void {}
let g: stringFunc = function(c: string, d: number): void {}

```

## undefined 관련 주의 사항

다음은 undefined 타입을 고려하지 않은 예

```typescript
interface INameable {
  name: string
}

function getName(o: INameable) {return o.name}

let n = getName(undefined) // 오류 발생
console.log(n)
```

고려한 예

```typescript
interface INameable {
  name: string
}

function getName(o: INameable){
  return o != undefined ? o.name : 'unknown name'
}

let n = getName(undefined)
console.log(n)
console.log(getName({name: 'jack'}))
```

```typescript
interface IAgeable {
  age?: number
}
function getAge(o: IAgeable){
  return o != undefined && o.age ? o.age : 0
}

console.log(getAge(undefined))
console.log(getAge(null))
console.log(getAge({age: 32}))
```

## 선택적 매개변수(optional parameters)

```typescript
function fn(arg1: string, arg?: number): void {}
```

```typescript
function fn(arg1: string, arg?: number) {console.log(`arg: ${arg}`)}

fn('hello', 1)  // arg: 1
fn('hello')     // arg: undefined
```

선택적 매개변수가 있는 함수의 시그니처는 다음처럼

```typescript
type OptionalArgFunc = (string, number?) => void
```