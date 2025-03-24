/* 
## 프로미스와 제네릭

제네릭을 활용해서 비동기 처리를 돕는 프로미스 객체의 타입을 정의하는 방법을 살펴보도록 한다.  
자바스크립트 프로젝트에서 버그가 가장 많이 발생하는 api 호출 등의 비동기 처리 코드에도 각각의 타입을 안전하게 정의하면 훨씬 견고한 비동기 코드를 작성할 수 있게 된다.  
프로미스는 자바스크립트 내장 클래스이다.  
new 키워드를 통해 Promise객체를 만들어 줘야 하며, 생성자에는 함수를 하나 인수로 전달해야 한다.  
해당 함수는 실행자 함수라고 해서 비동기 처리를 실제로 하는 함수를 의미한다.  
해당 함수는 두개의 매개변수 resolve와 reject를 가지며 중괄호 내부에서 비동기 처리를 하게된다.  
resolve는 성공했을 때 호출하는 함수이며 함수의 인자로 전달하는 값은 비동기 작업의 결과값으로 Promise객체의 then메소드의 콜백함수에서 전달받게 된다.  
reject는 실패했을 때 호출하는 함수이고, resolve와는 달리 실패의 이유를 인수로 전달하며, Promise 객체의 catch 메소드의 콜백함수에서 전달받게 된다.  

### 예제1) Promise 객체 직접 구현
현재는 API 서버도 없고, 데이터를 받아올 곳이 없기 떄문에 일단 비동기 작업이라도 만들어 보기 위해 setTimeout이라는 내장함수를 사용해서 3초 뒤에 resolve를 호출하고 결과값으로 숫자값 20을 전달해보도록 한다.  
*/
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(20);
  }, 3000)
})
/* 
결과값을 이용하는 코드를 작성해보도록 한다.  
결과값을 이용하기 때문에 성공했다고 가정하여 then메소드를 호출한 다음 콜백함수를 인수로 받아, resolve에서 인수로 넘긴 결과값을 콜백함수의 매개변수 response를 통해 받아준 뒤 로그로 출력한다.  
실제로 3초 후에 20이 출력된다.  
*/
promise.then((response) => {
  console.log(response)
})
/* 
결과값에 10을 곱해서 출력해보도록 한다.  
이 경우 response 매개변수의 타입이 unknown 타입이라는 오류를 출력한다.  
unknowm타입은 모든 연산을 할 수 없기 때문에 response 타입이 unknown으로 추론되고 있어 곱셈 연산을 하면 오류가 발생한다.  
그러나 분명히 Promise 객체를 만들 때 resolve를 호출하면서 인수로 number타입의 값인 20을 전달했다.  
즉, 20은 response에 그대로 전달된다는 말이다.  
20은 number타입의 값이기 때문에 당연히 response의 타입도 number타입으로 추론되어야 정상일것 같지만 커서를 올려보면 unknown타입으로 추론되고 있다.  
*/
promise.then((response) => {
  console.log(response * 10) // [Error] 'response' is of type 'unknown'.ts(18046)
})
/* 
이렇게 프로미스는 resolve나 reject를 호출해서 전달하는 비동기 작업의 결과값의 타입을 자동으로 추론할 수 있는 기능을 가지고 있지 않다.  
그렇기 때문에 기본적으로는 결과값을 unknown타입으로 추론한다.  
그렇다고 response를 받은 뒤 타입좁히기를 통해 일일이 number타입으로 좁혀서 사용하기에는 굉장히 번거롭고 귀찮다.  
*/
promise.then((response) => {
  if (typeof response === 'number') {
    console.log(response * 10)
  }
})
/* 
이 경우에도 제네릭을 이용하면 된다.  
자바스크립트 내장 클래스인 Promise는 타입스크립트에서는 제네릭 클래스로 타입이 별도로 선언되어 있기 때문에, Promise의 생성자를 호출할 때 꺽쇠를 열어 비동기 작업의 결과를 타입 변수에 할당해주면 자동으로 타입을 추론해준다.  
따라서 이전 로직에서 Promise객체를 생성할때 제네릭 타입 변수로 number를 지정할 경우 오류가 사라지게 되고, then 메소드 호출부에 마우스 커서를 올려보면 number 타입으로 추론된것을 확인할 수 있다.  
또한, 인스턴스 생성시 전달하는 콜백함수의 매개변수 resolve 함수에도 커서를 올려보면 resolve함수의 매개변수 타입이 number타입으로 추론된다.  
따라서 resolve함수에 문자열을 전달할 경우 오류가 발생할것이다.  

*/
const promiseA = new Promise<number> ((resolve, reject) => {
  setTimeout(() => {
    // resolve('20'); // Argument of type 'string' is not assignable to parameter of type 'number | PromiseLike<number>'.ts(2345)
    resolve(20);
  }, 3000)
})
promiseA.then((response) => {
  console.log(response * 10)
})

