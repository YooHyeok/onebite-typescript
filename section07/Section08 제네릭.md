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

#### map - generic 함수 적용
다음으로는 구현한 함수에 직접 타입을 정의해 보도록 한다.  
callback함수의 매개변수 it의 타입은 당연히 arr의 배열 요소의 타입들이 되어야 한다.  
예를들어 arr이 string 배열타입 string[]이었다면 매개변수 it은 string 타입이 되어야 한다.  
arr이 number 배열 타입 number[]이라면, 똑같이 it이라는 매개변수는 number 타입이 되어야 한다.  
<br>

먼저 함수 이름 뒤에 T라고 타입 변수를 선언한다.
이후 매개변수 arr의 타입을 T배열인 T[]로 선언하고, 콜백함수의 매개변수 item의 타입은 arr의 요소 타입과 같은 T로 맞춰주고, 반환값도 T 타입으로 해준다.  
- src/chapter2.ts
  ```ts
  function mapA <T> (arr: T[], callback: (item: T) => T) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(
        callback(arr[i])
      )
    }
    return result;
  }
  ```

오류는 사라지고, map함수의 두번째 인수로 넘기는 콜백함수의 매개변수 it에 마우스 커서를 올려보면 number 타입으로 추론되는것이 확인된다.  
두번째 케이스로 'hi'와 'hello'를 요소로 갖는 배열을 첫번째 인자로 넘기고 두번째 인수인 콜백함수의 매개변수를 toUpperCase()를 적용하여 반환하도록 전달한다.  
- src/chapter2.ts
  ```ts
  const newArrC = mapA(arrA, (it) => it * 2); // it: number
  const newArrD = mapA(['hi', 'hello'], (it) =>  it.toUpperCase()); // it: string
  ```

세번째 케이스로는 첫번째 매개변수로 두번째 케이스와 동일하게 넘겨주고, 콜백함수의 반환값에서 매개변수 it에 parseInt() 함수를 적용하여 반환하도록 전달한다.  
이 경우에는 오류가 발생한다.  
parseInt()는 자바스크립트의 내장함수로 인수로 전달받은 값을 number 타입의 값으로 바꿔 변환한 후 반환하는 함수이다.  
즉, map 함수를 호출하면서 콜백 함수의 반환값이 number 타입이 되는것이다.
<br>

선언된 함수와 호출 코드를 비교해보면  arr 매개변수에는 문자열 요소를 갖는 배열이 들어오므로 string[]으로 추론되기 때문에 T[]의 T는 string 타입으로 적용된다.  
따라서 콜백 함수의 매개변수 타입 T도 string 타입으로 되고 반환값도 T가 되기때문에, 콜백함수의 반환값 타입도 string이 되어버린다.  
그러나 내장함수 parseInt()의 반환값 타입은 number이기 string과 number타입간 타입이 불일치되어 오류가 발생한것이다.  
그런데, map 메소드는 parseInt()를 호출하여 반환된 number타입의 값을 반환할 수도 있어야 한다.  
꼭 string 타입의 배열을 인수로 전달한다고 해서 map 메소드의 결과값이 반드시 string 타입의 배열이 또 다시 나올 이유는 없다.  
모든 타입의 배열이 다 나올 수 있는 것이다.  
그렇기 때문에 이런 경우 제네릭 타입 변수를 하나만 쓰면 안된다.
  ```ts
  const newArrE = mapA(['hi', 'hello'], (it) =>  parseInt(it)); // it: string - [Error] Type 'number' is not assignable to type 'string'.ts(2322)
  ```

타입변수에 U라는 타입을 하나 더 추가한뒤, 콜백함수의 반환타입만 U 타입으로 지정해줄 경우 오류가 사라진다.  
arr에는 string타입 배열이 들어오므로 T가 string 타입이 된다.  
콜백함수의 매개변수 item의 타입도 똑같이 string이 되지만, parseInt()의 반환값을 반환하기 때문에 콜백함수의 반환값의 타입은 number 타입이 된다.   
- src/chapter2.ts
  ```ts
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
  ```

### forEach
map 메소드보다 훨씬 만들기 쉽다.  
forEach 메소드의 문법은 map 함수와 동일하지만, 배열을 순회하며 각 요소를 인수로 전달한 콜백함수를 한번씩 실행만 할 뿐, 반환하지 않는다.  
마치 for문으로 배열을 순회하는 것과 비슷한 메소드이다.  
forEach 메소드의 타입도 command 또는 ctrl을 누른 뒤 클릭해보면 lib.es5.ts 파일에 타입이 미리 정의되어 있는것을 볼 수 있다.  

- lib.es5.ts
  ```ts
  forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
  ```
map 메소드와 비슷하게 함수타입 표현식도 사용하고 있는 것을 볼 수 있다

- src/chapter2.ts
  ```ts
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
  ```

