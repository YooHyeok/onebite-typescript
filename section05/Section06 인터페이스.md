# [메인 마크다운.md](README.md)
<br>


# 인터페이스

## 인터페이스
<details>
<summary>펼치기/접기</summary>
<br>

인터페이스란 타입 별칭과 동일하게 타입의 이름을 지어주는 문법이다.  

### 타입별칭
  ```ts
  type A = {
    a: string;
    b: number;
  }
  ```
### 인터페이스
  ```ts
  interface A = {
    a: string;
    b: number;
  }
  ```

인터페이스라는 뜻은 우리말로 상호간 약속된 규칙이라는 뜻이다.  
즉, 이 객체는 이런 형태를 가져야 해 같은 일종의 약속 또는 규칙을 만들어주는 문법이다.  
또한 인터페이스는 객체 타입을 정의하는 데 특화된 문법이다.  
그렇기 때문에 인터페이스는 타입 별칭에서는 제공하지 않는 상속이나 합침 등의 객체 타입을 다루는 여러가지 특수한 기능들을 제공한다.  
결론적으로 우리가 인터페이스를 잘 이용하면 앞으로 객체 타입 정의를 할 때 훨씬 편하고 효율적이고 다양한 방법으로 정의할 수 있다.  

### 인터페이스 예제
인터페이스를 이용하여 간단한 객체 타입을 정의해본다.  
타입 별칭과는 다르게 등호 없이 바로 중괄호를 열어준다.  
마치 Enum을 정의할때와 비슷하다.  
중괄호 내부에 객체 프로퍼티 타입을 정의해준다.  
- src/Chapter0.ts
  ```ts
  interface PersonA {
    name: string;
    age: number;
  }
  ```
name과 age 프로퍼티를 갖는 Person이라는 객체 타입을 정의하였고, 해당 타입을 갖는 변수도 정의해본다.
- src/Chapter0.ts
  ```ts
  const personA: PersonA = {
    name: '유혁스쿨',
    age: 27
  }

  ```
위와같이 인터페이스로 만든 타입도 타입 별칭으로 만든 타입들과 동일하게 타입주석을 이용해 변수에 타입을 정의할 때 사용할 수 있다.  
인터페이스는 타입을 정의하는 이런 문법들만 조금 다른 뿐 타입 별칭과 기본적인 기능은 같다.  

### 인터페이스 선택적 프로퍼티
인터페이스도 타입 별칭과 같이 age 프로퍼티에 물음표를 붙혀 선택적 프로퍼티로 설정해 줄 수 있다.  
이렇게 되면 age는 없어도 되는 프로퍼티가 된다.
- src/Chapter0.ts
  ```ts
  interface PersonB {
    name: string;
    age?: number;
  }
  const personb: PersonB = {
    name: '유혁스쿨',
  }
  ```
### 인터페이스 readonly 프로퍼티
name 프로퍼티 앞에 readonly 키워드를 붙혀 name 프로퍼티를 읽기 전용 프로퍼티로 만들어줄 수도 있다.
- src/Chapter0.ts
  ```ts
  interface PersonC {
    readonly name: string;
    age?: number;
  }

  const personC: PersonC = {
    name: '유혁스쿨',
  }

  personC.name = '코더홀릭' // [Error] Cannot assign to 'name' because it is a read-only property.ts(2540)
  ```

### 인터페이스 메소드 프로퍼티
sayHi()라는 추가적인 메소드 프로퍼티가 있다고 가정했을 때, 
메소드 역시 인터페이스에서 타입별칭과 똑같이 타입 정의가 가능하다.
- src/Chapter0.ts
  ```ts
  interface PersonD {
    sayHi: () => void
  }

  const personD: PersonD = {
    sayHi: function () {
      console.log("Hi")
    }
  }
  ```

### 인터페이스 메소드 호출 시그니처
아래와 같이 함수 표현식이 아닌 메소드 호출시그니처를 이용할 수도 있다.
(기본적인 호출 시그니처와 다르게 메소드의 이름이 소괄호 앞에 붙는다는 점)
- src/Chapter0.ts
  ```ts
  interface PersonE {
    sayHi(): void
  }
  ```

