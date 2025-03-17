/* 
## 인터페이스와 클래스

게임 캐릭터 객체타입을 정의하는 Character 인터페이스를 만들어 본다.
게임 캐릭터는 이름-name, 이동속도-moveSpeed필드와 실제로 이동할 수 있는 move 메소드를 호출 시그니처로 타입을 정의해준다.
*/
interface ICharacter {
  name: string;
  moveSpeed: number;
  move(): void;
}
/* 
인터페이스를 통해 객체의 타입만 정의했으므로, 인터페이스가 정의하는 타입의 객체를 정의할 수 있는 클래스도 만들어 본다.  
Character라는 클래스를 선언해주고, 클래스 이름 뒤에 implement라는 키워드를 쓰고 인터페이스 이름을 써주면 된다.  
implement란 우리말로 구현하다 라는 뜻이다. 직역해 보자면 캐릭터 클래스는 캐릭터 인터페이스를 구현한다 라고 해석할 수 있다.  
인터페이스는 마치 클래스의 설계도 역할을 한다고 생각하면 된다.  
즉, 캐릭터 클래스가 실제로 캐릭터 인터페이스라는 설계도를 구현하는것이다.  
그렇기 때문에 implements로 인터페이스를 입력했을때 최초로 발생하는 오류 메시지를 보게되면 다음과 같다
"캐릭터 클래스가 잘못 구현합니다."  
"캐릭터 인터페이스 타입의 name, moveSpeed, move가없다." 
라는 두가지 오류를 출력한다.  
*/
class Character implements ICharacter{
  /* 
  Class 'Character' incorrectly implements interface 'ICharacter'.
  Type 'Character' is missing the following properties from type 'ICharacter': name, moveSpeed, move ts(2420)
  */
}
/* 
실제로 설계도인 ICharacter 인터페이스에 맞춰 클래스를 구현해본다.  
*/
class CharacterA implements ICharacter{
  name: string;
  moveSpeed: number;
  constructor(name: string, moveSpeed: number) {
    this.name = name;
    this.moveSpeed = moveSpeed;
  }
  move(): void {
    console.log(`${this.moveSpeed} 속도로 이동!`);
  }
 
}

/* 
이때, 생성자 매개변수의 접근 제어자를 달아줄 경우 필드 정의와 생성자 블록 내 초기화로직을 지울 수 있게 된다.
*/
class CharacterB implements ICharacter{
  constructor(public name: string, public moveSpeed: number) {}
  move(): void {
    console.log(`${this.moveSpeed} 속도로 이동!`);
  }
 
}

/* 
한가지 주의할 점은 인터페이스로 정의한 필드들은 무조건 public이다.  
따라서 필드 혹은 생성자 매개변수로 public이 아닌 private나 protected로 조정할 경우 구현을 잘못했다고 에러를 출력한다.  
인터페이스는 무조건 퍼블릭 필드만 정의할 수 있기 때문이다.  
*/
class CharacterC implements ICharacter{
  /* 
  Class 'CharacterC' incorrectly implements interface 'ICharacter'.
  Property 'name' is private in type 'CharacterC' but not in type 'ICharacter'.ts(2420)
  */

  constructor(private name: string, protected moveSpeed: number) {}
  move(): void {
    console.log(`${this.moveSpeed} 속도로 이동!`);
  }
 
}
/* 
만약 인터페이스를 구현하면서, public 이상의 접근제한이 필요한 필드가 필요하다면, 인터페이스에 정의되지 않은 새로운 필드를 하나 추가해줘야 한다.
*/
class CharacterD implements ICharacter{
  constructor(public name: string, public moveSpeed: number, private extra: string) {}
  move(): void {
    console.log(`${this.moveSpeed} 속도로 이동!`);
  }
 
}

/* 
보통 클래스를 만들 때 이렇게 인터페이스로 설계도를 먼저 만들고 구현하는 일은 보통 없다.  
그러나 특정 라이브러리의 구현이나 굉장히 복잡하고 정교한 프로그래밍을 해야된다거나 할 때는 인터페이스를 이요해서 먼저 설계도를 구현하는 과정도 분명히 존재할 수 있기 때문에 알아두면 언젠간 분명히 도움이 될것이다.  
*/