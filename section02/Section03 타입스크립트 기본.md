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

# 배열과 튜플
<details>
<summary>펼치기/접기</summary>
<br>

## 배열 타입

### Type[] - 인덱스 기호 방식 타입
- src/chapter2.ts
  ```ts
  let numArr: number[] = [1, 2, 3]; // 1. Type[] - 인덱스 기호 방식 배열 타입
  let strArr: string[] = ["hello", "im", "yooHyeokSchool"];
  ```

## Array<Type> - 제네릭 타입 방식의 배열 타입
- src/chapter2.ts
  ```ts
  let boolArr: Array<boolean> = [true, false, true]; // 2. Array<Type> - 제네릭 타입 방식의 배열 타입 정의
  ```

## 다양한 타입의 요소로 구성된 배열의 배열타입
변수의 타입을 어떻게 정의해야 될지 잘 모르겠을 때에는 마우스 커서를 변수에 올려본다.  
이전에 설명했던 타입추론 즉, 타입스크립트는 점진적 타입 시스템을 사용하기 때문에 변수의 타입을 초기화하는 값을 기준으로 자동으로 추론한다.  
따라서 IDE의 도움을 받아 추론된 타입을 확인한다.  
let multiArr: (string | number | boolean)[] 와 같이 알려주는데 여기서 소괄호는 요소의 타입이고, 대괄호는 배열이다.  
소괄호 안에 string | number | bollean 이라고 되어있는데, 여기서 | 바를 사용하는것을 유니온타입이라고 부르며,  
이는 배열의 요소가 string이나 number나 boolean일 수 있다는 의미로 이렇게 유연한 타입을 만들 수 있다. 
- src/chapter2.ts
  ```ts
  let multiArr: (number | string | boolean)[] = [1, "hello", true];
  ```

## 다차원 배열 타입
 다차원 배열이란?  
 배열 안에 배열, 배열 안에 배열 안에 배열 과 같이 2차원이거나 3차원 배열을 의미한다.  
 타입을 정의하는 방법은 요소들의 타입을 적고, 대괄호를 두번 기제한다.  
- src/chapter2.ts
  ```ts
  let doubleArr: number[][] = [
    [1, 2, 3],
    [4, 5]
  ]
  ```
## 튜플 타입

튜플이란?  
자바스크립트에는 없고 타입스크립트에서만 특별하게 제공되는 타입으로 길이와 타입이 고정된 배열을 말한다.  
자바스크립트의 배열은 기본적으로 길이와 타입 모두 고정되어 있지 않다.  
따라서 개수를 마음대로 늘릴 수도 있고 배열에 들어가는 요소의 타입도 자유롭다.  
그리고 타입스크립트의 배열은 배열에 들어가는 요소의 타입은 고정시킬 수 있지만 길이까지 고정시킬 수는 없다.  
튜플은 타입도 고정하지만 길이까지 고정할 수 있는 그런 배열 타입을 의미한다.  

- src/chapter2.ts
  ```ts
  let tup1: [number, number] = [1, 2] // 오직 number 타입
  tup1 = [1, 2, 3] // Error: Type '[number, number, number]' is not assignable to type '[number, number]'. Source has 3 element(s) but target allows only 2.
  tup1 = ["1", "2"] // Error: Type 'string' is not assignable to type 'number'.
  ```
튜플의 타입을 정의하는 방법은 각 요소들의 타입을 대괄호 안에 배열 형태로 나열한다.  
이렇게 튜플 타입을 정의할 경우 처럼 튜플 타입의 길이를 넘어서는 배열도 저장할 수 없으며,  
길이를 만족하더라도 타입을 만족하지 않는 배열도 저장할 수 없다.  

만약 타입이 서로 다른 튜플을 정의할 경우 타입의 순서가 다르게 초기화 하거나, 역시 길이가 다르면 오류가 발생하게 된다.
- src/chapter2.ts
  ```ts
  let tup2: [number, string, boolean] = [1, "2", true] // 튜플 타입 정의: 각 요소의 타입을 배열형태로 정의한다.
  tup2 = ["2", 1, true] // Error: Type 'string' is not assignable to type 'number' / Type 'number' is not assignable to type 'string'.
  ```


사실 튜플은 별도로 존재하는 자료형이라 보기 어렵고, 그냥 배열이다.
- src/chapter2.ts
  ```ts
  let tup1: [number, number] = [1, 2];
  let tup2: [number, string, boolean] = [1, "2", true];
  ```
- tsc 컴파일 - dist/index.js
  ```js
  let tup1 = [1, 2];
  let tup2 = [1, "2", true];
  export {};
  ```
위와 같이 tsc로 컴파일 하고 결과를 보게되면, 결국 자바스크립트 코드로 컴파일 되어 변환될때는 배열로 변환된다는것을 확인할 수 있기 때문이다.  

또한, 튜플 타입으로 정의된 배열에 배열의 메소드를 활용하여 push를 하거나 pop을 할 때에는 튜플의 길이 제한이 발동하지 않는다.
따라서 튜플 타입을 사용할 때에는 배열 메소드를 사용해서 push나 pop과 같이 요소를 추가하거나 제거할 때에는 각별히 주의해서 사용해야한다.
- src/chapter2.ts
  ```ts
  let tup2: [number, string, boolean] = [1, "2", true]
  tup2.push("메롱")
  ```


### 튜플을 유용하게 사용할 수 있는 예제
- src/chapter2.ts
  ```ts
  const user = [
    ["유혁", 1],
    ["스쿨", 2],
    ["홀리", 3],
    ["몰리", 4],
    [5, "초이"] // 해당 요소의 0번 인덱스에 toUpperCase()를 적용한다면, 오류가 발생할것이다.
  ]
  ```
위 배열 형태를 보면, 2차원 배열의 첫번쨰 요소로 이름, 두번째 요소로 인덱스를 규칙적으로 사용하고 있다.
그러나 눈치 없는 동료 개발자가 해당 배열에 첫번째 요소로 인덱스를, 두번째 요소로 이름을 넣게 될 경우 
만약 해당 요소의 0번 인덱스에 toUpperCase()를 적용한다면, 오류가 발생할것이다.