#### 예외 부록 - 메소드 호출 시그니처와 함수타입 정의
아래와 같이 객체 타입 타입 별칭으로 블록 내부에 함수 호출 시그니처를 써주면 실제로 함수 타입을 정의하는 문법이다.  
따라서 sayHello와 같은 프로퍼티의 타입을 정의할 때는 앞에 이름을 꼭 붙혀줘야한다.  
- src/Chapter0.ts
  ```ts
  type Func = {
    (): void;
  };
  const func: Func = () => {};
  ```
### 메소드 오버로딩
함수타입 표현식을 이용하면 안되고, 호출 시그니처를 이용해야한다.  
호출 시그니처를 이용할 경우, 똑같은 메소드 타입을 두번 정의하여 오버로드 시그니처 두개를 정의할 수 있는 반면,  
함수 타입 표현식으로 작성하게 되면 Duplicate identifier 'sayHi'.ts(2300) 라는 중복 오류메시지가 출력되면서 오버로드 시그니처를 알아듣지 못한다.  
- src/Chapter0.ts
  ```ts
  interface PersonF { // 함수타입 표현식오버로딩 [비정상]
    sayHi: () => void; // [Error1] Duplicate identifier 'sayHi'.ts(2300)
    sayHi: (a:number, b:number) => void // 추가시 에러 발생 [Error2] Duplicate identifier 'sayHi'.ts(2300)
  }

  const personF: PersonF = {
    sayHi: function () {
      console.log("Hi")
    }
  }

  personF.sayHi();
  personF.sayHi(1, 2);

  interface PersonG { // 함수 호출 시그니처 오버로딩 [정상]
    sayHi(): void;
    sayHi(a:number, b:number): void
  }

  const personG: PersonG = {
    sayHi: function () {
      console.log("Hi")
    }
  }

  personG.sayHi();
  personG.sayHi(1, 2);
  ```
### 타입 별칭과 인터페이스의 차이
인터페이스는 객체 타입을 정의하는 데에 특화되어 있기 때문에 타입별칭과는 몇가지 차이점이 존재한다.  
예를들어 타입 별칭에서는 `number | string` 과 같은 유니온타입을 만들 수 있었고, `number & string`과 같은 인터섹션 타입도 만들 수 있었다.  
그러나 인터페이스에서는 유니온이나 인터섹션 타입은 만들 수 없다.  
따라서 인터페이스로 만든 person 같은 객체의 타입을 만약 인터섹션이나 유니온을 이용해야 한다면 타입 별칭에 활용하는 방법을 사용하거나, 타입 주석에 활용을 해야한다.
- src/Chapter0.ts
  ```ts
  type TypeA = number | string;
  type TypeB = number & string;
  interface PersonH {} | number
  interface PersonI {} & number
  ```

#### 인터페이스에서 타입 주석을 통한 유니온, 인터섹션 타입
- src/Chapter0.ts
  ```ts
  interface PersonK {}
  const personK: PersonK | number = {}
  const personL: PersonK & PersonG = {
    sayHi: function () { // personG의 타입 구현
      console.log("Hi")
    }
  }
  ```

### 인터페이스 명 관례 (헝가리안 표기법)
- src/Chapter0.ts
  ```ts
  interface IPerson {}
  ```
변수나 타입의 이름을 정하는 방식은 사람마다 다 다르고 각자가 속한 회사, 팀마다 다르긴 하지만, I를 붙히는 관습을 사용하는 경우가 꽤 있다.  
그러나 Prefix로 I를 붙히는 헝가리안 표기법 관례는 논란이 조금 있다.  
대문자 I를 붙히는 표기법을 헝가리안 표기법이라고 하는데, 자바스크립트 프로그래밍중에는 잘 사용하지 않는다.  
보통 자바스크립트에서는 snake표기법 혹은 camel 표기법 혹은 첫글자와 중간글자 첫글자를 대문자로 표기하는 Pascal 표기법을 사용한다.  
그러나 인터페이스 하나만을 위해 또 헝가리안 표기법을 사용해야하는가 라는 부정적인 의견들도 꽤 있다.   
</details>
<br>

## 인터페이스 확장
<details>
<summary>펼치기/접기</summary>
<br>

### Super 타입 정의
Animal 객체 타입 인터페이스를 정의한다.
- src/Chapter1.ts
  ```ts
  interface Animal {
    name: string;
    age: number;
  }
  ```
### Sub 타입 정의
Animal 타입이 갖는 name과 age 모든 프로퍼티를 가지면서 추가적인 프로퍼티를 또 갖는 서브타입들을 인터페이스로 추가 정의한다.
- src/Chapter1.ts
  ```ts
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
  ```

