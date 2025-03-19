/* 
## 제네릭
*/

/* 
예시와 함께 살펴보기 위해 간단한 함수를 먼저 선언해본다.  
string타입의 value를 매개변수로 받고 return 해주도록 한다.  
이때 함수의 리턴타입은 string이 된다.  
만약 이때 함수의 미개변수로 숫자도 넣고 싶고 Boolean타입의 값도 넣고 싶다고 한다면 어떻게 해야 할까?  

*/
function func(value: string) {
  return value
}
func("값")
func(0)
func(false)
/* 
이렇게 범용적인 함수를 만들어야 될때 가장 먼저 생각나는 것은 any타입을 사용하는것이다.
*/
function funcA(value: any) {
  return value
}
/* 
any는 치트키 타입 이기 때문에 위와같이 매개변수 타입으로 명시적으로 정의를 해줄 경우 해당 함수를 호출하면서 인수로 어떠한 타입의 값이든 전달해도 상관이 없다.  
그렇다면 아래 변수 num, bool, str의 타입은 무엇이 될까?  
기대하는 타입으로는 함수가 매개변수를 그대로 반환하기 때문에 num변수는 전달하는 매개변수의 타입인 number 타입이 될것이라 생각할 것이고,
bool변수의 타입은 boolean타입, str변수의 타입은 string타입이라고 생각할 것이다.
하지만 실제로는 그렇게 되지 않는다.  
마우스 커서를 올려보면 num, bool, str 모두 any타입으로 추론되는것을 확인할 수 있다.
*/
let numA = funcA(0) // let num: any
let boolA = funcA(false) // let bool: any
let strA = funcA("string") // let str: any

/* 
함수의 반환 값 타입은 해당 함수의 리턴값을 기준으로 추론된다고 배웠다.  
그렇기 때문에 funcA 함수에서는 value를 그냥 그대로 리턴하는데 현재 value의 타입으로 정의되어 있는것은 any타입이기 때문에 단순하게 반환값이 any타입으로 잡히게 되는것이다.  
따라서 어떻게 호출하고 어떤 인수를 전달하더라도 어차피 any타입의 값을 반환한도고 되어있기 때문에 모두 any타입으로 추론이 되는것이다.  
그러나 어떤 변수가 이렇게 any타입으로 추론되는것은 별로 좋은 상황은 아니다.  

변수 num에 숫자값이 들어 있음이 코드상으로 보기에는 아주 명확하다.  
10이 들어가서 10이 그대로 나오기 때문에 누가봐도 숫자가 저장되어있는데, 이렇게 any타입으로 잡혀버리면 toUpperCase() 같은 문자열 메소드를 사용하더라도 오류를 발생시키지 않게 된다.  
*/
numA.toUpperCase();

/* 
이러한 문제가 있으므로, value타입을 any가 아닌 조금 비슷하지만 다른 타입인 unknown 타입으로 지정해본다.  
*/
function funcB(value: unknown) {
  return value
}
let numB = funcB(0)
let boolB = funcB(false)
let strB = funcB("string")
/* 
any타입과는 다르게 빨간줄로 unknown타입에는 toUpperCase()가 없다고 오류를 뱉는다.  
마찬가지로 매개변수가 unknown타입이니까 반환값도 unknown타입으로 잡혀서 numB도 unknown타입으로 추론되기 때문에 오류가 발생하는것이다.   
*/
numB.toUpperCase(); // 'numB' is of type 'unknown'.ts(18046)
/* 
오류를 알려주는것은 좋으나, 진짜 문제는 변수 numB가 숫자값이 들어가는건 너무나 자명한 상황임에도 toFixed()같은 number타입에서 사용할 수 있는 메소드를 못쓰게 된다.  
unknown타입은 어떤 연산, 메소드도 할 수 없는 전체집합으로 배웠었다.
*/
numB.toFixed(); // 'numB' is of type 'unknown'.ts(18046)

/* 
따라서 unknown타입을 지정한 상황에서 진짜 숫자처럼 사용하기 위해서는 `if (typeof numB === "number")` 과 같이 조건문을 사용하여 type을 좁혀 사용해야 한다.
*/
if (typeof numB === "number") {
  numB.toFixed(); // 'numB' is of type 'unknown'.ts(18046)
}
/* 
매개변수를 unknown타입으로 정의해도 불편하다.  
심플하게 인수로 number 타입의 값을 넣으면 반환값도 number타입이 되고 boolean타입의 값을 넣으면 반환값도 boolean타입, string타입의 값을 넣으면 반환값도 string타입이 되었으면 좋겠는데  
이때 사용하는 기능이 바로 제너릭이다.
*/