이러한 상황은 튜플 타입을 정의하여 미연에 방지할 수 있다.

- src/chapter2.ts
  ```ts
  const user: [string, number][] = [
    ["유혁", 1],
    ["스쿨", 2],
    ["홀리", 3],
    ["몰리", 4],
    [5, "초이"] // Error: Type 'number' is not assignable to type 'string' | Type 'string' is not assignable to type 'number'
  ]
  ```

위 예제 코드와 같이 `[string, number][]` 의 형태로 첫번째 요소는 문자열, 두번째 요소는 숫자로 정의해준다.  
(이는 일반적인 배열 버킷 구조와 반대되는 순서로 보일 수 있다.)
결론적으로, 튜플을 사용하면 배열을 사용할 때 인덱스의 위치에 따라서 넣어야 하는 값들이 이미 정해져 있고, 그 순서를 지키는 게 중요할 때 
값을 잘못 넣지 않도록 방지해 줄 수 있다.
</details>
<br>

# 객체
<details>
<summary>펼치기/접기</summary>
<br>

## object 타입
자바스크립트에는 object라는 객체를 의미하는 타입이 있다.  
해당 타입은 사용자가 정의한 객체의 타입으로 정의할 수 있다.  

- object 타입으로 객체 타입 정의 - src/chapter3.ts
  ```ts
  let user:object = {
    id: 1,
    name: "유혁스쿨"
  }
  ```
그러나 object는 객체라는 정보 외에는 아무런 정보 없는 타입이므로 object타입으로 정의할경우 해당 객체의 property나 메소드에 뭐가 있는지 알 수 없게 된다.  
따라서 object타입으로 객체의 타입을 정의한다면 점 표기법으로 접근할 경우 오류가 발생한다.  

- 프로퍼티 접근시 오류 발생 - src/chapter3.ts
  ```ts
    let user:object = {
    id: 1,
    name: "유혁스쿨"
  }
  user.id; // Property 'id' does not exist on type 'object'.
  ```
타입스크립트에 object라는 타입은 값이 객체다 라는 정보 외에는 아무런 정보가 없는 타입이기 때문에, object로 정의할 경우 해당 객체의 프로퍼티나 메소드에 무엇이 있는지 알 수가 없다.
변수의 타입을 object로 지정한다는 것은 "이 변수는 객체이긴 한데 그 이상은 몰라" 라는것과 같다.  
따라서 객체의 타입을 정할때에는 해당 프로퍼티를 포함하여 객체의 모양을 정확한 타입으로 만들어야 한다.  

- 객체 타입 정의 - src/chapter3.ts
  ```ts
  let user2: { // 객체를 선언하는 형태로 객체 내부에 property를 선언하고 타입을 지정
    id: number;
    name: string;
  } = {
    id: 1,
    name: "유혁스쿨"
  }
  user2.id;
  ```
위 코드처럼 변수 user의 타입에 중괄호를 먼저 열고, 마치 객체 리터럴을 쓰는것 처럼 각각의 property를 선언해주고, 각 property에 정의할 타입을 지정해준다.  
이렇게 객체에 대한 정확한 타입을 정의할 경우 점 표기법으로 프로퍼티에 접근하는 코드에 오류가 없이 정상적으로 수행된다.  

결론적으로 정리하자면 객체의 타입을 정의할 때 object를 사용하면 객체인것은 알지만 프로퍼티나 메소드에 접근하면 오류가 나기 때문에 잘 쓰지 않고 객체의 모든 프로터티들의 타입까지 구조적으로 정의할 수 있는 방식으로 사용해야 한다.  

- 다른 예제 - src/chapter3.ts
  ```ts
  let dog: {name: string; color: string;} = {
    name: "돌돌이",
    color: "brown"
  }
  ```
위와 같이 객체의 타입을 property 기반으로 잘 정의할 수가 있다.  

C언어나 Java같은 정적 타입 시스템 언어의 경우 이렇게 객체의 타입을 정의할 때 프로퍼티를 일일히 다 나열해 가면서 프로퍼티 기반으로 객체 타입을 정의하는 하기도 하지만, 특정 상황에서는 객체면 모두 Object로, 문자열이면 모두 String으로 이름을 기준으로 타입을 정의하는 경우가 많다.  
그러나 타입스크립트에서는 방금 타입을 정의했던 것처럼 User객체만의 타입을 프로퍼티 기반으로 정의하고, Dog 객체만의 타입을 프로퍼티 기반으로 정의한다.  
이렇게 타입스크립트에서는 객체의 타입을 정의할 때 object같은 단순한 이름으로 타입을 정의하는 것이 아니라 해당 객체를 이루는 프로퍼티나 메소드가 어떻게 생겼는지 즉, 해당 객체의 구조를 기준으로 타입을 정의한다.  
따라서 타입스크립트의 이런 특징을 구조적 타입 시스템 이라고 부른다.  
구조적 타입 시스템은 쉽게말해 프로퍼티를 기준으로 타입을 결정하는 시스템 이므로 프로퍼티 기반 타입 시스템이라고도 부르기도 한다.  
반면 이전에 설명했던 자바와 C 등 대부분의 언어가 사용하는 이름을 기준으로 타입을 정의하는 것을 명목적 타입 시스템이라고 부른다.  

#### 타입시스템 유형
- 구조적 (프로퍼티 기반)
  - property를 기준으로 타입을 결정하는 타입 시스템
  - 프로퍼티 기반 타입시스템 이라고도 한다.
  - 프로퍼티나 메소드등 객체의 구성 및 구조를 기준으로 타입 정의

- 명목적 (이름 기반)
  - 대부분의 프로그래밍 언어에서 사용하는 타입 시스템
  - 이름을 기준으로 타입을 정의한다.
  - ex) 객체의 경우 공통분모 Object, 문자열인 경우 String

