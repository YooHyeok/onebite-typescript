# [메인 마크다운.md](../README.md)
<br>

> ## 프로젝트 설정
<details>
<summary>펼치기/접기</summary>
<br>

  >### React 프로젝트 설치
  <details>
  <summary>펼치기/접기</summary>
  <br>

  #### 1. 디렉토리 생성

  #### 2. react 앱 설치
  ```bash
  npx create-react-app@latest .
  ```
  위 명령에서 `.`의 의미는 새로운 폴더를 생성하지 않고 현재 터미널상에 잡힌 최종 디렉토리 하위에 리액트 앱을 바로 설치하라는 의미이다.  
  최종 디렉토리의 이름으로 프로젝트명이 설정된다.  
  
  #### 3. 불필요한 파일 제거
  1. App.test.js
  2. logo.svg
  3. reportwebvitals.js
    - index.js에서 코드 함께 제거
  4. setupTests.js
  
  #### 4. 파일 수정
  - **index.js**: reportwebvitals.js import, 관련 스크립트 코드 제거 
    ```js
    import './App.css';

    function App() {
      return (
        <div className="App"></div>
      );
    }

    export default App;
    ```
  - **App.js**: logo.svg import, App Function return App className div 하위 jsx제거
    ```js
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import './index.css';
    import App from './App';

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    ```
  </details>

  > ### React 프로젝트 타입스크립트 적용
  <details>
  <summary>펼치기/접기</summary>
  <br>

  #### 1. 내장 타입 디팬던시 패키지 설치
  node.js의 내장 기능들과 리액트 앱을 위한 타입 정보들을 제공하는 패키지들을 설치해 준다.
  ```bash
  npm i @types/node @types/react @types/react-dom @types/jest
  ```
  설치가 완료되면 [package.json](package.json) 파일의 dependencies에 설치한 패키지들이 추가된다.
  ```json
  {
    /* 생략 */
    "dependencies": {
      /* 생략 */
      "@types/jest": "^29.5.14",
      "@types/node": "^22.14.1",
      "@types/react": "^19.1.2",
      "@types/react-dom": "^19.1.2",
      /* 생략 */
    },
    /* 생략 */
  }
  ```
  #### 2. 타입스크립트 컴파일러 설정
  앱이 어디서든지 잘 동작할 수 있도록 target은 ES5로, module은 CommonJS로 설정한다.
  ```json
  {
    "compilerOptions": {
      "target": "ES5",
      "module": "CommonJS",
      "strict": true,
      "allowJs": true
    },
    "include": ["src"]
  }
  ```
  #### 3. React jsx 컴포넌트 js 확장자 파일들을 확장자를 jsx로 변경
  위와 같이 tsconfig.json파일을 추가하여 설정할 경우 오류가 발생한다.  
  ```
  Cannot write file 'c:/Programming/workspace_vs/onebite-typescript/section12/src/App.js' because it would overwrite input file.ts
  Cannot write file 'c:/Programming/workspace_vs/onebite-typescript/section12/src/index.js' because it would overwrite input file.ts
  JSON schema for the TypeScript compiler's configuration file
  ```
  App.js와 index.js 파일이 jsx 문법을 사용하고 있는데, 타입스크립트는 기본적으로 js 확장자의 파일로 부터 jsx 문법을 해석할 수 없기 때문에 해당 오류가 발생한다.  
  따라서 리액트 프로젝트에 타입스크립트를 적용할 경우 jsx 문법을 사용하는 파일들의 확장자를 js가 아닌 jsx로 변경해줘야 한다.

  #### 4. jsx 확장자를 tsx로 변경
  jsx 확장자로 되어있는 파일을 타입스크립트 파일로 바꿔서 타입 검사를 수행하도록 만들어 줘야 하는데 모든 파일들을 한꺼번에 다 타입스크립트 파일로 바꿔도 되긴 하지만 그렇게 하면 동시에 너무나도 많은 오류를 해결해야 한다.  
  따라서 만약 자바스크립트로 만들어진 프로젝트를 타입스크립트로 변경해야 한다면 개별 파일로 하나씩 변경하는게 유리하다.

  tsx 확장자로 변경하자 마자 파일 내부에 오류가 발생한다.  
  - index.js
    - import React from "react"
      ```
      Module '"c:/Programming/workspace_vs/onebite-typescript/section12/node_modules/@types/react/index"' can only be default-imported using the 'esModuleInterop' flagts(1259)
      ```
    - import ReactDOM from 'react-dom/client';
      ```
      Module '"c:/Programming/workspace_vs/onebite-typescript/section12/node_modules/@types/react-dom/client"' has no default export.ts(1192)
      ```
    위 오류 내용들을 해석해보면 "react-dom/client에는 기본 내보내기가 없다" 라고 출력한다.  
    기본 내보내기란 ES module 시스템에서 default를 이용해서 내보낸 값을 의미하는 것이다.  
    오류의 원인을 직접 확인해보기 위해 from절의 "react-dom/client"에 마우스 커서를 올리고 Ctrl + 클릭을 통해 해당 파일을 직접 열어 확인해 보면 `export` 키워드만 있고 `export deafult`로 내보낸 기본 내보내기 값은 없다.  
    그래서 index.tsx에 기본 내보내기 된 값을 불러오려고 하면 오류가 발생한다.  
    이럴 때에는 default로 내보낸 값이 없을 때에도 그냥 모듈을 불러올 수 있도록 타입스크립트 컴파일러 설정 파일에서 `"esModuleInterop": true` 옵션을 컴파일러 옵션에 추가해야 된다.  
    - tsconfig.json
      ```json
      {
        "compilerOptions": {
          "esModuleInterop": true
        },
      }
      ```
    위 옵션을 저장한 뒤 `Ctrl + Shift + P > restart 검색 > Restart TS Server 명령 실행`  작업을 진행한다.

    esModuleInterop 옵션은 default로 내보낸 값이 없는 모듈에서도 값을 불러올 수 있도록 허용해주는 옵션이다.  
    react-dom 이나 react 같은 외부 라이브러리, 외부 패키지를 설치하고 불러올 때 default로 내보낸 값이 없는 패키지가 있을수도 있기 땜누에 보통은 esModuleInterop이라는 옵션을 키고 개발한다.  
  - React.StrictMode
    ```
    Cannot use JSX unless the '--jsx' flag is provided.ts(17004)
    ```
    해석해보면 jsx 플래그를 제공하지 않으면 jsx를 사용할 수 없다 라는 의미이다.  
    타입스크립트 컴파일러는 기본적으로 JSX 문법을 해석할 수 없기 때문에 옵션을 추가하여 해석할 수 있도록 타입스크립트 컴파일러 설정 파일에서 `"jsx": "react-jsx"` 옵션을 컴파일러 옵션에 추가해야 된다.  
    - tsconfig.json
      ```json
      {
        "compilerOptions": {
          "jsx": "react-jsx"
        },
      }
      ```
    위 옵션을 저장한 뒤 `Ctrl + Shift + P > restart 검색 > Restart TS Server 명령 실행`  작업을 진행한다.

  - document.getElementById('root')
    ```
    Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Container'.  Type 'null' is not assignable to type 'Container'.ts(2345)
    ```
    null 타입은 'Container' 타입에 할당할 수 없다 라는 의미로 바로 아래코드에서 Document.getElementById 함수 반환값 타입이 HTMLElement | null 타입 으로 추론하고 있다.  
    Document.getElementById 메소드가 null타입의 값을 반환할 수도 있는데 해당 메소드의 결과값을 매개변수로 전달하는 `createRoot()` 메소드는 null타입의 값을 인수로 받지 않기 때문에 오류가 발생하는 것이다.  
    이 경우 getElementById 메소드의 마지막에 `!` 즉, non-null 단언을 작성하면 된다.
    ```js
    const root = ReactDOM.createRoot(document.getElementById('root')!);
    ```
  자바스크립트 프로젝트를 타입스크립트로 마이그레이션 하는 과정은 위 과정처럼 하나의 파일을 타입스크립트 파일로 바꾸고 해당 파일 내에 존재하는 타입 오류들을 순서대로 천천히 해결하는 방식으로 진행한다.  

  #### React js → ts 마이그레이션 진행 순서 정리

  1. 타입 선언 패키지 설치(4개)
  2. tsconfig.js 생성
  3. 모든 js파일 확장자 jsx로 변경
  4. 개별 파일 tsx형식으로 변경
  5. 발생하는 타입 오류 해결

  </details>
  <br>