- src/chapter2.ts
  ```ts
  let arr2 = [1, 2, 3]
  arr2.forEach((it) => console.log(it))
  ```

forEach를 직접 만들어 보도록 한다.  
앞서 map 함수를 정의할 떄 처럼 첫번째 인수에 unknown타입의 arr 매개변수를 지정하고, callback 함수의 반환 타입을 void로 지정한다.  
forEach 메소드는 반환하지 않고 실행만 하기 때문에 콜백함수의 반환타입은 void로 지정하고, 콜백함수의 매개변수는 unknown으로 지정한다.
<br>

함수 내부를 구현해본다.  
배열요소의 길이만큼 arr의 요소들을 모두 순회하면서 callback함수의 매개변수로 각 배열요소를 넘겨 한번씩 실행시켜 주면 된다.  
- src/chapter2.ts
  ```ts
  function forEach(arr: unknown, callback: (item: unknown) => void) {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i])
    }
  }
  ```

함수를 직접 호출한다.
첫번째 인수로 number 타입 요소를 갖는 배열을 넘기고, 두번째 인수로 각 요소를 toFixed()한 뒤 console.log를 호출하여 출력하도록 작성한다.  
현재는 unknown 타입으로 정의해 놓았기 때문에 오류들이 발생한다.  
- src/chapter2.ts
  ```ts
  let arr3 = [1, 2, 3]
  forEach(arr3, (it) => {
    console.log(it.toFixed()) // it: unknown - [Error]'it' is of type 'unknown'.ts(18046)
  });
  ```

#### forEach - generic 함수 적용
forEach 메소드의 타입을 어떻게 정의해야할 지 요구사항을 살펴보도록 한다.
먼저 forEach를 호출하면 콜백 함수의 매개변수인 it의 타입은 arr3 배열의 요소의 타입이 되어야 한다.  
즉, number 배열 타입이기 때문에 it 매개변수의 타입이 number가 되는것이다.  
그렇게 되면 매개변수 it에 toFixed()를 적용할 수 있게 된다.
<br>

가장 처음 타입 변수 T를 선언한 뒤, 첫번째 매개변수 arr의 타입을 T타입 배열 T[]로 선언해주고, 콜백함수의 매개변수 item의 타입도 배열의 요소와 동일한 타입인 T로 선언해준다.  
콜백함수의 반환타입은 역시 아무것도 반환하지 않으므로 void타입을 유지한다.
이후 실제로 메소드를 호출해보면 오류가 다 사라지며, 콜백함수의 매개변수 it의 타입이 number로 잘 추론되는 것 까지 확인할 수 있다. 
- src/chapter2.ts
  ```ts
  function forEachA <T> (arr: T[], callback: (item: T) => void) {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i])
    }
  }
  let arr4 = [1, 2, 3]
  forEachA(arr4, (it) => { // it: number
    console.log(it.toFixed())
  });

  ```

string 타입의 배열 요소를 갖는 배열을 넘겨주고 각 배열 요소에 toUppsercase()를 적용하여 콘솔로 출력하도록 한번 더 호출해본다.
- src/chapter2.ts
  ```ts
  forEachA(["123", "456"], (it) => { // it: string
    console.log(it.toUpperCase())
  });
  ```

</details>
<br>

## 제네릭 인터페이스와 제네릭 타입 별칭
<details>
<summary>펼치기/접기</summary>
<br>
제네릭은 함수 말고도 인터페이스나 타입별칭 그리고 클래스에도 사용이 가능하다.  

### 제네릭 인터페이스

#### 예제1_1 - 제네릭 타입 인터페이스 정의
제네릭 인터페이스 또한 제네릭 함수처럼 타입 변수를 이용한다.  
예를들어 KeyPair 를 저장하는 객체 타입을 인터페이스로 만들어보자.  
인터페이스를 선언한 후 인터페이스 이름 뒤에 꺽쇠를 열고 타입 변수를 쓰면 된다.  
타입 변수는 K와 V 2개로 구성한다.  
중괄호 안에 key와 value 프로퍼티를 정의하고, 타입변수로 각각의 타입을 정의해준다.
- src/chapter3.ts
  ```ts
  interface IKeyPair <K, V> {
    key: K;
    value: V;
  }
  ```
#### 예제1_2 - 제네릭 타입 인터페이스 변수 타입적용1
다음으로 IKeyPair 인터페이스 타입을 갖는 변수를 선언한다.
그런데 이때, 객체 값을 할당할 경우 중괄호를 열자마자 오류가 발생한다.  
- src/chapter2.ts
  ```ts
  let keyPair: IKeyPair = {} // [Error] Generic type 'IKeyPair<K, V>' requires 2 type argument(s).ts(2314)
  ```