### optional(선택적) 프로퍼티
객체를 사용하다 보면 가끔 어떤 프로퍼티는 없어도 되는 경우가 있다.  
예를들어 user라는 변수에 새로운 회원을 저장하고 싶은데 아직 회원의 id는 모르고 이름만 알고 있는 경우가 있다.  
이때 id를 모른다고 초기화하지 않는다면 오류가 발생한다.  
user라는 변수의 타입을 id와 name이라는 두개의 프로퍼티를 갖는 객체로 타입을 정의해 놨기 때문이다.  
이렇게 id라는 프로퍼티가 초기화시 있어도 되고 없어도 되는 선택적인 프로퍼티라면 id프로퍼티 이름 뒤에 물음표 하나만 추가해 주면 오류가 발생하지 않는다.  
여기서 물음표의 의미는 프로퍼티가 있어도 되고 없어도 된다는 뜻이다.
{id?: number} 과 같이 정의하였을때 해당 프로퍼티 타입을 해석해보면 
id프로퍼티는 있어도 되고 없어도 되는 선택적인 프로퍼티이며, 만약 있을경우 value의 타입은 number여야만 한다. 라는 뜻으로 타입이 정의된다.
프로퍼티를 지정해 줄것이라면 정수값으로 지정해주고, 만약 정수가 아닌 문자열 값으로 지정할 경우 오류가 발생한다.

- src/chapter3.ts
  ```ts
  let user3: {id?: number; name: string;};

  user3 = {
    name: "홍길동"
  }
  ```

### readonly(읽기전용) 프로퍼티
예를들어 내부에서 값이 절대 수정되어서는 안되는 환경변수 등 객체의 프로퍼티에 접근하여 값을 변경하면 안되는 경우가 있다.  
이런 경우 타입 정의에서 해당 프로퍼티의 이름 앞에 readonly라는 키워드를 붙이면 프로퍼티의 값을 변경하는 행위를 막을 수 있다.  

- src/chapter3.ts
  ```ts
  let config: {readonly apiKey: string;} = {
    apiKey: "My Api Key"
  }

  config.apiKey = "hacked" // Error: Cannot assign to 'apiKey' because it is a read-only property.
  ```
  
</details>
<br>

# 타입 별칭과 인덱스 시그니처
<details>
<summary>펼치기/접기</summary>
<br>

## 타입별칭
변수를 정의하는 것과 같이 타입에 별칭을 주어 정의하는 방식이다.  
만약 여러개의 프로퍼티로 구성된 객체가 하나 있고, 동일한 타입의 프로퍼티로 구성된 객체를 반복해서 선언할 경우 코드가 굉장히 길어진다.  
이런 경우에 마치 변수를 선언하는것 처럼 타입을 별칭으로 먼저 정의한 후 각각의 객체에 타입 어노테이션으로 해당 별칭을 적용하면 타입 재사용이 가능해지며,  
불필요한 코드라인을 절약할 수 있다.  

### 타입별칭 예제

#### AS-IS
- src/chapter4.ts
  ```ts
  let user: {
    id: number;
    name: string;
    nickname: string;
    birth: string;
    bio: string;
    location: string;
  } = {
    id: 1,
    name: "유재혁",
    nickname: "유혁스쿨",
    birth: "1992.10.23",
    bio: "안녕하세요",
    location: "광명시"
  }
  let user2: {
    id: number;
    name: string;
    nickname: string;
    birth: string;
    bio: string;
    location: string;
  } = {
    id: 2,
    name: "홍길동",
    nickname: "유혁스쿨",
    birth: "1992.10.23",
    bio: "안녕하세요",
    location: "광명시"
  }
  ```
  위 코드를 보면 벌써부터 페이지의 절반을 차지한다.  
  실제로 객체의 타입을 보면 동일하게 반복되는것을 볼 수 있다.  
  이제 이 코드들에 타입 별칭을 적용해본다.  

#### TO-BE
- src/chapter4.ts
  ```ts
  type User = { // 타입 별칭 선언시 type 키워드를 통해 선언한다.
    id: number;
    name: string;
    nickname: string;
    birth: string;
    bio: string;
    location: string;
    // extra: string; // property 추가시 User 별칭을 타입으로 정의한 모든 객체에 적용됨
  }

  let user3:User  = {
    id: 1,
    name: "유재혁",
    nickname: "유혁스쿨",
    birth: "1992.10.23",
    bio: "안녕하세요",
    location: "광명시"
  }
  let user4:User = {
    id: 2,
    name: "홍길동",
    nickname: "유혁스쿨",
    birth: "1992.10.23",
    bio: "안녕하세요",
    location: "광명시"
  }
  ```
  코드를 보면, `type` 이라는 키워드를 통해 타입별칭을 통해 객체의 타입을 별칭으로 딱 한번 정의하고, 정의한 타입별칭을 타입어노테이션에 정의하여 중복되는 코드를 줄였다.  
  이렇게 타입별칭을 사용하면 한가지 장점이 더 존재한다.  
  만약 이렇게 타입별칭으로 타입을 공통으로 정의한 모든 객체가 새로운 프로퍼티가 필요할 경우 타입별칭에 한번만 추가로 선언해주면,  
  타입별칭을 적용한 모든 객체에 해당 프로퍼티 타입이 공통적으로 적용된다.

#### 새로운 프로퍼티 추가

- src/chapter4.ts
  ```ts
  type User = {
    id: number;
    name: string;
    nickname: string;
    birth: string;
    bio: string;
    location: string;
    extra: string; // property 추가시 User 별칭을 타입으로 정의한 모든 객체에 적용됨
  }
  ```

#### 타입 중복 오류
타입별칭은 이전에 설명했던것 처럼 마치 let 키워드로 선언하는 변수 처럼 중복된 이름으로 선언할 경우 오류가 난다.  
- src/chapter4.ts
  ```ts
  type User = {
   /* 생략 */ 
  }
  type User = {} // Duplicate identifier 'User'.
  ```
  따라서 타입별칭을 선언할 때 같은 스코프 내에서는 중복되지 않도록 주의해야한다.
#### 타입 스코프(범위)
함수 블록 내에서는 내부에 정의한 타입이 User 타입이 된다.  
함수 바깥이라면 함수 바깥에 정의된 User 타입이 적용된다.
- src/chapter4.ts
  ```ts
  type User = {/* 생략 */};
  function func() {
    type User = {/* 생략 */};
  } 
  ```
