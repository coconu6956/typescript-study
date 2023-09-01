# 07 Promise와 async/await 구문

# 07-1 비동기 콜백 함수

이번 장은 node.js가 제공하는 readFile과 같은 비동기 API를 예로 들고 있음.
타입스크립트에서 readFile 같은 node.js API를 사용하려면 tsconfig.json파일에 별도의 설정이 필요. 따라서 이번 장의 예제 소스를 동작시키려면 node.js프로젝트 설정이 필요

## 실습 프로젝트 설정

```shell
mkdir ch07-1
ch ch07-1
npm init --y
npm i -D typescript ts-node @types/node
mkdir src
```
이전 장 tsconfig.json 복사하거나 tsc --init 명령으로 파일 생성.
tsconfig.json에 downloadIteration 항목을 true 로 설정

## 동기와 비동기 API

node.js는 파일 시스템(file system)과 관련된 기능을 모아둔 fs패키지 제공.
fs패키지는 같은 기능을 '동기(synchronous)'와 '비동기(ansynchronous)'버전으로 나누어 제공.
예를 들어 파일을 읽는 기능은 동기 버전인 **readFileSync**와 비동기 버전인 **readFile** 제공.

```typescript
import { readFileSync, readFile } from "fs";

// package.json파일을 동기 방식으로 읽는 예
console.log('read package.json using synchronous api ...')
const buffer: Buffer = readFileSync('./package.json')
console.log(buffer.toString())

// package.json 파일을 비동기 방식으로 읽는 예
readFile('./package.json', (error: Error, buffer: Buffer) => {
  console.log('read package.json using ansynchronous api ...')
  console.log(buffer.toString())
})

// Promise와 async/await 구문을 사용한 예
const readFilePromise = (filename: string): Promise<string> => 
  new Promise<string>((resolve, reject) => {
    readFile(filename, (error: Error, buffer: Buffer) => {
      if(error)
        reject(error)
      else 
        resolve(buffer.toString())
    })
  });

  (async () => {
    const content = await readFilePromise('./package.json')
    console.log('read package.json using Promise and async.awiat ...')
    console.log(content)
  })()
```

운영체제가 제공하는 서비스를 API라고 함.
API는 타입스크립트와 같은 프로그래밍 언어의 함수 형태로 제공됨. 그런데 API함수는 일반 함수와 달리 하드디스크에 저장된 파일을 읽는 등 실행 시 물리적인 시간이 소요됨.

따라서 파일 내용을 모두 읽을 때까지 프로그램 동작을 잠시 멈추는 동기 방식의 API와 프로그램의 동작을 멈추지 않는 대신 결과를 콜백 함수로 얻게 하는 비동기 방식의 API를 제공함. 즉, 똑같은 기능을 대상으로 두 가지 방식의 API를 제공.

비동기 API의 콜백 함수를 특별히 '비동기 콜백 함수'라고 함
비동기 콜백 함수는 일반 함수와 달리 API의 물리적인 동작 결과를 수신하는 목적으로만 사용.

## readFileSync와 readFile API

웹 브라우저와 달리 node.js는 운영체제 파일 시스템에 있는 파일을 읽을 수 있음.
node.js에서 파일 읽기는 readFileSync라는 이름의 API를 사용해서 구현.
readFileSync는 파일을 읽어서 Buffer라는 타입으로 전달해줌.

```typescript
import {readFileSync} from 'fs'
readFileSync(path: string): Buffer
```
Buffer는 node.js가 제공하는 클래스로서 바이너리 데이터를 저장하는 기능을 수행.
Buffer의 데이터를 문자열로 만들려고 할 때는 Buffer의 toString 메서드를 사용.

동기 방식 API는 작업이 종료될 때까지 프로그램을 일시적으로 멈추게 하는 특징이 있음.

```typescript
import { readFileSync } from "fs";

//package.json 파일의 바이너리 내용
const buffer: Buffer = readFileSync("./package.json");
const content: string = Buffer.toString();
console.log(content);
```

비동기 버전 readFile 제공.

```typescript
import {readFile} from 'fs'
readFile(파일경로, 콜백함수: ( error: Error, buffer: Buffer) => void)
```

```typescript
import { readFile } from "fs";

readFile('./package.json', (err: Error, buffer: Buffer)=> {
  if(err) throw err // 오류 발샐 시 처리 코드
  else {
    const content: string = buffer.toString();
    console.log(content)
  }
})
```

