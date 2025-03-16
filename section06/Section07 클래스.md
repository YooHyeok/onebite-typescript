# [메인 마크다운.md](../README.md)
<br>

# 클래스

## 자바스크립트 클래스
<details>
<summary>펼치기/접기</summary>
<br>

자바스크립트로 개발하다보면 객체를 이용해서 실세계에 존재하는 어떤 사물이나 사람을 표현하는 경우가 꽤 많다.  
예를들어 학생들을 관리하는 프로그램을 만들어야 된다면, 일단 학생을 표현하는 객체를 만들어야 한다.  

### 예제) 학생 관리 프로그램
studentA 객체를 선언하고, name, grade, age 프로퍼티로 구성한 뒤 메소드를 추가해본다.  
공부 기능을 하는 메소드 study와 자기소개 기능을 하는 introduce 메소드를 각각 정의한다.  
  ```js
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
  ```
만약 학생 한명이 더 필요하다면 studentA 객체를 복사하여 객체 이름을 studentB로 변경하고 name과 grade등의 속성의 값을 변경한다.  
이때 이 studentA와 studentB는 둘 다 똑같이 어떤 학생 한명을 표현하는 객체들이다.  
그래서 두 객체는 name과 grade, age 등의 프로퍼티와 메소드 구성이 같고, 값만 다르다.  
두 객체의 형식이 같은것이다.  
  ```js
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
  ```
이렇게 동일한 형식, 동일한 모양의 객체를 여러개 만들어야 한다면, 어쩔 수 없이 위와같이 중복코드가 발생하게 된다.  
현재 코드상에서는 2명밖에 없어서 괜찮긴 하지만, 해당 프로그램을 실제 학교에서 사용하려면 수십명, 많게는 수백명까지 학생 객체를 만들어야 한다.  
따라서 위와같이 구현하게되면 굉장히 불편해진다.  
이럴때 바로 자바스크립트의 클래스를 활용하면 좋다.  
클래스는 이렇게 똑같이 생긴, 똑같은 모양의 객체를 마치 공장에서 찍어내듯이 단 한줄로 간단하게 만들 수 있도록 도와주는 좋은 문법이다.  
쉽게 말하면 객체를 만들어내는 틀 이라는 것이다.  
비유하자면 객체가 붕어빵이라면, 클래스는 붕어빵 기계정도로 비유해 볼 수 있을것 같다.  

#### 클래스 활용1)
클래스의 이름을 정할 때 앞글자는 대문자로 하는 파스칼 표기법을 사용한다.  
클래스를 선언했다면 클래스 내부에 필드를 구성한다.  
필드란 해당 클래스가 만들어 낼 객체 프로퍼티를 의미하는 것이다.  
클래스는 객체를 찍어내는 붕어빵 기계라고 했다. 그래서 어떤 모양의 객체를 찍어낼지 필드에 정의해주면 되는것이다.  
studnetA와 studentB 객체에 정의된 name과 grade, age프로퍼티를 클래스에서 필드로 설정한다.  
이렇게 필드로 설정하면 Student 클래스가 만들어내는 객체는 이제 다 name과 grade, age라는 프로퍼티를 갖게 되는 것이다.  
  ```js
  class Studnet {

    /* 1. 필드 정의 */
    #name; // js에서 private 접근제한
    grade;
    age;
  }
  ```
필드를 선언했다면, 다음으로 할 일은 생성자를 만들어 줘야 한다.  
생성자란, 해당 클래스를 호출하면, 그러니까 Student 클래스를 이용해서 새로운 객체를 만들도록 호출하면 실제로 객체를 생성하는 역할을 하는 메소드이다.  
메소드 형태를 가지며 `constructor() {}` 와 같은 문법으로 정의한다.  
생성자가 실제로 객체를 만들기 위해서는 매개변수를 통해 이 필드에 해당하는 지금 만들 객체의 name과 grade, age 필드들 어떻게 초기화 할 것인지 정의해야한다.

