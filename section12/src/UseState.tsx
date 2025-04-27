import { useState } from 'react';

function UseState() {
  /**
   React의 useState라는 함수는 초기값으로 전달한 인수의 타입에 따라서 state변수와 state 변화함수의 타입을 자동으로 추론해준다.  
   이런 특징을 갖는 함수들을 generic 함수라고 부른다.  
   실제로 구조분해 할당을 통해 useState로 부터 추출한 set 함수에 마우스 커서를 올려보면 반환 타입으로 `React.Dispatch<React.SetStateAction<string>>`가 출력된다.  
   출력되는 반환타입 값에서 집중해야할 포인트는 제네릭 타입변수 string이다.  
   즉 아래 set함수를 호출하면 인수로 전달할 수 있는 값은 문자열이 된다.  
   실제로 useState메소드에 커서를 올린 뒤 Ctrl을 누르고 클릭해보면 useState의 타입이 정의되있는 파일로 이동된다.  
   ```ts
   function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
   ```
   하나의 타입 변수 S를 갖는 제네릭 함수라는 것을 알 수 있고 초기값으로 전달하는 인수를 S타입을 갖는 `initialState`라는 이름의 변수로 받고 있다.  
   */
  const [text, setText] = useState(""); // const text: string / React.Dispatch<React.SetStateAction<string>>
  /* 
  state 선언 아래에 `setText(1);`과 같이 string 타입이 아닌 다른 값을 인수로 전달할 경우 오류가 발생하게 된다.
  */
  // setText(1); // [Error] Argument of type 'number' is not assignable to parameter of type 'SetStateAction<string>'.ts(2345)

  /* 
  만약 useState를 쓸 때 초기값에 넣을 게 마땅히 없어서 `useState();와 같이` 비워두는 경우에는 undefined로 추론되는 것을 확인할 수 있다.  
  */
  const [empty, setEmpty] = useState(); // (alias) useState<undefined>(): [undefined, React.Dispatch<React.SetStateAction<undefined>>] (+1 overload)
 /*
  다시 useState 타입이 정의되있는 파일로 이동하여 확인해보면 타입변수 S의 기본값이 undefined 타입으로 설정되어 있다.  
  ```ts
  function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
  ```
  타입 변수 = undefined와 같이 타입을 쓰면 타입 변수의 기본 값 타입이 undefined가 되는것이다.  
  그렇기 때문에 앞서 작성한것과 같이 초기 값을 인수로 전달하지 않으면 기본적으로 `const empty: undefined` 즉, empty state 타입이 undefined 타입으로 추론된다.  
  결국 setEmpty() 함수에도 인수로 전달할 수 있는 타입은 undefined 타입이 되는것이다.  
  타입스크립트에서는 위와같이 사용하면 안된다.  
  */
 /*
  만약 초기값으로 설정할 마땅한 값이 없는 경우 제네릭 타입 변수를 직접 설정해줘야 한다.
  */
 const [string, setString] = useState<string>();
 /* 
 state 변수 string에 마우스 커서를 올려보면 `const string: string | undefined` 과 같이 string과 undefined의 유니온 타입으로 추론되는 것으로 확인된다.  
 union타입으로 추론되는 이유는 string 타입의 타입변수를 적용 했지만 결국 실제 인수로 초기 값이 없어 undefined 값을 가질 수도 있기 때문이다.  
 보통의 경우 undefined 타입과 유니온 된 타입으로 추론되게 하지 않고 초기값으로 뭐라도 전달하는게 좋다.  
 */
  
}

export default UseState;
