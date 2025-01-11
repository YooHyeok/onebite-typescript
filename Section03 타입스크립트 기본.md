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

# 원시타입과 리터럴타입
<details>
<summary>펼치기/접기</summary>
<br>

## 원시타입 (Primitive Type) 이란?
동시에 딱 하나의 값만 저장할 수 있는 타입을 말한다.  
예를들어 원시타입이 아닌 배열이나 객체와 같은 비원시타입은 여러개의 값들을 저장할 수 있다.  
반면에 number, string, boolean, null, undefined 같은 원시타입들은 숫자면 숫자, 문자열이면 문자열 등, 딱 하나의 값만 저장할 수 있는 타입이다.  


### 종류
1. number
2. string
3. boolean
4. null
5. undefined

### number타입  
  자바스크립트에서 숫자를 의미하는 모든 값을 포함하는 타입이다.
- chapter1.ts
  ```ts
  /* 1. number 타입 */
  let num1: number = 123; // 양의 정수
  let num2: number = -123; // 음의 정수
  let num3: number = 0.123; // 양의소수
  let num4: number = -0.123; // 음의 소수
  let num5: number = Infinity; // 양의 무한대
  let num6: number = -Infinity; // 음의 무한대
  let num7: number = NaN; // Not A Number
    
  num1 = 'hello'; // Type 'string' is not assignable to type 'number'.
  ```
  위와 같이 변수의 이름 뒤에 콜론(:)을 쓰고 타입을 작성하여 변수의 타입을 정의하는 문법을 타입스크립트에서는 타입 주석 또는 타입 어노테이션이라고 부른다.  
  ```ts
  /* 1. number 타입 */
  let num1: number = 123; // 양의 정수
  num1 = 'hello'; // Type 'string' is not assignable to type 'number'.
  ```
  만약 위처럼 문자열로 초기화 하게 되면, 오류가 난다.
  ```ts
  /* 1. number 타입 */
  let num1: number = 123; // 양의 정수
  num1.toUpperCase(); // Property 'toUpperCase' does not exist on type 'number'.
  ```
  문자열에만 적용할 수 있는 문자열 전용 메소드도 사용할 수 없다.

  ```ts
  /* 1. number 타입 */
  let num1: number = 123; // 양의 정수
  num1.toFixed();
  ```
  숫자에만 사용 가능한 메소드 정상 호출이 가능하다.

### string타입
- chapter1.ts
  ```ts
  /* 2. string 타입 */
  let str1: string = "hello" // 쌍따옴표 문자열
  let str2: string = 'hello' // 홑따옴표 문자열
  let str3: string = `hello` // 벡틱 문자열
  let str4: string = `hello ${num1}` // template literal도 string 타입에 포함된다.
  ```
  마찬가지로 `str1 = 123;` 처럼 정수로 초기화 하게 되면 오류가 나며, `str1.toFixed();` 과 같이 코드를 선언하게 되면 숫자에만 적용할 수 있는 숫자 전용 메소드를 사용할 수 없게 된다. 
  
### boolean타입
- chapter1.ts
  ```ts
  /* 3. boolean 타입 */
  let bool1: boolean = true;
  let bool2: boolean = false;
  ```
  당연히 문자열이나 숫자열을 저장하려고 하면 오류가 발생한다.  

### null타입
- chapter1.ts
  ```ts
  /* 4. null 타입 */
  let null1: null = null;
  ```
  null값 이외에는 다른값을 저장할 수 없게 된다.
- 
### undefined타입
- chapter1.ts
  ```ts
  /* 5. undefined 타입 */
  let unde1: undefined = undefined;
  ```
  
null과 undefined는 타입스크립트에서 별도의 타입으로 존재하기 때문에 변수의 타입으로 정의할 수 있다.