IKeyPair<K,V> 제네릭 형식의 두가지 타입의 인수가 필요하다는 내용의 오류이다.  
제네릭 인터페이스는 제네릭 함수와는 달리 타입으로 어떤 변수로 정의할때 `반드시 꺽쇠를 열고 타입 변수에 타입을 직접 할당`해줘야 한다.  
타입 변수 K에는 string 타입, 타입 변수 V에는 number를 할당해 주도록 한다.  
제네릭 타입 변수에 타입을 할당한 뒤 중괄호 안에 프로퍼티를 실제로 정의해준다.
- src/chapter2.ts
  ```ts
  let keyPairB: IKeyPair<string, number> = {
    key: "key",
    value: 0
  }
  ```
참고로 타입 변수는 사람에 따라서 `타입 파라미터`, `제네릭 타입 변수`, `제네릭 타입 파라미터` 등으로 불린다.  
타입스크립트 공식 문서에는 타입 변수 라고 되어있다.

#### 예제1_2 - 제네릭 타입 인터페이스 변수 타입적용2
K에는 booleanm V에는 string[] 타입을 정의하여 변수를 하나 더만들어본다.  
해당 변수에 할당되는 객체에는 key프로퍼티에 true, value 프로퍼티에는 ['1']과 같이 문자열 배열 값이 들어올 수 있다.  
- src/chapter2.ts
  ```ts
  let keyPairC: IKeyPair<boolean, string[]> = {
    key: true,
    value: ['1']
  }
  ```
이렇게 제네릭 인터페이스는 하나의 인터페이스로 다양한 타입의 객체를 표현할 수 있다.

### 제네릭 인터페이스와 Index Signature 문법 활용
제네릭 인터페이스는 인덱스 시그니처 문법과 함께 사용할 경우 굉장히 유연한 객체 타입을 만들 수 있다.  
인덱스 시그니처의 문법은 아래와 같은 인터페이스가 있을 때 key의 타입은 string, value의 타입은 number와 같이 프로퍼티의 key와 value의 타입에 관련된 규칙만 만족하면 어떤 객체든 허용하는 아주 유연한 객체 타입을 만드는 문법이다.  
- src/chapter2.ts
  ```ts
  interface INumberMap {
    [key: string]: number;
  }
  let numberMap: INumberMap = {
    key: -123,
  }
  ```
이러한 인덱스 시그니처 문법에 제네릭까지 함께 사용하면 지금보다 더 유연하게 타입을 정의할 수 있다.  
먼저 제네릭 타입 변수 V를 갖는 인터페이스 IMap를 정의한 뒤 인덱스 시그니처 문법을 활용하여 인터페이스 key 프로퍼티에는 string타입을 지정하고, value 프로퍼티에는 타입 변수 V를 정의한다.  
다음으로 IMap 타입을 지정한 새로운 변수 stringMap을 정의하고, IMap 타입의 타입 변수에 string을 할당한뒤, 변수에 할당하려는 객체의 key프로퍼티의 value에 "value"와 같이 문자열 값을 할당한다.  
string 타입이 아닌 boolean도 가능하다.  
이렇게 제네릭 인터페이스에 인덱스 시그니처 문법을 활용할 경우 하나의 타입으로 굉장히 다양한 객체를 유연하게 정의하고, 표현할 수 있다.  
- src/chapter2.ts
  ```ts
  interface IMap<V> {
    [key: string]: V
  }
  let stringMap: IMap<string> = {
    key: "value"
  }
  let booleanMap: IMap<boolean> = {
    key: true
  }
  ```
### 제네릭 타입 별칭
제네릭 타입 별칭을 만드는 법은 제네릭 인터페이스를 만드는것과 크게 다른점이 없다.  
앞서 제네릭 인터페이스로 만들었던 IMap 타입을 타입 별칭으로 똑같이 만들어 본다.  
- src/chapter2.ts
  ```ts
  type IMap2<V> = {
    [key: string]: V
  }
  let stringMap2: IMap2<string> = {
    key: "hello"
  }
  ```

### 제네릭 인터페이스의 활용 예시

#### 사용자(User) 관리 프로그램 예제
사용자 구분: 학생 / 개발자

##### 1. 학생 사용자 인터페이스 정의
'student' 문자열 리터럴 타입을 갖는 type 프로퍼티와, string 타입을 갖는 school프로퍼티를 정의한다.
- src/chapter2.ts
  ```ts
  interface IStudent {
    type: 'student';
    school: string;
  }
  ```
##### 2. 개발자 사용자 인터페이스 정의
'developer' 문자열 리터럴 타입을 갖는 type 프로퍼티와, string 타입을 갖는 skill프로퍼티를 정의한다.
- src/chapter2.ts
  ```ts
  interface IDeveloper {
    type: 'developer';
    skill: string;

  }
  ```
IStudent 인터페이스의 type 프로퍼의 string 리터럴 타입 'student'와 IDeveloper 인터페이스의 type 프로퍼의 string 리터럴 타입 'developer' 각각을 union으로 묶으면 서로소 union 타입이 된다.  
이러한 서로소 유니온 타입은 타입을 좁힐때 유용할것이다.  

