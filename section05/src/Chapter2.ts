/* 
## 인터페이스 합치기 - 선언합침
*/

/* 
타입 별칭의 경우 동일한 타입을 두번 정의 하려고 하면 오류가 발생한다.
*/
type PersonType = {
  name: string;
}
type PersonType = {
  age: number;
}

/* 
### 인터페이스 선언 합침
인터페이스의 경우 동일한 타입을 두번 정의하더라도 오류가 발생하지 않는다.  
동일한 이름으로 두개의 인터페이스로 선언해도 문제가 되지 않는 이유는 해당 인터페이스끼리 결국 다 합쳐지기 때문이다.  
이러한 현상을 선언합침 이라고 부른다.  
*/

interface IPerson {
  name: string;
}
interface IPerson {
  age: number;
}

/* 
이렇게 두번 선언한 인터페이스를 변수 선언으로 타입 어노테이션에 지정 할 경우 각각의 인터페이스들에 정의된 프로퍼티들이 합쳐진 객체타입으로 정의가 가능해진다.  
즉, 인터페이스는 동일한 이름으로 중복 선언이 가능하고, 그렇게 중복선언을 하면 모든 선언이 합쳐지게 된다.  
이런 특징을 선언 합침, 선언 merging, declaration merging 이라고 부른다.  
*/
const person: IPerson = {
  name: "",
  age: 0
}

/* 
### 선언 합침 충돌
만약 IPerson 인터페이스에 name프로퍼티를 number타입으로 재정의 한다면 오류가 발생한다.  
이렇게 동일한 프로퍼티를 중복 정의하는데 타입을 다르게 정의하는 경우를 충돌 이라고 표현한다.  
인터페이스의 선언 합침에서 이런 충돌은 허용되지 않는다.  
*/
interface IPerson {
  name: number; // [Error] Subsequent property declarations must have the same type.  Property 'name' must be of type 'string', but here has type 'number'.ts(2717)
  age: number;
}

/* 
만약 똑같은 프로퍼티를 중복정의 해주려면 타입도 똑같이 정의를 해줘야한다.
*/
interface IPerson {
  name: string; // 정상
  age: number;
}

/* 
### 서브타입으로 확장
name프로퍼티를 다시 정의할때 꼭 타입이 똑같지 않아도 되었다.  
수퍼 타입 프로퍼티의 원본 타입의 서브타입이기만 하면 허용이 된다.  
이런 확장의 상황과 선언합침의 상황은 다르다.  
확장이 아닌 선언 합침의 경우 서브타입으로 선언해도 문제가 발생한다.  
따라서 반드시 동일한 타입으로만 정의를 해줘야한다.  
*/
interface Developler extends IPerson {
  name: "hello"
}

interface IPerson {
  name: "hello"; // 선언 합침에서 서브타입 불가능.
  age: number;
}

/* 
### 사용 예 - 모듈 보강
보통 선언합침은 간단한 프로그래밍을 할 때에는 잘 사용되지 않으며 보통 타입스크립트의 모듈, 라이브러리의 타입 정의가 조금 부실한 경우 직접 타입을 좀 더 추가해주고 정확하게 만들어주는 일종의 모듈 보강이라는 작업을 할 때 사용한다.  

에를 들어 lib이라는 객체를 제공해주는 아주 간단한 라이브러리가 있다고 가정한다. 
*/
interface Lib {
  a: number;
  b: number;
}
const lib1: Lib = {
  a: 1,
  b: 1
}

/* 
이때 만약 lib이라는 객체를 잘 쓰다가 c라는 프로퍼티를 하나 더 추가해줘야하는 상황이 있다고 가정한다.
그러나 보통의 라이브러리는 Lib 인터페이스와 같이 타입 정의가 끝나있을 것이기 때문에 임의대로 객체를 추가할 수 없다.
이럴 때 인터페이스의 선언 합침을 사용할 수 있다.
*/

const lib2: Lib = {
  a: 1,
  b: 1,
  c: "Hello" // [Error] Object literal may only specify known properties, and 'c' does not exist in type 'Lib'.ts(2353)
}

/* 
#### 모듈 보강을 위한 Lib 인터페이스 선언 합침
인터페이스 Lib을 다시 정의한 다음 string 타입의 프로퍼티 c를 추가해준다.  
*/
interface Lib {
  c: string;
}

const lib3: Lib = {
  a: 1,
  b: 1,
  c: "Hello"
}

