# [메인 마크다운.md](../README.md)
<br>

# 타입 조작하기 기능 소개
<details>
<summary>펼치기/접기</summary>
<br>

타입을 조작한다는것은 기본 타입이나 별칭 또는 인터페이스로 만든 원래 존재하던 여러가지 타입들을 타입스크립트의 특수한 문법을 이용해서 상황에 따라 각각 다른 타입으로 변환하는 타입스크립트의 강력하고도 독특한 기능이다.   

- 원래 존재하던 타입
  ```ts
  interface {
    a: string;
    b: string;
    c: string;
  }
  ```
- 새로운 타입
  ```ts
  interface {
    a: string | number;
    b: string | number;
    c: string | number;
  }
  ```


이전시간에 배웠던 제네릭도 함수나 인터페이스, 별칭, 클래스 등에 적용해서 상황에 따라 달라지는 가변적인 타입을 정의할 수 있었기 때문에 타입을 조작하는 기능에 포함된다.  

타입스크립트는 이러한 제네릭 외에도 굉장히 다양한 타입 조작 기능을 제공한다.  
이번 섹션에서는 지난 섹션에서 배웠던 제네릭과 다음 섹션에서 배울 조건부 타입을 제외한 다음 4가지 타입조작 기능을 살펴보도록 한다.
## 1. 인덱스드 엑세스 타입  
  객체나 배열 튜플 타입으로부터 특정 프로퍼티나 특정 요소의 타입만 추출하는 타입.
  ```ts
  const post: PostList[number] = {
    title: "게시글 제목",
    content: "게시글 본문",
    author: {
     id: 1,
     name: '유혁스쿨',
     age: 34  
    }
  }
  function printAuthorInfo(author: PostList[number]["author"]) {
    console.log(`${author.id} - ${author.name}`);
  }
  ```
## 2. keyof 연산자  
  객체 타입으로부터 해당 타입 내에 정의된 프로퍼티의 키들을 유니온 타입으로 추출하는 연산자.
  ```ts
  interface Person {
    name: string;
    age: number;
    isOld: boolean;
  }
  type PersonKey = keyof Person;
  const personKey: PersonKey = '(자동완성)'
  ```
## 3. Mapped(맵드) 타입  
  자바스크립트의 Map 메소드처럼 기존의 객체 타입을 기반으로 새로운 객체 타입을 변형해서 만들 수 있는 타입.
  ```ts
  interface Person {
    name: string;
    age: number;
    isOld: boolean;
  }
  type ReadonlyPerson = {
    readonly [P in keyof Person]: Person[P]
  };
  ```
## 4. 템플릿 리터럴 타입  
  기존 String 리터럴 타입을 기반으로 정해진 패턴의 문자열만 포함하는 타입
  ```ts
  type Company = "SAMSUNG" | "NAVER" | "APPLE" | "GOOGLE"
  type Employee = "developer" | "marketer" | "designer"
  type CompanyEmployee = `${Company} - ${Employee}`
  const companyEmployee: CompanyEmployee = '(자동완성)'
  ```
</details>
<br>

## 인덱스드 액세스 타입
<details>
<summary>펼치기/접기</summary>
<br>

인덱스드 엑세스 타입이란?  
인덱스라는 것을 이용하여 다른 타입 내에 특정 프로퍼티의 타입을 추출하는 그런 타입이다.  
인덱스드 액세스 타입은 객체, 배열, 튜플에 모두 사용할 수 있기 때문에 세 가지 예시를 순서대로 모두 살펴보도록 한다.  

### 인덱스드 액세스 타입 - 객체 타입 예제
커뮤니티의 특정 게시글 하나의 타입으로 제목을 의미하는 string 타입의 title과 본문을 의미하는 string 타입의 contents 그리고 작성자 프로퍼티로 구성된 인터페이스 Post를 구현한다.
- src/chapter.ts
  ```ts
  interface Post {
    title: string;
    content: string;
    author: {
      id: number;
      name: string;
    };
  }
  ```
포스트 타입을 갖는 변수를 선언해 준다.  
- src/chapter.ts
  ```ts
  const post:Post = {
    title: "게시글 제목",
    content: "게시글 본문",
    author: {
      id: 1,
      name: "유혁스쿨"
    }
  }
  ```

