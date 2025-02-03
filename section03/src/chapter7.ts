/* 
# 타입 좁히기
조건문 등을 이용해 넓은 타입에서 좁은타입으로 타입을 상황에 따라 좁히는 방법을 말한다.  

number타입이나 string타입이 들어올 수 있는 유니온 타입의 매개변수 value를 받는 함수를 선언한다.  
value타입이 number일 경우 `toFixed()` 메소드를 적용한 값을 출력하고,
value타입이 string타입이라면 `toUpperCase()` 메소드를 적용한 값을 출력해본다.  
해당 함수를 선언한 후 한가지 주목할 포인트가 있다.  
if 조건문의 value 변수에 마우스 커서를 올려보면 각각 number타입, string타입으로 서로 다른 타입으로 추론된다.  
분명히 매개변수 value의타입을 number | string 유니온 타입으로 정의했는데 위쪽 조건문 내부에서는 value의 타입이 number타입으로 추론되고  
아래쪽 조건문 내부에서는 string타입으로 추론된다.  
그리고 모든 조건문 바깥에서는 value를 그냥 string과 number의 유니온 타입으로 추론되고 있다.  
그렇기 때문에 조건문 바깥에서는 value에 toUpperCase() 라던가 toFixed() 같은 메소드를 적용하면 에러가 발생한다.
*/
function func1(value: number | string) {
  value; // 유니온타입 추론 - (parameter) value: string | number
  value.toUpperCase(); // Error
  value.toFixed(); // Error
  if (typeof value === 'number') {
    console.log(value.toFixed());
    return;
  }
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
    return;
  }
}

/* 
타입스크립트가 이렇게 동작하는 이유는 타입 좁히기 라는 기능 때문이다.  
첫번째 조건문을 다시 확인해보면 typeof 연산자를 통해 value의 타입이 number타입일 때에만 중괄호 내부에 있는 코드를 수행하도록 만들었다.  
누가봐도 중괄호 내부에서 value라는 값의 타입은 number타입이 될것이다.  
이렇게 어떤 변수가 특정 조건문 내부에서 더 좁은 타입임을 보장할 수 있을 때에는 타입스크립트는 해당 변수의 타입을 더 좁은 타입으로 자동으로 추론해 준다.  
더 쉽게 말하면 변수 value는 첫번째 조건문 내부에서 number와 string타입으로 만든 union타입 보다는 더 좁은 number타입임이 보장이 되는것이다.  
number타입이 number와 string타입의 union보다 좁은 타입인 이유는 number타입과 string타입의 union타입은 `number ∪ string` 합집합인 반면  
number타입만 있는것은 number ∪ string 유니온 타입보다 더 작은 집합이기 때문에 더 좁은 타입이라고 볼 수 있다.  
따라서 조건문 내부의 value타입이 더 좁은 타입인 number타입으로 보장될 수 있기 때문에 자동으로 변수 value의 타입이 중괄호 안에서는 number타입으로 좁아진다는 뜻이다.  
이것이 바로 타입스크립트의 타입 좁히기이다.

두번째 조건문도 상황은 같다.  
조건문 내부에서 value의 탕비이 string타입임이 보장된다.  
그렇기 때문에 조건문 내부에서도 value의 타입이 string타입으로 잘 추론이 되어 toUpperCase()같은 문자열 메서드를 써도 오류가 발생하지 않는다는것을 확인할 수 있다.  
*/

/*
## 타입 가드
또한 typeof 연산자를 활용해서 조건문과 함께 타입을 좁힐 수 있는 이런 표현들을 타입스크립트에서는 특별히 `타입 가드`라고 부른다.  
마치 if 조건문의 typeof 표현이 number타입의 값 외에는 중괄호 내부로 들어갈 수 없도록 가드를 하고 있는 것과 비슷한 것이다.  
실제로 개발을 할때 매개변수에 여러가지 타입의 값들이 들어올 수 있고 함수 내부에서는 값의 타입에 따라서 각각 다른 동작을 시키는 범용적인 함수들을 꽤 자주 만들기 때문에 
이런 타입 좁히기와 타입 가드를 잘 알아두고 활용하면 좋다.  

또한 지금까지 살펴본 typeof 연산자 외에도 여러가지 타입 가드들이 추가로 존재한다.  
*/


/* 
### 타입 가드 - typeof
기존 함수에 Date 객체를 유니온 타입으로 추가해본다.
Date 객체는 날짜를 저장하는 객체이며 Node.js가 기본적으로 제공하는 내장 객체들에 대해서는 타입들이 다 기본적으로 제공이 된다.  
다시 본론으로 돌아와 value의 타입이 Date 객체일 때 getTime() 메소드를 출력하는 기능을 만들어 본다.
Date 객체는 객체 이므로 조건문에서 value의 타입 비교문자열을 object로 지정한다.  
*/
function func2(value: number | string | Date) {
  if (typeof value === 'number') {
    console.log(value.toFixed());
    return;
  }
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
    return;
  }
  if (typeof value === 'object') {
    console.log(value.getTime());
    return;
  }
}