#### 타입 별칭 컴파일 결과
타입스크립트에 type 관련 코드들은 컴파일 결과 자바스크립트 코드에서는 모두 다 제거된다.  
그렇기 때문에 타입 별칭으로 만든 타입들도 당연히 다 제거가 된다.  

- 타입스크립트 컴파일
  ```bash
  tsc src/chapter4.ts
  ```

- 컴파일 확인: dist/chapter4.js   
  ```js
  let user3 = {
    id: 1,
    name: "유재혁",
    nickname: "유혁스쿨",
    birth: "1992.10.23",
    bio: "안녕하세요",
    location: "광명시"
  };
  let user4 = {
      id: 2,
      name: "홍길동",
      nickname: "유혁스쿨",
      birth: "1992.10.23",
      bio: "안녕하세요",
      location: "광명시"
  };
  function func() {
  }
  export {};
  ```
## 인덱스 시그니처
key와 value의 규칙을 기준으로 객체의 type을 정의할 수 있는 문법을 말한다.


- src/chapter4.ts
  ```ts
  type countryCodes = {
    Korea: string;
    UnitedState: string;
    UnitedKingdom: string;
  }
  let countryCodes = {
    Korea: 'ko',
    UnitedState: 'us',
    UnitedKingdom: 'uk'
  }
  ```

### 상황 가정
위 코드를 보면 현재 countryCodes객체는 3개의 프로퍼티밖에 없다.  
만약 만들게 될 서비스가 초 거대 글로벌 서비스로 200개 가까운 모든 국가들의 코드를 다 넣어야 한다면 타입 별칭에도 모든 프로퍼티의 키를 다 넣어줘야 한다.  
이 경우 객체의 프로퍼티의 key와 value의 타입 관련된 규칙을 본다.  
key는 모두 string타입이며 value도 모두 string 타입이다.  
key가 string타입이고 value가 string타입인 프로퍼티들은 모두 허용하도록 타입을 만들면 어떤 국가를 추가하여도 문제가 되지 않게 된다.  
이렇게 key와 value의 규칙을 기준으로 객체의 type을 정의할 수 있는 문법이 바로 인덱스 시그니처라는 문법이다.

### 인덱스 시그니처 예제1
대괄호 안에 key의 타입을 정의하고, 해당 배열에 콜론을 입력하고 타입을 정의하면 key의 타입이 된다.
이렇게 key와 value의 타입을 기준으로 규칙을 이용하여 아주 유연하게 객체의 타입을 정의하는 문법을 인덱스 시그니처 라고 부른다.
인덱스 시그니쳐를 이용하면 key와 value의 타입이 어떤 규칙을 가지고 움직이는 객체의 타입을 정의할 때 굉장히 유용하게 사용될 수 있다.

#### 문자열 타입의 key와 문자열 타입의 value에 대한 객체 타입 지정
- src/chapter4.ts
  ```ts
  type countryCode = {
    [key: string]: string
  }

  let countryCodes2: countryCode = {
    Korea: 'ko',
    UnitedState: 'us',
    UnitedKingdom: 'uk'
  };
  ```

#### 문자열 타입의 key와 정수 타입의 value에 대한 객체 타입 지정
- src/chapter4.ts
  ```ts
  type countryNumberCodes = {
    [key: string]: number;
  }
  /* 국가별 숫자 코드 */
  let countryNumberCodes: countryNumberCodes = { 
    Korea: 410,
    UnitedState: 840,
    UnitedKingdom: 826
  }
  ```
### 주의점 1  
인덱스 시그니처 타입은 프로퍼티가 없는 빈 객체에도 사용이 가능하다.  
인덱스 시그니처 타입은 타입 규칙을 위반하지만 않으면 모든 객체를 허용하는 타입이다.  
아래 예제코드에서의 객체는 아무런 프로퍼티가 없는 객체이다.  
규칙을 위반할 프로퍼티가 없는 셈이다.  

- src/chapter4.ts
  ```ts
  type countryNumberCodes = { //인덱스 시그니처 정의
    [key: string]: number;
  }
  let countryNumberCode: countryNumberCodes = {} // 프로퍼티를 정의하지 않아도 오류가 발생하지 않음.
  ```

### 인덱스 시그니처 필수 프로퍼티
key가 string이고 value가 number면 모두 허용하지만 반드시 korea라는 number타입의 프로퍼티가 꼭 있어야 할 경우 
아래의 예제코드와 같이 필수 프로퍼티에 대한 타입 지정을 추가해준다. 
- src/chapter4.ts
  ```ts
  type countryNumberCodeRequiredKorea = {
    [key: string]: number;
    Korea: number; // 필수 프로퍼티에 대한 타입 지정
  }
  ```

### 주의점 2
인덱스 시그니처 정의 및 필수 프로퍼티 타입 정의시 빈 객체를 저장하면 문제가 발생한다.
- src/chapter4.ts
  ```ts
  type countryRequiredKoreaNumberCode = {
    [key: string]: number;
    Korea: number; // 필수 프로퍼티 타입정의 추가
  }
  let countryCodeNumber: countryRequiredKoreaNumberCode = {} // Error: Property 'Korea' is missing in type '{}' but required in type 'countryNumberCode'.
  ```
따라서 만약 객체에 key가 string이고 value가 number면 모두 허용하지만 반드시 korea라는 number타입의 프로퍼티가 꼭 있어야 한다면 아래와 같이 
꼭 있어야 하는 필수 프로퍼티에 대한 타입정의를 추가해 줄 경우 오류가 발생하지 않는다.
- src/chapter4.ts
  ```ts
  type countryRequiredKoreaNumberCode = {
    [key: string]: number;
    Korea: number; // 필수 프로퍼티 타입정의 추가
  }
  let countryCodesNumber: countryRequiredKoreaNumberCode = {
    Korea: 410 // 필수 프로퍼티만 추가
  }
  ```

