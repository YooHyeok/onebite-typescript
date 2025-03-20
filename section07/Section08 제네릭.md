# [메인 마크다운.md](../README.md)
<br>

# 제네릭

## 제네릭 소개
<details>
<summary>펼치기/접기</summary>
<br>

예시와 함께 살펴보기 위해 간단한 함수를 먼저 선언해본다.  
string타입의 value를 매개변수로 받고 return 해주도록 한다.  
이때 함수의 리턴타입은 string이 된다.  
만약 이때 함수의 미개변수로 숫자도 넣고 싶고 Boolean타입의 값도 넣고 싶다고 한다면 어떻게 해야 할까?  
- src/chapter0.ts 
  ```ts
  function func(value: string) {
    return value
  }
  func("값")
  func(0)
  func(false)
  ```
이렇게 범용적인 함수를 만들어야 될때 가장 먼저 생각나는 것은 any타입을 사용하는것이다.
- src/chapter0.ts 
  ```ts
  function funcA(value: any) {
    return value
  }
  ```
any는 치트키 타입 이기 때문에 위와같이 매개변수 타입으로 명시적으로 정의를 해줄 경우 해당 함수를 호출하면서 인수로 어떠한 타입의 값이든 전달해도 상관이 없다.  
그렇다면 아래 변수 num, bool, str의 타입은 무엇이 될까?  
기대하는 타입으로는 함수가 매개변수를 그대로 반환하기 때문에 num변수는 전달하는 매개변수의 타입인 number 타입이 될것이라 생각할 것이고,
bool변수의 타입은 boolean타입, str변수의 타입은 string타입이라고 생각할 것이다.
하지만 실제로는 그렇게 되지 않는다.  
마우스 커서를 올려보면 num, bool, str 모두 any타입으로 추론되는것을 확인할 수 있다.
- src/chapter0.ts 
  ```ts
  let numA = funcA(0) // let num: any
  let boolA = funcA(false) // let bool: any
  let strA = funcA("string") // let str: any
  ```
함수의 반환 값 타입은 해당 함수의 리턴값을 기준으로 추론된다고 배웠다.  
그렇기 때문에 funcA 함수에서는 value를 그냥 그대로 리턴하는데 현재 value의 타입으로 정의되어 있는것은 any타입이기 때문에 단순하게 반환값이 any타입으로 잡히게 되는것이다.  
따라서 어떻게 호출하고 어떤 인수를 전달하더라도 어차피 any타입의 값을 반환한도고 되어있기 때문에 모두 any타입으로 추론이 되는것이다.  
그러나 어떤 변수가 이렇게 any타입으로 추론되는것은 별로 좋은 상황은 아니다.  

변수 num에 숫자값이 들어 있음이 코드상으로 보기에는 아주 명확하다.  
10이 들어가서 10이 그대로 나오기 때문에 누가봐도 숫자가 저장되어있는데, 이렇게 any타입으로 잡혀버리면 toUpperCase() 같은 문자열 메소드를 사용하더라도 오류를 발생시키지 않게 된다.  

- src/chapter0.ts 
  ```ts
  numA.toUpperCase();
  ```
이러한 문제가 있으므로, value타입을 any가 아닌 조금 비슷하지만 다른 타입인 unknown 타입으로 지정해본다.  
- src/chapter0.ts 
  ```ts
  function funcB(value: unknown) {
    return value
  }
  let numB = funcB(0)
  let boolB = funcB(false)
  let strB = funcB("string")
  ```
any타입과는 다르게 빨간줄로 unknown타입에는 toUpperCase()가 없다고 오류를 뱉는다.  
마찬가지로 매개변수가 unknown타입이니까 반환값도 unknown타입으로 잡혀서 numB도 unknown타입으로 추론되기 때문에 오류가 발생하는것이다.   

- src/chapter0.ts 
  ```ts
  numB.toUpperCase(); // 'numB' is of type 'unknown'.ts(18046)
  ```

오류를 알려주는것은 좋으나, 진짜 문제는 변수 numB가 숫자값이 들어가는건 너무나 자명한 상황임에도 toFixed()같은 number타입에서 사용할 수 있는 메소드를 못쓰게 된다.  
unknown타입은 어떤 연산, 메소드도 할 수 없는 전체집합으로 배웠었다.
- src/chapter0.ts 
  ```ts
  numB.toFixed(); // 'numB' is of type 'unknown'.ts(18046)
  ```

