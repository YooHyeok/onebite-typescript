/* 
## 템플릿 리터럴 타입
템플릿 리터럴 타입은 string 리터럴 타입을 기반으로 특정 패턴을 갖는 문자열 타입들을 만드는 기능이다.  

예제를 통해 살펴보도록 한다.  

예를들어 red, black, green이라는 string 리터럴 유니온 타입인 Color 타입과, dog, cat, chicken 이라는 string 리터럴 유니온 타입인 Animal 타입을 선언해본다.
*/
type Color = 'red' | 'black' | 'green'
type Animal = 'dog' | 'cat' | 'chicken'
/* 
Color와 Animal 각각의 타입의 유니온으로 묶인 string 리터럴 타입들이 - 대시를 기준으로 서로 조합을 만들어 줘야 한다면 아래와 같이 일일이 조합해줘야 할 것이다.  
*/
type ColoredAnimal = 'red-dog' | 'red-cat' | 'red-chicken' | 'black-dog'
/* 
이렇게 일일이 유니언 타입으로 작성하는 것은 굉장히 시간도 오래걸리고, 만약 Color 타입의 red가 reds와 같이 바뀐다면 위의 유니온 타입에서도 수동으로 변경해줘야 하는 불편함이 있다.  
이런 상황에 템플릿 리터럴 타입을 사용할 수 있다.  

아래와 같이 백틱을 통해 템플릿 리터럴을 먼저 만들어 준 다음, - 대시 구분자를 경계로 좌측에는 Color타입을, 우측에는 Animal타입을 할당해준다.  
*/
type ColoredAnimalT = `${Color}-${Animal}`
/* 
이제 ColoredAnimalT 타입은 
```ts
type ColoredAnimalT = "red-dog" | "red-cat" | "red-chicken" | "black-dog" | "black-cat" | "black-chicken" | "green-dog" | "green-cat" | "green-chicken"
```
와 같이 Color에 정의된 모든 유니온 타입들과 Animal에 정의된 모든 유니온 타입들의 모든 타입들이 다 서로 조합된 타입으로 만들어진다.  

템플릿 리터럴 타입은 보통 위와같이 문자열로 여러가지 상황들을 표현해야 하는 경우에 유용하게 사용될 수 있다.  
*/