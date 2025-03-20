/* 
## 타입 변수 응용하기

### 타입 변수 3가지 사례
제네릭의 타입 변수의 여러가지 사례를 알아보도록 한다.


### 첫번째 사례 - 복수개의 타입 변수
두개의 매개변수 a, b를 받은뒤 [b, a] 형태로 순서를 뒤집어 반환하는 함수를 만든다.  
매개변수로 어떤 타입의 값이 들어올지 모르기 때문에 any타입으로 지정한다.  
호출과 동시에 구조분해 할당을 통해 배열형태로 할당한다.  
*/
function swap(a: any, b: any) {
  return [b, a]
}
const [a, b] = swap(1, 2);
/* 
매개변수의 any타입을 제네릭 함수로 바꿔 any를 제거해보도록 한다.
함수 이름 뒤에 꺽쇠를 열고 타입 변수를 먼저 선언한 뒤, 각 매개변수의 타입으로 타입변수를 지정해준다.
*/
function swapA <T> (a: T, b: T) {
  return [b, a]
}
/* 
만약 호출시점에 첫번째 매개변수a에 number 타입이 아닌 string 타입 "1"값을 넘긴다면 오류가 발생한다.
첫번째 매개변수로 string타입의 값을 전달할 경우 매개변수 a의 타입 T에 string타입 값이 들어오기 때문에 타입변수 T가 string 타입으로 할당되어버린다.  
이어서 두번째 매개변수로 number타입 값 2를 전달하고 있는데 이미 타입변수 T는 string타입으로 할당되어 버렸기 때문에 number타입 형식의 인수는 string타입의 매개변수에 할당될 수 없다 라는 에러가 발생하는것이다.  
*/
const [c, d] = swapA("1", 2); // Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)


/* 
위와 같이 매개변수 a와 b의 타입이 같을수도, 다를수도 있는 경우에는 타입 변수를 <T> 처럼 하나만 쓰는게 아니라 <T, U>와 같이 두개를 쓰면 된다.
실제로 호출할 경우 오류가 사라지는것을 확인할 수 있다.
매개변수 a에 들어오는 값은 string 타입 값이기 때문에 똑같이 타입변수 T에는 string이 할당되며,  
매개변수 b에 들어오는 값은 number 타입 값이기 때문에 타입변수 U에는 number타입이 할당되어서 서로 타입에대한 충돌이 발생하지 않기 때문에 오류없이 잘 수행되는것이다.  
*/

function swapB <T, U> (a: T, b: U) {
  return [b, a]
}
const [e, f] = swapB("1", 2); 

/* 
### 두번째 사례 - 배열과 튜플
data라는 매개변수를 하나 받은 뒤 매개변수로 들어오는 값이 배열일 것이라 기대하고 data의 0번째 인덱스를 반환하는 함수를 선언한다.  
data 매개변수의 타입은 아직 무엇이 될 지 모르므로 범용적으로 사용하기 위해 any 타입으로 정의해준다.  
*/
function returnFirstValue(data: any) {
  return data[0];
}
/* 
0, 1, 2를 요소로 갖는 number타입의 배열을 매개변수로 전달하여 함수를 호출하고 num변수에 저장할 경우 변수 num에는 number타입 값 0이 할당될것이다.  
*/
let num = returnFirstValue([0, 1, 2]);
/* 
"hello", "mynameis" 요소로 갖는 string타입의 배열을 매개변수로 전달하여 함수를 호출하고 num변수에 저장할 경우 변수 num에는 string타입 값 "hello"가 할당될것이다.  
*/
let str = returnFirstValue(["hello", "mynameis"]);

