// import { Todo } from '../types';

interface Props extends Todo{
  // extra: string; // 추가적인 새로운 props 요소를 받을 수 있음.
}
export default function TodoItem({id, content}: Props) {
  return <div> 
    {id} 번: { content }
    <button>삭제</button>
  </div>
}