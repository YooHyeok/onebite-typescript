/* 
## 제네릭 인터페이스와 제네릭 타입 별칭
제네릭은 함수 말고도 인터페이스나 타입별칭 그리고 클래스에도 사용이 가능하다.  
*/

/* 
### 제네릭 인터페이스

#### 예제1_1 - 제네릭 타입 인터페이스 정의
제네릭 인터페이스 또한 제네릭 함수처럼 타입 변수를 이용한다.  
예를들어 KeyPair 를 저장하는 객체 타입을 인터페이스로 만들어보자.  
인터페이스를 선언한 후 인터페이스 이름 뒤에 꺽쇠를 열고 타입 변수를 쓰면 된다.  
타입 변수는 K와 V 2개로 구성한다.  
중괄호 안에 key와 value 프로퍼티를 정의하고, 타입변수로 각각의 타입을 정의해준다.
*/
interface IKeyPair <K, V> {
  key: K;
  value: V;
}
/* 
#### 예제1_2 - 제네릭 타입 인터페이스 변수 타입적용1
다음으로 IKeyPair 인터페이스 타입을 갖는 변수를 선언한다.
그런데 이때, 객체 값을 할당할 경우 중괄호를 열자마자 오류가 발생한다.  
*/
let keyPair: IKeyPair = {} // [Error] Generic type 'IKeyPair<K, V>' requires 2 type argument(s).ts(2314)
/* 
IKeyPair<K,V> 제네릭 형식의 두가지 타입의 인수가 필요하다는 내용의 오류이다.  
제네릭 인터페이스는 제네릭 함수와는 달리 타입으로 어떤 변수로 정의할때 `반드시 꺽쇠를 열고 타입 변수에 타입을 직접 할당`해줘야 한다.  
타입 변수 K에는 string 타입, 타입 변수 V에는 number를 할당해 주도록 한다.  
제네릭 타입 변수에 타입을 할당한 뒤 중괄호 안에 프로퍼티를 실제로 정의해준다.
*/
let keyPairB: IKeyPair<string, number> = {
  key: "key",
  value: 0
}
/* 
참고로 타입 변수는 사람에 따라서 `타입 파라미터`, `제네릭 타입 변수`, `제네릭 타입 파라미터` 등으로 불린다.  
타입스크립트 공식 문서에는 타입 변수 라고 되어있다.
*/

/* 
#### 예제1_2 - 제네릭 타입 인터페이스 변수 타입적용2
K에는 booleanm V에는 string[] 타입을 정의하여 변수를 하나 더만들어본다.
해당 변수에 할당되는 객체에는 key프로퍼티에 true, value 프로퍼티에는 ['1']과 같이 문자열 배열 값이 들어올 수 있다.  
*/
let keyPairC: IKeyPair<boolean, string[]> = {
  key: true,
  value: ['1']
}
/* 
이렇게 제네릭 인터페이스는 하나의 인터페이스로 다양한 타입의 객체를 표현할 수 있다.
*/

/* 
### 제네릭 인터페이스와 Index Signature 문법 활용
제네릭 인터페이스는 인덱스 시그니처 문법과 함께 사용할 경우 굉장히 유연한 객체 타입을 만들 수 있다.  
인덱스 시그니처의 문법은 아래와 같은 인터페이스가 있을 때 key의 타입은 string, value의 타입은 number와 같이 프로퍼티의 key와 value의 타입에 관련된 규칙만 만족하면 어떤 객체든 허용하는 아주 유연한 객체 타입을 만드는 문법이다.  
*/
interface INumberMap {
  [key: string]: number;
}
let numberMap: INumberMap = {
  key: -123,
}
/* 
이러한 인덱스 시그니처 문법에 제네릭까지 함께 사용하면 지금보다 더 유연하게 타입을 정의할 수 있다.  
먼저 제네릭 타입 변수 V를 갖는 인터페이스 IMap를 정의한 뒤 인덱스 시그니처 문법을 활용하여 인터페이스 key 프로퍼티에는 string타입을 지정하고, value 프로퍼티에는 타입 변수 V를 정의한다.  
다음으로 IMap 타입을 지정한 새로운 변수 stringMap을 정의하고, IMap 타입의 타입 변수에 string을 할당한뒤, 변수에 할당하려는 객체의 key프로퍼티의 value에 "value"와 같이 문자열 값을 할당한다.  
string 타입이 아닌 boolean도 가능하다.  
이렇게 제네릭 인터페이스에 인덱스 시그니처 문법을 활용할 경우 하나의 타입으로 굉장히 다양한 객체를 유연하게 정의하고, 표현할 수 있다.  
*/
interface IMap<V> {
  [key: string]: V
}
let stringMap: IMap<string> = {
  key: "value"
}
let booleanMap: IMap<boolean> = {
  key: true
}