다음으로 학생과 개발자 모두를 아우르는 User 타입 인터페이스를 만들어 본다.  
모든 사용자는 공통적으로 이름을 갖기 때문에 name 프로퍼티를 추가하고, 학생인지 개발자인지를 구분할수 있도록 IStudent | IDeveloper 유니온 타입을 갖는 profile 프로퍼티를 추가한다.
- src/chapter2.ts
  ```ts
  interface IUser {
    name: string;
    profile: IStudent | IDeveloper
  }
  ```
정의한 IUser인터페이스를 타입으로 갖는 개발자 변수와 학생 변수를 각각 선언하여 값을 할당해 본다.  
- src/chapter2.ts
  ```ts
  const developerUser: IUser = {
    name: '유혁스쿨',
    profile: {
      type: 'developer',
      skill: 'TypeScript'
    }
  }

  const studentUser: IUser = {
    name: '유혁스쿨',
    profile: {
      type: 'student',
      school: '학은제..'
    }
  }
  ```
학생만 사용가능한 기능 `등교`를 함수로 정의한다.  
IUser인터페이스의 profile 프로퍼티에 현재 학생 사용자만 특정할 수 있는 타입을 만들어 놓지 않았으므로 Iuser타입으로 매개변수를 정의한 뒤, 조건문을 이용해서 타입을 좁히도록 한다.  
개발자 사용자가 들어왔을 경우 잘못오셨다를 출력하고 함수를 종료시키고, 학생 사용자가 들어왔을 때만 등교완료 로그를 출력하도록 구현한다.  
만약 우리가 관리하는 프로그램이 계속해서 사용자 구분도 많아지고, 특정 회원만 이용할 수 있는 함수도 많아진다면 함수를 만들 때마다 타입 좁히기를 써야하기 때문에 조건문을 계속 만들어야 해서 굉장히 불편해질것이다.  
이런 경우 제너릭 인터페이스를 사용할 경우 훨씬 깔끔하게 코드를 작성할 수 있다.  
- src/chapter2.ts
  ```ts
  function goToSchool(user: IUser) {
    if (user.profile.type !== 'student') {
      console.log('잘 못 오셨습니다.');
      return;
    }
    const school = user.profile.school;
    console.log(`${school}로 등교 완료`);

  }
  ```
##### User 인터페이스를 제네릭인터페이스로 구현
- src/chapter2.ts
  ```ts
  interface IUserB<T> {
    name: string;
    profile: T
  }
  const developerUserB: IUserB<IDeveloper> = {
    name: '유혁스쿨',
    profile: {
      type: 'developer',
      skill: 'TypeScript'
    }
  }

  const studentUserB: IUserB<IStudent> = {
    name: '유혁스쿨',
    profile: {
      type: 'student',
      school: '학은제..'
    }
  }
  ```

제네릭 인터페이스는 변수의 타입을 정의함과 동시에 타입 변수에 할당할 타입을 직접 명시해줘야하기 때문에 user 매개변수의 타입 IUserB의 타입변수에 IStudent를, 개발자 사용자 변수의 타입변수에는 IDeveloper를, 학생 사용자 변수의 타입변수에는 IStudent를 할당한다.  
goToSchoolB() 같은 함수의 매개변수의 타입은 IUserB타입인데, 타입변수 T에 IStudent를 할당했기 때문에 profile의 타입변수 T에는 IStudent 인터페이스가 할당될것이고, 해당 인터페이스의 type은 문자열 리터럴 타입인 'student'가 될것이다.  
따라서, goToSchoolB 함수에는 제너릭타입 IDeveloper의 IUserB가 들어올 수 없기 때문에 앞서 구현한 타입 좁히기 조건문을 삭제해도 된다.
- src/chapter2.ts
  ```ts
  function goToSchoolB(user: IUserB<IStudent>) {
    const school = user.profile.school;
    console.log(`${school}로 등교 완료`);
  }
  goToSchoolB(developerUserB) // [Error] Argument of type 'IUserB<IDeveloper>' is not assignable to parameter of type 'IUserB<IStudent>'.  Property 'school' is missing in type 'IDeveloper' but required in type 'IStudent'.ts(2345)  
  goToSchoolB(studentUserB)
  ```
</details>
<br>


## 제네릭 클래스
<details>
<summary>펼치기/접기</summary>
<br>

