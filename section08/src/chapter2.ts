/* 
## Mapped Type
기존의 객체 타입을 기반으로 새로운 객체 타입을 만드는 문법이다.  
Mapped Type도 이전 챕터에서 배운 keyof 연산자처럼 객체 타입을 조작하는 기능이다.  

### 예제1)
id, name, age 프로퍼티를 갖는 User타입 인터페이스를 정의한다.  
*/
interface IUser {
  id: number;
  name: string;
  age: number
}
/* 
User 정보가 서버에 저장되어 있다고 가정하고, 1명의 User 정보를 불러오는 기능의 임시 함수를 만들어 본다.  
User 타입을 반환하도록 반환타입을 지정해주고, 임시로 User타입과 일치하는 형태의 객체를 반환해주도록 한다.  
*/
function fetchUserEx(): IUser {
  // 조회 기능
  return {
    id: 1,
    name: '유혁스쿨',
    age: 34
  }
}
/* 
다음으로 1명의 User 정보를 수정하는 기능의 함수를 만들어 본다.  
매개변수로는 수정하기 위한 User타입의 객체를 받는다.  
*/
function updateUserEx(user: IUser) {
  // 수정 기능
}

/* 
User정보를 수정해야한다고 가정하고 updateUser를 호출해 본다.  
첫번째 인수로 User객체 값을 넣어줘야한다.  
객체 리터럴로 넣어주되, 변경되길 원하는 프로퍼티의 값만 바꿔서 넣어준다.  
예를들어 기존 User의 값이 id가 1이고 name이 유혁스쿨, age가 34이라고 가정 했을 때 age의 값만 32로 수정하고 싶다면 age 프로퍼티값만 34로 변경한 형태의 User 객체를 넘기면 된다.  
*/
updateUserEx({
  id: 1,
  name: '유혁스쿨',
  age: 32
})
/*
이때 아쉬운 점은 id랑 name 프로퍼티는 기존 값을 그대로 유지한다는 점이다.  
이 경우 굳이 변경하려는 age 프로퍼티 외에 id와 name 두 프로퍼티의 값 까지 포함하여 다 보낼 필요가 있을까 하는 의문이 든다.  
물론 지금은 프로퍼티가 3개밖에 없어 괜찮으나, 프로퍼티가 10개가 넘어간다면 일일이 변경하지 않을 값 까지 다 써야 한다.  
변경하지 않는 값은 제외하고 변경되는 값인 age 프로퍼티만 객체에 담아 전달하고 싶다.  
*/
updateUserEx({
  age: 32 // [Error] Type '{ age: number; }' is missing the following properties from type 'User': id, namets(2345)
})
/* 
그러나 현재 매개변수의 타입은 User객체 타입 자체로 되어 있기 때문에 선택적으로 수정하길 원하는 프로퍼티만 전달하기 어려운 상황이다.  
이럴 때 어쩔 수 없이 새로운 인터페이스 IPartialUser를 만들고, User 타입의 모든 프로퍼티를 복사한 다음 선택적 프로퍼티로 타입을 새로 구성해 준 뒤 메소드의 매개변수 타입을 해당 인터페이스로 변경해줘야 한다.  
*/
interface IPartialUser {
  id?: number;
  name?: string;
  age?: number
}
function updateUserEx2(user: IPartialUser) {
  // 수정 기능
}
updateUserEx2({
  age: 32
})
/* 
매개변수 user에는 모든 프로퍼티가 있어도 되고 없어도 되는 IPartialUser 타입이 되었으므로, 수정하길 원하는 프로퍼티만 선택적으로 구성한 형태의 객체 전달이 가능해졌다.  
user정보를 수정하는 기능 하나 만들기 위해 동일한 IPartialUser 인터페이스를 중복으로 하나 더 정의했다.  

이와 같은 상황에 Mapped Type을 사용하면 이러한 비효율적인 문제를 해결할 수 있다.  

#### Mapped Type 적용  
Mapped Type의 경우 인터페이스에서는 만들 수 없다.  
PartialUser 이름의 타입 별칭을 선언한 뒤, 블록 안에서 마치 인덱스 시그니처를 사용하는것 처럼 대괄호를 열고 `[key in 'id'|'name'|'age']` 형태의 문법으로,
User객체의 모든 프로퍼티 키들을 union타입으로 적용한 뒤, 대괄호 우측에 콜론을 입력하고, 원본 인터페이스인 IUser[key] 형태로 작성한다.  
*/
type PartialUser = {
  [key in 'id'|'name'|'age']: IUser[key]
}
/* 
언뜻 보면 인덱스 시그니처 같기도 하지만, 콜론 대신 in연산자가 나오고 뒤에는 union이 따라 붙는다.  
해당 문법을 해석해보면 대괄호 안은 인덱스 시그니처와 마찬가지로 PartialUser타입 별칭이 적용될 객체의 프로퍼티 키가 무엇이 될지를 정의하는 곳이다.  
대괄호 바깥인 콜론 뒤에 정의한 IUser[key]의 경우 대괄호 내에 union으로 정의한 프로퍼티 키들이 어떤 value의 타입을 가질 것인지를 정의하는 곳이다.  
  
좀 더 상세하게 해석해 보자면 먼저 key를 정의하는 곳에는 in이라는 연산자가 쓰이고 우측에는 string 리터럴 union 타입이 위치하는데 이는 객체 타입에 key 값으로 id,name,age가 있을 수 있다는 뜻이다.  
이렇게 정의한 객체 타입은 무조건 id, name, age 프로퍼티를 갖게 된다.  
인덱스 시그니처와의 차이점으로는 콜론이 아닌 in연산자를 사용한다.  
  
다음으로 대괄호 바깥 우측의 콜론 옆은 value의 타입을 정의하는 부분이다.  
해당 영역 또한 인덱스드 액세스 타입 문법과 유사하다.  
여기서 인덱스로 사용한 key는 좌측에서 string 리터럴 타입인 id, name, age 타입의 유니온 타입 각각의 프로퍼티 대해 각각 한번씩 적용된다.  
즉, IUser의 key가 id일 때는 value의 타입이 IUser객체의 id 즉 IUser["id"]이고 age일 때는 value의 타입이 IUser객체의 age IUser["age"], key가 name일때는 value의 타입이 IUser["name"]이 되는 것이다.  
이런 식으로 만들어진 객체 타입은 IUser["id"]가 곧 인덱스드 액세스 타입이기 때문에 IUser인터페이스의 id 프로퍼티에 정의한 타입인 number타입이 된다.  
마찬가지로 name일 경우 string, age일 경우 number 타입이 된다.  
결론적으로 이렇게 만든 Mapped Type은 id는 number, name은 string, age는 number인 객체 타입이 된다.  

결국 id는 number, name은 string, age는 number 즉, 동일한 타입을 만든 셈이다.  
앞서 모든 프로퍼티가 선택적 프로퍼티가 되는 것을 원했다.  
MappedType에서 key가 끝나는 지점에 대괄호가 끝나는 지점에 일반적인 프로퍼티에 적용하듯 `[key in 'id'|'name'|'age']?: IUser[key]` 와 같이 ?를 붙히면 된다.
*/
type PartialUserA = {
  [key in 'id'|'name'|'age']?: IUser[key]
}
/* 
이와같이 적용할 경우 Mapped Type이 정의하는 모든 프로퍼티가 다 선택적 프로퍼티가 된다.  
타입에 커서를 올려보면 모든 프로퍼티가 선택적 프로퍼티가 된 것을 확인할 수 있다.
```ts
type PartialUserA = {
    age?: number | undefined;
    id?: number | undefined;
    name?: string | undefined;
}
```

이렇게 Mapped Type을 이용하면 특정 객체 타입을 원하는 대로 변환할 수 있기 때문에, 하나의 객체 타입으로 굉장히 다양한 상황에 대처할 수 있게 된다.  

8분 13초
*/