### 주의점 3
인덱스 시그니처를 사용하는 객체 타입에서 필수로 추가해야할 프로퍼티를 정의하려면,   
필수 프로퍼티의 value의 타입이 반드시 인덱스 시그니처의 value타입과 일치하거나 호환되야 한다.
아래의 코드는 문자열, 숫자 코드 모두 허용할 경우에 대한 예제이다.
- src/chapter4.ts
  ```ts
  type countryNumberAndStringCode = {
    [key: string]: number;  
    Korea: string; // Property 'Korea' of type 'string' is not assignable to 'string' index type 'number'
  }
  let countryCodesNumberAndStringa: countryNumberAndStringCode = { // Type '{ Korea: string; }' is not assignable to type 'countryNumberAndStringCode'.
    Korea: "ko" // Property 'Korea' is incompatible with index signature. Type 'string' is not assignable to type 'number'.
  }
  ```
 Korea라는 프로퍼티의 value타입이 string으로 되어있고, 인덱스 시그니처의 value의 타입은 number로 되어있기 때문에 문제가 발생한다.  

#### 해결책 1 (타입 일치)
인덱스 시그니처의 value타입과 필수 프로퍼티의 value타입을 반드시 일치시킨다.
- src/chapter4.ts
  ```ts
  type countryNumberAndStringCodes = {
    [key: string]: number;
    Korea: number;
  }

  let countryCodeNumberAndString: countryNumberAndStringCodes = {
    // Korea: "ko", // 인덱스 시그니처 특성상 사용할 수 없다.
    Korea: 410 
  }
  ```

#### 해결책 2 (유니온타입)
유니온타입을 활용하여 인덱스 시그니처에 정수와 문자열에 대한 다중 타입을 허용해 보자 (강의에는 없는 내용)
- src/chapter4.ts
  ```ts
  type countryStringAndNumberCode = {
    [key: string]: number | string;
    Korea: string;
  }

  let countryCodeStringAndNumber: countryStringAndNumberCode = {
    Korea: "ko"
  }
  ```

## 배열 타입에 대한 타입별칭과 인덱스 시그니처 예제

### 배열 타입 타입별칭

#### 숫자 타입 배열 타입별칭
  ```ts
  type NumberArr = number[];
  ```
#### 문자열 타입 배열 타입별칭
  ```ts
  type StringArr = string[];

#### 객체 타입 배열 타입별칭
  ```ts
  type Obj = {id: number; name: string};
  type ObjArr = Obj[];
  ```

### 배열 타입 인덱스 시그니처
#### 배열 타입에 인덱스 시그니처 적용
대괄호 안에 배열의 index에 대한 타입을 정의, 해당 배열에 타입을 정의하면 배열 요소의 타입이 된다.

#### 정수 타입 배열 인덱스 시그니처
  ```ts
  type NumbersArr = {
    [index: number]: number
  }
  let nubmersArr:NumbersArr = [1, 2, 3]
  ```ts
#### 정수 타입 배열 인덱스 시그니처

  type StringsArr = {
    [index: number]: string
  }
  let stringsArr:StringsArr = ["일", "이", "삼"]
  ```
#### 배열 인덱스 시그니처 필수 타입 정의 
인덱스 시그니처만 정의할 경우 배열의 push 메소드나 length같은 내장 기능을 사용할 경우 필수 타입으로 정의하지 않으면 오류가 발생한다.  
  ```ts
  type StringArray = {
    [index: number]: string; // 숫자 인덱스 키의 값은 문자열
    length: number; // length 속성 필수 타입 정의
    push: (item: string) => number; // push 메소드 필수 타입 정의
  }

  let customArray: StringArray = ["hello", "world"];
  let result = customArray.push("!"); // 길이 반환
  console.log(result) // 3
  console.log(customArray.length); // 3
  ```

</details>
<br>

# Enum 타입
<details>
<summary>펼치기/접기</summary>
<br>

## Enum 타입이란?
여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입으로 열거형 타입이라고도 부른다.  
자바스크립트에는 없고 타입스크립트에만 특별히 제공되는 새로운 타입이다.  

3명의 User가 있다고 가정하고 아래처럼 3명의 User 객체 코드를 작성한다
- src/chapter5.ts
  ```ts
  const user1 = {
    name: '유혁스쿨',
    role: 0 // 0: 관리자
  }

  const user2 = {
    name: '홍길동',
    role: 1 // 1: 일반유저
  }

  const user3 = {
    name: '아무개',
    role: 2 // 2: 게스트
  }
  ```
User의 권한을 설정할 때 보통 숫자로 배정하는 방법을 많이 사용하곤 한다.  
그런데 이렇게 숫자로 각각의 권한을 설정해 준 다음 개발을 진행하다 보면 종종 헷갈리는 경우가 생긴다.
숫자만 보고 기억하기가 조금 어려울 수 있다.
이렇게 실수하는 경우를 막기 위해 타입스크립트의 Enum을 활용하여 효율적으로 관리할 수 있다.

## Enum 정의 및 활용
타입 별칭을 사용하는 것처럼 enum이라는 키워드를 적은 뒤 enum의 이름을 적은 후 중괄호 안에 멤버를 선언한다.
각 멤버는 원하는 값으로 초기화한다.
- src/chapter5.ts
  ```ts
  enum Role {
    ADMIN = 0,
    USER = 1,
    GUEST = 2
  }
  ```

### 프로퍼티 값으로 Enum 적용
const 상수 객체 property에 접근하는것과 같은 문법으로 값에 할당해준다.
- src/chapter5.ts
  ```ts
  const member1 = {
    name: '유혁스쿨',
    role: Role.ADMIN // 0: 관리자
  }

  const member2 = {
    name: '홍길동',
    role: Role.USER // 1: 일반유저
  }

  const member3 = {
    name: '아무개',
    role: Role.GUEST // 2: 게스트
  }
  ```
  
### 컴파일 및 실행
- tsx src/chapter5.ts
  ```js
  console.log(member1, member2, member3)
  ```
- tsx 실행 결과
  ```text/plain
  { name: '유혁스쿨', role: 0 } { name: '홍길동', role: 1 } { name: '아무개', role: 2 }
  ```
이렇게 Enum을 활용하면 역할 같은 값들을 숫자 등으로 분류할 경우에 개발자들이 헷갈리지 않도록 도움을 준다.

## 묵시적 할당 및 컴파일 결과
 Enum의 멤버에 숫자를 명시적으로 할당하지 않아도 순차적으로 0번부터 자동으로 할당된다.