`this.필드명 = 매개변수` 형태로 생성자 블록 내에 선언해주는데 이때 this는 해당 클래스가 현재 만들고 있는 객체이다.  
즉, 만약 `this.name = name`이라면 지금 생성하고 있는 객체의 name 프로퍼티 값을 매개변수 name에 저장된 값으로 할당해주는것이다.  

  ```js
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
  ```

필드를 선언했다면, 다음으로 할 일은 생성자를 만들어 줘야 한다.  
생성자란, 해당 클래스를 호출하면, 그러니까 Student 클래스를 이용해서 새로운 객체를 만들도록 호출하면 실제로 객체를 생성하는 역할을 하는 메소드이다.  
메소드 형태를 가지며 `constructor() {}` 와 같은 문법으로 정의한다.  
생성자가 실제로 객체를 만들기 위해서는 매개변수를 통해 이 필드에 해당하는 지금 만들 객체의 name과 grade, age 필드들 어떻게 초기화 할 것인지 정의해야한다.

`this.필드명 = 매개변수` 형태로 생성자 블록 내에 선언해주는데 이때 this는 해당 클래스가 현재 만들고 있는 객체이다.  
즉, 만약 `this.name = name`이라면 지금 생성하고 있는 객체의 name 프로퍼티 값을 매개변수 name에 저장된 값으로 할당해주는것이다.  

생성자까지 정의를 한다면, 실제로 Student 클래스가 학생 객체를 마치 공장처럼 찍어낼 수 있는 상태가 된것이다.  
실제 클래스를 활용하여 객체를 만들어본다.  
아래와 같이 new 키워드를 통해 클래스명()으로 생성자를 호출한다.  
이때 매개변수로 생성자에 적혀있는 매개변수 순서와 맞춰 초기화 할 값을 세팅한다.
  ```js
  let studnetC = new Studnet('유혁', 'S+', 33)
  console.log(studnetC) // Student {name: '유혁', 'S+', 33}
  ```
클래스를 호출해서 객체를 생성할 때에는 new라는 키워드를 붙혀준다.  
여기서 new라는 의미는 새로운 객체를 만들라는 의미로 해석할 수 있다.  
그리고 new 뒤에 클래스 이름을 명시하고 마치 함수를 호출하듯 소괄호를 열어 인수를 전달하게 되면 실제로는 클래스에 있는 생성자constructor를 호출하게 되는것이다.  
new 뒤에 클래스이름을 적고 소괄호를 열면 생성자가 호출된다고 이해하면된다.  
그리고 인수로 전달된 값들은 생성자의 매개변수로 전달된 뒤, 필드에 초기화 할당됨으로써 객체의 각 프로퍼티에 설정되는것이다.  
터미널에서 `node src/Chapter0.js` 를 실행하면 Student {name: '유혁', 'S+', 33}를 출력하게된다.  
참고로 클래스를 이용해서 만든 객체는 인스턴스 라고 부른다.  
Studnet 클래스를 이용해서 만들었기 때문에 Studnet 인스턴스 라고 부를 수 있다.  

##### Studnet 클래스 메소드 정의
객체에 메소드를 정의하는것과 동일하게 정의하면 된다.  
이렇게 만들어주면 Studnet 클래스로 만들어지지는 객체 인스턴스들은 다 study와 introduce 같은 메소드를 갖게 된다.  
그렇기 때문에 studentD도 study라는 메소드와 introduce 라는 메소드를 호출할 수 있게 된다.  

  ```js
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
  ```
주의할 점은 객체 메소드를 정의할 때에는 각각이 프로퍼티로 취급되기 때문에 콤마(쉼표)를 통해 구분하였으나, 클래스 안에서 필드나 메소드를 정의할 때는 쉼표로 구분하지 않는다.  

