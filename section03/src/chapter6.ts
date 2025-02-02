/* 
# 타입 단언
타입 단언에 대해 살펴보기 전, 타입 단언이 어떤 상황에 필요한지 살펴본다.
타입스크립트는 대부분의 상황에 변수의 타입을 자동으로 잘 추론한다.  
Person이라는 타입 별칭을 정의한 후 빈 person1객체를 선언한 뒤 타입 어노테이션을 Person으로 지정한다.
person1객체에는 프로퍼티가 존재하지 않으므로 오류가 발생할것이다.  

만약 빈 객체로 변수의 값을 초기화 해놓고 나중에 person1.name, person.age과 같이 동적으로 프로퍼티를 추가하고 값을 할당하고 싶다면 어떻게 해야 할까?
굳이 타입 정의를 해 놓은것이 문제가 되는거 같아 타입어노테이션을 적용하지 않은 person2 변수를 선언하여 동적 추가에 대한 동일한 코드를 새롭게 구현한다면,  
person2 변수의 타입이 초기화 값인 빈 객체를 기준값으로 추론되어버리기 때문에 person2변수의 타입이 `let person2: {}`와 같이 빈 객체가 되어버린다.
때문에 프로퍼티 동적 추가시 프로퍼티가 없다는 경고와 함께 에러가 발생한다.  
그렇다고 any타입을 쓰기에는 좋지 않은 방법이다.  
 */
type Person = {
  name: string;
  age: number;
}
let person1: Person = {} // Type '{}' is missing the following properties from type 'Person': name, agets(2739)
person1.name = "유재혁";
person1.age = 34;

let person2  = {}
person2.name = "유재혁"; // Property 'name' does not exist on type '{}'.ts(2339)
person2.age = 34; // Property 'age' does not exist on type '{}'.ts(2339)

/* 
## Type Assertion - as 키워드 활용
이와같이 의도와 다르게 변수의 타입이 추론되어 버리기 때문에 원하는 기능을 만들기 어려울 때 초기화 값의 타입을 as 키워드를 활용하여 단언할 수 있다.
`let person3 = {} as Person;` 형태로 값 뒤에 as키워드를 사용하고 타입을 명시한다.
해당 문법을 사용할 경우 {} 값을 타입스크립트 컴파일러에게 Person타입으로 간주하라고 알려주게 된다.
이렇게 값의 타입을 개발자가 직접 단언하는 방법을 타입스크립트에서는 타입 단언 또는 영어로 Type Assertion이라고 부른다.  
Person타입으로 단언된 초기화값을 기준으로 타입 추론이 이루어지기 때문에 person3변수에 마우스 커서를 올려보면 `let person3: Person`과 같이 Person타입으로 추론되는것을 볼 수 있으며 에러도 모두 사라졌다.  
*/

let person3 = {} as Person;
person3.name = "유재혁";
person3.age = 34;

/* 
### Type Assertion 예제
*/
type Dog = {
  name: string;
  color: string;
}
let dog: Dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도"
}
/* 
위와 같이 선언할 경우 초과 프로퍼티 검사가 발동한다.  
변수를 초기화할 때 초기화하는 값으로 객체 리터럴을 사용하면 초과 프로퍼티 검사가 발동하여 breed같은 Dog타입에 없는 추가적인 프로퍼티에 대해서는 허용하지 않는다.  
그러나 정말 어쩔수 없이 breed라는 추가 프로퍼티까지 같이 넣어야하는 상황이 생긴다면 타입 단언을 이용할 수 있다.  
(객체 값이 Dog타입으로 단언되었기 때문에 타입어노테이션을 선언하지 않아도 자동으로 dog2변수가 Dog타입으로 추론까지 된다.)  
 */
let dog2 = {
  name: "돌돌이",
  color: "brown",
  breed: "진도"
} as Dog

/* 
## 타입단언규칙
이러한 타입 단언은 아무 상황에서나 막 쓸수있는 문법은 아니다.  
타입 단언을 사용하기 위해서는 적어도 한가지 규칙을 만족해야 한다.  
타입 단언의 규칙은 `값 as 단언` 형태의 단언식에서 값의 타입을 A라고 하고 단언하는 타입을 B라고 했을 때 `A as B` A가 B의 슈퍼타입이거나 또는 반대로 A가 B의 서브타입이어야 한다.  
*/

