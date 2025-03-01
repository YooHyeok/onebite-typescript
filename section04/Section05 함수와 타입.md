# [메인 마크다운.md](README.md)
<br>


# 함수와 타입

## 함수타입
<details>
<summary>펼치기/접기</summary>
<br>

### 함수 타입 정의

먼저 두개의 매개변수의 합을 반환하는 func 함수를 선언해 본다.  
- src/Chapter0.ts
  ```ts
  function funcA(a, b) {
    return a + b;
  }
  ```
타입오류는 신경쓰지 않고 자바스크립트라고 생각하고 타인에게 설명해야 한다면 어떻게 설명하는것이 가장 좋은 방법일까?  

함수라는것은 기본적으로 매개변수를 받아 함수 블록 내부에 특정 연산과정을 거쳐 결과값을 반환하는 자바스크립트의 문법이다.  

그렇기 때문에 함수를 설명하는 가장 좋은 방법은 이 함수가 어떤 타입의 매개변수를 받고 어떤 연산을 거쳐 어떤 결과값을 반환하는지를 이야기하는 것이다.  

이 방법은 자바스크립트 버전의 설명이고 타입스크립트의 함수를 설명해야한다면 다음과 같다.  

- src/Chapter0.ts
  ```ts
  function funcB(a: number, b: number): number {
    return a + b;
  }
  ```
어떤 타입의 매개변수를 받고 어떤 타입의 결과 값을 반환하는지를 이야기 하는 것이다.  
연장선상에서 타입스크립트에서 함수의 타입을 정의할 때에도 좋은 설명 방식을 빌려 매개변수의 타입을 정의하고 반환값의 타입을 정의하는 식으로 함수의 타입을 정의하게 된다.   
<br>
반환값의 타입이 없다고 해도 반환값의 타입은 기본적으로 return문을 기준으로 자동으로 추론된다.
아래 함수의 경우 a는 number 타입이고, b도 number 타입이기 때문에 number + number는 number타입으로 추론을 해주게 된다.
- src/Chapter0.ts
  ```ts
  function funcC(a: number, b: number) {
    return a + b;
  }
  ```
<br>

### 화살표 함수 타입 정의
먼저 두개의 매개변수를 받아 더한값을 반환하는 화살표 함수를 선언한다.
- src/Chapter0.ts
  ```ts
  const funcD = (a, b) => a + b;
  ```
<br>

화살표 함수의 타입을 정의할떄에는 함수 선언식의 방식과 동일하다.  
매개변수 뒤에 타입 어노테이션을 선언하고, 반환타입 역시 함수 선언식과 동일하게 매개변수를 작성하는 소괄호 뒤에 타입 어노테이션을 선언한다.

- src/Chapter0.ts
  ```ts
  const funcE = (a: number, b: number): number => a + b;
  ```
<br>

화살표 함수의 반환 타입도 함수 선언식과 마찬가지로 함수의 반환값을 기준으로 자동으로 추론하기 때문에 생략하더라도 number타입으로 추론된다.
- src/Chapter0.ts
  ```ts
  const funcF = (a: number, b: number) => a + b;
  ```
<br>


### 함수의 매개변수

#### 자기소개 함수 예제
매개변수 name을 받아 console.log로 출력하는 기능을 구현한다.  
매개변수 name에 기본값을 문자열로 설정한다.  
매개변수의 기본값을 설정할 경우 매개변수의 타입을 직접 정의하지 않아도 오류가 발생하지 않으며 타입스크립트 컴파일러가 기본값을 기준으로 추론한다.  


- src/Chapter0.ts
  ```js
  function introduceA(name = "유혁스쿨") {
    console.log(`name : ${name}`);
  }
  ```

두가지 주의할 점이 있다.  
1. 기본값과 다른 타입으로 예를들어 number 등을 매개변수의 타입으로 정의할 경우 현재 기본값은 string인데 변수의 타입은 number로 정의되어 있어 뭐가 맞는것인지 오류를 발생하게 된다.  
2. 함수 호출시 자동 추론된 매개변수 타입(string)과 다른 타입을 인수로 전달하면 오류가 발생한다.

- src/Chapter0.ts
  ```js
  function introduceB(name: number = "유혁스쿨") { // [Error] Type 'string' is not assignable to type 'number'.ts(2322)

    console.log(`name : ${name}`);
  }

  introduceA(1);
  ```

