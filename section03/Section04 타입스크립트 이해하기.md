# [메인 마크다운.md](README.md)
<br>

# 타입스크립트 이해하기
<details>
<summary>펼치기/접기</summary>
<br>

## 타입 스크립트 이해
- 어떤 기준으로 타입 정의하는지
- 어떤 기준으로 타입간의 관계를 정의하는지
- 어떤 기준으로 타입의 오류를 검사하는지
위와 같이 타입스크립트의 구체적인 원리와 동작 방식을 살펴보는것을 말한다.

중요한 문법들만 쏙쏙 뽑아서 마치 달달 외우듯이 암기하듯 빠르게 배워 프로젝트에 바로 타입스크립트를 적용하고 싶을 수 있다.  
실제로 타입스크립트 공식 홈페이지 공식문서에 가보면 타입스크립트 치트시트라고 문법들만 따로 정리해서 공유해놓은 파일들도 있다.  
그러나 정말 아쉽게도 타입스크립트는 문법만 달달 외워서 프로젝트에 잘 적용할 수 있는 실무에 잘 사용할 수 있는 만만한 언어가 아니다.  
타입스크립트는 원리와 개념 이해의 뒷받침 없이는 기본적인 문법이야 외워서라도 어떻게든 써먹겠지만 조금만 새로운 상황이 생기거나  
조금 어려운 또는 처음보는 문제를 맞딱뜨리게 되면 개념과 이해를 잘 알지 못한 상태에서 문법만 아는 것으로는 그 문제를 해결하기 참 어렵다.  
```ts
type Parameters<T extends (...arg: any) => any> = T extends (
  ... arg: inter {}
) => any 
  ? P
  : never;
interface Post {
  title: string;
  categories: stringp[];
  tags: string[];
  content: string;
  thumbnailURL?: string;
}
let draft: Partial<Post>
```
위 코드만 봐도 복잡해보이는 TypeScript 코드이다.
이런 복잡해 보이는 타입스크립트의 문법들을 원리 이해도 없이 그냥 문법만 달달 외워서 쓸 수야 있겠지만 어려운 일이다.  
실제로 타입 스크립트를 처음 배울 때 회사에서 진행하는 프로젝트에 빨리 적용해야 할 경우 문법만 빠르게 달달 외워서 프로젝트에 투입하는 경우가 많으며  
그 결과물로 타입스크립트의 기능들을 제대로 활용하지도 못하고 오히려 타입스크립트 코드가 지적해주는 여러가지 오류들을 해결하느라 아주 더티한 코드를 생산하거나  
타입스크립트를 쓰는 이유도 없는 그런 이상한 코드들을 만들어 내서 결국 개발 기간이 길어지는 상황들을 마주하는 개발자들이 종종 있다.  
결국 이런 개발자들은 다시 원점으로 돌아와서 처음부터 타입스크립트를 배우게 된다.

이러한 시행착오를 겪지 않고 한번 배울 때 제대로 배워 완전히 나의 기술로 만들어서 자바스크립트를 사용했을 때보다 더 안정적이고 좋은 코드를 만들어낼 수 있어야 한다.  
그리고 그 과정에서 타입스크립트로 어떤 문제를 해결하는 일이 즐거워야 한다.

</details>
<br>

# 타입은 집합이다.
<details>
<summary>펼치기/접기</summary>
<br>

타입스크립트가 말하는 타입이란 정확히 무엇인지 집합의 관점으로 이해해본다.  
결론부터 말하면 타입스크립트가 말하는 타입은 집합이다.  
집합이라는것은 동일한 속성을 갖는 여러개의 원소 또는 요소들을 하나로 묶어둔 단위를 말한다.
![Number 타입 집합.png](image%2FNumber%20%ED%83%80%EC%9E%85%20%EC%A7%91%ED%95%A9.png)
위 사진과 같이 -20, Infinity, 0.123 등 여러가지 숫자들을 모아놓은 집합을 타입스크립트에서는 Number타입 이라는 이름을 붙여서 부른다.  
결론적으로 이렇게 동일한 속성과 특징들을 갖는 여러개의 값들을 모아둔 집합이라고 이해할 수 있다.  

다음 사진과 함께 Number 리터럴 타입에 대해서도 이야기해본다.  
예를들어 20이라는 Number 리터럴 타입이 있다고 가정한다.
![Number 리터럴 타입 집합.png](image%2FNumber%20%EB%A6%AC%ED%84%B0%EB%9F%B4%20%ED%83%80%EC%9E%85%20%EC%A7%91%ED%95%A9.png)
이런 리터럴 타입을 `let num:20 = 20;` 과 같이 변수의 타입으로 정의하면 변수 num은 20이라는 값 밖에는 할당할 수 없게 된다.  
20이라는 Number 리터럴 타입을 집합으로 생각해보면 딱 20이라는 값 하나만 포함하는 아주 작은 단위의 집합이라고 생각할 수 있다.  
여기서 한가지 더 들어가보면 Number 리터럴 타입이라는 집합 안에 있는 20 이라는 값은 Number 타입에도 속하는 값이다.  
따라서 이런 20 Number 리터럴타입 집합은 모든 Number 타입의 부분집합인것이다.
![Number 타입 집합2.png](image%2FNumber%20%ED%83%80%EC%9E%85%20%EC%A7%91%ED%95%A92.png)
Number 리터럴 타입이 포함하는 값들은 결국 전부 Number 타입이라는 집합에도 포함되는 값들이기 때문이다.  
이렇게 값의 집합인 타입들은 서로 포함하거나 또는 반대로 다른 타입에 포함되는 관계를 갖는다.  
![타입 포함관계.png](image%2F%ED%83%80%EC%9E%85%20%ED%8F%AC%ED%95%A8%EA%B4%80%EA%B3%84.png)
Number 타입 처럼 Number 리터럴 타입 같은 다른 타입을 포함하는 더 큰 타입을 `슈퍼 타입` 또는 `부모 타입` 이라고 부른다.  
반대로 Number 리터럴 타입처럼 다른 타입에 포함되고 있는 타입을 `서브 타입` 혹은 `자식 타입` 이라고 부른다.  
이렇게 타입들간의 부모-자식 또는 슈퍼-서브 타입 관계를 계층으로 표시하면 아래와 같은 그림이 된다.  
![슈퍼-서브 타입 계층.png](image%2F%EC%8A%88%ED%8D%BC-%EC%84%9C%EB%B8%8C%20%ED%83%80%EC%9E%85%20%EA%B3%84%EC%B8%B5.png)
이렇듯 타입스크립트가 말하는 타입이라는건 결국 값들을 포함하고 있는 집합이며, 그렇기 때문에 타입들끼리 서로 부모와 자식 관계를 맺으며 결국 모든 타입들의 관계를 놓고 보면 이런 타입 계층도로 만들어서 표현할 수 있다.  

## 타입 호환성
타입스크립트의 타입들이 서로 집합이고 계층을 이룬다는 정보를 알고 있으면 타입간의 호환성에 대해 이해할 수 있게 된다.  

![타입 호환성.png](image%2F%ED%83%80%EC%9E%85%20%ED%98%B8%ED%99%98%EC%84%B1.png)
타입 호환성 이라는 것은 위 사진에서 처럼 Number 타입과 Number 리터럴 타입 같은 두 개의 서로 다른 타입이 있을 때  
어떤 타입을 다른 타입으로 취급해도 괜찮은지 판단하는 것을 말한다.  
예를들어 타입스크립트에서는 Number 리터럴 타입을 Number 타입으로 취급하는건 가능하다.  
그러나 반대로 Number 타입의 값을 Number 리터럴 타입으로 취급하는 것은 허용되지 않는다.
왜냐하면 Number타입이 Number 리터럴 타입의 슈퍼 타입, 더 큰 타입, 더 큰 집합이기 때문이다.  
이러한 관계는 마치 정사각형과 직사각형의 관계로도 비유해 볼 수가 있다.  

![타입 호환성 사각형.png](image%2F%ED%83%80%EC%9E%85%20%ED%98%B8%ED%99%98%EC%84%B1%20%EC%82%AC%EA%B0%81%ED%98%95.png)
모든 정사각형은 직사각형이기 때문에 모든 정사각형을 직사각형으로 취급할 수 있다.  
하지만 반대로 모든 직사각형을 정사각형이라고 취급하는건 곤란하다.  
직사각형에는 정사각형이라는 것도 있고, 또 다른 종류의 사각형들이 굉장히 많기 때문이다.  
그렇기 때문에 직사각형은 정사각형을 포함하는 정사각형보다 더 큰 집합이다.
따라서 이 사각형의 관계 예가 Number 타입과 Number 리터럴 타입과 같다고 볼 수 있다.  
모든 Number 리터럴 타입의 값들은 숫자이기 때문에 Number 타입의 값으로 취급할 수 있기 때문이다.  
반대로 모든 Number 타입의 값을 Number 리터럴 타입의 값으로 취급하는것은 곤란하다.  
Number 리터럴 타입은 딱 하나의 숫자만 포함하는 타입이기 때문이다.  

```ts
let num1: number = 10;
let num2: 10 = 10;

num1 = num2;
```
위 코드의 경우 number 타입 변수 num1이 있고, 10이라는 number 리터럴 타입 변수 num2가 있다.  
두 변수 모두 10이라는 값으로 초기화 하였고 이때, num2의 값을 num1변수에 할당하는것은 괜찮다.
num2의 타입은 10이라는 number 리터럴 타입이고 num1의 타입은 number 타입이기 때문이다.  
이것이 가능한 이유는 10이라는 number 리터럴 타입에 포함되는 값들은 number 타입에도 포함되는 값이기 때문이다.  
그러나 반대의 경우는 불가능하다.  

```ts
let num1: number = 10;
let num2: 10 = 10;

num2 = num1;
```
위 코드의 경우 변수 2개를 선언하고 값을 초기화하는 것까진 똑같이 했지만 이전과는 반대로 num2에다가 num1의 값을 할당했다.  
num1의 타입은 number이고, num2의 타입은 10 number 리터럴 타입이다.  
이렇게 더 큰 타입의 값을 더 작은 타입의 변수에 할당하는것은 불가능하다.  
num1에 있는 값이 10이기 때문에 num2의 타입을 만족하긴 하지만 문제는 나중에 num1에 40을 넣거나 50을 넣거나 음수 혹은 infinity(무한대)를 넣을 수도 있기 때문이다.  
그렇기 때문에 num1이라는 변수의 타입 number 타입에 속하는 모든 값들이 10이라는 number 리터럴 타입에 속한다고 말하기에는 매우 어렵다.  