게시글에서 작성자의 이름과 아이디를 붙여서 출력하는 함수가 있다고 가정하고 printAuthorInfo() 함수를 구현해 본다.  
해당 함수에는 게시글 작성자의 id와 name을 붙여 출력하는 기능을 해야 되기 때문에 특정 게시글의 작성자를 매개변수로 받아야 된다.  
따라서 author를 매개변수로 받아준 뒤 함수 내부에서 템플릿 리터럴을 이용하여 author의 name과 id를 붙여 출력해주도록 한다.
- src/chapter.ts
  ```ts
  function printAuthorInfo(author) {
    console.log(`${author.name}-${author.id}`)
  }
  ```

이렇게 작성을 하고 보면 매개변수 author에 타입을 정의해주지 않았기 때문에 오류가 발생한다.  
매개변수 author에는 어떤 타입을 지정해줘야 할까?  
지금까지 배워온 문법대로 해보면 객체 리터럴 타입으로 post 타입의 author를 단순히 지정해 주면 된다.  
이후에는 printAuthorInfoA메소드를 호출하고, 인수로는 post.author로 author 프로퍼티를 넘겨주면 될것이다.  
- src/chapter.ts
  ```ts
  function printAuthorInfoA(author: {id: number; name: string}) {
    console.log(`${author.name}-${author.id}`)
  }
  printAuthorInfoA(post.author);
  ```

그러나 위와 같은 방식으로 타입을 정의해도 어떤 문제가 발생하지는 않지만, 갑자기 post타입에서 author 프로퍼티의 작성자의 나이를 포함하라는 수정 요구사항이 떨어지게 되면 age property를 새롭게 만들어 줘야 한다.

- src/chapter.ts
  ```ts
  interface PostA {
    title: string;
    content: string;
    author: {
      id: number;
      name: string;
      age: number // 새로운 프로퍼티 추가
    };
  }
  ```
PostA 타입을 갖는 postA변수에서도 author 프로퍼티의 객체안에 27값을 할당한 age프로퍼티를 추가해줘야 된다.  

- src/chapter.ts
  ```ts
  const postA:PostA = {
    title: "게시글 제목",
    content: "게시글 본문",
    author: {
      id: 1,
      name: "유혁스쿨",
      age: 27 // 새로운 프로퍼티 정의
    }
  }
  ```
함수에도 author 매개변수의 타입에 number타입 age 프로퍼티를 별도로 추가해줘야 될것이다.  

- src/chapter.ts
  ```ts
  function printAuthorInfoB(author: {id: number; name: string; age: number}) {
    console.log(`${author.name}-${author.id}`)
  }
  ```

지금은 함수가 하나밖에 없어 그냥 추가해주면 되긴 했지만, 만약 author 객체 매개변수를 받는 함수가 여러개가 된다면 어떨까?  
PostB 인터페이스의 author 프로퍼티 객체타입 내부에 location 프로퍼티가 또 새롭게 추가된다면, 모든 함수의 매개변수 타입에 location 프로퍼티를 추가하고 타입을 지정해줘야한다.  
- src/chapter.ts
  ```ts
  interface PostB {
    title: string;
    content: string;
    author: {
      id: number;
      name: string;
      age: number;
      location: string // 새로운 프로퍼티 추가
    };
  }

  function printAuthorInfoC(author: {id: number; name: string; age: number; location: string}) {
    console.log(`${author.name}-${author.id}`)
  }
  function printAuthorInfoD(author: {id: number; name: string; age: number; location: string}) {
    console.log(`${author.name}-${author.id}`)
  }
  function printAuthorInfoE(author: {id: number; name: string; age: number; location: string}) {
    console.log(`${author.name}-${author.id}`)
  }
  ```
이런 경우에 바로 인덱스드 액세스 타입을 이용하면 좋다.  
인덱스드 액세스 타입은 이러한 객체 타입으로부터 특정 프로퍼티의 타입을 쏙 뽑아서 변수에 정의해줄 수 있도록 도와주는 좋은 문법이다.  

사용법은 아래와 같다.  
author 매개변수의 타입으로 Post인터페이스를 지정해주고, 타입 바로 옆에 객체의 괄호 표기법을 쓰듯 대괄호를 열어준 다음 string 리터럴 타입으로 뽑아내고 싶은 프로퍼티의 타입을 작성해주면 된다.
`(author: Post['author'])`  
이렇게 작성할 경우, Post타입으로부터 author프로퍼티의 value타입인 객체만 뽑아 추출해주는 것이다.  
author 매개변수에 마우스를 올려보면 `author: { id: number; name: string; }`와 같이 원하는 대로 특정 프로퍼티 타입만 추출, 적용된것을 확인할 수 있다.  

