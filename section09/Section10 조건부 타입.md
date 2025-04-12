# [메인 마크다운.md](../README.md)
<br>

## 조건부 타입
<details>
<summary>펼치기/접기</summary>
<br>

자바스크립트의 물음표를 이용한 3항연산자를 이용하여 조건에 따라 타입을 결정하는 독특한 문법이다.

예를들어 number 타입이 string타입을 확장했는가에 대해 참이라면 string을, 거짓이라면 number을 타입으로 적용하는 예제를 작성해보면 아래와 같다.

- src/chapter0.ts
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
- src/chapter0.ts
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
- src/chapter0.ts
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
- src/chapter0.ts
  ```ts
  type StringNumberSwitch<T> = T extends number ? string : number
  ```
이때, 타입 변수 T에 number타입이 들어오게 되는 순간 T extends number는 참이 되고 StringNumberSwitch 타입은 string타입이 된다.  
반면, 타입 변수 T에 string타입이 들어오게 됨녀 해당 조건이 거짓이 되어 StringNumberSwitch타입은 number타입이 된다.  
아래와 같이 실제 변수를 선언하여 확인해보도록 한다.  
- src/chapter0.ts
  ```ts
  let varA: StringNumberSwitch<number> // let varA: string
  ```
StringNumberSwitch 타입의 타입 변수T에 number타입이 들어왔기 때문에, 조건부 타입의 조건식이 참이되어 변수 varA는 string타입이 된다.

- src/chapter0.ts
  ```ts
  let varB: StringNumberSwitch<string> // let varA: number
  ```
StringNumberSwitch 타입의 타입 변수T에 string타입이 들어왔기 때문에, 조건부 타입의 조건식이 거짓이 되어 변수 varB는 number타입이 된다.  
이렇게 제네릭과 함께 조건부 타입을 쓰면 타입을 가변적으로 쓰면서도 논리의 흐름에 따라 타입을 바꿔줄 수 있게 된다.  

### 예제3) 제네릭 함수와 조건부 타입
string타입 매개변수 text를 받아 함수 내부에서 replaceAll 메소드를 이용해서 모든 공백 문자열을 제거한 뒤 반환하는 함수를 구현한다.  
참고로 replaceAll()은 첫번째 인수에 해당하는 모든 문자들을 찾아 두번째 인수로 바꿔주는 자바스크립트 내장 메소드이다.  
- src/chapter0.ts
  ```ts
  function removeSpaces(text: string) {
    return text.replaceAll(" ", "")
  }
  ```
removeSpaces() 함수 구현을 완료한 뒤 해당 함수를 호출해본다.  
result 변수에는 공백들이 다 제거된 hiimwinterlood라는 문자열이 저장될것이다.
- src/chapter0.ts
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

- src/chapter0.ts
  ```ts
  function removeSpacesA(text: string|undefined|null) {
    return text.replaceAll(" ", "") // 'text' is possibly 'null' or 'undefined'.ts(18049)
  }
  ```
text매개변수에 저장된 값이 undefined이나 null일 경우 string의 내장메소드인 replaceAll을 사용할 수 없기 때문이다.  
이 경우 if조건문과 typeof키워드를 통해 text가 string일 경우에만 문자열로 취급을 하고 그게 아닐경우 undefined를 반환하도록 타입을 좁혀 사용할 수 있다.  

- src/chapter0.ts
  ```ts
  function removeSpacesB(text: string|undefined|null) {
    if (typeof text === "string") {
      return text.replaceAll(" ", "");
    }
    return undefined;
  }
  ```
그러나 여기서 한가지 문제가 있는게 이렇게 만들 경우 함수 내부에서는 오류가 사라지지만, 반대로 result 변수의 타입이 string 이거나 혹은 undefined가 되기 때문에 result 변수로부터 string의 내장메소드를 사용할 수 없게 된다.  
- src/chapter0.ts
  ```ts
  let resultB = removeSpacesB("hi im winterlood") // hiimwinterlood
  resultB.toUpperCase() // [Error] 'resultB' is possibly 'undefined'.ts(18048)
  ```
인수로 문자열 타입의 값을 전달하면, 코드상으로는 누가봐도 첫번째 string 타입 값을 반환하는 return문이 실행될것이기 때문에 당연히 string타입이 들어올것이라고 예측된다.  
하지만 undefined를 반환하는 return문이 추가됬기 때문에 옵셔널 체이닝을 쓴다던지, 타입단언을 해줘야만 정상적으로 수행할 수 있게 되어버렸다.  