##### 클래스 내 this 활용 - introduce 호출시 자신의 이름을 출력하도록 변경
this를 클래스의 메소드 내에서 이용하면 현재 객체의 프로퍼티의 값들을 가져와서 메소드에 사용할 수 있다. 
  ```js
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
  ```

#### 클래스 상속
1. Student 학생 클래스를 좀 더 세분화한 학생인데 개발도 하는 학생 개발자 클래스를 정의해본다.
  ```js
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
  ```
2. StudentDeveloper 인스턴스를 생성함과 동시에 필드를 초기화해준다.  
  ```js
  const studentDeveloper = new StudentDeveloper('유혁', 'B+', 31, 'JAVA');
  ```
3. 학생 개발자 객체 출력
  ```js
  console.log(studentDeveloper);
  ```
  ```
  StudentDeveloper {
    name: '유혁',
    grade: 'B+',
    age: 31,
    favoriteSkill: 'JAVA',
  }
  ```
4. programming() 메소드 호출
  ```js
  studentDeveloper.programming();
  ```
  ```
  JAVA로 프로그래밍 함
  ```
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
- src/index.js
  ```js
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
  ```

  ### 번외) 생성자 함수
  <details>
  <summary>펼치기/접기</summary>
  <br>

  #### ES5 이하 객체 생성 방식.
  클래스 문법이 공식적으로 지원되기 전, new 연산자를 인스턴스 생성을 통해 객체를 만드는 방법은 생성자 함수를 통해 구현이 가능했다.  
  - src/index.js
    ```js
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
    ```
  클래스 문법과는 다르게 객체 내부에 메소드를 직접 정의하면, 객체를 생성할 때 마다 새로운 메소드가 생성되게 된다.

  #### 메소드를 프로토타입으로 등록
  - src/index.js
    ```js
    function Student(name, grade, age) {
      this.name = name;
      this.grade = grade;
      this.age = grade;
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
    ```
    위와 같이 메소드를 생성자 함수 외부에서 프로토타입으로 등록할 경우, 전역으로 등록되는 개념이기 때문에 각 객체가 동일한 prototype 메소드를 호출하게 된다.  

    ***클래스 문법에서 정의된 메소드는 기본적으로 prototype 메소드로 정의된다***

  </details>
  <br>

  ### 번외2) 생성자 함수 상속
  <details>
  <summary>펼치기/접기</summary>
  <br>

  아래와 같이 구현한다.  
  - src/index.js
    ```js 
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

    /* prototype 상속 - 자식 프로토타입 생성자가 부모를 가리키게 되는 이슈 발생 */
    StudentDeveloper.prototype = Object.create(Student.prototype)

    /* 생성자만 다시 자신것으로 변경 - 메소드만 상속, 생성자는 고유하게 */
    StudentDeveloper.prototype.constructor = StudentDeveloper;

    this.prototype.programming = function () {
      console.log(`${this.favoriteSkill}로 프로그래밍 함`)
    }

    const studentDeveloper = new StudentDeveloper('유혁', 'B+', 31, 'JAVA');
    console.log(studentDeveloper);
    studentDeveloper.study(); // 부모 메소드 호출
    studentDeveloper.programming(); // 자식 메소드 호출
    ```

    여기서 핵심은 3가지이다.
    1. 자식 객체 생성자 함수 블록 내에서 `Student.call(this, ...arg);`을 호출하여 첫번째 매개변수에 this를, 나머지 매개변수에 부모 클래스의 필드를 초기화 하는 인자를 넣어준다.  
    이 행위는 Class에서 상속받은 뒤 생성자를 통해 초기화할 때, 부모 클래스의 생성자인 super를 호출하여 부모클래스 필드를 초기화하는것과 동일한 행위이다.  
    2. `자식객체생성자함수명.prototype = Object.create(부모객체생성자함수명.prototype);` 문법의 경우 부모 프로토타입을 자식 프로토타입으로 상속받는것을 말한다.  
    그러나 이 경우 자식 프로토타입 생성자가 부모를 가리키게 되는 이슈 발생하게 된다. (코드만 봐도 그렇게 될거처럼 보인다.)  
    3. 위 문제를 해결하기 위해 `자식객체생성자함수명.prototype.constructor = 부모객체생성자함수명;` 코드를 통해 생성자만 다시 자신의 것으로 변경해줘야 한다.  
    생성자를 자기자신으로 돌리되, 함수만 이전하는것이다.
  </details>  
  <br>

  ### 번외3) 클래스 필드 private 접근 제한
  <details>
  <summary>펼치기/접기</summary>
  <br>

  타입스크립트에서는 기본적으로 private 접근지정자 키워드를 지원하지만 자바스크립트에서는 해당 키워드를 지원하지 않는다.  
  자바스크립트에서 private 접근지정을 설정하는 특별한 문법이 있는데 바로 필드 앞에 #을 붙히는것이다.
  객체 생성 후 해당 필드에 접근할 경우 오류가 출력되며 접근이 불가능해진다.
  - src/index.js
    ```js
    class Studnet {

      /* 1. 필드 정의 */
      #name; // js에서 private 접근제한

      /* 2. 생성자 정의 */
      constructor(name, grade, age) {
        this.#name = name;
      }
    }
    let studnetP = new Studnet('유혁', 'S+', 33)
    studnetP.#name = 3; // [Error] Property '#name' is not accessible outside class 'Studnet' because it has a private identifier.ts(18013)
    ```
  </details>
  <br>

