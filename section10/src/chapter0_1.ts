/* 
## Partial<T>
Partial이란 영어로 부분적인, 일부분의 라는 뜻이다.
Partial이라는 유틸리티 타입은 특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 바꿔주는 타입이다.  

### 예제1)
블로그 플랫폼을 만든다고 가정하고 게시글을 의미하는 타입 Post를 만들어 본다.  
프로퍼티로 string타입의 title, content와 string[] 타입의 tags 그리고 string타입의 선택적 프로퍼티 thumbnailURL을 구성한다.
*/
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}
/* 
일상적으로 사용하는 티스토리나 벨로그같은 플랫폼들에서는 거의 대부분 임시 저장이라는 기능을 제공한다.  
또한 어떤 게시글을 임시 저장할 때는 모든 게시글의 정보가 다 완성되어 있지 않은 상태일 때가 더 많다.  
따라서 임시 저장된 게시글을 한번 변수로 표현해 보도록 한다.
*/
const draft = {
  title: '제목 나중에 짓자',
  content: '초안...'
}
/* 
위와 같이 title과 content만 있는 임시 저장된 게시글도 분명히 있을 수 있다.  
임시 저장 게시글인 draft 변수도 똑같은 게시글로 취급 할 수 있으니까 Post 타입으로 정의를 해야 하는데 draft 변수에는 tags 프로퍼티가 없기 때문에 오류가 발생한다.  
*/
const draftA: Post = { // [Error] Property 'tags' is missing in type '{ title: string; content: string; }' but required in type 'Post'.ts(2741)
  title: '제목 나중에 짓자',
  content: '초안...'
}
/* 
이럴 때에는 유틸리티 타입인 Partial을 쓰면 좋다.  
draftA 변수 타입을 위와같이 Post로 정의하는것이 아니라 Partial<Post>로 정의해 주는 것이다.  
*/
const draftB: Partial<Post> = {
  title: '제목 나중에 짓자',
  content: '초안...'
}
/* 
Partial<Post> 타입은 제네릭 타입 변수로 전달한 Post타입의 모든 프로퍼티를 다 선택적 프로퍼티로 만드는 유틸리티 타입이다.  
title, tags, content 모두 선택적 프로퍼티가 되기 때문에 오류가 발생하지 않게 된다.  

이번에는 직접 Partial 유틸리티 타입을 직접 구현해 보도록 한다.  

동일한 이름의 타입을 정의하고, any타입을 임시로 할당한다.  
*/
type Partial<T> = any;
const draftC: Partial<Post> = {
  title: '제목 나중에 짓자',
  content: '초안...'
}
/* 
객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 만들어야 한다.  
즉, 특정 객체 타입을 새로운 객체 타입으로 변환하는 작업이 필요하다.  
이럴 때 맵드 타입을 이용한다.  
대괄호를 열고, key in keyof T를 선언할 경우 타입변수 T에 들어오는 객체 타입의 모든 키들을 파셜 타입이 모두 갖게 된다.  
*/
type PartialA<T> = {
  [key in keyof T]
}
/* 
일단 keyof 연산자는 특정 객체 타입으로부터 모든 키를 유니온 타입으로 추출하는 연산자이다.  
그렇기 때문에 T에 할당하는 타입이 Post 타입일 경우 key of T는 `title|tags|content|thumbnailURL` 이 된다. 
key in keyof T에서 in연산자는 맵드 타입에서 제공되는 연산자로 좌항의 키가 우항의 유니온 타입에 하나씩 맵핑된다. 
그래서 T에 할당되는 타입이 Post일 때 키가 한번은 title이고 한번은 tags이고 한번은 content이고 한번은 thumbnailURL이 된다.  
결론적으로 타입변수 T에 들어온 객체 타입의 키를 모두 다 갖게 되는 것이다.  

키 정의는 끝났고, 다음으로 콜론:을 찍어 value의 타입도 정의해 본다.  
value 타입은 `T[key]` 를 지정해 준다.
*/
type PartialB<T> = {
  [key in keyof T]: T[key];
}
/* 
해당 문법은 인덱스드 액세스 타입 이다.  
인덱스드 액세스 타입은 특정 객체나 배열로부터 특정 프로퍼티의 타입을 추출하는 타입이다.  
그렇기 때문에 타입 변수 T에 들어온 객체 타입으로부터 key에 해당하는 프로퍼티의 value 타입을 추출하는 것이다.  
예를들어 Post가 T에 들어온다면 Post에 한번은 title, 한번은 content 와 같이 될것이다.  

다음으로 모든 프로퍼티를 선택적 프로퍼티로 만들어 줘야 하기 때문에 대괄호의 오른쪽에 물음표를 선언해주면 된다.  
*/
type PartialC<T> = {
  [key in keyof T]?: T[key];
}
const draftD: PartialC<Post> = {
  title: '제목 나중에 짓자',
  content: '초안...'
}
/* 
이제 타입변수로 전달한 객체 타입에 모든 프로퍼티를 다 선택적 프로퍼티로 바꾸게 된다.  
*/