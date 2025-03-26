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