#### 자기 소개 정보 확장
아래와 같이 키 정보에 대한 tall 매개변수를 추가하고, number타입으로 정의한다.  
함수 블록 내부에서는 name처럼 tall도 출력해준다.  
2개의 인수를 전달하며 해당 함수를 호출한다.  

- src/Chapter0.ts
  ```js
  function introduceC(name = "유혁스쿨", tall: number) {
    console.log(`name : ${name}`);
    console.log(`tall : ${tall}`);
  }
  introduceC("유혁스쿨", 200)
  ```

다음으로 tall 매개변수를 생략하고 호출한다.
이렇게 함수를 호출하면 tall이라는 매개변수가 필요한데, 실제로 전달하지 않았기 때문에 오류가 발생한다.  

- src/Chapter0.ts
  ```js
  introduceC("유혁스쿨") // [Error] An argument for 'tall' was not provided.
  ```

tall이라는 매개변수를 생략하고 싶다면 매개변수 타입 선언 전 변수의 바로옆에 물음표?를 넣어 마치 이전에 객체타입에 대해 살펴볼 때 선택적으로 프로퍼티를 만들었던 것과 같이 선택적 매개변수로 만들어 주면 된다.    
이렇게 선택적 매개변수가 된 tall이라는 매개변수에 마우스 커서를 올려보면 `(parameter) tall: number | undefined`와 같이 tall 변수에 들어오는 값이 number 타입의 값이 들어올 수도 있거나 혹은 값이 아에 안들어올 수도 있기 때문에 number와 undefined의 유니온 타입으로 추론되는것을 확인할 수 있다.  

- src/Chapter0.ts
  ```js
  function introduceD(name = "유혁스쿨", tall?: number) {
    console.log(`name : ${name}`);
    console.log(`tall : ${tall}`);
  }

  introduceD("유혁스쿨")
  ```

### 선택적 매개변수 - 유니온 타입, 타입좁히기
number와 undefined 유니온 타입이기 때문에 들어온 매개변수를 함수 블록내에서 10을 더하려고 하면 오류가 발생하게 된다.
덧셈 연산은 숫자와 숫자간에만 할수 있는 연산인데, 현재 tall이라는 값은 undefined일 수도 있는 값이기 때문에 불완전한 연산을 하지 못하도록 타입스크립트가 막아준다.

- src/Chapter0.ts
  ```js
  function introduceF(name = "유혁스쿨", tall?: number) {
    console.log(`name : ${name}`);
    if (typeof tall === "number") {
      console.log(`tall : ${tall + 10}`);
    }
  }
  ```
### 선택적 매개변수 - 필수 위치
실제 선택적 매개변수인 tall 뒤에 필수 매개변수를 하나 추가할 경우 정의 자체에서 오류가 발생한다.
선택적 매개변수보다 필수 매개변수가 뒤에 있기 때문에 발생하는 오류이다.

- src/Chapter0.ts
  ```js
  function introduceG(name = "유혁스쿨", tall?: number, age: number) {
    console.log(`name : ${name}`);
    if (typeof tall === "number") {
      console.log(`tall : ${tall + 10}`);
    }
  }

  introduceG("",13);
  ```
따라서 선택적 매개변수를 필수 매개변수와 함께 사용할 경우, 필수 매개변수를 선택적 매개변수 앞에 배치하면 해결이 된다.  


- src/Chapter0.ts
  ```js
  function introduceH(name = "유혁스쿨", age: number, tall?: number) {
    console.log(`name : ${name}`);
    if (typeof tall === "number") {
      console.log(`tall : ${tall + 10}`);
    }
  }

  introduceH("", 13); //name, age만 전달
  ```

#### 강의상 예외 내용
강의에서는 name변수가 필수 매개변수 이기 때문에 함수 호출시 name에 해당하는 값을 생략할 경우 오류가 발생한다고 설명하였으나, name에 기본값을 선언하게되면 `function introduceF(name?: string, tall?: number): void` 와 같이 타 입스크립트가 name도 선택적 매개변수로 해석한다.  
하지만 실제로 코드에서는 기본값이 설정되어 있으므로 같은 의미가 아니다.  
즉, 함수를 호출할때 `introduceF()` 로 호출하게 될 경우 선택적 매개변수로 작동하지만, 코드상에서는 매개변수를 받고있기 때문에 `introduceF(13);`와 같이 number타입 매개변수를 하나만 넣은 상태로 호출할경우 number타입 매개변수가 string타입 매개변수인 name에 전달되어 오류가 발생하게 된다.  