![최종정리.png](image%2F%EC%B5%9C%EC%A2%85%EC%A0%95%EB%A6%AC.png)
타입스크립트에서는 이렇게 number 리터럴 타입같은 서브타입의 값을 number타입 같은 슈퍼타입으로 취급하는건 괜찮다.  
하지만 반대로 number 타입 같은 슈퍼타입의 값을 number 리터럴 타입 같은 본인의 서브(자식) 타입의 값으로 취급하는건 불가능하다.  
또한 서브타입의 값을 슈퍼타입으로 취급하는걸 작은 곳에서 큰 곳으로 캐스팅 된다고 해서 업캐스팅 이라고 부르며  
슈퍼타입의 값을 서브타입의 값으로 취급하는 반대의 경우는 다운캐스팅이라고 부른다.  
슈퍼타입의 값을 서브타입의 값으로 취급하는 다운캐스팅은 대부분의 상황에 허용되지 않는다.  
반대로 서브타입의 값을 슈퍼타입의 값으로 취급하는 업캐스팅은 모든 상황에 문제없이 가능하다.  


</details>
<br>

# 타입계층도와 기본타입
<details>
<summary>펼치기/접기</summary>
<br>

![타입계층도.png](image%2F%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8%E1%84%80%E1%85%A8%E1%84%8E%E1%85%B3%E1%86%BC%E1%84%83%E1%85%A9.png)
# 1. Unknown 타입 (전체 집합)
타입계층도의 최 상단에 위치해있다.  
그렇기 때문에 unknown타입은 타입스크립트에 존재하는 많은 모든 타입들의 슈퍼 타입이다.  
집합으로 이야기 해보자면 unknown 타입이라는 집합 안에 많은 타입들이 다 포함된다라고 볼수 있기 때문에 전체 집합이라고 볼 수 있다.  

## 예제코드: unknownExam()
```ts
function unknownExam() {

  /* 업캐스팅 */
  let a: unknown = 1; // number 타입의 값을 unknown 타입에 할당하는 업캐스팅
  let b: unknown = "hello";
  let c: unknown = true;
  let d: unknown = null;
  let e: unknown = undefined;

  /* 다운캐스팅 */
  let unknownVar: unknown; // unknown타입 변수 최초 정의
  let num: number = unknownVar; // [Error]: Type 'unknown' is not assignable to type 'number'.
  let str: string = unknownVar; // [Error]: Type 'unknown' is not assignable to type 'string'.
  let bool: boolean = unknownVar; // [Error]: Type 'unknown' is not assignable to type 'boolean'.
  let nullVar: null = unknownVar; // [Error]: Type 'unknown' is not assignable to type 'nullVar'.
  let undefinedVar: undefined = unknownVar; // [Error]: Type 'unknown' is not assignable to type 'nullVar'.

}
```
### 업 캐스팅
unknown 타입은 모든 타입의 super 타입이기 때문에 모든 타입의 값을 할당할 수 있다.  
number, string, boolean, null, undefined 값 모두 unknown타입 변수에 할당 가능하다.  
unknown 타입 같은 모든 타입의 슈퍼 타입에는 모든 타입이 다 업캐스팅 할 수 있기 때문에 모든 타입의 값을 할당할 수 있는것이다.  

### 다운캐스팅
그러나 반대인 다운캐스팅은 불가능하다.  
unknown타입의 값을 number, string, boolean, null, undefined 타입 변수에 할당할 수 없다.  
예를들어 number타입의 변수에 unknown 타입의 값을 할당한다는 것은 number 타입을 다운캐스팅 시키겠다는 것이다.  
string, boolean, null, undefined 타입 값들에도 unknown타입의 값을 할당한다는 것은 동일하게 다운캐스팅에 해당한다.  
이렇게 업캐스팅 즉, unknown타입의 변수에는 모든 값을 넣을 수 있지만  
반대로 다운캐스팅 unknown타입의 변수는 어떤 타입의 변수에도 들어갈 수 없다.  


# 2. Never 타입  
타입 계층도 상의 가장 아래에 위치해 있고, 그렇기 때문에 never 타입은 모든 타입의 서브타입에 해당한다.  
모든 집합의 부분집합 수학에서는 이를 아무것도 없다는 의미의 공집합이라고 불렀다.  

## 예제코드: neverExam()  
```ts
function neverExam() {
  /* 무한루프 실행 함수 */
  function neverFunc(): never {
    while(true) {}
  }
  
  /* 업캐스팅 */
  let num: number = neverFunc();
  let str: string = neverFunc();
  let bool: boolean = neverFunc();

  /* 다운캐스팅 */
  let never1: never = 10;
  let never2: never = "hello"
  let never3: never = true
}
```
### 무한루프 실행 함수
never 타입은 공집합, 불가능을 의미하는 것이기 때문에 while true와 같은 무한루프를 실행하는 함수를 예로들면  
절대 이 함수가 어떤 값을 반환하는 것 자체가 말이 안된다 라고 했을 때, 반환 타입을 정의하기 위해 never를 활용했다.  
이 예시에서 never의 의미 자체가 이 함수가 반환하는 값의 종류는 공집합이다 라고 하는 것과 똑같은 것이다.  
"반환할 수 있는 값의 종류가 아무것도 없다."  

### 업캐스팅
never타입은 모든 타입의 서브타입이기 때문에 그 어떤 타입의 변수에도 값을 할당할 수 있다.  
number, string, boolean 타입 모두 업캐스팅이기 때문이다.  

### 다운캐스팅
그러나 이 역시 반대인 다운캐스팅은 불가능하다.  
never타입에 number타입 숫자값을 할당한다는것은 number 타입이 never타입으로 다운캐스팅 되는 것이기 때문이다.  
string, boolean타입도 모두 never타입의 변수에 할당하는것은 다운캐스팅이므로 어떤 타입의 값도 할당이 불가능하다.  


# 3. Void 타입

## 예제코드: voidExam()  
```ts
function voidExam() {
  function voidFunc(): void {
    console.log("hi")
    return undefined;
  }

  let voidVar: void = undefined;
}
```
void타입은 반환값이 없는 함수 즉, return문 자체가 없는 함수에 반환 타입을 명시하는데 사용한다.  
void타입은 타입 계층도 상에서 모든 타입의 수퍼타입인 unknown이나 모든 타입의 서브타입인 never타입과는 다르게 중간에 위치해 있다.  
그러나 한가지 주의깊게 살펴 볼 점은 void타입은 undefined타입의 슈퍼타입이다.  
그렇기 때문에 void 타입의 변수에는 undefined의 값을 할당할 수 있다.  
서브타입인 undefined가 수퍼타입인 void타입에 업캐스팅 하는것이기 때문에 가능한것이다.
이 원리를 void타입의 함수에 적용해보면 return문으로 undefined를 반환하도록 해도 문제가 발생하지 않는다.  
결론: void타입은 undefined의 수퍼타입이다.


# 2. Any 타입
타입 계층도 상에서는 unknown 타입의 서브타입으로 위치해 있으나 Any타입은 사실상 치트키 타입이다.  
따라서 Any타입은 타입계층도를 완벽히 무시한다.  
Any타입은 모든 타입의 수퍼타입으로 위치하면서도 never를 제외한 모든 타입의 서브타입으로도 위치한다.

## 예제코드: voidExam
```ts
function anyExam() {
  let anyVar: any;

  /* unknown → any 다운캐스팅 */
  let unknownVar: unknown;
  anyVar = unknownVar
  
  /* any → undefined 다운캐스팅 */
  let undefinedVar: undefined;
  undefinedVar = anyVar;

  /* any → never 다운캐스팅 */
  let neverVar: never;
  neverVar = anyVar;
}
```
### unknown → any 다운캐스팅
any타입 변수에 unknown타입 변수 할당이 신기하게 가능하다.  
타입 계층도 상에서는 any타입이 unknown타입의 서브타입이다.
any타입에 unknown 타입 변수를 할당한다는 것은 unknown타입이 any타입으로 다운캐스팅 되고 있는것이며, 신기하게도 오류가 발생하지 않고 허용된다.  
즉, any타입 한정으로 수퍼타입인 unknown타입이 서브타입인 any타입으로 다운캐스팅이 가능하다.  

### any → undefined 다운캐스팅
any 타입의 변수를 undefined 타입 변수에 할당이 가능하다.
타입 계층도 상으로 보면 또 다운캐스팅이다.

이렇게 any타입은 자신에게 오는 다운캐스팅과 자기스스로 다운캐스팅 하는것 모두 가능하기 때문에 치트키 타입이라고 생각하면 된다.  
any타입은 타입계층도를 모두 무시해버리기 때문에 위험한 타입으로 왠만해서는 사용하지 않도록 권유하는것이다.  

### any → never 다운캐스팅
any 타입의 변수를 never 타입 변수에 할당하는것은 불가능하다.  
never타입은 정말 순수한 공집합 이기 때문에 never 타입의 변수에는 그 어떤 타입(any)도 다운캐스팅 할 수 없다.  



</details>
<br>

# 객체 타입의 호환성
<details>
<summary>펼치기/접기</summary>
<br>

객체 타입의 호환성에 대해 알아보기 전에 먼저 이전시간에 배운 기본 타입간의 호환성에 대해 다시 한번 알아본다.  

## 기본 타입간의 호환성
특정 타입을 다른 타입으로 취급해도 괜찮은지 판단하는 것이다.  
아래와 같이 number타입과 number literal 타입변수가 각각 있을 때 number literal 타입의 값을 number 타입의 값에 할당하는것은 허용된다.  
number 타입이 number literal 타입보다 더 큰 super타입이기 때문에 즉, 업캐스팅이라서 가능하다.  
- src/chapter3.ts
  ```ts
  let num1: number = 10;
  let num2: 10 = 10;

  num1 = num2;
  num2 = num1; // 더 작은 서브타입으로 다운캐스팅 불가능
  ```

## 객체 타입간의 호환성
어떤 객체 타입을 다른 객체 타입으로 취급해도 괜찮은가를 판단하는 것이다.  

Animal이라는 동물 타입이 있다고 가정한다.  
해당 타입은 객체 타입으로 name: string, color: string으로 두개의 프로퍼티를 갖는 객체이다.  
그 다음 동물중에 강아지라는 Dog 타입을 추가로 정의한다.  
강아지도 동물이기 때문에 동물 타입과 똑같이 name과 color 프로퍼티를 똑같이 정의해준다.  
특별히 견종이 나뉘므로 breed라는 견종 property를 추가로 만든다.  
다음으로 각각의 타입을 갖는 객체를 실제로 만든다.  

- src/chapter3.ts
  ```ts
  type Animal = {
    name: string;
    color: string;
  }

  type Dog = {
    name: string;
    color: string;
    breed: string; // 견종
  }
  let animal: Animal = {
    name: "기린",
    color: "yellow"
  }

  let dog: Dog = {
    name: "돌돌이",
    color: "brown",
    breed: "진도"
  }

  animal = dog; // 업캐스팅 - [Animal: Super / Dog: Sub]
  dog = animal; // Property 'breed' is missing in type 'Animal' but required in type 'Dog'.ts(2741)
  ```