</details>
<br>

## 타입스크립트의 클래스
<details>
<summary>펼치기/접기</summary>
<br>

### 직장인 클래스 생성
클래스를 만들기 앞서 이름, 나이, 직무, 하는일을 갖는 직장인을 표현하는 객체를 만들어본다.

- src/chapter1.ts
  ```ts
  const employee = {
    name: '유혁스쿨',
    age: 27,
    position: 'developer',
    work() {
      console.log("일함")
    }
  }
  ```
다음으로 객체와 동일한 구성을 갖는 클래스를 선언해본다.
이때, 일반적인 js 방식의 클래스에서 필드를 정의하는것과 동일하게 정의할 경우 `각각의 멤버들에 암시적으로 any타입이 포함된다`  
라는 내용의 오류가 발생한다.

- src/chapter1.ts
  ```ts
  class EmployeeA {
    /* 필드 정의 */
    name; // Member 'name' implicitly has an 'any' type.ts(7008)
    age; // Member 'age' implicitly has an 'any' type.ts(7008)
    position; // Member 'position' implicitly has an 'any' type.ts(7008)
  }
  ```
해당 오류는 함수를 정의하고 매개변수를 전달할 때, 매개변수의 타입을 정의하지 않을 경우에도 똑같은 오류가 발생한다.  
함수의 매개변수나 클래스의 필드처럼 변수의 타입을 추론할 정보가 아무것도 없는 상황에 발생한다.  
a매개변수나 클래스의 필드처럼 이렇게 추론할 수 있는 정보가 없을 때에는 암시적으로 any타입이 할당된다.  
any 타입은 치트키 타입이고, 안전하지 않기 때문에 오류가 발생하는것이다.  
- src/chapter1.ts
  ```ts
  function func(a) {} // Parameter 'a' implicitly has an 'any' type.ts(7006)
  ```


#### noImplicitAny
참고로 이때, any타입이 할당되어도 좋아. 추론 못하겠으면 그냥 any타입으로 해줘 라고 하고싶다면 tsconfig파일에서 옵션을 하나 추가해주면 된다.  
compilerOptions 옵션에서 noImlicitAny 옵션을 false값으로 꺼주면 된다.  
noImlicitAny옵션은 암시적 any를 허용하지 않을것이냐 라는 옵션이다.  
false를 주게되면 암시적 any를 허용하곘다는 의미이다.  
실제로 tsconfig.json 설정을 하게되면 발생하던 오류가 사라지게 된다.  
- ./tsconfig.json
  ```json
  {
    "compilerOptions" : {
      "noImplicitAny" : false
    }
  }
  ```
