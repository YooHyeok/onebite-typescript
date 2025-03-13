/* 
## 클래스
자바스크립트로 개발하다보면 객체를 이용해서 실세계에 존재하는 어떤 사물이나 사람을 표현하는 경우가 꽤 많다.  
예를들어 학생들을 관리하는 프로그램을 만들어야 된다면, 일단 학생을 표현하는 객체를 만들어야 한다.  
*/

/* 
### 예제) 학생 관리 프로그램
studentA 객체를 선언하고, name, grade, age 프로퍼티로 구성한 뒤 메소드를 추가해본다.  
공부 기능을 하는 메소드 study와 자기소개 기능을 하는 introduce 메소드를 각각 정의한다.  
*/
let studentA = {
  name: '유혁',
  grade: 'A+',
  age: 34,
  study() {
    console.log("열심히 공부함.")
  },
  introduce() {
    console.log("안녕하세요!")
  }
}
/* 
만약 학생 한명이 더 필요하다면 studentA 객체를 복사하여 객체 이름을 studentB로 변경하고 name과 grade등의 속성의 값을 변경한다.  
이때 이 studentA와 studentB는 둘 다 똑같이 어떤 학생 한명을 표현하는 객체들이다.  
그래서 두 객체는 name과 grade, age 등의 프로퍼티와 메소드 구성이 같고, 값만 다르다.  
두 객체의 형식이 같은것이다.  
*/
let studentB = {
  name: '혁유',
  grade: 'F',
  age: 31,
  study() {
    console.log("열심히 공부함.")
  },
  introduce() {
    console.log("안녕하세요!")
  }
}

/* 
이렇게 동일한 형식, 동일한 모양의 객체를 여러개 만들어야 한다면, 어쩔 수 없이 위와같이 중복코드가 발생하게 된다.  
현재 코드상에서는 2명밖에 없어서 괜찮긴 하지만, 해당 프로그램을 실제 학교에서 사용하려면 수십명, 많게는 수백명까지 학생 객체를 만들어야 한다.  
따라서 위와같이 구현하게되면 굉장히 불편해진다.  
이럴때 바로 자바스크립트의 클래스를 활용하면 좋다.  
클래스는 이렇게 똑같이 생긴, 똑같은 모양의 객체를 마치 공장에서 찍어내듯이 단 한줄로 간단하게 만들 수 있도록 도와주는 좋은 문법이다.  
쉽게 말하면 객체를 만들어내는 틀 이라는 것이다.  
비유하자면 객체가 붕어빵이라면, 클래스는 붕어빵 기계정도로 비유해 볼 수 있을것 같다.  
*/

/* 
#### 클래스 활용1)
클래스의 이름을 정할 때 앞글자는 대문자로 하는 파스칼 표기법을 사용한다.  
클래스를 선언했다면 클래스 내부에 필드를 구성한다.  
필드란 해당 클래스가 만들어 낼 객체 프로퍼티를 의미하는 것이다.  
클래스는 객체를 찍어내는 붕어빵 기계라고 했다. 그래서 어떤 모양의 객체를 찍어낼지 필드에 정의해주면 되는것이다.  
studnetA와 studentB 객체에 정의된 name과 grade, age프로퍼티를 클래스에서 필드로 설정한다.  
이렇게 필드로 설정하면 Student 클래스가 만들어내는 객체는 이제 다 name과 grade, age라는 프로퍼티를 갖게 되는 것이다.

필드를 선언했다면, 다음으로 할 일은 생성자를 만들어 줘야 한다.  
생성자란, 해당 클래스를 호출하면, 그러니까 Student 클래스를 이용해서 새로운 객체를 만들도록 호출하면 실제로 객체를 생성하는 역할을 하는 메소드이다.  
메소드 형태를 가지며 `constructor() {}` 와 같은 문법으로 정의한다.  
생성자가 실제로 객체를 만들기 위해서는 매개변수를 통해 이 필드에 해당하는 지금 만들 객체의 name과 grade, age 필드들 어떻게 초기화 할 것인지 정의해야한다.

`this.필드명 = 매개변수` 형태로 생성자 블록 내에 선언해주는데 이때 this는 해당 클래스가 현재 만들고 있는 객체이다.  
즉, 만약 `this.name = name`이라면 지금 생성하고 있는 객체의 name 프로퍼티 값을 매개변수 name에 저장된 값으로 할당해주는것이다.  
*/
class Studnet {

  /* 1. 필드 정의 */
  #name; // js에서 private 접근제한
  grade;
  age;

  /* 2. 생성자 정의 */
  constructor(name, grade, age) {
    this.#name = name;
    this.grade = grade;
    this.age = age;
  }
}