- src/chapter.ts
  ```ts
  function printAuthorInfoF(author: Post['author']) {
    console.log(`${author.name}-${author.id}`)
  }
  ```
추가로 인덱스드 액세스 타입을 이용하면 좋은 점은 author 객체에 `location: string`과 같이 새로운 프로퍼티가 추가되거나, id는 number타입이였는데 string으로 기존 프로퍼티 타입이 변경되었을 때에도 
즉시 반영을 해주기 때문에 원본 타입이 수정되더라도 별도로 추가적인 작업을 해주지 않아도 되어 굉장히 편리하다.  
참고로 이때 인덱스드 액세스 타입에서 string 리터럴 타입을 특별히 `인덱스` 라고 부른다.  
인덱스를 이용해서 특정 타입의 프로퍼티에 접근하는 의미로 인덱스드 액세스 타입이라고 부르는 것이다.  

- src/chapter.ts
  ```ts
  interface PostD {
    title: string;
    content: string;
    author: {
      id: string;
      name: string;
      age: number;
      location: string
    };
  }
  function printAuthorInfoG(author: PostD['author']) { // author: { id: string; name: string; age: number; location: string; }
    console.log(`${author.name}-${author.id}`)
  }
  ```

#### 인덱스드 액세스 타입 사용 주의점

1. 인덱스에 들어가는 문자열은 값이 아닌 타입이다.  
입문자들이 굉장히 많이 햇갈리는 부분으로, 예를들어 author라는 문자열을 key라는 변수에 할당하고, 기존 인덱스 위치에 할당할 경우 오류가 발생한다.  
인덱스에 들어올수 있는 것은 오로지 타입만 들어올 수 있는데, key는 타입이 아닌 변수, 곧 값이기 때문에 오류가 발생한것이다.  
- src/chapter.ts
  ```ts
  const key = "author"
  function printAuthorInfoH(author: PostD[key]) { // [Error] Type 'key' cannot be used as an index type.ts(2538)
    console.log(`${author.name}-${author.id}`)
  }
  ```

인덱스드 액세스 타입에서 인덱스 위치에는 오로지 타입만 올 수 있다.  
따라서 변수 key가 아닌 string 리터럴 타입을 갖는 type을 선언하여 적용할 경우 오류가 발생하지 않게 된다.  
- src/chapter.ts
  ```ts
  type inedxKey = "author"
  function printAuthorInfoI(author: PostD[inedxKey]) {
    console.log(`${author.name}-${author.id}`)
  }
  ```

2. 존재하지 않는 프로퍼티 이름 사용불가  
PostD타입에 존재하지 않는 프로퍼티를 인덱스 위치에 적용할 경우 프로퍼티가 없다는 오류를 출력한다.  
- src/chapter.ts
  ```ts
  function printAuthorInfoJ(author: PostD["what"]) { // [Error] Property 'what' does not exist on type 'PostD'.ts(2339)
    console.log(`${author.name}-${author.id}`)
  }
  ```

3. 중첩 프로퍼티 탐색
PostD 타입의 author 프로퍼티 하위의 name, id 프로퍼티의 타입만 가져오고 싶을경우 author 프로퍼티의 타입을 인덱스드 액세스 문법으로 가져온 뒤,  
동일한 방식으로 대괄호를 통해 name과 id 프로퍼티를 가져올 수 있다.  
- src/chapter.ts
  ```ts
  function printAuthorInfoK(name: PostD["author"]["name"], id: PostD["author"]["id"]) {
    console.log(`${name}-${id}`)
  }
  ```

### 인덱스드 액세스 타입 예제 2 - 배열 타입
인터페이스는 객체 타입 정의에만 특화되어 있기 때문에 배열 타입을 정의하기엔 불편하다.  
따라서 타입 별칭으로 선언하도록 한다.  
이전 Post 인터페이스를 타입 별칭으로 변경하고, 마지막에 대괄호를 추가해준다.  
포스트 타입의 요소 여러 개를 저장하는 포스트 리스트 타입으로 변경되었다.  
인덱스드 액세스 타입을 이용하여 배열 타입으로 부터 배열 요소의 타입인 Post 객체 타입을 추출하여 적용해본다.

- src/chapter.ts
  ```ts
  type PostList = {
    title: string;
    content: string;
    author: {
      id: number;
      name: string;
      age: number;
    };
  } []
  ```