그러나 왠만하면 noImplicitAny 옵션까지 쓰면서 굳이 안전하지 않게 any를 사용하는것 보다는 처음부터 타입스크립트 코드를 쓰는 상황이면 왠만하면 안전하게 쓰는게 좋다.  
noImlicitAny옵션의 기본값은 true이므로 옵션 설정을 하지 않을 경우 암시적으로 any타입에 할당되는 위험한 코드들이 방지되기 때문에 왠만하면 건드리지 않는것이 좋다. 

옵션을 끄고 다시 클래스로 돌아가서 타입을 정의해보도록 한다.
- src/chapter1.ts
  ```ts
  class EmployeeB {
    /* 필드 정의 */
    name: string; // Property 'name' has no initializer and is not definitely assigned in the constructor.ts(2564)
    age: number; // Property 'age' has no initializer and is not definitely assigned in the constructor.ts(2564)
    position: string; // Property 'position' has no initializer and is not definitely assigned in the constructor.ts(2564)
  }
  ```
그러나 타입을 정의해주더라도 오류가 발생한다.  
`이니셜라이저가 없고 생성자에 할당되어 있지 않다`는 오류가 발생한다.
이니셜라이저는 기본값, 초기값을 의미한다.  
즉, 초기값도 없고 생성자에 할당도 되지 않는데 왜 선언했냐 어차피 undefined로 할당될건데 라는 의미로 발생되는 오류이다.  
해당 오류를 제거하기 위해서는 첫번째 가장 쉬운 방법으로는 그냥 없어도 되는 값인 선택적 프로퍼티 선택적 필드로 만들어주면 되지만 좋은 해결 방식은 아니다.  
두번째 방법으로는 기본값을 할당하는것이다.

### 방법 1. 선택적 프로퍼티
- src/chapter1.ts
  ```ts
  class EmployeeC {
    /* 필드 정의 */
    name?: string;
    age?: number;
    position?: string;
  }
  ```

### 방법 2. 기본값 할당
- src/chapter1.ts
  ```ts
  class EmployeeD {
    /* 필드 정의 */
    name: string = "";
    age: number = 0;
    position: string = "";
  }
  ```

만약 초기값으로 넣을 값이 마땅히 없을 경우에는 생성자를 만들고 생성자 매개변수로 초기화 해 주면 된다.  
아래와 같이 생성자를 통해 멤버의 모든 필드들을 초기화 할 경우
- src/chapter1.ts
  ```ts
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
  ```
생성자를 통해 초기값을 할당할 경우 매개변수에 타입을 지정해주게 되면 필드레벨 에서는 타입을 지정하지 않아도 타입스크립트 컴파일러가 자동으로 타입 추론을 해준다.
따라서 생략이 가능해진다.
- src/chapter1.ts
  ```ts
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

  ```
### 메소드 정의
메소드 정의는 객체를 선언하는 방식 혹은 자바스크립트 클래스 문법과 동일하다.
- src/chapter1.ts
  ```ts
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
  ```
### 인스턴스 생성
아래와 같이 인스턴스를 생성하며 멤버들을 초기화 한 뒤, tsx src/chapter1.ts 명령을 실행하면  
EmployeeG { name: '유혁스쿨', age: 34, position: 'developer' }와 같이  
EmployeeG 클래스의 인스턴스이고, name, age, position 프로퍼티가 있는 객체라는것을 잘 출력해준다.  
- src/chapter1.ts
  ```ts
  const employeeA = new EmployeeG('유혁스쿨', 34, 'developer');
  console.log(employeeA) // tsx src/chapter1.ts - EmployeeG { name: '유혁스쿨', age: 34, position: 'developer' }
  ```  
