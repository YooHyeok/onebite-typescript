/* 
## 서로소 유니온 타입  
타입좁히기를 할 때 더 쉽고 정확하며, 직관적으로 타입을 좁힐 수 있도록 객체타입을 정의하는 방법이다.  
교집합이 없는 타입들로만 만든 유니온 타입을 말한다.  
즉, 두 타입간에 공통적으로 포함되는 값이 하나도 없는 타입을 말한다.  
예를들어 string과 number 두 타입이 있다고 가정했을 때, 두 타입은 어떠한 교집합도 존재하지 않는다.  
수학에서는 이렇게 교집합이 존재하지 않는 공통원소가 하나도 없는 두 집합을 서로소 관계에 있다고 말한다.  
서로소 관계에 있는 String과 number타입 같은걸로 만든 유니온 타입이 있다고 한다면 두 타입이 서로소 집합이기 때문에 서로소 유니온 타입이라고 부른다.  
*/

/* 
### 예제1) 
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
예제2) 서로소 유니온 타입 적용
앞서 만든 타입들과 동일하게 다시 선언하고, 기존 프로퍼티들을 유지하면서 각 타입에 tage프로퍼티를 추가한다.
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