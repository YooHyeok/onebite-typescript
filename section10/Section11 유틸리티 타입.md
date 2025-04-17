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

## Required<`T`>
<details>
<summary>펼치기/접기</summary>
<br>

Required는 우리말로 필수의, 또는 필수적인 이라는 뜻이다.  
Required 타입은 Partial타입과는 반대로 특정 객체의 모든 프로퍼티를 필수 프로퍼티로 바꿔주는 타입이다.  

### 예제)
thumbnail도 반드시 포함된 게시글이 하나 필요하다고 가정하여 변수를 선언해준 뒤 Post타입을 지정한다.  

- src/chapter0_2.ts
  ```ts
  interface Post {
    title: string;
    tags: string[];
    content: string;
    thumbnailURL?: string;
  }
  const withThumbnailPost: Post = {
    title: '한입 타스 후기',
    tags: ['ts'],
    content: '',
    thumbnailURL: 'https://...'
  }
  ```
이때 thumbnailURL 프로퍼티는 Post 타입을 정의할 때 선택적 프로퍼티로 정의했기 때문에 사실 존재하지 않더라도 오류가 발생하지 않는다.  
- src/chapter0_2.ts
  ```ts
  const withThumbnailPostB: Post = {
    title: '한입 타스 후기',
    tags: ['ts'],
    content: '',
  }
  ```
하지만 현재 withThumbnailPost 변수에는 thumbnail이 반드시 있어야 한다.  
그렇기 때문에 위와같이 변수의 타입을 정의하는 것은 문제가 될 수 있다.  

바로 이런 상황에서 Required 타입을 이용하면 좋은 상황이다.  
아래와 같이 지정한 Post 타입을 Required<Post> 타입으로 변경해준다.
- src/chapter0_2.ts
  ```ts
  const withThumbnailPostC: Required<Post> = { // [Error] Property 'thumbnailURL' is missing in type '{ title: string; tags: string[]; content: string; }' but required in type 'Required<Post>'.ts(2741)
    title: '한입 타스 후기',
    tags: ['ts'],
    content: '',
  }
  ```
Required라는 유틸리티 타입은 제네릭 타입 변수로 전달한 Post 타입에서 모든 프로퍼티를 필수 프로퍼티로 바꿔주는 타입이기 때문에 thumbnailURL 같은 선택적 프로퍼티도 필수 프로퍼티가 되어 반드시 사용하도록 오류를 발생시켜 갖에할 수 있다.  
- src/chapter0_2.ts
  ```ts
  const withThumbnailPostD: Required<Post> = { // [Error] Property 'thumbnailURL' is missing in type '{ title: string; tags: string[]; content: string; }' but required in type 'Required<Post>'.ts(2741)
    title: '한입 타스 후기',
    tags: ['ts'],
    content: '',
    thumbnailURL: 'https://...'
  }
  ```
필수 프로퍼티로 누락된 thumbnailURL 프로퍼티를 다시 추가할 경우 오류가 사라진다.  

이러한 Required 유틸리티 타입도 직접 구현해보도록 한다.  
Partial 타입을 직접 만들때와 동일하게 맵드 타입을 활용한다.
- src/chapter0_2.ts
  ```ts
  type RequiredA<T> = {
    [key in keyof T]-?: T[key]
  }
  ```
이때 Partial과 반대로 모든 프로퍼티가 선택적이지 않은 프로퍼티로 바꿔줘야 한다.  
선택적 프로퍼티의 속성은 프로퍼티 이름 뒤에 물음표가 붙는 형태이다.  
즉, 이 물음표를 없앨 경우 선택적이지 않은 프로퍼티가 되는 것이다. 
그런 의미에서 ?앞에 -를 붙혀 -?를 지정할 경우 물음표를 빼겠다는 의미로 Required 타입이 된다. 
- src/chapter0_2.ts
  ```ts
  const withThumbnailPostE: RequiredA<Post> = { // [Error] Property 'thumbnailURL' is missing in type '{ title: string; tags: string[]; content: string; }' but required in type 'Required<Post>'.ts(2741)
    title: '한입 타스 후기',
    tags: ['ts'],
    content: '',
  }
  const withThumbnailPostF: RequiredA<Post> = { // [Error] Property 'thumbnailURL' is missing in type '{ title: string; tags: string[]; content: string; }' but required in type 'Required<Post>'.ts(2741)
    title: '한입 타스 후기',
    tags: ['ts'],
    content: '',
    thumbnailURL: 'https://...'
  }
  ```
