# typescript-study 02

> 1. 타입스크립트로 프로젝트 개발 방법 
> 2. import, export 키워드를 사용해 여러 개 소스 파일 관리 방법
> 3. tsc 타입스크립트 컴파일러의 설정 파일인 tsconfig.json 내용 살펴봄

# 타입스크립트 프로젝트 만들기
타입스크립트 개발은 node.js 프로젝트를 만든 다음, 개발 언어를 타입스크립트로 설정하는 방식으로 진행
``` shell
> mkdir ch02-1
> npm init --y

// package.json
{
  "name": "ch02-1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

# 프로젝트 생성자 관점에서 패키지 설치하기
package.json 파일을 만들었으면 프로젝트 구현에 필요한 다양한 오픈소스 패키지를 npm install 또는 간단히 npm i 명령으로 설치.

> 패키지 설치 명령 옵션

 npm i 옵션 | 의미 | 단축 명령 
 ---- | ---- | ----
 --save | 프로젝트를 실행할 때 필요한 패키지로 설치. 패키지 정보가 package.json 파일의 'dependencies' 항목에 등록 | -S 
 --save-dev | 프로젝트를 개발할 때만 필요한 패키지로 설치. 패키지 정보가 package.json파일의 'devDependencies' 항목에 등록 | -D 

타입스크립트 프로젝트는 보통 **typescript**와 **ts-node** 패키지를 설치. 
```shell
> npm i -D typescript ts-node
```

자바스크립트로 개발된 chance, ramda와 같은 라이브러리들은 추가로 @types/chance, @types/ramda와 같은 타입 라이브로리들을 제공해야함.
**@types/** 가 앞에 붙는 타입 라이브러리들은 항상 index.d.ts 라는 이름의 파일을 가지며, 타입스크립트 컴파일러는 이 파일의 내용을 바탕으로 chance, ramda와 같은 라이브러리가 제공하는 함수들을 올바르게 사용했는지 검증.   

타입스크립트는 또한 웹 브라우저나 node.js가 기본으로 제공하는 타입들의 존재도 그냥 알지 못함. 예로, Promise와 같은 타입을 사용하려면 @types/node라는 패키지 설치해야함.
```shell
> npm i -D @types/node
```

node_modules 디렉터리와 그 아래 각 패키지의 디렉터리를 확인 가능.

# tsconfig.json 파일 만들기
타입스크립트 프로젝트는 타입스크립트 컴파일러의 설정 파일인 tsconfig.json 파일이 있어야함. 

```shell
> tsc --init
```

이렇게 만들어진 기본 tsconfig.json 파일을 열어 보면 실제 개발을 진행하는 데 필요한 옵션이 비활성되어 있음.
```json
{
  "compilerOptions":{
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es5",
    "moduleResolution" : "node",
    "outDir" : "dist",
    "baseUrl" : ".",
    "sourceMap" : true,
    "downlevelIteration": true,
    "noImplicitAny": false,
    "paths" : { "*" : ["node_modules/*"] }
  },
  "include" : ["src/**/*"]
}
```

# src 디렉터리와 소스 파일 만들기
tsconfig.json 파일에서 include 항목이 있음. 
이 항목에는 ["src/**/*"]라는 값이 설정되어 있는데, 이것은 ./src, ./src/utills 디렉터리에 이 프로젝트의 모든 타입스크립트 소스 파일이 있다는 뜻

```shell
> mkdir -p src/utils
```
실습에 필요한 소스 파일 생성
```shell
> touch src/index.ts src/utils/makePerson.ts
```

- 시작 소스 파일명을 index로 짓는 이유
> 소스 파일명이 index이면 파일명을 생략 가능

# packgage.json 수정
개발이 완료되면 타입스크립트 소스코드를 자바스크립트 코드로 변환해 node로 실행해야함. 이를 위해 다음처럼 package.json 파일 scripts 항목에 dev, build 명령 추가해야 함.

- dev : 개발 중에 src 디렉터리에 있는 index.ts 파일을 실행하는 용도로 사용
- build : 개발이 완료된 후 프로그램을 배포하기 위해 dist 디렉터리에 자비스크립트 파일을 만들 떄 사용

```shell
> npm run dev
```

```shell
> npm run build
```

# 모듈 이해하기

타입스크립트에서는 index.ts와 같은 소스 파일을 모듈이라고 함.
index.ts, makePerson.ts 두 개의 소스 파일을 만들었으므로 모듈을 두 개 만든 것
- 모듈화 :  코드 관리와 유지, 보수를 편리하게 하려고 모듈마다 고유한 기능을 규현하는 방식으로 소스코드를 분할하는 것

# import 키워드
export 키워드로 내보낸 심벌을 받아서 사용하려면 import 키워드로 해당 심벌을 불러와야 함. 
```javascript
import { 심벌 목록 } from  '파일의 상대 경로'
```
# import * as 구문
```javascript
import * as 심벌 from '파일 상대 경로'
```

# export default 키워드

export default 키워드는 한 모듈이 내보내는 기능 중 오직 한 개에만 붙일 수 있음.
import 문으로 불러올 때 중괄호{} 없이 사용 가능.

# 외부 패키지를 사용할 떄 import 문
```shell
> npm i -S chance ramda
> npm i -D @types/chance @types/ramda
```

- chance : 가짜 데이터를 만들어 주는 데 사용
- ramda : 함수형 유틸리티 패키지

# tsconfig.json 살펴보기
```shell
> tsc --help
```

- compilerOptions : tsc 명력 형식에서 옵션을 나타냄
- include : 대상 파일 목록을 나타냄. 컴파일 대상

**키:키값 **

## module 키

타입스크립트 소스코드가 컴파일된 자바스크립트 코드는 웹 브라우저와 node.js 양쪽에서 동작해야함.
그러나 물리적으로 동작 방식이 다름 
- 웹 브라우저 : amd (asynchronous module definition)
- node.js : commonjs

## moduleResolution 키
module 키값이 commonjs이면 moduleResolution 키값은 항상 node로 설정. 
반면, module 키값이 amd이면 moduleResolution 키값은 classic으로 설정.

## target 
트랜스파일할 대상 자바스크립트의 버전 설정
최신 버전의 node.js를 사용한다면 es6 설정

## baseUrl, outDir
트랜스파일된 자바스크립트 파일을 저장하는 디렉터리 설정

## paths
소스파일의 import문에서 from부분을 해석할 떄 찾아야 하는 디렉터리를 설정. 
import 문이 찾아야 하는 소스가 외부 패키지이면 node_modules 디렉터리에서 찾아야 하므로 키값에 node_modules/* 포함

## esModuleInterop
오픈소스 자바스크립트 라이브러리 중 웹 브라우저에서 동작하나든 가정으로 만들어진 것이 있는데, 이들은 commonjs 방식으로 동작하는 타입스크립트 코드에 혼란을 줄 수 있음. chance가 AMD 방식을 전제로 해서 구현된 라이브러리. 따라서 chance 패키지가 동작하려면 esModuleInterop 키값은 반드시 true

## sourceMap 
true 이면 트랜스파일 디렉터리에는 .js 파일 이외에도 .js.map 파일이 만들어짐. 이 소스맵 파일은 변환된 자바스크립트 코드가 타입스크립트 코드의 어디에 해당하는지를 알려줌. 소스맵 파일은 주로 디버깅할 때 사용

## downlevelIteration
생성기 구문이 정상적으로 동작하여면 true로 설정

## noImplicitAny
false 로 설정시 타입을 지정하지 않더라고 문제로 인식하지 않음.