- src/chapter0.ts
  ```ts
  resultB?.toUpperCase() // 옵셔널 체이닝

  let resultC = removeSpacesB("hi im winterlood") as string // 타입단언
  resultC.toUpperCase()
  ```
바로 이런 상황에 조건부 타입을 이용하여 해당 문제를 해결할 수 있다.  
조건부 타입을 제네릭과 함께 쓸 예정이므로 제네릭 함수로 먼저 만든 뒤, 매개변수의 타입도 T로 정의해주도록 한다.  
반환값의 타입으로는 T가 string타입이라면 string타입의 값을 반환하고, 아니라면 undefined를 반환하도록 조건부 타입 `T extends string ? string : undefined`를 적용한다.

- src/chapter0.ts
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

- src/chapter0.ts
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
- src/chapter0.ts
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
- src/chapter0.ts
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
- src/chapter0.ts
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
- src/chapter0.ts
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


## 분산적 조건부 타입
<details>
<summary>펼치기/접기</summary>
<br>

분산적 조건부 타입 이라는것은 조건부 타입을 유니온과 함께 사용할 때 조건부 타입이 분산적으로 동작하게 업그레이드 되는 문법을 말한다.  

### 예제1) 분산적 조건부 타입 - 기본
아래와 같이 변수 c를 한번 더 선언해 주고, 이번에는 제네릭 타입 변수에 number|string과 같이 유니온 타입을 전달할 경우, 이때부터는 우리가 알던 조건부 타입처럼 동작하지 않게 된다.  
- src/chapter1.ts
  ```ts
  let c:StringNumberSwitch<number|string> // let c: string | number
  ```
T가 number|string 유니온 타입이 되면 number|string 유니온 타입은 number와 super의 합집합이 되기 때문에 number타입의 수퍼 타입이 된다.  
따라서 T extends number는 거짓이 된다.  
거짓이기 때문에 변수 c의 타입은 number로 추론되어야 하지만 string|number 타입으로 추론되고 있다.  

이렇게 되는 이유는 조건부 타입에 타입 변수로 유니온 타입을 할당해버리면 그때부터는 일반적인 조건부 타입이 아니라 분산적인 조건부 타입으로 업그레이드 되기 때문이다.  
조건부 타입의 동작 방식이 바뀐다.  
타입 변수에 <number | string>과 같이 유니온 타입을 할당하게 되면 유니온 타입이 그대로 타입 변수에 들어오는게 아니라 한번은 number 한번은 string으로 두 개가 분리되어 들어간다.  
즉, <number | string> 형태의 유니온 타입을 타입 변수에 전달한다는 것은, 한번은 <number> 한번은 <string> 과 같이 두번 전달되는것이다.  
그리고 최종적으로 그 두 개의 타입이 유니온으로 묶이게 되는 것이다.  

이때 StringNumberSwitch타입의 타입변수에<number>를 할당하게 되면 number extends number는 참이기 때문에 결과는 string 타입이 될것이다.
두번째로 StringNumberSwitch 타입의 타입변수에 <string>을 할당하게 되면 string extends number는 거짓이기 때문에 결과는 number타입이 될 것이다.  
이렇게 분리된 두 결과를 유니온으로 묶을 경우 결과는 string|union타입이 되는것이다.  
- src/chapter1.ts
  ```ts
  let d: StringNumberSwitch<boolean | number | string> // let d: string | number
  ```
위와같이 StringNumberSwitch 타입의 타입변수에 boolean|number|string 유니온 타입을 전달해 보도록 한다.  
boolean number string 유니온 타입 요소들 각각이 모두 분리되어 조건식에 적용된다.  
StringNumberSwitch<boolean>, StringNumberSwitch<number>, StringNumberSwitch<string>과 같이 3번 적용된다.  
이렇게 분리된 결과들은 다시 유니온으로 묶이게 된다.  
StringNumberSwitch의 타입변수에 boolean을 전달하게 되면 T가 boolean이 되고 boolean extends number는 거짓이기 때문에 number 타입이 된다.  
StringNumberSwitch의 타입변수에 number을 전달하게 되면 T가 number이 되고 number extends number는 참이기 때문에 string 타입이 된다.  
StringNumberSwitch의 타입변수에 string을 전달하게 되면 T가 string이 되고 string extends number는 거짓이기 때문에 number 타입이 된다.  
최종 결과는 number, string, number인데, number가 두번 있을 필요는 없으니까 하나는 사라져서 string | number 유니온 타입으로 결과가 추론된다.   

