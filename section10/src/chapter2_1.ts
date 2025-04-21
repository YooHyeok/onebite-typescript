/* 
## Exclude<T, U>
T와 U 두개의 제네릭 타입변수를 사용하는 제네릭 타입이다.  
Exclude는 영어로 제외하다, 추방하다 라는 뜻을 가지고 있다.  
즉, T에서 U를 제거하는 타입이다.  
Exclude의 첫번째 제네릭 타입변수 T는 유니온 타입을 갖고, U에 지정한 타입을 유니온 타입 T에서 제거하게 된다.  

### 예제)
아래와 같이 첫번째 제네릭 타입 변수에 string|boolean, 두번째 제네릭 타입변수에 boolean을 받는 Exclude 제네릭 타입을 갖는 타입 A를 선언해준다.  
*/
type A = Exclude<string | boolean, boolean>
/* 
타입 A는 boolean 타입을 제거한 string 타입이 된다.  

### 직접구현)
먼저 Exclude는 두개의 제네릭 타입변수 T와 U를 갖는다.  
조건부 타입으로 T extends U ? never : T 즉, T가 U를 확장하면 never타입을, 확장하지 않으면 T타입을 반환하도록 지정한다.  
*/
type ExcludeA<T, U> = T extends U ? never : T;
/* 
정의한 ExcludeA 타입의 제네릭 타입변수 T에 union타입을 전달하면 분산적 조건부 타입이 된다. 
*/
type B = ExcludeA<string | boolean, boolean>
/* 
단계별로 살펴본다.
1. string 유니온 boolean 타입으로 전달한 T 타입은 한번은 ExcludeA<string, boolean> 또 한번은 ExcludeA<boolean, boolean>이 된다.  
그 다음 모든 결과들을 ExcludeA<string, boolean> | ExcludeA<boolean, boolean>와 같이 유니온으로 묶어준다.  
2. 첫번째로 ExcludeA<string, boolean>은 string이 boolean을 extends 하지 않기 때문에 결과가 string이 된다.  
두번째로 ExcludeA<boolean, boolean>은 boolean boolean을 extends 하기 때문에 결과가 never이 된다.  
마지막으로 두 결과를 string | never와 같이로 유니온 연산을 한다.  
이때 합집합에서 never는 공집합 이기 때문에 사라지게 되므로 결과적으로 string 타입이 된다.  
*/