name과 age와 같이 중복된 프로퍼티가 발생한다.  
만약 Animal 타입에 age 프로퍼티가 갑자기 삭제되고, color 프로퍼티로 변경하라는 요구사항이 생겼다면,  
Animal 타입의 프로퍼티만 변경하면 되는게 아닌 모든 서브 타입의 프로퍼티들도 다 바꿔줘야 한다.  
위 예제에서는 서브타입이 3개만 정의했으므로, 빠르게 하려면 할 수는 있겠으나 보통 복잡한 웹서비스를 만들기 위해서 타입들을 정의하고 이용할 때에는 굉장히 다양한 서브타입들이 파생될 수 있다.  
따라서 위와같이 타입을 정의하는것은 아주 불편하고 아주 비효율적인 방식이라고 볼 수 있다.  
바로 이럴 때 `인터페이스의 확장` 이라는 기능을 사용한다.

### Animal 인터페이스 확장(Dog 인터페이스)
Dog타입에서 일단 자신의 수퍼타입인 Animal타입과 중복되는 프로퍼티의 정의들은 제거해주고, 프로퍼티들을 Animal타입으로 부터 받아온다.  
Dog 인터페이스명 옆에 extends Animal 이라고 작성한다.  
- src/Chapter1.ts
  ```ts
  interface Dog1 extends Animal {
    isBark: boolean;
  }
  ```

여기서 extends란 확장하다 라는 뜻이다.  
이렇게 코드를 작성하면 interface Dog1은 interface Animal을 확장하는 타입이다 라고 정의를 해주는 것이다.  
확장한다는 의미는 기존의 것들을 다 가지고 있는 상태에서 무언가를 더 추가한다는 것이다.  
결국 Animal 인터페이스에 name과 age 라는 모든 프로퍼티를 가지고 있는 상태에서 isBark라는 프로퍼티만 하나 추가하는 타입을 만들겠다는 것이다.  
그래서 이런식으로 인터페이스를 정의하면 Dog1 타입은 name과 age 프로퍼티를 다 갖고 isBark 프로퍼티도 추가로 갖는 객체타입으로 정의가 된다.  

### Dog1 타입 변수 선언
3개의 프로퍼티 타입을 모두 갖고 있는 Dog1 타입으로 정의된 변수를 통해 확인 가능.  
- src/Chapter1.ts
  ```ts
  const dog1: Dog1 = { // 정상 확장 성공
    name: "",
    age: 0,
    isBark: true
  }
  ```

#### Cat1, Chicken1 인터페이스 타입 확장 적용
- src/Chapter1.ts
  ```ts
  interface Cat1 extends Animal {
    isScrach: boolean;
  }

  interface Chicken1 extends Animal {
    isFly: boolean;
  }
  ```

이렇게 extends를 이용해서 다른 인터페이스로부터 해당 인터페이스가 가지고 있는 모든 프로퍼티들을 자동으로 다 포함하도록 해주는 문법을 확장 이라고 한다.  
다른 말로는 `상속`이라고 부른다.  
상속이란 부모님으로부터 가진 재산을 모두 물려받는것을 의미한다.  
타입간의 상속도 Animal타입 같은 수퍼타입으로 부터 Dog나 Cat Chicken 같은 서브타입들에게 수퍼타입이 가지고있는 모든 프로퍼티들을 다 물려받는 과정이라고 이해하면 되겠다.  

### 프로퍼티 재정의
name을 재정의 할 때 String 리터럴타입으로 다시 정의할 수도 있다.  
이 경우 dog변수에서 오류가 발생한다.
빈 문자열 형식은 hello라는 스트링 리터럴 타입에 할당할 수 없다 라고 오류가 난다.  
여기서 알 수 있는 것은 이렇게 상속을 받는 인터페이스에서 동일한 프로퍼티의 타입을 다시 정의할 수 있다는 것이다.  
Animal타입 에서는 name프로퍼티는 string 타입이였지만 Dog2타입으로 확장(상속) 하면서 다시한번 string 리터럴 타입으로 정의 해줬기 때문에 결과적으로 타입은 스트링 리터럴 타입으로 정의가 된다.  
- src/Chapter1.ts
  ```ts
  interface Dog2 extends Animal {
    name: 'hello'
    isBark: boolean;
  }

  const dog2: Dog2 = {
    name: "", // [Error] Type '""' is not assignable to type '"hello"'.ts(2322)
    age: 0,
    isBark: true
  }
  ```
