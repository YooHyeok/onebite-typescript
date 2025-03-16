/* 
## 접근제어자
타입스크립트의 클래스에서만 제공되는 기능이다.
영어로는 access modifier라고도 부르는 접근 제어자란 클래스를 만들때 특정 필드나 메소드에 접근할 수 있는 범위를 설정하는 문법이다.  
접근제어자에는 `public`, `private`, `protected` 라는 3가지가 있는데 각각 어떤 의미고 어떤 기능들을 하는지 실습 코드를 통해 알아본다.  
이전 chapter1에서 만들어두었던 Employee 클래스를 재활용해본다.
*/
class Employee {
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
const employee = new Employee('유혁스쿨', 0, 'developer')
/* 
위와 같이 클래스를 만든 후 new 인스턴스를 통해 만든 객체는 프로퍼티에 접근해서 값을 수정하는것이 가능하다.  
*/
employee.name = '유나얼';
employee.age = 46;
employee.position = '가수 겸 화가';
/* 
이것이 가능한 이유는 일단 객체이기 때문이기도 하고 클래스 멤버 각각의 필드에 접근제어자가 현재 기본적으로 기본값인 public으로 설정되어있기 때문이다.  
그래서 아무것도 쓰지 않으면 각각의 필드에 아래와 같이 public이라는 접근 제어자가 붙어있다고 이해하면 된다.   
*/
class EmployeeA {
  /* 필드 정의 */
  public name: string;
  public age: number;
  public position: string;
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
public이란 공공의 라는 뜻으로 즉, 모두 오픈되어있다는 뜻이다.  
그래서 필드에 public 이라고 명시적으로 설정하거나 아니면 기본값으로 아에 접근제어자를 생략한다면 new 인스턴스로 생성한 객체에서 자유롭게 프로퍼티에 접근할 수 있게 되는 것이다.  
즉, public은 아무 제약없는 상태이다 라고 이해하면 된다.  
*/

/* 
### private 접근제어자
개인정보 같은걸 프라이버시 라고도 하듯 private은 사적인 이라는 뜻이다.  
만약 name 프로퍼티에 private 접근제어자를 설정할 경우 `name 속성은 private이며 EmployeeB 클래스 내에서만 액세스할 수 있습니다다.` 라고 에러를 출력한다.  
*/
class EmployeeB {
  /* 필드 정의 */
  private name: string;
  public age: number;
  public position: string;
  constructor (name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position
  }
  work() {
    console.log("일함")
  }
}
const employeeB = new EmployeeB('유혁스쿨', 0, 'developer')
employeeB.name = '유나얼'; // Property 'name' is private and only accessible within class 'EmployeeB'.ts(2341)
employeeB.age = 46;
employeeB.position = '가수 겸 화가';

/* 
이렇게 필드 접근제어자로 private를 설정해주면 Employee라는 클래스 외부에서는 위와같이 점 표기법으로 프로퍼티에 접근하는것이 모두 제한된다.  
심지어 읽을수 조차 없으므로 읽을 수는 있었던 read-only랑은 조금 다른것이다.  
만약 private 접근제한이 붙은 name 프로퍼티에 접근하고 싶다면 따로 메소드를 선언하여 this키워드로 접근할 수 있도록 한다.  
*/
class EmployeeC {
  /* 필드 정의 */
  private name: string;
  public age: number;
  public position: string;
  constructor (name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position
  }
  getName() {
    return this.name;
  }
}
/* 
즉, private는 this키워드를 통해 내부에서만 접근 가능하므로 만약 클래스에 외부에서 접근을 못하게 막고 메소드로만 해당 값을 사용할 경우에 사용한다.  
또 클래스 내부에서만 접근할 수 있기 때문에 해당 클래스를 상속받은 파생 클래스에서도 접근할 수 없게 된다.  
chapter1.ts의 ExecuteOfficer 클래스를 구현해본다.  
*/

class ExecutiveOfficer extends EmployeeC {
  officeNumber: number;
  constructor(name: string, age: number, position: string, officeNumber: number) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }
  getName() {
    return this.name; // Property 'name' is private and only accessible within class 'EmployeeC'.ts(2341)
  }
}
/* 
### protected 접근제어자
외부에서는 접근이 안되게 막고싶지만 파생클래스 내부에서는 접근이 되었으면 좋겠다고 하면 3번째 접근제어자인 protected라는걸 쓰면 된다.
name 프로퍼티에 protected를 설정해주게 되면 아래와 같이 해당 클래스를 상속받은 ExecutiveOfficerA 라는 파생 클래스에서 접근이 허용이 된다.  
*/

class EmployeeD {
  /* 필드 정의 */
  protected name: string;
  public age: number;
  public position: string;
  constructor (name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position
  }
  getName() {
    return this.name;
  }
}
class ExecutiveOfficerA extends EmployeeD {
  officeNumber: number;
  constructor(name: string, age: number, position: string, officeNumber: number) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }
  getName() {
    return this.name; // 부모 클래스 `name` protected 필드 접근 가능.
  }
}