/* 
### 제네릭 함수
funcB 함수를 제니릭 함수라는 특별한 함수로 만들어 주면 함수의 인수에 따라 반환값의 타입을 가변적으로 정해줄 수 있다.  
제네릭이란? 영어로 일반적인, 또는 포괄적인 이라는 뜻을 가지고 있다.  
그러면 제네릭 함수라고 하면 일반적인 함수, 또는 포괄적인 함수라는 뜻이다.  
일반적인 함수 혹은 포괄적인 함수라는것이 이해가 잘 되지 않는다면 General이라는 Generic과 비슷한 단어를 통해 이해에 도움을 주도록 한다.  
두루두루 포괄적으로 모든 병을 다루는 병원을 종합병원이라고 부른다.  
영어권에서는 종합병원을 General Hospital이라고 부른다.  
Generic 함수 라고 하면 모든 타입에 두루두루 쓸 수 있는 범용적인 함수다 라고 이해를 해볼 수 있다.  
마치 함수계의 종합병원 같다 라고 쉽게 이해하자.  

실제로 funcB 함수를 Generic 함수로 만들어 본다.
먼저 함수를 제네릭 함수로 만들기 위해서는 타입변수 라는것을 선언해 줘야한다.  
함수의 이름 뒤에 꺽쇠를 열어준다.  
꺽쇠 안에는 대문자로 T를 써주면 된다.  
꺽쇠 안의 T는 타입을 저장하는 변수이다.  
타입 변수는 함수를 호출할 때 인수의 타입이 어떤 타입이냐에 따라 변수에 저장되는 타입이 달라진다.  
다음으로 value의 타입을 타입변수로 선언한 T로 선언해준다.  
마지막으로 반환값의 타입도 T로 선언해주면 제네릭 함수가 완성이 된다.  
*/
function funcC <T> (value: T): T {
  return value;
}
let numC = funcC(0) // let numC: number
let boolC = funcC(false) // let boolC: boolean
let strC = funcC("string") // let strC: string
/* 
이후 numC에 마우스커서를 올려보면 인수로 전달한 값 0의 타입인 number 타입으로 잘 추론이 되며, 마찬가지로 변수 boolC도 boolean타입으로 strC도 string 타입으로 잘 추론이 된다.  
제네릭 함수의 타입 변수 T는 타입을 담는 변수이다.  
마치 자바스크립트의 변수처럼 상황에 따라 다른 타입을 담을 수 있다는 것이다.  
따라서 이 타입 변수에 어떤 타입이 담기느냐는 언제 결정되냐면 함수를 호출할 때마다 결정이 된다.  
함수 funcC를 호출했을 때 매개변수 value에 들어오는 값이 10이고 number 타입이기 때문에 매개변수의 T라는 타입이 number 타입으로 추론되면서  
제네릭으로 선언한 타입 변수 <T>의 T도 number 타입으로 추론되고 반환값의 타입으로 정의한 T도 number 타입으로 추론되게 된것이다.  

마찬가지로 문자열 funcC의 매개변수로 문자열 string타입의 값이 들어온다면, 매개변수에 정의된 타입 변수 T가 string 타입으로 들어가게 되고,  
제너릭으로 선언한 타입 변수 <T>의 T도 stirng 타입으로 추론되고 반환값의 타입 T도 동일하게 string 타입으로 추론되게 된다.  

정리하자면 타입 변수와 함께 여러 타입의 값을 인수로 받아 범용적으로 쓸 수 있는 함수를 제네릭 함수라고 부른다.  
제니릭 함수들은 타입 변수를 <T> 형태로 꺽쇠와 함께 함수의 이름 뒤에 선언을 하고 타입 변수에 할당되는 타입은 함수를 호출할 때 인수에 따라 결정된다고 이해하면 된다.  
*/

/* 
추가로 제네릭 함수로 호출할 때 타입 변수에 할당되는 타입을 인수를 통해 추론하도록 하지 않고 프로그래머가 명시적으로 정의할 수도 있다.  
*/
let arr = funcC([1, 2, 3]);
/* 
매개변수에 1, 2, 3의 원소를 갖는 number 타입의 배열을 전달할 경우 value에 들어오는 값의 타입은 `let arr: number[]`와 같이 number 배열로 추론될 것이다.  

이때, 만약 number 배열 타입으로 추론하게 타입 변수를 두지 않고, T에 튜플타입으로 추론되게 하고 싶으면 어떻게 해야할까?
첫번째 방법으로는 매개변수로 전달하려는 인자 옆에 as 키워드를 통해 타입 단원을 할 수 있다.
*/
let arrA = funcC([1, 2, 3] as [number, number, number]); // 타입 단원

/* 
두번째 방법으로는 타입변수 <T>의 T에 할당하고 싶은 타입을 작성하면 된다. 
아래와 같이 작성할 경우 앞서 단순히 number 타입의 배열을 전달할때와 똑같이 전달하였으나, arrB 변수에 마우스를 올릴 경우 `let arrB: [number, number, number]`와 같이 
타입변수에 지정한 튜플 타입으로 추론되게 된다.  
이렇게 제네릭 함수를 호출하면서 명시적으로 타입 변수의 타입을 직접 정의하는것도 가능하다.  

타입변수에 정의한 타입과 다른 타입의 값을 매개변수로 전달할 경우 당연히 오류가 발생한다.  
*/
let arrB = funcC <[number, number, number]> ([1, 2, 3]);
let arrC = funcC <[number, number, number]> ([1, 2, 3, 4]); // Error