따라서 unknown타입을 지정한 상황에서 진짜 숫자처럼 사용하기 위해서는 `if (typeof numB === "number")` 과 같이 조건문을 사용하여 type을 좁혀 사용해야 한다.
- src/chapter0.ts 
  ```ts
  if (typeof numB === "number") {
    numB.toFixed(); // 'numB' is of type 'unknown'.ts(18046)
  }
  ```
매개변수를 unknown타입으로 정의해도 불편하다.  
심플하게 인수로 number 타입의 값을 넣으면 반환값도 number타입이 되고 boolean타입의 값을 넣으면 반환값도 boolean타입, string타입의 값을 넣으면 반환값도 string타입이 되었으면 좋겠는데  
이때 사용하는 기능이 바로 제너릭이다.


### 제네릭 함수
funcB 함수를 제네릭 함수라는 특별한 함수로 만들어 주면 함수의 인수에 따라 반환값의 타입을 가변적으로 정해줄 수 있다.  
제네릭이란? 영어로 일반적인, 또는 포괄적인 이라는 뜻을 가지고 있다.  
그러면 제네릭 함수라고 하면 일반적인 함수, 또는 포괄적인 함수라는 뜻이다.  
일반적인 함수 혹은 포괄적인 함수라는것이 이해가 잘 되지 않는다면 General이라는 Generic과 비슷한 단어를 통해 이해에 도움을 주도록 한다.  
두루두루 포괄적으로 모든 병을 다루는 병원을 종합병원이라고 부른다.  
영어권에서는 종합병원을 General Hospital이라고 부른다.  
Generic 함수 라고 하면 모든 타입에 두루두루 쓸 수 있는 범용적인 함수다 라고 이해를 해볼 수 있다.  
마치 함수계의 종합병원 같다 라고 쉽게 이해하자.  

실제로 funcB 함수를 Generic 함수로 만들어 본다.
먼저 함수를 제네릭 함수로 만들기 위해서는 타입변수 라는것을 선언해 줘야한다.  
함수의 이름 뒤에 꺽쇠를 열어준다.  
꺽쇠 안에는 대문자로 T를 써주면 된다.  
꺽쇠 안의 T는 타입을 저장하는 변수이다.  
타입 변수는 함수를 호출할 때 인수의 타입이 어떤 타입이냐에 따라 변수에 저장되는 타입이 달라진다.  
다음으로 value의 타입을 타입변수로 선언한 T로 선언해준다.  
마지막으로 반환값의 타입도 T로 선언해주면 제네릭 함수가 완성이 된다.  
- src/chapter0.ts 
  ```ts
  function funcC <T> (value: T): T {
    return value;
  }
  let numC = funcC(0) // let numC: number
  let boolC = funcC(false) // let boolC: boolean
  let strC = funcC("string") // let strC: string
  ```
이후 numC에 마우스커서를 올려보면 인수로 전달한 값 0의 타입인 number 타입으로 잘 추론이 되며, 마찬가지로 변수 boolC도 boolean타입으로 strC도 string 타입으로 잘 추론이 된다.  
제네릭 함수의 타입 변수 T는 타입을 담는 변수이다.  
마치 자바스크립트의 변수처럼 상황에 따라 다른 타입을 담을 수 있다는 것이다.  
따라서 이 타입 변수에 어떤 타입이 담기느냐는 언제 결정되냐면 함수를 호출할 때마다 결정이 된다.  
함수 funcC를 호출했을 때 매개변수 value에 들어오는 값이 10이고 number 타입이기 때문에 매개변수의 T라는 타입이 number 타입으로 추론되면서  
제네릭으로 선언한 타입 변수 `<T>`의 T도 number 타입으로 추론되고 반환값의 타입으로 정의한 T도 number 타입으로 추론되게 된것이다.  

마찬가지로 문자열 funcC의 매개변수로 문자열 string타입의 값이 들어온다면, 매개변수에 정의된 타입 변수 T가 string 타입으로 들어가게 되고,  
제네릭으로 선언한 타입 변수 `<T>`의 T도 stirng 타입으로 추론되고 반환값의 타입 T도 동일하게 string 타입으로 추론되게 된다.  

