/* 
## 인터페이스의 확장
*/

/* 
Super 타입 정의
Animal 객체 타입 인터페이스를 정의한다.
*/
interface Animal {
  name: string;
  age: number;
}

/* 
Sub 타입 정의
Animal 타입이 갖는 name과 age 모든 프로퍼티를 가지면서 추가적인 프로퍼티를 또 갖는 서브타입들을 인터페이스로 추가 정의한다.
*/

interface Dog {
  name: string;
  age: number;
  isBakr: boolean;
}

interface Cat {
  name: string;
  age: number;
  isScrach: boolean;
}

interface Chicken {
  name: string;
  age: number;
  isFly: boolean;
}

/* 
name과 age와 같이 중복된 프로퍼티가 발생한다.  
만약 Animal 타입에 age 프로퍼티가 갑자기 삭제되고, color 프로퍼티로 변경하라는 요구사항이 생겼다면,  
Animal 타입의 프로퍼티만 변경하면 되는게 아닌 모든 서브 타입의 프로퍼티들도 다 바꿔줘야 한다.  
위 예제에서는 서브타입이 3개만 정의했으므로, 빠르게 하려면 할 수는 있겠으나 보통 복잡한 웹서비스를 만들기 위해서 타입들을 정의하고 이용할 때에는 굉장히 다양한 서브타입들이 파생될 수 있다.  
따라서 위와같이 타입을 정의하는것은 아주 불편하고 아주 비효율적인 방식이라고 볼 수 있다.  
바로 이럴 때 인터페이스의 확장이라는 기능을 사용한다.
*/

/* 
Dog타입에서 일단 자신의 수퍼타입인 Animal타입과 중복되는 프로퍼티의 정의들은 제거해주고, 프로퍼티들을 Animal타입으로 부터 받아온다.  
Dog 인터페이스명 옆에 extends Animal 이라고 작성한다.  

*/

interface Dog1 extends Animal {
  isBark: boolean;
}
/* 
여기서 extends란 확장하다 라는 뜻이다.  
이렇게 코드를 작성하면 interface Dog1은 interface Animal을 확장하는 타입이다 라고 정의를 해주는 것이다.  
확장한다는 의미는 기존의 것들을 다 가지고 있는 상태에서 무언가를 더 추가한다는 것이다.  
결국 Animal 인터페이스에 name과 age 라는 모든 프로퍼티를 가지고 있는 상태에서 isBark라는 프로퍼티만 하나 추가하는 타입을 만들겠다는 것이다.  
그래서 이런식으로 인터페이스를 정의하면 Dog1 타입은 name과 age 프로퍼티를 다 갖고 isBark 프로퍼티도 추가로 갖는 객체타입으로 정의가 된다.  
*/

/* 
### Dog1 타입 변수 선언
3개의 프로퍼티 타입을 모두 갖고 있는 Dog1 타입으로 정의된 변수를 통해 확인 가능.
*/
const dog1: Dog1 = {
  name: "",
  age: 0,
  isBark: true
}

/* 
Cat1, Chicken1 인터페이스 타입 확장 적용
*/
interface Cat1 extends Animal {
  isScrach: boolean;
}

interface Chicken1 extends Animal {
  isFly: boolean;
}

/* 
이렇게 extends를 이용해서 다른 인터페이스로부터 해당 인터페이스가 가지고 있는 모든 프로퍼티들을 자동으로 다 포함하도록 해주는 문법을 확장 이라고 한다.  
다른 말로는 `상속`이라고 부른다.  
상속이란 부모님으로부터 가진 재산을 모두 물려받는것을 의미한다.  
타입간의 상속도 Animal타입 같은 수퍼타입으로 부터 Dog나 Cat Chicken 같은 서브타입들에게 수퍼타입이 가지고있는 모든 프로퍼티들을 다 물려받는 과정이라고 이해하면 되겠다.  
*/