### Rest Parameter
매개변수 갯수 재한 없이 다양한 값들을 받고, 모두 합한 sum을 반환하는 함수를 만들어 본다.  
`getSum(...rest)` 와 같이 매개변수앞에 ...을 붙혀준다.  
해당 문법은 자바스크립트 문법으로 rest 파라미터 라고 부른다.  
가변적인 길이의 인수들을 전달하면 배열로 묶어 변수에 저장할 수 있도록 도와주는 문법이다.  
자바의 가변인자와 동일하다.  
rest parameter 매개변수의 타입은 어떻게 정의해줘야 할까?
예제에서 전달하려는 인수들은 모두 number타입의 값일 테니까 number 타입의 배열로 정의를 해주면 된다.

- src/Chapter0.ts
  ```js
  function getSumA(...rest: number[]) {
    let sum = 0
    for (let value of rest) {
      sum += value;
    }
    return sum;
  }
  getSumA(1, 2, 3) // 6
  getSumA(1, 2, 3, 4, 5) //15
  ```
  
만약 이때 매개변수의 갯수를 정하여 고정하고 싶다면 배열타입이 아닌 튜플 타입으로 정의하면 된다.

- src/Chapter0.ts
  ```js
  function getSumB(...rest: [number, number, number]) {
    let sum = 0
    for (let value of rest) {
      sum += value;
    }
    return sum;
  }
  getSumB(1, 2, 3) // 6
  getSumB(1, 2, 3, 4, 5) // [Error] Expected 3 arguments, but got 5.ts(2554)
  ```

</details>
<br>

