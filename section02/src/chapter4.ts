/* Section03. 타입 별칭과 인덱스 시그니처 */
let user: {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
} = {
  id: 1,
  name: "유재혁",
  nickname: "유혁스쿨",
  birth: "1992.10.23",
  bio: "안녕하세요",
  location: "광명시"
}
/* 페이지의 절반을 차지하며, 중복된 타입 정의 코드 */
let user2: {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
} = {
  id: 2,
  name: "홍길동",
  nickname: "유혁스쿨",
  birth: "1992.10.23",
  bio: "안녕하세요",
  location: "광명시"
}

/* 타입 별칭 */
type User = {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
  // extra: string; // property 추가시 User 별칭을 타입으로 정의한 모든 객체에 적용됨
}

/* 타입별칭 중복 오류 */
type User = {} // Duplicate identifier 'User'.

let user3:User  = {
  id: 1,
  name: "유재혁",
  nickname: "유혁스쿨",
  birth: "1992.10.23",
  bio: "안녕하세요",
  location: "광명시"
}
let user4:User = {
  id: 2,
  name: "홍길동",
  nickname: "유혁스쿨",
  birth: "1992.10.23",
  bio: "안녕하세요",
  location: "광명시"
}

function func() {
  type User = {}; // 함수 블록 내에서는 내부에 정의한 타입이 User 타입이 된다. (함수 바깥이라면 함수 바깥에 정의된 User 타입이 적용된다.)
} 

/* [인덱스 시그니처] - 일반적인 타입별칭 */
type countryCodes = {
  Korea: string;
  UnitedState: string;
  UnitedKingdom: string;
}
let countryCodes = { // 현재 3개의 프로퍼티밖에 없으나, 200개의 프로퍼티를 구성한다면?
  Korea: 'ko',
  UnitedState: 'us',
  UnitedKingdom: 'uk'
}

/* 인덱스 시그니쳐 key와 value의 타입 지정
객체 프로퍼티 key, value의 타입 규칙 - key: string, value: string 타입인 프로퍼티들은 모두 허용하도록 타입 구성
key와 value의 타입을 기준으로 규칙을 이용하여 아주 유연하게 객체의 타입을 정의
*/
type countryCode = {
  [key: string]: string // 대괄호 안에 key의 타입을 정의, 해당 배열에 타입을 정의하면 key의 타입이 된다.
}
 let countryCodes2: countryCode = {
  Korea: 'ko',
  UnitedState: 'us',
  UnitedKingdom: 'uk'
};

/* 인덱스 시그니쳐 예제 */
type countryNumberCodes = { // key: stirng, value: number인 객체의 타입
  [key: string]: number;
}
/* 국가별 숫자 코드 */
let countryNumberCodes: countryNumberCodes = { 
  Korea: 410,
  UnitedState: 840,
  UnitedKingdom: 826
}
/* 
주의점1 - 인덱스 시그니처 타입은 프로퍼티가 없는 빈 객체에도 사용이 가능  
인덱스 시그니처 타입은 타입 규칙을 위반하지만 않으면 모든 객체를 허용  
 */
let countryNumberCode: countryNumberCodes = {} // 빈객체 오류x 이유: 아무런 프로퍼티가 없는 객체으로 규칙을 위반할 프로퍼티가 없는 셈

/* 인덱스 시그니처 및 필수 프로퍼티 */
type countryNumberCodeRequiredKorea = {
  [key: string]: number;
  Korea: number; // key가 string이고 value가 number면 모두 허용하지만 반드시 korea라는 number타입의 프로퍼티가 꼭 있어야 할 경우
}
/* 
주의점 2 - 인덱스 시그니처 정의 및 필수 프로퍼티 타입 정의시 빈 객체를 저장하면 문제발생.  
key가 string이고 value가 number면 모두 허용하지만 반드시 korea라는 number타입의 프로퍼티가 꼭 있어야 할 경우
*/
type countryRequiredKoreaNumberCode = {
  [key: string]: number;
  Korea: number; // 필수 프로퍼티 타입정의 추가
}

let countryCodeNumber: countryRequiredKoreaNumberCode = {} // Error: Property 'Korea' is missing in type '{}' but required in type 'countryNumberCode'.

let countryCodesNumber: countryRequiredKoreaNumberCode = {
  Korea: 410 // 필수 프로퍼티만 추가
}

/*  
주의점3 - 문자열, 숫자 코드 모두 허용할 경우
인덱스 시그니처를 사용하는 객체 타입에서 필수로 추가해야할 프로퍼티를 정의하려면,   
필수 프로퍼티의 value의 타입이 반드시 인덱스 시그니처의 value타입과 일치하거나 호환되야 함.  
*/
type countryNumberAndStringCode = {
  [key: string]: number; // Korea라는 프로퍼티의 value타입이 string으로 되어있고, 인덱스 시그니처의 value의 타입은 number로 되어있기 때문에 문제 발생.  
  Korea: string; // Property 'Korea' of type 'string' is not assignable to 'string' index type 'number'
}

let countryCodesNumberAndStringa: countryNumberAndStringCode = { // Type '{ Korea: string; }' is not assignable to type 'countryNumberAndStringCode'.
  Korea: "ko" // Property 'Korea' is incompatible with index signature. Type 'string' is not assignable to type 'number'.
}

/* 해결책1.
인덱스 시그니처의 value타입과 필수 프로퍼티의 value타입을 반드시 일치.
*/
type countryNumberAndStringCodes = {
  [key: string]: number;
  Korea: number;
}

let countryCodeNumberAndString: countryNumberAndStringCodes = {
  // Korea: "ko", // 인덱스 시그니처 특성상 사용할 수 없음.
  Korea: 410 
}

/* 해결책2.
다중 타입..?
*/
type countryStringAndNumberCode = {
  [key: string]: number | string;
  Korea: string;
}

let countryCodeStringAndNumber: countryStringAndNumberCode = {
  Korea: "ko"
}