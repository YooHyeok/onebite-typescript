# [메인 마크다운.md](../README.md)
<br>

# 조건부 타입
<details>
<summary>펼치기/접기</summary>
<br>

자바스크립트의 물음표를 이용한 3항연산자를 이용하여 조건에 따라 타입을 결정하는 독특한 문법이다.

예를들어 number 타입이 string타입을 확장했는가에 대해 참이라면 string을, 거짓이라면 number을 타입으로 적용하는 예제를 작성해보면 아래와 같다.
### 
- src/chapter.ts
  ```ts
  type A = number extends string ? string : number
  ```
타입 A의 결과는 무엇일까?
number 타입은 string 타입을 확장하지 않는다.  
generic 타입 변수를 제한할 때 extends 키워드를 사용하는것 처럼 number는 string타입의 sub타입이 아니다.  
그렇기 때문에 위 조건은 거짓이 되고 결국 타입 A는 number타입이 된다.  
타입 A에 마우스 커서를 올려보면
```
type A = number
```
number타입으로 추론된 조건부 타입의 결과도 바로 확인할 수 있다.  

### 예제1) 조건부 타입 기본 문법 - 객체 타입
먼저 ObjA, ObjB 2개의 객체 타입을 만들어 준다.  
ObjA 객체 타입에는 number타입 프로퍼티 a를 구성하도록 하고, ObjB 객체 타입에는 number타입 프로퍼티 a와 number타입 프로퍼티 b를 구성한다.
- src/chapter.ts
  ```ts
  type ObjA = {
    a: number
  }

  type ObjB = {
    a: number;
    b: number;
  }
  ```
다음으로 ObjB타입이 ObjA 타입을 확장 했는가에 대해 참이라면 number를 거짓이라면 string을 타입으로 적용하는 조건부 타입 식을 type B에 적용한다.
- src/chapter.ts
  ```ts
  type B = ObjB extends ObjA ? number : string
  ```
실제로 ObjB타입은 ObjA타입을 확장한다.  
ObjA타입의 프로퍼티를 ObjB타입이 가지고 있고, 추가적인 프로퍼티를 가지고 있기 때문에 ObjA타입이 수퍼타입이다.  
그렇기 때문에 조건이 참이 되어 타입 B는 number타입이 된다.  

조건부 타입은 이렇게 extends 라는 확장 키워드와 물음표 그리고 세미콜론 연산자를 이용해서 특정 타입이 또 다른 타입을 확장하는지 즉, 앞의 타입이 뒤의 타입의 서브 타입인지 확인해서 참이라면 물음표 뒤의 타입을 거짓이라면 콜론 뒤의 타입을 할당해주는 문법이다.  
조건부 타입은 기본 타입들로만 사용하면 활용할 곳이 많지 않고, 제네릭과 함께 쓸 때 그 위력이 잘 발휘되는 편이다.  

### 예제2) 제네릭과 조건부 타입  
변수 T가 number타입 이라면 string타입이 되도록, 반대로 변수 t가 string타입이라면 number타입이 되도록 만들어 본다.  
이 경우 제네릭을 활용하면 된다.  
타입 변수 T를 갖는 StringNumberSwitch라는 이름의 제네릭 타입을 만들어 준 뒤, T가 number 타입을 확장하는 타입이라면 string타입으로, 반대라면 number타입으로 조건부 타입을 만들어 주도록 한다.  
- src/chapter.ts
  ```ts
  type StringNumberSwitch<T> = T extends number ? string : number
  ```
이때, 타입 변수 T에 number타입이 들어오게 되는 순간 T extends number는 참이 되고 StringNumberSwitch 타입은 string타입이 된다.  
반면, 타입 변수 T에 string타입이 들어오게 됨녀 해당 조건이 거짓이 되어 StringNumberSwitch타입은 number타입이 된다.  
아래와 같이 실제 변수를 선언하여 확인해보도록 한다.  
- src/chapter.ts
  ```ts
  let varA: StringNumberSwitch<number> // let varA: string
  ```
StringNumberSwitch 타입의 타입 변수T에 number타입이 들어왔기 때문에, 조건부 타입의 조건식이 참이되어 변수 varA는 string타입이 된다.

- src/chapter.ts
  ```ts
  let varB: StringNumberSwitch<string> // let varA: number
  ```
