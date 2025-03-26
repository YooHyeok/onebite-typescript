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