/* 
이때 매개변수의 타입을 any타입으로 정의해 놓았기 때문에 함수의 반환값도 당연히 자동으로 any타입으로 추론 된다.  
따라서, 어쩔수 없이 변수 num의 타입과 str의 타입도 똑같이 any 타입으로 추론이 되고 있다.  

해당 함수도 generic함수로 선언하여 어떤 타입의 배열이든 다 받을 수 있고, 배열의 첫 번째 요소를 반환하는데 타입까지 잘 추론되도록 만들어 본다.
먼저 타입 변수 T를 선언하고, 매개변수의 타입도 T로 정의해준다.  
이렇게 선언하는 순간 바로 첫번째 인덱스 배열요소에 접근하여 return할때 오류가 발생한다.  
unknown타입의 값에 배열 인덱스를 사용하지 말라는 오류이다.  
함수선언시 타입 변수를 사용할 경우 함수 내부에서는 아직 타입 변수 T에 할당될 타입을 호출해보기 전까지는 모르기 때문에 타입스크립트에서는 최대한 오류가 발생하지 않는 쪽으로 제한하기 위해 타입변수의 타입을 일단 unknown으로 추론한다.  
말 그대로 아직 호출 전이기 때문에 타입변수 T의 타입을 잘 모르겠다는 뜻이다.  
따라서 매개변수 data의 타입도 unknown 타입의 값이 되어서 배열 인덱스를 접근하려고 하면 오류가 발생하는것이다.
*/
function returnFirstValueA <T> (data: T) {
  return data[0] // Element implicitly has an 'any' type because expression of type '0' can't be used to index type 'unknown'.
}
/* 
이 경우 매개변수 data의 타입을 T가 아닌 T[] 배열 타입으로 지정할 경우 오류가 사라진다.  
T는 무엇이 될 지 몰라서 unknown타입이긴 하지만 data의 타입은 unknown[] 타입이야 라고 정의해주는것이다.  
어떤 배열이든 인덱스 접근은 가능하기 때문에 배열은 배열이니까 오류가 사라지게 되는것이다.  
*/
function returnFirstValueB <T> (data: T[]) {
  return data[0]
}
/* 
위와같이 타입 변수를 매개변수에 그대로 갖다 쓸 필요가 없이 배열 타입과 함께 쓸 수도 있으며, 나중에는 Tuple이나 객체타입을 사용할 때도 당연히 쓸 수 있다.  
변수에 할당하는 코드에서 numB변수에 마우스 커서를 올려보면 number타입으로 잘 추론이 되는것을 확인할 수 있고, strB변수에 마우스 커서를 올려보면 string타입으로 잘 추론되는것을 확인할 수 있다.  
*/
let numB = returnFirstValueB([0, 1, 2]);
let strB = returnFirstValueB(["hello", "mynameis"]);

/* 
만약 이때 두번째 함수 호출에서 number타입의 값을 배열에 하나 추가하면 어떻게 될까?  
매개변수 data에는 number와 string의 union타입이 제공된다.  
실제로 마우스 커서를 올려보면 `string | number` union타입으로 추론된다.  
data매개변수의 타입이 결국 number | string 매개변수의 배열 타입으로 잡힐것이다.  
그렇기 때문에 첫 번째 요소를 꺼내서 반환하도록 코드를 작성하면 타입스크립트는 첫 번쨰 요소가 number인지 string인지 모르기 때문에 그냥 number, string의 union 타입으로 반환 해버리는 것이다.  
*/
let strC = returnFirstValueB([1, "hello", "mynameis"]);

/* 
그러나 실제로 원하는것은 첫 번째 요소의 타입을 바꿔도 그냥 변수에는 실제 첫번째 배열 요소의 타입인 number 타입으로 추론되었으면 좋겠다.  
이 경우에는 data 매개변수의 타입을 배열 타입으로 쓰는게 아니라 조금 변형하여 tuple 타입으로 적용한다.
tuple 타입은 특정 인덱스에 해당하는 요소의 타입을 정확히 지정할 수 있는 기능이 있기 때문이다.  
tuple을 만들고 첫번째 요소 타입을 T로 해준 다음 그 다음 요소들의 타입은 몰라도 되므로 ...unknown[] 배열 형태로 적용한다.
실제로 변수 strD에 마우스 커서를 올려볼 경우 number타입으로 잘 추론해주고 있는것을 확인할 수 있다.  
*/
function returnFirstValueC <T> (data: [T, ...unknown[]]) {
  return data[0]
}
let strD = returnFirstValueC([1, "hello", "mynameis"]);
/* 
data의 타입이 tuple이고 첫번째 요소 타입은 T인것 까지는 알고 있을것이다.  
그런데 tuple의 첫 번째 요소 말고 그 다음부터 들어올 요소의 타입에 대해서는 알 필요가 전혀 없다.  
몇개가 들어오는지도 알 필요가 없다.  
그렇기 때문에 rest parameter를 쓰듯 ...을 써준 뒤 unknown 타입의 배열이 들어올것 같아 라고 작성하는것이다.  
예를들어 자바스크립트에서 `function func(...rest) {}` 와 같이 rest parameter를 쓰는것과 똑같고, 단순히 타입버전일 뿐이다.  
tuple인데 첫번째 요소 타입은 T이고, 나머지 요소는 배열로 여러개 들어올것 같은데 그들의 타입과 갯수는 모른다 라고 정의한것이다.  
data 매개변수에 들어오고 있는 값이 첫번째 요소의 타입은 number 나머지 요소의 타입은 몰라도 되므로 T는 number로 할당되는것이다.  
그렇기 때문에 data의 0번째 인덱스를 꺼내면 T의 타입을 갖고있는 요소를 꺼내서 반환하는 것이기 때문에 반환 값이 number타입이 되어서 strD 변수의 타입도 number 타입으로 추론이 되는것이다.  
*/