</details>
<br>

> ## UseState Hook과 타입 정의
<details>
<summary>펼치기/접기</summary>
<br>

React의 useState라는 함수는 초기값으로 전달한 인수의 타입에 따라서 state변수와 state 변화함수의 타입을 자동으로 추론해준다.  
이런 특징을 갖는 함수들을 generic 함수라고 부른다.  
- [src/UseState.tsx](src/UseState.tsx)
  ```ts
  import { useState } from 'react';
  function UseState() {
    const [text, setText] = useState(""); // const text: string / React.Dispatch<React.SetStateAction<string>>
  }
  ```

실제로 구조분해 할당을 통해 useState로 부터 추출한 setter 함수에 마우스 커서를 올려보면 반환 타입으로 `React.Dispatch<React.SetStateAction<string>>`가 출력된다.  
출력되는 반환타입 값에서 집중해야할 포인트는 제네릭 타입변수 string이다.  
즉 아래 set함수를 호출하면 인수로 전달할 수 있는 값은 문자열이 된다.  
실제로 useState메소드에 커서를 올린 뒤 Ctrl을 누르고 클릭해보면 useState의 타입이 정의되있는 파일로 이동된다.  
- [index.d.ts](node_modules/@types/react/index.d.ts)
  ```ts
  function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  ```
  하나의 타입 변수 S를 갖는 제네릭 함수라는 것을 알 수 있고 초기값으로 전달하는 인수를 S타입을 갖는 `initialState`라는 이름의 변수로 받고 있다.  