## 함수 타입 표현식과 호출 시그니처
<details>
<summary>펼치기/접기</summary>
<br>

  ### 함수 타입 표현식
  <details>
  <summary>펼치기/접기</summary>
  <br>

  함수를 정의하려면 매개변수 타입들과 반환값의 타입들을 정의해서 함수의 타입을 정의할 수 있다.
  함수 타입 표현식이라는 것을 이용하면 타입 별칭을 이용해서도 함수의 타입을 정의할 수 있다.

  - src/Chapter1.ts
    ```ts
    const addA = (a, b) => a + b
    const addB = (a: number, b: number): number => a + b;
    ```

  #### 함수 타입 표현식 예제
  아래와 같이 타입 별칭을 이용하여 매개변수 타입과 반환값 타입 모두 number로 정의한다.  
  변수의 타입을 정의하듯 화살표 함수의 함수명 옆에 타입 어노테이션을 적용한다.  
  함수의 선언식에 직접 정의해주지 않아도 깔끔하게 함수의 타입 정의가 가능해진다.  
  이렇게 타입 별칭을 이용해 함수의 타입을 별도로 정의하는 문법을 함수타입표현식 이라고 하며, 영어로는 Function Type Expression이라고 부른다.  

  - src/Chapter1.ts
    ```ts
    type Add = (a: number, b: number) => number;
    const addC: Add = (a, b) => a + b; 
    ```
    인터넷에 돌아다니는 여러 문서나 강의들을 보면 해당 문법을 호출 시그니처 또는 함수 시그니처라고 부르기도 하는데, 엄밀히 말하면 TypeScript 공식 문서에서는 이 문법의 이름을 함수 타입 표현식이라고 소개하고 있다.  
    따라서 정확한 이름을 알아두는 건 매우 중요하므로 이렇게 함수 타입 표현식으로 알아두면 된다.  
  
  #### 함수 타입 표현식 장점
  덧셈 뿐만 아니라 뺄셈 그리고 곱셈, 나눗셈 등 사칙연산 함수와 비슷한 셩식의 함수 여러개를 만들어야 될 때 일반적으로 매개변수와 반환값에 모두 타입을 일일이 정의해줘야 한다면 중복되는 코드가 너무 많아진다.  
  그래서 이럴 때 함수 타입 표현식을 이용하면 굉장히 깔끔하게 코드를 고칠 수 있다.  
  type으로 정의된 Add 타입을 Operation 타입에 재정의하여 각 화살표 함수에 타입어노테이션으로 지정해준다.  
  - src/Chapter1.ts
    ```ts
    type OperationA= Add;
    const sub: OperationA = (a, b) => a - b;
    const multiply: OperationA = (a, b) => a * b;
    const divide: OperationA = (a, b) => a * b;
    ```

  Operaiont이 아닌 실제 정의된 우항의 타입 자체를 그대로 타입어노테이션으로 적용도 가능하다.
  타입별칭은 사실 우항에 있는 타입을 좌항의 이름으로 부르겠다는것으로 Operation이나 Add는 우항에 정의한 함수 타입 입을 해당 이름의 타입으로 저장한것과 같은것이다.  
  따라서 굳이 타입별칭을 이용하지 않아도 타입 어노테이션을 바로 정의한 뒤 값에 타입에 맞는 함수를 작성하면 되는것이다.  
  - src/Chapter1.ts
    ```ts
    const clacA: (a: number, b: number) => number = (a, b) => a + b;
    ```
  추가로 당연히 타입의 정의가 두개의 매개변수가 있는 함수를 정의하고 있기 때문에 만약 마음대로 매개변수의 개수를 하나 더 추가하면 당연히 오류가 발생하게 된다.  
  타입에는 두개의 매개변수가 있도록 했는데, 실제 구현부에서 3개의 매개변수를 썼기 때문이다.  
  따라서 함수의 타입을 표현식으로 정의할 때는 매개변수의 갯수와 타입을 다 맞춰줘야 한다.  
  - src/Chapter1.ts
    ```ts
    const clacB: (a: number, b: number) => number = (a, b, c) => a + b; // Type '(a: any, b: any, c: any) => any' is not assignable to type '(a: number, b: number) => number'. Target signature provides too few arguments. Expected 3 or more, but got 2.ts(2322)
    ```
  </details>
  <br>

  ### 호출 시그니처(콜 시그니처)
  <details>
  <summary>펼치기/접기</summary>
  <br>

  함수의 타입을 별도로 정의하는 또 다른 문법이다.  
  함수의 타입을 분리해서 정의할 수 있다.  
  type을 정의하듯 중괄호를 열어준 뒤, 중괄호 내부에 소괄호를열고 매개변수와 매개변수의 타입, 반환타입을 작성한다.
  이렇게 함수 타입을 정의하는 문법을 호출 시그니처라고 부른다.  
  - src/Chapter1.ts
    ```ts
    type OperationB = {
      (a: number, b: number): number;
    }

    const add2: OperationB = (a, b) => a + b;
    const sub2: OperationB = (a, b) => a - b;
    const multiply2: OperationB = (a, b) => a * b;
    const divide2: OperationB = (a, b) => a * b;
    ```
  일반적으로 함수의 타입을 타입별칭등을 이용하지 않고 정의할 때는 `function func(a: number): void {}` 이렇게 정의하는데
  여기서 `(a: number): void` 이 부분만 선언된 타입의 중괄호블록 내부에 작성한것이다.  
  이 문법을 호출 시그니처 또는 콜 시그니처라고 부르며, 함수 타입 표현식과 동일한 기능을 한다고 이해하면 된다.  
  함수의 타입을 정의하는데 이렇게 중괄호를 열어 마치 객체 타입을 정의하듯 하는 이유는 사실 자바스크립트의 함수도 객체이기 때문이다.  

  참고로 하이브리드 타입이라고 해서 호출 시그니처를 이용할 때 객체 프로퍼티를 추가로 정의할 수 있다.
  이것이 가능한 이유는 방금 말했듯 자바스크립트에서는 함수도 객체이기 때문이다.  
  OperationC 타입을 갖는 변수 add2는 함수처럼 호출될 수도 있고, .표기법을 이용하여 마치 객체를 사용하듯 사용할 수 있다.  
  따라서 이런식으로 타입을 만들면 해당 타입을 갖는 변수를 마치 객체로도 쓰고 함수로도 쓸 수 있다고 해서 하이브리드 타입이라고도 부른다.
  - src/Chapter1.ts
    ```ts
    type OperationC = {
      (a: number, b: number): number;
      name: string
    }
    ```
  </details>
  <br>

</details>
<br>


## 함수 타입의 호환성
<details>
<summary>펼치기/접기</summary>
<br>