정리하자면 타입 변수와 함께 여러 타입의 값을 인수로 받아 범용적으로 쓸 수 있는 함수를 제네릭 함수라고 부른다.  
제네릭 함수들은 타입 변수를 `<T>` 형태로 꺽쇠와 함께 함수의 이름 뒤에 선언을 하고 타입 변수에 할당되는 타입은 함수를 호출할 때 인수에 따라 결정된다고 이해하면 된다.  
<br>

추가로 제네릭 함수로 호출할 때 타입 변수에 할당되는 타입을 인수를 통해 추론하도록 하지 않고 프로그래머가 명시적으로 정의할 수도 있다.  
- src/chapter0.ts 
  ```ts
  let arr = funcC([1, 2, 3]);
  ```
매개변수에 1, 2, 3의 원소를 갖는 number 타입의 배열을 전달할 경우 value에 들어오는 값의 타입은 `let arr: number[]`와 같이 number 배열로 추론될 것이다.  

이때, 만약 number 배열 타입으로 추론하게 타입 변수를 두지 않고, T에 튜플타입으로 추론되게 하고 싶으면 어떻게 해야할까?
첫번째 방법으로는 매개변수로 전달하려는 인자 옆에 as 키워드를 통해 타입 단원을 할 수 있다.
- src/chapter0.ts 
  ```ts
  let arrA = funcC([1, 2, 3] as [number, number, number]); // 타입 단원
  ```
두번째 방법으로는 타입변수 <T>의 T에 할당하고 싶은 타입을 작성하면 된다. 
아래와 같이 작성할 경우 앞서 단순히 number 타입의 배열을 전달할때와 똑같이 전달하였으나, arrB 변수에 마우스를 올릴 경우 `let arrB: [number, number, number]`와 같이 
타입변수에 지정한 튜플 타입으로 추론되게 된다.  
이렇게 제네릭 함수를 호출하면서 명시적으로 타입 변수의 타입을 직접 정의하는것도 가능하다.  

타입변수에 정의한 타입과 다른 타입의 값을 매개변수로 전달할 경우 당연히 오류가 발생한다.  
- src/chapter0.ts 
  ```ts
  let arrB = funcC <[number, number, number]> ([1, 2, 3]);
  let arrC = funcC <[number, number, number]> ([1, 2, 3, 4]); // Error
  ```

</details>
<br>

## 타입 변수 응용하기
<details>
<summary>펼치기/접기</summary>
<br>

### 타입 변수 3가지 사례
제네릭의 타입 변수의 여러가지 사례를 알아보도록 한다.


### 첫번째 사례 - 복수개의 타입 변수
두개의 매개변수 a, b를 받은뒤 [b, a] 형태로 순서를 뒤집어 반환하는 함수를 만든다.  
매개변수로 어떤 타입의 값이 들어올지 모르기 때문에 any타입으로 지정한다.  
호출과 동시에 구조분해 할당을 통해 배열형태로 할당한다.  
- src/chapter0.ts 
  ```ts
  function swap(a: any, b: any) {
    return [b, a]
  }
  const [a, b] = swap(1, 2);
  ```
매개변수의 any타입을 제네릭 함수로 바꿔 any를 제거해보도록 한다.
함수 이름 뒤에 꺽쇠를 열고 타입 변수를 먼저 선언한 뒤, 각 매개변수의 타입으로 타입변수를 지정해준다.

- src/chapter0.ts 
  ```ts
  function swapA <T> (a: T, b: T) {
    return [b, a]
  }
  ```
만약 호출시점에 첫번째 매개변수a에 number 타입이 아닌 string 타입 "1"값을 넘긴다면 오류가 발생한다.
첫번째 매개변수로 string타입의 값을 전달할 경우 매개변수 a의 타입 T에 string타입 값이 들어오기 때문에 타입변수 T가 string 타입으로 할당되어버린다.  
이어서 두번째 매개변수로 number타입 값 2를 전달하고 있는데 이미 타입변수 T는 string타입으로 할당되어 버렸기 때문에 number타입 형식의 인수는 string타입의 매개변수에 할당될 수 없다 라는 에러가 발생하는것이다.  
- src/chapter0.ts 
  ```ts
  const [c, d] = swapA("1", 2); // Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)
  ```
