/* Section03. 타입 별칭과 인덱스 시그니처 */
let user = {
    id: 1,
    name: "유재혁",
    nickname: "유혁스쿨",
    birth: "1992.10.23",
    bio: "안녕하세요",
    location: "광명시"
};
/* 페이지의 절반을 차지하며, 중복된 타입 정의 코드 */
let user2 = {
    id: 2,
    name: "홍길동",
    nickname: "유혁스쿨",
    birth: "1992.10.23",
    bio: "안녕하세요",
    location: "광명시"
};
let user3 = {
    id: 1,
    name: "유재혁",
    nickname: "유혁스쿨",
    birth: "1992.10.23",
    bio: "안녕하세요",
    location: "광명시"
};
let user4 = {
    id: 2,
    name: "홍길동",
    nickname: "유혁스쿨",
    birth: "1992.10.23",
    bio: "안녕하세요",
    location: "광명시"
};
function func() {
}
let countryCodes = {
    Korea: 'ko',
    UnitedState: 'us',
    UnitedKingdom: 'uk'
};
let countryCodes2 = {
    Korea: 'ko',
    UnitedState: 'us',
    UnitedKingdom: 'uk'
};
/* 국가별 숫자 코드 */
let countryNumberCodes = {
    Korea: 410,
    UnitedState: 840,
    UnitedKingdom: 826
};
/*
주의점1 - 인덱스 시그니처 타입은 프로퍼티가 없는 빈 객체에도 사용이 가능
인덱스 시그니처 타입은 타입 규칙을 위반하지만 않으면 모든 객체를 허용
 */
let countryNumberCode = {}; // 빈객체 오류x 이유: 아무런 프로퍼티가 없는 객체으로 규칙을 위반할 프로퍼티가 없는 셈
let countryCodeNumber = {}; // Error: Property 'Korea' is missing in type '{}' but required in type 'countryNumberCode'.
let countryCodesNumber = {
    Korea: 410 // 필수 프로퍼티만 추가
};
let countryCodesNumberAndStringa = {
    Korea: "ko" // Property 'Korea' is incompatible with index signature. Type 'string' is not assignable to type 'number'.
};
let countryCodeNumberAndString = {
    // Korea: "ko", // 인덱스 시그니처 특성상 사용할 수 없음.
    Korea: 410
};
let countryCodeStringAndNumber = {
    Korea: "ko"
};
export {};
