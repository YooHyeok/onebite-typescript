/*
## 타입스크립트의 클래스
*/

/* 
### 직장인 클래스 생성
*/

/* 
클래스를 만들기 앞서 이름, 나이, 직무, 하는일을 갖는 직장인을 표현하는 객체를 만들어본다.
*/
const employee = {
  name: '유혁스쿨',
  age: 27,
  position: 'developer',
  work() {
    console.log("일함")
  }
}

/* 
다음으로 객체와 동일한 구성을 갖는 클래스를 선언해본다.
이때, 일반적인 js 방식의 클래스에서 필드를 정의하는것과 동일하게 정의할 경우 `각각의 멤버들에 암시적으로 any타입이 포함된다`  
라는 내용의 오류가 발생한다.
*/
class EmployeeA {
  /* 필드 정의 */
  name; // Member 'name' implicitly has an 'any' type.ts(7008)
  age; // Member 'age' implicitly has an 'any' type.ts(7008)
  position; // Member 'position' implicitly has an 'any' type.ts(7008)
}

/* 
해당 오류는 함수를 정의하고 매개변수를 전달할 때, 매개변수의 타입을 정의하지 않을 경우에도 똑같은 오류가 발생한다.  
함수의 매개변수나 클래스의 필드처럼 변수의 타입을 추론할 정보가 아무것도 없는 상황에 발생한다.  
a매개변수나 클래스의 필드처럼 이렇게 추론할 수 있는 정보가 없을 때에는 암시적으로 any타입이 할당된다.  
any 타입은 치트키 타입이고, 안전하지 않기 때문에 오류가 발생하는것이다.  
*/
function func(a) {

}


/* 
### noImplicitAny
참고로 이때, any타입이 할당되어도 좋아. 추론 못하겠으면 그냥 any타입으로 해줘 라고 하고싶다면 tsconfig파일에서 옵션을 하나 추가해주면 된다.  
compilerOptions 옵션에서 noImlicitAny 옵션을 false값으로 꺼주면 된다.  
noImlicitAny옵션은 암시적 any를 허용하지 않을것이냐 라는 옵션이다.  
false를 주게되면 암시적 any를 허용하곘다는 의미이다.  
실제로 tsconfig.json 설정을 하게되면 발생하던 오류가 사라지게 된다.  
```
{
  "compilerOptions" : {
    "noImplicitAny" : false
  }
}
```
*/

/* 
그러나 왠만하면 noImplicitAny 옵션까지 쓰면서 굳이 안전하지 않게 any를 사용하는것 보다는 처음부터 타입스크립트 코드를 쓰는 상황이면 왠만하면 안전하게 쓰는게 좋다.  
noImlicitAny옵션의 기본값은 true이므로 옵션 설정을 하지 않을 경우 암시적으로 any타입에 할당되는 위험한 코드들이 방지되기 때문에 왠만하면 건드리지 않는것이 좋다.  
*/

/* 
옵션을 끄고 다시 클래스로 돌아가서 타입을 정의해보도록 한다.
그러나 타입을 정의해주더라도 오류가 발생한다.  
`이니셜라이저가 없고 생성자에 할당되어 있지 않다`는 오류가 발생한다.
이니셜라이저는 기본값, 초기값을 의미한다.  
즉, 초기값도 없고 생성자에 할당도 되지 않는데 왜 선언했냐 어차피 undefined로 할당될건데 라는 의미로 발생되는 오류이다.  
해당 오류를 제거하기 위해서는 첫번째 가장 쉬운 방법으로는 그냥 없어도 되는 값인 선택적 프로퍼티 선택적 필드로 만들어주면 되지만 좋은 해결 방식은 아니다.  
두번째 방법으로는 기본값을 할당하는것이다.
*/

class EmployeeB {
  /* 필드 정의 */
  name: string; // Property 'name' has no initializer and is not definitely assigned in the constructor.ts(2564)
  age: number; // Property 'age' has no initializer and is not definitely assigned in the constructor.ts(2564)
  position: string; // Property 'position' has no initializer and is not definitely assigned in the constructor.ts(2564)
}

/*
### 방법 1. 선택적 프로퍼티
*/
class EmployeeC {
  /* 필드 정의 */
  name?: string;
  age?: number;
  position?: string;
}

/*
### 방법 2. 기본값 할당
*/
class EmployeeD {
  /* 필드 정의 */
  name: string = "";
  age: number = 0;
  position: string = "";
}

/*
만약 초기값으로 넣을 값이 마땅히 없을 경우에는 생성자를 만들고 생성자 매개변수로 초기화 해 주면 된다.  
아래와 같이 생성자를 통해 멤버의 모든 필드들을 초기화 할 경우
*/
class EmployeeE {
  /* 필드 정의 */
  name: string;
  age: number;
  position: string;
  constructor (name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position
  }
}

/* 
생성자를 통해 초기값을 할당할 경우 매개변수에 타입을 지정해주게 되면 필드레벨 에서는 타입을 지정하지 않아도 타입스크립트 컴파일러가 자동으로 타입 추론을 해준다.
따라서 생략이 가능해진다.  
*/
class EmployeeF {
  /* 필드 정의 */
  name;
  age;
  position;
  constructor (name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }
}

