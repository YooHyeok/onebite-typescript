/* 
## map, forEach 메서드 타입 정의하기.  

제네릭 함수를 응용하여 자바스크립트의 배열 메소드인 map과 forEach의 타입을 직접 정의해본다.
*/

/* 
### 1. map
자바스크립트의 map 메서드의 사용법에 대해 간단한 예시를 통해 알아본다.  
arr이라는 number타입의 배열이 하나 있을 때, arr.map(콜백함수) 형태로 호출한다.  
콜백함수의 반환 값들을 수집하여 새로운 배열로 반환한다.  

아래는 number 타입 값 1, 2, 3을 요소로 갖는 배열로 부터 map 함수를 통해 각각의 요소에 2를 곱한 결과 배열을 newArr이라는 변수에 반환하는 예제이다.  
newArr에 저장되는 값은 2, 4, 6으로 이루어진 배열로 저장 될 것이다.  
*/
let arr = [1, 2, 3];
const newArr = arr.map((it) => it * 2) // [2, 4, 6] - it: number
/* 
이때 map 메소드의 콜백함수 안에 매개변수의 타입을 보면 number 타입으로 추론되는 것을 볼 수 있다.  
자동으로 매개변수의 타입이 추론되는 이유는 map 메소드의 타입이 어딘가에 별도로 선언되어 있기 때문이다.  
ctrl 또는 command를 누른 상태에서 map 메소드를 클릭해보면 lib.es5.d.ts라는 파일로 이동하게 된다.  

```ts
map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
```
위와같이 map 메소드에 대한 타입 정의를 확인할 수 있다.  
타입 정의상으로는 U나 T 같은 타입 변수도 보이고, callback 함수의 타입 정의는 함수 타입 표현식으로 되어있는 것도 볼 수 있다.  
굉장히 복잡해 보인다.  
결국 이 정도로 복잡한 타입을 직접 구현할 수 있는 타입스크립트 실력을 갖춰야 한다.  
그러나 복잡해 보인다고 해도 요구사항들을 하나씩 떠올려 보면서 천천히 구현해 보면 그렇게 어렵지만도 않다.  
map 메소드의 타입을 직접 구현해보도록 하자.  

배열의 map 메소드 타입은 이미 선언되어 있는 타입이기 때문에 map 메소드를 함수로 따로 만들어 본다.  
어떤 배열에 정의할 것인지에 대한 arr 변수와, 어떤 함수를 적용할 것인지에 대한 콜백 함수를 매개변수로 받는 map 메소드를 정의한다.  
이때 타입 정의는 unknown타입으로 정의한다.  
콜백 함수 매개변수의 경우 unknown을 반환하는 간단한 타입으로 정의한다.  
또 콜백 함수에는 unknown타입의 매개변수 item도 있다.  
다음으로는 함수 내부를 구현해본다.  

result라는 배열을 선언하고, 0~arr.length까지 배열을 순회하면서 result라는 결과값 배열에 push로 모든 원소에 콜백 함수를 적용한 값들을 하나씩 넣어준 후 result 배열을 반환하는 로직을 작성한다.
다 작성하고 함수를 보면 현재는 unknown 타입으로 매개변수의 타입을 정의해놓았기 때문에 오류가 발생하지만, 이후 고칠것이므로 신경쓰지 않는다.  
*/
function map(arr: unknown, callback: (item: unknown) => unknown) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(
      callback(arr[i]) // [Error] 'arr' is of type 'unknown'.ts(18046)
    )
  }
  return result;
}
/* 
map 메소드를 호출해본다.
첫번째 인수로 arr 배열을 전달하고, 두번째 인수로 callback 함수를 전달하여 함수를 호출한다.
*/
let arrA = [1, 2, 3];
const newArrB = map(arrA, (it) => it * 2); // it: unknown - [Error] 'it' is of type 'unknown'.ts(18046)

/* 
#### map - generic 함수 적용
다음으로는 구현한 함수에 직접 타입을 정의해 보도록 한다.  
callback함수의 매개변수 it의 타입은 당연히 arr의 배열 요소의 타입들이 되어야 한다.  
예를들어 arr이 string 배열타입 string[]이었다면 매개변수 it은 string 타입이 되어야 한다.  
arr이 number 배열 타입 number[]이라면, 똑같이 it이라는 매개변수는 number 타입이 되어야 한다.  

먼저 함수 이름 뒤에 T라고 타입 변수를 선언한다.
이후 매개변수 arr의 타입을 T배열인 T[]로 선언하고, 콜백함수의 매개변수 item의 타입은 arr의 요소 타입과 같은 T로 맞춰주고, 반환값도 T 타입으로 해준다.  
*/

function mapA <T> (arr: T[], callback: (item: T) => T) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(
      callback(arr[i])
    )
  }
  return result;
}
/* 
오류는 사라지고, map함수의 두번째 인수로 넘기는 콜백함수의 매개변수 it에 마우스 커서를 올려보면 number 타입으로 추론되는것이 확인된다.  
두번째 케이스로 'hi'와 'hello'를 요소로 갖는 배열을 첫번째 인자로 넘기고 두번째 인수인 콜백함수의 매개변수를 toUpperCase()를 적용하여 반환하도록 전달한다.  
*/
const newArrC = mapA(arrA, (it) => it * 2); // it: number
const newArrD = mapA(['hi', 'hello'], (it) =>  it.toUpperCase()); // it: string