/* 
생성자까지 정의를 한다면, 실제로 Student 클래스가 학생 객체를 마치 공장처럼 찍어낼 수 있는 상태가 된것이다.  
실제 클래스를 활용하여 객체를 만들어본다.  
아래와 같이 new 키워드를 통해 클래스명()으로 생성자를 호출한다.  
이때 매개변수로 생성자에 적혀있는 매개변수 순서와 맞춰 초기화 할 값을 세팅한다.
*/
let studnetC = new Studnet('유혁', 'S+', 33)
console.log(studnetC) // Student {name: '유혁', 'S+', 33}
/* 
클래스를 호출해서 객체를 생성할 때에는 new라는 키워드를 붙혀준다.  
여기서 new라는 의미는 새로운 객체를 만들라는 의미로 해석할 수 있다.  
그리고 new 뒤에 클래스 이름을 명시하고 마치 함수를 호출하듯 소괄호를 열어 인수를 전달하게 되면 실제로는 클래스에 있는 생성자constructor를 호출하게 되는것이다.  
new 뒤에 클래스이름을 적고 소괄호를 열면 생성자가 호출된다고 이해하면된다.  
그리고 인수로 전달된 값들은 생성자의 매개변수로 전달된 뒤, 필드에 초기화 할당됨으로써 객체의 각 프로퍼티에 설정되는것이다.  
터미널에서 `node src/Chapter0.js` 를 실행하면 Student {name: '유혁', 'S+', 33}를 출력하게된다.  
참고로 클래스를 이용해서 만든 객체는 인스턴스 라고 부른다.
Studnet 클래스를 이용해서 만들었기 때문에 Studnet 인스턴스 라고 부를 수 있다.  
*/

/* 
##### Studnet 클래스 메소드 정의
객체에 메소드를 정의하는것과 동일하게 정의하면 된다.  
이렇게 만들어주면 Studnet 클래스로 만들어지지는 객체 인스턴스들은 다 study와 introduce 같은 메소드를 갖게 된다.  
그렇기 때문에 studentD도 study라는 메소드와 introduce 라는 메소드를 호출할 수 있게 된다.  
*/

class Studnet {

  /* 1. 필드 정의 */
  name;
  grade;
  age;

  /* 2. 생성자 정의 */
  constructor(name, grade, age) {
    this.name = name;
    this.grade = grade;
    this.age = age;
  }

  /* 3. 메소드 정의 */
  study() {
    console.log("열심히 공부함.")
  }

  introduce() {
    console.log("안녕하세요!")
  }

}

let studnetD = new Studnet('유혁', 'S+', 33)

/* node src/chapter0.js */
console.log(studnetD) // Student {name: '유혁', 'S+', 33} 출력
studnetD.study() // 열심히공부 함. 출력
studnetD.introduce() // 안녕하세요! 출력

/* 
주의할 점은 객체 메소드를 정의할 때에는 각각이 프로퍼티로 취급되기 때문에 콤마(쉼표)를 통해 구분하였으나, 클래스 안에서 필드나 메소드를 정의할 때는 쉼표로 구분하지 않는다.  

*/
/* 
##### 클래스 내 this 활용 - introduce 호출시 자신의 이름을 출력하도록 변경
*/

class Studnet {

  /* 1. 필드 정의 */
  name; // js에서 private 접근제한
  grade;
  age;

  /* 2. 생성자 정의 */
  constructor(name, grade, age) {
    this.name = name;
    this.grade = grade;
    this.age = age;
  }

  /* 3. 메소드 정의 */
  study() {
    console.log("열심히 공부함.")
  }

  introduce() {
    console.log(`안녕하세요 ${this.name} 입니다!`)
  }

}

let studnetE = new Studnet('유혁', 'S+', 33)

/* node src/chapter0.js */
studnetE.introduce() // 안녕하세요 유혁 입니다! 출력

let studnetF = new Studnet('홍길동', 'S+', 33)
/* node src/chapter0.js */
studnetF.introduce() // 안녕하세요 유혁 입니다! 출력
/* 
this를 클래스의 메소드 내에서 이용하면 현재 객체의 프로퍼티의 값들을 가져와서 메소드에 사용할 수 있다. 
*/

/* 
#### 클래스 상속
1. Student 학생 클래스를 좀 더 세분화한 학생인데 개발도 하는 학생 개발자 클래스를 정의해본다.
*/
class StudentDeveloper {
  /* Student 클래스 필드 복사 */
  name;
  grade;
  age;
  /* StudentDeveloper 클래스만을 위한 특별한 필드 추가 */
  favoriteSkill;
  constructor(name, grade, age, favoriteSkill) {
    this.name = name;
    this.grade = grade;
    this.age = age;
    this.favoriteSkill = favoriteSkill;
  }
  study() {
    console.log("열심히 공부함.")
  }
  introduce() {
    console.log(`안녕하세요 ${this.name} 입니다!`)
  }
  /* StudentDeveloper 클래스만을 위한 특별한 메소드 추가 */
  programming() {
    console.log(`${this.favoriteSkill}로 프로그래밍 함`)
  }
}
/* 
2. StudentDeveloper 인스턴스를 생성함과 동시에 필드를 초기화해준다.  
*/
const studentDeveloper = new StudentDeveloper('유혁', 'B+', 31, 'JAVA');