기본 타입의 호환성이나 객체 타입의 호환성과 똑같이 함수 타입을 다른 함수 타입으로 취급해도 괜찮은가를 판단하는 말이다.  
함수타입의 호환성을 판단할 때는 두 가지의 체크리스트가 있다.  

1. 반환값의 타입이 호환되는지에 대한 여부
2. 매개변수의 타입이 호환되는지에 대한 여부
위 두가지의 기준이 모두 만족되어야만 두 함수의 타입이 호환된다라고 말할 수 있다.

### 1. 반환값이 호환되는가?
두개의 함수 타입을 만들어본다.  
number 타입의 반환값을 가지는 함수 타입 A와 number 리터럴 타입 10의 반환값 타입을 갖고 있는 함수 타입 B를 선언한다.  
다음으로 10을 반환하는 함수 a와 b에 각각의 함수 타입을 지정한다.  
B타입의 함수는 무조건 number 리터럴 타입 10을 반환하기 때문에 20을 반환하면 오류가 발생한다.

- src/Chapter2.ts
  ```ts
  type A = () => number;
  type B = () => 10;

  let a: A = () => 10;
  let b: B = () => 10; // 10이 아닌 number 값을 반환하면 오류가 발생한다.
  ```

이때 변수 a에 b를 할당할 경우 허용되지만 변수 b에 a를 할당할 경우는 허용되지 않는다.

- src/Chapter2.ts
  ```ts
  a = b;
  b = a; // b < a 즉, a가 number 타입이고, b는 number 리터럴타입 이므로 a 더 크다.
  ```
a함수의 반환값 타입은 number 타입이다.  
b함수의 반환값 타입은 number 리터럴 타입 10 이다.  
반환값 타입으로만 보자면 b에 a를 할당하겠다는 것은 type A를 type B로 취급하겠다는 것과 똑같은것이다.  
함수 a와 b의 타입이 다르기 때문이다.  

반환값의 기준으로만 보면 타입 B의 반환값은 number 리터럴 타입이다.  
타입 A의 반환값은 number 타입이다.  
number 타입을 number 리터럴 타입으로 취급하겠다는것이다.  
이는 number 타입이 number 리터럴타입 보다 크기 때문에 다운캐스팅에 해당한다.  
이것이 바로 허용되지 않는 이유이다.  
함수 타입 간의 호환성을 평가할 때 이렇게 반환값이 호환되는지에 대한 기준은 반환값끼리의 다운 캐스팅이 되면 안되도록 평가를 한다.  
따라서 a라는 변수에 저장된 함수의 반환값의 타입이 b 변수에 저장된 함수의 반환값 보다 크기 때문에 다운 캐스팅이다.  

반대로 a에 b를 할당하는것은 허용되었다.  
변수 a에 변수 b를 할당하는것은 b 타입을 a 타입으로 취급하겠다는 것이다.  
b 타입의 반환값으로만 보면 number 리터럴 타입 이며, a 타입의 반환값은 number 타입이다.  
number 리터럴 타입을 number 타입으로 취급하겠다는 것은 업캐스팅이기 때문에 a에 b를 할당하는것은 허용이 되는 것이다.  

이렇게 반환값 타입끼리는 업캐스팅하는 상황에서는 호환된다고 판단하고, 다운캐스팅 하는 상황에서는 호환되지 않는다고 판단한다.  
쉽게 말해 B타입을 A타입으로 취급하려고 할 때 A타입의 반환값이 더 큰 타입이라면 통과되고 반대로는 안된다고 하는것이다.

### 2. 매개변수가 호횐되는가?
2_1) 매개변수의 갯수가 같을 때.
2_2) 매개변수의 갯수가 다를 때.

#### 2_1) 매개변수 갯수가 같을 때 예제
매개변수는 number라는 타입을 갖고 반환타입은 void인 타입 C, 타입 D를 선언한다.
두개의 각 타입을 갖는 함수 c, d를 선언한다.  
타입도 같고 매개변수도 같을 경우 양쪽으로 할당하는것이 호환된다.
두개가 똑같은 타입이기 때문이다.  
- src/Chapter2.ts
  ```ts
  type C = (value: number) => void;
  type D = (value: number) => void;

  let c: C = (value) => {};
  let d: D = (value) => {};
  c = d; // 할당 허용 - 호환
  d = c; // 할당 허용 - 호환
  ```