클래스를 복습할 겸 NumberList라는 예제 클래스를 구현해 보도록 한다.  
클래스를 만들면 가장 먼저 해줘야 하는 일이 필드를 선언해야 한다.  
생성자 매개변수로 public 이나 private 접근제한자를 지정할 경우 필드를 생략할 수 있으므로, 생성자만 구현하도록 한다.  
private 접근제한 레벨로 number[]타입 list를 매개변수로 받도록 한다.  
이때 생성자 내부에서 this.list = list;와 같이 매개변수로 받은 list 필드를 초기화 해줘야 했지만, private 접근제어자가 달려 있으므로 이 또한 자동으로 처리된다.  
다음으로 리스트에 새로운 요소를 추가하는 push 메소드를 만들어 준다.  
생성자 매개변수를 통해 초기화하는 멤버 list 필드의 타입은 number[] 타입 배열이기 때문에, push 메소드를 통해 리스트에 추가되는 data 매개변수의 타입은 number 타입으로 지정한다.  
push 메소드의 블록에서는 `this.list.push(data);`와 같이 list필드 배열에 data를 push하도록 구현한다.  
이어서 요소를 제거하는 pop 메소드도 구현한다.  
push와 pop만 있으면 심심하므로 list의 모든 값을 출력하는 print() 메소드도 추가한다.
- src/chapter4.ts
  ```ts
  class NumberList {
    constructor(private list: number[]) {}
    push(data: number) {
      this.list.push(data);
    }
    pop() {
      return this.list.pop();
    }
    print() {
      console.log(this.list)
    }
  }
  ```

다음으로는 만들어진 NumberList 클래스를 이용하여 인스턴스를 하나 생성해보도록 한다.  
인스턴스 생성시 생성자 매개변수로 [1, 2, 3]을 넘겨주고, pop, push(4), print()를 순서대로 호출할 경우
[1, 2, 3] → [1, 2] → [1, 2, 4] 순서로 배열의 구성이 변경된다.  
- src/chapter4.ts
  ```ts
  const numberList = new NumberList([1, 2, 3]);
  numberList.pop(); // [1, 2]
  numberList.push(4); // [1, 2, 3]
  numberList.print(); // [1, 2, 4] (> tsc src/chapter4.ts)
  ```
NumberList 클래스를 구현하고, 생성자와 메소드들까지 정상적으로 동작하는것을 확인한 후 StringList 클래스도 있다고 가정해본다.  
NumberList 클래스를 만들 때 타입을 모두 number로 고정시켜놨다.
StringList 클래스를 만들기 위해서 NumberList 클래스를 그대로 복사한 뒤 이름을 StringList로 변경하고, 생성자 매개변수의 타입들을 string[]으로, push 메소드의 매개변수 타입을 string으로 변경하여 거의 중복된 클래스를 하나 더 선언해줘야 한다.  
이렇게 할 경우 많은 중복이 일어났으며, 굉장히 비효율적인 코드가 생산된다.  
그래서 이럴 때에는 제네릭 클래스를 이용해서 문제를 해결하는것이 좋다.  

- src/chapter4.ts
  ```ts
  class StringList {
    constructor(private list: string[]) {}
    push(data: string) {
      this.list.push(data);
    }
    pop() {
      return this.list.pop();
    }
    print() {
      console.log(this.list)
    }
  }
  ```

### 제네릭 클래스로 구현
List라는 범용적인 이름으로 클래스를 선언한 뒤, 클래스 이름 뒤에 `<T>` 형태의 타입 변수를 지정하여 제네릭 클래스로 만들어 준다.
다음으로 List 클래스의 생성자를 호출하면서, 생성자의 인수로 number[] 타입 배열을 전달한다.  
생성자 매개변수 list변수에는 number[] 타입의 값이 들어옴으로써 List 클래스의 타입 변수 T는 number로 추론된다.  
그렇기 때문에 push메소드의 data 매개변수의 타입 T도 number로 추론되면서, 정상적으로 number타입의 값을 전달할 수 있게 된다.  
결론적으로 생성자에 number 타입의 배열을 전달하면, 그때의 List는 number타입으로 만들어진다.
- src/chapter4.ts
  ```ts
  class List<T> {
    constructor(private list: T[]) {}
    push(data: T) {
      this.list.push(data);
    }
    pop() {
      return this.list.pop();
    }
    print() {
      console.log(this.list)
    }
  }
  const numberListA = new List([1, 2, 3]);
  numberList.pop(); // [1, 2]
  numberList.push(4); // [1, 2, 3]
  numberList.print(); // [1, 2, 4] (> tsc src/chapter4.ts)
  ```

다음으로는 List클래스의 인스턴스를 생성하여 생성자 매개변수로 string[] 타입의 배열을 넘겨본다.  
이번에는 생성자 매개변수 list에 string[] 타입의 값이 들어옴으로써 List클래스의 타입변수 T는 string으로 추론된다.  
numberListA와 동일하게 string 리스트에 push 메소드를 쓰고 인수로 문자열 값을 넣을 수 있도록 추론이 잘 된다.
결론적으로 생성자에 string 타입의 배열을 전달하면 string 타입의 List로 만들어지게 된다.  
제네릭 클래스는 제네릭 인터페이스나 제네릭 타입 변수와는 다르게 클래스를 생성할 때 생성자의 매개변수 인수로 전달하는 값을 기준으로 타입 변수의 타입을 추론한다.  
따라서 제네릭 인터페이스나 제네릭 타입변수와는 다르게 클래스의 인스턴스를 생성할 때 반드시 타입을 명시해주지 않아도 된다.  

