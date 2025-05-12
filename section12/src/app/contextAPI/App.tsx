import React, { createContext, useRef, useEffect, useReducer } from 'react';
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

/**
 * createContext는 <T>를 가지며, T타입 defaultValue 매개변수를 갖는다.
 * 반환값이 React.Context<null>로 추론된다.
 * null 값을 공급하는 Context 타입이라는 것으로 이해하면 된다.
 * 그러나 해당 Context는 컴포넌트 Tree에 Todos 배열을 공급할 목적으로 사용할 것이다.  
 * 따라서 null로 초기화 한다면 null타입의 값을 공급하는 타입의 Context로 추론되면 안된다.
 * 만약 null로 초기화 하고 싶다면 createContext의 제네릭 타입변수 T에 `Todo[] | null` 형태의 유니온 타입을 지정해준다.  
 * 
 * 
 */
export const TodoStateContext = React.createContext<Todo[] | null>(null);


interface TodoDisptach {
  onClickAdd: (text: string) => void;
  onClickDelete: (id: number) => void
}
export const TodoDispatchContext = createContext<TodoDisptach | null>(null); //


function AppVer2() {

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

  const todoDispatch = {
    onClickAdd,
    onClickDelete
  }

  return (
    <div className="App">
      <h1>Todo</h1>
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={todoDispatch}>
          <Editor onClickAdd={onClickAdd}>
            {/* Children */}
            <div>id: {idRef.current}</div>
          </Editor>
          <div>
            {todos.map((todo) => <TodoItem {...todo} onClickDelete={onClickDelete}/>)}
          </div>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default AppVer2;