그렇다고 아무 타입으로나 다시 정의할 수 있는것은 아니다.  
다시 정의하려고 하는 타입이 원본 타입의 서브타입이어야만 하는 규칙이 있다.  
다시 정의한 타입이 string 리터럴 타입이기 때문에 string 타입의 서브타입이라서 허용이 됬지만, 만약 string 리터럴 타입이 아닌 number 타입으로 다시 정의하면 허용되지 않고 오류가 발생한다.  
- src/Chapter1.ts
  ```ts
  interface Dog3 extends Animal {
    name: number // 타입 재정의 에러 발생 - 수퍼타입 Animal에서 해당 프로퍼티가 string 타입으로 정의됨.
    isBark: boolean;
  }
  ```
이러한 규칙이 존재하는 이유는 Dog3타입은 extends Animal 즉, Animal 타입을 확장하는 서브타입이기 때문에 만약 이런식으로 name 프로퍼티의 타입을 number로 정의해버리면 Dog타입에 포함되는 객체가 Animal타입에는 포함될수 없게 된다.  
Dog타입에 포함되는 객체는 name프로퍼티 타입이 number인데, Animal타입에 포함되려면 name 프로퍼티가 string이어야한다.  
즉, Animal타입과 Dog타입이 이제는 수퍼와 서브타입 관계가 아니게 되는 것이다.  
그렇기 때문에 무조건 extends를 사용했을 때는 Animal타입이 Dog타입의 수퍼타입이어야 하기 때문에 동일한 프로퍼티 타입을 재정의 할 때는 반드시 원본 프로퍼티 타입의 서브타입이 되도록 다시 정의를 해줘야 한다.  
만약 이 개념이 복잡하다고 느껴진다면 단순히 원본 프로퍼티 타입의 서브타입으로만 정의해야겠다고 이해하면 된다.
(ex> string 타입 = string 리터럴 타입)

#### 인터페이스 확장 - 타입 별칭(수퍼)
인터페이스는 이렇게 인터페이스로 만든 객체 타입 말고 수퍼타입이 타입 별칭이였다고 해도 확장할 수 있다.
- src/Chapter1.ts
  ```ts
  type AnimalType = {
    name: string;
    age: number;
  }
  interface Dog4 extends AnimalType {
    name: "hello" // 프로퍼티 서브타입 재정의
    isBark: boolean;
  }
  ```
### 다중 확장 (개냥이)
인터페이스는 여러가지 인터페이스를 확장하는 다중 확장이 가능하다.  
DogCat 인터페이스는 Dog타입이 갖고 있는 isBark와 name age를 다 가지면서, Cat 타입이 가지고 있는 isScratch까지 갖게 된다.
- src/Chapter1.ts
  ```ts
  interface DogCat extends Dog1, Cat1 {}
  const dogCat: DogCat = {
  name: "",
  age: 0,
  isBark: true,
  isScrach: true 
  }
  ```

## 결론
***이렇듯 타입스크립트의 인터페이스는 유연하게 타입을 확장해서 사용할 수 있는 문법을 제공하는 등 객체 타입을 다룰 때 꽤 유용하게 사용할 수 있다.***
</details>
<br>

## 인터페이스 합치기 - 선언합침
<details>
<summary>펼치기/접기</summary>
<br>

타입 별칭의 경우 동일한 타입을 두번 정의 하려고 하면 오류가 발생한다.

- src/Chapter2.ts
  ```ts
  
  ```
###  
- src/Chapter2.ts
  ```ts
  type PersonType = {
    name: string;
  }
  type PersonType = {
    age: number;
  }
  ```
### 인터페이스 선언 합침
인터페이스의 경우 동일한 타입을 두번 정의하더라도 오류가 발생하지 않는다.  
동일한 이름으로 두개의 인터페이스로 선언해도 문제가 되지 않는 이유는 해당 인터페이스끼리 결국 다 합쳐지기 때문이다.  
이러한 현상을 선언합침 이라고 부른다.  
- src/Chapter2.ts
  ```ts
  interface IPerson {
    name: string;
  }
  interface IPerson {
    age: number;
  }
  ```
