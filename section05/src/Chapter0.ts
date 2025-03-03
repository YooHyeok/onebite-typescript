/* 
## 인터페이스

인터페이스를 이용하여 간단한 객체 타입을 정의해본다.  
타입 별칭과는 다르게 등호 없이 바로 중괄호를 열어준다.  
마치 Enum을 정의할때와 비슷하다.  
중괄호 내부에 객체 프로퍼티 타입을 정의해준다.
*/

interface PersonA {
  name: string;
  age: number;
}

/* 
name과 age 프로퍼티를 갖는 Person이라는 객체 타입을 정의하였고, 해당 타입을 갖는 변수도 정의해본다.
*/
const personA: PersonA = {
  name: '유혁스쿨',
  age: 27
}

/* 
위와같이 인터페이스로 만든 타입도 타입 별칭으로 만든 타입들과 동일하게 타입주석을 이용해 변수에 타입을 정의할 때 사용할 수 있다.  
인터페이스는 타입을 정의하는 이런 문법들만 조금 다른 뿐 타입 별칭과 기본적인 기능은 같다.  

인터페이스도 타입 별칭과 같이 age 프로퍼티에 물음표를 붙혀 선택적 프로퍼티로 설정해 줄 수 있다.  
이렇게 되면 age는 없어도 되는 프로퍼티가 된다.

*/
interface PersonB {
  name: string;
  age?: number;
}

const personb: PersonB = {
  name: '유혁스쿨',
}
/* 
추가적으로 name 프로퍼티 앞에 readonly 키워드를 붙혀 name 프로퍼티를 읽기 전용 프로퍼티로 만들어줄 수도 있다.
*/
interface PersonC {
  readonly name: string;
  age?: number;
}

const personC: PersonC = {
  name: '유혁스쿨',
}

personC.name = '코더홀릭' // [Error] Cannot assign to 'name' because it is a read-only property.ts(2540)

/* 
sayHi()라는 추가적인 메소드 프로퍼티가 있다고 가정했을 때, 
method 역시 인터페이스에서 타입별칭과 똑같이 타입 정의가 가능하다.
*/

interface PersonD {
  readonly name: string;
  age?: number;
  sayHi: () => void
}

const personD: PersonD = {
  name: '유혁스쿨',
  sayHi: function () {
    console.log("Hi")
  }
}

/*
### 메소드 호출 시그니처
아래와 같이 함수 표현식이 아닌 메소드 호출시그니처를 이용할 수도 있다.
(기본적인 호출 시그니처와 다르게 메소드의 이름이 소괄호 앞에 붙는다는 점)
 */
interface PersonE {
  sayHi(): void
}

/* 
### 부록 - 함수타입 정의
아래와 같이 객체 타입 타입 별칭으로 블록 내부에 함수 호출 시그니처를 써주면 실제로 함수 타입을 정의하는 문법이다.  
따라서 sayHello와 같은 프로퍼티의 타입을 정의할 때는 앞에 이름을 꼭 붙혀줘야한다.  
*/
type Func = {
  (): void;
};
const func: Func = () => {};

/* 
### 메소드 오버로딩
함수타입 표현식을 이용하면 안되고, 호출 시그니처를 이용해야한다.  
호출 시그니처를 이용할 경우, 똑같은 메소드 타입을 두번 정의하여 오버로드 시그니처 두개를 정의할 수 있는 반면,  
함수 타입 표현식으로 작성하게 되면 Duplicate identifier 'sayHi'.ts(2300) 라는 중복 오류메시지가 출력되면서 오버로드 시그니처를 알아듣지 못한다.  
*/
interface PersonF { // 함수타입 표현식
  sayHi: () => void; // Duplicate identifier 'sayHi'.ts(2300)
  sayHi: (a:number, b:number) => void // 추가시 에러 발생 Duplicate identifier 'sayHi'.ts(2300)
}

const personF: PersonF = {
  sayHi: function () {
    console.log("Hi")
  }
}

personF.sayHi();
personF.sayHi(1, 2);

interface PersonG {
  sayHi(): void;
  sayHi(a:number, b:number): void
}

const personG: PersonG = {
  sayHi: function () {
    console.log("Hi")
  }
}

personG.sayHi();
personG.sayHi(1, 2);

/* 
### 타입 별칭과 인터페이스의 차이
인터페이스는 객체 타입을 정의하는 데에 특화되어 있기 때문에 타입별칭과는 몇가지 차이점이 존재한다.  
예를들어 타입 별칭에서는 `number | string` 과 같은 유니온타입을 만들 수 있었고, `number & string`과 같은 인터섹션 타입도 만들 수 있었다.  
그러나 인터페이스에서는 유니온이나 인터섹션 타입은 만들 수 없다.  
따라서 인터페이스로 만든 person 같은 객체의 타입을 만약 인터섹션이나 유니온을 이용해야 한다면 타입 별칭에 활용하는 방법을 사용하거나, 타입 주석에 활용을 해야한다.

*/
type TypeA = number | string;
type TypeB = number & string;
interface PersonH {} | number
interface PersonI {} & number

/* 
### 인터페이스에서 타입 주석을 통한 유니온, 인터섹션 타입
*/
interface PersonK {}
const personK: PersonK | number = {}
const personL: PersonK & PersonG = {
  sayHi: function () { // personG의 타입 구현
    console.log("Hi")
  }
}

/* 
인터페이스 명 Prefix I 관례
변수나 타입의 이름을 정하는 방식은 사람마다 다 다르고 각자가 속한 회사, 팀마다 다르긴 하지만, I를 붙히는 관습을 사용하는 경우가 꽤 있다.  
그러나 Prefix로 I를 붙히는 관례는 논란이 조금 있다.  
대문자 I를 붙히는 표기법을 헝가리안 표기법이라고 하는데, 자바스크립트 프로그래밍중에는 잘 사용하지 않는다.  
보통 자바스크립트에서는 snake표기법 혹은 camel 표기법 혹은 첫글자와 중간글자 첫글자를 대문자로 표기하는 Pascal 표기법을 사용한다.  
그러나 인터페이스 하나만을 위해 또 헝가리안 표기법을 사용해야하는가 라는 부정적인 의견들도 꽤 있다.  
 
*/
