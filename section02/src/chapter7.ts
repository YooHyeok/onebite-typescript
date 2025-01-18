/* Void & Never 타입 */

/* Void 타입  
Void란? 공허, 아무것도 없다는 우리말 뜻을 가진다.  
Void 타입은 아무것도 없음을 의미하는 타입이다.  
*/

/* void 예제: 함수 반환타입
타입스크립트에서는 함수의 반환값에도 타입을 정의할 수 있다.  
함수의 매개변수를 작성하는 소괄호 뒤에 타입 주석을 작성한다.  
문자열을 반환하면 `funciton func(): string`과 같은 형태로 선언한다.
*/

function func1(): string {
  return "hello";
}
/*
아래와 같이 함수 내 아무런 값도 반환하지 않을 경우 반환타입은 Void타입으로 정의한다.  
 */
function func2(): void {
  console.log("hello")
}

/* void 예제: 변수 반환타입
void 타입으로 정의한 변수에는 어떠한 값도 담을 수 없다.  
정수, 문자, boolean, 객체 모두 할당할 수 없으나, 오직 undefined만 할당 가능하다.  
이때 tsconfig.json에서 엄격한 Null검사 컴파일러 옵션을 `strictNullChecks: false`로 설정할 경우  
예외적으로 void 타입의 변수에도 null을 할당할 수 있다.  
어느타입의 변수에나 null이 할당될 수 있게 설정하는 옵션이기 때문이다.  
*/
let a: void;
a = 1; // Type 'number' is not assignable to type 'void'.
a = "hello"
a = {};
a = undefined // 할당 가능.
a = null // strictNullChecks: false의 경우 가능

/* 함수 반환타입 null과 undefined */

/*
v 5.0.3 undefined 이슈 (5.1.0 이상부터는 반환하지 않아도 문제없음)
아무것도 없음을 나타내는 값으로 undefined나 null이 있음에도 불구하고 함수의 반환 타입을 정의할 때 void를 쓰는 이유가 무엇일까?
함수에 undefind를 반환타입으로 지정할 경우 오류가 발생한다.  
해당 함수가 undefined를 실제로 반환하도록 해야한다.
(그냥 return만 해도 된다.)
*/
function func3(): undefined {
  console.log("hello")
  // return undefined;
  return;
}

/* 함수 null 반환타입  
null타입의 경우 오로지 null을 반환해야한다.  
따라서 정말로 반환값이 없는 함수의 반환 타입으로는 void를 사용하는것이다.  
*/
function func4(): null {
  return null;
}

/* Never 타입  
Never란? 존재하지않는, 불가능한 타입 이라는 의미를 가진다.  
불가능한 이라는 뜻으로 정의된 Never 타입의 예제 코드를 작성한다.  
while문을 선언하여 무한루프를 도는 함수를 구현한다.  
이때 void도 선안할 수 있다. 그러나 void타입은 func2 함수처럼 함수가 정상적으로 종료는 되지만 진짜 반환하는 값, 반환문 자체가 없어서 void 타입이 된다.  
아래 함수는 반환을 할 수가 없을 수도 있다.  
정상적으로 종료 되지 않을 수 있는 함수는 반환한다는 것 자체가 모순이거나 절대 불가능 하기에 void 타입을 쓰는것은 사실 말이 안된다.  
이렇게 절대 정상적으로 종료가 될 수 없는 함수의 경우 never타입 으로 정의한다.  
*/

function func5(): void {
  while(true) {

  }
}

function func6(): never {
  while(true) {

  }
}

/* Never 타입 함수 반환 예제 - Error  
Error을 던져서 프로그램이 중지될 경우의 반환타입도 Never를 정의하는것이 적합하다.  
*/
function func7(): never {
  throw new Error()
}

/* 
never 타입 변수 예제  
변수의 타입도 never타입으로 정의할 수 있지만 void 타입처럼 어떠한 타입의 값도 할당할 수 없다.  
예외로 void타입은 undefined 타입을 할당할 수 있었지만 never 타입은 undefined마저 할당이 불가능하다.  
심지어 null 할당에 대해서도 strictNullchecks: false 옵션을 주더라도 null 할당이 불가능하다.
또한 any타입의 변수 선언 후 해당 변수를 할당할 경우 오류가 발생한다.
never타입은 어떤 값도 저장할 수 없는 변수의 타입을 정의할 때에 활용한다.
 */

let b: never;
b = 1;
b = {};
b = "";
b = undefined;
b = null;
let anyVar: any;
b = anyVar;