/* 
### 메소드 정의
메소드 정의는 객체를 선언하는 방식 혹은 자바스크립트 클래스 문법과 동일하다.
*/
class EmployeeG {
  /* 필드 정의 */
  name: string;
  age: number;
  position: string;
  constructor (name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position
  }
  work() {
    console.log("일함")
  }
}

/* 
### 인스턴스 생성
아래와 같이 인스턴스를 생성하며 멤버들을 초기화 한 뒤, tsx src/chapter1.ts 명령을 실행하면  
EmployeeG { name: '유혁스쿨', age: 34, position: 'developer' }와 같이  
EmployeeG 클래스의 인스턴스이고, name, age, position 프로퍼티가 있는 객체라는것을 잘 출력해준다.  
*/
const employeeA = new EmployeeG('유혁스쿨', 34, 'developer');
console.log(employeeA) // tsx src/chapter1.ts - EmployeeG { name: '유혁스쿨', age: 34, position: 'developer' }

/* 
타입스크립트에서의 이런 EmployeeG와 같은 클래스는 자바스크립트 클래스로 취급이 되면서 동시에 타입으로도 취급이 된다.  
즉, 클래스 자체가 하나의 타입으로도 작용할 수 있다는 것이다.  
앞서 만든 변수에 커서를 올려보면 const employeeA: EmployeeG 와 같이 타입이 EmployeeG 타입으로 추론되는것을 확인할 수 있다.  
이렇게 타입 스크립트의 클래스는 실제 타입으로도 활용이 되며, 그렇기 때문에 employeeB라는 변수를 만들고 해당 변수의 타입을 EmployeeG라는 클래스로 정의해주면  
이제 employeeB에는 EmployeeG에서 정의한 필드들과 메소드를 모두 가지고 있어야 하는 객체 타입으로 정의가 된다.  
*/
const employeeB: EmployeeG = {
  name: "",
  age: 0,
  position: "",
  work() {}
}
/* 
이렇게 타입스크립트의 클래스는 타입으로도 활용할 수 있다 라고 알아두면 된다.  
클래스가 타입으로 활용될 수 있는 이유는 타입스크립트는 구조적으로 타입을 결정하는 구조적 타입 시스템을 따르기 때문이다.  
클래스의 구조만으로 멤버와 메소드가 동일하게 구성된다면 EmployeeG 타입으로 결정하는 것이다.
*/

/* 
### 클래스 상속
Employee 클래스를 확장한 더 세분화 된 ExecutiveOfficer 클래스를 만들어 본다.
ExecutiveOfficer를 선언하고, 회사로부터 고용된 사람인건 똑같기 때문에 extends 키워드를 사용하여 EmployeeG 클래스를 상속받도록 한다.
ExecutiveOfficer 클래스는 EmployeeG 클래스를 상속받음으로써 EmployeeG클래스의 모든 필드와 메소드를 기본적으로 다 가지고 있게 된다.  
ExecutiveOfficer 클래스만을 위한 필드를 추가한다.  
대기업 임원은 개인 방이 하나씩 있다고 가정하여 사무실 번호를 의미하는 officeNumber라는 필드를 추가해 준 뒤, 초기화 할 생성자를 함께 선언한다.  
해당 생성자에서는 부모클래스의 필드를 초기화 해 줄 생성자도 호출해야 하기 때문에 부모 클래스를 위한 매개변수 name, age, position까지 받아준 뒤 officeNumber까지 추가로 받아준다.  
이후 super를 호출하면서 부모 클래스의 필드들을 모두 전달하여 초기화 해 준 뒤 자식 클래스의 필드 officeNumber를 초기화 해줌으로써 상속받는 클래스까지 만들어 줄 수 있다.  

*/
class ExecutiveOfficer extends EmployeeG {
  officeNumber: number;
  constructor(name: string, age: number, position: string, officeNumber: number) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }
}

/* 
타입스크립트의 클래스에서는 위와같이 상속받는 클래스, 파생클래스를 만들 수 있는데, 이때 참고로 super를 생략하게 되면 오류가 발생한다.  
자바스크립트에서는 super를 호출하지 않아도 큰 문제가 되진 않는다.  
그러나 타입스크립트에서는 그럼 뭐하러 상속했냐 라는 의미로 오류를 발생시킨다.  
파생 클래스의 생성자는 슈퍼 호출을 포함해야된다 라는 내용으로 출력되어서 슈퍼 클래스의 생성자까지 반드시 호출하도록 강제해준다.  
또한 생성자에서 position같은 인수를 빼먹을 경우 슈퍼 클래스의 생성자 매개변수와 비교해서 인수가 잘못되었다라고 또 타입 오류에 대해 알려준다.  

이렇게 타입스크립트에서 클래스를 사용할 경우 자바스크립트의 클래스를 사용할 때 보다 비교적 안전하게 사용할 수 있다.
*/

