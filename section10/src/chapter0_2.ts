/* 
## Required<T>
Required는 우리말로 필수의, 또는 필수적인 이라는 뜻이다.  
Required 타입은 Partial타입과는 반대로 특정 객체의 모든 프로퍼티를 필수 프로퍼티로 바꿔주는 타입이다.  

### 예제)
thumbnail도 반드시 포함된 게시글이 하나 필요하다고 가정하여 변수를 선언해준 뒤 Post타입을 지정한다.  
*/
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}
const withThumbnailPost: Post = {
  title: '한입 타스 후기',
  tags: ['ts'],
  content: '',
  thumbnailURL: 'https://...'
}
/* 
이때 thumbnailURL 프로퍼티는 Post 타입을 정의할 때 선택적 프로퍼티로 정의했기 때문에 사실 존재하지 않더라도 오류가 발생하지 않는다.  
*/
const withThumbnailPostB: Post = {
  title: '한입 타스 후기',
  tags: ['ts'],
  content: '',
}
/*
하지만 현재 withThumbnailPost 변수에는 thumbnail이 반드시 있어야 한다.  
그렇기 때문에 위와같이 변수의 타입을 정의하는 것은 문제가 될 수 있다.  

바로 이런 상황에서 Required 타입을 이용하면 좋은 상황이다.  
아래와 같이 지정한 Post 타입을 Required<Post> 타입으로 변경해준다.
*/
const withThumbnailPostC: Required<Post> = { // [Error] Property 'thumbnailURL' is missing in type '{ title: string; tags: string[]; content: string; }' but required in type 'Required<Post>'.ts(2741)
  title: '한입 타스 후기',
  tags: ['ts'],
  content: '',
}
/* 
Required라는 유틸리티 타입은 제네릭 타입 변수로 전달한 Post 타입에서 모든 프로퍼티를 필수 프로퍼티로 바꿔주는 타입이기 때문에 thumbnailURL 같은 선택적 프로퍼티도 필수 프로퍼티가 되어 반드시 사용하도록 오류를 발생시켜 갖에할 수 있다.  
*/
const withThumbnailPostD: Required<Post> = { // [Error] Property 'thumbnailURL' is missing in type '{ title: string; tags: string[]; content: string; }' but required in type 'Required<Post>'.ts(2741)
  title: '한입 타스 후기',
  tags: ['ts'],
  content: '',
  thumbnailURL: 'https://...'
}
/* 
필수 프로퍼티로 누락된 thumbnailURL 프로퍼티를 다시 추가할 경우 오류가 사라진다.  

이러한 Required 유틸리티 타입도 직접 구현해보도록 한다.  
Partial 타입을 직접 만들때와 동일하게 맵드 타입을 활용한다.
*/
type RequiredA<T> = {
  [key in keyof T]-?: T[key]
}
/* 
이때 Partial과 반대로 모든 프로퍼티가 선택적이지 않은 프로퍼티로 바꿔줘야 한다.  
선택적 프로퍼티의 속성은 프로퍼티 이름 뒤에 물음표가 붙는 형태이다.  
즉, 이 물음표를 없앨 경우 선택적이지 않은 프로퍼티가 되는 것이다. 
그런 의미에서 ?앞에 -를 붙혀 -?를 지정할 경우 물음표를 빼겠다는 의미로 Required 타입이 된다. 
 */
const withThumbnailPostE: RequiredA<Post> = { // [Error] Property 'thumbnailURL' is missing in type '{ title: string; tags: string[]; content: string; }' but required in type 'Required<Post>'.ts(2741)
  title: '한입 타스 후기',
  tags: ['ts'],
  content: '',
}

const withThumbnailPostF: RequiredA<Post> = { // [Error] Property 'thumbnailURL' is missing in type '{ title: string; tags: string[]; content: string; }' but required in type 'Required<Post>'.ts(2741)
  title: '한입 타스 후기',
  tags: ['ts'],
  content: '',
  thumbnailURL: 'https://...'
}
/*  */