animal 변수에 dog를 집어넣으면 오류가 발생하지 않지만 [반대]로 dog 변수에 animal을 집어넣으면 오류가 발생한다.  
업/다운 캐스팅 용어로 정리하자면 Animal 타입은 Dog타입을 포함하는 Super타입이고, Dog타입은 Animal 타입의 서브타입이 된다.  
이렇듯 객체 타입도 기본타입처럼 서로 슈퍼/서브 타입 관계를 갖는다.  
객체 타입은 슈퍼/서브 타입 관계를 갖는 기준은 property를 기준으로 관계를 갖게된다.  
Dog타입이 더 작은 서브타입인데 Dog타입의 프로퍼티를 보면 animal타입의 프로퍼티를 모두 가지고 있으며, breed라는 추가 프로퍼티 까지 가지고 있다.  
이 경우 dog타입이 가진게 더 많으니 Dog타입이 더 큰 타입이 아닐까 생각할 수 있다.  
그러나 그 반대이다.  

타입스크립트는 `프로퍼티를 기준`으로 타입을 정의하는 `구조적 타입 시스템`을 따른다.  
그렇기 때문에 Animal 타입은 name과 color 프로퍼티가 있는 객체는 다 Animal 타입으로 간주하며,  
Dog타입은 구조적으로 name과 color 추가로 breed 프로퍼티 까지 3개를 가진 객체는 다 Dog 타입으로 간주한다.  
Dog타입에 해당되는 객체는 name, color, breed를 무조건 갖고 있는 객체 이므로 Animal 타입에도 해당되는 객체가 된다.  
Dog타입에 해당되면 name과 color는 무조건 있을것이기 때문에 Animal 타입 규칙에도 해당이 된다.  
만약 breed라는 추가 프로퍼티를 갖고 있는 객체라고 하더라도 name과 color만 있으면 모두 Animal 타입이기 때문에 Dog타입의 값들도 결국 모두 Animal 타입의 값으로 포함될 수 있는 것이다.  

반면, Animal 타입의 객체들은 모두 Dog타입에 포함된다고 보긴 어렵다.  
Dog타입의 객체가 되기 위해서는 breed라는 추가적인 프로퍼티까지 가지고 있어야 하는데, Animal 타입에 해당되는 객체들에는 breed라는 프로퍼티를 가지지 않은 객체들도 있을 수 있다.  
따라서 객체 타입들 간의 관계를 정의할 때는 Dog 타입처럼 breed같은 추가 프로퍼티가 있는 타입이 수퍼타입이 되는것이 아닌 반대로 추가 프로퍼티가 없는 조건이 더 적은 타입이 수퍼타입이 된다.  
그렇기 때문에 Animal 타입의 변수 animal에는 Dog타입의 변수인 dog를 업캐스팅이기 때문에 할당할 수 있지만 
반대로 Dog 타입의 변수에는 Animal 타입의 변수를 다운캐스팅이기 때문에 할당할 수 없는것이다.  


### 예제 1) 객체 슈퍼-서브 타입

- src/chapter3.ts
  ```ts
  type Book = {
    name: string;
    price: number;
  }

  type ProgrammingBook = {
    name: string;
    price: number;
    skill: string; // 어떤 스킬에 대해 다루는지에 대한 property
  }

  let book: Book;
  let reactBook: ProgrammingBook = {
    name: "한 입 크기로 잘라먹는 리액트",
    price: 33000,
    skill: "reactjs"
  }

  book = reactBook;
  reactBook = book; // Property 'skill' is missing in type 'Book' but required in type 'ProgrammingBook'.ts(2741)
  ```
Book타입이 슈퍼타입이고 ProgrammingBook 타입이 서브타입이다.  
Book 타입에 있는 프로퍼티를 ProgrammingBook타입이 이미 가지고 있고, 추가적인 프로퍼티(skill)까지 가지고 있기 때문에 ProgrammingBook타입에 해당되는 값들은 모두 Book타입에 포함될 수 있게 된다.  
그렇기 때문에 book이라는 Book타입 변수에 reactBook이라는 ProgrammingBook타입 서브타입 변수를 할당하는것은 업캐스팅이기 때문에 가능하고, 반대로 reactBook에 book 변수를 할당하는것은 다운캐스팅이기 때문에 불가능하다.  

### 예제 1) 초과 프로퍼티 검사
Book타입의 변수를 하나 더 선언한 뒤 객체 리터럴로 초기화한다.  
서브타입인 ProgrammingBook 타입의 변수 reactBook 객체의 프로퍼티들과 똑같이 구성한다.
- src/chapter3.ts
  ```ts
  let book2: Book = {
    name: "한 입 크기로 잘라먹는 뷰",
    price: 33000,
    skill: "vuejs"
  }
  ```
이 경우 skill 이라는 프로퍼티가 있으면 안된다는 오류가 발생한다.  
Book타입에 skill이라는 프로퍼티를 정의하지 않았지만 reactBook이라는 서브타입 값을 넣는것은 업캐스팅이므로 가능했다.  
바로 초과 프로퍼티 검사라는 타입스크립트의 특수한 기능이 발동되었기 때문이다.  

초과 프로퍼티 검사 라는 것은 위와 같이 변수를 초기화 할 때 초기화 하는 값으로 객체 리터럴을 사용하면 발동하는 검사이다.  
객체 타입 변수를 초기화할 때 객체 리터럴을 사용하면 skill같은 초과 프로퍼티 즉, 실제 Book타입에서는 정의해 놓지 않은 프로퍼티를 작성할 수 없도록 막는 검사가 바로 초과 프로퍼티 검사 이다.  
이렇게 객체 타입의 변수를 초기화할 때 객체 리터럴을 사용한다면 주석처리를 하거나 삭제해서 객체 타입에 정의된 프로퍼티만 할당할 수 있도록 해야한다.  


만약 초과 프로퍼티 검사를 피하기 위해서는 새로운 변수를 만들고 reactBook 같은 변수를 할당하면 초기화할 때 객체 리터럴을 사용한것이 아니기 때문에 초과 프로퍼티 검사가 발동하지 않아 이런 경우에는 허용이 된다.  
- src/chapter3.ts
  ```ts
  let vueBook: ProgrammingBook = {
    name: "한 입 크기로 잘라먹는 뷰",
    price: 33000,
    skill: "vuejs" // Object literal may only specify known properties, and 'skill' does not exist in type 'Book'.ts(2353)
  }
  let book3: Book = vueBook;
  ```


함수의 인수로 전달할 때도 객체 리터럴을 전달하면 초과 프로퍼티가 발동하게 되기 때문에 만약 서브타입 객체를 넣으려고 한다면
객체 리터럴을 이용하는게 아니라 변수에 저장해 두었다가 인수로 변수를 전달해야 된다.  
- src/chapter3.ts
  ```ts
  function func(book: Book) {}
  func({
    name: "한 입 크기로 잘라먹는 뷰",
    price: 33000,
    skill: "vuejs" // Object literal may only specify known properties, and 'skill' does not exist in type 'Book'.ts(2353)
  })

  func(vueBook)
  ```
</details>
<br>

# 대수 타입
<details>
<summary>펼치기/접기</summary>
<br>

## Union 합집합
합집합 타입은 영어로 유니온 타입이라고 부르기도 한다.  
유니온이라는 단어는 우리말로 합집합이라는 뜻이다.  
예를들어 number 그리고 string 같은 두가지의 타입이 있을 때 number타입에는 숫자 값만, string타입에는 문자열 값만 들어올 수 있기 때문에 교집합이 없는 두가지의 집합으로 볼 수 있다.  
number타입과 string타입의 합집합은 `let a: string | number` 과 같이 | bar 기호를 활용하여 정의한다.  
이제 이 변수 a에는 숫자값도 할당할 수 있고 문자값도 할당할 수 있게 된다.  
a라는 변수에 number 타입과 string 타입의 합집합을 정의해 놨기 때문에 1같은 number 타입에 해당하는(포함되는) 값도 할당할 수 있고, "hello" 같은 string타입에 포함되는 문자열 값도 할당할 수 있는것이다.  
참고로 이렇게 만든 union타입은 string number union 타입 이라고 부를 수 있다.  
- src/chapter4.ts
  ```ts
  let a: string | number;
  a = 1;
  a = "hello";
  ```

### 예제1) 기본타입 합집합
a와 같은 union타입 변수 b가 있다고 가정할때, b = true; 와 같이 boolean 타입도 할당하기 위해서는 아래와 같이 변수 선언시 boolean타입또한 bar|를 통해 union타입으로 정의해 준다.
이렇게 union타입을 만들 때 bar|를 이용해서 추가할 수 있는 타입의 개수는 무한대이다.  
undefined, null, 객체 모두 다 넣을 수 있기 때문에 개발할 때 필요한 만큼 union타입으로 여러개의 타입을 묶어 정의할 수 있다.  
- src/chapter4.ts
  ```ts
  let b: string | number | boolean;
  b = true;

  let c: string | number | boolean | undefined | null | {} | unknown | never;
  ```

### 예제2) 배열타입 합집합
일반적으로 배열의 타입을 정의할때는 string[] 혹은 number[]와 같이 정의한다.  
배열의 타입에서도 아래와 같이 실제 타입을 작성하는 영역에 소괄호를 선언하고 그 안에 타입을 bar|로 구분하여 union타입을 구성할 수 있다.  
- src/chapter4.ts
  ```ts
  let arr: number[] = [1, "hello", true];
  ```

### 예제3) 객체 타입들을 활용한 유니온 타입
name과 color 프로퍼티를 갖는 Dog 타입과 name과 language프로퍼티를 갖는 Person 타입을 만든다.  
type 별칭을 이용하여 Union1이라는 타입을 bar|를 활용하여 Dog와 Person에 대한 Union타입으로 정의한다.  
이렇게 타입 별칭을 이용해서도 객체 union타입을 만들 수 있다.  
다음으로 이렇게 생성된 Union1 타입의 객체 union1 변수를 선언하고 객체 리터럴 값을 할당한다.
이때 객체의 프로퍼티는 마치 Dog 타입의 객체를 만들듯이 name과 color 프로퍼티만 있도록 초기화 한다.
추가로 Person타입의 객체를 만들듯 union2 변수를 Union1 타입으로 정의하고 name과 language 프로퍼티만 있도록 초기화 한다.  
마지막으로 Dog타입과 Person타입의 모든 프로퍼티를 다 갖고 있는 name, color, language 프로퍼티를 모두 초기화 한다.  
이렇게 Dog타입, Person타입, Dog|Person Union타입 3가지 유형으로 초기화 하여도 오류가 발생하지 않는다.  
- src/chapter4.ts
  ```ts
  type Dog = {
    name: string;
    color: string;
  }
  type Person = {
    name: string;
    language: string;
  }

  type Union1 = Dog | Person

  /* Dog 타입 */
  let union1: Union1 = {
    name: "",
    color: ""
  }

  /* Person타입 */
  let union2: Union1 = {
    name: "",
    language: ""
  }

  /* Dog | Persion - Union타입 */
  let union3: Union1 = {
    name: "",
    color: "",
    language: ""
  }
  ```
#### 객체 유니온 타입 예외  
아래와 같이 Dog타입과 Person타입이 공유하는, 즉 동시에 가지고 있는 name이라는 프로퍼티만 가지고 있는 객체를 값으로 할당한다.
이 경우 오류가 발생한다.  

- src/chapter4.ts
  ```ts
  /* Type '{ name: string; }' is not assignable to type 'Union1'.
  Property 'language' is missing in type '{ name: string; }' but required in type 'Person'.ts(2322) */
  let union4: Union1 = {
    name:""
  }
  ```
