/* 
## Readonly<T>
Readonly란 읽기전용, 수정불가 라는 뜻이다.  
따라서 해당 타입은 특정 객체 타입에서 모든 프로퍼티를 읽기 전용 프로퍼티로 만들어주는 유틸리티 타입이다.  

### 예제)
*/

interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

const readonlyPost:Post = {
  title: '보호된 게시글 입니다.',
  tags: [],
  content: ''
}
readonlyPost.title = '';
/* 
변수의 프로퍼티에 접근하여 값을 변경하더라도 특별한 오류 없이 수정이 가능하다.  

위 변수의 타입을 그냥 Post가 아닌 Readonly<Post> 로 변경할 경우 프로퍼티에 접근하여 값을 수정시 오류가 발생한다.  
*/
const readonlyPostA:Readonly<Post> = {
  title: '보호된 게시글 입니다.',
  tags: [],
  content: ''
}
readonlyPostA.title = ''; // [Error] Cannot assign to 'title' because it is a read-only property.ts(2540)
/* 
이제 Readonly 유틸리티 타입을 직접 구현해보도록 한다.  

Partial, Required 타입과 동일하게 맵드 타입을 활용하면 된다.  
*/
type ReadonlyA<T> = {
  readonly [key in keyof T]: T[key]
}
/* 
위와 같이 맵드 타입에서 콜론 기준 좌항 대괄호 앞에 `readonly` 키워드를 붙힐 경우 모든 프로퍼티가 readonly 프로퍼티가 된다.  
*/

const readonlyPostB:ReadonlyA<Post> = {
  title: '보호된 게시글 입니다.',
  tags: [],
  content: ''
}
readonlyPostB.title = ''; // [Error] Cannot assign to 'title' because it is a read-only property.ts(2540)
/* 
적용해보면 실제 유틸리티 타입과 마찬가지로 수정시 오류가 발생한다.
*/