StringNumberSwitch 타입의 타입 변수T에 string타입이 들어왔기 때문에, 조건부 타입의 조건식이 거짓이 되어 변수 varB는 number타입이 된다.  
이렇게 제네릭과 함께 조건부 타입을 쓰면 타입을 가변적으로 쓰면서도 논리의 흐름에 따라 타입을 바꿔줄 수 있게 된다.  

### 예제3) 제네릭 함수와 조건부 타입
string타입 매개변수 text를 받아 함수 내부에서 replaceAll 메소드를 이용해서 모든 공백 문자열을 제거한 뒤 반환하는 함수를 구현한다.  
참고로 replaceAll()은 첫번째 인수에 해당하는 모든 문자들을 찾아 두번째 인수로 바꿔주는 자바스크립트 내장 메소드이다.  
- src/chapter.ts
  ```ts
  function removeSpaces(text: string) {
    return text.replaceAll(" ", "")
  }
  ```
removeSpaces() 함수 구현을 완료한 뒤 해당 함수를 호출해본다.  
result 변수에는 공백들이 다 제거된 hiimwinterlood라는 문자열이 저장될것이다.
- src/chapter.ts
  ```ts
  let result = removeSpaces("hi im winterlood") // hiimwinterlood
  console.log(result)
  ```
당연히 해당 함수는 문자열을 반환하니까 removeSpaces함수의 반환값의 타입은 string이고, 변수의 타입도 string이 될것이다.  
```ts
result.toUpperCase()
```
와 같은 string 메소드를 사용해도 문제가 발생하지 않는다.  
이때 removeSpace함수에 매개변수로 undefined나 null값이 들어올 수 있다고 타입을 (text: string|undefined|null)로 변경한다면 오류가 발생하게 된다.  

- src/chapter.ts
  ```ts
  function removeSpacesA(text: string|undefined|null) {
    return text.replaceAll(" ", "") // 'text' is possibly 'null' or 'undefined'.ts(18049)
  }
  ```
text매개변수에 저장된 값이 undefined이나 null일 경우 string의 내장메소드인 replaceAll을 사용할 수 없기 때문이다.  
이 경우 if조건문과 typeof키워드를 통해 text가 string일 경우에만 문자열로 취급을 하고 그게 아닐경우 undefined를 반환하도록 타입을 좁혀 사용할 수 있다.  

- src/chapter.ts
  ```ts
  function removeSpacesB(text: string|undefined|null) {
    if (typeof text === "string") {
      return text.replaceAll(" ", "");
    }
    return undefined;
  }
  ```
그러나 여기서 한가지 문제가 있는게 이렇게 만들 경우 함수 내부에서는 오류가 사라지지만, 반대로 result 변수의 타입이 string 이거나 혹은 undefined가 되기 때문에 result 변수로부터 string의 내장메소드를 사용할 수 없게 된다.  
- src/chapter.ts
  ```ts
  let resultB = removeSpacesB("hi im winterlood") // hiimwinterlood
  resultB.toUpperCase() // [Error] 'resultB' is possibly 'undefined'.ts(18048)
  ```
인수로 문자열 타입의 값을 전달하면, 코드상으로는 누가봐도 첫번째 string 타입 값을 반환하는 return문이 실행될것이기 때문에 당연히 string타입이 들어올것이라고 예측된다.  
하지만 undefined를 반환하는 return문이 추가됬기 때문에 옵셔널 체이닝을 쓴다던지, 타입단언을 해줘야만 정상적으로 수행할 수 있게 되어버렸다.  

- src/chapter.ts
  ```ts
  resultB?.toUpperCase() // 옵셔널 체이닝

  let resultC = removeSpacesB("hi im winterlood") as string // 타입단언
  resultC.toUpperCase()
  ```
바로 이런 상황에 조건부 타입을 이용하여 해당 문제를 해결할 수 있다.  
조건부 타입을 제네릭과 함께 쓸 예정이므로 제네릭 함수로 먼저 만든 뒤, 매개변수의 타입도 T로 정의해주도록 한다.  
반환값의 타입으로는 T가 string타입이라면 string타입의 값을 반환하고, 아니라면 undefined를 반환하도록 조건부 타입 `T extends string ? string : undefined`를 적용한다.

- src/chapter.ts
  ```ts
  function removeSpacesC<T>(text: T): T extends string ? string : undefined {
    if (typeof text === "string") {
      return text.replaceAll(" ", "");
    }
    return undefined;
  }
  let resultD = removeSpacesC("hi im winterlood")
  resultD.toUpperCase()
  ```
