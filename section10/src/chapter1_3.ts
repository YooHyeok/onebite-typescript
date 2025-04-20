/* 
## Record<T, K>

레코드 타입은 두개의 타입 변수 K와 V를 사용한다.  
객체 타입을 새롭게 정의할 때 인덱스 시그니처 문법처럼 유연하지만 조금 더 제한적인 객체 타입을 정의할 때 자주 사용되며 실무에서 굉장히 자주 사용된다.  

### 예제) 썸네일 기능 업그레이드  
사용자의 화면 크기에 따라 같은 썸네일이라도 여러 버전으로 준비해서 보여주는 경우가 있다.  
PC, 태블릿, 스마트폰에 따라 크기가 다른 썸네일을 보여줄 수 있는 기능을 제공하기 위해 썸네일의 타입을 분리해본다.  
string타입의 url 프로퍼티를 갖는 객체 타입 프로퍼티 large, medium, small 3개를 정의한다.  
*/
type ThumbnailA = {
  large: {
    url: string
  }
  medium: {
    url: string
  }
  small: {
    url: string
  }
}
/* 
만약 watch라는 새로운 버전이 더 추가되었다고 가정해보자.
*/
type ThumbnailLegacy = {
  large: {
    url: string
  }
  medium: {
    url: string
  }
  small: {
    url: string
  }
  watch: {
    url: string
  }
}
/* 
중복 코드 문제가 보이며, 만약 각 버전 프로퍼티 객체의 url 프로퍼티가 urls 등으로 이름이 변경된다면 모든 프로퍼티를 수정해야하는 비용이 발생한다.  
결론적으로 좋은 코드는 아니다.  
이럴 때 레코드 타입을 이용할 수 있다.  

Record의 첫번째 제네릭 타입변수에 구성하기 위한 버전별 프로퍼티 key를 string 리터럴 유니온 타입으로 지정한 뒤  
두번째 제네릭 타입 변수에 각 버전별 프로퍼티의 구성될 value를 객체 형태로 정의해준다.  
*/
type ThumbnailB = Record<'large'|'mdium'|'small', {url: string}>

/* 
위와같이 딱 한줄만 작성했음에도 위에서 정의한 ThumbnailA와 동일한 타입이 정의된다.  
해당 타입에서 watch타입을 추가해야한다면, 첫번째 제네릭 타입변수의 string 리터럴 유니온 타입에 `'watch'`라는 리터럴 타입을 추가해주기만 하면 된다.  
*/
type ThumbnailC = Record<'large'|'mdium'|'small'|'watch', {url: string}>
/* 
만약 버전별로 새로운 프로퍼티가 추가되어야 한다면 두번째 제네릭 타입변수의 객체에 프로퍼티를 추가해주면 된다.  
*/
type ThumbnailD = Record<'large'|'mdium'|'small'|'watch', {url: string, size: number}>

/* 
### 직접 구현)
Record 타입은 두개의 제네릭 타입 변수를 사용하는 제네릭 타입이기 때문에 Key를 의미하는 K와 Value를 의미하는 V `<K, V>`를 선언해준다.  
다음으로 맵드 타입을 이용하여 `[key in K]: V`를 선언해준다.  
이때 K에 이상한 타입이 들어오지 못하게 `K extends keyof any` 로 K에 제약을 걸어준다.  
keyof any를 extends 한다는 것은 K가 무슨 타입이 될 지 모르겠으나 적어도 타입변수 K에 들어오는 타입은 어떤 타입의 키를 추출해 놓은 유니온 타입이야 라고 정의하는 것이다.  
다시말해 어떤 객체 인지는 모르겠지만 어떤 객체의 키 타입이야 라는 제약을 정의하는 것이다.  
*/
type RecordB<K extends keyof any, V> = {
  [key in K]: V
}
type ThumbnailF = RecordB<'large'|'mdium'|'small'|'watch', {url: string, size: number}>
/* 

*/