/* 
### 제네릭 타입 별칭
제네릭 타입 별칭을 만드는 법은 제네릭 인터페이스를 만드는것과 크게 다른점이 없다.  
앞서 제네릭 인터페이스로 만들었던 IMap 타입을 타입 별칭으로 똑같이 만들어 본다.  
*/
type IMap2<V> = {
  [key: string]: V
}
let stringMap2: IMap2<string> = {
  key: "hello"
}
/* 
### 제네릭 인터페이스의 활용 예시

#### 사용자(User) 관리 프로그램 예제
사용자 구분: 학생 / 개발자

##### 1. 학생 사용자 인터페이스 정의
'student' 문자열 리터럴 타입을 갖는 type 프로퍼티와, string 타입을 갖는 school프로퍼티를 정의한다.
*/
interface IStudent {
  type: 'student';
  school: string;
}
/* 
##### 2. 개발자 사용자 인터페이스 정의
'developer' 문자열 리터럴 타입을 갖는 type 프로퍼티와, string 타입을 갖는 skill프로퍼티를 정의한다.
*/
interface IDeveloper {
  type: 'developer';
  skill: string;

}
/* 
IStudent 인터페이스의 type 프로퍼의 string 리터럴 타입 'student'와 IDeveloper 인터페이스의 type 프로퍼의 string 리터럴 타입 'developer' 각각을 union으로 묶으면 서로소 union 타입이 된다.  
이러한 서로소 유니온 타입은 타입을 좁힐때 유용할것이다.  
*/

/* 
다음으로 학생과 개발자 모두를 아우르는 User 타입 인터페이스를 만들어 본다.  
모든 사용자는 공통적으로 이름을 갖기 때문에 name 프로퍼티를 추가하고, 학생인지 개발자인지를 구분할수 있도록 IStudent | IDeveloper 유니온 타입을 갖는 profile 프로퍼티를 추가한다.
*/

interface IUser {
  name: string;
  profile: IStudent | IDeveloper
}
/* 
정의한 IUser인터페이스를 타입으로 갖는 개발자 변수와 학생 변수를 각각 선언하여 값을 할당해 본다.  
*/
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
/* 
학생만 사용가능한 기능 `등교`를 함수로 정의한다.  
IUser인터페이스의 profile 프로퍼티에 현재 학생 사용자만 특정할 수 있는 타입을 만들어 놓지 않았으므로 Iuser타입으로 매개변수를 정의한 뒤, 조건문을 이용해서 타입을 좁히도록 한다.  
개발자 사용자가 들어왔을 경우 잘못오셨다를 출력하고 함수를 종료시키고, 학생 사용자가 들어왔을 때만 등교완료 로그를 출력하도록 구현한다.
만약 우리가 관리하는 프로그램이 계속해서 사용자 구분도 많아지고, 특정 회원만 이용할 수 있는 함수도 많아진다면 함수를 만들 때마다 타입 좁히기를 써야하기 때문에 조건문을 계속 만들어야 해서 굉장히 불편해질것이다.  
이런 경우 제너릭 인터페이스를 사용할 경우 훨씬 깔끔하게 코드를 작성할 수 있다.  
*/
function goToSchool(user: IUser) {
  if (user.profile.type !== 'student') {
    console.log('잘 못 오셨습니다.');
    return;
  }
  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);

}

/* 
User 인터페이스를 제네릭인터페이스로 구현
*/
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

/* 
제네릭 인터페이스는 변수의 타입을 정의함과 동시에 타입 변수에 할당할 타입을 직접 명시해줘야하기 때문에 user 매개변수의 타입 IUserB의 타입변수에 IStudent를, 개발자 사용자 변수의 타입변수에는 IDeveloper를, 학생 사용자 변수의 타입변수에는 IStudent를 할당한다.  
goToSchoolB() 같은 함수의 매개변수의 타입은 IUserB타입인데, 타입변수 T에 IStudent를 할당했기 때문에 profile의 타입변수 T에는 IStudent 인터페이스가 할당될것이고, 해당 인터페이스의 type은 문자열 리터럴 타입인 'student'가 될것이다.  
따라서, goToSchoolB 함수에는 제너릭타입 IDeveloper의 IUserB가 들어올 수 없기 때문에 앞서 구현한 타입 좁히기 조건문을 삭제해도 된다.
*/
function goToSchoolB(user: IUserB<IStudent>) {
  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);
}
goToSchoolB(developerUserB) // [Error] Argument of type 'IUserB<IDeveloper>' is not assignable to parameter of type 'IUserB<IStudent>'.  Property 'school' is missing in type 'IDeveloper' but required in type 'IStudent'.ts(2345)  
goToSchoolB(studentUserB)


