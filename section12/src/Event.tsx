import { useState } from "react"

function Event() {
  const [text, setText] = useState<string>();
  const onChangeInputA = (e: {target: {value: string}}) => {
    setText(e.target.value)
    /* 
    사용하는 값이 e.target.value이기 때문에 위와 같이 string타입의 value를 갖는 target 프로퍼티에 매핑되는 객체 타입을 지정할 수 있다.  
    그러나 해당 타입은 완전히 틀렸다.  
    결론적으로 일반적인 event 객체는 target 말고도 많은 프로퍼티를 갖고 있는 복합 객체이다.  
    따라서, 위와같이 선언할 경우 event 객체 전체가 아닌 event.target.value만 있다고 가정해버리는 것이다.  
    즉, 실제 있는 다른 프로퍼티들은 무시되거나 타입 오류가 발생할 여지가 생긴다.  
    */
  }
  const onChangeInputB = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    /* 
    React.ChangeEvent<HTMLInputElement> 타입은 React 표준 change 이벤트 타입이다.  
    실제로 화살표 함수로 구현한 곳의 event 매개변수 위치에 마우스 커서를 올려보면 
    `(parameter) e: React.ChangeEvent<HTMLInputElement>`로 추론된다.  
    */
  }
  return (
    <div>
      <h1>Todo</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => {setText(e.target.value)}}
      />
      <input
        type="text"
        onChange={onChangeInputA}
      />
      <input
        type="text"
        onChange={onChangeInputB}
      />
    </div>
  );
}

export default Event;