/* 
### 세번째 사례 - extends 타입변수 제한
매개변수로 any타입의 data를 받은 후 반환값으로 매개변수의 length 프로퍼티를 반환해주는 함수를 작성한다.  
*/
function getLength(data: any) {
  return data.length;
}
/* 
함수를 3번 호출한다.
첫번째 함수의 매개변수에는 1, 2, 3의 요소를 갖는 배열, 두번째 함수의 매개변수에는 "123" 문자열을, 세번째 함수의 매개변수에는 length라는 프로퍼티를 갖는 객체를 각각 전달하여 호출한다.  
var1에는 3이, var2에는 5가, var3에는 10이 저장 될 것이다.
*/
let var1 = getLength([1, 2, 3]); // 3
let var2 = getLength("12345"); // 5
let var3 = getLength({length: 10}); // 10

/* 
그러나 현재는 data 매개변수의 타입을 any 타입으로 지정했기 때문에 인수로 10을 넣는다고 해도 오류로 감지되지는 않는다.
*/
let var4 = getLength(10);

/* 
generic함수로 만들어서 10과 같은 값들은 전달하지 못하게 하고, 앞서 length가 존재하는 값들을 전달 가능하도록 만들어 본다.
먼저 함수명 옆에 타입변수 T를 선언한다.  
data의 타입은 어떻게 해야할까?

만약 T[] 배열 타입으로 지정할 경우 첫번째 호출에는 적용이 되지만 나머지 두 함수호출에는 타입이 배열이 아니므로 적용될 수가 없다.
*/
function getLengthA <T> (data: T[]) {
  return data.length;
}
let varA1 = getLengthA([1, 2, 3]); // 3
let varA2 = getLengthA("12345"); // 5
let varA3 = getLengthA({length: 10}); // 10

/* 
우선은 매개변수 data의 타입을 T로 정의한다.  
이 경우 data의 타입이 unknown 타입 이므로 length 프로퍼티가 없다는 내용의 오류가 함수 내부 return문에서 발생한다.
*/
function getLengthB <T> (data: T) {
  return data.length; // Property 'length' does not exist on type 'T'.ts(2339)
}

/* 
이런 경우 T 타입을 제한한다.
<T extends { length: number }>와 같이 extends 키워드를 사용하고 중괄호를 열어 length 프로퍼티가 number 타입으로 있는 타입을 확장하는 타입으로 T를 제한한다.  
코드를 해석해보자면, extends를 통해 T를 확장하는데, number 타입의 length라는 프로퍼티를 가지고 있는 객체를 확장하는 타입으로 T를 제한하는 의미의 문법이다.  
*/
function getLengthC <T extends { length: number }> (data: T) {
  return data.length; // Property 'length' does not exist on type 'T'.ts(2339)
}

/* 
인터페이스 확장을 예로 들어본다.  
아래와 같이 number타입의 length 프로퍼티를 갖는 InterfaceA를 선언하고 InterfaceB를 새로 만들어 InterfaceA 인터페이스를 extends 확장할 경우  
InterfaceB가 정의하는 타입은 length가 number인 프로퍼티를 갖고 있는 타입으로 정의가 된다.  
즉, InterfaceB에 포함되는 객체들은 무조건 number타입의 length 프로퍼티를 가지고 있어야 된다.  
*/
interface InterfaceA {
  length: number;  
}
interface InterfaceB extends InterfaceA {}

/* 

T 타입을 확장하여 제한한 문법이 바로 인터페이스 확장 원리와 같다.  
T라는 타입은 length가 number인 프로퍼티를 가지고 있는 객체를 extends, 확장하는 타입이기 때문에 무조건 length라는 프로퍼티를 가지고 있는 타입이어야 되는 것이다.  
따라서 [1, 2, 3] 배열도 length를 가지고 있기 때문에 허용이 되고 "12345" string 문자열도 lentgh를 가지고 있기 때문에 허용이 되고, {length:10} 객체도 length 프로퍼티가 있기 때문에 허용이 된다.  
반면 10과 같은 number 타입의 값 처럼 length 프로퍼티가 없는 값들은 허용이 안되도록 막아줄 수 있는것이다.  

이와같이 extends 키워드를 이용해서 타입 변수의 조건을 달아 제한할 수 있다.
*/









