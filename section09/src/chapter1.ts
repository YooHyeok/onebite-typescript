/* 
## 분산적 조건부 타입

*/
type StringNumberSwitch<T> = T extends number ? string : number;
/* 
이전시간에 제네릭과 함께 조건부 타입 문법을 이용해서 T extends number 즉, number의 서브타입이라면 string을, 아니라면 number를 타입으로 지정할 수 있었다.  
*/
let a:StringNumberSwitch<number> // let a: string
let b:StringNumberSwitch<string> // let b: number
/* 
StringNumberSwitch 타입 변수를 선언하고 제네릭 타입 변수 T에 number를 전달하면 T가 number가 되기 때문에 조건식이 참이 되어 결과가 string타입이 되고, 반대로 타입 변수에 string타입을 전달하면 t가 string타입이 되기 때문에 조건식이 거짓이 되어 number타입이 되는것을 확인할 수 있다.  
*/
/* 
### 예제1) 분산적 조건부 타입 - 기본
분산적 조건부 타입 이라는것은 조건부 타입을 유니온과 함께 사용할 때 조건부 타입이 분산적으로 동작하게 업그레이드 되는 문법을 말한다.  
아래와 같이 변수 c를 한번 더 선언해 주고, 이번에는 제네릭 타입 변수에 number|string과 같이 유니온 타입을 전달할 경우, 이때부터는 우리가 알던 조건부 타입처럼 동작하지 않게 된다.  
*/
let c:StringNumberSwitch<number|string> // let c: string | number
/* 
T가 number|string 유니온 타입이 되면 number|string 유니온 타입은 number와 super의 합집합이 되기 때문에 number타입의 수퍼 타입이 된다.  
따라서 T extends number는 거짓이 된다.  
거짓이기 때문에 변수 c의 타입은 number로 추론되어야 하지만 string|number 타입으로 추론되고 있다.  

이렇게 되는 이유는 조건부 타입에 타입 변수로 유니온 타입을 할당해버리면 그때부터는 일반적인 조건부 타입이 아니라 분산적인 조건부 타입으로 업그레이드 되기 때문이다.  
조건부 타입의 동작 방식이 바뀐다.  
타입 변수에 <number | string>과 같이 유니온 타입을 할당하게 되면 유니온 타입이 그대로 타입 변수에 들어오는게 아니라 한번은 number 한번은 string으로 두 개가 분리되어 들어간다.  
즉, <number | string> 형태의 유니온 타입을 타입 변수에 전달한다는 것은, 한번은 <number> 한번은 <string> 과 같이 두번 전달되는것이다.  
그리고 최종적으로 그 두 개의 타입이 유니온으로 묶이게 되는 것이다.  

이때 StringNumberSwitch타입의 타입변수에<number>를 할당하게 되면 number extends number는 참이기 때문에 결과는 string 타입이 될것이다.
두번째로 StringNumberSwitch 타입의 타입변수에 <string>을 할당하게 되면 string extends number는 거짓이기 때문에 결과는 number타입이 될 것이다.  
이렇게 분리된 두 결과를 유니온으로 묶을 경우 결과는 string|union타입이 되는것이다.  
*/

let d: StringNumberSwitch<boolean | number | string> // let d: string | number
/* 
위와같이 StringNumberSwitch 타입의 타입변수에 boolean|number|string 유니온 타입을 전달해 보도록 한다.  
boolean number string 유니온 타입 요소들 각각이 모두 분리되어 조건식에 적용된다.  
StringNumberSwitch<boolean>, StringNumberSwitch<number>, StringNumberSwitch<string>과 같이 3번 적용된다.  
이렇게 분리된 결과들은 다시 유니온으로 묶이게 된다.  
StringNumberSwitch의 타입변수에 boolean을 전달하게 되면 T가 boolean이 되고 boolean extends number는 거짓이기 때문에 number 타입이 된다.  
StringNumberSwitch의 타입변수에 number을 전달하게 되면 T가 number이 되고 number extends number는 참이기 때문에 string 타입이 된다.  
StringNumberSwitch의 타입변수에 string을 전달하게 되면 T가 string이 되고 string extends number는 거짓이기 때문에 number 타입이 된다.  
최종 결과는 number, string, number인데, number가 두번 있을 필요는 없으니까 하나는 사라져서 string | number 유니온 타입으로 결과가 추론된다.  
*/

/* 
### 예제2) 분산적 조건부 타입 - 실용
첫번째로는 분산적 조건부 타입의 기능을 이용해서 유니온에서 특정 타입만 제거하는 타입을 만들어 본다.  
제네릭 타입 변수로 T, U 두개를 받도록 하고, T가 U를 확장한다면 never타입을, 확장하지 않는다면 T 타입을 반환하도록 조건부 타입 식을 작성한다.  
*/
type Exclude<T, U> = T extends U ? never : T;
/* 
위 조건부 타입 식을 해석해보면 타입 변수 T가 타입 변수 U의 서브타입 이라면 never 결과가 되고, 아니라면 T 자체가 결가가 된다.  
예를들어 변수 e에 Exclude 타입을 적용하고 제네릭 타입 변수 T는 number를, U에는 string을 적용해본다.  
*/
let e: Exclude<number, string> // let e: number
/* 
number extends string ? never : number;는 거짓이 되기 때문에 변수 e는 number 타입이 된다.  

두번쨰로 타입변수 T와 U 모두 number타입으로 적용해보자.  
*/
let f: Exclude<number, number> // let f: never
/* 
이 경우 number extends number ? never : number;는 참이 되기 때문에 변수 f는 never 타입이 된다.  
*/