/* 
3. 학생 개발자 객체 출력
```
StudentDeveloper {
  name: '유혁',
  grade: 'B+',
  age: 31,
  favoriteSkill: 'JAVA',
}
```
*/
console.log(studentDeveloper);
/* 
4. programming() 메소드 호출
JAVA로 프로그래밍 함
*/
studentDeveloper.programming();

/* 
이렇게 구현을 완료하고 다시 StudentDeveloper클래스와 Student클래스를 비교해 보면 중복되는 부분들이 많다.  
만약 이런 학생 개발자 처럼 Student클래스의 파생 클래스들이 계속 생성되어야 된다면, 동일한 필드, 동일한 생성자 코드, 동일한 메소드를 계속 만들어야 될 것이다.  
바로 이때 클래스의 상속 기능을 이용하면된다.  
이전 타입스크립트 인터페이스를 공부할 때 확장을 배운적이 있다.  
그리고 그 확장이 다른 말로 상속이라고 정의했었다.  
인터페이스의 확장(상속)과 같다.  
StudentDeveloper 뒤에 extends 키워드를 추가하고, Student 클래스명을 `class StudentDeveloper extends Student {}`와 같이 작성할 경우 StudentDeveloper 클래스가 Student 클래스를 확장, 상속 받게 된다.  
StudentDeveloper 클래스에는 Student 클래스에 있던 name, grade, age 필드와 study, introduce 메소드를 물려받게 된다.  
클래스 선언 블록 내부에는, StudentDeveloper만 고유하게 갖는 favoriteSkill필드와 programming메소드만 선언하고, 주의할 문법으로는 생성자(constructor)의 부모 필드의 경우 super 메소드를 호출하여 초기화해준다.  
StudentDeveloper클래스 생성자 내부에서 super 메소드를 호출함으로써 상속하는 Student클래스의 필드들을 초기화하게 된다.  
*/
class StudentDeveloper extends Student {
  favoriteSkill;
  constructor(name, grade, age, favoriteSkill) {
    super(name, grade, age) // 부모 클래스 Student 초기화
    this.favoriteSkill = favoriteSkill;
  }
  programming() {
    console.log(`${this.favoriteSkill}로 프로그래밍 함`)
  }
}
const studentDeveloper2 = new StudentDeveloper('유혁', 'B+', 31, 'JAVA');
console.log(studentDeveloper2);
studentDeveloper2.study();
studentDeveloper2.programming();
/* 
### 번외1) 생성자 함수 활용1
*/
function Student(name, grade, age) {
  this.name = name;
  this.grade = grade;
  this.age = grade;
  this.study = function() {
    console.log("열심히 공부함.")
  }
  this.introduce = function() {
    console.log("안녕하세요!")
  }
}

let studentD = new Student();
let studentE = new Student();
console.log(studentC.study === studentD.study) // false: 각 객체마다 새로운 메소드가 생성됨.

/* 
### 번외2) 생성자 함수 활용2 - 메소드를 프로토타입으로 등록
*/
function Student(name, grade, age) {
  this.name = name;
  this.grade = grade;
  this.age = age;
}
/* 프로토타입으로 등록 */
this.prototype.study = function() {
  console.log("열심히 공부함.")
}
this.prototype.introduce = function() {
  console.log("안녕하세요!")
}
let studentF = new Student();
let studentG = new Student();
console.log(studentE.study === studentF.study) // true: 각 객체가 동일한 prototype 메소드를 호출.

/* 
클래스의 메소드는 기본적으로 prototype 메소드로 정의된다.
 */


/* 
생성자 함수 상속
*/
function Student(name, grade, age) {
  this.name = name;
  this.grade = grade;
  this.age = age;
}
/* 프로토타입으로 등록 */
this.prototype.study = function() {
  console.log("열심히 공부함.")
}
this.prototype.introduce = function() {
  console.log("안녕하세요!")
}

function StudentDeveloper(name, grade, age, favoriteSkill) {
  Student.call(this, name, grade, age); // class의 super(name, grage, age)와 같음.
  this.favoriteSkill = favoriteSkill;
}

/* prototype 상속 - 자식 프로토타입 생성자가 부모를 가리키게 됨 */
StudentDeveloper.prototype = Object.create(Student.prototype)

/* 생성자만 다시 자신것으로 변경 - 메소드만 상속, 생성자는 고유하게 */
StudentDeveloper.prototype.constructor = StudentDeveloper;

this.prototype.programming = function () {
  console.log(`${this.favoriteSkill}로 프로그래밍 함`)
}

const studentDeveloper3 = new StudentDeveloper('유혁', 'B+', 31, 'JAVA');
console.log(studentDeveloper3);
studentDeveloper3.study();
studentDeveloper3.programming();



/* 
### 번외1) 클래스 필드 private 접근제한
*/
class Studnet {

  /* 1. 필드 정의 */
  #name; // js에서 private 접근제한

  /* 2. 생성자 정의 */
  constructor(name, grade, age) {
    this.#name = name;
  }
}
let studnetP = new Studnet('유혁', 'S+', 33)
studnetP.#name = 3;