/* 
### 타입 가드 - instanceof
그러나 typeof를 사용하는것은 별로 좋은 방법은 아니다.  
value타입에 하나의 union을 더 붙여서 null값도 들어올 수 있다고 가정해 보면 바로 오류가 발생한다.  
자바스크립트 연산자인 typeof 연산자는 null값에다가 typeof를 해도 'object'를 똑같이 반환한다.  
(실제로 console.log(typeof null)는 object를 출력함)
그렇기 때문에 해당 조건문을 통과하는 값이 Date객체 값 뿐만 아니라 null값도 통과할 수 있는 것이다.  
결국 중괄호 내부에서 value의 타입이 Date객체일 것이라는것을 보장할 수가 없다.  
따라서 value는 Date객체이거나 null타입일것이다 라고 `(parameter) value: Date | null` 와 같이 추론되어 버리고
getTime() 메소드를 null값에서는 사용할 수가 없기 때문에 타입 오류가 발생하는 것이다.  
*/

function func3(value: number | string | Date | null) {
  if (typeof value === 'number') {
    console.log(value.toFixed());
    return;
  }
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
    return;
  }
  if (typeof value === 'object') {
    console.log(value.getTime()); // 'value' is possibly 'null'.ts(18047) - (parameter) value: Date | null
    return;
  }
}


/* 
instanceof 라는 연산자를 활용하여 타입을 좁혀본다.  
조건문에 `value instanceof Date`를 선언하니 놀랍게도 오류가 사라진다.  
instanceof 연산자는 왼쪽의 값이 오른쪽의 instance인지 묻는 연산자로 참일 경우 true를, 거짓일 경우 false를 반환한다.  
만약 객체 지향을 배워봤다면 instance가 무엇인지 알것이다.  
instanceof라는 연산자는 좌측 value값이 우측 Date객체인지 묻는것이다.  
결론적으로 null은 Date객체가 아니기 때문에 해당 조건을 통과할 수 없어 조건문 블록 안의 value에 마우스 커서를 올려보면 Date객체로 잘 추론되는것을 확인할 수 있다.  
타입이 잘 좁혀지게 되는것이다.  
*/
function func4(value: number | string | Date | null) {
  if (typeof value === 'number') {
    console.log(value.toFixed());
    return;
  }
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
    return;
  }
  if (value instanceof Date) {
    console.log(value.getTime());
    return;
  }
}

/* 
### 타입 가드 - in
타입스크립트 객체 별칭 Person을 선언하여 매개변수 value의 유니온 타입에 적용한 뒤, 타입 좁히기를 구현해본다.  
`value instanceof Person`을 할 경우 Person은 형식만 참조하지만 여기서는 값으로 사용되고 있다 라는 내용의 오류가 발생한다.  
instanceof 연산자는 우측 항에 type(타입 별칭)이 들어와서는 안된다.  
instanceof 연산자는 엄밀히 말하면 좌측의 값이 우측 class의 instance인지 확인하는 연산자이기 때문이다.  
Date는 자바스크립트의 내장 클래스이기 때문에 instanceof 연산자 뒤에 올 수 있다.  
쉽게 말해 instanceof연산자와 사용할 수 있는 것이다.  
그러나 Person은 클래스가 아닌 타입 별칭으로 만든 일종의 객체 타입이기 때문에 instanceof 연산자의 뒤에 활용할 수 없다.  
*/

type Person = {
  name: string;
  age: number;
}

function func5(value: number | string | Date | null | Person) {
  if (typeof value === 'number') {
    console.log(value.toFixed());
    return;
  }
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
    return;
  }
  if (value instanceof Date) {
    console.log(value.getTime());
    return;
  }
  if (value instanceof Person) { // 
    console.log(`${value.name}은 ${value.age}살 입니다.`);
    return;
  }
}

/* 
이 경우 instanceof 연산자가 아닌 in 연산자를 쓰면 된다.  
사용 문법은 다음과 같다.  
먼저 좌측항에 프로퍼티 이름을 문자열 형태로 선언한 후 우측 항에 값에 해당하는 value를 선언한다.  
바로 age 프로퍼티가 value값에 존재하는지를 묻는것이고, 만약 존재한다면 true를 존재하지 않는다면 false를 반환한다.  
그렇기 때문에 해당 조건문을 만족함녀 value 타입이 중괄호 안에서는 Person타입이라고 보장할 수 있게 된다.  
value타입으로 들어올 수 있는 게 number, string, Date, null, Person인데 이 중 age라는 프로퍼티를 가질 수 있는건 Person밖에 없기 때문이다.  
*/

function func6(value: number | string | Date | null | Person) {
  if (typeof value === 'number') {
    console.log(value.toFixed());
    return;
  }
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
    return;
  }
  if (value instanceof Date) {
    console.log(value.getTime());
    return;
  }
  if ('age' in value) {
    console.log(`${value.name}은 ${value.age}살 입니다.`);
    return;
  }
}


/* 
그러나 실제 코드상에서는 value는 null일 수 있습니다 라는 오류가 발생한다.  
in 연산자 뒤에는 null이나 undefined값이 들어오면 안되기 때문이다.  
이 경우 value가 null이 아님을 밝혀주기 위해 in 비교 조건 앞에 value가 있다라고 알려주고 && 연산자를 활용하여 value가 있을 때만 age가 value에 있는가에 대해 검사시켜 주면 된다.  
`value && 'age' in value`
*/

function func7(value: number | string | Date | null | Person) {
  if (typeof value === 'number') {
    console.log(value.toFixed());
    return;
  }
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
    return;
  }
  if (value instanceof Date) {
    console.log(value.getTime());
    return;
  }
  if (value && 'age' in value) {
    console.log(`${value.name}은 ${value.age}살 입니다.`);
    return;
  }
}

/* 
이렇게 선언하면 조건문 내부에서의 value의 타입은 Person 타입으로 잘 좁혀지게 된다.
*/