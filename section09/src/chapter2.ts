/* 
## infer
조건부 타입 내에서 타입 추론할 수 있는 기능이다.  

### 예제1)
예를들어 아래와 같이 매개변수는 없고 반환값 타입이 string인 함수 타입 Func를 정의해 본다.  
*/
type Func = () => string
/* 
이때 `Func타입의 반환값에 해당하는 타입만 가져오기 위해서 어떻게 해야할까?`
string 타입만 추출하려고 한다.

제네릭을 활용한 조건부 타입 문법을 적용해본다.  
타입변수 T extends 매개변수는 없고 반환값 타입이 string인 함수를 확장한다면 string타입을, 확장하지 않는다면 never타입을 반환하도록 조건부 타입 식을 작성한다.  
*/
type ReturnType<T> = T extends () => string ? string : never;
/* 
extends 우항에 () => string 이라는 함수타입 표현식이 들어와서 어색할 수 있으나, 단순히 타입 변수 T에 들어오는 타입이 () => string 이라는 함수포현식의 서브타입이라면 string을 아니라면 never타입을 반환하라는 의미이다.  

이때 A라는 타입을 만들고 해당 타입에 return 타입으로 func타입을 넣어주면 어떤 결과가 나올까?  
*/
type A = ReturnType<Func> // type A = string
/* 
타입 A에 마우스 커서를 올려보면 string 타입으로 추론된다.  
추론 과정은 다음과 같다.  
먼저 타입변수 T에는 Func타입 즉 () => string이 들어간다.  
extends의 우항으로 비교하는 타입은 () => string 이다.  
`() => string extends () => string` 형태로 좌측 함수표현식 타입이 우측 함수표현식 타입의 서브타입이냐 라고 물어보는것이다.  
만약 참이라면 string타입이 될것이고 거짓이라면 never타입이 된다.  
이때, 두 타입간의 관계를 보면 매개변수는 어차피 둘다 없으니까 비교할 필요 없고, 반환값으로 비교했을 때는 함수 타입의 호환성이 반환값이 더 큰 함수 타입이 슈퍼타입이 된다.  
지금은 두 함수 타입 간에 반환값 타입이 string으로 똑같기 때문에 우항의 함수표현식 타입을 서브타입이라고 봐도 된다.  
똑같은 타입끼리는 각자가 서로가 서브다. 서로가 수퍼다 라고 해도 상관이 없다.  
따라서 해당 조건은 참이 되어 결과가 string타입으로 추론된다.  

### 예제2)
number 타입을 반환하는 함수 표현식을 타입으로 갖는 FuncB 타입을 선언한다.  
타입 B를 선언한뒤 ReturnType의 제네릭 타입변수에 방금 선언한 FuncB를 지정하고 해당 타입을 할당한다.  
*/
type FuncB = () => number;
type B = ReturnType<FuncB> // type B = never

