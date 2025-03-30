/* 
## 인덱스드 엑세스 타입
인덱스드 엑세스 타입이란?  
인덱스라는 것을 이용하여 다른 타입 내에 특정 프로퍼티의 타입을 추출하는 그런 타입이다.  
인덱스드 액세스 타입은 객체, 배열, 튜플에 모두 사용할 수 있기 때문에 세 가지 예시를 순서대로 모두 살펴보도록 한다.  
*/

/* 
### 인덱스드 액세스 타입 - 객체 타입 예제
커뮤니티의 특정 게시글 하나의 타입으로 제목을 의미하는 string 타입의 title과 본문을 의미하는 string 타입의 contents 그리고 작성자 프로퍼티로 구성된 인터페이스 Post를 구현한다.
*/
interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
  };
}
/* 
포스트 타입을 갖는 변수를 선언해 준다.  
*/
const post:Post = {
  title: "게시글 제목",
  content: "게시글 본문",
  author: {
    id: 1,
    name: "유혁스쿨"
  }
}

/* 
게시글에서 작성자의 이름과 아이디를 붙여서 출력하는 함수가 있다고 가정하고 printAuthorInfo() 함수를 구현해 본다.  
해당 함수에는 게시글 작성자의 id와 name을 붙여 출력하는 기능을 해야 되기 때문에 특정 게시글의 작성자를 매개변수로 받아야 된다.  
따라서 author를 매개변수로 받아준 뒤 함수 내부에서 템플릿 리터럴을 이용하여 author의 name과 id를 붙여 출력해주도록 한다.
*/
function printAuthorInfo(author) {
  console.log(`${author.name}-${author.id}`)
}
/* 
이렇게 작성을 하고 보면 매개변수 author에 타입을 정의해주지 않았기 때문에 오류가 발생한다.  
매개변수 author에는 어떤 타입을 지정해줘야 할까?  
지금까지 배워온 문법대로 해보면 객체 리터럴 타입으로 post 타입의 author를 단순히 지정해 주면 된다.  
이후에는 printAuthorInfoA메소드를 호출하고, 인수로는 post.author로 author 프로퍼티를 넘겨주면 될것이다.  
*/
function printAuthorInfoA(author: {id: number; name: string}) {
  console.log(`${author.name}-${author.id}`)
}
printAuthorInfoA(post.author);

/* 
그러나 위와 같은 방식으로 타입을 정의해도 어떤 문제가 발생하지는 않지만, 갑자기 post타입에서 author 프로퍼티의 작성자의 나이를 포함하라는 수정 요구사항이 떨어지게 되면 age property를 새롭게 만들어 줘야 한다.
*/
interface PostA {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age: number // 새로운 프로퍼티 추가
  };
}
/* 
PostA 타입을 갖는 postA변수에서도 author 프로퍼티의 객체안에 27값을 할당한 age프로퍼티를 추가해줘야 된다.  
*/
const postA:PostA = {
  title: "게시글 제목",
  content: "게시글 본문",
  author: {
    id: 1,
    name: "유혁스쿨",
    age: 27 // 새로운 프로퍼티 정의
  }
}

/* 
함수에도 author 매개변수의 타입에 number타입 age 프로퍼티를 별도로 추가해줘야 될것이다.
*/
function printAuthorInfoB(author: {id: number; name: string; age: number}) {
  console.log(`${author.name}-${author.id}`)
}
/* 
지금은 함수가 하나밖에 없어 그냥 추가해주면 되긴 했지만, 만약 author 객체 매개변수를 받는 함수가 여러개가 된다면 어떨까?
PostB 인터페이스의 author 프로퍼티 객체타입 내부에 location 프로퍼티가 또 새롭게 추가된다면, 모든 함수의 매개변수 타입에 location 프로퍼티를 추가하고 타입을 지정해줘야한다.  
*/

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