union1에서 Dog타입에 해당하는 객체를 할당했을 때와, union2에서 Person타입에 해당하는 객체를 할당했을 때, 그리고 Dog, Person 두개의 타입의 모든 프로퍼티를 다 갖는 객체를 할당했을 때 
이렇게 3가지 경우는 허용이 되었는데 두 타입이 공통적으로 가지고 있는 name이라는 프로퍼티만을 구성하고있는 객체는 허용이 안된다.  
Dog타입과 Person타입의 관계적 집합 관점에서 본다면 Dog타입과 Person타입은 누구도 서로의 슈퍼타입이거나 서브타입이지 않고 그냥 교집합을 가지고 있는 타입이다.  
이러한 관계를 갖는 이유는 Dog와 Person타입이 각각 color와 language라는 서로에게 없는 프로퍼티를 가지고 있기 때문이다.  
예를들어 어떤 객체가 있다고 가정했을 때 name과 color프로퍼티만 갖는 객체가 있다고 하면 `{name, color}` 이 객체는 Dog타입에만 포함된다.  
Person타입에 해당이 되려면 이 객체에 language 프로퍼티가 있어야 되기 때문이다.  
추가로 `{name, language}`와 같이 name과 language프로퍼티가 있는 객체가 있다고 하면 이 객체는 Dog타입에는 포함되지 않고 Person타입에만 포함된다.  
마지막으로 `{name, color, language}`와 같이 name, color, language 3개의 프로퍼티를 다 가지고 있는 객체가 있다면 
name과 color가 있기 때문에 Dog에도 포함되고 name과 language가 있기 때문에 Person에도 포함이 된다.  
그렇기 때문에 양쪽 모두 집합에 포함되는 객체는 교집합에 존재하게 된다.  

다른 관점에서 보면 name 프로퍼티만 갖고 있는 union4는 Dog타입에도 포함될 수 없고, Person 타입에도 포함될 수 없다. 
Dog 타입에 포함되기 위해서는 Dog타입이 가지고 있는 모든 프로퍼티를 가진 객체만 가능하고, Person 타입에 포함되기 위해서는 Person타입이 가지고 있는 모든 프로퍼티를 가진 객체만이 가능한것 처럼 
어떤 객체에 포함 되기 위해서는 포함할 대상 객체의 모든 프로퍼티를 가지고 있어야 하기 때문이다.  
이것이 바로 프로퍼티 관점이 아닌 객체 값(구조) 관점에서 바라보는 집합이다.
이러한 객체 값(구조) 관점에서 바라볼때 수학적으로 합집합인 원리가 타입스크립트 에서는 교집합으로 정의된다.  

따라서 집합 관점으로 보는 타입스크립트의 원리로 인해 name프로퍼티만 갖는 union4 객체는 Dog도, Person도 아닌 합집합 바깥에 있기 때문에 
Union1 이라는 합집합 타입 안에 포함되지 않으므로 오류가 발생한다.  

결론: Union타입은 객체들 중 한쪽 타입에 포함되는 객체이거나 모두 다 포함되는 교집합에 위치하는 객체들만 Union타입에 포함된다
<br>

## Intesection 교집합
변수를 선언한 뒤 교집합으로 정의하려는 타입들 중간에 & 연산자를 활용하여 선언한다.  

### 기본 타입 교집합 - never 타입 추론
- src/chapter4.ts
  ```ts
  let variable: number & string;
  ```
number 타입과 string 타입의 교집합 타입은 무슨 타입일까?  
number 타입과 string타입을 집합으로 두고 보면 교집합을 가지고 있지 않은 형태이다.  
number 타입은 숫자값만, string타입은 문자열 값만 포함되기 때문이다.  
그렇기 때문에 아래 변수에 마우스 커서를 올려보면 `let variable: never` 와 같이 never 타입으로 타입추론 되어있는것을 확인할 수 있다.  
never타입이란 불가능한 타입으로 집합으로 표현하면 공집합을 의미하는 타입이다.  
number 타입과 string 타입의 교집합은 공집합이기 때문에 never타입으로 타입 추론이 된것이다.  
이렇듯 Intersection 타입 즉, 교지합 타입은 &연산자를 이용해 여러개의 타입 간 교집합 타입을 만들 수 있는 타입이다.  
기본타입들을 가지고 Intersection 타입을 만들면 대부분이 never 타입이다.  
기본 타입들 중에서는 서로 공유하거나 겹치는 값들이 없기 때문이다.  
따라서 보통 Intersection타입, 교집합 타입은 객체 타입에 많이 사용한다.

### 객체 교집합 타입
Cat 타입과 Human 타입의 교집합 타입을 정의해본다.
타입 별칭을 통해 Cat타입과 Human타입을 &연산자를 활용하여 Intersection이라는 타입에 할당한다.  
- src/chapter4.ts
  ```ts
  type Cat = {
    name: string;
    color: string;
  }
  type Human = {
    name: string;
    language: string;
  }

  type Intersection = Cat & Human;

  /* Type '{ name: string; color: string; }' is not assignable to type 'Intersection'.
    Property 'language' is missing in type '{ name: string; color: string; }' but required in type 'Human'.ts(2322) */
  let intersection: Intersection = {
    name:"",
    color: "",
    // language: ""
  }
  ```
Intersection타입 즉, Cat과 Human의 교집합 타입은 과연 어떤 객체들을 포함할까?  
Cat 타입의 프로퍼티들과 Human 타입의 프로퍼티를 다 가지고 있는 {name, color, language} 형태의 객체들만 포함하게 된다.  
만약 프로퍼티가 단 1개라도 빠지면 해당 교집합 타입에 포함되지 않게된다.  
다시 한번 Cat과 Human타입의 관계를 빠르게 살펴보면 타입스크립트의 프로퍼티 관점이 아닌 객체 값(구조) 관점에서 바라보는 집합에서 교집합의 경우 
Cat타입{name, color}과 Human타입{name, language}이 가지고 있는 모든 프로퍼티를 가진 객체가 바로 타입스크립트의 교집합으로 정의되기 때문이다.  
결론적으로 Cat타입과 Human타입의 교집합에 해당하는 객체는 오직 Cat타입과 Human타입의 모든 프로퍼티를 다 갖고 있는 객체만 교집합 타입으로 포함될 수 있다.  
따라서 language같은 프로퍼티라도 하나라도 생략하면 교집합 타입에 포함되지 않고 오류가 발생하게 된다.  

</details>
<br>

# 타입 추론
<details>
<summary>펼치기/접기</summary>
<br>

타입스크립트는 점진적 타입 시스템을 채택하고 있는 언어이다.
점진적 타입 시스템 이란 `let a: number = 10;` 과 같이 변수의 타입을 정의할 수 있는 문법을 제공하여 프로그램이 실행되기 전에 타입 검사를 수행하지만 만약 `let b = 10;` 과 같이 변수의 타입이 정의되어 있지 않을 때에도 단순히 변수만 선언하고 초기값 할당만 하면 알아서 타입스크립트가 이 초기값 10을 기준으로 변수의 타입을 추론하는 편리한 타입시스템을 말한다.  
결론적으로 타입스크립트는 자동으로 변수의 타입을 추론한다.
지금까지는 타입스크립트를 배워보는 시간이었기 때문에 대부분의 변수에 직접 타입을 정의해주었지만 앞으로는 타입 추론을 잘 이용하면 굳이 타입을 일일이 변수에 정의하지 않아도 되므로 타이핑 할 양이 줄어들기 때문에 코드도 간결해지고 생산성도 올라가게 될것이다.  
- src/chapter5.ts
  ```ts
  let a:number = 10;
  let b = 10;
  ```
다만 한가지 주의할 점은 타입스크립트라고 해도 모든 상황에 타입을 추론해주지많은 않는다.  
예를들어 아래 `func()`함수와 같이 매개변수가 있는 함수를 선언했을 때 매개변수의 type을 직접 정의해 주지 않으면 타입스크립트가 추론할 수 없기 때문에 오류가 발생할 수 있다.  
- src/chapter5.ts
  ```ts
  function func(param) {} // Parameter 'param' implicitly has an 'any' type.ts(7006)
  ```

## 타입 추론 상황 및 타입 추론 원리
대표적인 타입 추론이 가능한 상황은 일반적인 변수를 선언하는 상황이다.  
앞서 변수 b를 선언하고 초기값으로 number타입의 값 10을 할당할 경우 자동으로 변수의 타입을 number 타입으로 추론한다.  
커서를 올려보게 될 경우 `let b: number`를 출력한다.  
아래와 같이 변수 c를 선언한 뒤 타입을 지정하지 않고 바로 문자열 값을 할당할 경우에도 마찬가지로 `let c: string`를 출력한다.  
이렇게 타입 스크립트는 일반적으로 변수를 선언하고 초기화하는 상황에서 알아서 자동으로 타입을 잘 추론한다.  
이때 타입스크립트가 타입을 추론하는 기준은 변수의 초기값이다.  
초기값을 기준으로 변수의 타입을 추론하기 때문에 변수 d와 같이 복잡한 객체를 저장하더라도 마우스 커서를 올릴 경우 잘 추론된것을 확인할 수 있다.
- src/chapter5.ts
  ```ts
  let c = "hello"
  const d = {
    id: 1,
    username: "유재혁",
    profile: {
      nickname: "유혁스쿨"
    },
    url: ["https://github.com/yooHyeok"]
  }
  ```

### 1. 구조분해할당
예를들어 변수 `d`로부터 id, username, profile 프로퍼티들을 구조분해 할 때에도 커서를 올려보면 변수의 타입을 자동으로 잘 추론하는 것을 볼 수 있다.  
따라서 id는 number username은 string profile은 nickname 프로퍼티를 가진 객체로 잘 추론이 되는것을 볼 수 있다.  
마찬가지로 배열에 대한 구조분해 할당을 한다고 해도 각각의 원소는 처음 선언한 대상 배열에 맞춰 타입추론이 된다.  
(구조 분해 할당은 새로운 변수를 만들고 값을 복사하여 저장하는 참조 원리)  
이렇게 객체와 배열에 대한 구조분해 할당을 포함하여 왠만한 변수 선언은 거의 다 자동으로 추론한다고 보면 된다.  
- src/chapter5.ts
  ```ts
  let {id, username, profile} = d;
  let [one, two, three] = [1, "hello", true]
  ```

### 2. 함수에서의 타입 - 매개변수, 반환타입 
아래 func1 함수와 같이 선언 후 마우스 커서를 올려보면 함수의 반환 타입도 자동으로 추론하는걸 확인할 수 있다.  
함수의 반환 타입을 추론할 때는 초기화하는 값이 아니라 return문 다음에 오는 반환값을 기준으로 추론한다 라고 이해하면 된다.  
또한 함수의 매개변수에 기본값이 문자열로 할당되어 있다면 `(parameter) msg: string`와 같이 기본값을 기준으로 타입을 추론한다.  
- src/chapter5.ts
  ```ts
  function func1(msg = "hello") {
    return "hello";
  }
  ```