변수에 배열 타입을 적용하고, 인덱스드 액세스 타입을 활용하여 요소의 타입 하나만 추출한다.  
대괄호안에 number를 적용할 경우 배열 타입으로부터 요소의 타입을 잘 추출해온 것을 확인할 수 있다.  
배열의 모든 인덱스는 기본적으로 number타입 이므로 배열의 인덱스 타입인 number 타입을 적용한것이다.  
- src/chapter.ts
  ```ts
  const postB: PostList[number] = {
    title: "게시글 제목",
    content: "게시글 본문",
    author: {
      id: 1,
      name: "유혁스쿨",
      age: 27
    }
  }
  ```
이때, 대괄호에 number 타입이 아닌 실제 인덱스로 배열에 접근하는 것처럼 number 리터럴 타입인 0, 1 등의 숫자를 넣어도 오류없이 정상적으로 작동한다.    
- src/chapter.ts
  ```ts
  const postC: PostList[3] = {
    title: "게시글 제목",
    content: "게시글 본문",
    author: {
      id: 1,
      name: "유혁스쿨",
      age: 27
    }
  }
  ```
마찬가지로 주의할 점은 3은 값이 아닌 타입이다.  
number 리터럴 타입이기 때문에 예를들어 `const num = 3;`을 선언한 뒤 아래와 같이 num을 인덱스에 적용할 경우 오류가 발생하게 된다.  
따라서, 이전 예제와 같이 인덱스에 들어가는 값은 무조건 타입이어야만 한다.
- src/chapter.ts
  ```ts
  const num = 3;
  const postD: PostList[num] = { // 'num' refers to a value, but is being used as a type here. Did you mean 'typeof num'?ts(2749)
    title: "게시글 제목",
    content: "게시글 본문",
    author: {
      id: 1,
      name: "유혁스쿨",
      age: 27
    }
  }
  ```
함수의 매개변수 타입을 바꿔보도록 한다.  
객체타입인 Post가 아닌 배열 타입에서 객체를 뽑아야하기 때문에 number 혹은 number 리터럴 타입으로 접근한 뒤, author 라는 string 리터럴 타입을 통해 author 프로퍼티를 추출한다.
- src/chapter.ts
  ```ts
  function printAuthorInfoL(author: PostList[3]["author"]) {
    console.log(`${author.name}-${author.id}`)
  }
  ```

### 인덱스드 액세스 타입 예제3 - 튜플
number, string, boolean 타입을 요소로 갖는 튜플 타입을 선언한 뒤, 각 튜플 타입을 인덱스드 액세스 타입을 통해 접근하여 개별 타입으로 추출할 수 있다.  
- src/chapter.ts
  ```ts
  type Tup = [number, string, boolean]
  type Tup0 = Tup[0] // number type
  type Tup1 = Tup[1] // string type
  type Tup2 = Tup[2] // boolean type
  ```
또한, 튜플 타입은 길이가 고정된 배열이기 때문에 존재하지 않는 인덱스 타입을 추출하려고하면 오류가 발생한다.
- src/chapter.ts
  ```ts
  type Tup3 = Tup[3] // Error]Tuple type 'Tup' of length '3' has no element at index '3'.ts(2493)
  ```
배열타입을 추출할 때처럼 인덱스에 number를 적어도 문제없다.  
이 경우 튜플 타입안에 있는 모든 타입의 최적의 공통 타입을 뽑아온다.  
마우스 커서를 올려보면 3개 타입의 최적의 공통 타입인 3개 타입의 유니온 타입으로 추출하게 된다.
- src/chapter.ts
  ```ts
  type Tup4 = Tup[number]
  ```
인덱스드 액세스 타입은, 복잡하고 큰 타입으로부터 잘게잘게 필요한 만큼만 타입을 추출할 수 있기 때문에 실무에서도 굉장히 요긴하게 사용할 수 있다.  

</details>
<br>

## keyof 연산자와 typeof 연산자
<details>
<summary>펼치기/접기</summary>
<br>

특정 객체 타입으로부터 프로퍼티 키들을 유니온 스트링 타입으로 추출하는 연산자이다.  

### 예제1)
첫번쨰로 이름과 나이를 갖는 Person타입 인터페이스를 구현한다.  
string타입의 name, number타입의 age프로퍼티를 각각 정의한다.  
두번째로 매개변수로 person타입 객체와 key 값을 받아 함수 내부에서 person객체로부터 key 프로퍼티의 값을 반환하는 함수를 구현한다.  
- src/chapter.ts
  ```ts
  interface Person {
    name: string;
    age: number;
  }
  function getPropertyKey(person, key) {
    return person[key]
  }
  ```