### 예제2) 분산적 조건부 타입 - 실용
첫번째로는 분산적 조건부 타입의 기능을 이용해서 유니온에서 특정 타입만 제거하는 타입을 만들어 본다.  
제네릭 타입 변수로 T, U 두개를 받도록 하고, T가 U를 확장한다면 never타입을, 확장하지 않는다면 T 타입을 반환하도록 조건부 타입 식을 작성한다.  
- src/chapter1.ts
  ```ts
  type Exclude<T, U> = T extends U ? never : T;
  ```
위 조건부 타입 식을 해석해보면 타입 변수 T가 타입 변수 U의 서브타입 이라면 never 결과가 되고, 아니라면 T 자체가 결가가 된다.  
예를들어 변수 e에 Exclude 타입을 적용하고 제네릭 타입 변수 T는 number를, U에는 string을 적용해본다.  
- src/chapter1.ts
  ```ts
  let e: Exclude<number, string> // let e: number
  ```
number extends string ? never : number;는 거짓이 되기 때문에 변수 e는 number 타입이 된다.  

두번쨰로 타입변수 T와 U 모두 number타입으로 적용해보자.  
- src/chapter1.ts
  ```ts
  let f: Exclude<number, number> // let f: never
  ```
이 경우 number extends number ? never : number;는 참이 되기 때문에 변수 f는 never 타입이 된다.  

#### 실제 응용1
조건부 타입을 이용해서 유니온 타입으로부터 특정 타입만 제거하는 타입을 만들어 본다.  
- src/chapter1.ts
  ```ts
  type A = Exclude<number | string | boolean, string>; // type A = number | boolean
  ```
먼저 T에 유니온 타입을 타입 변수에 할당했기 때문에 분산적 조건부 타입이 되었다.  
Exclude<number, string>  
Exclude<string, string>  
Exclude<boolean, string>  
위와 같이 유니온 타입의 각 타입으로 3번 분리가 되었다.  
이렇게 분리 된 타입의 결과들은 최종적으로 유니온 타입으로 묶여야 될 것이다.  
이제 분리된 각 유니온 타입들로 부터 조건부 타입 연산의 결과를 도출해 본다.  
Exclude<number, string>의 경우 `number extends string ? never : number`가 거짓이므로 number 타입이 된다.  
Exclude<string, string>의 경우 `string extends string ? never : string`가 참이므로 never 타입이 된다.  
Exclude<boolean, string>의 경우 `boolean extends string ? never : boolean`가 거짓이므로 boolean 타입이 된다.  
최종 결과는 number, never, number 타입이며 이를 유니온 타입으로 묶게 되면 number | never | boolean 유니온 타입이 된다.   

이때 union 타입에 never 타입이 포함되어 있으면 never는 결국 사라진다.  
집합으로 생각해보면 유니온 타입이라는 것은 타입들 간의 합집합 타입을 만드는 것이다.  
never타입이란 공집합 타입이기 때문에 공집합과 다른 어떤 집합을 합집합 한다는 건 원래 원본 집합인 것이다.  
예를 들어 숫자값들을 포함하는 number라는 집합과, 아무런 요소들도 포함하지 않는 never라는 공집합을 합집합하면 결국 number라는 집합이 된다.  
그렇기 때문에 결과에 never타입이 포함되어 있으면 never타입은 사라지게 되며, 최종 결과는 number | boolean 타입이 된다.  

타입 A에 마우스 커서를 올려보면 `type A = number | boolean` 타입이 되는것을 볼 수 있다.  
Exclude라는 조건부 타입을 만들면, T와 U가 같을 때 never를 반환하게 해서 아에 type을 없애버리고, T와 U가 다를 때 T를 그대로 반환해서 해당 타입을 그대로 적용한다.  
이렇게 분산적인 조건부 타입을 이용해서 특정 유니온 타입으로부터 특정 타입만 제거하는 유니온 타입을 얻어내는 것도 가능하다.  

#### 실제 응용 2
Exclude의 반대 격이 되는 Extract 타입을 만들어 본다.  
제네릭 타입 변수 T와 U를 구성한 뒤, U에 해당하는 타입만 제거하도록 구현해본다.  
예를들어 number | string | boolean 유니온 타입 중 string인 타입만 뽑아내도록 한다.
- src/chapter1.ts
  ```ts
  type Extract<T, U> = T extends U ? T : never;
  type B = Extract<number | string | boolean, string>;
  ```