타입스크립트에서의 이런 EmployeeG와 같은 클래스는 자바스크립트 클래스로 취급이 되면서 동시에 타입으로도 취급이 된다.  
즉, 클래스 자체가 하나의 타입으로도 작용할 수 있다는 것이다.  
앞서 만든 변수에 커서를 올려보면 const employeeA: EmployeeG 와 같이 타입이 EmployeeG 타입으로 추론되는것을 확인할 수 있다.  
이렇게 타입 스크립트의 클래스는 실제 타입으로도 활용이 되며, 그렇기 때문에 employeeB라는 변수를 만들고 해당 변수의 타입을 EmployeeG라는 클래스로 정의해주면  
이제 employeeB에는 EmployeeG에서 정의한 필드들과 메소드를 모두 가지고 있어야 하는 객체 타입으로 정의가 된다.  
- src/chapter1.ts
  ```ts
  const employeeB: EmployeeG = {
    name: "",
    age: 0,
    position: "",
    work() {}
  }
  ```  
이렇게 타입스크립트의 클래스는 타입으로도 활용할 수 있다 라고 알아두면 된다.  
클래스가 타입으로 활용될 수 있는 이유는 타입스크립트는 구조적으로 타입을 결정하는 구조적 타입 시스템을 따르기 때문이다.  
클래스의 구조만으로 멤버와 메소드가 동일하게 구성된다면 EmployeeG 타입으로 결정하는 것이다.

### 클래스 상속
Employee 클래스를 확장한 더 세분화 된 ExecutiveOfficer 클래스를 만들어 본다.
ExecutiveOfficer를 선언하고, 회사로부터 고용된 사람인건 똑같기 때문에 extends 키워드를 사용하여 EmployeeG 클래스를 상속받도록 한다.
ExecutiveOfficer 클래스는 EmployeeG 클래스를 상속받음으로써 EmployeeG클래스의 모든 필드와 메소드를 기본적으로 다 가지고 있게 된다.  
ExecutiveOfficer 클래스만을 위한 필드를 추가한다.  
대기업 임원은 개인 방이 하나씩 있다고 가정하여 사무실 번호를 의미하는 officeNumber라는 필드를 추가해 준 뒤, 초기화 할 생성자를 함께 선언한다.  
해당 생성자에서는 부모클래스의 필드를 초기화 해 줄 생성자도 호출해야 하기 때문에 부모 클래스를 위한 매개변수 name, age, position까지 받아준 뒤 officeNumber까지 추가로 받아준다.  
이후 super를 호출하면서 부모 클래스의 필드들을 모두 전달하여 초기화 해 준 뒤 자식 클래스의 필드 officeNumber를 초기화 해줌으로써 상속받는 클래스까지 만들어 줄 수 있다.  
- src/chapter1.ts
  ```ts
  class ExecutiveOfficer extends EmployeeG {
    officeNumber: number;
    constructor(name: string, age: number, position: string, officeNumber: number) {
      super(name, age, position);
      this.officeNumber = officeNumber;
    }
  }

  ```  
타입스크립트의 클래스에서는 위와같이 상속받는 클래스, 파생클래스를 만들 수 있는데, 이때 참고로 super를 생략하게 되면 오류가 발생한다.  
자바스크립트에서는 super를 호출하지 않아도 큰 문제가 되진 않는다.  
그러나 타입스크립트에서는 그럼 뭐하러 상속했냐 라는 의미로 오류를 발생시킨다.  
파생 클래스의 생성자는 슈퍼 호출을 포함해야된다 라는 내용으로 출력되어서 슈퍼 클래스의 생성자까지 반드시 호출하도록 강제해준다.  
또한 생성자에서 position같은 인수를 빼먹을 경우 슈퍼 클래스의 생성자 매개변수와 비교해서 인수가 잘못되었다라고 또 타입 오류에 대해 알려준다.  