다음으로 Person타입을 갖는 변수 person을 정의하고, name과 age 프로퍼티에 값을 각각 할당한 뒤, 구현한 함수의 매개변수로 전달한다.  
이때, key에 해당하는 매개변수로는 "name" 값을 넘긴다.  
호출의 결과값은 객체 초기 선언시 name 프로퍼티에 할당한 `유혁스쿨`이 될것이다.  
- src/chapter.ts
  ```ts
  const person: Person = {
    name: '유혁스쿨',
    age: 32
  }
  const name = getPropertyKey(person, "name")
  console.log(name); // tsx src/chapter1.ts `유혁스쿨`
  ```
다시 함수로 돌아가 매개변수에 타입을 지정해준다.  
첫번째 매개변수 person은 Person타입으로 지정해주면 되는데, key 매개변수의 타입은 string으로 할 경우 오류가 발생한다.  
모든 문자열 값이 person 객체의 key라고 볼 수 없기 때문이다.  
예를들어 `name2` 같은 문자열 값을 전달하더라도 key의 타입이 string이기 때문에 문제가 되지 않지만, person객체에는 name2라는 프로퍼티가 없기 때문에 허용할 경우 문제가 될 수 있다.  
- src/chapter.ts
  ```ts
  function getPropertyKeyA(person: Person, key: string) {
    return person[key]
  }
  const name2 = getPropertyKeyA(person, "name2");
  console.log(name2) // tsx src/chapter1.ts `undefined`
  ```
key의 타입은 name 또는 age만 들어올 수 있게 union타입으로 만들어 줘야 한다.  
- src/chapter.ts
  ```ts
  function getPropertyKeyB(person: Person, key: "name" | "age") {
    return person[key]
  }
  ```
그러나 프러퍼티의 키의 타입을 정의할 때 위와같이 union을 쓰는건 문제가 될 가능성이 굉장히 크다.  
현재 정의한 person 객체의 프로퍼티는 2개밖에 없지만 만약 10개, 20개, 50개, 100개로 구성된다면 모든 프로퍼티의 키들을 union으로 만들기 어렵기 때문이다.  
노력한다면 쓸 수 있겠지만 비용이 많이 드는 작업이다.  
또한 person 객체에 새로운 프로퍼티가 추가되거나 또는 몇가지 프로퍼티의 이름이 수정되는 상황이 오면 그때마다, union타입에 새로운 멤버를 추가해주거나 변경해주는 등 지속적인 수정이 필요할 것이다.  

이때 사용 가능한 효율적인 문법이 바로 keyof 연산자를 사용하는 것이다.  

매개변수 key의 타입을 keyof Person으로 지정해준다.  
- src/chapter.ts
  ```ts
  function getPropertyKeyC(person: Person, key: keyof Person) {
    return person[key]
  }
  ```
이렇게 타입을 정의할 경우, "name" string 리터럴 유니온(|) "age" string 리터럴 타입으로 추출이 된다.  
만약 이때 
```ts
interface Person {
  name: string;
  age: number;
  location: string
}
```
위 코드처럼 location 프로퍼티가 추가된다고 하더라도 key의 타입을 keyof Person으로 해놓으면 key 프로퍼티에 자동으로 location도 "name"|"age"|"location" 처럼 유니언으로 추가된다.  
따라서 어떤 객체 타입의 프로퍼티의 갯수가 많더라도 혹은, 프로퍼티의 이름이 자주 바뀌거나 새로운 프로퍼티가 자주 추가되더라도, keyof 연산자를 사용할 경우 아주 쉽게 객체 타입의 프로퍼티 키들을 union타입으로 추출해낼 수 있게 된다.  

한가지 주의할 점은 keyof 연산자는 무조건 타입에만 사용할 수 있는 연산자이다.  
예를들어 `key: keyof person`과 같이 타입 혹은 인터페이스가 아닌 변수를 적용할 경우 바로 오류가 발생하게 된다.  
따라서 반드시 keyof 연산자는 뒤에 타입이 와야된다.  

### typeof 연산자와 함께 사용
```js
typeof person === "object"
```
위와같이 typeof 연산자는 자바스크립트에서 특정 변수의 타입을 string값으로 반환하는 연산자이다.  
typeof 연산자는 타입스크립트 에서 특별히 타입을 정의할 때 사용하면 동작이 다르게 바뀐다.  

