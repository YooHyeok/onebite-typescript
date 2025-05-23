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
- [src/syntax/UseState.tsx](src/syntax/UseState.tsx)
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
- [src/syntax/UseState.tsx](src/syntax/UseState.tsx)
  ```ts
  import { useState } from 'react';
  function UseState() {
    const [text, setText] = useState("");
    setText(1); // [Error] Argument of type 'number' is not assignable to parameter of type 'SetStateAction<string>'.ts(2345)
  }
  ```

만약 useState를 쓸 때 초기값에 넣을 게 마땅히 없어서 `useState();와 같이` 비워두는 경우에는 undefined로 추론되는 것을 확인할 수 있다.  
- [src/syntax/UseState.tsx](src/syntax/UseState.tsx)
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
- [src/syntax/UseState.tsx](src/syntax/UseState.tsx)
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

> ## React Event 표준 타입
<details>
<summary>펼치기/접기</summary>
<br>

### Change Event 타입 예제

input 입력 태그에 값을 입력할 경우 text타입의 state변수 값을 입력한 값으로 변경하려는 기능을 구현해본다고 가정한다.  
react에서는 input 태그에 onchange 이벤트 속성에 함수를 바인딩할 수 있다.  
- [src/syntax/Event.tsx](src/syntax/Event.tsx)
  ```tsx
  import { useState } from "react"

  function Event() {
    const [text, setText] = useState<string>();
    }
    return (
      <div>
        <h1>Todo</h1>
        <input
          type="text"
          value={text}
          onChange={(e) => {setText(e.target.value)}}
        />
      </div>
    );
  }
  export default Event;
  ```

이벤트 속성에 바인딩 된 함수에 타입스크립트를 적용한다면 어떤 문법으로 적용해야 할까?  
먼저 매개변수로 전달하는 event 객체의 타입을 정의 해야한다.  
사용하는 값이 e.target.value이기 때문에 아래 코드와 같이 string타입의 value를 갖는 target 프로퍼티에 매핑되는 객체 타입을 지정할 수 있다.  
- [src/syntax/Event.tsx](src/syntax/Event.tsx)
  ```tsx
  import { useState } from "react"

  function Event() {
    const [text, setText] = useState<string>();
    const onChangeInput = (e: {target: {value: string}}) => {
      setText(e.target.value)
    }
    return (
      <div>
        <h1>Todo</h1>
        <input
          type="text"
          onChange={onChangeInput}
        />
      </div>
    );
  }
  export default Event;
  ```
그러나 해당 타입은 완전히 틀렸다.  
결론적으로 일반적인 event 객체는 target 말고도 많은 프로퍼티를 갖고 있는 복합 객체이다.  
따라서, 위와같이 선언할 경우 event 객체 전체가 아닌 event.target.value만 있다고 가정해버리는 것이다.  
즉, 실제 있는 다른 프로퍼티들은 무시되거나 타입 오류가 발생할 여지가 생긴다.

### React Event 표준 타입
React에서는 각 이벤트별로 표준 타입을 지원한다.  
실제로 화살표 함수로 구현한 곳의 event 매개변수 위치에 마우스 커서를 올려보면 
`(parameter) e: React.ChangeEvent<HTMLInputElement>` 타입으로 추론된다.  
해당 타입은 React 표준 change 이벤트 타입이다.  

- [src/syntax/Event.tsx](src/syntax/Event.tsx)
  ```tsx
  import { useState } from "react"

  function Event() {
    const [text, setText] = useState<string>();
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value)
    }
    return (
      <div>
        <h1>Todo</h1>
        <input
          type="text"
          onChange={onChangeInput}
        />
      </div>
    );
  }
  export default Event;
  ```

</details>
<br>

> ## Props 타입 지정 (function, Children)
<details>
<summary>펼치기/접기</summary>
<br>

부모 컴포넌트에서 자식 컴포넌트로 Props를 전달할 경우, 자식 컴포넌트에서 전달받은 Props에 대한 타입을 정의해줘야 한다.  

### props type 예제1 - Function

- [src/syntax/props/Parent.tsx](src/syntax/props/Parent.tsx)
  ```tsx
  import Child from './Child';

  export default function Parent() {
    const onClick = (text: string) => {
      console.log("Parent컴포넌트 onClick 호출 - text: ", text)
    }

    return (
      <div>
        <Child onClick={onClick} />
      </div>
    );
  }
  ```

