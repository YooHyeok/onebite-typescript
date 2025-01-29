/* 타입 계층도와 함께 기본타입 살펴보기 */

/* 
# 1. Unknown 타입 (전체 집합)
타입계층도의 최 상단에 위치해있다.  
그렇기 때문에 unknown타입은 타입스크립트에 존재하는 많은 모든 타입들의 슈퍼 타입이다.  
집합으로 이야기 해보자면 unknown 타입이라는 집합 안에 많은 타입들이 다 포함된다라고 볼수 있기 때문에 전체 집합이라고 볼 수 있다.  

## 예제코드: unknownExam()

### 업 캐스팅
unknown 타입은 모든 타입의 super 타입이기 때문에 모든 타입의 값을 할당할 수 있다.
number, string, boolean, null, undefined 값 모두 unknown타입 변수에 할당 가능하다.  
unknown 타입 같은 모든 타입의 슈퍼 타입에는 모든 타입이 다 업캐스팅 할 수 있기 때문에 모든 타입의 값을 할당할 수 있는것이다.  

### 다운캐스팅
그러나 반대인 다운캐스팅은 불가능하다.  
unknown타입의 값을 number, string, boolean, null, undefined 타입 변수에 할당할 수 없다.  
예를들어 number타입의 변수에 unknown 타입의 값을 할당한다는 것은 number 타입을 다운캐스팅 시키겠다는 것이다.  
string, boolean, null, undefined 타입 값들에도 unknown타입의 값을 할당한다는 것은 동일하게 다운캐스팅에 해당한다.  
이렇게 업캐스팅 즉, unknown타입의 변수에는 모든 값을 넣을 수 있지만  
반대로 다운캐스팅 unknown타입의 변수는 어떤 타입의 변수에도 들어갈 수 없다.  

*/
function unknownExam() {

  /* 업캐스팅 */
  let a: unknown = 1; // number 타입의 값을 unknown 타입에 할당하는 업캐스팅
  let b: unknown = "hello";
  let c: unknown = true;
  let d: unknown = null;
  let e: unknown = undefined;

  /* 다운캐스팅 */
  let unknownVar: unknown; // unknown타입 변수 최초 정의
  let num: number = unknownVar; // [Error]: Type 'unknown' is not assignable to type 'number'.
  let str: string = unknownVar; // [Error]: Type 'unknown' is not assignable to type 'string'.
  let bool: boolean = unknownVar; // [Error]: Type 'unknown' is not assignable to type 'boolean'.
  let nullVar: null = unknownVar; // [Error]: Type 'unknown' is not assignable to type 'nullVar'.
  let undefinedVar: undefined = unknownVar; // [Error]: Type 'unknown' is not assignable to type 'nullVar'.

}

/* 
# 2. Never 타입  
타입 계층도 상의 가장 아래에 위치해 있고, 그렇기 때문에 never 타입은 모든 타입의 서브타입에 해당한다.  
모든 집합의 부분집합 수학에서는 이를 아무것도 없다는 의미의 공집합이라고 불렀다.  

## 예제코드: neverExam()  

### 무한루프 실행 함수
never 타입은 공집합, 불가능을 의미하는 것이기 때문에 while true와 같은 무한루프를 실행하는 함수를 예로들면  
절대 이 함수가 어떤 값을 반환하는 것 자체가 말이 안된다 라고 했을 때, 반환 타입을 정의하기 위해 never를 활용했다.  
이 예시에서 never의 의미 자체가 이 함수가 반환하는 값의 종류는 공집합이다 라고 하는 것과 똑같은 것이다.  
"반환할 수 있는 값의 종류가 아무것도 없다."  

### 업캐스팅
never타입은 모든 타입의 서브타입이기 때문에 그 어떤 타입의 변수에도 값을 할당할 수 있다.  
number, string, boolean 타입 모두 업캐스팅이기 때문이다.  

### 다운캐스팅
그러나 이 역시 반대인 다운캐스팅은 불가능하다.  
never타입에 number타입 숫자값을 할당한다는것은 number 타입이 never타입으로 다운캐스팅 되는 것이기 때문이다.  
string, boolean타입도 모두 never타입의 변수에 할당하는것은 다운캐스팅이므로 어떤 타입의 값도 할당이 불가능하다.  

*/