이렇게 두번 선언한 인터페이스를 변수 선언으로 타입 어노테이션에 지정 할 경우 각각의 인터페이스들에 정의된 프로퍼티들이 합쳐진 객체타입으로 정의가 가능해진다.  
즉, 인터페이스는 동일한 이름으로 중복 선언이 가능하고, 그렇게 중복선언을 하면 모든 선언이 합쳐지게 된다.  
이런 특징을 선언 합침, 선언 merging, declaration merging 이라고 부른다.  
- src/Chapter2.ts
  ```ts
  const person: IPerson = {
    name: "",
    age: 0
  }
  ```
### 선언 합침 충돌
만약 IPerson 인터페이스에 name프로퍼티를 number타입으로 재정의 한다면 오류가 발생한다.  
이렇게 동일한 프로퍼티를 중복 정의하는데 타입을 다르게 정의하는 경우를 충돌 이라고 표현한다.  
인터페이스의 선언 합침에서 이런 충돌은 허용되지 않는다.  
- src/Chapter2.ts
  ```ts
  interface IPerson {
    name: number; // [Error] Subsequent property declarations must have the same type.  Property 'name' must be of type 'string', but here has type 'number'.ts(2717)
    age: number;
  }
  ```
만약 똑같은 프로퍼티를 중복정의 해주려면 타입도 똑같이 정의를 해줘야한다.

- src/Chapter2.ts
  ```ts
  interface IPerson {
    name: string; // 정상
    age: number;
  }
  ```

### 서브타입으로 확장
name프로퍼티를 다시 정의할때 꼭 타입이 똑같지 않아도 되었다.  
수퍼 타입 프로퍼티의 원본 타입의 서브타입이기만 하면 허용이 된다.  
이런 확장의 상황과 선언합침의 상황은 다르다.  
확장이 아닌 선언 합침의 경우 서브타입으로 선언해도 문제가 발생한다.  
따라서 반드시 동일한 타입으로만 정의를 해줘야한다.  
- src/Chapter2.ts
  ```ts
  interface Developler extends IPerson {
    name: "hello"
  }
  interface IPerson {
    name: "hello"; // 선언 합침에서 서브타입 불가능.
    age: number;
  }
  ```
### 사용 예 - 모듈 보강
보통 선언합침은 간단한 프로그래밍을 할 때에는 잘 사용되지 않으며 보통 타입스크립트의 모듈, 라이브러리의 타입 정의가 조금 부실한 경우 직접 타입을 좀 더 추가해주고 정확하게 만들어주는 일종의 모듈 보강이라는 작업을 할 때 사용한다.  

에를 들어 lib이라는 객체를 제공해주는 아주 간단한 라이브러리가 있다고 가정한다. 
- src/Chapter2.ts
  ```ts
  interface Lib {
    a: number;
    b: number;
  }
  const lib1: Lib = {
    a: 1,
    b: 1
  }
  ```
이때 만약 lib이라는 객체를 잘 쓰다가 c라는 프로퍼티를 하나 더 추가해줘야하는 상황이 있다고 가정한다.
그러나 보통의 라이브러리는 Lib 인터페이스와 같이 타입 정의가 끝나있을 것이기 때문에 임의대로 객체를 추가할 수 없다.
이럴 때 인터페이스의 선언 합침을 사용할 수 있다.
- src/Chapter2.ts
  ```ts
  const lib2: Lib = {
    a: 1,
    b: 1,
    c: "Hello" // [Error] Object literal may only specify known properties, and 'c' does not exist in type 'Lib'.ts(2353)
  }
  ```
#### 모듈 보강을 위한 Lib 인터페이스 선언 합침
인터페이스 Lib을 다시 정의한 다음 string 타입의 프로퍼티 c를 추가해준다.  
- src/Chapter2.ts
  ```ts
  interface Lib {
    c: string;
  }

  const lib3: Lib = {
    a: 1,
    b: 1,
    c: "Hello"
  }

  ```

</details>
<br>

## 템플릿1
<details>
<summary>펼치기/접기</summary>
<br>

</details>
<br>

## 템플릿2
<details>
<summary>펼치기/접기</summary>
<br>

  ### 템플릿
  <details>
  <summary>펼치기/접기</summary>
  <br>

  </details>
  <br>

  ### 템플릿
  <details>
  <summary>펼치기/접기</summary>
  <br>

  </details>
  <br>

</details>
<br>