- src/chapter5.ts
  ```ts
  enum Auth {
    ADMIN,
    USER,
    GUEST
  }
  const player1 = {
    name: '유혁스쿨',
    auth: Auth.ADMIN // 0: 관리자
  }

  const player2 = {
    name: '홍길동',
    auth: Auth.USER // 1: 일반유저
  }

  const player3 = {
    name: '아무개',
    auth: Auth.GUEST // 2: 게스트
  }

  console.log(player1, player2, player3)
  ```
### 컴파일
- tsx src/chapter5.ts
  ```text/plain
  { name: '유혁스쿨', auth: 0 } { name: '홍길동', auth: 1 } { name: '아무개', auth: 2 }
  ```
값을 할당하지 않았음에도, 0부터 순차적으로 증가값이 부여된것을 확인할 수 있다.  

## 첫번째 멤버에 임의 정수값 할당
만약 첫번째 멤버에 임의 정수값을 할당한다면, 해당 정수값 기준으로 순차적으로 할당된다.
- src/chapter5.ts
  ```ts
  enum Tier {
    ADMIN = 10, // 첫번째 멤버에 할당값 10 지정
    USER,
    GUEST
  }

  const client1 = {
    name: '유혁스쿨',
    tier: Tier.ADMIN // 10: 관리자
  }

  const client2 = {
    name: '홍길동',
    tier: Tier.USER // 11: 일반유저
  }

  const client3 = {
    name: '아무개',
    tier: Tier.GUEST // 12: 게스트
  }

  console.log(client1, client2, client3)
  ```
- tsx src/chapter5.ts
  첫번째 멤버에 할당될 값을 0이 아닌 10으로 지정할 경우 10부터 순차적으로 할당된다.
  ```text/plain
  { name: '유혁스쿨', tier: 10 } { name: '홍길동', tier: 11 } { name: '아무개', tier: 12 }
  ```


## 두번째 멤버부터 값 할당
두번째 멤버의 값에만 할당할 경우, 첫번째 멤버에는 0이 할당되고, 명시적으로 할당한 두번째 멤버부터는  
`ADMIN:0 USER:10 GUEST:11`과 같이 할당된 값 기준으로 증가값이 순차적으로 값이 부여된다.
- src/chapter5.ts
  ```ts
  enum Level {
    ADMIN,
    USER = 10,
    GUEST
  }
  const soldier1 = {
    name: '유혁스쿨',
    level: Level.ADMIN // 0: 관리자
  }

  const soldier2 = {
    name: '홍길동',
    level: Level.USER // 10: 일반유저
  }

  const soldier3 = {
    name: '아무개',
    level: Level.GUEST // 11: 게스트
  }
  
  console.log(soldier1, soldier2, soldier3)
  ```
- tsx src/chapter5.ts
  두번째 멤버에만 명시적으로 10으로 할당할 경우 첫번째 멤버에는 0을 두번째 멤버부터는 10부터 순차적으로 할당된다.
  ```text/plain
  { name: '유혁스쿨', level: 0 } { name: '홍길동', level: 10 } { name: '아무개', level: 11 }
  ```

## Enum 중복문제
아래와 같이 첫번째 멤버의 값을 11로 명시적으로 할당한 뒤 두번째 멤버의 값을 10으로 할당할 경우  
3번째 값은 자동으로 최종 할당값 기준으로 증가값이 할당된다.  
이 경우 첫번째 값과 3번째 값이 동일하게 11로 할당되는 중복 문제가 발생한다.  

해결책으로는 모든 멤버 값을 명시적으로 지정한다.
- src/chapter5.ts
  ```ts
  enum Class {
    ADMIN = 11,
    USER = 10,
    GUEST
  }
  const student1 = {
    name: '유혁스쿨',
    level: Class.ADMIN // 11: 관리자
  }

  const student2 = {
    name: '홍길동',
    level: Class.USER // 10: 일반유저
  }

  const student3 = {
    name: '아무개',
    level: Class.GUEST // 11: 게스트
  }
  console.log(student1, student2, student3)
  ```
- tsx src/chapter5.ts
  ```text/plain
  { name: '유혁스쿨', level: 11 } { name: '홍길동', level: 10 } { name: '아무개', level: 11 }
  ```


## 문자형 enum (문자열 값 할당)

### 각 국가별 언어를 열거하는 열거형 생성
- src/chapter5.ts
  ```ts
  enum Language {
    korean = 'ko',
    english = 'en'
  }

  const customer1 = {
    name: '유혁스쿨',
    tier: Tier.ADMIN, // 0: 관리자
    language: Language.korean
  }

  const customer2 = {
    name: '홍길동',
    tier: Tier.USER, // 1: 일반유저
    language: Language.english
  }

  const customer3 = {
    name: '아무개',
    tier: Tier.GUEST, // 2: 게스트
    language: Language.korean
  }
  ```
  
- tsx src/chapter5.ts
  ```text/plain
  { name: '유혁스쿨', tier: 10, language: 'ko' } { name: '홍길동', tier: 11, language: 'en' } { name: '아무개', tier: 12, language: 'ko' }
  ```

## Enum 타입 컴파일 결과
타입스크립트 관련 코드들은 컴파일 결과 파일인 자바스크립트에서 모두 사라진다.
그러나 enum 타입으로 값을 할당한 각 객체의 프로퍼티에는 마치 값을 쓰는 것처럼 사용하고 있다.
타입스크립트 코드이지만 tsx로 컴파일 시 오류가 발생하지 않고 실행이 잘 되는 것을 확인할 수있다.
enum은 특이하게 컴파일하더라도 코드가 사라지지 않는다.

- tsc
  ```js
  var Role;
  (function (Role) {
      Role[Role["ADMIN"] = 0] = "ADMIN";
      Role[Role["USER"] = 1] = "USER";
      Role[Role["GUEST"] = 2] = "GUEST";
  })(Role || (Role = {}));

  var Auth;
  (function (Auth) {
      Auth[Auth["ADMIN"] = 0] = "ADMIN";
      Auth[Auth["USER"] = 1] = "USER";
      Auth[Auth["GUEST"] = 2] = "GUEST";
  })(Auth || (Auth = {}));
  var Tier;
  (function (Tier) {
      Tier[Tier["ADMIN"] = 10] = "ADMIN";
      Tier[Tier["USER"] = 11] = "USER";
      Tier[Tier["GUEST"] = 12] = "GUEST";
  })(Tier || (Tier = {}));
  ```

