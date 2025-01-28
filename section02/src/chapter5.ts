/* Enum 타입
여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입으로 열거형 타입이라고도 부른다.
자바스크립트에는 없고 타입스크립트에만 특별히 제공되는 새로운 타입이다.

3명의 User가 있다고 가정해보자.
User의 권한을 설정할 때 보통 숫자로 배정하는 방법을 많이 사용하곤 한다.  
그런데 이렇게 숫자로 각각의 권한을 설정해 준 다음 개발을 진행하다 보면 종종 헷갈리는 경우가 생긴다.
숫자만 보고 기억하기가 조금 어려울 수 있다.
이렇게 실수하는 경우를 막기 위해 타입스크립트의 Enum을 활용하여 효율적으로 관리할 수 있다.

*/

const user1 = {
  name: '유혁스쿨',
  role: 0 // 0: 관리자
}

const user2 = {
  name: '홍길동',
  role: 1 // 1: 일반유저
}

const user3 = {
  name: '아무개',
  role: 2 // 2: 게스트
}

/* Enum 정의
타입 별칭을 사용하는 것처럼 enum이라는 키워드를 적은 뒤 enum의 이름을 적은 후 중괄호 안에 멤버를 선언한다.
각 멤버는 원하는 값으로 초기화한다.
 */
enum Role {
  ADMIN = 0,
  USER = 1,
  GUEST = 2
}

/* 이렇게 Enum을 활용하면 역할 같은 값들을 숫자 등으로 분류할 경우에 개발자들이 헷갈리지 않도록 도움을 준다.
 */
const member1 = {
  name: '유혁스쿨',
  role: Role.ADMIN // 0: 관리자
}

const member2 = {
  name: '홍길동',
  role: Role.USER // 1: 일반유저
}

const member3 = {
  name: '아무개',
  role: Role.GUEST // 2: 게스트
}

/* tsx src/chapter5.ts */
console.log(member1, member2, member3) // { name: '유혁스쿨', role: 0 } { name: '홍길동', role: 1 } { name: '아무개', role: 2 }

/* 또한 Enum의 멤버에 숫자를 명시적으로 할당하지 않아도 순차적으로 0번부터 자동으로 할당된다.
*/
enum Auth {
  ADMIN,
  USER,
  GUEST
}

const player1 = {
  name: '유혁스쿨',
  auth: Auth.ADMIN // 0: 관리자
}

const player2 = {
  name: '홍길동',
  auth: Auth.USER // 1: 일반유저
}

const player3 = {
  name: '아무개',
  auth: Auth.GUEST // 2: 게스트
}

/* tsx src/chapter5.ts */
console.log(player1, player2, player3) // { name: '유혁스쿨', auth: 0 } { name: '홍길동', auth: 1 } { name: '아무개', auth: 2 }

/* 만약 첫번째 멤버에 할당될 값을 0이 아닌 10으로 지정할 경우 10부터 순차적으로 할당된다.
 */
enum Tier {
  ADMIN = 10,
  USER,
  GUEST
}

const client1 = {
  name: '유혁스쿨',
  tier: Tier.ADMIN // 10: 관리자
}

const client2 = {
  name: '홍길동',
  tier: Tier.USER // 11: 일반유저
}

const client3 = {
  name: '아무개',
  tier: Tier.GUEST // 12: 게스트
}

/* tsx src/chapter5.ts */
console.log(client1, client2, client3) // { name: '유혁스쿨', tier: 10 } { name: '홍길동', tier: 11 } { name: '아무개', tier: 12 }

/* 
두번째 멤버을 수정할 경우 첫번째 멤버는 0이 할당되고 두번째 멤버 부터 순차적으로 부여된다.
ADMIN:0 USER:10 GUEST:11
이렇게 각각의 멤버에 숫자가 할당 되는 enum을 숫자형 enum이라고 부른다.
 */
enum Level {
  ADMIN,
  USER = 10,
  GUEST
}
const soldier1 = {
  name: '유혁스쿨',
  level: Level.ADMIN // 0: 관리자
}