위와 같이 매개변수 a와 b의 타입이 같을수도, 다를수도 있는 경우에는 타입 변수를 <T> 처럼 하나만 쓰는게 아니라 <T, U>와 같이 두개를 쓰면 된다.
실제로 호출할 경우 오류가 사라지는것을 확인할 수 있다.
매개변수 a에 들어오는 값은 string 타입 값이기 때문에 똑같이 타입변수 T에는 string이 할당되며,  
매개변수 b에 들어오는 값은 number 타입 값이기 때문에 타입변수 U에는 number타입이 할당되어서 서로 타입에대한 충돌이 발생하지 않기 때문에 오류없이 잘 수행되는것이다.  
- src/chapter0.ts 
  ```ts
  function swapB <T, U> (a: T, b: U) {
    return [b, a]
  }
  const [e, f] = swapB("1", 2); 
  ```

### 두번째 사례 - 배열과 튜플
data라는 매개변수를 하나 받은 뒤 매개변수로 들어오는 값이 배열일 것이라 기대하고 data의 0번째 인덱스를 반환하는 함수를 선언한다.  
data 매개변수의 타입은 아직 무엇이 될 지 모르므로 범용적으로 사용하기 위해 any 타입으로 정의해준다. 
- src/chapter0.ts 
  ```ts
  function returnFirstValue(data: any) {
    return data[0];
  }
  ```
0, 1, 2를 요소로 갖는 number타입의 배열을 매개변수로 전달하여 함수를 호출하고 num변수에 저장할 경우 변수 num에는 number타입 값 0이 할당될것이다.  
- src/chapter0.ts 
  ```ts
  let num = returnFirstValue([0, 1, 2]);
  ```
"hello", "mynameis" 요소로 갖는 string타입의 배열을 매개변수로 전달하여 함수를 호출하고 num변수에 저장할 경우 변수 num에는 string타입 값 "hello"가 할당될것이다.  
- src/chapter0.ts 
  ```ts
  let str = returnFirstValue(["hello", "mynameis"]);
  ```
이때 매개변수의 타입을 any타입으로 정의해 놓았기 때문에 함수의 반환값도 당연히 자동으로 any타입으로 추론 된다.  
따라서, 어쩔수 없이 변수 num의 타입과 str의 타입도 똑같이 any 타입으로 추론이 되고 있다.  

해당 함수도 generic함수로 선언하여 어떤 타입의 배열이든 다 받을 수 있고, 배열의 첫 번째 요소를 반환하는데 타입까지 잘 추론되도록 만들어 본다.
먼저 타입 변수 T를 선언하고, 매개변수의 타입도 T로 정의해준다.  
이렇게 선언하는 순간 바로 첫번째 인덱스 배열요소에 접근하여 return할때 오류가 발생한다.  
unknown타입의 값에 배열 인덱스를 사용하지 말라는 오류이다.  
함수선언시 타입 변수를 사용할 경우 함수 내부에서는 아직 타입 변수 T에 할당될 타입을 호출해보기 전까지는 모르기 때문에 타입스크립트에서는 최대한 오류가 발생하지 않는 쪽으로 제한하기 위해 타입변수의 타입을 일단 unknown으로 추론한다.  
말 그대로 아직 호출 전이기 때문에 타입변수 T의 타입을 잘 모르겠다는 뜻이다.  
따라서 매개변수 data의 타입도 unknown 타입의 값이 되어서 배열 인덱스를 접근하려고 하면 오류가 발생하는것이다.

- src/chapter0.ts 
  ```ts
  function returnFirstValueA <T> (data: T) {
    return data[0] // Element implicitly has an 'any' type because expression of type '0' can't be used to index type 'unknown'.
  }
  ```

이 경우 매개변수 data의 타입을 T가 아닌 T[] 배열 타입으로 지정할 경우 오류가 사라진다.  
T는 무엇이 될 지 몰라서 unknown타입이긴 하지만 data의 타입은 unknown[] 타입이야 라고 정의해주는것이다.  
어떤 배열이든 인덱스 접근은 가능하기 때문에 배열은 배열이니까 오류가 사라지게 되는것이다.  
- src/chapter0.ts 
  ```ts
  function returnFirstValueB <T> (data: T[]) {
    return data[0]
  }
  ```