타입 추론 관련 모든 상황들을 암기할 필요는 없다.  
코드를 보고 어떤 변수와 타입을 추론할 정보가 있으면 추론이 되고, 만약 추론할 정보가 없다면 추론이 안된다고 이해하면 된다.  
예를들어 변수 a와 같이 선언 후 초기화 값으로 숫자 10을 할당하면 누가봐도 number타입으로 추론되는게 당연하다.  
마찬가지로 문자열이나 객체도 배열도 구조분해 할당도 함수의 반환타입도 기본값이 설정된 매개변수의 값도 똑같은 원리이다.  
개발자가 코드를 육안으로 살펴보았을 때 어떤 타입으로 추론될것인지 예측 가능할 경우 타입스크립트도 당연히 추론을 할 수 있다.

### 3. any타입의 진화
초기값을 생략하여 변수를 선언할 경우 추론 가능한 정보가 없기 때문에 any타입으로 추론된다.  
그렇기 때문에 아무 값이나 할당할 수 있게 된다.  
만약 숫자 값을 할당하게 되면, 할당한 라인의 다음 라인에서 nummber타입으로 추론이 된다.  
number 타입에서만 사용할 수 있는 toFixed같은 메소드도 사용할 수 있으며, string타입의 toUpperCase() 같은 메소드를 호출할 경우 number타입이기 때문에 안된다는 오류를 출력한다.  

- src/chapter5.ts
  ```ts
  let e;
  e = 13; // 1. let e: any - number 값 할당
  e; // 2. let e: number
  e.toFixed();
  e.toUpperCase();
  e = "hello"; // 3. let e: any - string 값 할당
  e; // let e: string
  e.toUpperCase();
  e.toFixed();
  ```

신기한것은 e라는 변수에 문자열 값을 할당할 경우 문제가 되지 않는다.  
이렇게 다른 타입의 값으로 다시 할당하고 나면 할당한 다음 라인에서는 또 타입이 string으로 변경된다.  
더 신기한 것은 13을 할당한 다음 라인에 다시 마우스 커서를 올릴 경우 number 타입으로 추론되는것을 확인할 수 있다.  
이렇게 타입이 마치 변신하듯 계속 바뀌는 상황을 any타입의 진화라고 부른다.  

변수를 선언하고 초기값을 지정하지 않으면 암묵적인 any타입으로 추론된다.  
암묵적 any타입이란 타입어노테이션으로 any타입을 지정하지 않더라도 변수의 타입에 대한 아무런 정보가 없을 경우 암묵적으로 any로 추론되는것을 말한다.  
이 경우 변수에 들어가는 값에 따라 any타입이 계속 진화를 하게 된다.  
아래 예시코드에서 주석으로 작성한 1번 라인에서 number타입에 값 할당을 완료할때 까지 any타입이였다가,  
실제 할당 작업이 종료된 순간 number타입으로 진화하는 것이다.  
따라서 2번 라인부터 number타입이 되는것이다.
또 3번 라인에서 "hello"라는 string 타입의 문자열 값을 할당할 경우 할당을 완료할때 까지는 any타입이였다가,  
실제 할당 작업이 죵료된 순간인 4번 라인부터 string 타입으로 진화하는 것이다.  
따라서 `let e` 와 같이 초기값 없이 변수를 선언하기만 하면 암묵적으로 any타입으로 추론이 되며, 이렇게 암묵적으로 추론된 타입은 실제 값 할당시 진화하게 된다.  

#### 3_1. 명시적 any 타입 
암묵적으로 any타입으로 추론되는 것은 `let f:any;` 처럼 명시적으로 any타입을 정의하는 것과는 동작이 다르다.  
명시적으로 any타입을 정의하면 모든 라인이 다 any타입이 되기 때문이다.  
따라서 특정 타입만 사용 가능한 메소드 들을 어디서든 다 호출할 수 있게 된다.  
하지만 암묵적 any 타입을 갖게 만들면 타입이 계속 진화하게 된다.
- src/chapter5.ts
  ```ts
  let f: any;
  f = 13; // 1. let f: any - number 값 할당
  f; // 2. let f: any
  f.toFixed();
  f.toUpperCase();
  f = "hello"; // 3. let f: any - string 값 할당
  f; // let f: any
  f.toUpperCase();
  f.toFixed();
  ```
이러한 암묵적 any타입의 경우 중간에 실수로 타입이 잘못 진화될 수도 있고, 내가 아닌 타인이 작성한 코드일 경우 현재 변수의 타입을 알아맞춰야 하는 상황이 발생할 수도 있다.  
따라서 왠만하면 암묵적 any로 변수의 타입을 추론하도록 하는것은 추천하지 않으며, 초기값을 지정하지 않으면 변수의 타입을 위와같이 진화할 수 있다 정도만 알아두면된다.  

### 4. const 상수와 literal타입 
`const num = 10;` 코드를 작성할 경우 커서를 올려보면 let 키워드에서 number타입으로 추론되던것과는 다르게 `const num: 10`와 같이 number 리터럴 타입으로 추론된다.  
const로 선언한 num이라는 변수는 상수이기 때문에 10이라는 값을 할당한 순간 해당 값 외에 다른 값으로 초기화 할 수 없기 때문이다.  
숫자가 아닌 문자열로 선언된 상수 `const str = "hello"`를 선언하더라도 `const str: "hello"`와 같이 string 리터럴 타입으로 추론된다.  
- src/chapter5.ts
  ```ts
  const num = 10; // const num: 10
  const str = "hello" // const str: "hello"
  ```

### 5. 배열 Union 타입 
여러가지 타입 요소를 갖는 배열을 선언하게 되면 유니온 타입을 갖는 배열타입으로 추론이 된다.  
아래 코드의 경우 1이라는 값의 타입과 "string"이라는 값의 타입도 만족해야 되기 때문에 nubmer타입과 string타입 모두 해당되는 union타입으로 자동으로 추론해준다.  
이와같이 초기값을 다양한 타입들을 갖는 배열의 경우 타입스크립트가 모든 배열 요소들의 타입을 비교하여 최적의 공통 타입으로 타입추론 해준다.  
- src/chapter5.ts
  ```ts
  let arr = [1, "string"] // let arr: (string | number)[]
  ```

## 타입 추론 원리 - `타입 넓히기`
아래와 같이 변수 g를 선언한 뒤 number 타입 값을 할당하게 되면 const로 선언한 상수와는 다르게 조금 더 범용적인 타입인 number 타입으로 추론해준다.  
이후 변수 g에 999 혹은 -2 등을 할당할 수 있도록 범용적으로 number 타입의 값이라면 다 할당할 수 있도록 추론을 해준다.
const 키워드를 사용한 상수와 같이 number 리터럴 타입으로만 추론하는 것이 아닌 개발자가 해당 변수를 범용적으로 사용할 수 있도록 조금 더 넓은 타입으로 추론해 주는 타입 추론 과정을 타입 넓히기 라고 표현한다.  
- src/chapter5.ts
  ```ts
  let g = 10; 
  ```

## 결론
***결론적으로 타입스크립트는 왠만한 변수는 모두 다 타입을 자동으로 추론하고, const로 선언한 상수가 아닐 경우 범용적으로 해당 변수를 사용할 수 있도록 타입 넓히기를 통해 타입을 잘 추론해준다.***
</details>
<br>

# 타입단언
<details>
<summary>펼치기/접기</summary>
<br>

타입 단언에 대해 살펴보기 전, 타입 단언이 어떤 상황에 필요한지 살펴본다.
타입스크립트는 대부분의 상황에 변수의 타입을 자동으로 잘 추론한다.  
- src/chapter6.ts
  ```ts
  type Person = {
    name: string;
    age: number;
  }
  let person1: Person = {} // Type '{}' is missing the following properties from type 'Person': name, agets(2739)
  person1.name = "유재혁";
  person1.age = 34;
  ```
Person이라는 타입 별칭을 정의한 후 빈 person1객체를 선언한 뒤 타입 어노테이션을 Person으로 지정한다.
person1객체에는 프로퍼티가 존재하지 않으므로 오류가 발생할것이다.  

만약 빈 객체로 변수의 값을 초기화 해놓고 나중에 person1.name, person.age과 같이 동적으로 프로퍼티를 추가하고 값을 할당하고 싶다면 어떻게 해야 할까?
굳이 타입 정의를 해 놓은것이 문제가 되는거 같아 타입어노테이션을 적용하지 않은 person2 변수를 선언하여 동적 추가에 대한 동일한 코드를 새롭게 구현한다면,  
person2 변수의 타입이 초기화 값인 빈 객체를 기준값으로 추론되어버리기 때문에 person2변수의 타입이 `let person2: {}`와 같이 빈 객체가 되어버린다.
때문에 프로퍼티 동적 추가시 프로퍼티가 없다는 경고와 함께 에러가 발생한다.  
그렇다고 any타입을 쓰기에는 좋지 않은 방법이다.  
- src/chapter6.ts
  ```ts
  let person2 = {}
  person2.name = "유재혁"; // Property 'name' does not exist on type '{}'.ts(2339)
  person2.age = 34; // Property 'age' does not exist on type '{}'.ts(2339)
  ```
<br>

## 1. Type Assertion - as 키워드 활용  
이와같이 의도와 다르게 변수의 타입이 추론되어 버리기 때문에 원하는 기능을 만들기 어려울 때 초기화 값의 타입을 as 키워드를 활용하여 단언할 수 있다.
`let person3 = {} as Person;` 형태로 값 뒤에 as키워드를 사용하고 타입을 명시한다.
해당 문법을 사용할 경우 {} 값을 타입스크립트 컴파일러에게 Person타입으로 간주하라고 알려주게 된다.  
이렇게 값의 타입을 개발자가 직접 단언하는 방법을 타입스크립트에서는 타입 단언 또는 영어로 Type Assertion이라고 부른다.  
Person타입으로 단언된 초기화값을 기준으로 타입 추론이 이루어지기 때문에 person3변수에 마우스 커서를 올려보면 `let person3: Person`과 같이 Person타입으로 추론되는것을 볼 수 있으며 에러도 모두 사라졌다.
- src/chapter6.ts
  ```ts
  let person3 = {} as Person;
  person3.name = "유재혁";
  person3.age = 34;
  ```

### Type Assertion 예제
- src/chapter6.ts
  ```ts
  type Dog = {
    name: string;
    color: string;
  }

  let dog: Dog = {
    name: "돌돌이",
    color: "brown",
    breed: "진도" // [Error] 초과프로퍼티 검사 발동
  }
  ```
위와 같이 선언할 경우 초과 프로퍼티 검사가 발동한다.  
변수를 초기화할 때 초기화하는 값으로 객체 리터럴을 사용하면 초과 프로퍼티 검사가 발동하여 breed같은 Dog타입에 없는 추가적인 프로퍼티에 대해서는 허용하지 않는다.  
그러나 정말 어쩔수 없이 breed라는 추가 프로퍼티까지 같이 넣어야하는 상황이 생긴다면 아래와 같이 타입 단언을 이용할 수 있다.  
(객체 값이 Dog타입으로 단언되었기 때문에 타입어노테이션을 선언하지 않아도 자동으로 dog2변수가 Dog타입으로 추론까지 된다.)  
- src/chapter6.ts
  ```ts
  let dog2 = {
    name: "돌돌이",
    color: "brown",
    breed: "진도"
  } as Dog
  ```