- src/chapter4.ts
  ```ts
  const stringListA = new List(['1', '2', '3']);
  stringListA.pop(); // ['1', '2']
  stringListA.push('4'); // ['1', '2', '3']
  stringListA.print(); // ['1', '2', '4'] (> tsc src/chapter4.ts)
  ```

</details>
<br>

## 프로미스와 제네릭
<details>
<summary>펼치기/접기</summary>
<br>

제네릭을 활용해서 비동기 처리를 돕는 프로미스 객체의 타입을 정의하는 방법을 살펴보도록 한다.  
자바스크립트 프로젝트에서 버그가 가장 많이 발생하는 api 호출 등의 비동기 처리 코드에도 각각의 타입을 안전하게 정의하면 훨씬 견고한 비동기 코드를 작성할 수 있게 된다.  
프로미스는 자바스크립트 내장 클래스이다.  
new 키워드를 통해 Promise객체를 만들어 줘야 하며, 생성자에는 함수를 하나 인수로 전달해야 한다.  
해당 함수는 실행자 함수라고 해서 비동기 처리를 실제로 하는 함수를 의미한다.  
해당 함수는 두개의 매개변수 resolve와 reject를 가지며 중괄호 내부에서 비동기 처리를 하게된다.  
resolve는 성공했을 때 호출하는 함수이며 함수의 인자로 전달하는 값은 비동기 작업의 결과값으로 Promise객체의 then메소드의 콜백함수에서 전달받게 된다.  
reject는 실패했을 때 호출하는 함수이고, resolve와는 달리 실패의 이유를 인수로 전달하며, Promise 객체의 catch 메소드의 콜백함수에서 전달받게 된다.  

### 예제1) Promise 객체 직접 구현
현재는 API 서버도 없고, 데이터를 받아올 곳이 없기 떄문에 일단 비동기 작업이라도 만들어 보기 위해 setTimeout이라는 내장함수를 사용해서 3초 뒤에 resolve를 호출하고 결과값으로 숫자값 20을 전달해보도록 한다.  
- src/chapter5.ts
  ```ts
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(20);
    }, 3000)
  })
  ```

결과값을 이용하는 코드를 작성해보도록 한다.  
결과값을 이용하기 때문에 성공했다고 가정하여 then메소드를 호출한 다음 콜백함수를 인수로 받아, resolve에서 인수로 넘긴 결과값을 콜백함수의 매개변수 response를 통해 받아준 뒤 로그로 출력한다.  
실제로 3초 후에 20이 출력된다.  
- src/chapter5.ts
  ```ts
  promise.then((response) => {
    console.log(response)
  })
  ```

결과값에 10을 곱해서 출력해보도록 한다.  
이 경우 response 매개변수의 타입이 unknown 타입이라는 오류를 출력한다.  
unknowm타입은 모든 연산을 할 수 없기 때문에 response 타입이 unknown으로 추론되고 있어 곱셈 연산을 하면 오류가 발생한다.  
그러나 분명히 Promise 객체를 만들 때 resolve를 호출하면서 인수로 number타입의 값인 20을 전달했다.  
즉, 20은 response에 그대로 전달된다는 말이다.  
20은 number타입의 값이기 때문에 당연히 response의 타입도 number타입으로 추론되어야 정상일것 같지만 커서를 올려보면 unknown타입으로 추론되고 있다.  
- src/chapter5.ts
  ```ts
  promise.then((response) => {
    console.log(response * 10) // [Error] 'response' is of type 'unknown'.ts(18046)
  })
  ```

이렇게 프로미스는 resolve나 reject를 호출해서 전달하는 비동기 작업의 결과값의 타입을 자동으로 추론할 수 있는 기능을 가지고 있지 않다.  
그렇기 때문에 기본적으로는 결과값을 unknown타입으로 추론한다.  
그렇다고 response를 받은 뒤 타입좁히기를 통해 일일이 number타입으로 좁혀서 사용하기에는 굉장히 번거롭고 귀찮다.  
- src/chapter5.ts
  ```ts
  promise.then((response) => {
    if (typeof response === 'number') {
      console.log(response * 10)
    }
  })
  ```

