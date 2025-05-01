import { useState, useRef, useEffect } from 'react';
import './App.css';

interface Todo {
  id: number;
  content: string;
}
function App() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>("");
  const onChange_Input = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const idRef = useRef<number>(0) // todo Object가 todos 배열에 추가될 때 마다 증가 시킬 ref 변수
  const onClick_Add = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setTodos([
      ...todos,
      {
        id: idRef.current++, // 값 증가
        content: text
      }
    ])
    setText("") // 입력란 초기화
  }
  /**
   * todos state 변수 변경 감지.
   */
  useEffect(() => {
    console.log(todos)
  }, [todos])

  return (
    <div className="App">
      <h1>Todo</h1>
      <input
        type="text"
        value={text}
        onChange={onChange_Input}
      />
      <button onClick={onClick_Add}>추가</button>
    </div>
  );
}

export default App;