## 단일 스레드와 비동기 API

자바스크립트는 단일 스레드(single-thread)로 동작하므로 될 수 있으면 readFileSync와 같은 동기 API를 사용하지 말아야 함.
타입스크립트 또한 ES5 자바스크립트로 변환되어 실행되므로 자바스크립트와 마찬가지로 될 수 있으면 동기 API를 사용하지 말아야 함.

- 단일 스레드로 동작하는 자바스크립트
> 스레드는 CPU가 프로그램을 동작시키는 최소 단위.
> 운영체제가 프로그램이 실행되고 있는 상태일 때를 프로세스라고 함. 
> 프로세스는 한 개의 주 스레드와 여러 개의 작업 스레드를 동작 시킴.
> 자바스크립트 코드는 항상 한 개의 작업 스레드에서 실행됨.
> 웹 브라우저나 node.js프로그램 자체는 다중 스레드로 동작하지만, 자바스크립트 코드는 항상 한개의 작업 스레드, 즉 단일 스레드에서 동작

## 콜백 지옥

비동기 API를 사용하면 콜백 함수에서 다시 또 다른 비동기 API를 호출하는 코드를 만들 때 코드가 매우 복잡해짐.

```typescript
import { readFile } from "fs"

readFile('./package.json',(err:Error, buffer: Buffer) => {
  if(err) throw err
  else {
    const content: string = buffer.toString()
    console.log(content)

    readFile('./tsconfig.json',(err:Error, buffer: Buffer) => {
      if(err) throw err
      else {
        const content: string = buffer.toString()
        console.log(content)
      }
    })
  }
})
```

- 자동 세미콜론 삽입 기능이란?
> 자바스크립트와 타입스크립트 문법에는 자동 세미콜론 삽입(automatic semicolon insertion, ASI)이라는 원칙이 있음.
> ASI는 세미콜론이 생략되면 자동으로 세미콜론을 삽입해 주는 컴파일러의 기능
> 그런데 ASI 기능이 적용되지 않는 다음 3가지 경우가 있음 
> 1. 문장이 '('기호로 시작될 때
> 2. 문장이 '['기호로 시작될 때
> 3. 문장이 역따옴표'`'로 시작될 때

## Promise 이해하기

자바스크립트 언어에서 프로미스는 ES6 버전에서 정식 기능으로 채택됨.
자바스크립트에서 프로미스는 Promise라는 이름의 클래스임.
따라서 Promise 클래스를 사용하려면 일단 new연산자를 적용해 프로미스 객체를 만듬.
그리고 new 연산자로 프로미스 객체를 만들 때 다음처럼 콜백 함수를 제공.

```typescript
const promise = new Promise(콜백함수)
```

여기서 Promise의 콜백 함수는 resolve, reject라는 두 개의 매개변수를 가짐.

```typescript
(resolve, reject) => {}
```

타입스크립트에서 Promise는 다음처럼 제네릭 클래스 형태로 사용.

```typescript
const numPromise: Promise<number> = new Promise<number>(callback)
const strPromise: Promise<string> = new Promise<string>(callback)
const arrayPromise: Promise<number[]> = new Promise<number[]>(callback)
```

타입스크립트 Promise의 콜백 함수는 다음처럼 resolve, reject 함수를 매개변수로 받는 형태.

```typescript
new Promise<T>((
  resolve: (sucessValue: T) => void,
  reject: (any) => void
)=> {
  // code ....
})
```

## resolve와 reject 함수

프로미스를 코드 없이 이해하기 어려우므로 일단 프로미스를 사용하는 코드를 작성해보겠음.
다음 코드는 앞 절에서 설명한 비동기 방식 API인 readFile을 호출하는 내용을 프로미스로 구현한 예임.

```typescript
import { readFile } from 'fs';
import { resolve } from 'path';

export const readFilePromise = (filename: string): Promise<string> => new Promise<string>((
  resolve: (value: string) => void,
  reject: (error: Error) => void) => {
    readFile(filename, (err: Error, buffer: Buffer) => {
      if(err) reject(err)
      else resolve(buffer.toString())
    }) 
  })
```