/* 
Promise의 타입이 왜 이렇게 동작하는지 Ctrl을 누른 채로 Promise를 클릭을 해보면 아래와 같이 정의된 코드를 확인할 수 있다.  
- lib.es2018.promise.d.ts
  ```ts
  interface Promise<T> {
      finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }
  ```
interface Promise<T> 즉, 타입 변수를 활용하는 제네릭 인터페이스라는 것을 확인할 수 있으며, Promise의 타입 선언이 굉장히 여러 파일에 나뉘어져서 선언되어있는 것도 확인할 수 있다.  

Promise의 생성자 타입 선언을 확인해보려면 `lib.es2015.promise.d.ts`파일을 열어보면 생성자 함수의 타입 정의를 볼 수 있다.
- lib.es2015.promise.d.ts
  ```ts
  new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
  ```
생성자 메소드가 타입 변수 T를 갖는 제네릭 함수라는것을 알 수 있고, 생성자에 전달하는 매개변수 resolve 매개변수의 value 타입도 T로 타입변수의 타입을 그대로 갖는다는것을 확인할 수 있다.  
결론적으로 Promise의 생성자를 호출할 때 타입 변수를 할당해주면 비동기 처리 결과 값의 타입을 직접 명시할 수 있다.  
*/


/* 
다음으로는 실패했다고 가정하고 reject와 catch에 대한 코드를 작성해본다.  
실패할 경우 resolve가 아닌 reject를 호출하여 reject의 매개변수로 실패 이유를 전달한다.  
이때 reject 함수의 인수로는 무슨 타입을 전달할 수 있는지 커서를 올려보면 `reject: (reason?: any) => void`와 같이 reason이 선택적 매개변수이고, any타입으로 정의가 되어 있기 때문에 해당 매개변수를 생략하거나 아무 타입의 값으로인수를 전달할 수 있도록 설정되어 있다.  
따라서 reject에는 문자열 뿐만 아니라 함수를 넣어도 문제가 없다.  
(보통은 문자열로 넣는다.)
*/
const promiseB = new Promise<number> ((resolve, reject) => {
  setTimeout(() => {
    reject('실패 원인: B');
  }, 3000)
})
/* 
Promise객체에서 실패의 결과를 처리하는 메소드인 catch를 호출하여, 콜백함수를 통해 reject에서 전달한 실패 이유를 매개변수로 전달받아 출력하도록 한다.  
매개변수 error의 경우 커서를 올려보면 reject 함수의 인수 타입이 any 타입이였기 때문에 error의 타입도 any타입으로 추론된다.  
Promise의 catch 메소드를 사용할 때에는 then 메소드와는 다르게 매개변수의 타입을 정확히 알 수 있는 방법이 없다.  
타입 변수로도 이러한 에러 타입을 확실히 지정해 줄 수 없기 때문에 error 매개변수를 사용할 때에는 타입좁히기를 통해 에러의 타입이 string일 경우 로그로 출력하는 등 프로젝트의 상황에 맞게 에러의 형태에 맞춰 타입을 잘 좁혀 사용하면 된다.  
*/
promiseB.catch((error) => {
  console.log(error)
})
/* 
정리하자면 Promise는 제네릭 클래스를 기반으로 타입이 선언되어 있기 때문에 타입 변수로 resolve에 대한 타입 즉, 비동기 처리의 결과값의 타입을 정의해줄 수는 있지만 반대로 실패했을 때 reject의 매개변수 타입은 지정해줄 수 없다.  
추가로 타입 변수 정의를 생략할 경우 기본적으로 비동기 작업 처리의 결과값이 unknown타입으로 추론된다.  
자바스크립트의 Promise를 거의 그대로 사용하면서, 타입 변수에 어떤 타입을 할당할지만 명시해주면 되기 때문에 생각보다 어렵지는 않다.  
그러나 보통 Promise는 실제 프로덕션을 만들 때 위와같이 직접 정의해서 사용하기 보다는, 어떤 데이터를 불러오는 함수의 반환값으로 자주 쓴다.  
Promise를 반환하는 함수의 타입을 예제코드로 정의해보도록 한다.
*/