<br>

## 2. 타입단언규칙
이러한 타입 단언은 아무 상황에서나 막 쓸수있는 문법은 아니다.  
타입 단언을 사용하기 위해서는 적어도 한가지 규칙을 만족해야 한다.  
타입 단언의 규칙은 `값 as 단언` 형태의 단언식에서 값의 타입을 A라고 하고 단언하는 타입을 B라고 했을 때 `A as B` A가 B의 슈퍼타입이거나 또는 반대로 A가 B의 서브타입이어야 한다.  

### 타입단언규칙 예제1)
num1 변수에 10을 저장하고 as never과 같이 never타입으로 단언할 경우 타입 단언이 잘 이루어진다.  
- src/chapter6.ts
  ```ts
  let num1 = 10 as never; // let num1: never
  ```
변수에 마우스 커서를 올려보면 `let num1: never`과 같이 never타입으로 잘 추론된다.  
이것이 가능한 이유는 10은 number타입이고, never타입은 모든 타입의 서브타입이기 때문에 A가 B의 수퍼타입인 조건을 만족하여 타입 단언이 이루어진것이다.  

### 타입단언규칙 예제2)
변수에 10을 저장하고 as unknown과 같이 unknown타입으로 단언할 경우에도 타입 단언이 잘 이루어진다.  
- src/chapter6.ts
  ```ts
  let num2 = 10 as unknown; // let num2: unknown
  ```
또한 num2 변수에 커서를 올릴 경우 `let num2: unknown`과 같이 unknown타입으로 잘 추론된다.  
unknown타입은 모든 타입의 수퍼타입인 전체집합이기 때문에 number타입인 A가 unknown타입인 B의 서브타입인 조건을 만족하여 타입 단언이 이루어진것이다. 

### 타입단언규칙 예제3) `서로소 관계`
변수에 10을 저장하고 as string과 같이 string타입으로 단언할 경우 타입 단언이 허용되지 않는다.  
- src/chapter6.ts
  ```ts
  let num3 = 10 as string; // 타입단언 실패
  ```
오류 메시지가 발생하는데, number타입을 string타입으로 변환하는 작업은 실수일 수 있다. 두 형식이 충분히 겹치지 않는다 라고 알려준다.  
number타입인 A와 string타입인 B는 서로 겹치는 값이 없으므로 교집합이 없는 타입들이다.  
즉 a가 b의 수퍼타입도, 서브타입도 아니기 때문에 이런 타입 단언은 충분히 겹치지 않는다고 하며 타입단언에 실패하는것이다.  
<br>

## 3. 다중 단언
그러나 서로소 관계의 타입에서 발생하는 타입단언 오류를 성공시킬 방법이 하나있긴 하다.  
정수 10에대한 값을 as string 하기 전 `as unknown as string;`과 같이 중간에 unknown으로 한번 바꿔주는것이다.  
- src/chapter6.ts
  ```ts
  let num4 = 10 as unknown as string;
  ```
첫번째로 10은 number타입이고, unknown 타입은 모든 타입의 전체 집합이기 때문에 A가 B의 서브타입인 규칙에 만족하기 때문에 단언이 이루어 질 수 있으며  
두번째로는 unknown타입 A는 string타입 B의 수퍼타입이기 때문에 A가 B의 수퍼타입인 규칙에 만족하므로 단언이 이루어질 수 있는것이다.  
이렇게 중간에 unknown타입을 끼고 다중으로 단언을 하면 단언이 되지 않는 타입도 단언을 해줄 수 있게 된다.  
그러나 이 방법은 절대 좋은 방법이 아니다.  
개발을 하는 도중 정말 어쩔수 없는 상황에서만 가끔 사용하고, 왠만해서는 이러한 치트키 같은 방법을 사용하지 않는것을 권장한다.  
이렇게 사용한다면 사실 타입스크립트를 쓸 이유가 없기 때문이다.  
<br>

## 4. const 단언
const단언이란 let 키워드로 변수를 선언하고 10이라는 값을 할당할 경우 해당 변수에 커서를 올려보면 number타입으로 추론된다.  
이때 as const로 단언할 경우 `let num5: 10`과 같이 리터럴타입 10으로 추론된다.  
이런 const 단언은 마치 `const num6 = 10;`처럼 const키워드로 변수를 선언하는 것과 동일한 효과를 보도록 만들어주는 단언이다.  
- src/chapter6.ts
  ```ts
  let num5 = 10 as const;
  const num6 = 10;
  ```

### const 단언 - 객체
아래와 같이 cat1 변수를 let 키워드로 선언할 경우 name 프로퍼티와 color 프로퍼티가 각각 string타입인 객체 타입으로 추론된다.  
만약 cat2 변수로 동일하게 선언한 후 as const로 타입단언을 하게될 경우 모든 프로퍼티가 `readonly` 읽기전용 프로퍼티가 된 객체로 추론된다.  
이렇게 as const로 타입단언한 객체는 프로퍼티의 값을 수정할 수 없는 객체가 된다.  
따라서 이러한 const 단언을 이용하면 프로퍼티가 굉장히 많은 객체를 초기화 할 때도 일일이 타입을 정의해서 readonly 키워드를 붙여줄 필요가 없으며,  
아무리 프로퍼티 개수가 많더라도 마지막에 as const라는 타입단언 키워드만 붙여주면 모든 프로퍼티를 readonly프로퍼티로 만들 수 있기 때문에 상황에 따라 굉장히 편리하게 사용할 수 있다.  
- src/chapter6.ts
  ```ts
  let cat1 = {
    name: "야옹이",
    color: "yellow"
  }

  let cat2 = {
    name: "야옹이",
    color: "yellow"
  } as const

  cat2.name = '' // Cannot assign to 'name' because it is a read-only property.ts(2540)
  ```
<br>

## 5. Non Null 단언 (! 연산자)
Non Null 단언이란 어떤 값이 null이거나 undefined가 아니라는 것을 타입스크립트 컴파일러에게 알려주는 역할을 한다.  
게시판 관련 예제를 만들어본다.  
커뮤니티의 게시판에는 익명이 가능하다.  
따라서 익명으로 글을 쓰면 author 프로퍼티 같은 값은 없을수도 있다고 가정하여 author프로퍼티에 ?를 붙혀 Optional(선택적) 프로퍼티로 적용한다.  
- src/chapter6.ts
  ```ts
  type Post = {
    title: string;
    author?: string; // Optional(선택적) 프로퍼티
  }

  let post: Post = {
    title: "게시글1",
    author: "유재혁"
  }
  /* 이름의 길이가 몇개인지 출력하는 기능 구현 */
  const len1: number = post.author?.length // Error 발생
  ```
number 타입의 변수 len을 선언한 뒤 .연산자로 post 객체에 author프로퍼티에 접근한 뒤 length속성을 한번 더 접근하여 len 변수에 할당해 준다.  
이때 length속성에 접근하는 순간 앞서 접근한 author프로퍼티 바로 뒤에 `post.author?.length`와 같이 물음표 키워드가 추가가 된다.  
여기서 추가된 물음표 키워드는 자바스크립트에서 제공하는 옵셔널 체이닝이라는 키워드이다.  
옵셔널 체이닝이란 author 프로퍼티의 값이 null이거나 undefined일 경우에 .표기법으로 접근하면 오류가 발생하기 때문에 ?를 붙혀주면 author라는 프로퍼티가 없으면 값 전체가 undefined가 되도록 만들어주는 연산자이다.  

다시 코드로 돌아와보며 변수 len에 오류가 발생하는것을 확인할 수 있다.  
오류가 발생한 곳에 마우스 커서를 올려보면 number |(유니온) undefined 형식은 number 타입에 할당할 수 없다고 출력된다.  
옵셔널 체이닝을 사용하고 있기 때문에 값 자체가 undefined가 될수 있다.  
number타입으로 정의한 변수에 undefined 값은 들어갈 수 없기 때문에 오류가 발생하는것이다.  
<br>

이렇게 옵셔널 체이닝을 이용하면 우리가 원하는 동작을 할 수 없고, 이 경우 non null 단언을 사용하면 되는데, 옵셔널 체이닝 문법인 ?를 ! 로바꿔주기만 하면 된다.  
- src/chapter6.ts
  ```ts
  const len2: number = post.author!.length
  ```
author 프로퍼티는 진짜 있다 라고 강조하는 효과이다.  
!연산이 non null 단원 연산자로 as 같은걸 사용하지 않고 !만 프로퍼티 뒤에 붙여주면 해당 프로퍼티의 값이 null 혹은 undefined가 아닐것이라고 타입스크립트 컴파일러가 믿도록 만든다.  
따라서 author값이 null 혹은 undefined가 아닌 무조건 string일 것이라고 믿기 때문에 string.length에 접근하여 number타입 변수에 값을 할당할 수 있게 되는것이다.  
</details>
<br>

# 타입 좁히기와 타입가드
<details>
<summary>펼치기/접기</summary>
<br>

## 타입 좁히기
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
- src/chapter7.ts
  ```ts
  function func1(value: number | string) {
    value; // 유니온타입 추론 - (parameter) value: string | number
    value.toUpperCase(); // [Error]
    value.toFixed(); // [Error]
    if (typeof value === 'number') {
      console.log(value.toFixed());
      return;
    }
    if (typeof value === 'string') {
      console.log(value.toUpperCase());
      return;
    }
  }
  ```

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
<br>

## 타입 가드
또한 typeof 연산자를 활용해서 조건문과 함께 타입을 좁힐 수 있는 이런 표현들을 타입스크립트에서는 특별히 `타입 가드`라고 부른다.  
마치 if 조건문의 typeof 표현이 number타입의 값 외에는 중괄호 내부로 들어갈 수 없도록 가드를 하고 있는 것과 비슷한 것이다.  
실제로 개발을 할때 매개변수에 여러가지 타입의 값들이 들어올 수 있고 함수 내부에서는 값의 타입에 따라서 각각 다른 동작을 시키는 범용적인 함수들을 꽤 자주 만들기 때문에 
이런 타입 좁히기와 타입 가드를 잘 알아두고 활용하면 좋다.  

또한 지금까지 살펴본 typeof 연산자 외에도 여러가지 타입 가드들이 추가로 존재한다.  

### 타입 가드 - typeof
기존 함수에 Date 객체를 유니온 타입으로 추가해본다.
Date 객체는 날짜를 저장하는 객체이며 Node.js가 기본적으로 제공하는 내장 객체들에 대해서는 타입들이 다 기본적으로 제공이 된다.  
다시 본론으로 돌아와 value의 타입이 Date 객체일 때 getTime() 메소드를 출력하는 기능을 만들어 본다.
Date 객체는 객체 이므로 조건문에서 value의 타입 비교문자열을 object로 지정한다.  

- src/chapter7.ts
  ```ts
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
  ```