- [src/syntax/props/Child.tsx](src/syntax/props/Child.tsx)
  ```tsx
  export default function Child({ onClick }) {
    const onClickBtn = () => {
      onClick("Child");
    }
    return (
      <>
        <button onClick={onClickBtn}>Parent onClick 호출</button>
      </>
    )
  }
  ```
  아래와 같은 오류가 발생한다.
  ```
  Binding element 'onClick' implicitly has an 'any' type.ts(7031)
  ```

  구조 분해 할당된 요소 'onClick'의 타입이 명시되지 않았기 때문에, TypeScript가 'any' 타입으로 추론하고 있다는 의미이다.
  즉, 'onClick'이 어떤 타입인지 알 수 없다는 경고이다.

- [src/syntax/props/Child.tsx](src/syntax/props/Child.tsx)
  ```tsx
  interface Props { /* props 상세타입 정의 */
    onClick: (text: string) => void;
  }

  export default function Child({ onClick }: Props) { /* props 상세타입 지정 */
    const onClickBtn = () => {
      onClick("Child");
    }
    return (
      <>
        <button onClick={onClickBtn}>Parent onClick 호출</button>
      </>
    )
  }
  ```
위와 같이 props에 대한 상세 타입을 정의해주면 오류가 사라진다.

### props type 예제2 - Children

- [src/syntax/props/Parent.tsx](src/syntax/props/Parent.tsx)
  ```tsx
  import Child from './Child';

  export default function Parent() {
    return (
      <div>
        <Child>
          {/* Children */}
          <div>Children</div>
        </Child>
      </div>
    );
  }
  ```

Children은 props로 넘겨받아 사용하기 때문에 props에 타입을 지정해줘야 한다.  
이때 사용되는 타입은 ReactElement로 `import { ReactElement } from 'react';`와 같이 `react`로 부터 불러오기 문법을 사용해야 한다.
- [src/syntax/props/Child.tsx](src/syntax/props/Child.tsx)
  ```tsx
  import { ReactElement } from 'react';

  interface Props {
    children: ReactElement;
  }

  export default function Child({ children }: Props) {
    return (
      <>
        <div> {children} </div>
      </>
    )
  }
  ```

</details>
<br>

## 타입 모듈화
<details>
<summary>펼치기/접기</summary>
<br>


- [src/App.ts](src/App.tsx)
  ```ts
  interface Todo {
    id: number;
    content: string;
  }
  function App() {

  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div>
      <div>
        {todos.map((todo) => <TodoItem {...todo} />)}
      </div>
    </div>
    );
  }

  export default App;
  ```
- [src/components/TodoItem.tsx](src/components/TodoItem.tsx)
  ```ts
  interface Props {
    id: number;
    content: string;
  }
  export default function TodoItem({id, content}: Props) {
    return <div> 
      {id} 번: { content }
      <button>삭제</button>
    </div>
  }
  ```
App.tsx 컴포넌트의 Todo 타입과, TodoItem.tsx 컴포넌트의 Props 타입은 동일한 프로퍼티(타입)을 갖는다.
동일한 타입이 여러 컴포넌트에서 공통으로 사용될때 별도의 타입스크립트 파일을 만들어 분리하는게 좋다.

### export interface

- [src/types.ts](src/types.ts)
  ```ts
  export interface Todo {
    id: number;
    content: string;
  }
  ```

위와 같이 ts파일을 만들어 내보내기를 통해 공통으로 반복되는 타입들 인터페이스로 정의하여 분리한뒤, 아래 코드와 같이 import를 통해 props를 가져온다.  

- [src/chapter.ts](src/App.tsx)
  ```ts
  import { Todo } from './types';
  function App() {

  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div>
      <div>
        {todos.map((todo) => <TodoItem {...todo} />)}
      </div>
    </div>
    );
  }

  export default App;
  ```

가져온 타입은 interface이기 때문에 확장 문법도 사용이 가능하다.

