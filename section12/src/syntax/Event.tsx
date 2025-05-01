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
  /* 
  click 이벤트의 경우 Mouse에서 발생하는 이벤트이므로 
  `(parameter) e: React.MouseEvent<HTMLButtonElement, MouseEvent>` 와 같이 추론된다.  
  */
  /*
  onChange는 ChangeEvent인데 onClick은 왜 ClickEvent가 아니라 MouseEvent일까?  
  React는 모든 이벤트를 SyntheticEvent라는 공통 부모 타입으로부터 확장한다.  
  그리고 HTML 요소의 종류나 이벤트 유형에 따라 구체적인 서브타입이 존재한다.  
  onChange의 구체적인 서브타입이 바로 React.ChangeEvent<T>이다.  
  해당 타입은 일반적으로 입력값 변경 이벤트로 분류되어 input, select, textarea 등의 입력 필드에 대한 태그에서 발생하는 값 변경 이벤트에서 사용한다.  
  따라서 e.target.value를 사용 가능하게 타입이 정의되어 있다.  
  onClick의 구체적인 서브 타입은 React.MouseEvent<T>이다.  
  해당 타입은 마우스 클릭 이벤트로 분류되어 마우스의 좌표, 버튼 클릭 정보 등을 포함하는 이벤트에서 사용되며 button, div 등의 HTML 요소 종류에 따라 타입 인자를 넣을 수 있다.  
  */

  /* 
  ChangeEvent의 제네릭 타입 변수는 사용되는 엘리먼트 태그에 대한 타입인 HtmlInputElement 한개만 지정하는데,  
  MouseEvent의 제네릭 타입에는 왜 엘리먼트 태그 타입과 함께 MouseEvent 타입 하나를 두번째 제네릭 타입으로 한번 더 정의 한 이유는 뭘까?  
  첫번째 제네릭 타입은 target타입(HTML요소)의 타입으로 e.currentTarget을 사용할 때 타입 추론에 필요하며 해당 타입을 제네릭 타입 변수로 지정해야 .disabled, .value, .id 등에 접근이 가능하다.  
  두번째 제네릭 타입은 기본 브라우저 이벤트인 native event 타입으로 정밀한 제어나 브라우저 고유 정보가 필요할 때 유용하게 사용된다.  
  따라서 거의 사용하지 않지만 e.nativeEvent에 접근할 때 타입이 필요하며 해당 타입은 생략이 가능하다.  
  (생략하더라도 nativeEvent 접근이 가능함.)
  */
  const onClickButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

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
      <button onClick={(e) => {}}>버튼A</button>
      <button onClick={onClickButton}>버튼B</button>

    </div>
  );
}

export default Event;