복잡하지만 자바스크립트의 객체로 변환되고 있다는것을 컴파일 결과 코드를 통해 확인할 수 있다.
결론적으로 타입스크립트의 enum은 컴파일 결과 사라지지않고 자바스크립트의 객체로 변환되기 때문에 코드상에서 마치 값을 사용하듯 사용할 수 있다.
  
</details>
<br>

# Any타입과 Unknown타입
<details>
<summary>펼치기/접기</summary>
<br>

## Any타입
특정 변수의 타입을 확실히 모를 때 사용하는 타입이다.

**상황가정**
1. 변수를 하나 선언하고 해당 변수가 범용적으로 사용된다.
2. 현재 숫자 10을 넣었으나 추후 문자열도 들어가야 한다.

- src/chapter6.ts
  ```ts
  let anyVar = 10;
  anyVar = "10" // Type 'string' is not assignable to type 'number'.
  ```
복습을 해보자면 타입스크립트는 기본적으로 변수의 타입을 지정하지 않아도 초기화 하는 값을 기준으로 변수의 타입을 자동으로 추론한다.  
이를 타입추론이라 부른다.  
변수 anyVar는 정수값 10으로 초기화 되고 있기 때문에 number라는 타입으로 타입추론 된다.  
그렇기 때문에 문자열 값을 넣으려고 시도하면 당연히 오류가 발생한다.  

마치 자바스크립트 변수를 쓰듯 타입 검사 없이 타입 상관없이 아무 값이나 할당하려면 Any타입을 변수에 지정해주면 된다.  
Any라는 것은 우리말로 모든, 누구나 라는 뜻이다.  
Any Type이란 어떤 타입이던지 라는 뜻으로 이해할 수 있으며, 해당 변수의 타입어노테이션으로 any 키워드를 지정할 경우
어떤 타입이던지 해당 변수에 값을 할당할 수 있다. 라고 이해할 수 있다.  
변수에 어떤 타입의 값이든 할당을 허용하지만 `값이 할당되는 순간 타입추론을 통해 할당된 타입으로 타입이 변경된다.`

- src/chapter6.ts
  ```ts
  let anyVal:any = 10;
  anyVal = "십"; // string 정상 저장 - typeof: string(타입추론)
  anyVal = true; // boolean 정상 저장 - typeof: boolean(타입추론)
  anyVal = {}; // 객체 정상 저장 - typeof: object(타입추론)
  anyVal = () => {}; // 심지어 함수도 저장 가능 - typeof: function(타입추론)
  anyVal.toUpperCase(); // 모든 타입이 될 수 있기 때문에 문자열에만 있는 메소드 사용 가능
  anyVal.toFixed(); // 정수형에만 있는 메소드도 사용 가능 (제약없이 자유롭게 사용 가능)

  let num: number = 10;
  num = anyVal; // number타입 변수에 any타입 변수 할당시 타입오류 발생하지 않음.
  ```

위와같이 any타입을 변수에 지정할 경우 모든 타입의 값을 할당받을 수 있고, `[반대]`로 모든 타입의 변수에 any타입의 값이나 변수를 할당할 수도 있다.  
any타입은 타입스크립트의 타입검사를 통과하는 치트키 같은 타입이라고 생각하면 된다.  
그러나 ts-node나 tsx로 실행할 경우 runtime 오류가 발생한다.  
(TypeError: anyVal.toUpperCase is not a function)  
최종 초기화 값이 함수인데, 함수에서 문자열 함수를 호출하려고 하니 오류가 발생한것이다.  
any타입은 타입 검사 통과하는것이 아니라 사실 안하는것이라고 볼 수 있다.  
따라서 any타입을 지정할 경우 타입스크립트가 가지는 이점을 다 포기하는것과 다를 게 없다.  
타입 검사를 모두 다 통과(생략) 하고 런타임 에러가 발생하는 최악의 상황을 유발하게 된다.  
따라서 any타입은 가능한 한 최대한 사용하지 않는 편이 좋다.

## Unknown타입
any와 비슷하지만 조금 다르다.  
만약 변수에 어떤 타입이 들어올지 모를경우에는 any 혹은 unknown 둘중 하나를 쓸 수 있다.  
이 역시 변수에 어떤 타입의 값이든 할당을 허용하지만 값이 할당되는 순간 타입추론을 통해 할당된 타입으로 타입이 변경된다.  

- src/chapter6.ts
  ```ts
  let unknownVar: unknown;
  unknownVar = 1; // number
  unknownVar = "1"; // string
  unknownVar = () => {}; // 타입추론: function
  ```

### Any 타입과의 차이점 1
any타입에서는 가능했던 모든 타입이 unknown타입의 변수에 할당 되는것과 `[반대]`로 다른 모든 타입 변수에 할당은 `불가능` 하다.  
unknown타입은 any타입과는 다르게 모든 값을 저장할 수 있지만 반대로는 안된다.  
아래와 같이 number 타입 변수에 unknown 타입 변수를 할당할 수 없다.  
number 타입 뿐만 아니라 모든 타입의 변수에 할당할 수 없다.  

- src/chapter6.ts
  ```ts
  let unknownVar: unknown;
  let num: number = 10;
  num = unknownVar; // Type 'unknown' is not assignable to type 'number'.
  ```

### Any 타입과의 차이점 2
any타입과는 다르게 toUpperCase와 같은 메소드도 절대 허용되지 않는다.  
덧셈 뺄셈 곱셈 나눗셈 등의 연산 자체도 unknown 타입에서 쓸수 없다.  

- src/chapter6.ts
  ```ts
  let unknownVar: unknown;
  unknownVar.toUpperCase(); // unknown에서는 메소드도 절대 허용하지 않는다.
  ```

