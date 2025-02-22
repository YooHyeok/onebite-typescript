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

## Rest Parameter
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