</details>
<br>

## Readonly<`T`>
<details>
<summary>펼치기/접기</summary>
<br>

Readonly란 읽기전용, 수정불가 라는 뜻이다.  
따라서 해당 타입은 특정 객체 타입에서 모든 프로퍼티를 읽기 전용 프로퍼티로 만들어주는 유틸리티 타입이다.  

### 예제)
- src/chapter0_3.ts
  ```ts
  interface Post {
    title: string;
    tags: string[];
    content: string;
    thumbnailURL?: string;
  }

  const readonlyPost:Post = {
    title: '보호된 게시글 입니다.',
    tags: [],
    content: ''
  }
  readonlyPost.title = '';
  ```
변수의 프로퍼티에 접근하여 값을 변경하더라도 특별한 오류 없이 수정이 가능하다.  

위 변수의 타입을 그냥 Post가 아닌 Readonly<Post> 로 변경할 경우 프로퍼티에 접근하여 값을 수정시 오류가 발생한다.  
- src/chapter0_3.ts
  ```ts
  const readonlyPostA:Readonly<Post> = {
    title: '보호된 게시글 입니다.',
    tags: [],
    content: ''
  }
  readonlyPostA.title = ''; // [Error] Cannot assign to 'title' because it is a read-only property.ts(2540)
  ```
이제 Readonly 유틸리티 타입을 직접 구현해보도록 한다.  

Partial, Required 타입과 동일하게 맵드 타입을 활용하면 된다.  
- src/chapter0_3.ts
  ```ts
  type ReadonlyA<T> = {
    readonly [key in keyof T]: T[key]
  }
  ```
위와 같이 맵드 타입에서 콜론 기준 좌항 대괄호 앞에 `readonly` 키워드를 붙힐 경우 모든 프로퍼티가 readonly 프로퍼티가 된다.  
- src/chapter0_3.ts
  ```ts
  const readonlyPostB:ReadonlyA<Post> = {
    title: '보호된 게시글 입니다.',
    tags: [],
    content: ''
  }
  readonlyPostB.title = ''; // [Error] Cannot assign to 'title' because it is a read-only property.ts(2540)
  ```
적용해보면 실제 유틸리티 타입과 마찬가지로 수정시 오류가 발생한다.

</details>
<br>

## Pick<`T`, `K`>
<details>
<summary>펼치기/접기</summary>
<br>

Pick은 영어로 뽑다 또는 고르다 라는 뜻이다.  
즉, Pick타입은 객체 타입으로부터 특정 프로퍼티만 골라내는 타입이다.  

### 예제)
굉장히 오래 된 게시글로 태그나 썸네일이 없었다고 가정해본다.
- src/chapter1_1.ts
  ```ts
  interface Post {
    title: string;
    tags: string[];
    content: string;
    thumbnailURL?: string;
  }
  const legacyPost:Post = {
    title: '옛날 글',
    content: '옛날 컨텐츠',
  }
  ```
위와 같이 title과 content 프로퍼티만 갖는 legacyPost의 경우 타입을 Post로 지정할 경우 오류가 발생한다.  
tags 프로퍼티가 없기 때문이다.  
그러나 legacyPost는 옛날 컨텐츠이기 때문에 tags 프로퍼티를 가지지 못하는 상황이라면 Post타입으로 정의하기가 곤란하다.  

이럴 때 Pick타입을 활용할 수 있다.  
Pick타입의 제네릭 타입 변수 T에 Post 타입을 지정하고 K에는 고르고 싶은 프로퍼티만 유니온타입으로 지정한다.  
- src/chapter1_1.ts
  ```ts
  const legacyPostA: Pick<Post, 'title'|'content'> = {
    title: '옛날 글',
    content: '옛날 컨텐츠',
  }
  ```
