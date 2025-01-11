# [메인 마크다운.md](README.md)
<br>

# 기본타입
<details>
<summary>펼치기/접기</summary>
<br>

타입스크립트가 자체적으로 제공하는 타입들을 말하며, 내장 타입이라고도 부른다.

## 타입 계층도
![타입 계층도.png](%ED%83%80%EC%9E%85%20%EA%B3%84%EC%B8%B5%EB%8F%84.png)
위 사진은 타입스크립트가 제공하는 여러개의 기본 타입들을 계층에 따라 분류한 타입 계층도, 타입 트리 라는 그림이다.  
그림을 자세히 보면 **null**, **undefined**, **number**, **string** 처럼 자바스크립트에서 이미 사용중인 타입들도 존재하며,  
그밖에 **unknown**, **any**, **void**, **never** 같은 자바스크립트에서는 볼 수 없었던 처음 듣는 생소한 타입들도 존재한다.

타입스크립트에서는 이처럼 꽤 많은 기본 타입들이 제공 되며, 각각의 타입들은 서로 부모와 자식 관계를 이루게 되면서 계층을 형성하게된다.  

## 배우게 될 타입스크립트 타입

- 원시타입
  - number
  - string
- 비원시타입
  - object
  - Array
- 특수타입
  - unknown
  - any
  - void
  - undefined


</details>
<br>

# 프로젝트 초기설정
<details>
<summary>펼치기/접기</summary>
<br>

- 프로젝트 초기화
  ```bash
  npm init
  ```

- @types/node 패키지 설치 (Node.js 타입 정의 제공 패키지)
  ```bash
  npm i @types/node
  ```
  
- tsconfig.json
  ```json
  {
    "compilerOptions": {
      "target": "ESNext", /* 컴파일 결과인 자바스크립트 코드가 사용할 자바스크립트 버전*/
      "module": "ESNext", /* 컴파일 결과인 자바스크립트 코드가 사용할 모듈 시스템 버전 */
      "outDir": "dist", /* 컴파일 결과인 자바스크립트 코드가 위치할 디렉토리 */
      "strict": true, /* 엄격한 타입 검사 */
      "moduleDetection": "force" /* 모든 타입스크립트 파일들을 개별 모듈로 취급 */
    },
    "include": ["src"] /* tsc 대상 디렉토리 */
  }
  ```

- src/index.ts 추가
  ```ts
  console.log("안녕 새 프로젝트");
  ```
  
- tsc 컴파일 명령
  ```bash
  tsc
  ```
- 컴파일 결과 js파일
  ```js
  console.log("안녕 새 프로젝트");
  export {}; // tsconfig.json "moduleDetection": "force"로 자동 추가
  ```
  
- 컴파일된 js파일 node 실행
  ```js
  node dist/index.js
  ```

###  TypeScript ESM 지원을 위한 ts-node 설정
node 실행시 아래와 같은 오류가 발생한다.
- SyntaxError: Unexpected token 'export' 에러 발생
  ```text/plain
  SyntaxError: Unexpected token 'export'
    at internalCompileFunction (node:internal/vm:77:18)
    at wrapSafe (node:internal/modules/cjs/loader:1288:20)
    at Module._compile (node:internal/modules/cjs/loader:1340:27)
    at Module.m._compile (C:\Users\yjou7\AppData\Roaming\npm\node_modules\ts-node\src\index.ts:1618:23)
    at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
    at Object.require.extensions.<computed> [as .ts] (C:\Users\yjou7\AppData\Roaming\npm\node_modules\ts-node\src\index.ts:1621:12)
    at Module.load (node:internal/modules/cjs/loader:1207:32)
    at Function.Module._load (node:internal/modules/cjs/loader:1023:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:135:12)
    at phase4 (C:\Users\yjou7\AppData\Roaming\npm\node_modules\ts-node\src\bin.ts:649:14)
  ```
기본적으로 Node.js는 CommonJS(CJS) 모듈 시스템을 사용하며, 타입스크립트는 ESM 구문을 지원한다.  
(우리 설정에서는 명시적으로 한번 더 타입스크립트의 컴파일러의 module옵션을 ESNext로 설정함.)
Node.js가 CommonJS 환경에서 실행되면 타입스크립트의 ESM 구문을 이해하지 못하기 때문에 발생한 오류이다.  
대응 방법으로는 package.json에 아래와 같이 Node.js에 ESM을 사용하겠다는 명시적 설정을 한다.  
이는 Node.js가 기본 CommonJS 모듈 시스템에서 타입스크립트의 ESM 구문을 인식할 수 있도록 설정하는 것이다.  

- "type": "module" 옵션 추가 (package.json)
  ```json
  "type": "module", /* 추가 */
  "scripts": {/* 생략 */}
  ```

- ts-node 컴파일 및 실행 명령
  ```
  ts-node src/index.ts
  ```

- ERR_UNKNOWN_FILE_EXTENSION 에러발생  
  ```
  TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for C:\Programming\workspace_vs\onebite-typescript\section02\src\index.ts
    at Object.getFileProtocolModuleFormat [as file:] (node:internal/modules/esm/get_format:160:9)
    at defaultGetFormat (node:internal/modules/esm/get_format:203:36)
    at defaultLoad (node:internal/modules/esm/load:143:22)
    at async nextLoad (node:internal/modules/esm/hooks:865:22)
    at async nextLoad (node:internal/modules/esm/hooks:865:22)
    at async Hooks.load (node:internal/modules/esm/hooks:448:20)
    at async MessagePort.handleMessage (node:internal/modules/esm/worker:196:18) {
    code: 'ERR_UNKNOWN_FILE_EXTENSION'
  }
  ```
  ts-node는 기본적으로 commonJS 모듈 시스템을 지원한다.  
  앞서 "type": "module" 설정이 Node.js의 ESM 환경을 활성화하지만, 기본적으로 CommonJS 모듈 시스템인 ts-node(따로 설정은 가능함.)를 통해 .ts파일을 실행하려 하기 때문에 .ts 파일 확장자를 처리하지 못한다.  
  이러한 복합적인 원인으로 ERR_UNKNOWN_FILE_EXTENSION 문제가 발생한다.  

  이를 해결하기 위해서는타 타입스크립트 컴파일 옵션 설정을 통해 ts-node 옵션에 esm을 활성화 해줘야 한다.  

- 타입스크립트 컴파일 옵션 ts-node esm 추가
  ```json
  "ts-node": {
    "esm": true
  }
  ```

  만약 위 옵션 추가후에도 ts-node 오류가 난다면 이는 node버전별 설정 차이 이기 때문에 package.json의 Node.js의 ESM 활성화 설정인 `type:module 옵션을 제거`하고 타입스크립트 컴파일러 옵션을 `module 옵션을 CommonJS`로 변경한 뒤 실행하면 정상적으로 실행된다.  
  그러나 현재 프로젝트의 모듈시스템 버전은 ESNext로 설정해야 하므로 더이상 ts-node를 사용하지 않고 tsx 명령을 통해 컴파일과 실행을 동시에 하도록 한다.(두 설정 모두 제거.)  
  
- tsx 컴파일 및 실행 명령
  ```
  tsx src/index.ts
  ```  

</details>
<br>

# 템플릿
<details>
<summary>펼치기/접기</summary>
<br>

</details>
<br>