### strictNullChecks (엄격한 null체크) 컴파일 옵션
한가지 생각해 볼 법한 주제가 있다.  
`let numA: number = null;` 코드처럼 자바스크립트의 경우 지금 당장 넣을 값이 없는경우 null로 초기화 하지만, 타입스크립트에서는 이를 허용하지 않는다.  
null이라는 값은 null타입이 별도로 존재하고 number타입 안에 포함되는 값이 아니기 때문이다.  
만약 정말 중간에 저장할 값이 없어서 어쩔수 없이 잠깐 null이라도 넣어야하는 상황이 있을 수 있다.  
이 경우 컴파일러 옵션을 조절하여 임시로 null값을 저장할 수 있는 방법이 존재한다.  

- tsconfig.json
  ```json
  {  
    "strict": true,
    "strictNullChecks": false
  }
  ```
  
- Restart TS Server  
  Ctrl + Shift + P > restart 검색 > Restart TS Server

strictNullChecks 옵션은 이름에서 알 수 있듯이, 엄격한 null 검사 옵션이다.
엄격하게 null을 검사한다는것은 쉽게 말해 null타입이 아닌 변수에 null값을 할당하는것을 허용할 것인지에 대해 결정하는 옵션이다.  
이 옵션을 false로 적용하게 되면 null타입이 아닌 number타입의 변수에도 null을 임시로 넣을 수 있게 설정해 줄 수 있는 것이다.
개발하고 있는 상황에 따라 변수에 null값을 임시로 넣어야 하는 상황이 많다면 strictNullChecks 옵션을 끄고 개발 할 수 있다.
옵션을 따로 명시적으로 선언하지 않을경우 해당 옵션의 기본값은 true로 엄격하게 null을 검사하도록 적용된다.
strict옵션이 strictNullChecks 옵션의 상위 옵션이다.
기본적으로 strict옵션이 켜져있으면 strictNullChecks 옵션도 따라서 켜지고, 만약 strict옵션이 꺼져있으면 strictNullChecks옵션도 함께 꺼진다.  
위 컴파일 설정 예제에서는 strict옵션이 켜져있고 strictNullChecks옵션은 개발자가 명시적으로 꺼놨기 때문에 이 경우 strict는 켜져있으나 strictNullchecks옵션은 꺼져있게 된다.  

(옵션을 끄는 방법은 역순으로 지운뒤 Restart TS Server를 실행하면 된다.)

## 리터럴(literal)타입

타입스크립트에서는 number나 string처럼 여러 형태의 값을 포함하는 타입 뿐만아니라, 딱 하나의 값만 포함하는 리터럴(literal)이라는 독특한 타입이 존재한다.
리터럴(값) 타입이란 값 그 자체가 타입이 되는 유형의 타입들이다.  
예를들어 `let numB: 10 = 10;` 코드처럼 numB라는 변수의 타입을 number가 아닌 값 10으로 정의한다.  
이렇게 변수의 타입을 값 그 자체로 정의하면, 정의한 값 외에는 다른 값을 저장할 수 없다.  
10이라는 값만 허용하는 타입을 만든셈이다.  
숫자 타입 말고도 다른 타입들도 리터럴 타입으로 정의가 가능하다.

### string literal
- chapter1.js
  ```ts
  let strA: "hello" = "hello";
  strA = "df" // Type '"df"' is not assignable to type '"hello"'. 
  ```
  위와 같이 문자열 hello라는 값의 리터럴 타입의 변수 strA를  선언한 후, 해당 변수에 다른 문자열 값인 "df"로 초기화시 오류가 발생하게 된다.

### boolean literal
- chapter1.js (boolean literal)
  ```js
  let boolA: true = true;
  boolA = false; // Type 'false' is not assignable to type 'true'
  let boolB: true = false; // Type 'false' is not assignable to type 'true'.
  ```
  3번째 라인 코드처럼 리터럴 타입을 선언함과 동시에 리터럴 타입과 다른 값을 저장할 경우에도 오류가 발생한다.  

타입스크립트의 리터럴 타입은 원시타입 안에 포함되는 값 중 하나를 마치 타입인것과 같이 정의해서 사용할 수 있다.
리터럴 타입은 복합적인 타입들을 만들 때 굉장히 유용하게 사용되기 때문에 알아두는것이 좋다.
</details>
<br>

# 템플릿
<details>
<summary>펼치기/접기</summary>
<br>

</details>
<br>