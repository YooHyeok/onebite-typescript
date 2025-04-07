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