이렇게 타입스크립트에서 클래스를 사용할 경우 자바스크립트의 클래스를 사용할 때 보다 비교적 안전하게 사용할 수 있다.

</details>
<br>

## 접근 제어자
<details>
<summary>펼치기/접기</summary>
<br>

접근 제어자는 타입스크립트의 클래스에서만 제공되는 기능이다.  
영어로는 access modifier라고도 부르는 접근 제어자란 클래스를 만들때 특정 필드나 메소드에 접근할 수 있는 범위를 설정하는 문법이다.  
접근제어자에는 `public`, `private`, `protected` 라는 3가지가 있는데 각각 어떤 의미고 어떤 기능들을 하는지 실습 코드를 통해 알아본다.  
이전 chapter1에서 만들어두었던 Employee 클래스를 재활용해본다.  

- src/chapterX.ts
  ```ts
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
  ```
위와 같이 클래스를 만든 후 new 인스턴스를 통해 만든 객체는 프로퍼티에 접근해서 값을 수정하는것이 가능하다.  

- src/chapterX.ts
  ```ts
  employee.name = '유나얼';
  employee.age = 46;
  employee.position = '가수 겸 화가';
  ```
이것이 가능한 이유는 일단 객체이기 때문이기도 하고 클래스 멤버 각각의 필드에 접근제어자가 현재 기본적으로 기본값인 public으로 설정되어있기 때문이다.  
그래서 아무것도 쓰지 않으면 각각의 필드에 아래와 같이 public이라는 접근 제어자가 붙어있다고 이해하면 된다.  

- src/chapterX.ts
  ```ts
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
  ```
public이란 공공의 라는 뜻으로 즉, 모두 오픈되어있다는 뜻이다.  
그래서 필드에 public 이라고 명시적으로 설정하거나 아니면 기본값으로 아에 접근제어자를 생략한다면 new 인스턴스로 생성한 객체에서 자유롭게 프로퍼티에 접근할 수 있게 되는 것이다.  
즉, public은 아무 제약없는 상태이다 라고 이해하면 된다.  

### private 접근제어자
개인정보 같은걸 프라이버시 라고도 하듯 private은 사적인 이라는 뜻이다.  
만약 name 프로퍼티에 private 접근제어자를 설정할 경우 `name 속성은 private이며 EmployeeB 클래스 내에서만 액세스할 수 있습니다다.` 라고 에러를 출력한다.  
- src/chapterX.ts
  ```ts
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
  ```
이렇게 필드 접근제어자로 private를 설정해주면 Employee라는 클래스 외부에서는 위와같이 점 표기법으로 프로퍼티에 접근하는것이 모두 제한된다.  
심지어 읽을수 조차 없으므로 읽을 수는 있었던 read-only랑은 조금 다른것이다.  
만약 private 접근제한이 붙은 name 프로퍼티에 접근하고 싶다면 따로 메소드를 선언하여 this키워드로 접근할 수 있도록 한다.  

- src/chapterX.ts
  ```ts
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
  ```
즉, private는 this키워드를 통해 내부에서만 접근 가능하므로 만약 클래스에 외부에서 접근을 못하게 막고 메소드로만 해당 값을 사용할 경우에 사용한다.  
또 클래스 내부에서만 접근할 수 있기 때문에 해당 클래스를 상속받은 파생 클래스에서도 접근할 수 없게 된다.  
chapter1.ts의 ExecuteOfficer 클래스를 구현해본다.  

### 
- src/chapterX.ts
  ```ts
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
  ```
### protected 접근제어자  
외부에서는 접근이 안되게 막고싶지만 파생클래스 내부에서는 접근이 되었으면 좋겠다고 하면 3번째 접근제어자인 protected라는걸 쓰면 된다.  
name 프로퍼티에 protected를 설정해주게 되면 아래와 같이 해당 클래스를 상속받은 ExecutiveOfficerA 라는 파생 클래스에서 접근이 허용이 된다.  
- src/chapterX.ts
  ```ts
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
  ```