### 타입 가드 - instanceof
그러나 typeof를 사용하는것은 별로 좋은 방법은 아니다.  
value타입에 하나의 union을 더 붙여서 null값도 들어올 수 있다고 가정해 보면 바로 오류가 발생한다.  
자바스크립트 연산자인 typeof 연산자는 null값에다가 typeof를 해도 'object'를 똑같이 반환한다.  
(실제로 console.log(typeof null)는 object를 출력함)
그렇기 때문에 해당 조건문을 통과하는 값이 Date객체 값 뿐만 아니라 null값도 통과할 수 있는 것이다.  
결국 중괄호 내부에서 value의 타입이 Date객체일 것이라는것을 보장할 수가 없다.  
따라서 value는 Date객체이거나 null타입일것이다 라고 `(parameter) value: Date | null` 와 같이 추론되어 버리고
getTime() 메소드를 null값에서는 사용할 수가 없기 때문에 타입 오류가 발생하는 것이다.  

- src/chapter7.ts
  ```ts
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
      console.log(value.getTime()); // [Error] 'value' is possibly 'null'.ts(18047) - (parameter) value: Date | null
      return;
    }
  }
  ```
instanceof 라는 연산자를 활용하여 타입을 좁혀본다.  
조건문에 `value instanceof Date`를 선언하니 놀랍게도 오류가 사라진다.  
instanceof 연산자는 왼쪽의 값이 오른쪽의 instance인지 묻는 연산자로 참일 경우 true를, 거짓일 경우 false를 반환한다.  
만약 객체 지향을 배워봤다면 instance가 무엇인지 알것이다.  
instanceof라는 연산자는 좌측 value값이 우측 Date객체인지 묻는것이다.  
결론적으로 null은 Date객체가 아니기 때문에 해당 조건을 통과할 수 없어 조건문 블록 안의 value에 마우스 커서를 올려보면 Date객체로 잘 추론되는것을 확인할 수 있다.  
타입이 잘 좁혀지게 되는것이다.  

- src/chapter7.ts
  ```ts
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
  ```

### 타입 가드 - in
타입스크립트 객체 별칭 Person을 선언하여 매개변수 value의 유니온 타입에 적용한 뒤, 타입 좁히기를 구현해본다.  
`value instanceof Person`을 할 경우 Person은 형식만 참조하지만 여기서는 값으로 사용되고 있다 라는 내용의 오류가 발생한다.  
instanceof 연산자는 우측 항에 type(타입 별칭)이 들어와서는 안된다.  
instanceof 연산자는 엄밀히 말하면 좌측의 값이 우측 class의 instance인지 확인하는 연산자이기 때문이다.  
Date는 자바스크립트의 내장 클래스이기 때문에 instanceof 연산자 뒤에 올 수 있다.  
쉽게 말해 instanceof연산자와 사용할 수 있는 것이다.  
그러나 Person은 클래스가 아닌 타입 별칭으로 만든 일종의 객체 타입이기 때문에 instanceof 연산자의 뒤에 활용할 수 없다.  
- src/chapter7.ts
  ```ts
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
    if (value instanceof Person) { // [Error] 'Person' only refers to a type, but is being used as a value here.ts(2693)
      console.log(`${value.name}은 ${value.age}살 입니다.`);
      return;
    }
  }
  ```
이 경우 instanceof 연산자가 아닌 in 연산자를 쓰면 된다.  
사용 문법은 다음과 같다.  
먼저 좌측항에 프로퍼티 이름을 문자열 형태로 선언한 후 우측 항에 값에 해당하는 value를 선언한다.  
바로 age 프로퍼티가 value값에 존재하는지를 묻는것이고, 만약 존재한다면 true를 존재하지 않는다면 false를 반환한다.  
그렇기 때문에 해당 조건문을 만족함녀 value 타입이 중괄호 안에서는 Person타입이라고 보장할 수 있게 된다.  
value타입으로 들어올 수 있는 게 number, string, Date, null, Person인데 이 중 age라는 프로퍼티를 가질 수 있는건 Person밖에 없기 때문이다.  

- src/chapter7.ts
  ```ts
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
    if ('age' in value) { // [Error] 'value' is possibly 'null'.ts(18047)
      console.log(`${value.name}은 ${value.age}살 입니다.`);
      return;
    }
  }
  ```
그러나 실제 코드상에서는 value는 null일 수 있습니다 라는 오류가 발생한다.  
in 연산자 뒤에는 null이나 undefined값이 들어오면 안되기 때문이다.  
이 경우 value가 null이 아님을 밝혀주기 위해 in 비교 조건 앞에 value가 있다라고 알려주고 && 연산자를 활용하여 value가 있을 때만 age가 value에 있는가에 대해 검사시켜 주면 된다.  
`value && 'age' in value`

- src/chapter7.ts
  ```ts
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
  ```

이렇게 선언하면 조건문 내부에서의 value의 타입은 Person 타입으로 잘 좁혀지게 된다.
</details>
<br>

# 서로소 유니온 타입
<details>
<summary>펼치기/접기</summary>
<br>

타입좁히기를 할 때 더 쉽고 정확하며, 직관적으로 타입을 좁힐 수 있도록 객체타입을 정의하는 방법이다.  
교집합이 없는 타입들로만 만든 유니온 타입을 말한다.  
즉, 두 타입간에 공통적으로 포함되는 값이 하나도 없는 타입을 말한다.  
예를들어 string과 number 두 타입이 있다고 가정했을 때, 두 타입은 어떠한 교집합도 존재하지 않는다.  
수학에서는 이렇게 교집합이 존재하지 않는 공통원소가 하나도 없는 두 집합을 서로소 관계에 있다고 말한다.  
서로소 관계에 있는 String과 number타입 같은걸로 만든 유니온 타입이 있다고 한다면 두 타입이 서로소 집합이기 때문에 서로소 유니온 타입이라고 부른다.  

## 예제 1)
웹 서비스의 간단한 회원 관리 기능을 만든다고 가정한다.
먼저 회원의 분류가 3가지라고 가정했을 때 회원의 타입을 각각 별칭으로 정의해 주도록 한다.

첫번째 회원은 관리자가 필요하므로 Admin
두번째 회원은 일반 회원인 Member
세번째 회원은 아직 가입하지 않은 Guest
3가지 타입을 만든다.

관리자 Admin 타입의 경우 name 프로퍼티와 현재까지 강퇴한 횟수인 kickCount 프로퍼티를 추가한다.  
일반 회원 Member 타입의 경우 관리자 Admin과 똑같이 name 프로퍼티를 추가하고, 쇼핑몰 마일리지같은 기능의 point 프로퍼티를 추가한다.  
마지막으로 Guest는 포인트가 없을 테니 name프로퍼티와 몇번째 방문인지에 대한 visitCount 프로퍼티를 추가한다.  

- src/chapter7.ts
  ```ts
  type Admin1 = {
    name: string;
    kickCount: number;
  }
  type Member1 = {
    name: string;
    point: number;
  }
  type Guest1 = {
    name: string;
    visitCount: number;
  }
  ```

다음으로는 만들어진 3가지 타입에 대한 유니온 타입을 만들어본다.  
- src/chapter7.ts
  ```ts
  type User1 = Admin1 | Member1 | Guest1
  ```

타입 정의 완료 후 User 타입 객체를 매개변수로 받는 로그인 기능 함수 login을 만든다.  
해당 함수는 매개변수로 Admin, Member, Guest 3타입 중 하나의 타입인 user 객체를 받을 수 있게 되었다.  
다음으로 User의 유형별로 로그인하면 출력되는 메시지가 다르게 구현한다.
- Admin: `${name}님 현재까지 ${kickCount}명 강퇴했습니다.`
- Member: `${name}님 현재까지 ${point} 포인트를 모았습니다.`
- Guest: `${name}님 현재 ${visitCount}번째 방문객이십니다.`
user 매개변수에 들어온 값들에 대해 in 연산자를 활용한 타입가드를 활용하여 분기하는 조건문을 만든다.
해당 코드는 오류가 발생하지 않고 정상적으로 작동하며 코드 작성자 입장에서 정상으로 보이지만, 다른 누군가가 보았을 경우에는 주석도 없기 때문에 
직관적으로 알기는 어렵다.
조건문에 작성된 kickCount, point 등이 Admin, Member, Guest처럼 명확한 타입에 대한 정보가 아니기 때문에 바로 알아보기는 어렵다.  
따라서 이러한 함수를 리뷰하기 위해서는 결국 선언된 타입을 찾아가 프로퍼티들을 확인해야한다.  
이렇게 코드가 직관적이지 않은 경우 서로소 유니온 타입을 활용하면 좋다.

- src/chapter7.ts
  ```ts
  function login1(user: User1) {
    if('kickCount' in user) { // Admin 타입
      user; // user: Admin1
      console.log(`${user.name}님 현재까지 ${user.kickCount}명 강퇴했습니다.`)
      return
    }
    if('point' in user) {
      user; // user: Member1
      console.log(`${user.name}님 현재까지 ${user.point} 포인트를 모았습니다.`)
      return
    }
    user; // user: Guest1
    console.log(`${user.name}님 현재 ${user.visitCount}번째 방문객이십니다.`)
  }
  ```

## 예제2) 서로소 유니온 타입 적용
앞서 만든 타입들과 동일하게 다시 선언하고, 기존 프로퍼티들을 유지하면서 각 타입에 tag프로퍼티를 추가한다.
해당 프로퍼티에는 각 타입에 대한 정보를 대문자로 갖는 string 리터럴 타입으로 지정한 후 각 타입을 조합한 유니온 타입을 선언한다.
- src/chapter7.ts
  ```ts
  type Admin2 = {
    tag: "ADMIN";
    name: string;
    kickCount: number;
  }
  type Member2 = {
    tag: "MEMBER";
    name: string;
    point: number;
  }
  type Guest2 = {
    tag: "GUEST";
    name: string;
    visitCount: number;
  }
  type User2 = Admin2 | Member2 | Guest2
  ```

다음으로 로그인 함수를 동일하게 구현한 뒤 조건문을 수정한다.
- src/chapter7.ts
  ```ts
  function login2(user: User2) {
    if(user.tag === "ADMIN") { // Admin 타입
      user; // user: Admin2
      console.log(`${user.name}님 현재까지 ${user.kickCount}명 강퇴했습니다.`)
      return
    }
    if(user.tag === "MEMBER") {
      user; // user: Member2
      console.log(`${user.name}님 현재까지 ${user.point} 포인트를 모았습니다.`)
      return
    }
    user; // user: Guest2
    console.log(`${user.name}님 현재 ${user.visitCount}번째 방문객이십니다.`)
  }
  ```

switch case 구문으로도 구현이 가능하다.
처음 작성한 in을 활용한 타입가드 조건식의 코드보다 훨씬 직관적이다.
- src/chapter7.ts
  ```ts
  function login3(user: User2) {
    switch (user.tag) {
      case "ADMIN": {
        user; // user: Admin2
        console.log(`${user.name}님 현재까지 ${user.kickCount}명 강퇴했습니다.`);
        break;
      }
      case "MEMBER": {
        user; // user: Member2
        console.log(`${user.name}님 현재까지 ${user.point} 포인트를 모았습니다.`)
        break;
      }
      default: {
        user; // user: Guest2
        console.log(`${user.name}님 현재 ${user.visitCount}번째 방문객이십니다.`)
      }
    }
  }
  ```

