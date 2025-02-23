/* 
## 함수 타입의 호환성
기본 타입의 호환성이나 객체 타입의 호환성과 똑같이 함수 타입을 다른 함수 타입으로 취급해도 괜찮은가를 판단하는 말이다.  
함수타입의 호환성을 판단할 때는 두 가지의 체크리스트가 있다.  

1. 반환값의 타입이 호환되는지에 대한 여부
2. 매개변수의 타입이 호환되는지에 대한 여부
위 두가지의 기준이 모두 만족되어야만 두 함수의 타입이 호환된다라고 말할 수 있다.
*/


/* 
### 1. 반환값이 호환되는가?
두개의 함수 타입을 만들어본다.  
number 타입의 반환값을 가지는 함수 타입 A와 number 리터럴 타입 10의 반환값 타입을 갖고 있는 함수 타입 B를 선언한다.  
다음으로 10을 반환하는 함수 a와 b에 각각의 함수 타입을 지정한다.  
B타입의 함수는 무조건 number 리터럴 타입 10을 반환하기 때문에 20을 반환하면 오류가 발생한다.
*/
type A = () => number;
type B = () => 10;

let a: A = () => 10;
let b: B = () => 10; // 10이 아닌 number 값을 반환하면 오류가 발생한다.

/* 
이때 변수 a에 b를 할당할 경우 허용되지만 변수 b에 a를 할당할 경우는 허용되지 않는다.
*/
a = b;
b = a; // b < a 즉, a가 number 타입이고, b는 number 리터럴타입 이므로 a 더 크다.

/* 
a함수의 반환값 타입은 number 타입이다.  
b함수의 반환값 타입은 number 리터럴 타입 10 이다.  
반환값 타입으로만 보자면 b에 a를 할당하겠다는 것은 type A를 type B로 취급하겠다는 것과 똑같은것이다.  
함수 a와 b의 타입이 다르기 때문이다.  

반환값의 기준으로만 보면 타입 B의 반환값은 number 리터럴 타입이다.
타입 A의 반환값은 number 타입이다.  
number 타입을 number 리터럴 타입으로 취급하겠다는것이다.
이는 number 타입이 number 리터럴타입 보다 크기 때문에 다운캐스팅에 해당한다.  
이것이 바로 허용되지 않는 이유이다.  
함수 타입 간의 호환성을 평가할 때 이렇게 반환값이 호환되는지에 대한 기준은 반환값끼리의 다운 캐스팅이 되면 안되도록 평가를 한다.  
따라서 a라는 변수에 저장된 함수의 반환값의 타입이 b 변수에 저장된 함수의 반환값 보다 크기 때문에 다운 캐스팅이다.  

반대로 a에 b를 할당하는것은 허용되었다.  
변수 a에 변수 b를 할당하는것은 b 타입을 a 타입으로 취급하겠다는 것이다.  
b 타입의 반환값으로만 보면 number 리터럴 타입 이며,
a 타입의 반환값은 number 타입이다.  
number 리터럴 타입을 number 타입으로 취급하겠다는 것은 업캐스팅이기 때문에 a에 b를 할당하는것은 허용이 되는 것이다.  

이렇게 반환값 타입끼리는 업캐스팅하는 상황에서는 호환된다고 판단하고, 다운캐스팅 하는 상황에서는 호환되지 않는다고 판단한다.  
쉽게 말해 B타입을 A타입으로 취급하려고 할 때 A타입의 반환값이 더 큰 타입이라면 통과되고 반대로는 안된다고 하는것이다.
*/

/* 
### 2. 매개변수가 호횐되는가?
2_1) 매개변수의 갯수가 같을 때.
2_2) 매개변수의 갯수가 다를 때.
*/

/* 
#### 2_1) 매개변수 갯수가 같을 때 예제
매개변수는 number라는 타입을 갖고 반환타입은 void인 타입 C, 타입 D를 선언한다.
두개의 각 타입을 갖는 함수 c, d를 선언한다.  
타입도 같고 매개변수도 같을 경우 양쪽으로 할당하는것이 호환된다.
두개가 똑같은 타입이기 때문이다.  

*/
type C = (value: number) => void;
type D = (value: number) => void;

let c: C = (value) => {};
let d: D = (value) => {};
c = d;
d = c;


