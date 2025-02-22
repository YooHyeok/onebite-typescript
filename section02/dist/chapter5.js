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
};
const user2 = {
    name: '홍길동',
    role: 1 // 1: 일반유저
};
const user3 = {
    name: '아무개',
    role: 2 // 2: 게스트
};
/* Enum 정의
타입 별칭을 사용하는 것처럼 enum이라는 키워드를 적은 뒤 enum의 이름을 적은 후 중괄호 안에 멤버를 선언한다.
각 멤버는 원하는 값으로 초기화한다.
 */
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["USER"] = 1] = "USER";
    Role[Role["GUEST"] = 2] = "GUEST";
})(Role || (Role = {}));
/* 이렇게 Enum을 활용하면 역할 같은 값들을 숫자 등으로 분류할 경우에 개발자들이 헷갈리지 않도록 도움을 준다.
 */
const member1 = {
    name: '유혁스쿨',
    role: Role.ADMIN // 0: 관리자
};
const member2 = {
    name: '홍길동',
    role: Role.USER // 1: 일반유저
};
const member3 = {
    name: '아무개',
    role: Role.GUEST // 2: 게스트
};
/* tsx src/chapter5.ts */
console.log(member1, member2, member3); // { name: '유혁스쿨', role: 0 } { name: '홍길동', role: 1 } { name: '아무개', role: 2 }
/* 또한 Enum의 멤버에 숫자를 명시적으로 할당하지 않아도 순차적으로 0번부터 자동으로 할당된다.
*/
var Auth;
(function (Auth) {
    Auth[Auth["ADMIN"] = 0] = "ADMIN";
    Auth[Auth["USER"] = 1] = "USER";
    Auth[Auth["GUEST"] = 2] = "GUEST";
})(Auth || (Auth = {}));
const player1 = {
    name: '유혁스쿨',
    auth: Auth.ADMIN // 0: 관리자
};
const player2 = {
    name: '홍길동',
    auth: Auth.USER // 1: 일반유저
};
const player3 = {
    name: '아무개',
    auth: Auth.GUEST // 2: 게스트
};
/* tsx src/chapter5.ts */
console.log(player1, player2, player3); // { name: '유혁스쿨', auth: 0 } { name: '홍길동', auth: 1 } { name: '아무개', auth: 2 }
/* 만약 첫번째 멤버에 할당될 값을 0이 아닌 10으로 지정할 경우 10부터 순차적으로 할당된다.
 */
var Tier;
(function (Tier) {
    Tier[Tier["ADMIN"] = 10] = "ADMIN";
    Tier[Tier["USER"] = 11] = "USER";
    Tier[Tier["GUEST"] = 12] = "GUEST";
})(Tier || (Tier = {}));
const client1 = {
    name: '유혁스쿨',
    tier: Tier.ADMIN // 0: 관리자
};
const client2 = {
    name: '홍길동',
    tier: Tier.USER // 1: 일반유저
};
const client3 = {
    name: '아무개',
    tier: Tier.GUEST // 2: 게스트
};
/* tsx src/chapter5.ts */
console.log(client1, client2, client3); // { name: '유혁스쿨', tier: 10 } { name: '홍길동', tier: 11 } { name: '아무개', tier: 12 }
/*
두번째 멤버을 수정할 경우 첫번째 멤버는 0이 할당되고 두번째 멤버 부터 순차적으로 부여된다.
ADMIN:0 USER:10 GUEST:11
이렇게 각각의 멤버에 숫자가 할당 되는 enum을 숫자형 enum이라고 부른다.
 */
var Level;
(function (Level) {
    Level[Level["ADMIN"] = 0] = "ADMIN";
    Level[Level["USER"] = 10] = "USER";
    Level[Level["GUEST"] = 11] = "GUEST";
})(Level || (Level = {}));
/* tsx src/chapter5.ts */
console.log(client1, client2, client3); // { name: '유혁스쿨', tier: 10 } { name: '홍길동', tier: 11 } { name: '아무개', tier: 12 }
/* 문자형 enum - 문자열 값 할당
각 국가별의 언어를 열거하는 열거형 생성
 */
var Language;
(function (Language) {
    Language["korean"] = "ko";
    Language["english"] = "en";
})(Language || (Language = {}));
const customer1 = {
    name: '유혁스쿨',
    tier: Tier.ADMIN, // 0: 관리자
    language: Language.korean
};
const customer2 = {
    name: '홍길동',
    tier: Tier.USER, // 1: 일반유저
    language: Language.english
};
const customer3 = {
    name: '아무개',
    tier: Tier.GUEST, // 2: 게스트
    language: Language.korean
};
/* tsx src/chapter5.ts */
console.log(customer1, customer2, customer3); // { name: '유혁스쿨', tier: 10, language: 'ko' } { name: '홍길동', tier: 11, language: 'en' } { name: '아무개', tier: 12, language: 'ko' }
export {};
/* 타입스크립트 관련 코드들은 컴파일 결과 파일인 자바스크립트에서 모두 사라진다.
그러나 enum 타입으로 값을 할당한 각 객체의 프로퍼티에는 마치 값을 쓰는 것처럼 사용하고 있다.
타입스크립트 코드이지만 tsx로 컴파일 시 오류가 발생하지 않고 실행이 잘 되는 것을 확인할 수있다.
enum은 특이하게 컴파일하더라도 코드가 사라지지 않는다.
*/
