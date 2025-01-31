/** 기본 타입간의 호환성
특정 타입을 다른 타입으로 취급해도 괜찮은지 판단하는 것이다.
아래와 같이 number타입과 number literal 타입변수가 각각 있을 때 number literal 타입의 값을 number 타입의 값에 할당하는것은 허용된다.
number 타입이 number literal 타입보다 더 큰 super타입이기 때문에 즉, 업캐스팅이라서 가능하다.
 */
let num1: number = 10;
let num2: 10 = 10;

num1 = num2;
num2 = num1; // 더 작은 서브타입으로 다운캐스팅 불가능

/** 객체 타입간의 호환성
→ 어떤 객체 타입을 다른 객체 타입으로 취급해도 괜찮은가?

Animal이라는 동물 타입이 있다고 가정한다.  
해당 타입은 객체 타입으로 name: string, color: string으로 두개의 프로퍼티를 갖는 객체이다.  
그 다음 동물중에 강아지라는 Dog 타입을 추가로 정의한다.  
강아지도 동물이기 때문에 동물 타입과 똑같이 name과 color 프로퍼티를 똑같이 정의해준다.  
특별히 견종이 나뉘므로 breed라는 견종 property를 추가로 만든다.  
다음으로 각각의 타입을 갖는 객체를 실제로 만든다.  
animal 변수에 dog를 집어넣으면 오류가 발생하지 않지만 [반대]로 dog 변수에 animal을 집어넣으면 오류가 발생한다.  
업/다운 캐스팅 용어로 정리하자면 Animal 타입은 Dog타입을 포함하는 Super타입이고, Dog타입은 Animal 타입의 서브타입이 된다.  
이렇듯 객체 타입도 기본타입처럼 서로 슈퍼/서브 타입 관계를 갖는다.  
객체 타입은 슈퍼/서브 타입 관계를 갖는 기준은 property를 기준으로 관계를 갖게된다.  
Dog타입이 더 작은 서브타입인데 Dog타입의 프로퍼티를 보면 animal타입의 프로퍼티를 모두 가지고 있으며, breed라는 추가 프로퍼티 까지 가지고 있다.  
이 경우 dog타입이 가진게 더 많으니 Dog타입이 더 큰 타입이 아닐까 생각할 수 있다.  
그러나 그 반대이다.  

타입스크립트는 `프로퍼티를 기준`으로 타입을 정의하는 `구조적 타입 시스템`을 따른다.
그렇기 때문에 Animal 타입은 name과 color 프로퍼티가 있는 객체는 다 Animal 타입으로 간주하며,  
Dog타입은 구조적으로 name과 color 추가로 breed 프로퍼티 까지 3개를 가진 객체는 다 Dog 타입으로 간주한다.
Dog타입에 해당되는 객체는 name, color, breed를 무조건 갖고 있는 객체 이므로 Animal 타입에도 해당되는 객체가 된다.  
Dog타입에 해당되면 name과 color는 무조건 있을것이기 때문에 Animal 타입 규칙에도 해당이 된다.  
만약 breed라는 추가 프로퍼티를 갖고 있는 객체라고 하더라도 name과 color만 있으면 모두 Animal 타입이기 때문에  
Dog타입의 값들도 결국 모두 Animal 타입의 값으로 포함될 수 있는 것이다.

반면, Animal 타입의 객체들은 모두 Dog타입에 포함된다고 보긴 어렵다.  
Dog타입의 객체가 되기 위해서는 breed라는 추가적인 프로퍼티까지 가지고 있어야 하는데,  
Animal 타입에 해당되는 객체들에는 breed라는 프로퍼티를 가지지 않은 객체들도 있을 수 있다.  
따라서 객체 타입들 간의 관계를 정의할 때는 Dog 타입처럼 breed같은 추가 프로퍼티가 있는 타입이 수퍼타입이 되는것이 아닌  
반대로 추가 프로퍼티가 없는 조건이 더 적은 타입이 수퍼타입이 된다.  
그렇기 때문에 Animal 타입의 변수 animal에는 Dog타입의 변수인 dog를 업캐스팅이기 때문에 할당할 수 있지만  
반대로 Dog 타입의 변수에는 Animal 타입의 변수를 다운캐스팅이기 때문에 할당할 수 없는것이다.

 */
