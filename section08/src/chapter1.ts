/* 
## keyof 연산자
특정 객체 타입으로부터 프로퍼티 키들을 유니온 스트링 타입으로 추출하는 연산자이다.  


### 예제1)
첫번쨰로 이름과 나이를 갖는 Person타입 인터페이스를 구현한다.  
string타입의 name, number타입의 age프로퍼티를 각각 정의한다.  
두번째로 매개변수로 person타입 객체와 key 값을 받아 함수 내부에서 person객체로부터 key 프로퍼티의 값을 반환하는 함수를 구현한다.  
*/
interface Person {
  name: string;
  age: number;
}
function getPropertyKey(person, key) {
  return person[key]
}
/* 
다음으로 Person타입을 갖는 변수 person을 정의하고, name과 age 프로퍼티에 값을 각각 할당한 뒤, 구현한 함수의 매개변수로 전달한다.  
이때, key에 해당하는 매개변수로는 "name" 값을 넘긴다.  
호출의 결과값은 객체 초기 선언시 name 프로퍼티에 할당한 `유혁스쿨`이 될것이다.  
*/
const person: Person = {
  name: '유혁스쿨',
  age: 32
}
const name = getPropertyKey(person, "name")
console.log(name); // tsx src/chapter1.ts `유혁스쿨`
/* 
다시 함수로 돌아가 매개변수에 타입을 지정해준다.  
첫번째 매개변수 person은 Person타입으로 지정해주면 되는데, key 매개변수의 타입은 string으로 할 경우 오류가 발생한다.  
모든 문자열 값이 person 객체의 key라고 볼 수 없기 때문이다.  
예를들어 `name2` 같은 문자열 값을 전달하더라도 key의 타입이 string이기 때문에 문제가 되지 않지만, person객체에는 name2라는 프로퍼티가 없기 때문에 허용할 경우 문제가 될 수 있다.  
*/
function getPropertyKeyA(person: Person, key: string) {
  return person[key]
}
const name2 = getPropertyKeyA(person, "name2");
console.log(name2) // tsx src/chapter1.ts `undefined`

/* 
key의 타입은 name 또는 age만 들어올 수 있게 union타입으로 만들어 줘야 한다.  
*/
function getPropertyKeyB(person: Person, key: "name" | "age") {
  return person[key]
}
/* 
그러나 프러퍼티의 키의 타입을 정의할 때 위와같이 union을 쓰는건 문제가 될 가능성이 굉장히 크다.  
현재 정의한 person 객체의 프로퍼티는 2개밖에 없지만 만약 10개, 20개, 50개, 100개로 구성된다면 모든 프로퍼티의 키들을 union으로 만들기 어렵기 때문이다.  
노력한다면 쓸 수 있겠지만 비용이 많이 드는 작업이다.  
또한 person 객체에 새로운 프로퍼티가 추가되거나 또는 몇가지 프로퍼티의 이름이 수정되는 상황이 오면 그때마다, union타입에 새로운 멤버를 추가해주거나 변경해주는 등 지속적인 수정이 필요할 것이다.  

이때 사용 가능한 효율적인 문법이 바로 keyof 연산자를 사용하는 것이다.  

매개변수 key의 타입을 keyof Person으로 지정해준다.  
*/

function getPropertyKeyC(person: Person, key: keyof Person) {
  return person[key]
}
/* 
이렇게 타입을 정의할 경우, "name" string 리터럴 유니온(|) "age" string 리터럴 타입으로 추출이 된다.  
만약 이때 
```ts
interface Person {
  name: string;
  age: number;
  location: string
}
```
처럼 location 프로퍼티가 추가된다고 하더라도 key의 타입을 keyof Person으로 해놓으면 key 프로퍼티에 자동으로 location도 "name"|"age"|"location" 처럼 유니언으로 추가된다.  
따라서 어떤 객체 타입의 프로퍼티의 갯수가 많더라도 혹은, 프로퍼티의 이름이 자주 바뀌거나 새로운 프로퍼티가 자주 추가되더라도, keyof 연산자를 사용할 경우 아주 쉽게 객체 타입의 프로퍼티 키들을 union타입으로 추출해낼 수 있게 된다.  

한가지 주의할 점은 keyof 연산자는 무조건 타입에만 사용할 수 있는 연산자이다.  
예를들어 `key: keyof person`과 같이 타입 혹은 인터페이스가 아닌 변수를 적용할 경우 바로 오류가 발생하게 된다.  
따라서 반드시 keyof 연산자는 뒤에 타입이 와야된다.  
*/ 

/* 
### typeof 연산자와 함께 사용
```js
typeof person === "object"
```
위와같이 typeof 연산자는 자바스크립트에서 특정 변수의 타입을 string값으로 반환하는 연산자이다.  
typeof 연산자는 타입스크립트 에서 특별히 타입을 정의할 때 사용하면 동작이 다르게 바뀐다.  

실제 사용 문법은 아래와 같다.  
*/
const personA = {
  name: '유혁스쿨',
  age: 32
}
type PersonA = typeof personA;
/* 
personA 변수 선언부에 마우스를 올려보면 타입스크립트가 추론하는 변수 personA의 타입으로 정의가 잘 된것을 확인할 수 있다.  
즉, personA변수의 타입을 추론하여 PersonA라는 타입 별칭에 할당한것이다.  
typeof 연산자는 이런식으로 type을 정의할 때 사용하면 특정 변수의 타입을 뽑아내는 용도로도 활용할 수 있다.  
그렇기 때문에 keyof 연산자의 우측에 `keyof typeof 변수명` 형태로도 작성할 수 있게 된다.
*/
function getPropertyKeyD(person: Person, key: keyof typeof personA) {
  return person[key]
}
/* 
typeof personA는 앞서 살펴본 personA변수의 타입을 타입스크립트가 추론한대로 객체 타입 형태로 뽑히게 된다.  
name 프로퍼티가 string으로, age 프로퍼티가 number인 객체 형태의 타입이다.  
이렇게 PersonA객체 타입으로 추출된 typeof personA 앞에 keyof 연산자를 적용할 경우 PersonA 객체의 프로퍼티를 유니온 타입으로 조합한 "name"|"age" 타입이 될것이다.  
*/