- [src/components/TodoItem.tsx](src/components/TodoItem.tsx)
  ```ts
  import { Todo } from './types';
  interface Props extends Todo{
    // extra: string; // 추가적인 새로운 props 요소를 받을 수 있음.
  }
  export default function TodoItem({id, content}: Props) {
    return <div> 
      {id} 번: { content }
      <button>삭제</button>
    </div>
  }
  ```

</details>
<br>

## useReducer
<details>
<summary>펼치기/접기</summary>
<br>

useReducer의 경우 타입스크립트를 적용하지 않은 코드와 적용한 코드를 예시로만 작성하겠다.

### 순수 자바스크립트
- src/chapter.ts
  ```ts
  import { useRef, useEffect, useReducer } from 'react';
  import { Todo } from './types';

  /**
  * reducer 함수는 state, action 두개의 매개변수를 갖는다.
  * 매개변수 1. state: 상태
  * 매개변수 2. action: 행위
  */
  function reducer(state, action) {
    switch (action.type) {
      case 'CREATE': return [...state, action.data]
      case 'DELETE': return state.filter((it) => it.id !== action.id)
    }
  }

  function App() {

    /**
    * useReducer는 2개의 매개변수를 받는다.  
    * - 매개변수 1. reducer라는 상태(state) 변화를 직접 처리하는 함수
    * - 매개변수 2. 상태(state)의 초기값
    */
    const [todos, dispatch] = useReducer(reducer, []);

    const idRef = useRef<number>(0)

    const onClickAdd = (text) => {
      dispatch({
        type: "CREATE",
        data: {
          id: idRef.current++, // 값 증가
          content: text
        }
      })
    }

    const onClickDelete = (id) => {
      dispatch({
        type: "DELETE",
        id: id
      })
    }
  }

  export default App;
  ```
### 타입스크립트 적용
- src/chapter.ts
  ```ts
  import { useRef, useEffect, useReducer } from 'react';
  import { Todo } from './types';

  /**
  * 유니온 타입
  */
  type Action = {
    type: "CREATE",
    data: {
      id: number;
      content: string
    }
  } | {type: "DELETE"; id: number };
  
  /**
  * reducer 함수는 state, action 두개의 매개변수를 갖는다.
  * 매개변수 1. state: 상태
  * 매개변수 2. action: 행위
  */
  function reducer(state: Todo[], action: Action) {
    switch (action.type) {
      case 'CREATE': return [...state, action.data]
      case 'DELETE': return state.filter((it) => it.id !== action.id)
    }
  }
  function App() {
    const [todos, dispatch] = useReducer(reducer, []);

    const idRef = useRef<number>(0)

    const onClickAdd = (text: string) => {
      dispatch({
        type: "CREATE",
        data: {
          id: idRef.current++,
          content: text
        }
      })
    }

    const onClickDelete = (id: number) => {
      dispatch({
        type: "DELETE",
        id: id
      })
    }
  }

  export default App;
  ```
</details>
<br>

## ContextAPI 
<details>
<summary>펼치기/접기</summary>
<br>

Context 

### createContext

```ts
export const Context = React.createContext(); // [Error] index.d.ts(709, 9): An argument for 'defaultValue' was not provided.
```

위와같이 Context를 생성하는 `createContext()` 함수를 선언하고 ctrl + click을 하여 타입을 확인해보자.

- [node_modules/@types/react/index.d.ts](node_modules/@types/react/index.d.ts)
  ```ts
      /**
     * Lets you create a {@link Context} that components can provide or read.
     *
     * @param defaultValue The value you want the context to have when there is no matching
     * {@link Provider} in the tree above the component reading the context. This is meant
     * as a "last resort" fallback.
     *
     * @see {@link https://react.dev/reference/react/createContext#reference React Docs}
     * @see {@link https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/ React TypeScript Cheatsheet}
     *
     * @example
     *
     * ```tsx
     * import { createContext } from 'react';
     *
     * const ThemeContext = createContext('light');
     * function App() {
     *   return (
     *     <ThemeContext value="dark">
     *       <Toolbar />
     *     </ThemeContext>
     *   );
     * }
     * ```
     */
    function createContext<T>(
        // If you thought this should be optional, see
        // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509#issuecomment-382213106
        defaultValue: T,
    ): Context<T>;
  ```