위와같이 분산적 조건부 타입 식을 적용할 경우 타입 B는 U의 타입인 string 타입으로 추론된다.  
과정을 정리해보면 다음과 같다.  
Extract<number, string>  
Extract<string, string>  
Extract<boolean, string>  
위와 같이 유니온 타입의 각 타입으로 3번 분리가 되었다.  
이렇게 분리 된 타입의 결과들은 최종적으로 유니온 타입으로 묶여야 될 것이다.  
이제 분리된 각 유니온 타입들로 부터 조건부 타입 연산의 결과를 도출해 본다.  
Extract<number, string>의 경우 `number extends string ? string : never`가 거짓이므로 never 타입이 된다.  
Extract<string, string>의 경우 `string extends string ? string : never`가 참이므로 string 타입이 된다.  
Extract<boolean, string>의 경우 `boolean extends string ? string : never`가 거짓이므로 never 타입이 된다.  
최종 결과는 never, string, never 타입이며 이를 유니온 타입으로 묶게 되면 string 타입이 된다.   

### 조건부 타입의 분산 방지
조건부 타입이 분산적으로 작동되지 않게 하고 싶다면 extends의 양 옆에 대괄호를 씌워주면 된다.
- src/chapter1.ts
  ```ts
  type Example<T, U> = [T] extends [U] ? T : never;
  type C = Example<number | string | boolean, string>;
  ```
위의 결과는 never타입이 된다.  
number | string | boolean의 합집합 유니온 타입은 extends string이 거짓이 되기 때문이다.  
</details>
<br>

## infer
<details>
<summary>펼치기/접기</summary>
<br>

조건부 타입 내에서 타입 추론할 수 있는 기능이다.  

### 예제1)
예를들어 아래와 같이 매개변수는 없고 반환값 타입이 string인 함수 타입 Func를 정의해 본다.  
- src/chapter.ts
  ```ts
  type Func = () => string
  ```
제네릭을 활용한 조건부 타입 문법을 적용해본다.  
타입변수 T extends 매개변수는 없고 반환값 타입이 string인 함수를 확장한다면 string타입을, 확장하지 않는다면 never타입을 반환하도록 조건부 타입 식을 작성한다.  

- src/chapter.ts
  ```ts
  type ReturnType<T> = T extends () => string ? string : never;
  ```
extends 우항에 () => string 이라는 함수타입 표현식이 들어와서 어색할 수 있으나, 단순히 타입 변수 T에 들어오는 타입이 () => string 이라는 함수포현식의 서브타입이라면 string을 아니라면 never타입을 반환하라는 의미이다.  

이때 A라는 타입을 만들고 해당 타입에 return 타입으로 func타입을 넣어주면 어떤 결과가 나올까?  
- src/chapter.ts
  ```ts
  type A = ReturnType<Func> // type A = string
  ```
타입 A에 마우스 커서를 올려보면 string 타입으로 추론된다.  
추론 과정은 다음과 같다.  
먼저 타입변수 T에는 Func타입 즉 () => string이 들어간다.  
extends의 우항으로 비교하는 타입은 () => string 이다.  
`() => string extends () => string` 형태로 좌측 함수표현식 타입이 우측 함수표현식 타입의 서브타입이냐 라고 물어보는것이다.  
만약 참이라면 string타입이 될것이고 거짓이라면 never타입이 된다.  
이때, 두 타입간의 관계를 보면 매개변수는 어차피 둘다 없으니까 비교할 필요 없고, 반환값으로 비교했을 때는 함수 타입의 호환성이 반환값이 더 큰 함수 타입이 슈퍼타입이 된다.  
지금은 두 함수 타입 간에 반환값 타입이 string으로 똑같기 때문에 우항의 함수표현식 타입을 서브타입이라고 봐도 된다.  
똑같은 타입끼리는 각자가 서로가 서브다. 서로가 수퍼다 라고 해도 상관이 없다.  
따라서 해당 조건은 참이 되어 결과가 string타입으로 추론된다.  

### 예제2)
number 타입을 반환하는 함수 표현식을 타입으로 갖는 FuncB 타입을 선언한다.  
타입 B를 선언한뒤 ReturnType의 제네릭 타입변수에 방금 선언한 FuncB를 지정하고 해당 타입을 할당한다.  
- src/chapter.ts
  ```ts
  type FuncB = () => number;
  type B = ReturnType<FuncB> // type B = never
  ```