이제 removeSpaceC를 호출하여 string타입의 문자열을 전달할 경우, T가 string이 되기 때문에, 반환타입도 string이 되어 result변수의 타입도 string타입으로 추론되면서 string 메소드를 적용해도 오류가 발생하지 않게 된다.  

추가로 매개변수에 string이 아닌 타입의 값을 전달할 경우 반환되는 변수의 타입은 모두 undefined로 추론되게 된다.  

- src/chapter.ts
  ```ts
  let resultE = removeSpacesC(undefined)
  let resultF = removeSpacesC(null)
  let resultG = removeSpacesC(123)
  ```
이렇게 조건부 타입을 함수의 반환값 타입으로 정의하면 조건에 따라 반환값 타입을 원하는 대로 바꿀 수 있기 때문에 편리하다.  
그런데 함수 내부에 오류가 발생한다.  
오류의 원인이 무엇인지 커서를 올려보면 Type 'string' is not assignable to type 'T extends string ? string : undefined'.ts(2322)
string타입은 지금 'T extends string ? string : undefined' 라는 조건부 타입으로 할당할 수 없다 라는 오류이다.
함수 내부에서는 조건부타입의 결과가 어떻게 될지 알 수 없다.  
제네릭을 다룰 때 타입 변수 T는 함수 내부에서는 unknown타입이 된다.  
함수 내부에서는 T에 대한 타입을 모르기 때문에 조건부 타입의 결과를 알 수 없다.  
return문에 as 키워드를 사용하여 any타입으로 단언하여 해결해야 한다.
- src/chapter.ts
  ```ts
  function removeSpacesD<T>(text: T): T extends string ? string : undefined {
    if (typeof text === "string") {
      return text.replaceAll(" ", "") as any;
    }
    return undefined as any;
  }
  let resultH = removeSpacesD("hi im winterlood")
  ```
결과적으로 T extends string ? string : undefined 조건부 타입은 any타입으로 적용된다.
any 타입은 모든 타입과 다 호환되기 때문에 오류가 사라지게 된다.  

무조건 string타입을 반환하기로 약속되어 있는데 타입 단언을 통해 반환값의 타입을 any로 바꿔 반환해버리면 `return 0 as any;`와 같이 숫자를 반환하더라도, any타입으로 적용되기 때문에 조건부 타입이 검사되지 않는다.  

함수 오버로딩을 적용할 경우 해당 문제를 해결할 수 있다.

### 예제4) 제네릭 함수 오버로딩과 조건부 타입
먼저 오버로드 시그니처를 만든 뒤, 구현 시그니처에서 타입 변수들을 모두 지워주고, 매개변수의 타입을 any타입으로 적용한다.
구현 시그니처는 오버로드 시그니처의 타입을 따라가기 때문에 타입 정의를 할 필요가 없다.  
- src/chapter.ts
  ```ts
  function removeSpacesE<T>(text: T): T extends string ? string : undefined;
  function removeSpacesE(text: any) {
    if (typeof text === "string") {
      return text.replaceAll(" ", "");
    }
    return undefined;
  }
  let resultI = removeSpacesE("hi im winterlood")
  resultI.toUpperCase()
  ```
위와같이 구현 시그니처 내부에서 조건부 타입의 결과를 추론할 수 있게 된다.  
조건문 안에서는 타입스크립트가 string을 반환해야 된다는 걸 알게 된다.  
따라서 아래와 같이 0 혹은 null을 반환하여 string타입의 값을 반환하지 않으면 오버로드 시그니처가 문제를 감지해준다.  
- src/chapter.ts
  ```ts
  function removeSpacesF<T>(text: T): T extends string ? string : undefined;
  function removeSpacesF(text: any) {
    if (typeof text === "string") {
      return 0
    }
    return undefined;
  }
  function removeSpacesG<T>(text: T): T extends string ? string : undefined;
  function removeSpacesG(text: any) {
    if (typeof text === "string") {
      return null
    }
    return undefined;
  }
  ```
또한 undefined가 아닌 값을 반환하더라도 문제를 감지하여 보다 완벽하게 타입 정의를 해줄 수 있다.  
- src/chapter.ts
  ```ts
  function removeSpacesH<T>(text: T): T extends string ? string : undefined;
  function removeSpacesH(text: any) {
    if (typeof text === "string") {
      return text.replaceAll(" ", "");
    }
    return 0;
  }
  ```

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
    ```ta
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