/* 
### 프로퍼티 재정의
name을 재정의 할 때 String 리터럴타입으로 다시 정의할 수도 있다.  
이 경우 dog변수에서 오류가 발생한다.
빈 문자열 형식은 hello라는 스트링 리터럴 타입에 할당할 수 없다 라고 오류가 난다.  
여기서 알 수 있는 것은 이렇게 상속을 받는 인터페이스에서 동일한 프로퍼티의 타입을 다시 정의할 수 있다는 것이다.  
Animal타입 에서는 name프로퍼티는 string 타입이였지만 Dog2타입으로 확장(상속) 하면서 다시한번 string 리터럴 타입으로 정의 해줬기 때문에 결과적으로 타입은 스트링 리터럴 타입으로 정의가 된다.  
*/
interface Dog2 extends Animal {
  name: 'hello'
  isBark: boolean;
}

const dog2: Dog2 = {
  name: "", // [Error] Type '""' is not assignable to type '"hello"'.ts(2322)
  age: 0,
  isBark: true
}


/* 
그렇다고 아무 타입으로나 다시 정의할 수 있는것은 아니다.  
다시 정의하려고 하는 타입이 원본 타입의 서브타입이어야만 하는 규칙이 있다.  
다시 정의한 타입이 string 리터럴 타입이기 때문에 string 타입의 서브타입이라서 허용이 됬지만, 만약 string 리터럴 타입이 아닌 number 타입으로 다시 정의하면 허용되지 않고 오류가 발생한다.  
*/
interface Dog3 extends Animal {
  name: number
  isBark: boolean;
}
/*
이러한 규칙이 존재하는 이유는 Dog3타입은 extends Animal 즉, Animal 타입을 확장하는 서브타입이기 때문에 만약 이런식으로 name 프로퍼티의 타입을 number로 정의해버리면 Dog타입에 포함되는 객체가 Animal타입에는 포함될수 없게 된다.  
Dog타입에 포함되는 객체는 name프로퍼티 타입이 number인데, Animal타입에 포함되려면 name 프로퍼티가 string이어야한다.  
즉, Animal타입과 Dog타입이 이제는 수퍼와 서브타입 관계가 아니게 되는 것이다.  
그렇기 때문에 무조건 extends를 사용했을 때는 Animal타입이 Dog타입의 수퍼타입이어야 하기 때문에 동일한 프로퍼티 타입을 재정의 할 때는 반드시 원본 프로퍼티 타입의 서브타입이 되도록 다시 정의를 해줘야 한다.  
만약 이 개념이 복잡하다고 느껴진다면 단순히 원본 프로퍼티 타입의 서브타입으로만 정의해야겠다고 이해하면 된다.
(ex> string 타입 = string 리터럴 타입)
*/


/* 
#### 인터페이스 확장 - 타입 별칭(수퍼)
인터페이스는 이렇게 인터페이스로 만든 객체 타입 말고 수퍼타입이 타입 별칭이였다고 해도 확장할 수 있다.
*/
type AnimalType = {
  name: string;
  age: number;
}
interface Dog4 extends AnimalType {
  name: "hello" // 프로퍼티 서브타입 재정의
  isBark: boolean;
}

/* 
### 다중 확장 (개냥이)
인터페이스는 여러가지 인터페이스를 확장하는 다중 확장이 가능하다.  
DogCat 인터페이스는 Dog타입이 갖고 있는 isBark와 name age를 다 가지면서, Cat 타입이 가지고 있는 isScratch까지 갖게 된다.
*/
interface DogCat extends Dog1, Cat1 {

}
const dogCat: DogCat = {
 name: "",
 age: 0,
 isBark: true,
 isScrach: true 
}

/* 
### 결론
이렇듯 타입스크립트의 인터페이스는 유연하게 타입을 확장해서 사용할 수 있는 문법을 제공하는 등 객체 타입을 다룰 때 꽤 유용하게 사용할 수 있다.  
*/