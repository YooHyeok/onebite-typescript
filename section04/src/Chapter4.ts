/* 
## 사용자 정의 타입 가드

*/

/* 
강아지, 고양이 두개의 타입을 별칭으로 만든다.
*/
type Dog = {
 name: string;
 isBark: boolean;  // 짖는지 여부
}

type Cat = {
  name: string;
  isScratch: boolean; // 할퀴는지 여부
 }

 type Animal = Dog | Cat; // 세상에 동물이 강아지와 고양이만 있다고 가정하여 Dog와 Cat의 Union타입인 Animal 타입 정의

/* 
동물들에 대해 경고하는 함수
타입좁히기를 통해 만약 매개변수 animal이 Dog타입 객체라면 짖는지 짖지않는지  
만약 매개변수 animal이 Cat타입 객체라면 할퀴는지 할퀴지앉는지 알려준다.  
타입스크립트에서 객체가 여러가지 유형으로 나뉠 때에는 서로소 유니온타입을 이용하지만, 현재 상황에서는 그렇게하지 못한다고 가정한다.  
타입들이 남이 만들어둔 타입이라던지, 혹은 라이브러리가 그냥 제공하는 타입이어서 직접 손을 댈 수 없는 상황이라고 가정한다.  

함수 내부에서 프로퍼티 여부를 통한 타입 좁히기를 진행한다.  
이 방법은 직관적이지 못하며, 중간에 타입의 프로퍼티 이름이 변경되거나, 혹은 프로퍼티 이름에 오탈자가 발생되면 이상한 타입으로 추론된다.  
이럴 때 사용하면 좋은 문법이 바로 사용자 정의 타입가드 이다.  
*/
function warningA(animal: Animal) {
  if ("isBarked" in animal) {
    // 강아지
    animal // [비정상] (parameter) animal: Animal & Record<"isBarked", unknown>
  } else if ( "isScratch" in animal) {
    // 고양이
    animal // [정상] (parameter) animal: Cat
  }
} 

/* 
사용자 정의 타입가드 예시 
일반 자바스크립트로 프로그래밍 할 때 어떤 값이 어떤 객체에 포함된다. 와 같은 검사들을 함수로 별도로 만들어서 해주는 경우가 꽤 있다.  
그러한 방법과 같이 Dog타입인지 검증하는 함수를 따로 정의한다.
*/
function isDogBool(animal: Animal) {
  // return animal.isBark !== undefined; // Property 'isBark' does not exist on type 'Animal'. Property 'isBark' does not exist on type 'Cat'.ts(2339)
  return (animal as Dog).isBark !== undefined; // 그냥 animal로 접근하게되면 타입이 잘 좁혀지지 않기 때문에 Dog 타입으로 타입 단언 적용
}


/* 
isDog 함수를 통해 return이 true가 되면 조건문 안에서 animal이 Dog타입이 보장되는 상황이지만, 타입스크립트가 잘 이해하지 못한다.  
이렇게 타입스크립트는 우리가 직접 만든 함수의 반환값을 가지고는 타입을 잘 좁혀 주지는 못한다.  
이럴때에는 함수 자체가 타입 가드역할을 하도록 만들어줘야한다.
*/
function warningB(animal: Animal) {
  if (isDogBool(animal)) {
    // 강아지
    animal // [비정상] (parameter) animal: Animal
  }
} 


function isDogType(animal: Animal): animal is Dog {
  return (animal as Dog).isBark !== undefined;
}

/**
isDogType 이라는 함수가 참이면 인수로 전달한 animal이라는 값이 Dog타입이라는 것으로 타입스크립트가 이해하게된다.
즉, 아래 wrarningC의 if문의 중괄호 내부에서 animal이라는 매개변수가 Dog타입임이 보장된다 생각하고 Dog타입으로 타입을 잘 좁혀주게 된다.
 */
function warningC(animal: Animal) {
  if (isDogType(animal)) {
    // 강아지
    animal // [정상] (parameter) animal: Dog
  }
} 

/* 
isCat 사용자 정의 타입가드
*/
function isCatType(animal: Animal): animal is Cat {
  return (animal as Cat).isScratch !== undefined;
}

function warningD(animal: Animal) {
  if (isDogType(animal)) {
    // 강아지
    animal // [정상] (parameter) animal: Dog
  }
  if (isCatType(animal)) {
    // 고양이
    animal // [정상] (parameter) animal: Cat
  }
} 

