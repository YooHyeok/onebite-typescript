/* Section03. 객체(Object) */

/* object 타입
object는 객체라는 정보 외에는 아무런 정보 없는 타입이므로 object타입으로 정의할경우 해당 객체의 property나 메소드에 뭐가 있는지 알 수 없게 된다.
따라서 object타입으로 객체의 타입을 정의한다면 점 표기법으로 접근할 경우 오류가 발생한다.
구조적 타입 시스템이란?
propery를 기준으로 타입을 결정하는 시스템 이라는 의미로 프로퍼티 기반 타입 시스템이라고 부르기도 한다.
명목적 타입 시스템이란?
자바와 C언어 처럼 이름을 기준으로 즉, 객체면 모두 object, 문자열이면 모두 string과 같이 이름을 기준으로 타입을 정의하는것을 말한다.
*/
let user:object = {
  id: 1,
  name: "유혁스쿨"
}
user.id; // Property 'id' does not exist on type 'object'.

/* 객체 타입 정의 */
let user2: { // 객체를 선언하는 형태로 객체 내부에 property를 선언하고 타입을 지정
  id: number;
  name: string;
} = {
  id: 1,
  name: "유혁스쿨"
}

user2.id;

let dog: {name: string; color: string;} = {
  name: "돌돌이",
  color: "brown"
}

let dog: {name: string; color: string;} = {
  name: "돌돌이",
  color: "brown"
}

/* optional(선택적) 프로퍼티 */

let user3: {id?: number; name: string;};

user3 = {
  name: "홍길동"
}

/* readonly(읽기전용) 프로퍼티 */
let config: {readonly apiKey: string;} = {
  apiKey: "My Api Key"
}

config.apiKey = "hacked"