### 3가지 접근제어자 정리

#### public
public은 아무것도 제한하지 않는 가장 기본적인 접근제어자이므로 생략할 경우 public 접근제어자가 적용된다.  
따라서 외부에서도 접근할 수 있다.  

#### private
public과 반대로 가장 private 하고 가장 제한적인 접근제한자로 해당 필드의 소속 클래스 내부가 아니면 어디서든지 접근이 불가능해진다.  
상속받은 파생 클래스에서조차 접근할 수가 없다.

#### protecte
외부에서는 아에 접근할 수 없게 막지만, 파생클래스 내부에서는 접근을 허용할 수 있도록 해주는 public과 private의 중간쯤에 있는 접근제어자라고 이해하면 된다.  

### 생성자 매개변수에 지정
접근제어자는 생성자의 매개변수에도 지정할 수 있다.  
그러나 실제로 지정할 경우 각각의 식별자가 중복이 된다는 오류를 발생시킨다.  
- src/chapterX.ts
  ```ts
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
  ```
생성자 매개변수들에 접근제어자를 달게되면 내부적으로 자동으로 필드를 만들어주기 때문이다.  
따라서 생성자 매개변수들에 접근제어자를 달게 되면 필드를 생략하는것도 가능해진다.  

- src/chapterX.ts
  ```ts
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
  ```
위와같이 생성자의 매개변수에 접근지정자를 지정함으로써 필드를 생략할 경우, 필드만이 생략되는것이 아니라 자동으로 초기화작업까지 진행된다.  
따라서 `this.name = name`과 같은 작업을 생성자 블록 내에서 하지 않고 생략해도 값이 자동으로 할당되어 초기화가 된다.  

- src/chapterX.ts
  ```ts
  class EmployeeG {
    /* 필드와 생성자 함께 정의 및 초기화까지 */
    constructor (protected name: string, private age: number, public position: string) {}

    getName() {
      return this.name;
    }
  }
  ```
실제로 tsx명령을 통해 실행해보면 인수를 전달한대로EmployeeG { name: '유혁스쿨', age: 0, position: 'developer' }를 출력한 뒤  
프로퍼티에 접근해서 position을 singer로 변경한부분에 대해 EmployeeG { name: '유혁스쿨', age: 0, position: 'singer' }` 와 같이 정상적으로 출력해주는 것을 확인할 수 있다.  

- src/chapterX.ts
  ```ts
  const employeeG = new EmployeeG('유혁스쿨', 0, 'developer')
  console.log(employeeG) // tsx src/chapter2.ts - EmployeeG { name: '유혁스쿨', age: 0, position: 'singer' } 출력
  employeeG.position = 'singer'
  console.log(employeeG) // tsx src/chapter2.ts - EmployeeG { name: '유혁스쿨', age: 0, position: 'singer' } 출력
  ```
접근제어자는 객체지향 프로그래밍을 할 때 대단히 중요한 역할을 하는 문법이다.  
실제로 Java나 C#을 이용해서 객체지향 프로그래밍을 경험해본 사람들이라면 알겠지만, 객체지향에서 은닉이라는 개념 즉, 클래스 인스턴스 객체의 프로퍼티를 이렇게 외부에서 수정할 수 없도록 막는것이 일반적이다.  
함부로 잘못 수정했다가 다른 메소드딜이나 클래스까지 여파가 미칠 수 있기 때문에 극도로 제한해서 오류가 발생하지 않도록 막아주는것이다.  

</details>
<br>

## 템플릿1
<details>
<summary>펼치기/접기</summary>
<br>

### 
- src/chapterX.ts
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
  - src/chapterX.ts
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