/* 
### 타입단언규칙 예제1)
num1 변수에 10을 저장하고 as never과 같이 never타입으로 단언할 경우 타입 단언이 잘 이루어진다.  
변수에 마우스 커서를 올려보면 `let num1: never`과 같이 never타입으로 잘 추론된다.  
이것이 가능한 이유는 10은 number타입이고, never타입은 모든 타입의 서브타입이기 때문에 A가 B의 수퍼타입인 조건을 만족하여 타입 단언이 이루어진것이다.  
*/

let num1 = 10 as never;

/* 
### 타입단언규칙 예제2)
변수에 10을 저장하고 as unknown과 같이 unknown타입으로 단언할 경우에도 타입 단언이 잘 이루어진다.  
또한 num2 변수에 커서를 올릴 경우 `let num2: unknown`과 같이 unknown타입으로 잘 추론된다.  
unknown타입은 모든 타입의 수퍼타입인 전체집합이기 때문에 number타입인 A가 unknown타입인 B의 서브타입인 조건을 만족하여 타입 단언이 이루어진것이다.  
*/
let num2 = 10 as unknown;

/* 
### 타입단언규칙 예제3)
변수에 10을 저장하고 as string과 같이 string타입으로 단언할 경우 타입 단언이 허용되지 않는다.  
오류 메시지가 발생하는데, number타입을 string타입으로 변환하는 작업은 실수일 수 있다. 두 형식이 충분히 겹치지 않는다 라고 알려준다.  
number타입인 A와 string타입인 B는 서로 겹치는 값이 없으므로 교집합이 없는 타입들이다.  
즉 a가 b의 수퍼타입도, 서브타입도 아니기 때문에 이런 타입 단언은 충분히 겹치지 않는다고 하며 타입단언에 실패하는것이다.  
*/
let num3 = 10 as string;

/* 
A가 B의 수퍼타입이거나 B가 A의 서브타입이어야 하는 이러한 두가지 규칙을 만족해야만 타입 단언이 가능한 이유는
A ⊃ B 혹은 B ⊃ A 과 같은 부분집합 관계일때 겹치는부분이 B만큼 혹은 A만큼은 있기 때문에 전혀 겹치는 부분이 없는 서로소 관계의 타입들보다는 오류가 발생할 가능성이 훨씬 낮아진다.  
애초에 타입 단언 자체가 그렇게 안전한 문법은 아니지만, 적어도 겹치는 부분이 조금이라도 있어야 허용해준다.  
*/

/* 
## 다중 단언
그러나 서로소 관계의 타입에서 발생하는 타입단언 오류를 성공시킬 방법이 하나있긴 하다.  
정수 10에대한 값을 as string 하기 전 `as unknown as string;`과 같이 중간에 unknown으로 한번 바꿔주는것이다.  
첫번째로 10은 number타입이고, unknown 타입은 모든 타입의 전체 집합이기 때문에 A가 B의 서브타입인 규칙에 만족하기 때문에 단언이 이루어 질 수 있으며  
두번째로는 unknown타입 A는 string타입 B의 수퍼타입이기 때문에 A가 B의 수퍼타입인 규칙에 만족하므로 단언이 이루어질 수 있는것이다.  
이렇게 중간에 unknown타입을 끼고 다중으로 단언을 하면 단언이 되지 않는 타입도 단언을 해줄 수 있게 된다.  
그러나 이 방법은 절대 좋은 방법이 아니다.  
개발을 하는 도중 정말 어쩔수 없는 상황에서만 가끔 사용하고, 왠만해서는 이러한 치트키 같은 방법을 사용하지 않는것을 권장한다.  
이렇게 사용한다면 사실 타입스크립트를 쓸 이유가 없기 때문이다.  
*/
let num4 = 10 as unknown as string;

/* 
## const 단언
const단언이란 let 키워드로 변수를 선언하고 10이라는 값을 할당할 경우 해당 변수에 커서를 올려보면 number타입으로 추론된다.  
이때 as const로 단언할 경우 `let num5: 10`과 같이 리터럴타입 10으로 추론된다.  
이런 const 단언은 마치 `const num6 = 10;`처럼 const키워드로 변수를 선언하는 것과 동일한 효과를 보도록 만들어주는 단언이다.  
*/
let num5 = 10 as const;
const num6 = 10;

