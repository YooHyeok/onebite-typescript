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

# 템플릿
<details>
<summary>펼치기/접기</summary>
<br>

</details>
<br>