아래와 같이 매개변수 value를 number 리터럴 타입 10으로 정의한 함수 타입 E가 정의된 실제 함수 e를 함수 c에 할당하려고 하면 오류가 발생한다.  
number 리터럴 타입을 number 타입으로 취급하는것이기 때문에 업캐스팅인데, 왜 안되는것일까?  
반환값 타입을 기준으로 호환성을 판단할때와는 다르게 매개변수의 타입을 기준으로 호환성을 판단할 때는 반대로 upcatsing일때는 호환이 되지 않는다고 평가한다.
반대의 경우로 다시 함수 e에 함수 c를 할당하도록 작성할 경우 오류가 발생하지 않는다.  
e는 number 리터럴타입 타입, c는 number타입 즉, `number → number 리터럴` 으로 취급하는 다운캐스팅이지만 허용이 되는것이다.  

결론적으로 매개변수의 타입을 기준으로 함수 타입의 호환성을 판단할 때에는 업캐스팅일땐 안되고, 다운캐스팅일때는 된다.  


- src/Chapter2.ts
  ```ts
  type E = (value: 10) => void;
  let e: E = (value) => {};
  c = e; // 업캐스팅 허용안됨. (Error)
  e = c; // 다운캐스팅 허용됨. 
  ```

매개변수가 객체 타입을 사용하는 예시로 조금 더 쉽게 설명이 가능하다.

- src/Chapter2.ts
  ```ts
  type Animal = {
    name: string;
  }
  type Dog = {
    name: string;
    color: string;
  }
  ```

Animal 타입이 조건이 더 작기 때문에 두 타입간의 관계는 Animal 타입이 Dog 타입의 Super 타입이다.  
각 타입을 지정할 함수를 구현해주고, Dog타입을 갖는 함수 dogFunc를 Animal타입을 갖는 함수 animalFunc에 할당할 경우 오류가 발생한다.  
이는 이전과 똑같은 상황으로 animalFunc의 매개변수 타입은 Animal이고 dogFunc 매개변수 타입은 Dog로 animalFunc의 매개변수 타입 Animal이 Super 타입으로 더 큰 타입이다.  
역시 dogFunc에서 animalFunc로 업캐스팅 되는 상황인데 안되는것이다.  

- src/Chapter2.ts
  ```ts
  let animalFunc = (animal: Animal) => {
    console.log(animal.name)
  };
  let dogFunc = (dog: Dog) => {
    console.log(dog.name)
    console.log(dog.color)
  };
  animalFunc = dogFunc;
  dogFunc = animalFunc;
  ```

animalFunc에 dogFunc를 할당한다는 것은 코드로 예를들면 다음과 같다.  
Animal타입에는 color라는 프로퍼티가 없기 때문에 오류가 발생한다.  
따라서 할당하려고 하는 함수의 매개변수 타입이 Dog처럼 서브타입일 경우 아래와 같이 말도안되는 코드가 나올 수 있기 때문에 업캐스팅일 때는 허용하지 않도록 막아주는것이다.
- src/Chapter2.ts
  ```ts
  let testFuncA = (animal: Animal) => {
    console.log(animal.name)
    console.log(animal.color) // [Error] Property 'color' does not exist on type 'Animal'.ts(2339)
  }
  ```

반대로 dogFunc에 animalFunc를 할당하는것을 허용하는 이유를 코드로 예를 들면 다음과 같다.  
dogFunc에 animalFunc를 할당하는 것이기 때문에 매개변수의 타입은 dogFunc를 따라야 한다.  
Dog타입은 Animal타입의 서브타입이기 때문에, 기본적으로 Animal타입의 객체들이 갖고 있는 모든 프로퍼티들을 Dog 타입은 이미 갖고 있다.  
그렇기 때문에 animalFunc를 dogFunc에 할당해도 전혀 아무런 타입 오류가 발생하지 않는 것이다.  
- src/Chapter2.ts
  ```ts
  let testFuncB = (dog: Dog) => {
    console.log(dog.name)
    console.log(dog.color)
  }
  ```

#### 2_2) 매개변수 갯수가 다를 때 예제
funcA = funcB가 허용되는 이유는 다음과 같다.  
funcA의 매개변수는 2개, funcB의 매개변수는 1개이다.  
funcA의 매개변수 갯수가 더 많기 때문에 허용된다.  