function neverExam() {
  /* 무한루프 실행 함수 */
  function neverFunc(): never {
    while(true) {}
  }
  
  /* 업캐스팅 */
  let num: number = neverFunc();
  let str: string = neverFunc();
  let bool: boolean = neverFunc();

  /* 다운캐스팅 */
  let never1: never = 10;
  let never2: never = "hello"
  let never3: never = true
}

/* 
# 3. Void 타입

## 예제코드: voidExam()  
void타입은 반환값이 없는 함수 즉, return문 자체가 없는 함수에 반환 타입을 명시하는데 사용한다.  
void타입은 타입 계층도 상에서 모든 타입의 수퍼타입인 unknown이나 모든 타입의 서브타입인 never타입과는 다르게 중간에 위치해 있다.  
그러나 한가지 주의깊게 살펴 볼 점은 void타입은 undefined타입의 슈퍼타입이다.  
그렇기 때문에 void 타입의 변수에는 undefined의 값을 할당할 수 있다.  
서브타입인 undefined가 수퍼타입인 void타입에 업캐스팅 하는것이기 때문에 가능한것이다.
이 원리를 void타입의 함수에 적용해보면 return문으로 undefined를 반환하도록 해도 문제가 발생하지 않는다.  
결론: void타입은 undefined의 수퍼타입이다.
*/
function voidExam() {
  function voidFunc(): void {
    console.log("hi")
    return undefined;
  }

  let voidVar: void = undefined;
}

/*
# 2. Any 타입
타입 계층도 상에서는 unknown 타입의 서브타입으로 위치해 있으나 Any타입은 사실상 치트키 타입이다.  
따라서 Any타입은 타입계층도를 완벽히 무시한다.  
Any타입은 모든 타입의 수퍼타입으로 위치하면서도 never를 제외한 모든 타입의 서브타입으로도 위치한다.

## 예제코드: voidExam

### unknown → any 다운캐스팅
any타입 변수에 unknown타입 변수 할당이 신기하게 가능하다.  
타입 계층도 상에서는 any타입이 unknown타입의 서브타입이다.
any타입에 unknown 타입 변수를 할당한다는 것은 unknown타입이 any타입으로 다운캐스팅 되고 있는것이며, 신기하게도 오류가 발생하지 않고 허용된다.  
즉, any타입 한정으로 수퍼타입인 unknown타입이 서브타입인 any타입으로 다운캐스팅이 가능하다.  

### any → undefined 다운캐스팅
any 타입의 변수를 undefined 타입 변수에 할당이 가능하다.
타입 계층도 상으로 보면 또 다운캐스팅이다.

이렇게 any타입은 자신에게 오는 다운캐스팅과 자기스스로 다운캐스팅 하는것 모두 가능하기 때문에 치트키 타입이라고 생각하면 된다.  
any타입은 타입계층도를 모두 무시해버리기 때문에 위험한 타입으로 왠만해서는 사용하지 않도록 권유하는것이다.  

### any → never 다운캐스팅
any 타입의 변수를 never 타입 변수에 할당하는것은 불가능하다.  
never타입은 정말 순수한 공집합 이기 때문에 never 타입의 변수에는 그 어떤 타입(any)도 다운캐스팅 할 수 없다.  

*/
function anyExam() {
  let anyVar: any;

  let unknownVar: unknown;
  anyVar = unknownVar
  
  let undefinedVar: undefined;
  undefinedVar = anyVar;

  let neverVar: never;
  neverVar = anyVar;
}