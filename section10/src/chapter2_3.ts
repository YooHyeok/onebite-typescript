/* 
## ReturnType<T>

ReturnType은 말 그대로 함수의 반환값 타입을 추출하는 유틸리티 타입이다.  
함수 타입을 한개의 제네릭 타입변수 T로 전달받는다.  

### 예제) 
'hello'라는 string 타입의 값을 반환하는 함수 funcA를 정의하고, 10이라는 number타입의 값을 반환하는 함수 funcB를 각각 선언한다.  
*/
function funcA() {
  return 'hello'
}
function funcB() {
  return 10
}

/* 
다음으로 ReturnType의 제네릭 타입변수로 typeof funcA를 지정하여 ReturnA타입에 할당한다.  
*/
type ReturnA = ReturnType<typeof funcA>
/*
funcA함수에 반환값 타입인 string 타입이 추출되어 ReturnA타입에 string타입이 할당된다.
*/

/* 
똑같이 ReturnType의 제네릭 타입변수로 typeof funcB를 지정하여 ReturnA타입에 할당한다.  
*/
type ReturnB = ReturnType<typeof funcB>
/*
funcB함수에 반환값 타입인 number 타입이 추출되어 ReturnB타입에 number타입이 할당된다.  

이렇게 ReturnType이라는 유틸리티 타입을 사용하면 함수의 타입을 아주 편리하게 추출할 수 있다.  

### 직접구현)
ReturnType은 하나의 타입변수 T를 사용하는 제네릭 타입이다.  
제네릭 타입변수 T에 들어올 수 있는 타입은 오직 함수 타입이다.  
제네릭 타입 변수에 제약을 걸기위해서 T extends 함수 타입 표현식을 사용하며, 반환 타입은 any 타입으로 지정해 준다.  
매개변수는 몇개가 들어와도 함수가 되기만 하면 되므로 any타입의 ...args로 정의한다.  
함수타입으로 들어올 매개변수 args에는 any타입이기 때문에 어떤 함수 타입이 들어와도 다 서브타입으로 같게 된다.  

다음으로 조건부 타입으로 `T extends (...args: any) => infer R ? R : never`와 같이  
함수 타입 표현식을 작성하고 매개변수 ...args 타입은 제약을 걸때와 똑같이 any 타입을 지정해 준 후  
함수 표현식의 반환 타입은 직접 추론해야 하기 때문에 infer R을 사용하고, 참이 되면 R을, 거짓이면 never를 추론하도록 `infer R ? R : never`을 지정해준다.  

*/
type ReturnTypeA<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R ? R : never
type ReturnC = ReturnTypeA<typeof funcA> // type ReturnC = string
type ReturnD = ReturnTypeA<typeof funcB>type ReturnD = number
/* 
동작 원리를 살펴보면 ReturnTypeA의 제네릭 타입변수 T에 `typeof funcA`를 전달할 경우  
<typeof funcA extends () => string> = typeof funcA extends (
) => infer R ? R : never
형태가 된다.  
funcA는 매개변수가 없고 반환값은 string 타입으로 `() => string` 형태로 T에 전달될것이다.  
매개변수는 없기 때문에 고려하지 않도록 하고, 반환값 타입이 infer R로 되어있다.  
infer R은 T 타입이 서브타입이 되도록 하는 R을 추론하라는 의미이다.  
즉 R은 () => string 에서 반환타입에 위치하는 타입 stirng을 계속해서 추려내기 때문에  
ReturnTypeA의 제네릭 타입변수 T에 typeof funcA를 지정할 경우 결과적으로 type ReturnB는 string 타입으로 추론 된다.  

funcB도 동일한 원리로 number타입을 반환하여 type ReturnD는 number타입으로 추론된다.
*/