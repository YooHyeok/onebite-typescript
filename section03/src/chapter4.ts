/**
# 대수 타입
→ 여러개의 타입을 합성해서 새롭게 만들어낸 타입
→ 대수 타입에는 합집합 타입과 교집합 타입이 존재
 */

/**
## 1. 합집합 - Union 타입
합집합 타입은 영어로 유니온 타입이라고 부르기도 한다.  
유니온이라는 단어는 우리말로 합집합이라는 뜻이다.  
예를들어 number 그리고 string 같은 두가지의 타입이 있을 때 number타입에는 숫자 값만, string타입에는 문자열 값만 들어올 수 있기 때문에 
교집합이 없는 두가지의 집합으로 볼 수 있다.
number타입과 string타입의 합집합은 `let a: string | number` 과 같이 | bar 기호를 활용하여 정의한다.  
이제 이 변수 a에는 숫자값도 할당할 수 있고 문자값도 할당할 수 있게 된다.  
a라는 변수에 number 타입과 string 타입의 합집합을 정의해 놨기 때문에 1같은 number 타입에 해당(포함되는)하는 값도 할당할 수 있고, 
"hello" 같은 string타입에 포함되는 문자열 값도 할당할 수 있는것이다.  
참고로 이렇게 만든 union타입은 string number union 타입 이라고 부를 수 있다.  
 */
let a: string | number;
a = 1;
a = "hello";

/**
### 예제1)
a와 같은 union타입 변수 b가 있다고 가정할때, b = true; 와 같이 boolean 타입도 할당하기 위해서는 아래와 같이 변수 선언시 boolean타입또한 bar|를 통해 union타입으로 정의해 준다.
이렇게 union타입을 만들 때 bar|를 이용해서 추가할 수 있는 타입의 개수는 무한대이다.  
undefined, null, 객체 모두 다 넣을 수 있기 때문에 개발할 때 필요한 만큼 union타입으로 여러개의 타입을 묶어 정의할 수 있다.  
 */
let b: string | number | boolean;
b = true;

let c: string | number | boolean | undefined | null | {} | unknown | never;

/**
### 예제2)
일반적으로 배열의 타입을 정의할때는 string[] 혹은 number[]와 같이 정의한다.  
배열의 타입에서도 아래와 같이 실제 타입을 작성하는 영역에 소괄호를 선언하고 그 안에 타입을 bar|로 구분하여 union타입을 구성할 수 있다.  
 */
let arr: number[] = [1, "hello", true];

/**
### 예제3) 객체 타입들을 활용한 유니온 타입
name과 color 프로퍼티를 갖는 Dog 타입과 name과 language프로퍼티를 갖는 Person 타입을 만든다.  
type 별칭을 이용하여 Union1이라는 타입을 bar|를 활용하여 Dog와 Person에 대한 Union타입으로 정의한다.  
이렇게 타입 별칭을 이용해서도 객체 union타입을 만들 수 있다.  
다음으로 이렇게 생성된 Union1 타입의 객체 union1 변수를 선언하고 객체 리터럴 값을 할당한다.
이때 객체의 프로퍼티는 마치 Dog 타입의 객체를 만들듯이 name과 color 프로퍼티만 있도록 초기화 한다.
추가로 Person타입의 객체를 만들듯 union2 변수를 Union1 타입으로 정의하고 name과 language 프로퍼티만 있도록 초기화 한다.  
마지막으로 Dog타입과 Person타입의 모든 프로퍼티를 다 갖고 있는 name, color, language 프로퍼티를 모두 초기화 한다.  
이렇게 Dog타입, Person타입, Dog|Person Union타입 3가지 유형으로 초기화 하여도 오류가 발생하지 않는다.  
 */
type Dog = {
  name: string;
  color: string;
}
type Person = {
  name: string;
  language: string;
}

type Union1 = Dog | Person

/* Dog 타입 */
let union1: Union1 = {
  name: "",
  color: ""
}

/* Person타입 */
let union2: Union1 = {
  name: "",
  language: ""
}

/* Dog | Persion - Union타입 */
let union3: Union1 = {
  name: "",
  color: "",
  language: ""
}