실제 사용 문법은 아래와 같다.  

- src/chapter.ts
  ```ts
  const personA = {
    name: '유혁스쿨',
    age: 32
  }
  type PersonA = typeof personA;
  ```
personA 변수 선언부에 마우스를 올려보면 타입스크립트가 추론하는 변수 personA의 타입으로 정의가 잘 된것을 확인할 수 있다.  
즉, personA변수의 타입을 추론하여 PersonA라는 타입 별칭에 할당한것이다.  
typeof 연산자는 이런식으로 type을 정의할 때 사용하면 특정 변수의 타입을 뽑아내는 용도로도 활용할 수 있다.  
그렇기 때문에 keyof 연산자의 우측에 `keyof typeof 변수명` 형태로도 작성할 수 있게 된다.
- src/chapter.ts
  ```ts
  function getPropertyKeyD(person: Person, key: keyof typeof personA) {
    return person[key]
  }
  ```
typeof personA는 앞서 살펴본 personA변수의 타입을 타입스크립트가 추론한대로 객체 타입 형태로 뽑히게 된다.  
name 프로퍼티가 string으로, age 프로퍼티가 number인 객체 형태의 타입이다.  
이렇게 PersonA객체 타입으로 추출된 typeof personA 앞에 keyof 연산자를 적용할 경우 PersonA 객체의 프로퍼티를 유니온 타입으로 조합한 "name"|"age" 타입이 될것이다.  

</details>
<br>

## Mapped Type
<details>
<summary>펼치기/접기</summary>
<br>

기존의 객체 타입을 기반으로 새로운 객체 타입을 만드는 문법이다.  
Mapped Type도 이전 챕터에서 배운 keyof 연산자처럼 객체 타입을 조작하는 기능이다.  

### 예제1)
id, name, age 프로퍼티를 갖는 User타입 인터페이스를 정의한다.  
- src/chapter.ts
  ```ts
  interface IUser {
    id: number;
    name: string;
    age: number
  }
  ```

User 정보가 서버에 저장되어 있다고 가정하고, 1명의 User 정보를 불러오는 기능의 임시 함수를 만들어 본다.  
User 타입을 반환하도록 반환타입을 지정해주고, 임시로 User타입과 일치하는 형태의 객체를 반환해주도록 한다.  
- src/chapter.ts
  ```ts
  function fetchUserEx(): IUser {
    // 조회 기능
    return {
      id: 1,
      name: '유혁스쿨',
      age: 34
    }
  }
  ```

다음으로 1명의 User 정보를 수정하는 기능의 함수를 만들어 본다.  
매개변수로는 수정하기 위한 User타입의 객체를 받는다.  
- src/chapter.ts
  ```ts
  function updateUserEx(user: IUser) {
    // 수정 기능
  }
  ```

User정보를 수정해야한다고 가정하고 updateUser를 호출해 본다.  
첫번째 인수로 User객체 값을 넣어줘야한다.  
객체 리터럴로 넣어주되, 변경되길 원하는 프로퍼티의 값만 바꿔서 넣어준다.  
예를들어 기존 User의 값이 id가 1이고 name이 유혁스쿨, age가 34이라고 가정 했을 때 age의 값만 32로 수정하고 싶다면 age 프로퍼티값만 34로 변경한 형태의 User 객체를 넘기면 된다.  
- src/chapter.ts
  ```ts
  updateUserEx({
    id: 1,
    name: '유혁스쿨',
    age: 32
  })
  ```

이때 아쉬운 점은 id랑 name 프로퍼티는 기존 값을 그대로 유지한다는 점이다.  
이 경우 굳이 변경하려는 age 프로퍼티 외에 id와 name 두 프로퍼티의 값 까지 포함하여 다 보낼 필요가 있을까 하는 의문이 든다.  
물론 지금은 프로퍼티가 3개밖에 없어 괜찮으나, 프로퍼티가 10개가 넘어간다면 일일이 변경하지 않을 값 까지 다 써야 한다.  
변경하지 않는 값은 제외하고 변경되는 값인 age 프로퍼티만 객체에 담아 전달하고 싶다.  
- src/chapter.ts
  ```ts
  updateUserEx({
    age: 32 // [Error] Type '{ age: number; }' is missing the following properties from type 'User': id, namets(2345)
  })
  ```

