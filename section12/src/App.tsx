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

  return (
    <div className="App">
      <h1>Todo</h1>
      <input
        type="text"
        value={text}
        onChange={onChange_Input}
      />
      <button>추가</button>
    </div>
  );
}

export default App;