그러나 반대인 funcB = funcA의 경우는 허용되지 않는다.  
funcA의 매개변수 갯수가 더 많은데 funcB로 취급하려고 하는것은 허용되지 않는다.  
할당 하려고 하는 쪽의 함수 타입의 매개변수의 갯수가 더 적을 때에만 호환이 되는것이다.  
- src/Chapter2.ts
  ```ts
  type FuncA = (a: number, b: number) => void;
  type FuncB = (a: number) => void;

  let funcA: FuncA = (a, b) => {};
  let funcB: FuncB = (a) => {}; // [Error] Type 'FuncA' is not assignable to type 'FuncB'.  Target signature provides too few arguments. Expected 2 or more, but got 1.ts(2322)
  funcA = funcB;
  funcB = funcA;
  ```

물론 당연하게도 매개변수의 갯수가 더 작은 funcD를 funcC에 할당하려고 할때 만약 실제 할당되는 기준의 매개변수의 타입이 서로 다를 경우에도 허용되지 않는다.  
적어도 갯수가 다를 때의 기준을 적용 하려면 타입이 같은 매개변수가 있어야 된다.
- src/Chapter2.ts
  ```ts
  type FuncC = (a: string, b: number) => void;
  type FuncD = (a: number) => void;

  let funcC: FuncC = (a, b) => {};
  let funcD: FuncD = (a) => {}; 
  funcC = funcD; // [Error] Type 'FuncD' is not assignable to type 'FuncC'. Types of parameters 'a' and 'a' are incompatible. Type 'string' is not assignable to type 'number'.ts(2322)
  ```

</details>
<br>

## 함수 오버로딩
<details>
<summary>펼치기/접기</summary>
<br>

함수 오버로딩이란?
함수를 매개변수의 갯수나 타입에 따라서 여러가지 버전으로 정의하는 방법이다.  
```c
/* 매개변수 없음 */
void func() {
  printf("매개변수 없음");
}
/* 매개변수 한개 */
void func(int a) {
  printf(a + 20);
}
/* 매개변수 두개 */
void func(int a, int b) {
  printf(i + j);
}
```
위 예제 코드는 C언어로 짜여진 함수이다.  
동일한 함수 이름인 func를 3회 선언하고있다.  
매개변수가 없을 때, 1개일 때, 2개일 때 3가지 경우에 따라서 동일한 함수를 여러번 중복 정의해서 func라는 함수를 
매개변수 없이 `func();`를 호출하면 첫번째 func함수를 호출하고 아래 라인에서 `func(1);`와 같이 매개변수를 하나만 넣어 호출하게 되면 두번째 func함수를 호출하고 마지막으로 `func(1, 2);`와 같이 호출하면 3번째 함수를 호출한다.  
이러한 문법을 함수 오버로딩이라고 부른다.  
자바스크립트에서는 함수 오버로딩이 지원되지 않고 오직 타입스크립트에서만 지원이된다.  


### 함수 오버로딩 예제 정의
- → 함수 func 정의
- 모든 매개변수의 타입: number
- Ver1. 매개변수가 1개: 매개변수에 20을 곱한값 출력
- Ver2. 매개변수가 3개: 매개변수 총 합 출력


### 오버로드 시그니처
타입스크립트에서 함수 오버로딩을 구현하기 위해서는 가장 먼저 해야할 일이 있다.  
어떤 버전이 있는지 알려줘야 한다.  
아래와 같이 함수 구현부 없이 세미콜론으로 끝내는 문법을 사용하면 2가지 버전이 있다는것을 알려주는것과 같다.  
이를 오버로드 시그니처라고 부른다.  
함수를 오버로딩 하기 위해 각각 매개변수 별로 다른 버전을 명시해주기 위해 사용한다 라고 이해하면 된다.  
- src/Chapter0.ts
  ```ts
  function funcA(a: number): void;
  function funcA(a: number, b:number, c:number): void;
  ```