그러나 현재 매개변수의 타입은 User객체 타입 자체로 되어 있기 때문에 선택적으로 수정하길 원하는 프로퍼티만 전달하기 어려운 상황이다.  
이럴 때 어쩔 수 없이 새로운 인터페이스 IPartialUser를 만들고, User 타입의 모든 프로퍼티를 복사한 다음 선택적 프로퍼티로 타입을 새로 구성해 준 뒤 메소드의 매개변수 타입을 해당 인터페이스로 변경해줘야 한다.  
- src/chapter.ts
  ```ts
  interface IPartialUser {
    id?: number;
    name?: string;
    age?: number
  }
  function updateUserEx(user: IPartialUser) {
    // 수정 기능
  }
  updateUserEx({
    age: 32
  })
  ```
매개변수 user에는 모든 프로퍼티가 있어도 되고 없어도 되는 IPartialUser 타입이 되었으므로, 수정하길 원하는 프로퍼티만 선택적으로 구성한 형태의 객체 전달이 가능해졌다.  
user정보를 수정하는 기능 하나 만들기 위해 동일한 IPartialUser 인터페이스를 중복으로 하나 더 정의했다.  

이와 같은 상황에 Mapped Type을 사용하면 이러한 비효율적인 문제를 해결할 수 있다.  

#### Mapped Type 적용  
Mapped Type의 경우 인터페이스에서는 만들 수 없다.  
PartialUser 이름의 타입 별칭을 선언한 뒤, 블록 안에서 마치 인덱스 시그니처를 사용하는것 처럼 대괄호를 열고 `[key in 'id'|'name'|'age']` 형태의 문법으로,
User객체의 모든 프로퍼티 키들을 union타입으로 적용한 뒤, 대괄호 우측에 콜론을 입력하고, 원본 인터페이스인 IUser[key] 형태로 작성한다.  

- src/chapter.ts
  ```ts
  type PartialUser = {
    [key in 'id'|'name'|'age']: IUser[key]
  }
  ```
언뜻 보면 인덱스 시그니처 같기도 하지만, 콜론 대신 in연산자가 나오고 뒤에는 union이 따라 붙는다.  
해당 문법을 해석해보면 대괄호 안은 인덱스 시그니처와 마찬가지로 PartialUser타입 별칭이 적용될 객체의 프로퍼티 키가 무엇이 될지를 정의하는 곳이다.  
대괄호 바깥인 콜론 뒤에 정의한 IUser[key]의 경우 대괄호 내에 union으로 정의한 프로퍼티 키들이 어떤 value의 타입을 가질 것인지를 정의하는 곳이다.  
  
좀 더 상세하게 해석해 보자면 먼저 key를 정의하는 곳에는 in이라는 연산자가 쓰이고 우측에는 string 리터럴 union 타입이 위치하는데 이는 객체 타입에 key 값으로 id,name,age가 있을 수 있다는 뜻이다.  
이렇게 정의한 객체 타입은 무조건 id, name, age 프로퍼티를 갖게 된다.  
인덱스 시그니처와의 차이점으로는 콜론이 아닌 in연산자를 사용한다.  
  
다음으로 대괄호 바깥 우측의 콜론 옆은 value의 타입을 정의하는 부분이다.  
해당 영역 또한 인덱스드 액세스 타입 문법과 유사하다.  
여기서 인덱스로 사용한 key는 좌측에서 string 리터럴 타입인 id, name, age 타입의 유니온 타입 각각의 프로퍼티 대해 각각 한번씩 적용된다.  
즉, IUser의 key가 id일 때는 value의 타입이 IUser객체의 id 즉 IUser["id"]이고 age일 때는 value의 타입이 IUser객체의 age IUser["age"], key가 name일때는 value의 타입이 IUser["name"]이 되는 것이다.  
이런 식으로 만들어진 객체 타입은 IUser["id"]가 곧 인덱스드 액세스 타입이기 때문에 IUser인터페이스의 id 프로퍼티에 정의한 타입인 number타입이 된다.  
마찬가지로 name일 경우 string, age일 경우 number 타입이 된다.  
결론적으로 이렇게 만든 Mapped Type은 id는 number, name은 string, age는 number인 객체 타입이 된다.  

결국 id는 number, name은 string, age는 number 즉, 동일한 타입을 만든 셈이다.  
앞서 모든 프로퍼티가 선택적 프로퍼티가 되는 것을 원했다.  
MappedType에서 key가 끝나는 지점에 대괄호가 끝나는 지점에 일반적인 프로퍼티에 적용하듯 `[key in 'id'|'name'|'age']?: IUser[key]` 와 같이 ?를 붙히면 된다.
- src/chapter.ts
  ```ts
  type PartialUserA = {
    [key in 'id'|'name'|'age']?: IUser[key]
  }
  ```
