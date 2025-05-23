import { useState, useRef, useEffect } from 'react';
import '../App.css'
import Editor from '../../components/Editor';
import TodoItem from '../../components/TodoItem';
// import { Todo } from './types';

function App() {

  const [todos, setTodos] = useState<Todo[]>([]);

  const idRef = useRef<number>(0) // todo Object가 todos 배열에 추가될 때 마다 증가 시킬 ref 변수

  const onClickAdd = (text: string) => {
    setTodos([
      ...todos,
      {
        id: idRef.current++, // 값 증가
        content: text
      }
    ])
  }

  const onClickDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
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
      <Editor onClickAdd={onClickAdd}>
        {/* Children */}
        <div>id: {idRef.current}</div>
      </Editor>
      <div>
          {todos.map((todo) => <TodoItem {...todo} onClickDelete={onClickDelete}/>)}
        </div>
    </div>
  );
}

export default App;