/* 
앞서 사용해본 `public`, `private`, `protected` 3가지 접근제어자를 정리해본다.  

#### public
public은 아무것도 제한하지 않는 가장 기본적인 접근제어자이므로 생략할 경우 public 접근제어자가 적용된다.  
따라서 외부에서도 접근할 수 있다.  

#### private
public과 반대로 가장 private 하고 가장 제한적인 접근제한자로 해당 필드의 소속 클래스 내부가 아니면 어디서든지 접근이 불가능해진다.  
상속받은 파생 클래스에서조차 접근할 수가 없다.

#### protecte
외부에서는 아에 접근할 수 없게 막지만, 파생클래스 내부에서는 접근을 허용할 수 있도록 해주는 public과 private의 중간쯤에 있는 접근제어자라고 이해하면 된다.  
*/

/* 
### 생성자 매개변수에 지정
접근제어자는 생성자의 매개변수에도 지정할 수 있다.  
그러나 실제로 지정할 경우 각각의 식별자가 중복이 된다는 오류를 발생시킨다.  
*/
class EmployeeE {
  /* 필드 정의 */
  protected name: string;
  private age: number;
  public position: string;
  constructor (protected name: string, private age: number, public position: string) { // Duplicate identifier 'name'.ts(2300)
    this.name = name;
    this.age = age;
    this.position = position
  }
  getName() {
    return this.name;
  }
}

/*
생성자 매개변수들에 접근제어자를 달게되면 내부적으로 자동으로 필드를 만들어주기 때문이다.  
따라서 생성자 매개변수들에 접근제어자를 달게 되면 필드를 생략하는것도 가능해진다.  
*/
class EmployeeF {

  /* 필드와 생성자 함께 정의 */
  constructor (protected name: string, private age: number, public position: string) {
    this.name = name;
    this.age = age;
    this.position = position
  }
  getName() {
    return this.name;
  }
}
/* 
위와같이 생성자의 매개변수에 접근지정자를 지정함으로써 필드를 생략할 경우, 필드만이 생략되는것이 아니라 자동으로 초기화작업까지 진행된다.  
따라서 `this.name = name`과 같은 작업을 생성자 블록 내에서 하지 않고 생략해도 값이 자동으로 할당되어 초기화가 된다.  
*/
class EmployeeG {

  /* 필드와 생성자 함께 정의 및 초기화까지 */
  constructor (protected name: string, private age: number, public position: string) {}

  getName() {
    return this.name;
  }
}
/* 
실제로 tsx명령을 통해 실행해보면 인수를 전달한대로EmployeeG { name: '유혁스쿨', age: 0, position: 'developer' }를 출력한 뒤  
프로퍼티에 접근해서 position을 singer로 변경한부분에 대해 EmployeeG { name: '유혁스쿨', age: 0, position: 'singer' }` 와 같이 정상적으로 출력해주는 것을 확인할 수 있다.  
*/
const employeeG = new EmployeeG('유혁스쿨', 0, 'developer')
console.log(employeeG) // tsx src/chapter2.ts - EmployeeG { name: '유혁스쿨', age: 0, position: 'singer' } 출력
employeeG.position = 'singer'
console.log(employeeG) // tsx src/chapter2.ts - EmployeeG { name: '유혁스쿨', age: 0, position: 'singer' } 출력


/* 
접근제어자는 객체지향 프로그래밍을 할 때 대단히 중요한 역할을 하는 문법이다.  
실제로 Java나 C#을 이용해서 객체지향 프로그래밍을 경험해본 사람들이라면 알겠지만, 객체지향에서 은닉이라는 개념 즉, 클래스 인스턴스 객체의 프로퍼티를 이렇게 외부에서 수정할 수 없도록 막는것이 일반적이다.  
함부로 잘못 수정했다가 다른 메소드딜이나 클래스까지 여파가 미칠 수 있기 때문에 극도로 제한해서 오류가 발생하지 않도록 막아주는것이다.  
*/