위와같이 타입 변수를 매개변수에 그대로 갖다 쓸 필요가 없이 배열 타입과 함께 쓸 수도 있으며, 나중에는 Tuple이나 객체타입을 사용할 때도 당연히 쓸 수 있다.  
변수에 할당하는 코드에서 numB변수에 마우스 커서를 올려보면 number타입으로 잘 추론이 되는것을 확인할 수 있고, strB변수에 마우스 커서를 올려보면 string타입으로 잘 추론되는것을 확인할 수 있다.  


- src/chapter0.ts 
  ```ts
  let numB = returnFirstValueB([0, 1, 2]);
  let strB = returnFirstValueB(["hello", "mynameis"]);
  ```
만약 이때 두번째 함수 호출에서 number타입의 값을 배열에 하나 추가하면 어떻게 될까?  
매개변수 data에는 number와 string의 union타입이 제공된다.  
실제로 마우스 커서를 올려보면 `string | number` union타입으로 추론된다.  
data매개변수의 타입이 결국 number | string 매개변수의 배열 타입으로 잡힐것이다.  
그렇기 때문에 첫 번째 요소를 꺼내서 반환하도록 코드를 작성하면 타입스크립트는 첫 번쨰 요소가 number인지 string인지 모르기 때문에 그냥 number, string의 union 타입으로 반환 해버리는 것이다.  

- src/chapter0.ts 
  ```ts
  let strC = returnFirstValueB([1, "hello", "mynameis"]);
  ```
그러나 실제로 원하는것은 첫 번째 요소의 타입을 바꿔도 그냥 변수에는 실제 첫번째 배열 요소의 타입인 number 타입으로 추론되었으면 좋겠다.  
이 경우에는 data 매개변수의 타입을 배열 타입으로 쓰는게 아니라 조금 변형하여 tuple 타입으로 적용한다.
tuple 타입은 특정 인덱스에 해당하는 요소의 타입을 정확히 지정할 수 있는 기능이 있기 때문이다.  
tuple을 만들고 첫번째 요소 타입을 T로 해준 다음 그 다음 요소들의 타입은 몰라도 되므로 ...unknown[] 배열 형태로 적용한다.
실제로 변수 strD에 마우스 커서를 올려볼 경우 number타입으로 잘 추론해주고 있는것을 확인할 수 있다.  

- src/chapter0.ts 
  ```ts
  function returnFirstValueC <T> (data: [T, ...unknown[]]) {
    return data[0]
  }
  let strD = returnFirstValueC([1, "hello", "mynameis"]);
  ```
data의 타입이 tuple이고 첫번째 요소 타입은 T인것 까지는 알고 있을것이다.  
그런데 tuple의 첫 번째 요소 말고 그 다음부터 들어올 요소의 타입에 대해서는 알 필요가 전혀 없다.  
몇개가 들어오는지도 알 필요가 없다.  
그렇기 때문에 rest parameter를 쓰듯 ...을 써준 뒤 unknown 타입의 배열이 들어올것 같아 라고 작성하는것이다.  
예를들어 자바스크립트에서 `function func(...rest) {}` 와 같이 rest parameter를 쓰는것과 똑같고, 단순히 타입버전일 뿐이다.  
tuple인데 첫번째 요소 타입은 T이고, 나머지 요소는 배열로 여러개 들어올것 같은데 그들의 타입과 갯수는 모른다 라고 정의한것이다.  
data 매개변수에 들어오고 있는 값이 첫번째 요소의 타입은 number 나머지 요소의 타입은 몰라도 되므로 T는 number로 할당되는것이다.  
그렇기 때문에 data의 0번째 인덱스를 꺼내면 T의 타입을 갖고있는 요소를 꺼내서 반환하는 것이기 때문에 반환 값이 number타입이 되어서 strD 변수의 타입도 number 타입으로 추론이 되는것이다.  


### 세번째 사례 - extends 타입변수 제한
매개변수로 any타입의 data를 받은 후 반환값으로 매개변수의 length 프로퍼티를 반환해주는 함수를 작성한다. 

- src/chapter0.ts 
  ```ts
  function getLength(data: any) {
    return data.length;
  }
  ```