/* 
세번째 케이스로는 첫번째 매개변수로 두번째 케이스와 동일하게 넘겨주고, 콜백함수의 반환값에서 매개변수 it에 parseInt() 함수를 적용하여 반환하도록 전달한다.  
이 경우에는 오류가 발생한다.  
parseInt()는 자바스크립트의 내장함수로 인수로 전달받은 값을 number 타입의 값으로 바꿔 변환한 후 반환하는 함수이다.  
즉, map 함수를 호출하면서 콜백 함수의 반환값이 number 타입이 되는것이다.

선언된 함수와 호출 코드를 비교해보면  arr 매개변수에는 문자열 요소를 갖는 배열이 들어오므로 string[]으로 추론되기 때문에 T[]의 T는 string 타입으로 적용된다.  
따라서 콜백 함수의 매개변수 타입 T도 string 타입으로 되고 반환값도 T가 되기때문에, 콜백함수의 반환값 타입도 string이 되어버린다.  
그러나 내장함수 parseInt()의 반환값 타입은 number이기 string과 number타입간 타입이 불일치되어 오류가 발생한것이다.  
그런데, map 메소드는 parseInt()를 호출하여 반환된 number타입의 값을 반환할 수도 있어야 한다.  
꼭 string 타입의 배열을 인수로 전달한다고 해서 map 메소드의 결과값이 반드시 string 타입의 배열이 또 다시 나올 이유는 없다.  
모든 타입의 배열이 다 나올 수 있는 것이다.  
그렇기 때문에 이런 경우 제네릭 타입 변수를 하나만 쓰면 안된다.
*/
const newArrE = mapA(['hi', 'hello'], (it) =>  parseInt(it)); // it: string - [Error] Type 'number' is not assignable to type 'string'.ts(2322)

/* 
타입변수에 U라는 타입을 하나 더 추가한뒤, 콜백함수의 반환타입만 U 타입으로 지정해줄 경우 오류가 사라진다.  
arr에는 string타입 배열이 들어오므로 T가 string 타입이 된다.  
콜백함수의 매개변수 item의 타입도 똑같이 string이 되지만, parseInt()의 반환값을 반환하기 때문에 콜백함수의 반환값의 타입은 number 타입이 된다.   
*/
function mapB <T, U> (arr: T[], callback: (item: T) => U) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(
      callback(arr[i])
    )
  }
  return result;
}
const newArrF = mapB(['hi', 'hello'], (it) =>  parseInt(it)); // it: string

/* 
### forEach
map 메소드보다 훨씬 만들기 쉽다.  
forEach 메소드의 문법은 map 함수와 동일하지만, 배열을 순회하며 각 요소를 인수로 전달한 콜백함수를 한번씩 실행만 할 뿐, 반환하지 않는다.  
마치 for문으로 배열을 순회하는 것과 비슷한 메소드이다.  
forEach 메소드의 타입도 command 또는 ctrl을 누른 뒤 클릭해보면 lib.es5.ts 파일에 타입이 미리 정의되어 있는것을 볼 수 있다.  

```ts
forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
```
map 메소드와 비슷하게 함수타입 표현식도 사용하고 있는 것을 볼 수 있다.  
*/

let arr2 = [1, 2, 3]
arr2.forEach((it) => console.log(it))

/* 
forEach를 직접 만들어 보도록 한다.  
앞서 map 함수를 정의할 떄 처럼 첫번째 인수에 unknown타입의 arr 매개변수를 지정하고, callback 함수의 반환 타입을 void로 지정한다.  
forEach 메소드는 반환하지 않고 실행만 하기 때문에 콜백함수의 반환타입은 void로 지정하고, 콜백함수의 매개변수는 unknown으로 지정한다.

함수 내부를 구현해본다.  
배열요소의 길이만큼 arr의 요소들을 모두 순회하면서 callback함수의 매개변수로 각 배열요소를 넘겨 한번씩 실행시켜 주면 된다.  
*/
function forEach(arr: unknown, callback: (item: unknown) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i])
  }
}
/* 
함수를 직접 호출한다.
첫번째 인수로 number 타입 요소를 갖는 배열을 넘기고, 두번째 인수로 각 요소를 toFixed()한 뒤 console.log를 호출하여 출력하도록 작성한다.  
현재는 unknown 타입으로 정의해 놓았기 때문에 오류들이 발생한다.  
*/
let arr3 = [1, 2, 3]
forEach(arr3, (it) => {
  console.log(it.toFixed()) // it: unknown - [Error]'it' is of type 'unknown'.ts(18046)
});

/* 
#### forEach - generic 함수 적용
forEach 메소드의 타입을 어떻게 정의해야할 지 요구사항을 살펴보도록 한다.
먼저 forEach를 호출하면 콜백 함수의 매개변수인 it의 타입은 arr3 배열의 요소의 타입이 되어야 한다.  
즉, number 배열 타입이기 때문에 it 매개변수의 타입이 number가 되는것이다.  
그렇게 되면 매개변수 it에 toFixed()를 적용할 수 있게 된다.

가장 처음 타입 변수 T를 선언한 뒤, 첫번째 매개변수 arr의 타입을 T타입 배열 T[]로 선언해주고, 콜백함수의 매개변수 item의 타입도 배열의 요소와 동일한 타입인 T로 선언해준다.  
콜백함수의 반환타입은 역시 아무것도 반환하지 않으므로 void타입을 유지한다.
이후 실제로 메소드를 호출해보면 오류가 다 사라지며, 콜백함수의 매개변수 it의 타입이 number로 잘 추론되는 것 까지 확인할 수 있다.  
*/
function forEachA <T> (arr: T[], callback: (item: T) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i])
  }
}

let arr4 = [1, 2, 3]
forEachA(arr4, (it) => { // it: number
  console.log(it.toFixed())
});

/* 
string 타입의 배열 요소를 갖는 배열을 넘겨주고 각 배열 요소에 toUppsercase()를 적용하여 콘솔로 출력하도록 한번 더 호출해본다.
*/
forEachA(["123", "456"], (it) => { // it: string
  console.log(it.toUpperCase())
});