/**
아래와 같이 Dog타입과 Person타입이 공유하는, 즉 동시에 가지고 있는 name이라는 프로퍼티만 가지고 있는 객체를 값으로 할당한다.
이 경우 오류가 발생한다.  
union1에서 Dog타입에 해당하는 객체를 할당했을 때와, union2에서 Person타입에 해당하는 객체를 할당했을 때, 그리고 Dog, Person 두개의 타입의 모든 프로퍼티를 다 갖는 객체를 할당했을 때 
이렇게 3가지 경우는 허용이 되었는데 두 타입이 공통적으로 가지고 있는 name이라는 프로퍼티만을 구성하고있는 객체는 허용이 안된다.  
Dog타입과 Person타입의 관계적 집합 관점에서 본다면 Dog타입과 Person타입은 누구도 서로의 슈퍼타입이거나 서브타입이지 않고 그냥 교집합을 가지고 있는 타입이다.  
이러한 관계를 갖는 이유는 Dog와 Person타입이 각각 color와 language라는 서로에게 없는 프로퍼티를 가지고 있기 때문이다.  
예를들어 어떤 객체가 있다고 가정했을 때 name과 color프로퍼티만 갖는 객체가 있다고 하면 `{name, color}` 이 객체는 Dog타입에만 포함된다.  
Person타입에 해당이 되려면 이 객체에 language 프로퍼티가 있어야 되기 때문이다.  
추가로 `{name, language}`와 같이 name과 language프로퍼티가 있는 객체가 있다고 하면 이 객체는 Dog타입에는 포함되지 않고 Person타입에만 포함된다.  
마지막으로 `{name, color, language}`와 같이 name, color, language 3개의 프로퍼티를 다 가지고 있는 객체가 있다면 
name과 color가 있기 때문에 Dog에도 포함되고 name과 language가 있기 때문에 Person에도 포함이 된다.  
그렇기 때문에 양쪽 모두 집합에 포함되는 객체는 교집합에 존재하게 된다.  

다른 관점에서 보면 name 프로퍼티만 갖고 있는 union4는 Dog타입에도 포함될 수 없고, Person 타입에도 포함될 수 없다. 
Dog 타입에 포함되기 위해서는 Dog타입이 가지고 있는 모든 프로퍼티를 가진 객체만 가능하고, Person 타입에 포함되기 위해서는 Person타입이 가지고 있는 모든 프로퍼티를 가진 객체만이 가능한것 처럼 
어떤 객체에 포함 되기 위해서는 포함할 대상 객체의 모든 프로퍼티를 가지고 있어야 하기 때문이다.  
이것이 바로 프로퍼티 관점이 아닌 객체 값(구조) 관점에서 바라보는 집합이다.
이러한 객체 값(구조) 관점에서 바라볼때 수학적으로 합집합인 원리가 타입스크립트 에서는 교집합으로 정의된다.  

따라서 집합 관점으로 보는 타입스크립트의 원리로 인해 name프로퍼티만 갖는 union4 객체는 Dog도, Person도 아닌 합집합 바깥에 있기 때문에 
Union1 이라는 합집합 타입 안에 포함되지 않으므로 오류가 발생한다.  

결론: Union타입은 객체들 중 한쪽 타입에 포함되는 객체이거나 모두 다 포함되는 교집합에 위치하는 객체들만 Union타입에 포함된다
 */
/* Type '{ name: string; }' is not assignable to type 'Union1'.
  Property 'language' is missing in type '{ name: string; }' but required in type 'Person'.ts(2322) */
let union4: Union1 = {
  name:""
}

/* 
## 2. 교집합 타입 - Intersection 타입  
변수를 선언한 뒤 교집합으로 정의하려는 타입들 중간에 & 연산자를 활용하여 선언한다.  
number 타입과 string 타입의 교집합 타입은 무슨 타입일까?  
number 타입과 string타입을 집합으로 두고 보면 교집합을 가지고 있지 않은 형태이다.  
number 타입은 숫자값만, string타입은 문자열 값만 포함되기 때문이다.  
그렇기 때문에 아래 변수에 마우스 커서를 올려보면 `let variable: never` 와 같이 never 타입으로 타입추론 되어있는것을 확인할 수 있다.  
never타입이란 불가능한 타입으로 집합으로 표현하면 공집합을 의미하는 타입이다.  
number 타입과 string 타입의 교집합은 공집합이기 때문에 never타입으로 타입 추론이 된것이다.  
이렇듯 Intersection 타입 즉, 교지합 타입은 &연산자를 이용해 여러개의 타입 간 교집합 타입을 만들 수 있는 타입이다.  
기본타입들을 가지고 Intersection 타입을 만들면 대부분이 never 타입이다.  
기본 타입들 중에서는 서로 공유하거나 겹치는 값들이 없기 때문이다.  
따라서 보통 Intersection타입, 교집합 타입은 객체 타입에 많이 사용한다.
*/
let variable: number & string;

/* 
### 객체 교집합 타입
Cat 타입과 Human 타입의 교집합 타입을 정의해본다.
타입 별칭을 통해 Cat타입과 Human타입을 &연산자를 활용하여 Intersection이라는 타입에 할당한다.  
이 Intersection타입 즉, Cat과 Human의 교집합 타입은 과연 어떤 객체들을 포함할까?  
Cat 타입의 프로퍼티들과 Human 타입의 프로퍼티를 다 가지고 있는 {name, color, language} 형태의 객체들만 포함하게 된다.  
만약 프로퍼티가 단 1개라도 빠지면 해당 교집합 타입에 포함되지 않게된다.  
다시 한번 Cat과 Human타입의 관계를 빠르게 살펴보면 타입스크립트의 프로퍼티 관점이 아닌 객체 값(구조) 관점에서 바라보는 집합에서 교집합의 경우 
Cat타입{name, color}과 Human타입{name, language}이 가지고 있는 모든 프로퍼티를 가진 객체가 바로 타입스크립트의 교집합으로 정의되기 때문이다.  
결론적으로 Cat타입과 Human타입의 교집합에 해당하는 객체는 오직 Cat타입과 Human타입의 모든 프로퍼티를 다 갖고 있는 객체만 교집합 타입으로 포함될 수 있다.  
따라서 language같은 프로퍼티라도 하나라도 생략하면 포함되지 않고 오류가 발생하게 된다.  
*/
type Cat = {
  name: string;
  color: string;
}
type Human = {
  name: string;
  language: string;
}

type Intersection = Cat & Human;

/* Type '{ name: string; color: string; }' is not assignable to type 'Intersection'.
  Property 'language' is missing in type '{ name: string; color: string; }' but required in type 'Human'.ts(2322) */
let intersection: Intersection = {
  name:"",
  color: "",
  // language: ""
}