```typescript
import { readFilePromise } from "./readFilePromise";

readFilePromise('./package.json')
  .then((content: string) => {
    console.log(content)  //package.json 파일을 읽는 내용
    return readFilePromise('./tsconfig.json');
  })
  .then((content: string) => {
    console.log(content) //tsconfig.json 파일을 읽는 내용
    /* catch 쪽 콜백 함수에 'EISDIR: illegal operation on a direcktory, read'라는 오류 메시지 전달 */
    return readFilePromise('.');
  })
  .catch((err: Error) => console.log('error:', err.message))
  .finally(()=> console.log('프로그램 종료'))
```
코드를 실행해 보면 readFilePromise에서 resolve 함수를 호출한 값은 then 메서드의 콜백 함수 쪽에 전달되고, reject 함수를 호출한 값은 catch메서드의 콜백 함수 쪽에 전달되는 것을 볼 수 있음.

그리고 마지막에 '프로그램 종료'라는 출력을 볼 수 있는데, 이것은 finally 메서드가 호출되었다는 것을 의미. Promise 객체의 메서드 체인 코드에서 finally는 항상 마지막에 호출.

## Promise.resolve 메서드

promise 클래스는 resolve라는 클래스 메서드(정적 메서드)를 제공.
앞서 Promise 객체를 생성할 때 resolve 함수를 호출했는데, Promise.resolve는 이를 클래스 메서드로 구현한 것.
Promise.resolve(값) 형태로 호출하면 항상 이 '값'은 then메서드에서 얻을 수 있음.

```typescript
Promise.resolve(1)
  .then(value => console.log(value)) // 1

Promise.resolve('hello')
  .then(value => console.log(value)) // hello

Promise.resolve([1, 2, 3])
  .then(value => console.log(value)) // [1 2 3]

Promise.resolve({name: 'Jack', age: 32})
  .then(value => console.log(value)) // {name: 'Jack', age: 32}
   
```

## Promise.reject 메서드

Promise.reject(Error 타입 객체)를 호출하면 이 'Error 타입 객체'는 항사 catch 메서드의 콜백 함수에서 얻을 수 있음.

```typescript
Promise.reject(new Error('에러 발생'))
  .catch((err: Error) => console.log('error:', err.message)) // error: 에러 발생
```

## then-체인

Promise의 then 인스턴스 메서드를 호출할 때 사용한 콜백 함수는 값을 반환할 수 있음.

이 then에서 반환된 값은 또 다른 then 메서드를 호출해 값을 수신할 수 있음.
흥미롭게도 then메서드는 반환된 값이 Promise 타입이면 이를 해소(resolve)한 값을 반환함. 만약 거절(reject)당한 값일 때는 catch메서드에서 이 거절당한 값을 얻을 수 있음.

Promise 객체에 then 메서드를 여러 번 호출하는 코드 형태를 'then-체인(then-chain)'이라고 함.

```typescript
Promise.resolve(1)
  .then((value: number) =>{
    console.log(value)  // 1
    return Promise.resolve(true)
  })
  .then((value: boolean) =>{
    console.log(value) //true
    return [1, 2, 3]
  })
  .then((value: number[]) => {
    console.log(value) // [1, 2, 3]
    return {name: 'Jack', age: 32}
  })
  .then((value: {name: string, age: number}) => {
    console.log(value) // { name: 'Jack, age: 32 }
  })
```

## Promise.all 메서드

Array 클래스는 every라는 이름의 인스턴스 메서드를 제공.
every 메서드는 배열의 모든 아이템이 어떤 조건을 만족하면 true를 반환함.

```typescript
const isAllTrue = (values: boolean[]) => values.every((value => value == true))

console.log(
  isAllTrue([true, true, true]), // true
  isAllTrue([false, true, true]) // false
)
```

Promise 클래스는 앞 every처럼 동작하는 all 이라는 이름의 클래스 메서드를 제공.

```typescript
all(프로미스 객체 배열: Promise[]): Promise<해소된 값들의 배열(혹은 any)>
```

```typescript
const getAllResolvedResult = <T>(promises: Promise<T>[]) => Promise.all(promises)

getAllResolvedResult<any>([Promise.resolve(true), Promise.resolve('hello')])
.then(result => console.log(result)) // [true, 'hello']

getAllResolvedResult<any>([Promise.reject(new Error('error')), Promise.resolve(1)])
.then(result => console.log(result)) // 호출되지 않는다
.catch(error => console.log('error :', error.message)) // error: error
```

## Promise.race 메서드

