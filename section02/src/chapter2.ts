/* Section03. 배열과 튜플 */

/* 배열 */
let numArr: number[] = [1, 2, 3]; // 1. Type[] - 인덱스 기호 방식 배열 타입
let strArr: string[] = ["hello", "im", "yooHyeokSchool"];

let boolArr: Array<boolean> = [true, false, true]; // 2. Array<Type> - 제네릭 타입 방식의 배열 타입 정의

/* 배열에 들어가는 요소들의 타입이 다양할 경우*/
let multiArr: (number | string | boolean)[] = [1, "hello", true];


/* 다차원 배열 타입 */
let doubleArr: number[][] = [
  [1, 2, 3],
  [4, 5]
]

/* 튜플타입 */
let tup1: [number, number] = [1, 2] // 오직 number 타입
tup1 = [1, 2, 3] // Error: Type '[number, number, number]' is not assignable to type '[number, number]'. Source has 3 element(s) but target allows only 2.
tup1 = ["1", "2"] // Error: Type 'string' is not assignable to type 'number'.

let tup2: [number, string, boolean] = [1, "2", true] // 튜플 타입 정의: 각 요소의 타입을 배열형태로 정의한다.
tup2 = ["2", 1, true] // Error: Type 'string' is not assignable to type 'number' / Type 'number' is not assignable to type 'string'.

tup2.push("메롱")

/* 튜플을 유용하게 사용할 수 있는 예제 */

const user: [string, number][] = [
  ["유혁", 1],
  ["스쿨", 2],
  ["홀리", 3],
  ["몰리", 4],
  [5, "초이"] // Error: Type 'number' is not assignable to type 'string' | Type 'string' is not assignable to type 'number'
]