이렇게 해주면 Pick 타입에 의해서 Post 타입으로부터 title 프로퍼티와 content 프로퍼티만 있는 객체 타입으로 새롭게 타입을 추론해 준다.  
그렇기 때문에 오류가 사라진다.  

이제 Pick 유틸리티 타입을 직접 구현해보도록 한다.  

Partial, Required, Readonly 타입과 동일하게 맵드 타입을 활용하면 된다.  

T와 K 두개의 제네릭 타입 변수를 받은 뒤 객체를 반환해 줘야 하기 때문에 맵드 타입으로 만들어 준다.  
key in 의 우항에 `keyof T`가 아닌 `K`로 들어온 유니언 타입을 지정하여 key in K로 지정해 준다.  
- src/chapter1_1.ts
  ```ts
  type PickA<T, K> = {
    [key in K]: T[key] // [Error] Type 'K' is not assignable to type 'string | number | symbol'.ts(2322)
  }
  ```
여기까지만 놓고 해석해보면 T타입에 Post같은 객체가 들어오면 K타입에는 프로퍼티를 나열한 유니온 타입이 들어온다.  
맵드 타입을 이용해서 새롭게 만들어지는 객체 타입이 key는 K에 들어오는 유니온 타입인 title이나 content타입이, 각각의 value 타입은 원본 타입이 될것이다.  
그러나 K에 K 타입은 string|number|symbol 유니온 타입에 할당할 수 없다는 오류가 발생한다.  
맵드타입에서 in 연산자 우측에는 key가 뭐가 있는지 표현하기 위해 string 리터럴로 만든 유니온 타입이 들어올 수 있다.  
그러나 타입 변수 K에는 아무런 제약을 걸어놓지 않았기 때문에 함수도 들어올 수 있고, 객체 타입도 들어올 수 있고, never 타입까지도 들어올 수 있다.  
따라서 K에 제한을 줘야한다.  
- src/chapter1_1.ts
  ```ts
  type PickB<T, K extends keyof T> = {
    [key in K]: T[key]
  }
  const legacyPostB: PickB<Post, 'title'|'content'> = {
    title: '옛날 글',
    content: '옛날 컨텐츠',
  }
  ```
위와 같이 제네릭 변수 K에 `K extends keyof T`로 지정하여 타입 변수 K에 할당할 수 있는 타입은 무조건 T로 들어오는 객체 타입의 키 값들을 추출한 유니온 타입의 서브 타입만 들어올 수 있게 된다.  
만약 T에 Post 타입을 전달할 경우 `K extends keyof 'title' | 'tags' | 'content' | 'thumbnailURL'` 이 된다.  

이 때 타입 변수 K에 `title | content` 유니온 타입이 할당되면 `'title' | 'content' extends keyof 'title' | 'tags' | 'content' | 'thumbnailURL'`이 된다.  
이와같은 조건식은 extends keyof를 기준으로 좌측의 K에 해당하는 `'title' | 'content'` 유니온 타입이 우측의 T에 해당하는 `'title' | 'tags' | 'content' | 'thumbnailURL'` 유니온 타입의 서브타입이 참인지에 대한 조건식이 된다.  
해당 조건식은 결과적으로 참이 된다.
좌측의 `'title' | 'content'` 타입은 우측의 `'title' | 'tags' | 'content' | 'thumbnailURL'`타입에 포함되는 타입이기 때문이다.  
- src/chapter1_1.ts
  ```ts
  const legacyPostC: PickB<Post, number> = {
    title: '옛날 글',
    content: '옛날 컨텐츠',
  }
  ```
만약 위처럼 제네릭 타입 변수 K에 number타입을 지정하면 어떻게 될까?
조건식은 `number extends keyof 'title' | 'tags' | 'content' | 'thumbnailURL'`이 되어버려 거짓이 된다.  
number 타입과 `'title' | 'tags' | 'content' | 'thumbnailURL'` 유니온 타입은 아무런 상관관계가 없기때문에 조건식이 거짓이 되어 제약조건에 일치하지 않게 된다.  
따라서 타입 변수에 `K extends keyof T`를 지정할 경우 적어도 K 타입 변수에 객체 프로퍼티 키만 전달할 수 있을 뿐 number같은 뚱딴지 같은 타입을 넣을 수 없도록 제한해준다.  

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
