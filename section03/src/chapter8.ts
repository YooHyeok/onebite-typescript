/* 
# 서로소 유니온 타입  
타입좁히기를 할 때 더 쉽고 정확하며, 직관적으로 타입을 좁힐 수 있도록 객체타입을 정의하는 방법이다.  
교집합이 없는 타입들로만 만든 유니온 타입을 말한다.  
즉, 두 타입간에 공통적으로 포함되는 값이 하나도 없는 타입을 말한다.  
예를들어 string과 number 두 타입이 있다고 가정했을 때, 두 타입은 어떠한 교집합도 존재하지 않는다.  
수학에서는 이렇게 교집합이 존재하지 않는 공통원소가 하나도 없는 두 집합을 서로소 관계에 있다고 말한다.  
서로소 관계에 있는 String과 number타입 같은걸로 만든 유니온 타입이 있다고 한다면 두 타입이 서로소 집합이기 때문에 서로소 유니온 타입이라고 부른다.  
*/

/* 
## 예제1) 
웹 서비스의 간단한 회원 관리 기능을 만든다고 가정한다.
먼저 회원의 분류가 3가지라고 가정했을 때 회원의 타입을 각각 별칭으로 정의해 주도록 한다.

첫번째 회원은 관리자가 필요하므로 Admin
두번째 회원은 일반 회원인 Member
세번째 회원은 아직 가입하지 않은 Guest
3가지 타입을 만든다.

관리자 Admin 타입의 경우 name 프로퍼티와 현재까지 강퇴한 횟수인 kickCount 프로퍼티를 추가한다.  
일반 회원 Member 타입의 경우 관리자 Admin과 똑같이 name 프로퍼티를 추가하고, 쇼핑몰 마일리지같은 기능의 point 프로퍼티를 추가한다.  
마지막으로 Guest는 포인트가 없을 테니 name프로퍼티와 몇번째 방문인지에 대한 visitCount 프로퍼티를 추가한다.  
*/

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

/* 
다음으로는 만들어진 3가지 타입에 대한 유니온 타입을 만들어본다.  
*/
type User1 = Admin1 | Member1 | Guest1

/* 
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
*/
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

/* 
## 예제2) 서로소 유니온 타입 적용
앞서 만든 타입들과 동일하게 다시 선언하고, 기존 프로퍼티들을 유지하면서 각 타입에 tag프로퍼티를 추가한다.
해당 프로퍼티에는 각 타입에 대한 정보를 대문자로 갖는 string 리터럴 타입으로 지정한 후 각 타입을 조합한 유니온 타입을 선언한다.
*/

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

/* 
다음으로 로그인 함수를 동일하게 구현한 뒤 조건문을 수정한다.
*/
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
/* 
switch case 구문으로도 구현이 가능하다.
처음 작성한 in을 활용한 타입가드 조건식의 코드보다 훨씬 직관적이다.
*/
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

/* 
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
그러나 string 리터럴 타입은 딱 한개의 값만 포함한다. (Section03/chapter1.ts 참조)  
그렇기 때문에 ADMIN이라는 string리터럴 타입과 MEMBER라는 string리터럴 타입은없다. 고로 두 string리터럴 타입의 교집합은 공집합, never이다.  
Admin타입과 Member타입 사이의 교집합, Member와 Quest간의 교집합 모두 존재할 수 없다.  
따라서 tag라는 프로퍼티를 만들어 준 다음 해당 프로퍼티의 타입을 string 리터럴 타입으로 모두 다르게 정의해주면 객체들이 서로소 집합의 관계를 갖게 된다.  
그렇기 때문에 User 타입은 서로소 관계에 있는 객체 타입(Admin | Member | Guest)들을 유니온타입으로 묶었기 때문에 서로소 유니온 타입이 되었다.  
login3() 함수에서 user.tag가 ADMIN일 경우는 무조건 Admin 타입에만 해당될 수 밖에 없기 때문에 Admin타입으로 잘좁혀지게 되고,  
user.tag가 MEMBER일 경우에는 무조건 Member타입에만 해당될 수 밖에 없기 때문에 Member타입으로 잘 좁혀지고,
user.tag가 GUEST일 경우에도 마찬가지로 무조건 User타입에만 해당될 수 밖에 없기 때문에 Guset타입으로 잘 좁혀진다.

이렇게 객체 타입에 각각 string 리터럴 타입으로 정의된 프로퍼티들을 각각 다르게 정의해주면서 서로소 union타입으로 만들 수 있기 때문에 Switch Case 문법만으로 아주 직관적으로 타입을 좁혀 처리할 수 있도록 만들 수 있게 된다.  
*/

/* 
## 서로소 유니온 타입 장점 사례 복습 예제)
상황가정: 비동기 작업의 결과를 처리하는 객체 생성
비동기 작업은 API를 호출한다던지, 서버에서 데이터를 받아온다던지 하는 작업들이다.  
비동기 작업의 결과를 객체로 표현해보도록 한다.  
*/

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
/* 
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

*/
type AsyncTask1 = {
  state: "LOADING" | "FAILED" | "SUCCESS";
  error?: {
    message: string
  };
  response?: {
    data: string
  }
}

/* 
각 객체에 AsyncTask타입을 타입어노테이션으로 정의한다.  
*/

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
/* 
다음으로 비동기 작업 처리 결과를 함수의 매개변수로 받아 상태에 따라 처리하는 함수 processResult()를 구현한다.
[로딩중]일 경우 콘솔에 `${로딩중}`을  
[실패]일 경우 `${에러 발생: 에러메시지}`를  
[성공]일 경우 `${성공: 데이터}`를 출력하도록 구현한다.  
*/
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

/* 
결과적으로 문제없이 잘 돌아가는 메소드를 구현했다.  
FAILED case와 SUCCESS case에서 객체 뒤 ?기호는 옵셔널 체이닝이다.  
error나 response 프로퍼티가 undefined일 수도 있다 라는 의미의 연산자가 자동으로 들어간것이다.  
만약 해당 기호를 제거할 경우 오류가 발생한다.  
분명 case가 FAILED일 때에는 error 프로퍼티가 존재하도록 만들고 싶었는데 제대로 만들어지지 않은것 같다.  
task에 마우스 커서를 올려보면 case가 failed일 때에도 타입이 잘 좁혀지지가 않아 AsyncTask라고 되어있는것을 볼 수 있다.  

타입 정의를 다시 살펴보도록 한다.  

type AsyncTask = {
  state: "LOADING" | "FAILED" | "SUCCESS";
  error?: {
    message: string
  };
  response?: {
    data: string
  };
}

함수의 매개변수 task의 타입이 AsyncTask라고 되어 있고 task의 state의 값이 만약 FAILED 라고 해도 
error 프로퍼티는 선택적(?) 프로퍼티로 정의가 되어있기 때문에 task에 에러가 있는지 없는지 확실하게 알수가 없다.  
쉽게 말해 좁혀질 타입 자체가 없다. 타입이 하나밖에 없기 때문이다.  
state가 SUCCESS일 때도 task의 response가 선택적(?) 프로퍼티 이기 때문에 이 역시 있는지 없는지 정확히 알 수 없다.  

이 경우 옵셔널 체이닝(?)을 사용하거나 non-null단원(!)을 사용해야 한다.  
그러나 이렇게 하는 것이 우리가 원하는 것도 아니고, 안전한 코드도 아니다.  
이 경우 AsyncTask를 3개의 타입으로 분리해서 서로소 유니온 타입으로 만들어 주면 된다.
*/

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

/* 
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

*/
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