이와같이 적용할 경우 Mapped Type이 정의하는 모든 프로퍼티가 다 선택적 프로퍼티가 된다.  
타입에 커서를 올려보면 모든 프로퍼티가 선택적 프로퍼티가 된 것을 확인할 수 있다.
```ts
type PartialUserA = {
    age?: number | undefined;
    id?: number | undefined;
    name?: string | undefined;
}
```

이렇게 Mapped Type을 이용하면 특정 객체 타입을 원하는 대로 변환할 수 있기 때문에, 하나의 객체 타입으로 굉장히 다양한 상황에 대처할 수 있게 된다.  

### 예제2)
모든 프로퍼티의 value 타입이 number string number으로 되어있는 IUser타입을 모두 Boolean타입으로 변형해본다.
BooleanUser라는 이름의 타입 별칭을 정의한 뒤, 블록 내에서 Mapped Type 문법을 적용한다.  
좌측에는 이전에 정의했던것과 동일하게 in연산자를 활용하여 모든 프로퍼티 키 이름을 string 리터럴 유니온 타입으로 묶어준 뒤,
콜론을 기준으로 우측항에 boolean타입을 지정해준다.  
- src/chapter.ts
  ```ts
  type BooleanUser = {
    [key in "id"|"name"|"age"]: boolean
  }
  ```

BooleanUser 타입 이름에 마우스 커서를 올려보면
```ts
type BooleanUser = {
    age: boolean;
    id: boolean;
    name: boolean;
}
```
형태로 모든 프로퍼티가 boolean 타입으로 정의된 것을 확인할 수 있다.  

#### Mapped Type에 keyof 연산자 활용
만약 IUser타입의 프로퍼티의 개수가 많아져, 대괄호 내 string 리터럴 유니온타입으로 일일이 나열하기 힘든 경우 keyof 연산자를 활용할 수 있다.
이전 챕터에서 배운 keyof 연산자란 `keyof {타입}` 형태로 작성되며, 타입내 구성된 모든 프로퍼티 항목들을 string 리터럴 유니온 타입으로 반환해주는 연산자였다.
- src/chapter.ts
  ```ts
  type BooleanUser2 = {
    [key in keyof IUser]: boolean
  }
  ```
위와같이 keyof 연산자로 IUser 객체 타입을 지정해주면
```ts
type BooleanUser2 = {
    id: boolean;
    name: boolean;
    age: boolean;
}
```
형태로 IUser인터페이스의 모든 프로퍼티가 자동으로 BooleanUser 타입에 적용되는것을 확인할 수 있다.  

참고로 대괄호 내 in연산자 좌측항에 정의한 key 키워드의 이름은 key뿐만 아니라 다른 이름으로도 임의로 적용할 수 있다.  
```ts
[prop in keyof IUser]: Iuser[prop]
```

### 예제3)
이전에 정의한 User 조회 기능을 가진 fetchUser() 함수에서 반환하는 IUser 타입의 모든 프로퍼티가 read-only 즉, 읽기전용인 객체를 반환하도록 타입을 만들어본다.  
- src/chapter.ts
  ```ts
  type ReadonlyUser = {
    readonly [key in keyof IUser]: IUser[key]
  }
  ```
위와같이 IUser 인터페이스의 모든 key에 대한 value타입을 Mapped type 문법을 적용하여 수집한뒤, 해당 문법 좌측 맨 앞에 readonly 키워드를 적용한다.  
```ts
type ReadonlyUser = {
    readonly id: number;
    readonly name: string;
    readonly age: number;
}
```
형태로 모든 프로퍼티에 읽기전용 속성이 부여된 것을 확인할 수 있다.  
실제로 fetchUser() 함수에 Mapped Type 문법이 적용된 타입을 반환타입으로 지정한 뒤, 해당 함수를 호출하고 반환받은 객체를 변수에 할당한 후 프로퍼티에 접근하여 값을 변경할 경우 수정할 수 없게 된다.  
- src/chapter.ts
  ```ts
  function fetchUserB(): ReadonlyUser {
    return {
      id: 1,
      name: '유혁스쿨',
      age: 34
    }
  }
  const user = fetchUserB();
  user.id = 2; // [Error] Cannot assign to 'id' because it is a read-only property.ts(2540)
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