함수를 3번 호출한다.
첫번째 함수의 매개변수에는 1, 2, 3의 요소를 갖는 배열, 두번째 함수의 매개변수에는 "123" 문자열을, 세번째 함수의 매개변수에는 length라는 프로퍼티를 갖는 객체를 각각 전달하여 호출한다.  
var1에는 3이, var2에는 5가, var3에는 10이 저장 될 것이다.
- src/chapter0.ts 
  ```ts
  let var1 = getLength([1, 2, 3]); // 3
  let var2 = getLength("12345"); // 5
  let var3 = getLength({length: 10}); // 10
  ```

그러나 현재는 data 매개변수의 타입을 any 타입으로 지정했기 때문에 인수로 10을 넣는다고 해도 오류로 감지되지는 않는다.
- src/chapter0.ts 
  ```ts
  let var4 = getLength(10);
  ```

generic함수로 만들어서 10과 같은 값들은 전달하지 못하게 하고, 앞서 length가 존재하는 값들을 전달 가능하도록 만들어 본다.
먼저 함수명 옆에 타입변수 T를 선언한다.  
data의 타입은 어떻게 해야할까?

만약 T[] 배열 타입으로 지정할 경우 첫번째 호출에는 적용이 되지만 나머지 두 함수호출에는 타입이 배열이 아니므로 적용될 수가 없다.
- src/chapter0.ts 
  ```ts
  function getLengthA <T> (data: T[]) {
    return data.length;
  }
  let varA1 = getLengthA([1, 2, 3]); // 3
  let varA2 = getLengthA("12345"); // 5
  let varA3 = getLengthA({length: 10}); // 10
  ```

우선은 매개변수 data의 타입을 T로 정의한다.  
이 경우 data의 타입이 unknown 타입 이므로 length 프로퍼티가 없다는 내용의 오류가 함수 내부 return문에서 발생한다.
- src/chapter0.ts 
  ```ts
  function getLengthB <T> (data: T) {
    return data.length; // Property 'length' does not exist on type 'T'.ts(2339)
  }
  ```

이런 경우 T 타입을 제한한다.
`<T extends { length: number }>`와 같이 extends 키워드를 사용하고 중괄호를 열어 length 프로퍼티가 number 타입으로 있는 타입을 확장하는 타입으로 T를 제한한다.  
코드를 해석해보자면, extends를 통해 T를 확장하는데, number 타입의 length라는 프로퍼티를 가지고 있는 객체를 확장하는 타입으로 T를 제한하는 의미의 문법이다.  
- src/chapter0.ts 
  ```ts
  function getLengthC <T extends { length: number }> (data: T) {
    return data.length; // Property 'length' does not exist on type 'T'.ts(2339)
  }
  ```

인터페이스 확장을 예로 들어본다.  
아래와 같이 number타입의 length 프로퍼티를 갖는 InterfaceA를 선언하고 InterfaceB를 새로 만들어 InterfaceA 인터페이스를 extends 확장할 경우  
InterfaceB가 정의하는 타입은 length가 number인 프로퍼티를 갖고 있는 타입으로 정의가 된다.  
즉, InterfaceB에 포함되는 객체들은 무조건 number타입의 length 프로퍼티를 가지고 있어야 된다.  
- src/chapter0.ts 
  ```ts
  interface InterfaceA {
    length: number;  
  }
  interface InterfaceB extends InterfaceA {}
  ```
T 타입을 확장하여 제한한 문법이 바로 인터페이스 확장 원리와 같다.  
T라는 타입은 length가 number인 프로퍼티를 가지고 있는 객체를 extends, 확장하는 타입이기 때문에 무조건 length라는 프로퍼티를 가지고 있는 타입이어야 되는 것이다.  
따라서 [1, 2, 3] 배열도 length를 가지고 있기 때문에 허용이 되고 "12345" string 문자열도 lentgh를 가지고 있기 때문에 허용이 되고, {length:10} 객체도 length 프로퍼티가 있기 때문에 허용이 된다.  
반면 10과 같은 number 타입의 값 처럼 length 프로퍼티가 없는 값들은 허용이 안되도록 막아줄 수 있는것이다.  

이와같이 extends 키워드를 이용해서 타입 변수의 조건을 달아 제한할 수 있다. 

</details>
<br>

## map, forEach 메서드 타입 정의
<details>
<summary>펼치기/접기</summary>
<br>