/* 
### const 단언 - 객체
아래와 같이 cat1 변수를 let 키워드로 선언할 경우 name 프로퍼티와 color 프로퍼티가 각각 string타입인 객체 타입으로 추론된다.  
만약 cat2 변수로 동일하게 선언한 후 as const로 타입단언을 하게될 경우 모든 프로퍼티가 `readonly` 읽기전용 프로퍼티가 된 객체로 추론된다.  
이렇게 as const로 타입단언한 객체는 프로퍼티의 값을 수정할 수 없는 객체가 된다.  
따라서 이러한 const 단언을 이용하면 프로퍼티가 굉장히 많은 객체를 초기화 할 때도 일일이 타입을 정의해서 readonly 키워드를 붙여줄 필요가 없으며,  
아무리 프로퍼티 개수가 많더라도 마지막에 as const라는 타입단언 키워드만 붙여주면 모든 프로퍼티를 readonly프로퍼티로 만들 수 있기 때문에 상황에 따라 굉장히 편리하게 사용할 수 있다.  
*/
let cat1 = {
  name: "야옹이",
  color: "yellow"
}

let cat2 = {
  name: "야옹이",
  color: "yellow"
} as const

cat2.name = '' // Cannot assign to 'name' because it is a read-only property.ts(2540)

/* 
## Non Null 단언 (! 연산자)
Non Null 단언이란 어떤 값이 null이거나 undefined가 아니라는 것을 타입스크립트 컴파일러에게 알려주는 역할을 한다.  
커뮤니티의 게시판에는 익명이 가능하다.  
따라서 익명으로 글을 쓰면 author 프로퍼티 같은 값은 없을수도 있다고 가정하여 author프로퍼티에 ?를 붙혀 Optional(선택적) 프로퍼티로 적용한다.  
number 타입의 변수 len을 선언한 뒤 .연산자로 post 객체에 author프로퍼티에 접근한 뒤 length속성을 한번 더 접근하여 len 변수에 할당해 준다.  
이때 length속성에 접근하는 순간 앞서 접근한 author프로퍼티 바로 뒤에 `post.author?.length`와 같이 물음표 키워드가 추가가 된다.  
여기서 추가된 물음표 키워드는 자바스크립트에서 제공하는 옵셔널 체이닝이라는 키워드이다.  
옵셔널 체이닝이란 author 프로퍼티의 값이 null이거나 undefined일 경우에 .표기법으로 접근하면 오류가 발생하기 때문에 ?를 붙혀주면 author라는 프로퍼티가 없으면 값 전체가 undefined가 되도록 만들어주는 연산자이다.  

다시 코드로 돌아와보며 변수 len에 오류가 발생하는것을 확인할 수 있다.  
오류가 발생한 곳에 마우스 커서를 올려보면 number |(유니온) undefined 형식은 number 타입에 할당할 수 없다고 출력된다.  
옵셔널 체이닝을 사용하고 있기 때문에 값 자체가 undefined가 될수 있다.  
number타입으로 정의한 변수에 undefined 값은 들어갈 수 없기 때문에 오류가 발생하는것이다.  

이렇게 옵셔널 체이닝을 이용하면 우리가 원하는 동작을 할 수 없고, 이 경우 non null 단언을 사용하면 되는데, 옵셔널 체이닝 문법인 ?를 ! 로바꿔주기만 하면 된다.  
author 프로퍼티는 진짜 있다 라고 강조하는 효과이다.  
!연산이 non null 단원 연산자로 as 같은걸 사용하지 않고 !만 프로퍼티 뒤에 붙여주면 해당 프로퍼티의 값이 null 혹은 undefined가 아닐것이라고 타입스크립트 컴파일러가 믿도록 만든다.  
따라서 author값이 null 혹은 undefined가 아닌 무조건 string일 것이라고 믿기 때문에 string.length에 접근하여 number타입 변수에 값을 할당할 수 있게 되는것이다.  
*/
type Post = {
  title: string;
  author?: string; // Optional(선택적) 프로퍼티
}

let post: Post = {
  title: "게시글1",
  author: "유재혁"
}
/* 이름의 길이가 몇개인지 출력하는 기능 구현 */
const len1: number = post.author?.length
const len2: number = post.author!.length