한개의 타입 변수 T를 사용하는 제네릭 함수이며, 제네릭 타입변수로 선언한 T 타입을 갖는 하나의 매개변수를 필수로 받고있다.  
따라서 `React.createContext();`와 같이 인수를 전달하지 않을 경우 오류가 발생하게 된다.  

초기값으로 전달할 값이 없다면 null값을 전달한다.  
변수명에 마우스 커서를 올려보면 아래와 같이 React.Context의 null로 추론되는것을 볼수가 있다.  
```ts
const Context: React.Context<null>
```
이는 null을 공급하는 Context 타입이다 정도로 이해할 수 있다.  

- [src/app/contextAPI/App.tsx](src/app/contextAPI/App.tsx)
  ```ts
  export const TodoStateContext = React.createContext<Todo[] | null>(null);
  
  ```
Context에 컴포넌트 tree에 Todo 객체를 요소로 갖는 Todos라는 배열을 공급할 목적으로 사용한다고 가정해본다.  
초기값으로 null을 선언해야 하지만 null타입의 값을 공급하는 Context로 추론되면 안된다.  
따라서 null로 초기화 해야 한다면 createContext의 제네릭 타입 변수 T에 `Todo[] | null` 형태의 유니온 타입을 지정해 준다.  

### 함수 공급 Context
- [src/app/contextAPI/App.tsx](src/app/contextAPI/App.tsx)
  ```ts
  interface TodoDisptach {
    onClickAdd: (text: string) => void;
    onClickDelete: (id: number) => void
  }
  export const TodoDispatchContext = createContext<TodoDisptach | null>(null);
  ```

함수를 공급하는 Context도 동일하다.  
먼저 함수의 타입을 인터페이스로 정의한다.  
초기값으로 null을 선언한 뒤 유니온 타입으로 인터페이스 타입과 null을 createContext의 제네릭 타입 변수 T에 지정해준다.  

### 완성 예제 코드
```ts
import React, { createContext, useRef, useEffect, useReducer } from 'react';
import '../App.css'
import Editor from '../../components/Editor';
import TodoItem from '../../components/TodoItem';

type Action = {
  type: "CREATE",
  data: {
    id: number;
    content: string
  }
} | {type: "DELETE"; id: number };

function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case 'CREATE': return [...state, action.data]
    case 'DELETE': return state.filter((it) => it.id !== action.id)
  }
}

export const TodoStateContext = React.createContext(null);
// export const TodoStateContext = React.createContext<Todo[] | null>(null);


interface TodoDisptach {
  onClickAdd: (text: string) => void;
  onClickDelete: (id: number) => void
}
export const TodoDispatchContext = createContext<TodoDisptach | null>(null); //

export default function AppVer2() {

  const [todos, dispatch] = useReducer(reducer, []);

  const idRef = useRef<number>(0)

  const onClickAdd = (text: string) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++, // 값 증가
        content: text
      }
    })
  }

  const onClickDelete = (id: number) => {
    dispatch({
      type: "DELETE",
      id: id
    })
  }

  useEffect(() => {
    console.log(todos)
  }, [todos])

  const todoDispatch = {
    onClickAdd,
    onClickDelete
  }

  return (
    <div className="App">
      <h1>Todo</h1>
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={todoDispatch}>
          <Editor onClickAdd={onClickAdd}>
            {/* Children */}
            <div>id: {idRef.current}</div>
          </Editor>
          <div>
            {todos.map((todo) => <TodoItem {...todo} onClickDelete={onClickDelete}/>)}
          </div>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}
```

</details>
<br>

## 외부 라이브러리와 definitely types
<details>
<summary>펼치기/접기</summary>
<br>

타입스크립트 환경에서 외부 라이브러리들을 설치하고 사용하기 위해 definitely types를 설치하고 사용하는 방법에 대해 셜펴본다.  

타입스크립트를 배우기 전, 순수 자바스크립트만으로 개발을 진행할 때.  
예를 들어 npm 사이트에서 react-router-dom과 같은 외부 패키지를 검색하여 사용한다고 하면 패키지의 상세 페이지에 들어가서 installation 명령어를 입력,설치 하기만 하면 사용할 수 있다.  

