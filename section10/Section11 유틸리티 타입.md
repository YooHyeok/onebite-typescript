# [메인 마크다운.md](../README.md)
<br>

# 유틸리티 타입 소개
<details>
<summary>펼치기/접기</summary>
<br>

타입 스크립트가 자체적으로 제공하는 특수한 타입들을 말한다.  
지금까지 배워왔던 제네릭이나 맵드 타입 또는 조건부 타입등에 타입을 조작하는 기능을 이용해서 실무에서 자주 사용하는 타입들을 미리 만들어 놓은것을 말한다.

```ts
interface Person {
  name: string;
  age: number
}
const person: Readonly<Person> = {
  name: "유혁스쿨",
  age: 34
}
person.name = ""; // Error
```
예를들어 위와같은 person 객체 타입이 정의되어 있을 때 Readonly 라는 유틸리티 타입을 사용하면 타입 변수로 전달한 객체 타입의 모든 프로퍼티를 다 Readonly 프로퍼티로 바꿔주는 동작들이 가능하다.  
바로 아래에 person객체의 name프로퍼티에 접근하여 값을 수정하려고 하니 오류가 발생한다.  

또는 Partial이라는 유틸리티 타입을 이용할 수도 있다.  
```ts
interface Person {
  name: string;
  age: number;
}

const person: Partial<Person> = {
  name: "유혁스쿨"
}
```
Person이라는 객체 타입이 있을 떄 Partial의 제네릭 타입 변수에 Person을 지정하여 모든 프로퍼티를 선택적 프로퍼티로 바꾸는 변형도 가능하다.  

타입스크립트는 굉장히 많은 유틸리티 타입을 제공하고 있다.  
아래 공식문서에서 타입스크립트가 제공하는 아주 다양한 유틸리티 타입들에 대한 정보를 확인해 볼 수 있다.  
https://www.typescriptlang.org/docs/handbook/utility-types.html  

지원하는 유틸리티 타입의 종류가 굉장히 많기 때문에 가장 잘 활용되는 몇가지 유틸리티 타입들만 살펴본다.

### 맵드 타입 기반 (Mapped)
1. Partial<`T`>
2. Required<`T`>
3. Readonly<`T`>
4. Pick<`T`>
5. Omit<`T`>
6. Record<`T`>

### 조건부 타입 기반 (Conditional)
1. Exclude<`T`>
2. Extract<`T`>
3. ReturnType<`T`>  
<br>  

다음 코드들은 지금까지 배운 타입스크립트 지식들로 유틸리티 타입들을 직접 만들어 보게 될 코드 예시이다.
```ts
/**
 * Extract<T, U>
 * T에서 U를 추출하는 타입
 */
type Extract<T, U> = T extends U ? T : never;

type B = Extract<string | boolean, boolean>;

/**
 * ReturnType<T>
 * 함수의 반환값 타입을 추출하는 타입
 */
type ReturnType<T extends (...args: any) => any> = T extends (
  ... arg: any
) => infer R
  ? R
  : never;
```
언어가 제공하는 기능들을 잘 활용하는 수준들을 넘어서, 그 기능들을 직접 조작하고 만들어보고 원하는 대로 변형할 수 있는 수준급의 지식까지 갖춰본다.
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
