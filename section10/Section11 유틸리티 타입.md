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

## Partial<T>

<details>
<summary>펼치기/접기</summary>
<br>

Partial이란 영어로 부분적인, 일부분의 라는 뜻이다.
Partial이라는 유틸리티 타입은 특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 바꿔주는 타입이다.  

### 예제1)
블로그 플랫폼을 만든다고 가정하고 게시글을 의미하는 타입 Post를 만들어 본다.  
프로퍼티로 string타입의 title, content와 string[] 타입의 tags 그리고 string타입의 선택적 프로퍼티 thumbnailURL을 구성한다.

- src/chapter0_1.ts
  ```ts
  interface Post {
    title: string;
    tags: string[];
    content: string;
    thumbnailURL?: string;
  }
  ```
일상적으로 사용하는 티스토리나 벨로그같은 플랫폼들에서는 거의 대부분 임시 저장이라는 기능을 제공한다.  
또한 어떤 게시글을 임시 저장할 때는 모든 게시글의 정보가 다 완성되어 있지 않은 상태일 때가 더 많다.  
따라서 임시 저장된 게시글을 한번 변수로 표현해 보도록 한다.

- src/chapter0_1.ts
  ```ts
  const draft = {
    title: '제목 나중에 짓자',
    content: '초안...'
  }
  ```
위와 같이 title과 content만 있는 임시 저장된 게시글도 분명히 있을 수 있다.  
임시 저장 게시글인 draft 변수도 똑같은 게시글로 취급 할 수 있으니까 Post 타입으로 정의를 해야 하는데 draft 변수에는 tags 프로퍼티가 없기 때문에 오류가 발생한다.  
- src/chapter0_1.ts
  ```ts
    const draftA: Post = { // [Error] Property 'tags' is missing in type '{ title: string; content: string; }' but required in type 'Post'.ts(2741)
    title: '제목 나중에 짓자',
    content: '초안...'
  }
  ```
이럴 때에는 유틸리티 타입인 Partial을 쓰면 좋다.  
draftA 변수 타입을 위와같이 Post로 정의하는것이 아니라 Partial<Post>로 정의해 주는 것이다.  

- src/chapter0_1.ts
  ```ts
  const draftB: Partial<Post> = {
    title: '제목 나중에 짓자',
    content: '초안...'
  }
  ```
Partial<`Post`> 타입은 제네릭 타입 변수로 전달한 Post타입의 모든 프로퍼티를 다 선택적 프로퍼티로 만드는 유틸리티 타입이다.  
title, tags, content 모두 선택적 프로퍼티가 되기 때문에 오류가 발생하지 않게 된다.  

이번에는 직접 Partial 유틸리티 타입을 직접 구현해 보도록 한다.  

동일한 이름의 타입을 정의하고, any타입을 임시로 할당한다.  
- src/chapter0_1.ts
  ```ts
  type Partial<T> = any;
  const draftC: Partial<Post> = {
    title: '제목 나중에 짓자',
    content: '초안...'
  }
  ```
객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 만들어야 한다.  
즉, 특정 객체 타입을 새로운 객체 타입으로 변환하는 작업이 필요하다.  
이럴 때 맵드 타입을 이용한다.  
대괄호를 열고, key in keyof T를 선언할 경우 타입변수 T에 들어오는 객체 타입의 모든 키들을 파셜 타입이 모두 갖게 된다.  
- src/chapter0_1.ts
  ```ts
  type PartialA<T> = {
    [key in keyof T]
  }
  ```
일단 keyof 연산자는 특정 객체 타입으로부터 모든 키를 유니온 타입으로 추출하는 연산자이다.  
그렇기 때문에 T에 할당하는 타입이 Post 타입일 경우 key of T는 `title|tags|content|thumbnailURL` 이 된다. 
key in keyof T에서 in연산자는 맵드 타입에서 제공되는 연산자로 좌항의 키가 우항의 유니온 타입에 하나씩 맵핑된다. 
그래서 T에 할당되는 타입이 Post일 때 키가 한번은 title이고 한번은 tags이고 한번은 content이고 한번은 thumbnailURL이 된다.  
결론적으로 타입변수 T에 들어온 객체 타입의 키를 모두 다 갖게 되는 것이다.  

키 정의는 끝났고, 다음으로 콜론:을 찍어 value의 타입도 정의해 본다.  
value 타입은 `T[key]` 를 지정해 준다.
- src/chapter0_1.ts
  ```ts
  type PartialB<T> = {
    [key in keyof T]: T[key];
  }
  ```
해당 문법은 인덱스드 액세스 타입 이다.  
인덱스드 액세스 타입은 특정 객체나 배열로부터 특정 프로퍼티의 타입을 추출하는 타입이다.  
그렇기 때문에 타입 변수 T에 들어온 객체 타입으로부터 key에 해당하는 프로퍼티의 value 타입을 추출하는 것이다.  
예를들어 Post가 T에 들어온다면 Post에 한번은 title, 한번은 content 와 같이 될것이다.  

다음으로 모든 프로퍼티를 선택적 프로퍼티로 만들어 줘야 하기 때문에 대괄호의 오른쪽에 물음표를 선언해주면 된다.  
- src/chapter0_1.ts
  ```ts
  type PartialC<T> = {
    [key in keyof T]?: T[key];
  }
  const draftD: PartialC<Post> = {
    title: '제목 나중에 짓자',
    content: '초안...'
  }
  ```
이제 타입변수로 전달한 객체 타입에 모든 프로퍼티를 다 선택적 프로퍼티로 바꾸게 된다.  

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
