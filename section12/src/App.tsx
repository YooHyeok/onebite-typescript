import { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState<string>("");
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  return (
    <div className="App">
      <h1>Todo</h1>
      <input
        type="text"
        value={text}
        onChange={onChangeInput}
      />
    </div>
  );
}

export default App;
