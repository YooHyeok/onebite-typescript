/* 
## Omit<T,K>

Omit은 우리말로 생략하다 또는 빼다 라는 뜻을 가진다.  
유틸리티 타입 Pick과는 반대로 객체 타입으로부터 특정 프로퍼티를 제거하는 타입이다.  
예를들어 오늘날 유행하는 페이스북이나 링크드인 트위터 같은 SNS에는 제목이 있는 게시글도 있고 없는 게시글도 있다.  
제목이 없는 게시글을 Omit 타입의 예제코드로 만들어 보도록 한다.  

### 예제) Pick 적용
*/
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}
const noTitlePost: Post = {
  content: "",
  tags: [],
  thumbnailURL: "",
}
/* 
noTitlePost 객체에 content, tags, thumbnailURL을 프로퍼티로 구성했다.  
Post타입에 정의한 title 프로퍼티가 없기 때문에 오류가 발생하게 된다.  
이럴 때 Pick타입을 이용해서 Post타입으로 부터 content, tag, thumbnailURL을 뽑아주면 된다.
*/
const noTitlePostA: Pick<Post, "content"|"tags"|"thumbnailURL"> = {
  content: "",
  tags: [],
  thumbnailURL: "",
}
/* 
그런데 지금은 Post타입의 프로퍼티가 몇개 안돼서 괜찮지만 만약 골라내야 되는 더 프로퍼티가 많아지면 많아질수록 타입 정의하는 것이 점점 더 힘든 일이 될 것이다.  
그래서 바로 이럴 때 Omit타입을 이용하면 좋다.  

### 예제) Omit 적용
`Omit<Post, "title">` 과 같은 형태로 Omit 타입을 지정할 경우 두번째 제네릭 타입 변수에 들어오는 리터럴 타입에 해당하는 프로퍼티를 제외하게 된다.  
*/
const noTitlePostB: Omit<Post, "title"> = {
  content: "",
  tags: [],
  thumbnailURL: "",
}

/* 
### Omit 타입 직접 구현
`Omit<T, K>` 타입은 제네릭 타입변수 K로 들어오는 객체 타입의 키를 제한해야 한다.  
따라서 `K extends keyof T`와 같이 제약을 걸어주도록 한다.  
다음으로 T에서 K 프로퍼티만 제거한 객체 타입을 만들기 위해 Pick타입을 이용한다.  
Pick타입의 첫번째 제네릭 타입변수에 T를 그대로 전달한다.
Pick타입의 두번째 제네릭 타입변수에 Exclude 타입을 사용하여 `Exclude<keyof T, K>`를 작성한다.  
Pick타입을 완성하면 다음과 같다.
Pick<T, Exclude<keyof T, K>>
*/
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/* 
T = Post, K = "title"을 기준으로 제네릭 타입변수에 적용하여 문법을 해석해보도록 한다.  
좌항의 타입인 Omit에 적용해본다.  
`Omit<Post, "title" extends keyof Post>`  
우항의 타입인 Pick에 적용해본다.  
`Pick<Post, Exclude<keyof Post, "title">>`  

다음으로는 `Exclude` 타입의 제네릭 타입을 살펴본다.  
Exclude는 분산적 조건부 타입에서 두개의 타입 변수T, K를 받아 T 타입에서 K 타입변수를 제거한 타입을 반환하는 타입이다.  
첫번째 타입변수 keyof Post를 통해 Post의 모든 프로퍼티 {title, content, tags, thumbnailURL}를 나열한다.  
두번째 타입 변수로 "title"을 보냈으므로 첫번째 타입 변수에서 title을 제거하여 {content, tags, thumbnailURL}만 가진 타입을 반환하게 되었다.  

Exclude 문법을 실제로 풀어보면 아래와 같이 표현이 가능하다.  
1. `Pick<Post, Exclude<'title'|'content'|'tags'|'thumbnailURL', 'title'>`  
2. `Pick<Post, 'content', 'tags', 'thumbnailURL'>`  

마지막으로 Pick타입은 첫번째 제네릭 타입변수 Post로 부터 두번째 제네릭 타입변수에 들어온 유니온 타입에 해당하는 프로퍼티들만 추출하게 된다.  
결국 'content', 'tags', 'thumbnailURL' 타입만 존재하는 Post타입이 된다.  

*/