### 구현 시그니처
오버로드 시그니처로 정의한 함수의 실제 구현부 정의하는것을 말한다.
function func() {}와 같이 아무런 매개변수도 없고 반환도 없는 함수를 정의를 한 뒤 매개변수를 넣어 호출할 경우 오류가 발생할 것으로 예측할 수 있다.  
실제로 매개변수가 없이 호출해보고 1개, 2개, 3개를 넣어 호출해보면 1개와 3개를 넣었을 때 빼고는 모두 오류가 발생한다.  
- src/Chapter0.ts
  ```ts
  function funcA() {}
  funcA(); // [Error] Expected 1-3 arguments, but got 0.ts(2554)
  funcA(1);
  funcA(1, 2); // [Error] No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.ts(2575)
  funcA(1, 2, 3);
  ```
실제 구현부에서는 매개변수가 하나도 정의되어있지 않기 때문에 첫번째 호출 말고는 다 비정상인것처럼 보인다.  
그러나 결론적으로는 첫번째 호출에서 오류가 발생하고, 나머지 두번째와 네번째는 오류가 발생하지 않는다.  
이는 오버로드 시그니처 때문이다.  
어떤 함수가 오버로드 시그니처를 갖고 있으면, 함수를 호출할 때 인수들의 타입이 실제 구현부에 정의된 매개변수의 갯수나 타입에 따르지 않고, 오버로드 시그니처들 중 하나의 버전을 따라간다.  
따라서 매개변수로 number타입 값 1개를 인수로 전달했을 때는 오버로드 시그니처의 첫번재 버전과 일치하기 때문에 허용이 된것이다.  
number타입 값 3개를 전달한 호출문은 2번째 오버로드 시그니처 버전과 맞기 때문에 허용이 된것이다.  
나머지는 오버로드 시그니처에 매개변수가 없는것, 2개만 있는것이 없기 때문에 허용이 되지 않는 것이다.  
사실상 오버로드 시그니처들을 만들어 두면 실제 구현부의 매개변수 타입들은 호출할 때는 큰 영향을 미치지 않는다.  
그렇기 때문에 버전을 여러개 만들어 버전에 따라 호출하도록 만들어 줄 수가 있다.  


### 구현 오류 케이스
function funcB(a: number, b:number, c:number) {} 과 같이 함수를 실제로 구현할 경우 첫번째 오버로드시그니처에서 오류가 발생한다.  
오류 메시지를 살펴보면 이 오버로드 시그니처는 구현 시그니처와 호환되지 않는다 라는 메시지를 뱉는다.  
실제 함수를 구현할 경우 실제 동작은 구현된 코드의 블록에서 발생하기 때문에, 매개변수 3개가 모두 있다고 타입을 정의해버리면 첫번째 오버로드 시그니처의 존재가 없어진다.  
- src/Chapter0.ts
  ```ts
  function funcB(a: number): void; // [Error] This overload signature is not compatible with its implementation signature.ts(2394
  function funcB(a: number, b:number, c:number): void;
  function funcB(a: number, b:number, c:number) {}
  ```
구현 시그니처에서 매개변수 3개가 모두 필수 매개변수로 정의가 되어 있기 때문에 아래와 같이 실제로 함수 내부에서 모든 매개변수 a, b, c에 대해 모두 다 있다고 가정하고 코드를 작성 할것이다.  
이 경우 첫번째 오버로드 시그니처는 의미가 없어지게 된다.  
따라서 오버로드 시그니처들의 매개변수의 갯수에 차이가 있다면 최대한 방어적으로 선택적 프로퍼티로 매개변수로 정의해서, 모든 오버로드 시그니처들이 의미가 있도록 만들어 줘야 한다.  
- src/Chapter0.ts
  ```ts
  function funcC(a: number): void;
  function funcC(a: number, b:number, c:number): void;

  function funcC(a: number, b?:number, c?:number) {
    a.toFixed();
    b.toFixed(); // 선택적 매개변수의 경우 타입가드 혹은 기본값 필요
    c.toFixed(); // 선택적 매개변수의 경우 타입가드 혹은 기본값 필요
  }
  ```

### 실제 구현
- src/Chapter0.ts
  ```ts
  function funcD(a: number): void;
  function funcD(a: number, b:number, c:number): void;
  function funcD(a: number, b?:number, c?:number) {
    if (typeof b === 'number' && typeof c === 'number') {
      console.log(a + b + c)
    } else {
      console.log(a * 20);
    }
  }
  ```


</details>
<br>

## 템플릿1
<details>
<summary>펼치기/접기</summary>
<br>

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