state 선언 아래에 `setText(1);`과 같이 string 타입이 아닌 다른 값을 인수로 전달할 경우 오류가 발생하게 된다.
- [src/UseState.tsx](src/UseState.tsx)
  ```ts
  import { useState } from 'react';
  function UseState() {
    const [text, setText] = useState("");
    setText(1); // [Error] Argument of type 'number' is not assignable to parameter of type 'SetStateAction<string>'.ts(2345)
  }
  ```

만약 useState를 쓸 때 초기값에 넣을 게 마땅히 없어서 `useState();와 같이` 비워두는 경우에는 undefined로 추론되는 것을 확인할 수 있다.  
- [src/UseState.tsx](src/UseState.tsx)
  ```ts
  import { useState } from 'react';
  function UseState() {
    const [empty, setEmpty] = useState(); // (alias) useState<undefined>(): [undefined, React.Dispatch<React.SetStateAction<undefined>>] (+1 overload)
  }
  ```

다시 useState 타입이 정의되있는 파일로 이동하여 확인해보면 타입변수 S의 기본값이 undefined 타입으로 설정되어 있다.  
- [index.d.ts](node_modules/@types/react/index.d.ts)
  ```ts
  function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
  ```
타입 변수 = undefined와 같이 타입을 쓰면 타입 변수의 기본 값 타입이 undefined가 되는것이다.  
그렇기 때문에 앞서 작성한것과 같이 초기 값을 인수로 전달하지 않으면 기본적으로 `const empty: undefined` 즉, empty state 타입이 undefined 타입으로 추론된다.  
결국 setEmpty() 함수에도 인수로 전달할 수 있는 타입은 undefined 타입이 되는것이다.  
타입스크립트에서는 위와같이 사용하면 안된다.  
만약 초기값으로 설정할 마땅한 값이 없는 경우 제네릭 타입 변수를 직접 설정해줘야 한다.  
- [src/UseState.tsx](src/UseState.tsx)
  ```ts
  import { useState } from 'react';
  function UseState() {
    const [string, setString] = useState<string>();
  }
  ```
state 변수 string에 마우스 커서를 올려보면 `const string: string | undefined` 과 같이 string과 undefined의 유니온 타입으로 추론되는 것으로 확인된다.  
 union타입으로 추론되는 이유는 string 타입의 타입변수를 적용 했지만 결국 실제 인수로 초기 값이 없어 undefined 값을 가질 수도 있기 때문이다.  
 보통의 경우 undefined 타입과 유니온 된 타입으로 추론되게 하지 않고 초기값으로 뭐라도 전달하는게 좋다.  

</details>
<br>

## 템플릿1
<details>
<summary>펼치기/접기</summary>
<br>

### 
- src/chapter.ts
  ```ts
  ```
</details>
<br>

## 템플릿2
<details>
<summary>펼치기/접기</summary>
<br>

  ### 템플릿
  <details>
  <summary>펼치기/접기</summary>
  <br>

  ### 
  - src/chapter.ts
    ```ts
    ```

  </details>
  <br>

  ### 템플릿
  <details>
  <summary>펼치기/접기</summary>
  <br>

  </details>
  <br>

</details>
<br>
