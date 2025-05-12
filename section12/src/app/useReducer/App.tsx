import { useRef, useEffect, useReducer } from 'react';
import '../App.css'
import Editor from '../../components/Editor';
import TodoItem from '../../components/TodoItem';
// import { Todo } from './types';

/**
 * 유니온 타입
 */
type Action = {
  type: "CREATE",
  data: {
    id: number;
    content: string
  }
} | {type: "DELETE"; id: number };
/**
 * reducer 함수는 state, action 두개의 매개변수를 갖는다.
 * 매개변수 1. state: 상태
 * 매개변수 2. action: 행위
 */
function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case 'CREATE': return [...state, action.data]
    case 'DELETE': return state.filter((it) => it.id !== action.id)
  }
}

function App() {

  /**
   * useReducer는 2개의 매개변수를 받는다.  
   * - 매개변수 1. reducer라는 상태(state) 변화를 직접 처리하는 함수
   * - 매개변수 2. 상태(state)의 초기값
   */
  const [todos, dispatch] = useReducer(reducer, []);

  const idRef = useRef<number>(0) // todo Object가 todos 배열에 추가될 때 마다 증가 시킬 ref 변수

  const onClickAdd = (text: string) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++, // 값 증가
        content: text
      }
    })
  }

  const onClickDelete = (id: number) => {
    dispatch({
      type: "DELETE",
      id: id
    })
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
