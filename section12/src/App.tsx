import { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState<string>("");
  return (
    <div className="App">
      <h1>Todo</h1>
    </div>
  );
}

export default App;