tag라는 프로퍼티가 없었을때를 기준으로 3개 타입의 집합관계를 생각해본다.  
- Admin 타입에만 포함되는 객체: {name, kickCount}
- Member 타입에만 포함되는 객체: {name, point}
- Guest 타입에만 포함되는 객체: {name, visitCount}
- Admin ∩ Member에 포함되는 객체: {name, KickCount, point}
- Admin ∩ Guest에 포함되는 객체: {name, kickCount, visitCount}
- Member ∩ Guest에 포함되는 객체: {name, point, visitCount}
- Admin ∩ Member ∩ Guest에 포함되는 객체: {name, KickCount, point, visitCount}

tag라는 프로퍼티가 추가될 경우를 기준으로 3개 타입의 집합관계에서는 서로 아무런 교집합도 없는 서로소 집합의 관계가 된다.  
태그의 타입이 각각 ADMIN, MEMBER, GUEST인 리터럴 타입으로 정의가 되었기 때문에 Admin 타입이면서 Member 타입인 Admin과 Member의 교집합에 속하는 객체가 존재할 수 없다.  
- Admin 타입에만 포함되는 객체: {tag:"ADMIN, name, kickCount}
- Member 타입에만 포함되는 객체: {tag:"MEMBER, name, point}
- Guest 타입에만 포함되는 객체: {tag:"GUEST, name, visitCount}

이때 Admin ∩ Member에 포함되는 객체를 만들려고 하면 tag프로퍼티가 ADMIN이면서 동시에 MEMBER여야 한다.  
그러나 string 리터럴 타입은 딱 한개의 값만 포함한다. (___.ts 참조)  
그렇기 때문에 ADMIN이라는 string리터럴 타입과 MEMBER라는 string리터럴 타입은없다. 고로 두 string리터럴 타입의 교집합은 공집합, never이다.  
Admin타입과 Member타입 사이의 교집합, Member와 Quest간의 교집합 모두 존재할 수 없다.  
따라서 tag라는 프로퍼티를 만들어 준 다음 해당 프로퍼티의 타입을 string 리터럴 타입으로 모두 다르게 정의해주면 객체들이 서로소 집합의 관계를 갖게 된다.  
그렇기 때문에 User 타입은 서로소 관계에 있는 객체 타입(Admin | Member | Guest)들을 유니온타입으로 묶었기 때문에 서로소 유니온 타입이 되었다.  
login3() 함수에서 user.tag가 ADMIN일 경우는 무조건 Admin 타입에만 해당될 수 밖에 없기 때문에 Admin타입으로 잘좁혀지게 되고,  
user.tag가 MEMBER일 경우에는 무조건 Member타입에만 해당될 수 밖에 없기 때문에 Member타입으로 잘 좁혀지고,
user.tag가 GUEST일 경우에도 마찬가지로 무조건 User타입에만 해당될 수 밖에 없기 때문에 Guset타입으로 잘 좁혀진다.

이렇게 객체 타입에 각각 string 리터럴 타입으로 정의된 프로퍼티들을 각각 다르게 정의해주면서 서로소 union타입으로 만들 수 있기 때문에 Switch Case 문법만으로 아주 직관적으로 타입을 좁혀 처리할 수 있도록 만들 수 있게 된다.  

## 서로소 유니온 타입(복습) 장점 사례 예제)
상황가정: 비동기 작업의 결과를 처리하는 객체 생성
비동기 작업은 API를 호출한다던지, 서버에서 데이터를 받아온다던지 하는 작업들이다.  
비동기 작업의 결과를 객체로 표현해보도록 한다.  
- src/chapter7.ts
  ```ts
  const loading1 = {
    state: "LOADING"
  };

  const failed1 = {
    state: "FAILED",
    error: {
      message: "오류 발생"
    }
  }

  const success1 = {
    state: "SUCCESS",
    response: {
      data: "데이터 ~~"
    }
  }
  ```
### 타입 정의
- state에 대한 타입을 정의해본다.  
  loading, failed, success 객체 모두 state라는 공통 필드를 가지고 있다.  
  state: string 타입으로 정의를 해도 되지만 구체적으로 타입정의를 하자면 "LOADING" 혹은 "FAILED" 혹은 "SUCCESS"이다.  
  따라서 string 타입보다는 문자열 리터럴 타입을 적용해본다.  
- error에 대한 타입을 정의해본다.  
  실패했을 경우 Error라는 프로퍼티가 있어야 한다.  
  그렇기 때문에 string타입의 message 프로퍼티를 가지고 있는 error 객체 타입을 추가한다.  
- response에 대한 타입을 정의해본다.  
   성공했으 경우 response라는 프로퍼티가 있어야 한다.  
   string타입의 data 프로퍼티를 가지고 있는 response 객체 타입을 추가한다.

여기서 state가 LOADING일 경우 error와 response가 없기 때문에 error와 response 타입을 선택적 프로퍼티인 ?기호를 적용한다.  

- src/chapter7.ts
  ```ts
  type AsyncTask1 = {
    state: "LOADING" | "FAILED" | "SUCCESS";
    error?: {
      message: string
    };
    response?: {
      data: string
    }
  }
  ```

각 객체에 AsyncTask타입을 타입어노테이션으로 정의한다.  
- src/chapter7.ts
  ```ts
  const loading2: AsyncTask1 = {
    state: "LOADING"
  };

  const failed2: AsyncTask1 = {
    state: "FAILED",
    error: {
      message: "오류 발생"
    }
  }

  const success2: AsyncTask1 = {
    state: "SUCCESS",
    response: {
      data: "데이터 ~~"
    }
  }
  ```

다음으로 비동기 작업 처리 결과를 함수의 매개변수로 받아 상태에 따라 처리하는 함수 processResult()를 구현한다.
[로딩중]일 경우 콘솔에 `${로딩중}`을  
[실패]일 경우 `${에러 발생: 에러메시지}`를  
[성공]일 경우 `${성공: 데이터}`를 출력하도록 구현한다.  
- src/chapter7.ts
  ```ts
  function processResult1(task: AsyncTask1) {
    switch (task.state) {
      case "LOADING": {
        console.log(`로딩중`)
        break;
      }
      case "FAILED": {
        console.log(`에러 발생: ${task.error?.message}`)
        break;  
      }
      default: {
        console.log(`성공: ${task.response?.data}`)
      }
    }
  }
  ```

결과적으로 문제없이 잘 돌아가는 메소드를 구현했다.  
FAILED case와 SUCCESS case에서 객체 뒤 ?기호는 옵셔널 체이닝이다.  
error나 response 프로퍼티가 undefined일 수도 있다 라는 의미의 연산자가 자동으로 들어간것이다.  
만약 해당 기호를 제거할 경우 오류가 발생한다.  
분명 case가 FAILED일 때에는 error 프로퍼티가 존재하도록 만들고 싶었는데 제대로 만들어지지 않은것 같다.  
task에 마우스 커서를 올려보면 case가 failed일 때에도 타입이 잘 좁혀지지가 않아 AsyncTask라고 되어있는것을 볼 수 있다.  

타입 정의를 다시 살펴보도록 한다.  
- src/chapter7.ts
  ```ts
  type AsyncTask = {
    state: "LOADING" | "FAILED" | "SUCCESS";
    error?: {
      message: string
    };
    response?: {
      data: string
    };
  }
  ```

함수의 매개변수 task의 타입이 AsyncTask라고 되어 있고 task의 state의 값이 만약 FAILED 라고 해도 
error 프로퍼티는 선택적(?) 프로퍼티로 정의가 되어있기 때문에 task에 에러가 있는지 없는지 확실하게 알수가 없다.  
쉽게 말해 좁혀질 타입 자체가 없다. 타입이 하나밖에 없기 때문이다.  
state가 SUCCESS일 때도 task의 response가 선택적(?) 프로퍼티 이기 때문에 이 역시 있는지 없는지 정확히 알 수 없다.  

이 경우 `옵셔널 체이닝(?)`을 사용하거나 `non-null단원(!)`을 사용해야 한다.  
그러나 이렇게 하는 것이 우리가 원하는 것도 아니고, 안전한 코드도 아니다.  
이 경우 AsyncTask를 3개의 타입으로 분리해서 서로소 유니온 타입으로 만들어 주면 된다.

### AsyncTask 서로소 유니온 타입 정의
- src/chapter7.ts
  ```ts
  type LoadingTask = {
    state: "LOADING";
  }
  type FailedTask = {
    state: "FAILED";
    error: {
      message: string
    };
  }
  type SuccessTask = {
    state: "SUCCESS";
    response: {
      data: string
    }
  }

  type AsyncTask2 = LoadingTask | FailedTask | SuccessTask

  function processResult2(task: AsyncTask2) {
    switch (task.state) {
      case "LOADING": {
        console.log(`로딩중`)
        break;
      }
      case "FAILED": {
        console.log(`에러 발생: ${task.error.message}`)
        break;  
      }
      default: {
        console.log(`성공: ${task.response.data}`)
      }
    }
  }
  ```

위와같이 서로소 유니온 타입을 만들고, 물음표 혹은 느낌표를 제거하여 함수를 재구현 했을 때, 오류가 발생하지 않으며,  
해당 프로퍼티에 마우스 커서를 올릴 경우 FAILED 일 때 FailedTask로 타입이 잘 좁혀지는 것을 확인할 수 있다.  
state가 FAILED일 떄에는 AsyncTask의 여러 개의 후보들 중 FailedTask라는 타입 외에는 절대 포함될 수 있는 다른 타입이 없다.  
LoadingTask는 state가 무조건 LOADING이어야 되고 SUCCESS는 state가 무조건 SUCCESS여야 한다.  
즉, task.state가 만약 FAILED일 떄에는 무조건  FailedTask인 것이고 그렇기 때문에 타입이 잘 좁혀진것이다.  
마찬가지로 task.state가 SUCCESS일 때에도 SuccessTask로 타입이 잘 좁혀지는 것을 확인할 수 있다.  
이렇게 동시에 여러가지 상태를 표현해야 되는 객체의 타입을 정의할 때는 선택적 프로퍼티를 사용하는 것보다는 상태에 따라 타입들을 각각 잘개 쪼개어 
state 혹은 tag같은 프로퍼티들을 추가해서 서로소 유니온 타입으로 만들어주는 방법이 훨씬 좋다.  
그래야 switch case문 같은 분기문을 이용했을 때 더 직관적이고 안전하게 타입을 좁혀 코드를 만들 수 있기 때문이다.  

이와같이 state 혹은 tag같은 리터럴 타입 프로퍼티를 추가해서 객체들을 완벽하게 구별해 줄 수 있는 기능을 `Tagged 유니온 타입` 이라고 부르기도 한다.
</details>
<br>

# 템플릿
<details>
<summary>펼치기/접기</summary>
<br>

</details>
<br>