타입 B에 마우스 커서를 올려보면 never타입으로 추론된다.  
추론 과정은 다음과 같다.  
타입 변수 T에는 FuncB라는 타입이 들어간다.  
T는 `() => number` 타입이다.  
T와 비교하는 타입은 `() => string`이다.  
두 타입간의 관계 `() => nubmer extends () => string`의 결과는 교집합이 없는 서로소 집합이다.  
둘 중 누구도 서로의 서브타입이거나 수퍼타입 관계가 아니다.  
따라서 해당 조건식은 거짓이 되어 never타입으로 추론된다.  

그러나 원하던 값은 결과 타입이 함수의 반환타입으로 추론되는 것이다.  
ReturnType의 네릭 타입 변수에 지정할 타입이 Func타입일 때는 Func타입의 반환값 타입인 string타입을, FuncB 타입일때는 FuncB 타입의 반환값 타입인 number를 결과값으로 추론되는것을 원했다.  

우리가 조건부 타입을 쓸 때, extends의 우항 즉, 비교하는 타입의 반환값 타입을 string으로 고정해뒀기 때문에 어쩔 수 없이 함수의 반환값 타입이 string 타입이냐 라는 것 밖에 검사를 못하고 있다.  
이럴 때 사용할 수 있는 문법이 `infer`이다.  

### infer 적용
함수의 반환값 타입인 string을 infer R 형태로 적용한 다음, 참일 경우 추론될 타입에도 R을 적용한다.  
- src/chapter.ts
  ```ts
  type ReturnTypeB<T> = T extends () => infer R ? R : never;
  type FuncAA = () => string;
  type AA = ReturnTypeB<FuncAA> // type AA = string
  type FuncBB = () => number;
  type BB = ReturnTypeB<FuncBB> // type BB = number
  ```
반환값 타입이 string인 함수 표현식을 타입으로 갖는 FuncAA타입을 해당 타입의 제네릭 타입 변수에 할당할 경우 추론되는 타입은 string가 된다.  
반환값 타입이 number인 함수 표현식을 타입으로 갖는 FuncBB타입을 해당 타입의 제네릭 타입 변수에 할당할 경우 추론되는 타입은 number가 된다.  
두 타입 모두 원하는 타입으로 추론하는데 성공했다.  

추론 과정은 다음과 같다.  
우선 extends 기준 우항의 함수 표현식의 반환타입인 infer R은 단순히 R이라고 보면 된다.
FuncAA를 기준으로 `() => string extends () => R` 즉 () => string이라는 함수 표현식 타입이 () => R 이라는 함수 표현식 타입의 서브타입인가에 대해 비교한다.  
이때 infer와 함께 쓴 R 타입은 `() => string extends () => R` 조건식을 참으로 만드는 타입을 추론하도록 동작한다.  
즉, 왼쪽에 있는 함수 타입이 오른쪽에 있는 함수 타입의 서브타입이 되려면 R 타입은 string 타입이 되어야 하기 때문에 R이 string타입으로 추론된다.  
추론을 했을 때 참으로 만들 수 있기 때문에 `T extends () => infer R` 조건식이 참이 되어 R 타입으로 추론된다.  
이때 R은 extends 기준 좌항의 `() => string` 함수 표현식 타입이 서브타입이 되도록 하기 위해서는 string 타입이어야 하기 때문에 R의 타입은 string으로 추론된다.  
FuncBB도 동일하게 적용되어 R은 number가 되기 때문에 결과적으로 타입 BB은 number타입으로 추론된다.  

만약 이때 함수 표현식 형태의 타입이 아닌 단순한 number 타입을 제네릭 타입 변수로 지정할 경우 never 타입이 된다.  
- src/chapter.ts
  ```ts
  type C = ReturnType<number> // type C = never
  ```
ReturnType의 제네릭 타입 변수 T에는 number가 들어가게 된다.  
`number extends () => infer R ? R : never`  
즉, number 타입이 () => R 타입의 서브타입이 될 수 있는 R 타입을 infer에 의해 추론해야 하는데, 이때는 R 타입이 뭐가 되어도 불가능하다.  
() => any와 같이 infer R이 심지어 치트키 타입인 any 타입으로 추론된다고 하더라도 number 타입의 수퍼 타입이 될 재간이 없다.  
그렇기 때문에 위 경우에는 타입 R이 추론이 불가능한 상태이기 때문에 조건식이 거짓이라고 평가되어 never 타입으로 추론되는 것이다.  
그래서 타입 C는 never 타입이 된다.  
위와같이 infer 다음에 오는 타입을 추론할 수 없는 경우에는 조건식이 거짓이 된다.  

