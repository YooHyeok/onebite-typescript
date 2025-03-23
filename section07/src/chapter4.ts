/* 
## 제네릭 클래스

클래스를 복습할 겸 NumberList라는 예제 클래스를 구현해 보도록 한다.  
클래스를 만들면 가장 먼저 해줘야 하는 일이 필드를 선언해야 한다.  
생성자 매개변수로 public 이나 private 접근제한자를 지정할 경우 필드를 생략할 수 있으므로, 생성자만 구현하도록 한다.  
private 접근제한 레벨로 number[]타입 list를 매개변수로 받도록 한다.  
이때 생성자 내부에서 this.list = list;와 같이 매개변수로 받은 list 필드를 초기화 해줘야 했지만, private 접근제어자가 달려 있으므로 이 또한 자동으로 처리된다.  
다음으로 리스트에 새로운 요소를 추가하는 push 메소드를 만들어 준다.  
생성자 매개변수를 통해 초기화하는 멤버 list 필드의 타입은 number[] 타입 배열이기 때문에, push 메소드를 통해 리스트에 추가되는 data 매개변수의 타입은 number 타입으로 지정한다.  
push 메소드의 블록에서는 `this.list.push(data);`와 같이 list필드 배열에 data를 push하도록 구현한다.  
이어서 요소를 제거하는 pop 메소드도 구현한다.  
push와 pop만 있으면 심심하므로 list의 모든 값을 출력하는 print() 메소드도 추가한다.
*/
class NumberList {
  constructor(private list: number[]) {}
  push(data: number) {
    this.list.push(data);
  }
  pop() {
    return this.list.pop();
  }
  print() {
    console.log(this.list)
  }
}
/* 
다음으로는 만들어진 NumberList 클래스를 이용하여 인스턴스를 하나 생성해보도록 한다.  
인스턴스 생성시 생성자 매개변수로 [1, 2, 3]을 넘겨주고, pop, push(4), print()를 순서대로 호출할 경우
[1, 2, 3] → [1, 2] → [1, 2, 4] 순서로 배열의 구성이 변경된다.  
*/
const numberList = new NumberList([1, 2, 3]);
numberList.pop(); // [1, 2]
numberList.push(4); // [1, 2, 3]
numberList.print(); // [1, 2, 4] (> tsc src/chapter4.ts)

/* 
NumberList 클래스를 구현하고, 생성자와 메소드들까지 정상적으로 동작하는것을 확인한 후 StringList 클래스도 있다고 가정해본다.  
NumberList 클래스를 만들 때 타입을 모두 number로 고정시켜놨다.
StringList 클래스를 만들기 위해서 NumberList 클래스를 그대로 복사한 뒤 이름을 StringList로 변경하고, 생성자 매개변수의 타입들을 string[]으로, push 메소드의 매개변수 타입을 string으로 변경하여 거의 중복된 클래스를 하나 더 선언해줘야 한다.  
이렇게 할 경우 많은 중복이 일어났으며, 굉장히 비효율적인 코드가 생산된다.  
그래서 이럴 때에는 제네릭 클래스를 이용해서 문제를 해결하는것이 좋다.  
*/
class StringList {
  constructor(private list: string[]) {}
  push(data: string) {
    this.list.push(data);
  }
  pop() {
    return this.list.pop();
  }
  print() {
    console.log(this.list)
  }
}

/* 
### 제네릭 클래스로 구현
List라는 범용적인 이름으로 클래스를 선언한 뒤, 클래스 이름 뒤에 <T> 형태의 타입 변수를 지정하여 제네릭 클래스로 만들어 준다.
다음으로 List 클래스의 생성자를 호출하면서, 생성자의 인수로 number[] 타입 배열을 전달한다.  
생성자 매개변수 list변수에는 number[] 타입의 값이 들어옴으로써 List 클래스의 타입 변수 T는 number로 추론된다.  
그렇기 때문에 push메소드의 data 매개변수의 타입 T도 number로 추론되면서, 정상적으로 number타입의 값을 전달할 수 있게 된다.  
결론적으로 생성자에 number 타입의 배열을 전달하면, 그때의 List는 number타입으로 만들어진다.
*/
class List<T> {
  constructor(private list: T[]) {}
  push(data: T) {
    this.list.push(data);
  }
  pop() {
    return this.list.pop();
  }
  print() {
    console.log(this.list)
  }
}
const numberListA = new List([1, 2, 3]);
numberList.pop(); // [1, 2]
numberList.push(4); // [1, 2, 3]
numberList.print(); // [1, 2, 4] (> tsc src/chapter4.ts)
/* 
다음으로는 List클래스의 인스턴스를 생성하여 생성자 매개변수로 string[] 타입의 배열을 넘겨본다.  
이번에는 생성자 매개변수 list에 string[] 타입의 값이 들어옴으로써 List클래스의 타입변수 T는 string으로 추론된다.  
numberListA와 동일하게 string 리스트에 push 메소드를 쓰고 인수로 문자열 값을 넣을 수 있도록 추론이 잘 된다.
결론적으로 생성자에 string 타입의 배열을 전달하면 string 타입의 List로 만들어지게 된다.  
제네릭 클래스는 제네릭 인터페이스나 제네릭 타입 변수와는 다르게 클래스를 생성할 때 생성자의 매개변수 인수로 전달하는 값을 기준으로 타입 변수의 타입을 추론한다.  
따라서 제네릭 인터페이스나 제네릭 타입변수와는 다르게 클래스의 인스턴스를 생성할 때 반드시 타입을 명시해주지 않아도 된다.  
*/
const stringListA = new List(['1', '2', '3']);
stringListA.pop(); // ['1', '2']
stringListA.push('4'); // ['1', '2', '3']
stringListA.print(); // ['1', '2', '4'] (> tsc src/chapter4.ts)