/* 
이런 경우에 바로 인덱스드 액세스 타입을 이용하면 좋다.  
인덱스드 액세스 타입은 이러한 객체 타입으로부터 특정 프로퍼티의 타입을 쏙 뽑아서 변수에 정의해줄 수 있도록 도와주는 좋은 문법이다.  

사용법은 아래와 같다.  
author 매개변수의 타입으로 Post인터페이스를 지정해주고, 타입 바로 옆에 객체의 괄호 표기법을 쓰듯 대괄호를 열어준 다음 string 리터럴 타입으로 뽑아내고 싶은 프로퍼티의 타입을 작성해주면 된다.
`(author: Post['author'])`  
이렇게 작성할 경우, Post타입으로부터 author프로퍼티의 value타입인 객체만 뽑아 추출해주는 것이다.  
author 매개변수에 마우스를 올려보면 `author: { id: number; name: string; }`와 같이 원하는 대로 특정 프로퍼티 타입만 추출, 적용된것을 확인할 수 있다.  
*/
function printAuthorInfoF(author: Post['author']) {
  console.log(`${author.name}-${author.id}`)
}

/* 
추가로 인덱스드 액세스 타입을 이용하면 좋은 점은 author 객체에 `location: string`과 같이 새로운 프로퍼티가 추가되거나, id는 number타입이였는데 string으로 기존 프로퍼티 타입이 변경되었을 때에도 
즉시 반영을 해주기 때문에 원본 타입이 수정되더라도 별도로 추가적인 작업을 해주지 않아도 되어 굉장히 편리하다.  
참고로 이때 인덱스드 액세스 타입에서 string 리터럴 타입을 특별히 `인덱스` 라고 부른다.  
인덱스를 이용해서 특정 타입의 프로퍼티에 접근하는 의미로 인덱스드 액세스 타입이라고 부르는 것이다.  
*/

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
/* 
### 인덱스드 액세스 타입 사용 주의점
1. 인덱스에 들어가는 문자열은 값이 아닌 타입이다.  
입문자들이 굉장히 많이 햇갈리는 부분으로, 예를들어 author라는 문자열을 key라는 변수에 할당하고, 기존 인덱스 위치에 할당할 경우 오류가 발생한다.  
인덱스에 들어올수 있는 것은 오로지 타입만 들어올 수 있는데, key는 타입이 아닌 변수, 곧 값이기 때문에 오류가 발생한것이다.  
*/
const key = "author"
function printAuthorInfoH(author: PostD[key]) { // [Error] Type 'key' cannot be used as an index type.ts(2538)
  console.log(`${author.name}-${author.id}`)
}
/* 
인덱스드 액세스 타입에서 인덱스 위치에는 오로지 타입만 올 수 있다.  
따라서 변수 key가 아닌 string 리터럴 타입을 갖는 type을 선언하여 적용할 경우 오류가 발생하지 않게 된다.  
*/
type inedxKey = "author"
function printAuthorInfoI(author: PostD[inedxKey]) {
  console.log(`${author.name}-${author.id}`)
}
/* 
2. 존재하지 않는 프로퍼티 이름 사용불가
PostD타입에 존재하지 않는 프로퍼티를 인덱스 위치에 적용할 경우 프로퍼티가 없다는 오류를 출력한다.
*/
function printAuthorInfoJ(author: PostD["what"]) { // [Error] Property 'what' does not exist on type 'PostD'.ts(2339)
  console.log(`${author.name}-${author.id}`)
}
/* 
3. 중첩 프로퍼티 탐색
PostD 타입의 author 프로퍼티 하위의 name, id 프로퍼티의 타입만 가져오고 싶을경우 author 프로퍼티의 타입을 인덱스드 액세스 문법으로 가져온 뒤,  
동일한 방식으로 대괄호를 통해 name과 id 프로퍼티를 가져올 수 있다.  
*/
function printAuthorInfoK(name: PostD["author"]["name"], id: PostD["author"]["id"]) {
  console.log(`${name}-${id}`)
}