이 경우에도 제네릭을 이용하면 된다.  
자바스크립트 내장 클래스인 Promise는 타입스크립트에서는 제네릭 클래스로 타입이 별도로 선언되어 있기 때문에, Promise의 생성자를 호출할 때 꺽쇠를 열어 비동기 작업의 결과를 타입 변수에 할당해주면 자동으로 타입을 추론해준다.  
따라서 이전 로직에서 Promise객체를 생성할때 제네릭 타입 변수로 number를 지정할 경우 오류가 사라지게 되고, then 메소드 호출부에 마우스 커서를 올려보면 number 타입으로 추론된것을 확인할 수 있다.  
또한, 인스턴스 생성시 전달하는 콜백함수의 매개변수 resolve 함수에도 커서를 올려보면 resolve함수의 매개변수 타입이 number타입으로 추론된다.  
따라서 resolve함수에 문자열을 전달할 경우 오류가 발생할것이다.  
- src/chapter5.ts
  ```ts
  const promiseA = new Promise<number> ((resolve, reject) => {
    setTimeout(() => {
      // resolve('20'); // Argument of type 'string' is not assignable to parameter of type 'number | PromiseLike<number>'.ts(2345)
      resolve(20);
    }, 3000)
  })
  promiseA.then((response) => {
    console.log(response * 10)
  })
  ```

Promise의 타입이 왜 이렇게 동작하는지 Ctrl을 누른 채로 Promise를 클릭을 해보면 아래와 같이 정의된 코드를 확인할 수 있다.  
- lib.es2018.promise.d.ts
  ```ts
  interface Promise<T> {
      finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }
  ```
interface Promise<T> 즉, 타입 변수를 활용하는 제네릭 인터페이스라는 것을 확인할 수 있으며, Promise의 타입 선언이 굉장히 여러 파일에 나뉘어져서 선언되어있는 것도 확인할 수 있다.  

Promise의 생성자 타입 선언을 확인해보려면 `lib.es2015.promise.d.ts`파일을 열어보면 생성자 함수의 타입 정의를 볼 수 있다.
- lib.es2015.promise.d.ts
  ```ts
  new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
  ```
생성자 메소드가 타입 변수 T를 갖는 제네릭 함수라는것을 알 수 있고, 생성자에 전달하는 매개변수 resolve 매개변수의 value 타입도 T로 타입변수의 타입을 그대로 갖는다는것을 확인할 수 있다.  
결론적으로 Promise의 생성자를 호출할 때 타입 변수를 할당해주면 비동기 처리 결과 값의 타입을 직접 명시할 수 있다.  
<br>

다음으로는 실패했다고 가정하고 reject와 catch에 대한 코드를 작성해본다.  
실패할 경우 resolve가 아닌 reject를 호출하여 reject의 매개변수로 실패 이유를 전달한다.  
이때 reject 함수의 인수로는 무슨 타입을 전달할 수 있는지 커서를 올려보면 `reject: (reason?: any) => void`와 같이 reason이 선택적 매개변수이고, any타입으로 정의가 되어 있기 때문에 해당 매개변수를 생략하거나 아무 타입의 값으로인수를 전달할 수 있도록 설정되어 있다.  
따라서 reject에는 문자열 뿐만 아니라 함수를 넣어도 문제가 없다.  
(보통은 문자열로 넣는다.)
- src/chapter5.ts
  ```ts
  const promiseB = new Promise<number> ((resolve, reject) => {
    setTimeout(() => {
      reject('실패 원인: B');
    }, 3000)
  })
  ```

Promise객체에서 실패의 결과를 처리하는 메소드인 catch를 호출하여, 콜백함수를 통해 reject에서 전달한 실패 이유를 매개변수로 전달받아 출력하도록 한다.  
매개변수 error의 경우 커서를 올려보면 reject 함수의 인수 타입이 any 타입이였기 때문에 error의 타입도 any타입으로 추론된다.  
Promise의 catch 메소드를 사용할 때에는 then 메소드와는 다르게 매개변수의 타입을 정확히 알 수 있는 방법이 없다.  
타입 변수로도 이러한 에러 타입을 확실히 지정해 줄 수 없기 때문에 error 매개변수를 사용할 때에는 타입좁히기를 통해 에러의 타입이 string일 경우 로그로 출력하는 등 프로젝트의 상황에 맞게 에러의 형태에 맞춰 타입을 잘 좁혀 사용하면 된다.  
- src/chapter5.ts
  ```ts
  promiseB.catch((error) => {
    console.log(error)
  })
  ```

정리하자면 Promise는 제네릭 클래스를 기반으로 타입이 선언되어 있기 때문에 타입 변수로 resolve에 대한 타입 즉, 비동기 처리의 결과값의 타입을 정의해줄 수는 있지만 반대로 실패했을 때 reject의 매개변수 타입은 지정해줄 수 없다.  
추가로 타입 변수 정의를 생략할 경우 기본적으로 비동기 작업 처리의 결과값이 unknown타입으로 추론된다.  
자바스크립트의 Promise를 거의 그대로 사용하면서, 타입 변수에 어떤 타입을 할당할지만 명시해주면 되기 때문에 생각보다 어렵지는 않다.  
그러나 보통 Promise는 실제 프로덕션을 만들 때 위와같이 직접 정의해서 사용하기 보다는, 어떤 데이터를 불러오는 함수의 반환값으로 자주 쓴다.  
Promise를 반환하는 함수의 타입을 예제코드로 정의해보도록 한다.