/* 
아래와 같이 매개변수 value를 number 리터럴 타입 10으로 정의한 함수 타입 E가 정의된 실제 함수 e를 함수 c에 할당하려고 하면 오류가 발생한다.  
number 리터럴 타입을 number 타입으로 취급하는것이기 때문에 업캐스팅인데, 왜 안되는것일까?  
반환값 타입을 기준으로 호환성을 판단할때와는 다르게 매개변수의 타입을 기준으로 호환성을 판단할 때는 반대로 upcatsing일때는 호환이 되지 않는다고 평가한다.
반대의 경우로 다시 함수 e에 함수 c를 할당하도록 작성할 경우 오류가 발생하지 않는다.  
e는 number 리터럴타입 타입, c는 number타입 즉, `number → number 리터럴` 으로 취급하는 다운캐스팅이지만 허용이 되는것이다.  

결론적으로 매개변수의 타입을 기준으로 함수 타입의 호환성을 판단할 때에는 업캐스팅일땐 안되고, 다운캐스팅일때는 된다.  

*/

type E = (value: 10) => void;
let e: E = (value) => {};
c = e; // 업캐스팅 허용안됨
e = c; // 다운캐스팅 허용됨.


/* 
매개변수가 객체 타입을 사용하는 예시
*/
type Animal = {
  name: string;
}
type Dog = {
  name: string;
  color: string;
}

/* 
Animal 타입이 조건이 더 작기 때문에 두 타입간의 관계는 Animal 타입이 Dog 타입의 Super 타입이다.  
각 타입을 지정할 함수를 구현해주고, Dog타입을 갖는 함수 dogFunc를 Animal타입을 갖는 함수 animalFunc에 할당할 경우 오류가 발생한다.  
이는 이전과 똑같은 상황으로 animalFunc의 매개변수 타입은 Animal이고 dogFunc 매개변수 타입은 Dog로 animalFunc의 매개변수 타입 Animal이 Super 타입으로 더 큰 타입이다.  
역시 dogFunc에서 animalFunc로 업캐스팅 되는 상황인데 안되는것이다.  
*/
let animalFunc = (animal: Animal) => {
  console.log(animal.name)
};
let dogFunc = (dog: Dog) => {
  console.log(dog.name)
  console.log(dog.color)
};
animalFunc = dogFunc;
dogFunc = animalFunc;


/* 
animalFunc에 dogFunc를 할당한다는 것은 코드로 예를들면 다음과 같다.  
Animal타입에는 color라는 프로퍼티가 없기 때문에 오류가 발생한다.  
따라서 할당하려고 하는 함수의 매개변수 타입이 Dog처럼 서브타입일 경우 아래와 같이 말도안되는 코드가 나올 수 있기 때문에 업캐스팅일 때는 허용하지 않도록 막아주는것이다.
*/
let testFuncA = (animal: Animal) => {
  console.log(animal.name)
  console.log(animal.color)
}


/* 
반대로 dogFunc에 animalFunc를 할당하는것을 허용하는 이유를 코드로 예를 들면 다음과 같다.  
dogFunc에 animalFunc를 할당하는 것이기 때문에 매개변수의 타입은 dogFunc를 따라야 한다.  
Dog타입은 Animal타입의 서브타입이기 때문에, 기본적으로 Animal타입의 객체들이 갖고 있는 모든 프로퍼티들을 Dog 타입은 이미 갖고 있다.  
그렇기 때문에 animalFunc를 dogFunc에 할당해도 전혀 아무런 타입 오류가 발생하지 않는 것이다.  
*/

let testFuncB = (dog: Dog) => {
  console.log(dog.name)
  console.log(dog.color)
}

/* 
#### 2_2) 매개변수 갯수가 다를 때 예제

funcA = funcB가 허용되는 이유는 다음과 같다.
funcA의 매개변수는 2개, funcB의 매개변수는 1개이다.  
funcA의 매개변수 갯수가 더 많기 때문에 허용된다.

그러나 반대인 funcB = funcA의 경우는 허용되지 않는다.  
funcA의 매개변수 갯수가 더 많은데 funcB로 취급하려고 하는것은 허용되지 않는다.
할당 하려고 하는 쪽의 함수 타입의 매개변수의 갯수가 더 적을 때에만 호환이 되는것이다.
*/

type FuncA = (a: number, b: number) => void;
type FuncB = (a: number) => void;

let funcA: FuncA = (a, b) => {};
let funcB: FuncB = (a) => {};
funcA = funcB;
funcB = funcA;

/* 
물론 당연하게도 매개변수의 갯수가 더 작은 funcD를 funcC에 할당하려고 할때 만약 실제 할당되는 기준의 매개변수의 타입이 서로 다를 경우에도 허용되지 않는다.  
적어도 갯수가 다를 때의 기준을 적용 하려면 타입이 같은 매개변수가 있어야 된다.
*/
type FuncC = (a: string, b: number) => void;
type FuncD = (a: number) => void;

let funcC: FuncC = (a, b) => {};
let funcD: FuncD = (a) => {};
funcC = funcD;

