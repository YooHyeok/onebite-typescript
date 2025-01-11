/* Section03. 원시 타입과 리터럴 타입 */

/* 1. number 타입 */
let num1: number = 123; // 양의 정수
let num2: number = -123; // 음의 정수
let num3: number = 0.123; // 양의소수
let num4: number = -0.123; // 음의 소수
let num5: number = Infinity; // 양의 무한대
let num6: number = -Infinity; // 음의 무한대
let num7: number = NaN; // Not A Number

num1 = 'hello'; // 숫자타입에 문자열 저장시 컴파일 에러 발생.
num1.toUpperCase(); // 문자열만 사용 가능한 메소드 호출시 컴파일 에러 발생.
num1.toFixed(); // 숫자타입만 사용 가능한 메소드 정상 호출 가능


/* 2. string 타입 */
let str1: string = "hello" // 쌍따옴표 문자열
let str2: string = 'hello' // 홑따옴표 문자열
let str3: string = `hello` // 벡틱 문자열
let str4: string = `hello ${num1}` // template literal도 string 타입에 포함된다.

str1 = 123;
str1.toFixed();
str1.toUpperCase();

/* 3. boolean 타입 */
let bool1: boolean = true;
let bool2: boolean = false;

/* 4. null 타입 */
let null1: null = null;

/* 5. undefined 타입 */
let unde1: undefined = undefined;

let numA: number = null;

/* 리터럴(literal) 타입 */
let numB: 10 = 10; // 앞으로 변수 numB에는 정수 값 10만 저장이 가능하다. (다른 정수를 저장할 경우 오류가 발생한다.)

let strA: "hello" = "hello";
strA = "df" // 오류 발생

let boolA: true = true;
boolA = false;
let boolB: true = false;