### 예제2) Promise를 반환하는 함수의 타입 정의

서버로부터 한개의 게시글 데이터를 불러오는 함수를 만들어 본다.  
1. 인터페이스로 게시글의 타입을 먼저 정의한다.  
Post 인터페이스를 정의하고 number타입의 프로퍼티 id, string타입의 프로퍼티 title, content를 선언해준다.  

- src/chapter5.ts
  ```ts
  interface Post {
    id: number;
    title: string;
    content: string;
  }
  ```
2. 게시글을 불러오는 함수를 만든다.  
마땅히 게시글을 보관하고 있는 서버도, 데이터베이스도 없으므로 임시로 Promise객체를 반환하도록 한다.  
이때 비동기 작업으로 setTimeout을 이용하여 3초 뒤 resolve를 호출하고 resolve안에 임시 게시글 하나를 반환하는 함수로 만든다.  
- src/chapter5.ts
  ```ts
  function fetchPost() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: 1,
          title: '게시글 제목',
          content: '게시글 내용'
        })
      }, 3000)
    })
  }
  ```

3. 변수를 선언하여 fetchPost() 함수를 호출한 결과값을 저장한다.  
postRequest 변수에는 fetchPost함수가 반환하는 Promise 객체가 할당되게 된다.  
- src/chapter5.ts
  ```ts
  const postRequest = fetchPost();
  ```

4. then 메소드를 통해 결과값을 처리한다.  
then 메소드의 콜백함수에 게시글을 받을 매개변수를 지정하고, id 프로퍼티에 접근할 경우, 오류가 발생한다.  
타입스크립트에서 Promise객체를 사용할 때 타입변수를 직접 할당해주지 않으면 비동기 처리의 결과값이 unknown타입으로 추론된다.  
즉, Promise의 resolve 메소드의 매개변수가 unknown타입이기 때문에 기본 객체처럼 취급할수 없어 id 프로퍼티에 접근이 불가능하기 때문에 오류가 발생한다.  
- src/chapter5.ts
  ```ts
  postRequest.then((post) => {
    post.id // [Error] 'post' is of type 'unknown'.ts(18046)
  })
  ```

해당 문제를 해결하기 위해 fetchPost() 함수의 반환값인 Promise 객체에 타입변수를 할당한다.  
fetchPostA 함수의 반환값의 타입이 `function fetchPostA(): Promise<Post>`와 같이 Promise<Post> 타입으로 잘 추론된다.  
(Promise는 클래스이기 때문에 타입으로도 활용할 수 있다.)  
결과적으로 Promise 객체의 then 메소드에서도 `post: Post`와 같이 Post 인터페이스로 잘 추론이 된다.
- src/chapter5.ts
  ```ts
  function fetchPostA() {
    return new Promise<Post>((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: 1,
          title: '게시글 제목',
          content: '게시글 내용'
        })
      }, 3000)
    })
  }
  const postRequestA = fetchPostA();
  postRequestA.then((post) => {
    console.log(post.id)
  })
  ```

반환 값 자체의 Promise객체에 타입 변수를 직접 정의하지 않고 fetchPostB함수의 반환 타입으로 `Promise<Post>` 자체를 지정해줘도 해결이 가능하다.  
이 또한 Promise 객체의 then 메소드에서도 `post: Post`와 같이 Post 인터페이스로 잘 추론이 된다.
- src/chapter5.ts
  ```ts
  function fetchPostB(): Promise<Post> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: 1,
          title: '게시글 제목',
          content: '게시글 내용'
        })
      }, 3000)
    })
  }
  const postRequestB = fetchPostB();
  postRequestB.then((post) => {
    post.id
  })
  ```

첫번째 방법인 fetchPost함수의 return값으로 Promise 객체의 생성 시점에 타입변수를 전달하는 방법과
두번쨰 방법인 fetchPost함수의 반환타입으로 타입변수를 적용한 Promise 객체를 지정하는 방법 중 특별한 경우가 아니라면 두번째 방식을 추천한다.  
협업의 관점에서 동료들이 코드를 볼 때 함수의 선언 부분만 보고도 fetchPost 함수는 promise로 Post 타입을 반환하는것을 바로 확인할 수 있기 때문에 협업 관점에서 가독성이 좋다고 말할 수 있다.  
물론 위와같이 단순한 코드는 return문을 보고 직접 추려내도 문제가 되진 않겠으나, 만약 함수 내부가 계속해서 길어진다면 반환값의 타입을 직접 정의해주지 않으면 return문의 타입을 찾으려고 함수를 계속 살펴봐야 한다.  

</details>
<br>

## 템플릿1
<details>
<summary>펼치기/접기</summary>
<br>

### 
- src/chapter.ts
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
  - src/chapter.ts
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