그러나 타입스크립트 환경에서는 자바스크립트와 다르게 해당 라이브러리만 설치한다고 바로 이용할 수 없다.  
타입스크립트는 기본적으로 코드를 실행하기 전에 타입 검사 기능을 수행하기 때문이다.  
따라서 라이브러리들의 코드도 타입 검사를 수행해야 한다.  
그렇기 때문에 라이브러리 코드들에 대한 타입 정보가 제공되지 않은 상황에서는 타입 검사가 제대로 이루어지지 않기 때문에 오류가 발생하고 바로 사용할 수가 없다.  

물론 당연히 예외도 있다.  

앞서 말한 react-router-dom 라이브러리의 경우 타입스크립트로 작성된 라이브러리 이기 때문에 설치하자마자 바로 사용할 수 있다.  
npm 사이트에서 타입스크립트로 제작된 라이브러리들의 이름에는 오른쪽에 `[TS]` 마크가 붙는다.
TS 마크가 붙은 라이브러리는 그냥 명령어만 입력하고 설치한 뒤 바로 쓸 수 있다는 것이다.  

그러나 아쉽게도 모든 라이브러리가 타입스크립트를 기본적으로 제공하지는 않는다. 

### lodash
자바스크립트의 배열과 객체를 좀더 쉽게 사용할 수 있도록 도와주는 라이브러리이며, 주간 다운로드 양이 5천만회에 육박하는 굉장히 인기 높은 라이브리이다.  

해당 라이브러리는 `[TS]`마크 위치에 `[DT]`마크가 붙어있다.

이렇게 TS마크가 붙어있지 않은 라이브러리들은 기본적으로 타입 정보가 제공되지 않는다.  
쉽게 말해 자바스크립트로 만들어진 라이브러리이다.  
따라서 타입스크립트에서는 해당 라이브러리를 설치해도 사용할 수 없다.  

이때 `[TS]`마크 대신 `[DT]`마크가 붙어있다면 방법이 있다.  
`[DT]`마크를 클릭해보면 새로운 링크로 이동하게 되는데, @types/lodash 라는 또다른 라이브러리의 페이지로 이동된다.  
@types/lodash는 lodash라는 라이브러리의 타입 정보를 갖는 패키지이다.
따라서 lodash라는 라이브러리를 타입스크립트 프로젝트에서 사용하려면 @types/lodash를 추가적으로 설치해줘야 된다고 이해하면 된다.  

- lodash 패키지 설치
  ```bash
  npm install lodash
  ```
- [src/index.tsx](src/index.tsx)
  ```ts
  import _ from 'lodash';
  ```
위와같이 lodash패키지를 설치하고 import하게되면 아래와같은 오류가 발생한다.  

```
Could not find a declaration file for module 'lodash'. 'c:/Programming/workspace_vs/onebite-typescript/section12/node_modules/lodash/lodash.js' implicitly has an 'any' type.
Try `npm i --save-dev @types/lodash` if it exists or add a new declaration (.d.ts) file containing `declare module 'lodash';`ts(7016)
```

모듈 'lodash'에 대한 선언 파일을 찾을 수 없습니다.  
즉, lodash는 js 파일이기 때문에 타입선언을 찾을 수 없다는 오류이다.  
```bash
npm install @types/lodash
```
위 명령을 통해 lodash 타입정보를 설치하여 해결할 수 있게 된다.  
이와같이 lodash같은 자바스크립트로 만들어진 라이브러리를 이용할 때에는 해당 라이브러리의 타입정보만 제공하는 패키지가 별도로 있는지까지 확인해 봐야 한다.  


이전에도 @types/lodash와 비슷한 라이브러리들을 설치한 적이 있다.  
package.json을 열어보면 Node.js의 기본 기능들에 대한 타입 정보를 갖고 있는 `@types/node` 라는 패키지를 설치했으며,  
React를 타입스크립트 프로젝트로 만들기 위해 `@types/react`, `@types/react-dom`, `@types/jest` 3가지의 패키지도 함께 설치했다.  
React나 React-Dom도 자바스크립트로 만들어진 라이브러리이기 때문에 별도의 React의 타입 정보를 갖고있는 패키지들도 별도로 설치했다.  
이렇게 @types라는 이름이 붙어있는 타입 정보를 제공하는 패키지들을 `definitely types` 라고 부른다 
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