/* 
#### 실제 응용1
조건부 타입을 이용해서 유니온 타입으로부터 특정 타입만 제거하는 타입을 만들어 본다.  
*/
type A = Exclude<number | string | boolean, string>; // type A = number | boolean
/* 
먼저 T에 유니온 타입을 타입 변수에 할당했기 때문에 분산적 조건부 타입이 되었다.  
Exclude<number, string>  
Exclude<string, string>  
Exclude<boolean, string>  
위와 같이 유니온 타입의 각 타입으로 3번 분리가 되었다.  
이렇게 분리 된 타입의 결과들은 최종적으로 유니온 타입으로 묶여야 될 것이다.  
이제 분리된 각 유니온 타입들로 부터 조건부 타입 연산의 결과를 도출해 본다.  
Exclude<number, string>의 경우 `number extends string ? never : number`가 거짓이므로 number 타입이 된다.  
Exclude<string, string>의 경우 `string extends string ? never : string`가 참이므로 never 타입이 된다.  
Exclude<boolean, string>의 경우 `boolean extends string ? never : boolean`가 거짓이므로 boolean 타입이 된다.  
최종 결과는 number, never, number 타입이며 이를 유니온 타입으로 묶게 되면 number | never | boolean 유니온 타입이 된다.   

이때 union 타입에 never 타입이 포함되어 있으면 never는 결국 사라진다.  
집합으로 생각해보면 유니온 타입이라는 것은 타입들 간의 합집합 타입을 만드는 것이다.  
never타입이란 공집합 타입이기 때문에 공집합과 다른 어떤 집합을 합집합 한다는 건 원래 원본 집합인 것이다.  
예를 들어 숫자값들을 포함하는 number라는 집합과, 아무런 요소들도 포함하지 않는 never라는 공집합을 합집합하면 결국 number라는 집합이 된다.  
그렇기 때문에 결과에 never타입이 포함되어 있으면 never타입은 사라지게 되며, 최종 결과는 number | boolean 타입이 된다.  

타입 A에 마우스 커서를 올려보면 `type A = number | boolean` 타입이 되는것을 볼 수 있다.  
Exclude라는 조건부 타입을 만들면, T와 U가 같을 때 never를 반환하게 해서 아에 type을 없애버리고, T와 U가 다를 때 T를 그대로 반환해서 해당 타입을 그대로 적용한다.  
이렇게 분산적인 조건부 타입을 이용해서 특정 유니온 타입으로부터 특정 타입만 제거하는 유니온 타입을 얻어내는 것도 가능하다.  

*/
/* 
#### 실제 응용 2
Exclude의 반대 격이 되는 Extract 타입을 만들어 본다.  
제네릭 타입 변수 T와 U를 구성한 뒤, U에 해당하는 타입만 제거하도록 구현해본다.  
예를들어 number | string | boolean 유니온 타입 중 string인 타입만 뽑아내도록 한다.
*/
type Extract<T, U> = T extends U ? T : never;
type B = Extract<number | string | boolean, string>;
/* 
위와같이 분산적 조건부 타입 식을 적용할 경우 타입 B는 U의 타입인 string 타입으로 추론된다.  
과정을 정리해보면 다음과 같다.  
Extract<number, string>  
Extract<string, string>  
Extract<boolean, string>  
위와 같이 유니온 타입의 각 타입으로 3번 분리가 되었다.  
이렇게 분리 된 타입의 결과들은 최종적으로 유니온 타입으로 묶여야 될 것이다.  
이제 분리된 각 유니온 타입들로 부터 조건부 타입 연산의 결과를 도출해 본다.  
Extract<number, string>의 경우 `number extends string ? string : never`가 거짓이므로 never 타입이 된다.  
Extract<string, string>의 경우 `string extends string ? string : never`가 참이므로 string 타입이 된다.  
Extract<boolean, string>의 경우 `boolean extends string ? string : never`가 거짓이므로 never 타입이 된다.  
최종 결과는 never, string, never 타입이며 이를 유니온 타입으로 묶게 되면 string 타입이 된다.   
*/
/* 
### 조건부 타입의 분산 방지
조건부 타입이 분산적으로 작동되지 않게 하고 싶다면 extends의 양 옆에 대괄호를 씌워주면 된다.
*/
type Example<T, U> = [T] extends [U] ? T : never;
type C = Example<number | string | boolean, string>;
/* 
위의 결과는 never타입이 된다.  
number | string | boolean의 합집합 유니온 타입은 extends string이 거짓이 되기 때문이다.  
*/