### 타입 좁히기(타입 정제)
만약  unknown타입의 값을 활용하고 싶다면 조건문을 통해 사용할 수 있다.
조건문에서 typeof 연산자로 number타입임을 확실히 확인시켜 주었을 때만 변수의 타입을 원하는 타입으로 정제해서 사용 할 수 있게 된다.
(값이 할당되는 순간 할당된 값에 해당하는 타입으로 타입추론이 되어 타입이 변경되기 때문)
이러한 과정을 타입 정제 또는 타입 좁히기 라고 한다.
- src/chapter6.ts
  ```ts
  if (typeof unknownVar === 'number') {
    num = unknownVar
  }
  ```

변수에 저장할 값의 타입이 확실하지 않을 경우 any타입 보다는 조금 더 안전한 unknown타입을 활용하는것이 좋다.
unknown타입은 적어도 연산이나 메소드나 변수에나 값을 넣을 수 없기 때문에 런타임 에러를 일으키는 any타입보다는 안전하다.

</details>
<br>

# Void 와 Never 타입
<details>
<summary>펼치기/접기</summary>
<br>

## Void 타입
Void란? 공허, 아무것도 없다는 우리말 뜻을 가진다.  
Void 타입은 아무것도 없음을 의미하는 타입이다.  

### 함수 반환타입으로 보는 void 예제
타입스크립트에서는 함수의 반환값에도 타입을 정의할 수 있다.  
함수의 매개변수를 작성하는 소괄호 뒤에 타입 주석을 작성한다.  
문자열을 반환하면 `funciton func(): string`과 같은 형태로 선언한다.
- src/chapter7.ts
  ```ts
  function func1(): string {
    return "hello";
  }
  ```
아래와 같이 함수 내 아무런 값도 반환하지 않을 경우 반환타입은 Void타입으로 정의한다.  
- src/chapter7.ts
  ```ts
  function func2(): void {
    console.log("hello")
  }
  ```
### void 예제: 변수 반환타입
void 타입으로 정의한 변수에는 어떠한 값도 담을 수 없다.  
정수, 문자, boolean, 객체 모두 할당할 수 없으나, 오직 undefined만 할당 가능하다.  
이때 tsconfig.json에서 엄격한 Null검사 컴파일러 옵션을 `strictNullChecks: false`로 설정할 경우  
예외적으로 void 타입의 변수에도 null을 할당할 수 있다.  
어느타입의 변수에나 null이 할당될 수 있게 설정하는 옵션이기 때문이다. 
- src/chapter7.ts
  ```ts
  let a: void;
  a = 1; // Type 'number' is not assignable to type 'void'.
  a = "hello" // Type 'number' is not assignable to type 'void'.
  a = {}; // Type 'number' is not assignable to type 'void'.
  a = undefined // 할당 가능.
  a = null // strictNullChecks: false의 경우 가능
  ```

## 함수 반환타입 null과 undefined

### 함수 undefined 반환타입 (v 5.0.3 이슈 - 5.1.0 이상부터는 반환하지 않아도 문제없음)
아무것도 없음을 나타내는 값으로 undefined나 null이 있음에도 불구하고 함수의 반환 타입을 정의할 때 void를 쓰는 이유가 무엇일까?
함수에 undefind를 반환타입으로 지정할 경우 오류가 발생한다.  
해당 함수가 undefined를 실제로 반환하도록 해야한다.
(그냥 return만 해도 된다.)
- src/chapter7.ts
  ```ts
  function func3(): undefined {
    console.log("hello")
    // return undefined;
    return;
  }
  ```
### 함수 null 반환타입
null타입의 경우 오로지 null을 반환해야한다.  
따라서 정말로 반환값이 없는 함수의 반환 타입으로는 void를 사용하는것이다.  
- src/chapter7.ts
  ```ts
  function func4(): null {
    return null;
  }
  ```

## Never 타입 
Never란? 존재하지않는, 불가능한 타입 이라는 의미를 가진다.  
불가능한 이라는 뜻으로 정의된 Never 타입의 예제 코드를 작성한다.  

### while 무한루프 함수 예제
무한루프를 도는 함수의 경우 함수의 반환타입을 void로도 선언할 수 있다.  
그러나 void타입은 func2 함수처럼 함수가 정상적으로 종료는 되지만 진짜 반환하는 값, 반환문 자체가 없어서 void 타입이 된다.  
아래 func5 함수는 반환을 할 수가 없을 수도 있다.  
정상적으로 종료 되지 않을 수 있는 함수는 반환한다는 것 자체가 모순이거나 절대 불가능 하기에 void 타입을 쓰는것은 사실 말이 안된다.  
이렇게 절대 정상적으로 종료가 될 수 없는 함수의 경우 never타입 으로 정의한다.  
- src/chapter7.ts
  ```ts
  function func5(): void {
    while(true) {

    }
  }

  function func6(): never {
    while(true) {

    }
  }
  ```
###  Never 타입 함수 반환 예제 - Error  
Error을 던져서 프로그램이 중지될 경우의 반환타입도 Never를 정의하는것이 적합하다.  
- src/chapter7.ts
  ```ts
  function func7(): never {
    throw new Error()
  }
  ```
### never 타입 변수 예제
변수의 타입도 never타입으로 정의할 수 있지만 void 타입처럼 어떠한 타입의 값도 할당할 수 없다.  

- src/chapter7.ts
  ```ts
  let b: never;
  b = 1;
  b = {};
  b = "";
  ```
예외로 void타입은 undefined 타입을 할당할 수 있었지만 never 타입은 undefined마저 할당이 불가능하다.  

- src/chapter7.ts
  ```ts
  let b: never;
  b = undefined;
  ```
심지어 null 할당에 대해서도 strictNullchecks: false 옵션을 주더라도 null 할당이 불가능하다.  

- src/chapter7.ts
  ```ts
  let b: never;
  b = null;
  ```
또한 any타입의 변수 선언 후 해당 변수를 할당할 경우 오류가 발생한다.  
- src/chapter7.ts
  ```ts
  let b: never;
  let anyVar: any;
  b = anyVar;
  ```
이처럼 never타입은 그 어떤 값도 저장할 수 없는 변수의 타입을 정의할 때에 활용한다.
</details>
<br>