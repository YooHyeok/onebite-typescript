/* 
## Exctact<T, U>

T에서 U를 제거하는 Exclude 타입의 반대격이 되는 타입으로 T에서 U를 추출하는 타입이다.  

### 예제)
Extract타입의 첫번째 제네릭 타입변수 T에 `string | boolean`을 지정해 준 뒤 두번째 제네릭 타입변수에 boolean을 지정한다.  
T에서 U에 해당하는 타입만 추출하므로 결과는 boolean 타입이 된다.  
*/
type A = Extract<string | boolean, boolean>

/* 
### 직접구현)
T가 U를 확장할 경우 T를 반환하고, 그렇지 않으면 never를 반환하도록 한다.  
*/
type ExtractB<T, U> = T extends U ? T : never

/* 
타입변수 T에 union을 전달했기 때문에 분산적인 조건부 타입이 되어서 결과적으로 boolean만 남게 된다.
*/
type B = ExtractB<string | boolean, boolean>
/* 
단계별로 살펴본다.
1. string 유니온 boolean 타입으로 전달한 T 타입은 한번은 ExtractB<string, boolean> 또 한번은 ExtractB<boolean, boolean>이 된다.  
그 다음 모든 결과들을 ExtractB<string, boolean> | ExtractB<boolean, boolean>와 같이 유니온으로 묶어준다.  
2. 첫번째로 ExcludeA<string, boolean>은 string이 boolean을 extends 하지 않기 때문에 결과가 never이 된다.  
두번째로 ExcludeA<boolean, boolean>은 boolean boolean을 extends 하기 때문에 결과가 boolean이 된다.  
마지막으로 두 결과를 boolean | never와 같이로 유니온 연산을 한다.  
이때 합집합에서 never는 공집합 이기 때문에 사라지게 되므로 결과적으로 boolean 타입이 된다.  
*/