const soldier2 = {
  name: '홍길동',
  level: Level.USER // 10: 일반유저
}

const soldier3 = {
  name: '아무개',
  level: Level.GUEST // 11: 게스트
}
/* tsx src/chapter5.ts */
console.log(soldier1, soldier2, soldier3) // { name: '유혁스쿨', level: 0 } { name: '홍길동', level: 10 } { name: '아무개', level: 11 }

/* Enum 중복문제
아래와 같이 첫번째 멤버의 값을 11로 명시적으로 할당한 뒤 두번째 멤버의 값을 10으로 할당할 경우  
3번째 값은 자동으로 최종 할당값 기준으로 증가값이 할당된다.  
이 경우 첫번째 값과 3번째 값이 동일하게 11로 할당되는 중복 문제가 발생한다.  
해결책으로는 모든 멤버 값을 명시적으로 지정한다.
*/
enum Class {
  ADMIN = 11,
  USER = 10,
  GUEST
}
const student1 = {
  name: '유혁스쿨',
  level: Class.ADMIN // 0: 관리자
}

const student2 = {
  name: '홍길동',
  level: Class.USER // 1: 일반유저
}

const student3 = {
  name: '아무개',
  level: Class.GUEST // 2: 게스트
}
/* tsx src/chapter5.ts */
console.log(student1, student2, student3) // { name: '유혁스쿨', level: 11 } { name: '홍길동', level: 10 } { name: '아무개', level: 11 }


/* 문자형 enum - 문자열 값 할당
각 국가별 언어를 열거하는 열거형 생성
 */
enum Language {
  korean = 'ko',
  english = 'en'
}

const customer1 = {
  name: '유혁스쿨',
  tier: Tier.ADMIN, // 0: 관리자
  language: Language.korean
}

const customer2 = {
  name: '홍길동',
  tier: Tier.USER, // 1: 일반유저
  language: Language.english
}

const customer3 = {
  name: '아무개',
  tier: Tier.GUEST, // 2: 게스트
  language: Language.korean
}

/* tsx src/chapter5.ts */
console.log(customer1, customer2, customer3) // { name: '유혁스쿨', tier: 10, language: 'ko' } { name: '홍길동', tier: 11, language: 'en' } { name: '아무개', tier: 12, language: 'ko' }


/*
타입스크립트 관련 코드들은 컴파일 결과 파일인 자바스크립트에서 모두 사라진다.
그러나 enum 타입으로 값을 할당한 각 객체의 프로퍼티에는 마치 값을 쓰는 것처럼 사용하고 있다.
타입스크립트 코드이지만 tsx로 컴파일 시 오류가 발생하지 않고 실행이 잘 되는 것을 확인할 수있다.
enum은 특이하게 컴파일하더라도 코드가 사라지지 않는다.

- tsc
  ```js
  var Role;
  (function (Role) {
      Role[Role["ADMIN"] = 0] = "ADMIN";
      Role[Role["USER"] = 1] = "USER";
      Role[Role["GUEST"] = 2] = "GUEST";
  })(Role || (Role = {}));

  var Auth;
  (function (Auth) {
      Auth[Auth["ADMIN"] = 0] = "ADMIN";
      Auth[Auth["USER"] = 1] = "USER";
      Auth[Auth["GUEST"] = 2] = "GUEST";
  })(Auth || (Auth = {}));
  var Tier;
  (function (Tier) {
      Tier[Tier["ADMIN"] = 10] = "ADMIN";
      Tier[Tier["USER"] = 11] = "USER";
      Tier[Tier["GUEST"] = 12] = "GUEST";
  })(Tier || (Tier = {}));
  ```

복잡하지만 자바스크립트의 객체로 변환되고 있다는것을 컴파일 결과 코드를 통해 확인할 수 있다.
결론적으로 타입스크립트의 enum은 컴파일 결과 사라지지않고 자바스크립트의 객체로 변환되기 때문에 코드상에서 마치 값을 사용하듯 사용할 수 있다.
*/