### 1. map
자바스크립트의 map 메서드의 사용법에 대해 간단한 예시를 통해 알아본다.  
arr이라는 number타입의 배열이 하나 있을 때, arr.map(콜백함수) 형태로 호출한다.  
콜백함수의 반환 값들을 수집하여 새로운 배열로 반환한다.  
<br>

아래는 number 타입 값 1, 2, 3을 요소로 갖는 배열로 부터 map 함수를 통해 각각의 요소에 2를 곱한 결과 배열을 newArr이라는 변수에 반환하는 예제이다.  
newArr에 저장되는 값은 2, 4, 6으로 이루어진 배열로 저장 될 것이다.  
- src/chapter2.ts
  ```ts
  let arr = [1, 2, 3];
  const newArr = arr.map((it) => it * 2) // [2, 4, 6] - it: number
  ```

이때 map 메소드의 콜백함수 안에 매개변수의 타입을 보면 number 타입으로 추론되는 것을 볼 수 있다.  
자동으로 매개변수의 타입이 추론되는 이유는 map 메소드의 타입이 어딘가에 별도로 선언되어 있기 때문이다.  
ctrl 또는 command를 누른 상태에서 map 메소드를 클릭해보면 lib.es5.d.ts라는 파일로 이동하게 된다.  
- lib.es5.d.ts
  ```ts
  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
  ```

위와같이 map 메소드에 대한 타입 정의를 확인할 수 있다.  
타입 정의상으로는 U나 T 같은 타입 변수도 보이고, callback 함수의 타입 정의는 함수 타입 표현식으로 되어있는 것도 볼 수 있다.  
굉장히 복잡해 보인다.  
결국 이 정도로 복잡한 타입을 직접 구현할 수 있는 타입스크립트 실력을 갖춰야 한다.  
그러나 복잡해 보인다고 해도 요구사항들을 하나씩 떠올려 보면서 천천히 구현해 보면 그렇게 어렵지만도 않다.  
map 메소드의 타입을 직접 구현해보도록 하자.  
<br>

배열의 map 메소드 타입은 이미 선언되어 있는 타입이기 때문에 map 메소드를 함수로 따로 만들어 본다.  
어떤 배열에 정의할 것인지에 대한 arr 변수와, 어떤 함수를 적용할 것인지에 대한 콜백 함수를 매개변수로 받는 map 메소드를 정의한다.  
이때 타입 정의는 unknown타입으로 정의한다.  
콜백 함수 매개변수의 경우 unknown을 반환하는 간단한 타입으로 정의한다.  
또 콜백 함수에는 unknown타입의 매개변수 item도 있다.  
다음으로는 함수 내부를 구현해본다.  

result라는 배열을 선언하고, 0~arr.length까지 배열을 순회하면서 result라는 결과값 배열에 push로 모든 원소에 콜백 함수를 적용한 값들을 하나씩 넣어준 후 result 배열을 반환하는 로직을 작성한다.
다 작성하고 함수를 보면 현재는 unknown 타입으로 매개변수의 타입을 정의해놓았기 때문에 오류가 발생하지만, 이후 고칠것이므로 신경쓰지 않는다.  
- src/chapter2.ts
  ```ts
  function map(arr: unknown, callback: (item: unknown) => unknown) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(
        callback(arr[i]) // [Error] 'arr' is of type 'unknown'.ts(18046)
      )
    }
    return result;
  }
  ```

map 메소드를 호출해본다.
첫번째 인수로 arr 배열을 전달하고, 두번째 인수로 callback 함수를 전달하여 함수를 호출한다.
- src/chapter2.ts
  ```ts
  let arrA = [1, 2, 3];
  const newArrB = map(arrA, (it) => it * 2); // it: unknown - [Error] 'it' is of type 'unknown'.ts(18046)
  ```


## 템플릿1
<details>
<summary>펼치기/접기</summary>
<br>

### 
- src/chapter2.ts
  ```ts
  ```

</details>
<br>

## 템플릿2
<details>
<summary>펼치기/접기</summary>
<br>

  ### 템플릿
  <details>
  <summary>펼치기/접기</summary>
  <br>

  ### 
  - src/chapter2.ts
    ```ta
    ```

  </details>
  <br>

  ### 템플릿
  <details>
  <summary>펼치기/접기</summary>
  <br>

  </details>
  <br>

</details>
<br>