/* 
타입 B에 마우스 커서를 올려보면 never타입으로 추론된다.  
추론 과정은 다음과 같다.  
타입 변수 T에는 FuncB라는 타입이 들어간다.  
T는 `() => number` 타입이다.  
T와 비교하는 타입은 `() => string`이다.  
두 타입간의 관계 `() => nubmer extends () => string`의 결과는 교집합이 없는 서로소 집합이다.  
둘 중 누구도 서로의 서브타입이거나 수퍼타입 관계가 아니다.  
따라서 해당 조건식은 거짓이 되어 never타입으로 추론된다.  

그러나 원하던 값은 결과 타입이 함수의 반환타입으로 추론되는 것이다.  
ReturnType의 네릭 타입 변수에 지정할 타입이 Func타입일 때는 Func타입의 반환값 타입인 string타입을, FuncB 타입일때는 FuncB 타입의 반환값 타입인 number를 결과값으로 추론되는것을 원했다.  

우리가 조건부 타입을 쓸 때, extends의 우항 즉, 비교하는 타입의 반환값 타입을 string으로 고정해뒀기 때문에 어쩔 수 없이 함수의 반환값 타입이 string 타입이냐 라는 것 밖에 검사를 못하고 있다.  
이럴 때 사용할 수 있는 문법이 `infer`이다.  
*/
/*
### infer 적용
함수의 반환값 타입인 string을 infer R 형태로 적용한 다음, 참일 경우 추론될 타입에도 R을 적용한다.  
*/
type ReturnTypeB<T> = T extends () => infer R ? R : never;
type FuncAA = () => string;
type AA = ReturnTypeB<FuncAA> // type AA = string
type FuncBB = () => number;
type BB = ReturnTypeB<FuncBB> // type BB = number
/* 
반환값 타입이 string인 함수 표현식을 타입으로 갖는 FuncAA타입을 해당 타입의 제네릭 타입 변수에 할당할 경우 추론되는 타입은 string가 된다.  
반환값 타입이 number인 함수 표현식을 타입으로 갖는 FuncBB타입을 해당 타입의 제네릭 타입 변수에 할당할 경우 추론되는 타입은 number가 된다.  
두 타입 모두 원하는 타입으로 추론하는데 성공했다.  

추론 과정은 다음과 같다.  
우선 extends 기준 우항의 함수 표현식의 반환타입인 infer R은 단순히 R이라고 보면 된다.
FuncAA를 기준으로 `() => string extends () => R` 즉 () => string이라는 함수 표현식 타입이 () => R 이라는 함수 표현식 타입의 서브타입인가에 대해 비교한다.  
이때 infer와 함께 쓴 R 타입은 `() => string extends () => R` 조건식을 참으로 만드는 타입을 추론하도록 동작한다.  
즉, 왼쪽에 있는 함수 타입이 오른쪽에 있는 함수 타입의 서브타입이 되려면 R 타입은 string 타입이 되어야 하기 때문에 R이 string타입으로 추론된다.  
추론을 했을 때 참으로 만들 수 있기 때문에 `T extends () => infer R` 조건식이 참이 되어 R 타입으로 추론된다.  
이때 R은 extends 기준 좌항의 `() => string` 함수 표현식 타입이 서브타입이 되도록 하기 위해서는 string 타입이어야 하기 때문에 R의 타입은 string으로 추론된다.  
FuncBB도 동일하게 적용되어 R은 number가 되기 때문에 결과적으로 타입 BB은 number타입으로 추론된다.  

만약 이때 함수 표현식 형태의 타입이 아닌 단순한 number 타입을 제네릭 타입 변수로 지정할 경우 never 타입이 된다.  
*/
type C = ReturnType<number> // type C = never
/* 
ReturnType의 제네릭 타입 변수 T에는 number가 들어가게 된다.  
`number extends () => infer R ? R : never`  
즉, number 타입이 () => R 타입의 서브타입이 될 수 있는 R 타입을 infer에 의해 추론해야 하는데, 이때는 R 타입이 뭐가 되어도 불가능하다.  
() => any와 같이 infer R이 심지어 치트키 타입인 any 타입으로 추론된다고 하더라도 number 타입의 수퍼 타입이 될 재간이 없다.  
그렇기 때문에 위 경우에는 타입 R이 추론이 불가능한 상태이기 때문에 조건식이 거짓이라고 평가되어 never 타입으로 추론되는 것이다.  
그래서 타입 C는 never 타입이 된다.  
위와같이 infer 다음에 오는 타입을 추론할 수 없는 경우에는 조건식이 거짓이 된다.  

infer는 추론하다는 의미의 inference의 약자이다.  
infer R 이라고 하면 R을 추론해라 라는 의미로 사용된다고 이해하면 된다.  
*/
/*
### 예제3)
제네릭 타입 변수 T를 갖는 PromiseUnpack이라는 타입을 선언한 후 any타입을 임시로 할당한다.  
다음으로 해당 타입의 제너릭 타입 변수에 제네릭 타입변수 number를 갖는 Promise 타입을 지정한 뒤 PromiseA라는 타입 변수에 할당한다.  
해당 코드는 PromiseA는 number 타입이 되기를 기대하는 코드이다.
PromiseUnpack 타입의 역할은 타입변수 T에 제공한 Promise 타입에서 Promise의 결과값 타입 즉 number타입만 추출하여 할당하는 기능을 구현한다.  
*/
type PromiseUnpack<T> = any;
type PromiseA = PromiseUnpack<Promise<number>>;
/* 
예를들어 아래와 같이 Promise<string> 타입을 PromiseUnpack 타입의 제네릭 타입 변수에 지정한다면, PromiseB타입은 string타입이 되기를 기대하는 코드가 된다.  
*/
type PromiseB = PromiseUnpack<Promise<string>>;
/* 
이러한 요구사항을 만족하기 위해서는 PromiseUnpack타입을 어떻게 정의해야 할까?  
첫번째 조건으로는 PromiseUnpack타입의 제네릭 타입 변수 T는 Promise 타입이어야 한다.  
두번째 조건은 Promise의 결과값 타입을 반환해야한다.  
즉, PromiseUnpack 타입의 제네릭 타입변수 T에 Promise타입이 들어온다면 Promise 타입의 결과값 타입을 반환하는 타입으로 만들어야 한다.  

첫번째 조건을 만족하도록 구현해본다.  
PromiseUnpackA 타입을 선언한 뒤, T extends Promise<any> ? any : never와 같이 조건부 타입을 활용하되, 우선 Promise객체의 제네릭 타입 변수에는 임시로 any를 지정해준 뒤,  
T가 Promise<any>의 서브타입이라면 any타입을 서브타입이 아니라면 never타입으로 추론되도록 조건부 타입을 작성한다.  
*/
type PromiseUnpackA<T> = T extends Promise<any> ? any : never;
type PromiseAA = PromiseUnpackA<Promise<number>>; // type PromiseAA = any
type PromiseBB = PromiseUnpackA<Promise<string>>; // type PromiseAA = any
/* 
실제로 타입변수를 선언하여 추론하도록 적용해본 뒤 마우스 커서를 올려보면 아직까지는 any타입을 반환한다.  

두번째 조건을 만족하도록 하기 위해서 Promise의 제네릭 타입 변수 any 대신 infer R을 지정하고 조건식이 참일 경우 R을 반환하도록 조건부 타입을 수정한다.
*/
type PromiseUnpackB<T> = T extends Promise<infer R> ? R : never;
type PromiseAAA = PromiseUnpackB<Promise<number>>; // type PromiseAAA = number
type PromiseBBB = PromiseUnpackB<Promise<string>>; // type PromiseBBB = string
/* 
실제로 타입변수를 선언하여 추론하도록 적용해본 뒤 마우스 커서를 올려보면 number타입과 string타입을 각각 반환해 주는것을 확인할 수 있다.
PromiseUnpackB 타입의 제네릭 타입 변수 T는 Promise<number> 이고, Promise<number> extends Promise<infer R> 라는 조건부 타입을 해석해보면  
infer 키워드에 의해 Promise<number>타입이 서브타입이 되는 R 타입을 추론하라는 의미가 된다.  
Promise<number> 타입이 서브타입이 되기 위해서는 Promise<infer R> 에서 R 타입은 number가 되면 된다.  
따라서 결과 타입은 R이 되고, R은 number이기 때문에 결과 타입도 number로 추론된다.  
Promise<string> 타입도 위의 논리 과정과 동일하게 적용되어 string타입으로 추론된다.  
*/