Array 클래스는 배열의 내용 중 하나라도 조건을 만족하면 true를 반환하는 some이라는 인스턴스 메서드를 제공.

```typescript
const isAnyTrue = (values: boolean[]) => values.some((value => value == true))

console.log(
  isAnyTrue([false, true, false]),  // true
  isAnyTrue([false, false, false])  // false
)
```

```typescript
Promise.race([Promise.resolve(true), Promise.resolve('hello')])
  .then(value => console.log(value))

Promise.race([Promise.resolve(true), Promise.reject(new Error('hello'))])
  .then(value => console.log(value))  // true
  .catch(error => console.log(error.message)) // 호출되지 않는다

Promise.race([Promise.reject(new Error('error')), Promise.resolve(true)])
  .then(value => console.log(value)) // 호출되지 않는다.
  .catch(error => console.log(error.message)) // error
```
## async와 await 구문

```typescript
const test = async () => {
  const value = await Promise.resolve(1)
  console.log(value)
}
test()
```

## await 키워드

await 키워드는 피연산자(operand)의 값을 반환해 줌.
그런데 만일 피연산자가 Promise객체이면 then메서드를 호출해 얻은 값을 반환.

```typescript
let value = await Promise 객체 혹은 값
```

## async 함수 수정자

await 키워드는 항상 async라는 이름의 함수 수정자가 있는 함수 몸통에서만 사용 가능.

```typescript
const test1 = async() => {
  await Promise 객체 혹은 값
}

async function test2() {
  await Promise 객체 혹은 값
}
```

```typescript
export const test1 = async () => {
  let value = await 1
  console.log(value)  //1
  value = await Promise.resolve(1)
  console.log(value) //1
}
```

```typescript
export async function test2(){
  let value = await 'hello'
  console.log(value)  // hello
  value = await Promise.resolve('hello')
  console.log(value) // hello
}
```

```typescript
import { test1 } from "./test1";
import { test2 } from "./test2";

test1()
test2()
/* result
1
hello
1
hello */
```

## async 함수의 두 가지 성질

async 함수 수정가가 붙은 함수는 다음처럼 흥미로운 성질이 있음.

- 일반 함수처럼 사용 가능.
- Promise 객체로 사용 가능.

```typescript
import { test1 } from "./test1";
import { test2 } from "./test2";

test1()
  .then(()=> test2())

/* result
1
1
hello
hello
*/  
```

## async 함수가 반환하는 값의 의미
async 함수는 값을 반환할 수 있음.
이때 반환값은 Promise 형태로 변환되므로 다음처럼 then메서드를 호출해 async 함수의 반환값을 얻어야 함.

```typescript
const asyncReturn = async() => {
  return [1, 2, 3]
}

asyncReturn()
  .then(value => console.log(value)) // [1, 2, 3]
```

## async 함수의 예외 처리

다음처럼 예외가 발생하면 프로그램이 비정상으로 종료됨.

```typescript
const asyncReturn = async() => {
  throw new Error('error')
}
asyncReturn() // 예외 발생
```

예외가 발생해서 프로그램이 비정상으로 종료하는 상황을 막으려면, 다음처럼 단순히 함수 호출 방식이 아닌, catch 메서드를 호출하는 형태로 코드를 작성해야 함.

```typescript
const asyncException = async () => {
  throw new Error('error')
}

asyncException()
  .catch(err => console.log('error: ', err.message)) // error: error
```

만일, await 구문에서 Promise.reject값이 발생하면 앞에서와 마찬가지로 프로그램이 비정상으로 종료함.

```typescript
const awaitReject = async() => {
  awiat Promisr.reject(new Error('error'))
}
awiatReject() // 비정상 종료
```

```typescript
const awaitReject = async () => {
  await Promise.reject(new Error('error'))
}

awaitReject()
  .catch(err => console.log('error:', err.message)) // error: error
```

## async 함수와 Promise.all

```typescript
import { readFilePromise } from './readFilePromise';

const readFileAll = async (filenames: string[]) => {
  return await Promise.all(
    filenames.map(filename => readFilePromise(filename))
  )
}

readFileAll(['./package.json','./tsconfig.json'])
  .then(([packageJson, tsconfigJson]: string[]) =>{
    console.log('<package.json>', packageJson)
    console.log('<tsconfig.json>', tsconfigJson)
  })
  .catch(err => console.log('error:', err.message))
```