infer는 추론하다는 의미의 inference의 약자이다.  
infer R 이라고 하면 R을 추론해라 라는 의미로 사용된다고 이해하면 된다.  

### 예제3)
제네릭 타입 변수 T를 갖는 PromiseUnpack이라는 타입을 선언한 후 any타입을 임시로 할당한다.  
다음으로 해당 타입의 제너릭 타입 변수에 제네릭 타입변수 number를 갖는 Promise 타입을 지정한 뒤 PromiseA라는 타입 변수에 할당한다.  
해당 코드는 PromiseA는 number 타입이 되기를 기대하는 코드이다.
PromiseUnpack 타입의 역할은 타입변수 T에 제공한 Promise 타입에서 Promise의 결과값 타입 즉 number타입만 추출하여 할당하는 기능을 구현한다.  
- src/chapter.ts
  ```ts
  type PromiseUnpack<T> = any;
  type PromiseA = PromiseUnpack<Promise<number>>;
  ```

예를들어 아래와 같이 Promise<string> 타입을 PromiseUnpack 타입의 제네릭 타입 변수에 지정한다면, PromiseB타입은 string타입이 되기를 기대하는 코드가 된다.  
- src/chapter.ts
  ```ts
  type PromiseB = PromiseUnpack<Promise<string>>;
  ```
이러한 요구사항을 만족하기 위해서는 PromiseUnpack타입을 어떻게 정의해야 할까?  
첫번째 조건으로는 PromiseUnpack타입의 제네릭 타입 변수 T는 Promise 타입이어야 한다.  
두번째 조건은 Promise의 결과값 타입을 반환해야한다.  
즉, PromiseUnpack 타입의 제네릭 타입변수 T에 Promise타입이 들어온다면 Promise 타입의 결과값 타입을 반환하는 타입으로 만들어야 한다.  

첫번째 조건을 만족하도록 구현해본다.  
PromiseUnpackA 타입을 선언한 뒤, T extends Promise<any> ? any : never와 같이 조건부 타입을 활용하되, 우선 Promise객체의 제네릭 타입 변수에는 임시로 any를 지정해준 뒤,  
T가 Promise<any>의 서브타입이라면 any타입을 서브타입이 아니라면 never타입으로 추론되도록 조건부 타입을 작성한다.  
- src/chapter.ts
  ```ts
  type PromiseUnpackA<T> = T extends Promise<any> ? any : never;
  type PromiseAA = PromiseUnpackA<Promise<number>>; // type PromiseAA = any
  type PromiseBB = PromiseUnpackA<Promise<string>>; // type PromiseAA = any
  ```
실제로 타입변수를 선언하여 추론하도록 적용해본 뒤 마우스 커서를 올려보면 아직까지는 any타입을 반환한다.  

두번째 조건을 만족하도록 하기 위해서 Promise의 제네릭 타입 변수 any 대신 infer R을 지정하고 조건식이 참일 경우 R을 반환하도록 조건부 타입을 수정한다.
- src/chapter.ts
  ```ts
  type PromiseUnpackB<T> = T extends Promise<infer R> ? R : never;
  type PromiseAAA = PromiseUnpackB<Promise<number>>; // type PromiseAAA = number
  type PromiseBBB = PromiseUnpackB<Promise<string>>; // type PromiseBBB = string
  ```
실제로 타입변수를 선언하여 추론하도록 적용해본 뒤 마우스 커서를 올려보면 number타입과 string타입을 각각 반환해 주는것을 확인할 수 있다.
PromiseUnpackB 타입의 제네릭 타입 변수 T는 Promise<number> 이고, Promise<number> extends Promise<infer R> 라는 조건부 타입을 해석해보면  
infer 키워드에 의해 Promise<number>타입이 서브타입이 되는 R 타입을 추론하라는 의미가 된다.  
Promise<number> 타입이 서브타입이 되기 위해서는 Promise<infer R> 에서 R 타입은 number가 되면 된다.  
따라서 결과 타입은 R이 되고, R은 number이기 때문에 결과 타입도 number로 추론된다.  
Promise<string> 타입도 위의 논리 과정과 동일하게 적용되어 string타입으로 추론된다.  

</details>
<br>
