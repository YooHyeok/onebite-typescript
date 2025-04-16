/* 
## Pick<T, K>
Pick은 영어로 뽑다 또는 고르다 라는 뜻이다.  
즉, Pick타입은 객체 타입으로부터 특정 프로퍼티만 골라내는 타입이다.  

### 예제)
굉장히 오래 된 게시글로 태그나 썸네일이 없었다고 가정해본다.
*/
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}
const legacyPost:Post = {
  title: '옛날 글',
  content: '옛날 컨텐츠',
}
/* 
위와 같이 title과 content 프로퍼티만 갖는 legacyPost의 경우 타입을 Post로 지정할 경우 오류가 발생한다.  
tags 프로퍼티가 없기 때문이다.  
그러나 legacyPost는 옛날 컨텐츠이기 때문에 tags 프로퍼티를 가지지 못하는 상황이라면 Post타입으로 정의하기가 곤란하다.  

이럴 때 Pick타입을 활용할 수 있다.  
Pick타입의 제네릭 타입 변수 T에 Post 타입을 지정하고 K에는 고르고 싶은 프로퍼티만 유니온타입으로 지정한다.  
*/
const legacyPostA: Pick<Post, 'title'|'content'> = {
  title: '옛날 글',
  content: '옛날 컨텐츠',
}
/* 
이렇게 해주면 Pick 타입에 의해서 Post 타입으로부터 title 프로퍼티와 content 프로퍼티만 있는 객체 타입으로 새롭게 타입을 추론해 준다.  
그렇기 때문에 오류가 사라진다.  
*/

/* 
이제 Pick 유틸리티 타입을 직접 구현해보도록 한다.  

Partial, Required, Readonly 타입과 동일하게 맵드 타입을 활용하면 된다.  

T와 K 두개의 제네릭 타입 변수를 받은 뒤 객체를 반환해 줘야 하기 때문에 맵드 타입으로 만들어 준다.  
key in 의 우항에 `keyof T`가 아닌 `K`로 들어온 유니언 타입을 지정하여 key in K로 지정해 준다.  
*/
type PickA<T, K> = {
  [key in K]: T[key] // [Error] Type 'K' is not assignable to type 'string | number | symbol'.ts(2322)
}
/* 
여기까지만 놓고 해석해보면 T타입에 Post같은 객체가 들어오면 K타입에는 프로퍼티를 나열한 유니온 타입이 들어온다.  
맵드 타입을 이용해서 새롭게 만들어지는 객체 타입이 key는 K에 들어오는 유니온 타입인 title이나 content타입이, 각각의 value 타입은 원본 타입이 될것이다.  
그러나 K에 K 타입은 string|number|symbol 유니온 타입에 할당할 수 없다는 오류가 발생한다.  
맵드타입에서 in 연산자 우측에는 key가 뭐가 있는지 표현하기 위해 string 리터럴로 만든 유니온 타입이 들어올 수 있다.  
그러나 타입 변수 K에는 아무런 제약을 걸어놓지 않았기 때문에 함수도 들어올 수 있고, 객체 타입도 들어올 수 있고, never 타입까지도 들어올 수 있다.  
따라서 K에 제한을 줘야한다.  
*/
type PickB<T, K extends keyof T> = {
  [key in K]: T[key]
}
const legacyPostB: PickB<Post, 'title'|'content'> = {
  title: '옛날 글',
  content: '옛날 컨텐츠',
}
/* 
위와 같이 제네릭 변수 K에 `K extends keyof T`로 지정하여 타입 변수 K에 할당할 수 있는 타입은 무조건 T로 들어오는 객체 타입의 키 값들을 추출한 유니온 타입의 서브 타입만 들어올 수 있게 된다.  
만약 T에 Post 타입을 전달할 경우 `K extends keyof 'title' | 'tags' | 'content' | 'thumbnailURL'` 이 된다.  

이 때 타입 변수 K에 `title | content` 유니온 타입이 할당되면 `'title' | 'content' extends keyof 'title' | 'tags' | 'content' | 'thumbnailURL'`이 된다.  
이와같은 조건식은 extends keyof를 기준으로 좌측의 K에 해당하는 `'title' | 'content'` 유니온 타입이 우측의 T에 해당하는 `'title' | 'tags' | 'content' | 'thumbnailURL'` 유니온 타입의 서브타입이 참인지에 대한 조건식이 된다.  
해당 조건식은 결과적으로 참이 된다.
좌측의 `'title' | 'content'` 타입은 우측의 `'title' | 'tags' | 'content' | 'thumbnailURL'`타입에 포함되는 타입이기 때문이다.  
*/

const legacyPostC: PickB<Post, number> = {
  title: '옛날 글',
  content: '옛날 컨텐츠',
}
/* 
만약 위처럼 제네릭 타입 변수 K에 number타입을 지정하면 어떻게 될까?
조건식은 `number extends keyof 'title' | 'tags' | 'content' | 'thumbnailURL'`이 되어버려 거짓이 된다.  
number 타입과 `'title' | 'tags' | 'content' | 'thumbnailURL'` 유니온 타입은 아무런 상관관계가 없기때문에 조건식이 거짓이 되어 제약조건에 일치하지 않게 된다.  
따라서 타입 변수에 `K extends keyof T`를 지정할 경우 적어도 K 타입 변수에 객체 프로퍼티 키만 전달할 수 있을 뿐 number같은 뚱딴지 같은 타입을 넣을 수 없도록 제한해준다.  
*/