type Animal = {
  name: string;
  color: string;
}

type Dog = {
  name: string;
  color: string;
  breed: string; // 견종
}

let animal: Animal = {
  name: "기린",
  color: "yellow"
}

let dog: Dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도"
}

animal = dog; // 업캐스팅 - Animal: Super / Dog: Sub
dog = animal; // 다운캐스팅

/** 예제1) 슈퍼-서브타입 기준
Book타입이 슈퍼타입이고 ProgrammingBook 타입이 서브타입이다.
Book 타입에 있는 프로퍼티를 ProgrammingBook타입이 이미 가지고 있고, 추가적인 프로퍼티(skill)까지 가지고 있기 때문에  
ProgrammingBook타입에 해당되는 값들은 모두 Book타입에 포함될 수 있게 된다.  
그렇기 때문에 book이라는 Book타입 변수에 reactBook이라는 ProgrammingBook타입 서브타입 변수를 할당하는것은 업캐스팅이기 때문에 가능하고,
반대로 reactBook에 book 변수를 할당하는것은 다운캐스팅이기 때문에 불가능하다.
 */
type Book = {
  name: string;
  price: number;
}

type ProgrammingBook = {
  name: string;
  price: number;
  skill: string; // 어떤 스킬에 대해 다루는지에 대한 property
}

let book: Book;
let reactBook: ProgrammingBook = {
  name: "한 입 크기로 잘라먹는 리액트",
  price: 33000,
  skill: "reactjs"
}

book = reactBook;
reactBook = book;

/** 예제 2) - 초과 프로퍼티 검사
Book타입의 변수를 하나 더 선언한 뒤 객체 리터럴로 초기화한다.  
서브타입인 ProgrammingBook 타입의 변수 reactBook 객체의 프로퍼티들과 똑같이 구성한다.
이 경우 skill 이라는 프로퍼티가 있으면 안된다는 오류가 발생한다.  
Book타입에 skill이라는 프로퍼티를 정의하지 않았지만 reactBook이라는 서브타입 값을 넣는것은 업캐스팅이므로 가능했다.  
바로 초과 프로퍼티 검사라는 타입스크립트의 특수한 기능이 발동되었기 때문이다.  

초과 프로퍼티 검사 라는 것은 아래와 같이 변수를 초기화 할 때 초기화 하는 값으로 객체 리터럴을 사용하면 발동하는 검사이다.  
객체 타입 변수를 초기화할 때 객체 리터럴을 사용하면 skill같은 초과 프로퍼티  
즉, 실제 Book타입에서는 정의해 놓지 않은 프로퍼티를 작성할 수 없도록 막는 검사가 바로 초과 프로퍼티 검사 이다.  
이렇게 객체 타입의 변수를 초기화할 때 객체 리터럴을 사용한다면 주석처리를 하거나 삭제해서 객체 타입에 정의된 프로퍼티만 할당할 수 있도록 해야한다.  
 */
let book2: Book = {
  name: "한 입 크기로 잘라먹는 뷰",
  price: 33000,
  skill: "vuejs"
}
/* 만약 초과 프로퍼티 검사를 피하기 위해서는 새로운 변수를 만들고 reactBook 같은 변수를 할당하면  
초기화할 때 객체 리터럴을 사용한것이 아니기 때문에 초과 프로퍼티 검사가 발동하지 않아 이런 경우에는 허용이 된다.  
*/
let vueBook: ProgrammingBook = {
  name: "한 입 크기로 잘라먹는 뷰",
  price: 33000,
  skill: "vuejs"
}
let book3: Book = vueBook;

/* 함수의 인수로 전달할 때도 객체 리터럴을 전달하면 초과 프로퍼티가 발동하게 되기 때문에 만약 서브타입 객체를 넣으려고 한다면
객체 리터럴을 이용하는게 아니라 변수에 저장해 두었다가 인수로 변수를 전달해야 된다.  
 */
function func(book: Book) {}
func({
  name: "한 입 크기로 잘라먹는 뷰",
  price: 33000,
  skill: "vuejs"
})

func(vueBook)