/* 
### 예제2) Promise를 반환하는 함수의 타입 정의

서버로부터 한개의 게시글 데이터를 불러오는 함수를 만들어 본다.  
1. 인터페이스로 게시글의 타입을 먼저 정의한다.  
Post 인터페이스를 정의하고 number타입의 프로퍼티 id, string타입의 프로퍼티 title, content를 선언해준다.  
*/
interface Post {
  id: number;
  title: string;
  content: string;
}
/* 
2. 게시글을 불러오는 함수를 만든다.  
마땅히 게시글을 보관하고 있는 서버도, 데이터베이스도 없으므로 임시로 Promise객체를 반환하도록 한다.  
이때 비동기 작업으로 setTimeout을 이용하여 3초 뒤 resolve를 호출하고 resolve안에 임시 게시글 하나를 반환하는 함수로 만든다.  
*/
function fetchPost() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: '게시글 제목',
        content: '게시글 내용'
      })
    }, 3000)
  })
}
/* 
3. 변수를 선언하여 fetchPost() 함수를 호출한 결과값을 저장한다.  
postRequest 변수에는 fetchPost함수가 반환하는 Promise 객체가 할당되게 된다.  
*/
const postRequest = fetchPost();
/* 
4. then 메소드를 통해 결과값을 처리한다.  
then 메소드의 콜백함수에 게시글을 받을 매개변수를 지정하고, id 프로퍼티에 접근할 경우, 오류가 발생한다.  
타입스크립트에서 Promise객체를 사용할 때 타입변수를 직접 할당해주지 않으면 비동기 처리의 결과값이 unknown타입으로 추론된다.  
즉, Promise의 resolve 메소드의 매개변수가 unknown타입이기 때문에 기본 객체처럼 취급할수 없어 id 프로퍼티에 접근이 불가능하기 때문에 오류가 발생한다.  
*/
postRequest.then((post) => {
  post.id // [Error] 'post' is of type 'unknown'.ts(18046)
})

/* 
해당 문제를 해결하기 위해 fetchPost() 함수의 반환값인 Promise 객체에 타입변수를 할당한다.  
fetchPostA 함수의 반환값의 타입이 `function fetchPostA(): Promise<Post>`와 같이 Promise<Post> 타입으로 잘 추론된다.  
(Promise는 클래스이기 때문에 타입으로도 활용할 수 있다.)  
결과적으로 Promise 객체의 then 메소드에서도 `post: Post`와 같이 Post 인터페이스로 잘 추론이 된다.
*/
function fetchPostA() {
  return new Promise<Post>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: '게시글 제목',
        content: '게시글 내용'
      })
    }, 3000)
  })
}
const postRequestA = fetchPostA();
postRequestA.then((post) => {
  console.log(post.id)
})
/* 
반환 값 자체의 Promise객체에 타입 변수를 직접 정의하지 않고 fetchPostB함수의 반환 타입으로 `Promise<Post>` 자체를 지정해줘도 해결이 가능하다.  
이 또한 Promise 객체의 then 메소드에서도 `post: Post`와 같이 Post 인터페이스로 잘 추론이 된다.
*/
function fetchPostB(): Promise<Post> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: '게시글 제목',
        content: '게시글 내용'
      })
    }, 3000)
  })
}
const postRequestB = fetchPostB();
postRequestB.then((post) => {
  post.id
})

/* 
첫번째 방법인 fetchPost함수의 return값으로 Promise 객체의 생성 시점에 타입변수를 전달하는 방법과
두번쨰 방법인 fetchPost함수의 반환타입으로 타입변수를 적용한 Promise 객체를 지정하는 방법 중 특별한 경우가 아니라면 두번째 방식을 추천한다.  
협업의 관점에서 동료들이 코드를 볼 때 함수의 선언 부분만 보고도 fetchPost 함수는 promise로 Post 타입을 반환하는것을 바로 확인할 수 있기 때문에 협업 관점에서 가독성이 좋다고 말할 수 있다.  
물론 위와같이 단순한 코드는 return문을 보고 직접 추려내도 문제가 되진 않겠으나, 만약 함수 내부가 계속해서 길어진다면 반환값의 타입을 직접 정의해주지 않으면 return문의 타입을 찾으려고 함수를 계속 살펴봐야 한다.  
*/