/* 
### 인덱스드 액세스 타입 예제 2 - 배열 타입
인터페이스는 객체 타입 정의에만 특화되어 있기 때문에 배열 타입을 정의하기엔 불편하다.  
따라서 타입 별칭으로 선언하도록 한다.  
이전 Post 인터페이스를 타입 별칭으로 변경하고, 마지막에 대괄호를 추가해준다.  
포스트 타입의 요소 여러 개를 저장하는 포스트 리스트 타입으로 변경되었다.  
인덱스드 액세스 타입을 이용하여 배열 타입으로 부터 배열 요소의 타입인 Post 객체 타입을 추출하여 적용해본다.
*/
type PostList = {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age: number;
  };
} []
/* 
변수에 배열 타입을 적용하고, 인덱스드 액세스 타입을 활용하여 요소의 타입 하나만 추출한다.  
대괄호안에 number를 적용할 경우 배열 타입으로부터 요소의 타입을 잘 추출해온 것을 확인할 수 있다.  
배열의 모든 인덱스는 기본적으로 number타입 이므로 배열의 인덱스 타입인 number 타입을 적용한것이다.  
이때, 대괄호에 number 타입이 아닌 실제 인덱스로 배열에 접근하는 것처럼 number 리터럴 타입인 0, 1 등의 숫자를 넣어도 오류없이 정상적으로 작동한다.  
*/
const postB: PostList[number] = {
  title: "게시글 제목",
  content: "게시글 본문",
  author: {
    id: 1,
    name: "유혁스쿨",
    age: 27
  }
}
const postC: PostList[3] = {
  title: "게시글 제목",
  content: "게시글 본문",
  author: {
    id: 1,
    name: "유혁스쿨",
    age: 27
  }
}
/* 
마찬가지로 주의할 점은 3은 값이 아닌 타입이다.  
number 리터럴 타입이기 때문에 예를들어 `const num = 3;`을 선언한 뒤 아래와 같이 num을 인덱스에 적용할 경우 오류가 발생하게 된다.  
따라서, 이전 예제와 같이 인덱스에 들어가는 값은 무조건 타입이어야만 한다.
*/
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

/* 
함수의 매개변수 타입을 바꿔보도록 한다.  
객체타입인 Post가 아닌 배열 타입에서 객체를 뽑아야하기 때문에 number 혹은 number 리터럴 타입으로 접근한 뒤, author 라는 string 리터럴 타입을 통해 author 프로퍼티를 추출한다.
*/
function printAuthorInfoL(author: PostList[3]["author"]) {
  console.log(`${author.name}-${author.id}`)
}

/* 
### 인덱스드 액세스 타입 예제3 - 튜플
number, string, boolean 타입을 요소로 갖는 튜플 타입을 선언한 뒤, 각 튜플 타입을 인덱스드 액세스 타입을 통해 접근하여 개별 타입으로 추출할 수 있다.  
*/
type Tup = [number, string, boolean]
type Tup0 = Tup[0] // number type
type Tup1 = Tup[1] // string type
type Tup2 = Tup[2] // boolean type
/* 
또한, 튜플 타입은 길이가 고정된 배열이기 때문에 존재하지 않는 인덱스 타입을 추출하려고하면 오류가 발생한다.
*/
type Tup3 = Tup[3] // Error]Tuple type 'Tup' of length '3' has no element at index '3'.ts(2493)
/* 
배열타입을 추출할 때처럼 인덱스에 number를 적어도 문제없다.  
이 경우 튜플 타입안에 있는 모든 타입의 최적의 공통 타입을 뽑아온다.  
마우스 커서를 올려보면 3개 타입의 최적의 공통 타입인 3개 타입의 유니온 타입으로 추출하게 된다.
*/
type Tup4 = Tup[number]

/* 
인덱스드 액세스 타입은, 복잡하고 큰 타입으로부터 잘게잘게 필요한 만큼만 타입을 추출할 수 있기 때문에 실무에서도 굉장히 요긴하게 사용할 수 있다.  
*/